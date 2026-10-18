/* Assignment 4: form validation, accordion, popup, background color, and live clock. */
'use strict';

const registrationForm = document.getElementById('registration-form');
const registrationMessage = document.getElementById('registration-message');
const registrationFields = {
    name: document.getElementById('register-name'),
    email: document.getElementById('register-email'),
    password: document.getElementById('register-password'),
    confirm: document.getElementById('register-confirm')
};

function showFieldError(field, message) {
    const error = document.getElementById(field.name + '-error');
    error.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function validateRegistrationField(name) {
    const field = registrationFields[name];
    const value = field.value.trim();
    let error = '';
    if (name === 'name' && !value) error = 'Please enter your full name.';
    if (name === 'email') {
        if (!value) error = 'Please enter your email address.';
        else if (!validEmail(value)) error = 'Enter a valid email address, such as name@example.com.';
    }
    if (name === 'password') {
        if (!field.value) error = 'Please enter a password.';
        else if (field.value.length < 8) error = 'Password must contain at least 8 characters.';
    }
    if (name === 'confirm') {
        if (!field.value) error = 'Please confirm your password.';
        else if (field.value !== registrationFields.password.value) error = 'Passwords do not match.';
    }
    showFieldError(field, error);
    return !error;
}

Object.entries(registrationFields).forEach(([name, field]) => {
    field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validateRegistrationField(name);
        if (name === 'password' && registrationFields.confirm.value) validateRegistrationField('confirm');
        registrationMessage.textContent = '';
        registrationMessage.className = 'form-message';
    });
});

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const invalid = Object.keys(registrationFields).filter((name) => !validateRegistrationField(name));
    if (invalid.length) {
        registrationMessage.textContent = 'Please correct the highlighted fields.';
        registrationMessage.className = 'form-message failure';
        registrationFields[invalid[0]].focus();
        return;
    }
    registrationMessage.textContent = 'All fields are valid. This demo did not send or save your details.';
    registrationMessage.className = 'form-message success';
});

/* Set the answer height explicitly so opening and closing both animate smoothly. */
document.querySelectorAll('.faq-trigger').forEach((trigger) => {
    const answer = document.getElementById(trigger.getAttribute('aria-controls'));
    trigger.addEventListener('click', () => {
        const open = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!open));
        if (open) {
            answer.style.height = answer.scrollHeight + 'px';
            requestAnimationFrame(() => { answer.style.height = '0px'; });
        } else {
            answer.hidden = false;
            answer.style.height = '0px';
            requestAnimationFrame(() => { answer.style.height = answer.scrollHeight + 'px'; });
        }
    });
    answer.addEventListener('transitionend', (event) => {
        if (event.propertyName !== 'height') return;
        if (trigger.getAttribute('aria-expanded') === 'false') answer.hidden = true;
        else answer.style.height = 'auto';
    });
});

const modal = document.getElementById('subscribe-modal');
const closeModalButton = document.getElementById('close-subscribe');
const subscribeForm = document.getElementById('subscribe-form');
const subscribeEmail = document.getElementById('subscribe-email');
const subscribeError = document.getElementById('subscribe-error');
const subscribeMessage = document.getElementById('subscribe-message');
let returnFocusTo = null;

function openModal(event) {
    returnFocusTo = event.currentTarget;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    subscribeEmail.focus();
}
function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    if (returnFocusTo) returnFocusTo.focus();
}
document.getElementById('open-subscribe').addEventListener('click', openModal);
document.getElementById('open-subscribe-secondary').addEventListener('click', openModal);
closeModalButton.addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => {
    if (modal.hidden) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
        const focusable = [closeModalButton, subscribeEmail, subscribeForm.querySelector('button[type="submit"]')];
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
});
subscribeEmail.addEventListener('input', () => {
    subscribeError.textContent = '';
    subscribeEmail.setAttribute('aria-invalid', 'false');
    subscribeMessage.textContent = '';
    subscribeMessage.className = 'form-message';
});
subscribeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = subscribeEmail.value.trim();
    const error = !value ? 'Please enter your email address.' : (!validEmail(value) ? 'Enter a valid email address.' : '');
    subscribeError.textContent = error;
    subscribeEmail.setAttribute('aria-invalid', String(Boolean(error)));
    if (error) { subscribeEmail.focus(); return; }
    subscribeMessage.textContent = 'Valid email! This demo did not send or save your address.';
    subscribeMessage.className = 'form-message success';
});

const themes = [
    { name: 'Cloud', color: '#f3f7fb' },
    { name: 'Mint', color: '#e9f8f1' },
    { name: 'Peach', color: '#fff3e6' },
    { name: 'Lavender', color: '#eeeafa' }
];
let themeIndex = 0;
document.getElementById('change-color').addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    document.body.style.backgroundColor = themes[themeIndex].color;
    document.getElementById('theme-label').textContent = 'Current color: ' + themes[themeIndex].name;
});

const clock = document.getElementById('current-datetime');
function updateClock() {
    const now = new Date();
    clock.textContent = new Intl.DateTimeFormat('en-US', { dateStyle: 'long', timeStyle: 'medium' }).format(now);
    clock.dateTime = now.toISOString();
}
updateClock();
setInterval(updateClock, 1000);
