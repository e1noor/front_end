const contactForm = document.getElementById("html-contact-form");

if (contactForm) {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmInput = document.getElementById("confirm-password");
    const messageInput = document.getElementById("message");
    const result = document.getElementById("html-form-result");
    const fields = [nameInput, emailInput, passwordInput, confirmInput, messageInput];

    function setError(input, message) {
        document.getElementById(input.id + "-error").textContent = message;
        input.classList.toggle("is-invalid", message !== "");
        input.setAttribute("aria-invalid", message !== "");
    }

    function clearErrors() {
        for (let i = 0; i < fields.length; i = i + 1) {
            setError(fields[i], "");
        }
        result.textContent = "";
    }

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();
        clearErrors();

        if (nameInput.value.trim() === "") {
            setError(nameInput, "Please enter your name.");
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            setError(emailInput, "Enter a valid email, for example name@example.com.");
        }

        if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
            setError(passwordInput, "Use at least 8 characters, not just spaces.");
        }

        if (confirmInput.value === "") {
            setError(confirmInput, "Please confirm your password.");
        } else if (confirmInput.value !== passwordInput.value) {
            setError(confirmInput, "Passwords do not match.");
        }

        if (messageInput.value.trim() === "") {
            setError(messageInput, "Please enter a message.");
        }

        const firstError = contactForm.querySelector(".is-invalid");
        if (firstError) {
            result.textContent = "Please correct the highlighted fields.";
            result.className = "mb-0 text-danger";
            firstError.focus();
        } else {
            result.textContent = "The form is valid. Demo only: nothing was sent or saved.";
            result.className = "mb-0 text-success";
        }
    });

    for (let i = 0; i < fields.length; i = i + 1) {
        fields[i].addEventListener("input", function () {
            setError(fields[i], "");
            result.textContent = "";
        });
    }
    contactForm.addEventListener("reset", clearErrors);
}

const questions = document.querySelectorAll(".html-question");
for (let i = 0; i < questions.length; i = i + 1) {
    const question = questions[i];
    const answer = document.getElementById(question.getAttribute("aria-controls"));
    question.addEventListener("click", function () {
        answer.classList.toggle("is-open");
        question.setAttribute("aria-expanded", answer.classList.contains("is-open"));
    });
}

const popup = document.getElementById("html-popup");
if (popup) {
    const openButton = document.getElementById("html-open-popup");
    const closeButton = document.getElementById("html-close-popup");
    const subscriptionForm = document.getElementById("html-subscription-form");
    const emailInput = document.getElementById("html-subscription-email");
    const result = document.getElementById("html-subscription-result");

    openButton.addEventListener("click", function () {
        popup.showModal();
        emailInput.focus();
    });
    closeButton.addEventListener("click", function () {
        popup.close();
    });
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.close();
        }
    });
    popup.addEventListener("close", function () {
        subscriptionForm.reset();
        result.textContent = "";
        openButton.focus();
    });
    subscriptionForm.addEventListener("submit", function (event) {
        event.preventDefault();
        result.textContent = "Email accepted. Demo only: nothing was sent or saved.";
    });
    emailInput.addEventListener("input", function () {
        result.textContent = "";
    });
}

const colorButton = document.getElementById("html-change-color");
if (colorButton) {
    const colors = ["#f8f9fa", "#e7f2fc", "#e5f5ed", "#fff0e8"];
    let colorIndex = 0;
    colorButton.addEventListener("click", function () {
        colorIndex = colorIndex + 1;
        if (colorIndex === colors.length) {
            colorIndex = 0;
        }
        document.body.style.backgroundColor = colors[colorIndex];
    });
}

const clock = document.getElementById("html-clock");
if (clock) {
    function updateClock() {
        const now = new Date();
        clock.textContent = now.toLocaleString("en-US", {
            month: "long", day: "numeric", year: "numeric",
            hour: "numeric", minute: "2-digit", second: "2-digit"
        });
        clock.dateTime = now.toISOString();
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
