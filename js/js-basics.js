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
        return; // Останавливаем проверку до исправления ошибки.
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
