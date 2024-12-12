"use strict"; // Enables strict mode, which catches common coding errors and improves performance



// Utility function to get a DOM element by selector
const getElement = selector => document.querySelector(selector);

// Define the other classes to be used
let settings = new Settings();
let displayImages = new DisplayImages();
let cardAnimation = new CardAnimation();
let cardGame = new CardGame();
let tabs = new Tabs();


document.addEventListener("DOMContentLoaded", () => {
    // load settings data
    settings.loadData();
    settings.setDisplayData(cardGame);

    // display cards and player info
    cardGame.setupCards(displayImages, settings);
    
	// add click event handler for each card link
    cardGame.makeCardsClickable();

    // add click event handler for each tab link button
    tabs.activate();

    // add click event handler for Save Settings button
    settings.saveData();
});