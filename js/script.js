const themeToggle = document.getElementById("theme-toggle");
const themeLabel = document.getElementById("theme-label");

function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-mode", isDark);
    if (themeToggle) {
        themeToggle.checked = isDark;
    }
    if (themeLabel) {
        themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener("change", function () {
        const nextTheme = themeToggle.checked ? "dark" : "light";
        localStorage.setItem("theme", nextTheme);
        applyTheme(nextTheme);
    });
}

const faqButtons = document.querySelectorAll(".faq-question");
for (let i = 0; i < faqButtons.length; i = i + 1) {
    faqButtons[i].addEventListener("click", function () {
        const answer = document.getElementById(faqButtons[i].getAttribute("aria-controls"));
        if (answer) {
            answer.classList.toggle("is-open");
            faqButtons[i].setAttribute("aria-expanded", answer.classList.contains("is-open"));
        }
    });
}

const lessonCategory = document.getElementById("lesson-category");
const lessonSearch = document.getElementById("lesson-search");
const lessonReset = document.getElementById("lesson-reset");
const lessonList = document.getElementById("lesson-list");
const lessonCount = document.getElementById("lesson-count");

const lessons = [
    { title: "HTML Basics - Headings, Paragraphs, Links", category: "html", link: "index.html" },
    { title: "HTML Advanced - Tables, Forms, Semantic Tags", category: "html", link: "2-html-advanced.html" },
    { title: "CSS Basics - Selectors, Colors, Box Model", category: "css", link: "3-css-basics.html" },
    { title: "CSS Layout - Flexbox, Grid, Media Queries", category: "css", link: "4-css-layout.html" },
    { title: "JS Basics - Variables, Functions, Arrays", category: "javascript", link: "5-js-basics.html" },
    { title: "JS DOM - Selecting Elements, Events, API", category: "javascript", link: "6-js-dom.html" },
    { title: "Student Profile - Account and Saved Progress", category: "javascript", link: "profile.html" }
];

if (lessonCategory && lessonSearch && lessonList && lessonCount) {
    const storedCategory = localStorage.getItem("savedCategory");
    const storedSearch = localStorage.getItem("savedSearch");

    if (storedCategory) {
        lessonCategory.value = storedCategory;
    }
    if (storedSearch) {
        lessonSearch.value = storedSearch;
    }

    function renderLessons() {
        const selectedCategory = lessonCategory.value;
        const searchValue = lessonSearch.value.trim().toLowerCase();

        localStorage.setItem("savedCategory", selectedCategory);
        localStorage.setItem("savedSearch", lessonSearch.value.trim());

        lessonList.textContent = "";
        let count = 0;

        for (let i = 0; i < lessons.length; i = i + 1) {
            const matchesCategory = selectedCategory === "all" || lessons[i].category === selectedCategory;
            const matchesSearch = lessons[i].title.toLowerCase().includes(searchValue);

            if (matchesCategory && matchesSearch) {
                const item = document.createElement("li");
                item.className = "list-group-item d-flex justify-content-between align-items-center";

                const link = document.createElement("a");
                link.href = lessons[i].link;
                link.textContent = lessons[i].title;

                const badge = document.createElement("span");
                badge.className = "badge bg-primary text-uppercase";
                badge.textContent = lessons[i].category;

                item.appendChild(link);
                item.appendChild(badge);
                lessonList.appendChild(item);
                count = count + 1;
            }
        }

        lessonCount.textContent = "Lessons found: " + count;
    }

    lessonCategory.addEventListener("change", renderLessons);
    lessonSearch.addEventListener("input", renderLessons);

    if (lessonReset) {
        lessonReset.addEventListener("click", function () {
            lessonCategory.value = "all";
            lessonSearch.value = "";
            renderLessons();
        });
    }

    renderLessons();
}

const termSearch = document.getElementById("term-search");
const termItems = document.querySelectorAll("#term-list li");
const termCount = document.getElementById("term-count");

