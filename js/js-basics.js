//Задание 1

const feedbackForm = document.getElementById("feedback-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm-password");
const messageInput = document.getElementById("comment");
const formResult = document.getElementById("form-result");


function showError(message, input) {
    formResult.textContent = message;
    formResult.className = "mt-3 mb-0 text-danger";
    input.focus();
}

feedbackForm.addEventListener("submit", function (event) {

    event.preventDefault();

    if (nameInput.value.trim() === "") {
        showError("Please enter your name.", nameInput);
        return;
    }


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        showError("Enter a valid email, for example name@example.com.", emailInput);
        return;
    }

    if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
        showError("Use a password with at least 8 characters, not just spaces.", passwordInput);
        return;
    }

    if (confirmInput.value === "") {
        showError("Please confirm your password.", confirmInput);
        return;
    }

    if (confirmInput.value !== passwordInput.value) {
        showError("Passwords do not match.", confirmInput);
        return;
    }

    if (messageInput.value.trim() === "") {
        showError("Please enter your message.", messageInput);
        return;
    }

    formResult.textContent = "The form is valid. Demo only: nothing was sent or saved.";
    formResult.className = "mt-3 mb-0 text-success";
});


feedbackForm.addEventListener("input", function () {
    formResult.textContent = "";
});
feedbackForm.addEventListener("reset", function () {
    formResult.textContent = "";
});

// Задание 4
const colorButton = document.getElementById("change-background");
const colors = ["#f8f9fa", "#e7f2fc", "#e5f5ed", "#fff0e8"];
let colorIndex = 0;

colorButton.addEventListener("click", function () {
    colorIndex = colorIndex + 1;
    if (colorIndex === colors.length) {
        colorIndex = 0;
    }
    document.body.style.backgroundColor = colors[colorIndex];
});

// Задание 5
const dateTime = document.getElementById("current-date-time");

function updateClock() {
    const now = new Date();
    dateTime.textContent = now.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit"
    });
    dateTime.dateTime = now.toISOString();
}

updateClock();
setInterval(updateClock, 1000);

// Assignment 5, задание 2
const menuLinks = document.querySelectorAll("#menu .nav-link");

for (let i = 0; i < menuLinks.length; i = i + 1) {
    menuLinks[i].addEventListener("keydown", function (event) {
        let nextIndex = i;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                nextIndex = i + 1;
                break;
            case "ArrowLeft":
            case "ArrowUp":
                nextIndex = i - 1;
                break;
            default:
                return;
        }

        event.preventDefault();
        if (nextIndex === menuLinks.length) {
            nextIndex = 0;
        }
        if (nextIndex < 0) {
            nextIndex = menuLinks.length - 1;
        }
        menuLinks[nextIndex].focus();
    });
}

// Assignment 5, задание 3
const lessonCategory = document.getElementById("lesson-category");

if (lessonCategory) {
    const lessonList = document.getElementById("lesson-list");
    const lessonCount = document.getElementById("lesson-count");
    const lessonLibrary = {
        lessons: [
            { title: "HTML Basics", category: "html", link: "index.html" },
            { title: "HTML Advanced", category: "html", link: "2-html-advanced.html" },
            { title: "CSS Basics", category: "css", link: "3-css-basics.html" },
            { title: "CSS Layout", category: "css", link: "4-css-layout.html" },
            { title: "JS Basics", category: "javascript", link: "5-js-basics.html" },
            { title: "JS DOM", category: "javascript", link: "6-js-dom.html" }
        ],
        getLessons: function (category) {
            return this.lessons.filter(function (lesson) {
                return category === "all" || lesson.category === category;
            });
        }
    };

    function showLessons() {
        const lessons = lessonLibrary.getLessons(lessonCategory.value);
        lessonList.textContent = "";

        for (let i = 0; i < lessons.length; i = i + 1) {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = lessons[i].title;
            link.href = lessons[i].link;
            item.appendChild(link);
            lessonList.appendChild(item);
        }

        lessonCount.textContent = "Lessons found: " + lessons.length;
    }

    lessonCategory.addEventListener("change", showLessons);
    showLessons();
}

// Assignment 5, задания 1-2
const studyForm = document.getElementById("study-form");

