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
