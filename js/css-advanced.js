"use strict";

// Assignment 5: shared behaviour for CSS Basics and CSS Layout only.
(() => {
    const themeButton = document.getElementById("theme-toggle");
    function applyTheme(theme) {
        const night = theme === "night";
        document.body.dataset.theme = night ? "night" : "day";
        document.body.setAttribute("data-bs-theme", night ? "dark" : "light");
        themeButton.setAttribute("aria-pressed", String(night));
        themeButton.textContent = night ? "Switch to day theme" : "Switch to night theme";
    }
    if (themeButton) {
        let savedTheme = "day";
        // Storage can be unavailable in a private browser or on a file:// URL.
        try { savedTheme = localStorage.getItem("css-lesson-theme") || "day"; } catch { /* Use the default. */ }
        applyTheme(savedTheme);
        themeButton.addEventListener("click", () => {
            const theme = document.body.dataset.theme === "night" ? "day" : "night";
            applyTheme(theme);
            try { localStorage.setItem("css-lesson-theme", theme); } catch { /* The toggle still works. */ }
        });
    }

    const menuLinks = Array.from(document.querySelectorAll(".navbar-nav .nav-link"));
    menuLinks.forEach((link, index) => {
        link.addEventListener("keydown", (event) => {
            let next;
            switch (event.key) {
                case "ArrowRight":
                case "ArrowDown": next = (index + 1) % menuLinks.length; break;
                case "ArrowLeft":
                case "ArrowUp": next = (index - 1 + menuLinks.length) % menuLinks.length; break;
                case "Home": next = 0; break;
                case "End": next = menuLinks.length - 1; break;
                default: return;
            }
            event.preventDefault();
            menuLinks[next].focus();
        });
    });

    const readMore = document.getElementById("read-more");
    if (readMore) {
        const extra = document.getElementById("css-more");
        readMore.addEventListener("click", () => {
            extra.hidden = !extra.hidden;
            readMore.setAttribute("aria-expanded", String(!extra.hidden));
            readMore.textContent = extra.hidden ? "Read more" : "Read less";
        });
    }

    const stars = document.querySelectorAll("[data-rating]");
    stars.forEach((star) => {
        star.addEventListener("click", () => {
            const rating = Number(star.dataset.rating);
            stars.forEach((item) => item.setAttribute("aria-pressed", String(Number(item.dataset.rating) <= rating)));
            document.getElementById("rating-status").textContent = `Thank you! You rated this lesson ${rating} out of 5.`;
        });
    });

    // Object + method, array, filter callback, and for...of loop.
    const lessonLibrary = {
        lessons: [
            { title: "Selectors", category: "basics", href: "3-css-basics.html#selectors", description: "Target elements, classes, and IDs." },
            { title: "Box model", category: "basics", href: "3-css-basics.html#box-model", description: "Understand content, padding, border, and margin." },
            { title: "Rule structure", category: "basics", href: "3-css-basics.html#example", description: "Connect a property with its value." },
            { title: "Flexbox", category: "layout", href: "4-css-layout.html#examples", description: "Arrange items along a row or a column." },
            { title: "Grid", category: "layout", href: "4-css-layout.html#comparison", description: "Work with rows and columns together." },
            { title: "Responsive design", category: "layout", href: "4-css-layout.html#responsive", description: "Adapt the page to different screen sizes." }
        ],
        getLessons(category) {
            return this.lessons.filter((lesson) => category === "all" || lesson.category === category);
        }
    };
    const lessonFilter = document.getElementById("lesson-filter");
    if (lessonFilter) {
        const list = document.getElementById("lesson-list");
        function renderLessons() {
            const lessons = lessonLibrary.getLessons(lessonFilter.value);
            const fragment = document.createDocumentFragment();
            for (const lesson of lessons) {
                const item = document.createElement("li");
                const link = document.createElement("a");
                const description = document.createElement("p");
                link.href = lesson.href;
                link.textContent = lesson.title;
                description.textContent = lesson.description;
                item.append(link, description);
                fragment.append(item);
            }
            list.replaceChildren(fragment);
            document.getElementById("lesson-count").textContent = `${lessons.length} topics available`;
        }
        lessonFilter.addEventListener("change", renderLessons);
        renderLessons();
    }

    const planForm = document.getElementById("study-plan");
    if (planForm) {
        const name = document.getElementById("plan-name");
        const topic = document.getElementById("plan-topic");
        const minutes = document.getElementById("plan-minutes");
        const error = document.getElementById("plan-error");
        const result = document.getElementById("plan-result");
        const steps = [document.getElementById("plan-step-1"), document.getElementById("plan-step-2")];
        let currentStep = 0;

        function validateName() {
            const valid = Boolean(name.value.trim());
            name.setAttribute("aria-invalid", String(!valid));
            error.textContent = valid ? "" : "Enter your name before continuing.";
            if (!valid) name.focus();
            return valid;
        }
        // A higher-order function invokes a callback to render the next step.
        function changeStep(step, onChange) {
            currentStep = step;
            steps.forEach((panel, index) => { panel.hidden = index !== currentStep; });
            document.getElementById("plan-progress").textContent = `Step ${step + 1} of 2: ${step === 0 ? "Your details" : "Daily schedule"}`;
            onChange();
        }
        function showReview() {
            document.getElementById("plan-review").textContent = `${name.value.trim()}, your focus is ${topic.value}.`;
            minutes.focus();
        }
        document.getElementById("plan-next").addEventListener("click", () => {
            if (validateName()) changeStep(1, showReview);
        });
        document.getElementById("plan-back").addEventListener("click", () => {
            result.textContent = "";
            changeStep(0, () => name.focus());
        });
        name.addEventListener("input", () => {
            error.textContent = "";
            name.removeAttribute("aria-invalid");
            result.textContent = "";
        });
        planForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!validateName()) return;
            if (currentStep === 0) { changeStep(1, showReview); return; }
            result.textContent = `${name.value.trim()}, your plan is ready: practise ${topic.value} for ${minutes.value} minutes every day. Start with one topic from the lesson list above.`;
        });
        planForm.addEventListener("reset", () => {
            error.textContent = "";
            result.textContent = "";
            name.removeAttribute("aria-invalid");
            changeStep(0, () => name.focus());
        });
    }

    const stage = document.getElementById("layout-stage");
    if (stage) {
        const mode = document.getElementById("layout-mode");
        const direction = document.getElementById("layout-direction");
        const columns = document.getElementById("layout-columns");
        const gap = document.getElementById("layout-gap");
        const tiles = ["One", "Two", "Three", "Four", "Five", "Six"];
        for (const label of tiles) {
            const tile = document.createElement("div");
            tile.className = "lab-tile";
            tile.textContent = label;
            stage.append(tile);
        }
        function updateLayout() {
            const spacing = `${gap.value}px`;
            stage.style.gap = spacing;
            document.getElementById("gap-value").textContent = `${gap.value} px`;
            document.getElementById("grid-controls").hidden = mode.value !== "grid";
            document.getElementById("flex-controls").hidden = mode.value !== "flex";
            let rules;
            switch (mode.value) {
                case "grid":
                    stage.style.display = "grid";
                    stage.style.gridTemplateColumns = `repeat(${columns.value}, minmax(0, 1fr))`;
                    stage.style.removeProperty("flex-direction");
                    rules = `    display: grid;\n    grid-template-columns: repeat(${columns.value}, minmax(0, 1fr));`;
                    break;
                default:
                    stage.style.display = "flex";
                    stage.style.flexDirection = direction.value;
                    stage.style.removeProperty("grid-template-columns");
                    rules = `    display: flex;\n    flex-direction: ${direction.value};\n    flex-wrap: wrap;`;
            }
            document.getElementById("layout-code").textContent = `.preview {\n${rules}\n    gap: ${spacing};\n}`;
            document.getElementById("layout-status").textContent = `${mode.value === "grid" ? `Grid with ${columns.value} columns` : `Flexbox in a ${direction.value}`}, ${gap.value} px gap.`;
        }
        [mode, direction, columns].forEach((control) => control.addEventListener("change", updateLayout));
        gap.addEventListener("input", updateLayout);
        document.getElementById("reset-layout").addEventListener("click", () => {
            mode.value = "flex";
            direction.value = "row";
            columns.value = "3";
            gap.value = "16";
            updateLayout();
        });
        updateLayout();
    }

    const playButton = document.getElementById("play-notification");
    if (playButton) {
        const audio = document.getElementById("css-notification");
        const badge = document.getElementById("sound-badge");
        const status = document.getElementById("sound-status");
        let playRequest = 0;
        playButton.addEventListener("click", async () => {
            const request = ++playRequest;
            audio.pause();
            audio.currentTime = 0;
            badge.classList.remove("is-playing");
            // Restart the transition even when the button is clicked quickly.
            void badge.offsetWidth;
            badge.classList.add("is-playing");
            status.textContent = "Playing notification.";
            try { await audio.play(); }
            catch {
                if (request === playRequest) status.textContent = "Audio could not play. Check your browser sound settings and try again.";
            }
        });
        badge.addEventListener("animationend", () => badge.classList.remove("is-playing"));
        audio.addEventListener("ended", () => { status.textContent = "Notification finished. Play it again!"; });
    }
})();
