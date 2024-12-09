/**
 * @jest-environment jsdom
 */

const CardAnimation = require('../main/CardAnimation');
const backImgSrc = "images/back.png";
const blankImgSrc = "images/blank.png";

describe("CardAnimation", () => {
    const cardAnimation = new CardAnimation();
  
    test("Set rotation of card", () => {
        cardAnimation.setRotation(180);
        expect(cardAnimation.currentRotation).toBe(180);
    });
    test("Set scale of card", () => {
        cardAnimation.setScale(-1);
        expect(cardAnimation.currentScale).toBe(-1);
    });
    test("Element shrinks as expected", () => {
        const mockElement = document.createElement("div");
        cardAnimation.setScale(1);
        cardAnimation.shrink(mockElement, cardAnimation);
        expect(cardAnimation.currentScale).toBeLessThanOrEqual(1);
        expect(mockElement.style.transform).toBe(" scale(0.989,0.989)")
    });
    test("Element rotates as expected", () => {
        const mockElement = document.createElement("div");
        cardAnimation.setRotation(0);
        cardAnimation.rotate(mockElement, cardAnimation);
        expect(cardAnimation.currentRotation).toBe(1);
        expect(mockElement.style.transform).toBe("rotateY(1deg)");
    });
    test("The cards match and will start shrinking", async () => {
        const mockElement = document.createElement("div");
        let newImg = new Image;
        newImg.src = backImgSrc;
        const displayCards = [newImg];
        
        const response = await cardAnimation.startShrinking(mockElement, displayCards, 0, 0, cardAnimation, blankImgSrc)
        expect(response).toBe('Finished shrink animation');
        expect(cardAnimation.currentScale).toBe(1);
        expect(displayCards[0].src).toBe("http://localhost/" + blankImgSrc);
    });
    test("The cards don't match and will reset", async () => {
        const mockElement = document.createElement("div");
        let newImg = new Image;
        newImg.src = backImgSrc;
        const displayCards = [newImg];
        
        const response = await cardAnimation.resetSelectedCards(mockElement, displayCards, 0, 0, cardAnimation)
        expect(response).toBe('Finished rotation animation');
        expect(displayCards[0].src).toBe("http://localhost/" + backImgSrc);
        expect(displayCards[0].style.pointerEvents).toBe("inherit");
        expect(mockElement.style.pointerEvents).toBe("all");
    });
    test("The confetti is created correctly and adds to the document body", () => {
        cardAnimation.createConfetti()
        const confettiContainer = document.getElementById("confetti_container");
        expect(confettiContainer).not.toBeNull();
    });
    test("Create random colour", () => {
        const randomColour = cardAnimation.getRandomColor();
        const baseColours = ['#FFC0CB', '#FFD700', '#ADFF2F', '#00FFFF', '#FF69B4', '#FFA07A'];
        const randomColourInBaseColours = baseColours.includes(randomColour)
        expect(randomColourInBaseColours).toBe(true);
    });
  });
  