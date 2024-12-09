/**
 * @jest-environment jsdom
 */

const CardGame = require('../main/CardGame');
const DisplayImages = require('../main/DisplayImages');
const Settings = require('../main/Settings');

describe("CardAnimation", () => {
    const displayImages = new DisplayImages();
    const settings = new Settings();
    const cardGame = new CardGame();
    
    test("Remove all cards from body of document", () => {
        let cards = document.createElement("cards");
        document.body.appendChild(cards);
        displayImages.removeAll();
        
        expect(document.getElementById("cards")).toBeNull();
    });

    test("Generate set of random cards", () => {
        let cards = document.createElement("cards");
        cards.id = "cards";
        document.body.appendChild(cards);

        let randomCards = cardGame.randomiseCards(settings);
        let visuals = displayImages.generate(randomCards, settings);
        
        expect(visuals[0]).not.toBeNull();
        expect(visuals[1][0]).not.toBeNull();
    });
    
  });
  