if (termSearch && termItems.length > 0 && termCount) {
    const savedTerm = localStorage.getItem("savedTerm") || "";
    termSearch.value = savedTerm;

    function filterTerms() {
        const query = termSearch.value.trim().toLowerCase();
        localStorage.setItem("savedTerm", termSearch.value.trim());
        let visibleCount = 0;

        for (let i = 0; i < termItems.length; i = i + 1) {
            const matches = termItems[i].textContent.toLowerCase().includes(query);
            termItems[i].style.display = matches ? "" : "none";
            if (matches) {
                visibleCount = visibleCount + 1;
            }
        }

        termCount.textContent = "Items found: " + visibleCount;
    }

    termSearch.addEventListener("input", filterTerms);
    filterTerms();
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[0-9]{10,15}$/;

function isStrongPassword(password) {
    return password.length >= 8 && /[a-zA-Z]/.test(password) && /[0-9]/.test(password);
}

function setFieldError(errorId, message) {
    const element = document.getElementById(errorId);
    if (element) {
        element.textContent = message;
    }
}

const signupForm = document.getElementById("signup-form");
if (signupForm) {
    const nameInput = document.getElementById("signup-name");
    const emailInput = document.getElementById("signup-email");
    const phoneInput = document.getElementById("signup-phone");
    const passwordInput = document.getElementById("signup-password");
    const signupResult = document.getElementById("signup-result");

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        setFieldError("signup-name-error", "");
        setFieldError("signup-email-error", "");
        setFieldError("signup-phone-error", "");
        setFieldError("signup-password-error", "");
        signupResult.textContent = "";

        if (nameInput.value.trim() === "") {
            setFieldError("signup-name-error", "Please enter your name.");
            isValid = false;
        }

        if (!emailPattern.test(emailInput.value.trim())) {
            setFieldError("signup-email-error", "Enter a valid email (for example, name@example.com).");
            isValid = false;
        }

        if (!phonePattern.test(phoneInput.value.trim())) {
            setFieldError("signup-phone-error", "Enter a valid phone number (10 to 15 digits, e.g. +77001234567).");
            isValid = false;
        }

        if (!isStrongPassword(passwordInput.value)) {
            setFieldError("signup-password-error", "Password must be at least 8 characters and include letters and numbers.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const user = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            password: passwordInput.value
        };

        localStorage.setItem("user", JSON.stringify(user));
        signupResult.textContent = "Account created! You can now log in.";
        signupResult.className = "mt-3 mb-0 text-success fw-semibold";
        signupForm.reset();
    });
}

const loginForm = document.getElementById("login-form");
if (loginForm) {
    const emailInput = document.getElementById("login-email");
    const phoneInput = document.getElementById("login-phone");
    const passwordInput = document.getElementById("login-password");
    const loginResult = document.getElementById("login-result");

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        setFieldError("login-email-error", "");
        setFieldError("login-phone-error", "");
        setFieldError("login-password-error", "");
        loginResult.textContent = "";

        if (!emailPattern.test(emailInput.value.trim())) {
            setFieldError("login-email-error", "Enter a valid email (for example, name@example.com).");
            isValid = false;
        }

        if (!phonePattern.test(phoneInput.value.trim())) {
            setFieldError("login-phone-error", "Enter a valid phone number (10 to 15 digits, e.g. +77001234567).");
            isValid = false;
        }

        if (!isStrongPassword(passwordInput.value)) {
            setFieldError("login-password-error", "Password must be at least 8 characters and include letters and numbers.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        const savedUserText = localStorage.getItem("user");
        if (!savedUserText) {
            loginResult.textContent = "No account found. Please sign up first.";
            loginResult.className = "mt-3 mb-0 text-danger fw-semibold";
            return;
        }

        const savedUser = JSON.parse(savedUserText);
        if (savedUser.email === emailInput.value.trim() && savedUser.password === passwordInput.value) {
            localStorage.setItem("loggedIn", "true");
            window.location.href = "profile.html";
        } else {
            loginResult.textContent = "Invalid email or password.";
            loginResult.className = "mt-3 mb-0 text-danger fw-semibold";
        }
    });
}