if (studyForm) {
    const studySteps = document.querySelectorAll(".study-step");
    const studyName = document.getElementById("study-name");
    const studyTopic = document.getElementById("study-topic");
    const studyBack = document.getElementById("study-back");
    const studyNext = document.getElementById("study-next");
    const studyFinish = document.getElementById("study-finish");
    const studyProgress = document.getElementById("study-progress");
    const studyResult = document.getElementById("study-result");
    let studyStep = 0;

    function showStudyStep() {
        for (let i = 0; i < studySteps.length; i = i + 1) {
            studySteps[i].hidden = i !== studyStep;
        }
        studyBack.hidden = studyStep === 0;
        studyNext.hidden = studyStep === 1;
        studyFinish.hidden = studyStep === 0;
        studyProgress.textContent = "Step " + (studyStep + 1) + " of 2";
        studyResult.textContent = "";
        studySteps[studyStep].querySelector("input, select").focus();
    }

    function nextStudyStep() {
        studyName.value = studyName.value.trim();
        if (!studyName.reportValidity()) {
            return;
        }
        studyStep = 1;
        showStudyStep();
    }

    studyNext.addEventListener("click", nextStudyStep);
    studyBack.addEventListener("click", function () {
        studyStep = 0;
        showStudyStep();
    });

    studyForm.addEventListener("submit", function (event) {
        event.preventDefault();
        if (studyStep === 0) {
            nextStudyStep();
            return;
        }
        if (!studyTopic.reportValidity()) {
            return;
        }
        studyResult.textContent = "Hello, " + studyName.value + "! Your next topic is " + studyTopic.value + ". Study one lesson and try its examples.";
    });

    studyForm.addEventListener("input", function () {
        studyResult.textContent = "";
    });
    studyForm.addEventListener("reset", function () {
        studyStep = 0;
        showStudyStep();
    });
}

// Assignment 6, Task 0
$(document).ready(function () {
    console.log("jQuery is ready!");

    // Assignment 6, Task 1
    const terms = $("#term-list li");

    function searchTerms(value) {
        terms.hide();
        const found = terms.filter(function () {
            return $(this).text().toLowerCase().includes(value);
        }).show();
        $("#term-count").text("Terms found: " + found.length);
        highlightTerms(value);
    }

    $("#term-search").on("input", function () {
        const value = $(this).val().trim().toLowerCase();
        searchTerms(value);
        showSuggestions(value);
    });

    // Assignment 6, Task 2
    function showSuggestions(value) {
        const suggestions = $("#term-suggestions").empty();
        if (value === "") {
            return;
        }
        terms.each(function () {
            const name = $(this).text().split(" - ")[0];
            if (name.toLowerCase().startsWith(value)) {
                $("<li>").append($("<button type='button'>").text(name)).appendTo(suggestions);
            }
        });
    }

    $("#term-suggestions").on("click", "button", function () {
        $("#term-search").val($(this).text());
        searchTerms($(this).text().toLowerCase());
        $("#term-suggestions").empty();
    });

    // Assignment 6, Task 3
    function highlightTerms(value) {
        const pattern = new RegExp(value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
        terms.each(function () {
            const text = $(this).text();
            $(this).html(value === "" ? text : text.replace(pattern, "<mark>$&</mark>"));
        });
    }

    // Assignment 6, Task 4
    $(window).on("scroll", function () {
        const height = $(document).height() - $(window).height();
        $("#scroll-progress").css("width", $(window).scrollTop() / height * 100 + "%");
    });

    // Assignment 6, Task 6
    $("#question-form").on("submit", function (event) {
        event.preventDefault();
        const form = this;
        const button = $("#question-submit");
        button.prop("disabled", true).html('<span class="spinner-border spinner-border-sm" aria-hidden="true"></span> Please wait...');

        setTimeout(function () {
            button.prop("disabled", false).text("Submit");
            form.reset();
            showToast("Form submitted successfully!");
        }, 2000);
    });

    // Assignment 6, Task 7
    function showToast(message) {
        $("#toast").text(message).stop(true, true).fadeIn(300).delay(2500).fadeOut(600);
    }
});
