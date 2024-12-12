/**
 * @jest-environment jsdom
 */

const CardAnimation = require('../main/CardAnimation');
const CardGame = require('../main/CardGame');
const Settings = require('../main/Settings');

describe("CardAnimation", () => {
    const cardAnimation = new CardAnimation();
    const cardGame = new CardGame();
    const settings = new Settings();
    
    test("Shuffle the cards", () => {
        let cards = [];
        for(let sequentialNum = 0; sequentialNum < 8; sequentialNum++) {
            cards[sequentialNum] = sequentialNum;
        }
        cardGame.shuffle(cards);
        const baseCards = [0, 5, 2, 6, 4, 1, 3, 7];
        const cardsAreRandomized = baseCards.every(item => cards.includes(item));
        expect(cardsAreRandomized).toBe(true);
    });
    test("Generate random matching cards", () => {
        settings.setNumberOfCards(8);
        let matchingCards = cardGame.randomiseCards(settings);
        // retrieves the key that has 0 as its value
        let matchingCard = parseInt(Object.keys(matchingCards).find(key => matchingCards[key] === 0));
        //check if the 0th value has the matching key
        expect(matchingCards[0]).toBe(matchingCard);
    });
    test("Check player can win the game", async () => {
        settings.setNumberOfCards(8);
        cardGame.successfulCounter = 4;

        const cardNode = document.createElement("cards");
        const playerText = document.createElement("player");
        const highScoreText = document.createElement("high_score");
        const correctScoreText = document.createElement("correct_score");
        const attemptsText = document.createElement("attempts");


        cardNode.id = "cards";
        playerText.id = "player";
        highScoreText.id = "high_score";
        correctScoreText.id = "correct";
        attemptsText.id = "attempts";

        document.body.appendChild(cardNode);
        document.body.appendChild(playerText);
        document.body.appendChild(highScoreText);
        document.body.appendChild(correctScoreText);
        document.body.appendChild(attemptsText);

        const response = await cardGame.checkWinCondition(settings, cardAnimation);
        expect(response).toBe("The player has won!");
    });
    test("Check player hasn't won yet", async () => {
        settings.setNumberOfCards(8);
        cardGame.successfulCounter = 1;
        const response = await cardGame.checkWinCondition(settings, cardAnimation);
        expect(response).toBe("The player hasn't won yet.");
    });
    test("Check first card is shown", async () => {
        const mockElement = document.createElement("div");

        let newImg = new Image;
        cardGame.displayCards = [newImg];

        const response = await cardGame.showFirstCard(0, mockElement, cardAnimation);
        expect(response).toBe("First card is shown!");
        expect(cardAnimation.currentRotation).toBe(0);
        expect(mockElement.style.pointerEvents).toBe("all");
    });
    test("Check second card is shown", async () => {
        const mockElement = document.createElement("div");

        let newImg = new Image;
        cardGame.displayCards = [newImg];

        const response = await cardGame.showSecondCard(0, mockElement, 0, cardAnimation, settings);
        expect(response).toBe("Second card is shown!");
        expect(cardAnimation.currentRotation).toBeGreaterThanOrEqual(179);
    });
    test("Check cards are matching", async () => {
        const mockElement = document.createElement("div");
        const timerElement = document.createElement("p");

        timerElement.id = "timer";

        document.body.append(timerElement);

        let newImg = new Image;
        cardGame.displayCards = [newImg];

        const response = await cardGame.showMatchingCard(0, mockElement, 0, cardAnimation, settings);
        expect(response).toBe("Cards are matching!");
        expect(cardAnimation.currentRotation).toBe(0);
    });
    
  });
  