// Задание 2
const questions = document.querySelectorAll(".dom-faq-question");

for (let i = 0; i < questions.length; i = i + 1) {
    const question = questions[i];
    const answer = document.getElementById(question.getAttribute("aria-controls"));

    question.addEventListener("click", function () {

        answer.classList.toggle("is-open");

        question.setAttribute("aria-expanded", answer.classList.contains("is-open"));
    });
}

// Задание 3
const popup = document.getElementById("subscription-popup");
const openButton = document.getElementById("open-subscription");
const closeButton = document.getElementById("close-subscription");
const subscriptionForm = document.getElementById("subscription-form");
const subscriptionEmail = document.getElementById("subscription-email");
const subscriptionResult = document.getElementById("subscription-result");

openButton.addEventListener("click", function () {
    popup.showModal();
    subscriptionEmail.focus();
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
    subscriptionResult.textContent = "";
    openButton.focus();
});

subscriptionForm.addEventListener("submit", function (event) {
    event.preventDefault();

    subscriptionResult.textContent = "Email accepted. Demo only: nothing was sent or saved.";
});

subscriptionEmail.addEventListener("input", function () {
    subscriptionResult.textContent = "";
});

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

// Assignment 6, Task 0
$(document).ready(function () {
    console.log("jQuery is ready!");

    // Assignment 6, Task 4
    $(window).on("scroll", function () {
        const height = $(document).height() - $(window).height();
        $("#scroll-progress").css("width", $(window).scrollTop() / height * 100 + "%");
    });

    // Assignment 6, Task 5
    $(".counter").each(function () {
        const counter = $(this);
        $({ value: 0 }).animate({ value: counter.data("target") }, {
            duration: 2000,
            step: function (now) {
                counter.text(Math.ceil(now));
            }
        });
    });

    // Assignment 6, Task 8
    function showCopied(button) {
        button.addClass("copied").find(".copy-icon").text("✓");
        setTimeout(function () {
            button.removeClass("copied").find(".copy-icon").text("📋");
        }, 2000);
    }

    $(".copy-button").on("click", function () {
        const button = $(this);
        navigator.clipboard.writeText(button.siblings("pre").text()).then(function () {
            showCopied(button);
        });
    });

    $(".code-snippet pre").on("copy", function () {
        showCopied($(this).siblings(".copy-button"));
    });

    // Assignment 6, Task 9
    function loadImages() {
        const bottom = $(window).scrollTop() + $(window).height();
        $("img.lazy").each(function () {
            if ($(this).offset().top < bottom) {
                $(this).attr("src", $(this).data("src")).removeClass("lazy");
            }
        });
    }

    $(window).on("scroll", loadImages);
    loadImages();
});
