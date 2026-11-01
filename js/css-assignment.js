"use strict";

const emailIsValid = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

function setFieldError(input, message) {
    const error = document.getElementById(`${input.id}-error`);
    input.classList.toggle("is-invalid", Boolean(message));
    input.setAttribute("aria-invalid", String(Boolean(message)));
    if (error) error.textContent = message;
}

const registrationForm = document.getElementById("registration-form");
if (registrationForm) {
    const name = document.getElementById("reg-name");
    const email = document.getElementById("reg-email");
    const password = document.getElementById("reg-password");
    const confirm = document.getElementById("reg-confirm");
    const result = document.getElementById("registration-result");
    const fields = [name, email, password, confirm];

    fields.forEach((field) => field.addEventListener("input", () => {
        setFieldError(field, "");
        result.textContent = "";
        result.classList.remove("is-success");
    }));

    registrationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const errors = [
            name.value.trim() ? "" : "Enter your full name.",
            !email.value.trim() ? "Enter your email address." : emailIsValid(email.value) ? "" : "Enter a valid email address.",
            !password.value ? "Enter a password." : password.value.length >= 8 ? "" : "Use at least 8 characters.",
            !confirm.value ? "Confirm your password." : confirm.value === password.value ? "" : "Passwords do not match."
        ];

        fields.forEach((field, index) => setFieldError(field, errors[index]));
        const firstInvalid = fields[errors.findIndex(Boolean)];
        if (firstInvalid) {
            result.textContent = "Please correct the highlighted fields.";
            result.classList.remove("is-success");
            firstInvalid.focus();
        } else {
            result.textContent = "Registration details are valid. This demo does not send your information.";
            result.classList.add("is-success");
        }
    });
}

const faq = document.getElementById("js-faq");
if (faq) {
    faq.querySelectorAll(".js-faq-trigger").forEach((trigger) => {
        const answer = document.getElementById(trigger.getAttribute("aria-controls"));
        let closeTimer;

        trigger.addEventListener("click", () => {
            clearTimeout(closeTimer);
            const willOpen = trigger.getAttribute("aria-expanded") !== "true";
            trigger.setAttribute("aria-expanded", String(willOpen));
            if (willOpen) {
                answer.hidden = false;
                answer.style.height = "0px";
                requestAnimationFrame(() => {
                    answer.style.height = `${answer.scrollHeight}px`;
                });
            } else {
                answer.style.height = `${answer.scrollHeight}px`;
                requestAnimationFrame(() => {
                    answer.style.height = "0px";
                });
                closeTimer = setTimeout(() => {
                    if (trigger.getAttribute("aria-expanded") === "false") answer.hidden = true;
                }, 300);
            }
        });

        answer.addEventListener("transitionend", (event) => {
            if (event.propertyName === "height" && trigger.getAttribute("aria-expanded") === "true") {
                answer.style.height = "auto";
            }
        });
    });
}

const modal = document.getElementById("subscription-modal");
if (modal) {
    const openButton = document.getElementById("open-subscription");
    const closeButton = document.getElementById("close-subscription");
    const email = document.getElementById("subscription-email");
    const form = document.getElementById("subscription-form");
    const result = document.getElementById("subscription-result");

    function closeModal() {
        modal.hidden = true;
        document.body.classList.remove("js-modal-open");
        openButton.focus();
    }

    openButton.addEventListener("click", () => {
        modal.hidden = false;
        document.body.classList.add("js-modal-open");
        email.focus();
    });
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModal();
    });
    document.addEventListener("keydown", (event) => {
        if (modal.hidden) return;
        if (event.key === "Escape") closeModal();
        if (event.key === "Tab") {
            const focusable = [closeButton, email, form.querySelector('button[type="submit"]')];
            const index = focusable.indexOf(document.activeElement);
            if (event.shiftKey && index === 0) {
                event.preventDefault();
                focusable.at(-1).focus();
            } else if (!event.shiftKey && index === focusable.length - 1) {
                event.preventDefault();
                focusable[0].focus();
            }
        }
    });
    email.addEventListener("input", () => {
        setFieldError(email, "");
        result.textContent = "";
        result.classList.remove("is-success");
    });
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const error = !email.value.trim() ? "Enter your email address." : emailIsValid(email.value) ? "" : "Enter a valid email address.";
        setFieldError(email, error);
        if (error) {
            result.textContent = "Please correct your email address.";
            result.classList.remove("is-success");
            email.focus();
        } else {
            result.textContent = "Email accepted. This demo does not send or store it.";
            result.classList.add("is-success");
        }
    });
}

