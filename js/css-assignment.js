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
