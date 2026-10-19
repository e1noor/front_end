// Задание 1: проверка формы на HTML Advanced.
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

        // Если есть поле с ошибкой, переводим на него курсор.
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

// Задание 2: вопросы на HTML Basics.
const questions = document.querySelectorAll(".html-question");
for (let i = 0; i < questions.length; i = i + 1) {
    const question = questions[i];
    const answer = document.getElementById(question.getAttribute("aria-controls"));
    question.addEventListener("click", function () {
        answer.classList.toggle("is-open");
        question.setAttribute("aria-expanded", answer.classList.contains("is-open"));
    });
}

// Задание 3: окно подписки. Проверка if нужна, потому что файл общий для двух страниц.
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
    // HTML dialog также закрывается клавишей Escape.
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

// Задание 4: выбираем следующий цвет из массива.
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

// Задание 5: показываем местное время и обновляем каждую секунду.
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