const profileStatus = document.getElementById("profile-status");
if (profileStatus) {
    const profileDetails = document.getElementById("profile-details");
    const profileName = document.getElementById("profile-name");
    const profileEmail = document.getElementById("profile-email");
    const profilePhone = document.getElementById("profile-phone");
    const profileSavedCategory = document.getElementById("profile-saved-category");
    const logoutButton = document.getElementById("logout-button");

    function updateProfileView() {
        const savedUserText = localStorage.getItem("user");
        const isLoggedIn = localStorage.getItem("loggedIn") === "true";

        if (savedUserText && isLoggedIn) {
            const user = JSON.parse(savedUserText);
            profileStatus.textContent = "Welcome back, " + user.name + "!";
            profileDetails.hidden = false;
            profileName.textContent = user.name;
            profileEmail.textContent = user.email;
            profilePhone.textContent = user.phone;
            profileSavedCategory.textContent = localStorage.getItem("savedCategory") || "all";
        } else {
            profileStatus.textContent = "You are not logged in. Use the Sign Up or Log In form below.";
            profileDetails.hidden = true;
        }
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.setItem("loggedIn", "false");
            updateProfileView();
        });
    }

    updateProfileView();
}

const practiceForm = document.getElementById("practice-form");
if (practiceForm) {
    const nameInput = document.getElementById("form-name");
    const emailInput = document.getElementById("form-email");
    const phoneInput = document.getElementById("form-phone");
    const passwordInput = document.getElementById("form-password");
    const messageInput = document.getElementById("form-message");
    const formResult = document.getElementById("form-result");

    practiceForm.addEventListener("submit", function (event) {
        event.preventDefault();
        let isValid = true;

        setFieldError("form-name-error", "");
        setFieldError("form-email-error", "");
        setFieldError("form-phone-error", "");
        setFieldError("form-password-error", "");
        setFieldError("form-message-error", "");
        formResult.textContent = "";

        if (nameInput.value.trim() === "") {
            setFieldError("form-name-error", "Please enter your name.");
            isValid = false;
        }

        if (!emailPattern.test(emailInput.value.trim())) {
            setFieldError("form-email-error", "Enter a valid email (for example, name@example.com).");
            isValid = false;
        }

        if (!phonePattern.test(phoneInput.value.trim())) {
            setFieldError("form-phone-error", "Enter a valid phone number (10 to 15 digits, e.g. +77001234567).");
            isValid = false;
        }

        if (!isStrongPassword(passwordInput.value)) {
            setFieldError("form-password-error", "Password must be at least 8 characters and include letters and numbers.");
            isValid = false;
        }

        if (messageInput && messageInput.value.trim() === "") {
            setFieldError("form-message-error", "Please enter your message.");
            isValid = false;
        }

        if (!isValid) {
            formResult.textContent = "Please fix the errors above.";
            formResult.className = "mt-3 mb-0 text-danger fw-semibold";
            return;
        }

        formResult.textContent = "Form validated and submitted successfully!";
        formResult.className = "mt-3 mb-0 text-success fw-semibold";
        practiceForm.reset();
    });
}

const apiTopic = document.getElementById("api-topic");
const apiLoad = document.getElementById("api-load");
const apiStatus = document.getElementById("api-status");
const apiList = document.getElementById("api-list");

if (apiTopic && apiLoad && apiStatus && apiList) {
    async function loadArticles() {
        const tag = apiTopic.value;
        apiStatus.textContent = "Loading articles...";
        apiStatus.className = "text-body-secondary mb-3";
        apiList.textContent = "";

        try {
            const response = await fetch("https://dev.to/api/articles?tag=" + tag + "&per_page=3");
            if (!response.ok) {
                throw new Error("Request failed");
            }
            const articles = await response.json();
            apiStatus.textContent = "Showing latest " + articles.length + " articles for #" + tag;

            for (let i = 0; i < articles.length; i = i + 1) {
                const col = document.createElement("div");
                col.className = "col-sm-12 col-md-4";

                const card = document.createElement("article");
                card.className = "card api-card h-100 p-3";

                const title = document.createElement("h3");
                title.className = "h5";
                title.textContent = articles[i].title;

                const desc = document.createElement("p");
                desc.className = "text-body-secondary flex-grow-1";
                desc.textContent = articles[i].description || "Read this developer tutorial on DEV Community.";

                const link = document.createElement("a");
                link.className = "btn btn-outline-primary btn-sm align-self-start";
                link.href = articles[i].url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = "Read article";

                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(link);
                col.appendChild(card);
                apiList.appendChild(col);
            }
        } catch (error) {
            apiStatus.textContent = "Could not load articles. Please check your internet connection and try again.";
            apiStatus.className = "text-danger mb-3";
        }
    }

    apiLoad.addEventListener("click", loadArticles);
    apiTopic.addEventListener("change", loadArticles);
    loadArticles();
}
