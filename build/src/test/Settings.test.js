/**
 * @jest-environment jsdom
 */

const Settings = require('../main/Settings');

describe("CardAnimation", () => {
    const settings = new Settings();
  
    test("Set name of player", () => {
        settings.setName("Curtis");
        expect(settings.playerName).toBe("Curtis");
    });
    test("Get default correct score", () => {
        let correctScore = settings.getCorrectScore();
        expect(correctScore).toBe(0);
    });
    test("Set correct score", () => {
        settings.setCorrectScore(100);
        expect(settings.correctScore).toBe(100);
    });
    test("Get default high score", () => {
        let highScore = settings.getHighScore();
        expect(highScore).toBe(0);
    });
    test("Set high score", () => {
        settings.setHighScore(100);
        expect(settings.highScore).toBe(100);
    });
    test("Get default number of cards", () => {
        let numberOfCards = settings.getNumberOfCards();
        expect(numberOfCards).toBe(48);
    });
    test("Set number of cards", () => {
        settings.setNumberOfCards(8);
        expect(settings.numberOfCards).toBe(8);
    });
    test("Load default data from local storage", () => {
        settings.setName("Curtis");
        settings.loadData();
        expect(settings.playerName).toBe("Guest");
    });
    test("Check display data displays correctly", () => {
        const playerText = document.createElement("player");
        const highScoreText = document.createElement("high_score");
        const correctScoreText = document.createElement("correct_score");

        playerText.id = "player";
        highScoreText.id = "high_score";
        correctScoreText.id = "correct";

        document.body.appendChild(playerText);
        document.body.appendChild(highScoreText);
        document.body.appendChild(correctScoreText);

        settings.setName("Curtis");
        settings.setDisplayData();
        expect(document.getElementById("player").innerHTML).toBe("Player: Curtis");
    });

  });
  