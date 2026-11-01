"use strict";

// Assignment 6, task 0: jQuery is loaded in the head of both CSS pages.
if (!window.jQuery) {
    document.getElementById("jquery-status").textContent = "The search tools could not load. Check your internet connection and reload the page.";
} else {
    jQuery(document).ready(function ($) {
        console.log("jQuery is ready!");
        $("#jquery-status").text("Search the topics below or save a practice goal.");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // Task 7: one temporary, dismissible notification at a time.
        const $toast = $("#css-toast");
        function notify(message) {
            $toast.stop(true, true);
            $("#css-toast-message").text(message);
            $toast.prop("hidden", false).hide().fadeIn(reducedMotion ? 0 : 180)
                .delay(3200).fadeOut(reducedMotion ? 0 : 300, function () {
                    $toast.prop("hidden", true);
                });
        }
        $("#css-toast-close").on("click", function () {
            $toast.stop(true, true).hide().prop("hidden", true);
        });

        // Tasks 1-3: real-time filtering, keyboard suggestions, and safe highlighting.
        const $search = $("#css-search");
        const $suggestions = $("#css-suggestions");
        const $topics = $(".jq-topic");
        const searchItems = $topics.map(function () {
            const $card = $(this);
            return {
                card: this,
                title: $card.find("h3").text(),
                text: $card.find(".jq-search-text").map(function () { return $(this).text(); }).get().join(" ").toLowerCase()
            };
        }).get();
        $(".jq-search-text").each(function () { $(this).data("original-text", $(this).text()); });
        let selectedSuggestion = -1;

        function escapeHtml(value) {
            return value.replace(/[&<>"']/g, function (character) {
                return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[character];
            });
        }
        function highlight($element, query) {
            const original = $element.data("original-text");
            if (!query) { $element.text(original); return; }
            // Treat punctuation literally; never insert user-provided HTML.
            const expression = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
            let result = "";
            let previousEnd = 0;
            for (const match of original.matchAll(expression)) {
                result += escapeHtml(original.slice(previousEnd, match.index));
                result += "<mark>" + escapeHtml(match[0]) + "</mark>";
                previousEnd = match.index + match[0].length;
            }
            $element.html(result + escapeHtml(original.slice(previousEnd)));
        }
        function closeSuggestions() {
            selectedSuggestion = -1;
            $suggestions.empty().prop("hidden", true);
            $search.attr("aria-expanded", "false").removeAttr("aria-activedescendant");
        }
        function filterTopics(showSuggestions) {
            const query = String($search.val()).trim();
            const normalized = query.toLowerCase();
            const matches = searchItems.filter(function (item) { return item.text.includes(normalized); });
            $topics.prop("hidden", true);
            matches.forEach(function (item) { $(item.card).prop("hidden", false); });
            $(".jq-search-text").each(function () { highlight($(this), query); });
            $("#css-search-count").text(matches.length + " of " + searchItems.length + " topics found");
            $("#css-search-empty").prop("hidden", matches.length !== 0);
            closeSuggestions();
            if (showSuggestions && query && matches.length) {
                matches.slice(0, 5).forEach(function (item, index) {
                    $("<li>", {
                        id: "css-suggestion-" + index,
                        role: "option",
                        "aria-selected": "false",
                        text: item.title
                    }).appendTo($suggestions);
                });
                $suggestions.prop("hidden", false);
                $search.attr("aria-expanded", "true");
            }
            updateProgress();
        }
        function chooseSuggestion($option) {
            $search.val($option.text());
            filterTopics(false);
            $search.trigger("focus");
        }
        $search.on("input", function () { filterTopics(true); });
        $search.on("focus", function () { filterTopics(true); });
        $search.on("blur", closeSuggestions);
        $suggestions.on("pointerdown", "[role='option']", function (event) { event.preventDefault(); });
        $suggestions.on("click", "[role='option']", function () { chooseSuggestion($(this)); });
        $search.on("keydown", function (event) {
            if (event.key === "Escape" || event.key === "Tab") { closeSuggestions(); return; }
            if (event.key === "Enter") {
                event.preventDefault();
                const $selected = $suggestions.children("[aria-selected='true']");
                if ($selected.length) chooseSuggestion($selected);
                else closeSuggestions();
                return;
            }
            if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
            if ($suggestions.prop("hidden")) filterTopics(true);
            const $options = $suggestions.children();
            if (!$options.length) return;
            event.preventDefault();
            selectedSuggestion = (selectedSuggestion + (event.key === "ArrowDown" ? 1 : -1) + $options.length) % $options.length;
            $options.attr("aria-selected", "false").eq(selectedSuggestion).attr("aria-selected", "true");
            $search.attr("aria-activedescendant", $options.eq(selectedSuggestion).attr("id"));
        });
        $("#css-search-clear").on("click", function () {
            $search.val("");
            filterTopics(false);
            $search.trigger("focus");
        });
        filterTopics(false);

        // Task 4: reading progress is recalculated after filtering and image loads.
        let progressFrame = null;
        function updateProgress() {
            const available = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = available > 0 ? Math.min(100, Math.max(0, $(window).scrollTop() / available * 100)) : 100;
            $("#css-reading-progress").attr("aria-valuenow", Math.round(percentage));
            $("#css-reading-progress span").css("width", percentage + "%");
        }
        $(window).on("scroll.cssAssignment6 resize.cssAssignment6 load.cssAssignment6", function () {
            if (progressFrame !== null) return;
            progressFrame = window.requestAnimationFrame(function () {
                updateProgress();
                progressFrame = null;
            });
        });
        updateProgress();

        // Task 5: animate the actual lesson statistics once they enter the viewport.
        function startCounter(element) {
            const $counter = $(element);
            if ($counter.data("started")) return;
            $counter.data("started", true);
            const target = Number($counter.attr("data-count"));
            if (reducedMotion) { $counter.text(target); return; }
            $({ value: 0 }).animate({ value: target }, {
                duration: 1000,
                step: function (value) { $counter.text(Math.floor(value)); },
                complete: function () { $counter.text(target); }
            });
        }
        if ("IntersectionObserver" in window) {
            const counterObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) { startCounter(entry.target); counterObserver.unobserve(entry.target); }
                });
            }, { threshold: 0.2 });
            $(".jq-counter").each(function () { counterObserver.observe(this); });
        } else {
            $(".jq-counter").each(function () { startCounter(this); });
        }

        // Task 6: simulated saving; lock repeated submissions and allow cancellation.
        const $form = $("#css-goal-form");
        const $submit = $("#css-goal-submit");
        const submitLabel = $submit.text();
        let saveTimer = null;
        function unlockForm() {
            $form.attr("aria-busy", "false").find("fieldset").prop("disabled", false);
            $submit.prop("disabled", false).text(submitLabel);
        }
        $form.on("submit", function (event) {
            event.preventDefault();
            if (saveTimer !== null) return;
            const name = String($("#css-goal-name").val()).trim();
            if (!name) {
                $("#css-goal-result").text("Enter your name to save a practice goal.");
                $("#css-goal-name").attr("aria-invalid", "true").trigger("focus");
                return;
            }
            $("#css-goal-name").removeAttr("aria-invalid");
            const topic = String($("#css-goal-topic").val());
            $form.attr("aria-busy", "true").find("fieldset").prop("disabled", true);
            $submit.prop("disabled", true).html('<span class="jq-spinner" aria-hidden="true"></span>Please wait…');
            $("#css-goal-result").text("Saving your practice goal…");
            saveTimer = window.setTimeout(function () {
                saveTimer = null;
                unlockForm();
                $("#css-goal-result").text(name + ", your goal for this visit is to practise " + topic + ".");
                notify("Practice goal saved for this visit.");
            }, 1100);
        });
        $form.on("reset", function () {
            window.clearTimeout(saveTimer);
            saveTimer = null;
            unlockForm();
            $("#css-goal-result").text("");
            $("#css-goal-name").removeAttr("aria-invalid");
        });
        $("#css-goal-name, #css-goal-topic").on("input change", function () { $("#css-goal-result").text(""); });

        // Task 8: buttons use the Clipboard API; file:// browsers get a fallback.
        $("main pre").each(function (index) {
            const $pre = $(this);
            const id = "css-snippet-" + (index + 1);
            $pre.attr("id", id);
            const tooltipId = id + "-tooltip";
            const $toolbar = $("<div>", { class: "jq-copy-toolbar" });
            $("<span>", { id: tooltipId, class: "jq-copy-tooltip", role: "tooltip", hidden: true, text: "Copied to clipboard!" }).appendTo($toolbar);
            $("<button>", {
                class: "btn btn-outline-primary btn-sm jq-copy-button",
                type: "button", text: "Copy CSS", "data-copy-target": id,
                "aria-label": "Copy CSS snippet " + (index + 1), "aria-describedby": tooltipId
            }).appendTo($toolbar);
            $toolbar.insertBefore($pre);
        });
        async function copyText(text) {
            if (window.isSecureContext && navigator.clipboard && navigator.clipboard.writeText) {
                try { await navigator.clipboard.writeText(text); return; } catch { /* Try the local-file fallback. */ }
            }
            const previousFocus = document.activeElement;
            const $temporary = $("<textarea>", { "aria-label": "CSS snippet to copy", readonly: true }).val(text)
                .css({ position: "fixed", left: "-9999px", top: 0 }).appendTo(document.body);
            $temporary[0].select();
            let copied = false;
            try { copied = document.execCommand("copy"); }
            finally { $temporary.remove(); if (previousFocus) previousFocus.focus(); }
            if (!copied) throw new Error("Clipboard unavailable");
        }
        $("main").on("click", ".jq-copy-button", async function () {
            const $button = $(this);
            const $tooltip = $("#" + $button.attr("aria-describedby"));
            const text = $("#" + $button.attr("data-copy-target")).text();
            try {
                await copyText(text);
                window.clearTimeout($button.data("reset-timer"));
                $button.text("\u2713 Copied");
                $tooltip.prop("hidden", false);
                notify("CSS snippet copied to clipboard.");
                $button.data("reset-timer", window.setTimeout(function () {
                    $button.text("Copy CSS");
                    $tooltip.prop("hidden", true);
                }, 2200));
            } catch {
                notify("Copy is unavailable. Select the code and copy it manually.");
            }
        });

        // Task 9: real image URLs are assigned through jQuery only near the viewport.
        function loadImage(element) {
            const $image = $(element);
            const source = $image.attr("data-src");
            if (!source) return;
            $image.one("load", updateProgress).one("error", function () { $image.addClass("jq-load-error"); });
            $image.attr("src", source).removeAttr("data-src");
        }
        if ("IntersectionObserver" in window) {
            const imageObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) { loadImage(entry.target); imageObserver.unobserve(entry.target); }
                });
            }, { rootMargin: "120px 0px" });
            $("img[data-src]").each(function () { imageObserver.observe(this); });
        } else {
            function loadVisibleImages() {
                const limit = $(window).scrollTop() + $(window).height() + 120;
                $("img[data-src]").filter(":visible").each(function () {
                    if ($(this).offset().top <= limit) loadImage(this);
                });
            }
            $(window).on("scroll.cssLazy resize.cssLazy", loadVisibleImages);
            loadVisibleImages();
        }
        // FAQ expansion and asynchronous content change the document's height.
        if ("ResizeObserver" in window) new ResizeObserver(updateProgress).observe(document.querySelector("main"));
    });
}
