# Frontend Mentor - REST Countries API with color theme switcher solution

This is a solution to the [REST Countries API with color theme switcher challenge on Frontend Mentor](https://www.frontendmentor.io/solutions/rest-countries-api-m4GTlCaw8R). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
- [Author](#author)


## Overview

### The challenge

Users should be able to:

- See all countries from the API on the homepage
- Search for a country using an `input` field
- Filter countries by region
- Click on a country to see more detailed information on a separate page
- Click through to the border countries on the detail page
- Toggle the color scheme between light and dark mode *(optional)*

### Links

- Solution URL: [REST Countries API Solution](https://github.com/Developer-Ashutosh/REST-Countries-Api)
- Live Site URL: [REST Countries API](https://developer-ashutosh.github.io/REST-Countries-Api/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

```css
  [data-theme="dark"] {}
  body::-webkit-scrollbar{}
```
```js
const proudOfThisFunc = () => {
  const countryElement = document.createElement("div");
  countryList.appendChild(countryElement);

  const rootElement = document.documentElement;
  rootElement.setAttribute('data-theme', (rootElement.getAttribute('data-theme') === 'dark') ? "light" : "dark");

  window.scrollTo({
      top: 0,
      behavior: "smooth"
  });

  const selectedCountryData = responseData.find(country => country.name === selectedCountryName);

}
```
## Author

- GitHub - [Ashutosh Kumar](https://www.github.com/Developer-Ashutosh/)
- Frontend Mentor - [@Ashutosh Kuamr](https://www.frontendmentor.io/profile/yourusername)
