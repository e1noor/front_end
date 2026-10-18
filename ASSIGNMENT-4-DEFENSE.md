# Assignment 4 defense guide

**Project:** Web Dev Guide, group SE-2514

**Team:** Pribylyov Yegor, Nurdaulet Zhanybek, Yelnur Yessenali

Open `7-js-interactive.html`. The page markup is in that file, styles are in `css/interactive.css`, and all five behaviors are in `js/interactive.js`.

## Live demonstration

1. Submit the registration form empty. Point out the four field-specific errors. Try an invalid email, a password shorter than eight characters, and different passwords. Correct them and submit again to show the success message.
2. Open a FAQ item and close it. Explain that each button controls an answer region, while `aria-expanded` and animated height reflect its state.
3. Open the subscription popup. Submit an empty/invalid email, then a valid one. Close it using the X button, Escape, and the backdrop. Explain how focus returns to the opener.
4. Click **Change background** several times. Explain the color array, index, and `document.body.style.backgroundColor`.
5. Watch the clock update. Explain `new Date()`, `Intl.DateTimeFormat`, and `setInterval(updateClock, 1000)`.

## Questions to prepare for

- **Why `event.preventDefault()`?** It prevents the demonstration forms from navigating or sending data, so JavaScript can display feedback on the current page.
- **Why use `textContent` for feedback?** It inserts plain text safely and avoids treating user input as HTML.
- **Why both HTML attributes and JavaScript validation?** The attributes describe the fields; JavaScript provides the assignment's specific checks and messages.
- **Is client-side validation sufficient for a real website?** No. A server must validate submitted data again. These forms do not have a backend.
- **How does the FAQ animation work?** The answer starts hidden. JavaScript sets its height to its content height when opening and to zero when closing; CSS transitions the height.
- **How does the popup stay accessible?** It has dialog labels, receives focus when opened, traps Tab navigation, closes on Escape, and restores focus when closed.
- **Why use the device's local time?** `Date` reads the browser's current time, and `Intl.DateTimeFormat` formats it for a human-readable display.

Each member should review the full script and be ready to explain and edit at least one component during the practice lesson. Actual individual contributions should be stated by the team, not inferred from the page.
