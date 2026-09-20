# Assignment 2 Defense Guide

Бұл файл CSS бөлігін қорғауға арналған қысқа конспект.

## Жобада не жасалды?

- `3-css-basics.html` және `4-css-layout.html` беттеріне ортақ Flexbox навигация қосылды.
- Беттің жалпы қаңқасы CSS Grid арқылы `header + sidebar + main + footer` болып бөлінді.
- `3-css-basics.html` бетінде үш тең биіктіктегі Flexbox card бар.
- `4-css-layout.html` бетінде тоғыз суретті Grid gallery бар.
- Card пен gallery суреттеріне `:hover` эффектісі қосылды.
- Media query арқылы desktop, tablet және mobile орналасуы жасалды.
- Flexbox Froggy және Grid Garden сілтемелері sidebar ішінде тұр.

## Негізгі теория

### Flexbox деген не?

Flexbox - элементтерді бір бағытта орналастыратын layout тәсілі. Бағыт row немесе column болады.

- Flex container: `display: flex` берілген ата-ана.
- Flex items: сол контейнердің тікелей балалары.
- Main axis: `flex-direction` бойынша негізгі бағыт.
- Cross axis: негізгі бағытқа перпендикуляр бағыт.
- `justify-content`: main axis бойымен орналастырады.
- `align-items`: cross axis бойымен орналастырады.
- `gap`: элементтердің арасындағы қашықтық.
- `flex-wrap: wrap`: орын жетпесе элементтерді келесі жолға түсіреді.

### Grid деген не?

Grid - элементтерді қатарлар мен бағандарға орналастыратын екі өлшемді layout тәсілі.

- Grid container: `display: grid` берілген ата-ана.
- Grid item: контейнердің тікелей баласы.
- Grid column және grid row: баған мен қатар.
- Grid cell: бір ұяшық.
- Grid area: бірнеше ұяшықтан тұратын аймақ.
- `grid-template-columns`: бағандардың санын және енін береді.
- `grid-template-areas`: бет бөліктерін атаулармен орналастырады.
- `gap`: қатарлар мен бағандар арасындағы бос орын.

### Flexbox пен Grid айырмашылығы

- Flexbox - бір өлшемді: row немесе column.
- Grid - екі өлшемді: row және column бірге.
- Flexbox navigation, button тобы және card ішіндегі контентке ыңғайлы.
- Grid толық page layout пен image gallery үшін ыңғайлы.
- Бір Grid item-ның ішінде Flexbox қолдануға болады.

### Class пен ID айырмашылығы

- Class бірнеше элементте қайталана алады: `.topic-card`.
- ID бір бетте бір ғана ерекше элементке беріледі: `#main-header`.
- ID selector class selector-дан күштірек.
- Specificity реті: inline style, ID, class/pseudo-class, element.
- Specificity бірдей болса, CSS файлындағы кейін жазылған ереже жеңеді.

### Box model

Ішінен сыртына қарай:

1. Content
2. Padding
3. Border
4. Margin

`box-sizing: border-box` берілсе, width пен height ішіне padding және border кіреді.

### Hover және transition

`:hover` pointer элементтің үстіне келгенде стильді өзгертеді. `transition` өзгерісті бірден емес, жұмсақ көрсетеді.

### Responsive design

Media query экран еніне қарай басқа CSS ережесін қосады. Бұл жобада барлық өлшемдер px-пен берілген, сондықтан кішірек экрандарда fixed pixel columns басқа fixed pixel columns-қа ауысады.

## Кодты қай жерден көрсету керек?

- Header Flexbox: `.css-lesson-page #main-header.site-header`
- Navigation Flexbox: `.css-lesson-page .main-nav ul`
- Page Grid areas: `.css-lesson-page`
- Card row: `.css-lesson-page .card-row`
- Equal-height card: `.css-lesson-page .topic-card` және `.card-text`
- Gallery Grid: `.css-lesson-page .image-gallery`
- Caption hover: `.gallery-item:hover .gallery-caption`
- Responsive rules: `@media (max-width: ...)`

## Live coding үлгілері

### 1. Мәтіннің түсін ID арқылы өзгерту

```html
<p id="important-text">Important text</p>
```

```css
#important-text {
    color: red;
}
```

### 2. Мәтінді оң жаққа жылжыту

```css
#important-text {
    text-align: right;
}
```

### 3. Домалақ суретті төртбұрышты ету

```css
.profile-img {
    border-radius: 0;
}
```

### 4. Flexbox ішінде бір link-ті оңға жіберу

```css
.menu {
    display: flex;
}

.last-link {
    margin-left: auto;
}
```

### 5. Navigation link арасына бос орын қосу

```css
.main-nav ul {
    display: flex;
    gap: 12px;
}
```

### 6. Үш card-ты бір қатарға қою

```css
.card-row {
    display: flex;
    align-items: stretch;
    gap: 18px;
}
```

### 7. Card button-ын төменде ұстау

```css
.topic-card {
    display: flex;
    flex-direction: column;
}

.card-button {
    margin-top: auto;
}
```

### 8. Үш бағанды Grid жасау

```css
.image-gallery {
    display: grid;
    grid-template-columns: 260px 260px 260px;
    gap: 18px;
}
```

### 9. Header мен footer-ді екі бағанға созу

```css
.page {
    display: grid;
    grid-template-columns: 220px 900px;
    grid-template-areas:
        "header header"
        "sidebar main"
        "footer footer";
}

.site-header {
    grid-area: header;
}

.site-footer {
    grid-area: footer;
}
```

### 10. Hover кезінде card-ты көтеру

```css
.topic-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.18);
}
```

### 11. Gallery caption-ды hover кезінде шығару

```css
.gallery-caption {
    position: absolute;
    bottom: -55px;
}

.gallery-item:hover .gallery-caption {
    bottom: 0;
}
```

### 12. Mobile экранда бір баған жасау

```css
@media (max-width: 580px) {
    .image-gallery {
        grid-template-columns: 276px;
    }
}
```

## Жиі қойылатын қысқа сұрақтар

1. Неге header-де Flexbox? Logo мен links бір қатарда және ортасында тұруы үшін.
2. Неге page layout-та Grid? Header, sidebar, main, footer екі бағытта орналасады.
3. Неге card height бірдей? Parent-та `align-items: stretch`, card-та Flexbox бар.
4. Неге button төменде? `margin-top: auto` қалған бос орынды button-ның үстіне алады.
5. Неге gallery-де Grid? Бірдей бағандар мен қатарларды басқару оңай.
6. `gap` не істейді? Items немесе grid tracks арасына бос орын қосады.
7. `justify-content` пен `align-items` айырмасы қандай? Біріншісі main axis, екіншісі cross axis бойынша жұмыс істейді.
8. `position: absolute` caption-ға не үшін керек? Caption суреттің үстінде тұруы үшін.
9. `overflow: hidden` не үшін керек? Сурет пен caption figure шекарасынан шықпау үшін.
10. Media query не үшін керек? Layout-ты экран еніне қарай өзгерту үшін.

## Ойындар

- [Flexbox Froggy](https://flexboxfroggy.com/)
- [Grid Garden](https://cssgridgarden.com/)