const colorButton = document.getElementById("change-background");
if (colorButton) {
    const colors = [
        { name: "Mist", value: "#f2f6f9" },
        { name: "Sky", value: "#e7f2fc" },
        { name: "Mint", value: "#e5f5ed" },
        { name: "Peach", value: "#fff0e8" }
    ];
    const status = document.getElementById("background-status");
    let colorIndex = 0;
    colorButton.addEventListener("click", () => {
        colorIndex = (colorIndex + 1) % colors.length;
        document.body.style.setProperty("--css-page-bg", colors[colorIndex].value);
        status.textContent = `Color ${colorIndex + 1} of ${colors.length}: ${colors[colorIndex].name}`;
    });
}

const clock = document.getElementById("live-clock");
if (clock) {
    const formatter = new Intl.DateTimeFormat(undefined, {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });
    function updateClock() {
        const now = new Date();
        clock.dateTime = now.toISOString();
        clock.textContent = formatter.format(now);
    }
    updateClock();
    setInterval(updateClock, 1000);
}

// Assignment 5, задание 2
const menuLinks = document.querySelectorAll(".navbar-nav .nav-link");

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

// Assignment 5, задание 1
const readMoreButton = document.getElementById("read-more");

if (readMoreButton) {
    const moreText = document.getElementById("dom-more");
    let moreIsOpen = false;

    readMoreButton.addEventListener("click", function () {
        moreIsOpen = !moreIsOpen;
        if (moreIsOpen) {
            moreText.style.display = "block";
            readMoreButton.textContent = "Read Less";
        } else {
            moreText.style.display = "none";
            readMoreButton.textContent = "Read More";
        }
        readMoreButton.setAttribute("aria-expanded", moreIsOpen);
    });
}

const ratingStars = document.querySelectorAll(".rating-star");

for (let i = 0; i < ratingStars.length; i = i + 1) {
    ratingStars[i].addEventListener("click", function () {
        for (let j = 0; j < ratingStars.length; j = j + 1) {
            ratingStars[j].classList.toggle("selected", j <= i);
            ratingStars[j].setAttribute("aria-pressed", j === i);
        }
        document.getElementById("rating-result").textContent = "Your rating: " + (i + 1) + " out of 5. Thank you!";
    });
}

// Assignment 5, задание 3
const moveBoxButton = document.getElementById("move-box");

if (moveBoxButton) {
    const domBox = document.getElementById("dom-box");
    let boxMoved = false;

    moveBoxButton.addEventListener("click", function () {
        boxMoved = !boxMoved;
        if (boxMoved) {
            domBox.style.transform = "translateX(100px) rotate(15deg)";
            moveBoxButton.textContent = "Move back";
        } else {
            domBox.style.transform = "translateX(0) rotate(0deg)";
            moveBoxButton.textContent = "Move box";
        }
        moveBoxButton.setAttribute("aria-pressed", boxMoved);
    });
}

const playSoundButton = document.getElementById("play-sound");

if (playSoundButton) {
    const notificationSound = document.getElementById("notification-sound");
    const soundResult = document.getElementById("sound-result");

    playSoundButton.addEventListener("click", function () {
        notificationSound.pause();
        notificationSound.currentTime = 0;
        notificationSound.play().then(function () {
            soundResult.textContent = "Notification sound played.";
        }).catch(function () {
            soundResult.textContent = "Sound could not play. Try again.";
        });
    });
}
