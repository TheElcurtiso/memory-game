// Image sources for card states
const blankImgSrc = "images/blank.png"; // Image shown when the card is blank
var backImgSrc = "images/back.png"; // Image shown when the card is face down

// Class responsible for handling card animations
class CardAnimation {
    constructor() {
        this.currentRotation = 0; // Current rotation degree of the card
        this.currentScale = 1; // Current scale factor of the card
        this.currentTransformStyle = ""; // Current CSS transform style applied to the card
    }

    // Set the rotation of a card
    setRotation(currentRotation) {
        this.currentRotation = currentRotation;
    }

    // Set the scale of a card
    setScale(currentScale) {
        this.currentScale = currentScale;
    }

    // Start shrinking animation for matched cards
    startShrinking(cardBox, displayCards, timeoutBuffer, selectedCard, cardAnimation) {
        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                // Start shrinking the two matched cards
                let shrinkFirstCard = setInterval(this.shrink, 20, displayCards[timeoutBuffer], cardAnimation);
                let shrinkSecondCard = setInterval(this.shrink, 20, displayCards[selectedCard], cardAnimation);
                setTimeout(() => {
                    // Stop shrinking animation
                    clearInterval(shrinkFirstCard);
                    clearInterval(shrinkSecondCard);
                    // Reset the scale value to original
                    this.currentScale = 1;
                    // Change card images to blank
                    displayCards[timeoutBuffer].src = blankImgSrc;
                    displayCards[selectedCard].src = blankImgSrc;
                    // Enable interactions with all cards
                    cardBox.style.pointerEvents = "all";
                    resolve('Finished shrink animation');
                }, 1000); // Duration of the shrinking animation
            }, 1000); // Delay before starting the animation
        });
    }
    
    // Reset the selected cards back to their initial state if not matched
    resetSelectedCards(cardBox, displayCards, timeoutBuffer, selectedCard, cardAnimation) {
        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                // Start rotating the two unmatched cards back
                let rotateFirstCardBack = setInterval(this.rotate, 20, displayCards[timeoutBuffer], cardAnimation);
                let rotateSecondCardBack = setInterval(this.rotate, 20, displayCards[selectedCard], cardAnimation);
                setTimeout(() => {
                    // Change card images back to the initial back image
                    displayCards[timeoutBuffer].src = backImgSrc;
                    displayCards[selectedCard].src = backImgSrc;
                    setTimeout(() => { 
                        // Stop rotation animation
                        clearInterval(rotateFirstCardBack);
                        clearInterval(rotateSecondCardBack);
                        // Re-enable card interactions
                        displayCards[selectedCard].style.pointerEvents = "inherit";
                        displayCards[timeoutBuffer].style.pointerEvents = "inherit";
                        cardBox.style.pointerEvents = "all";
                        resolve('Finished rotation animation');
                    }, 1000); // Duration of the rotation animation
                }, 1000); // Delay before changing the image
            }, 1000); // Delay before starting the rotation back
        });
    }  
    
    // Rotate the card by increasing its Y-axis rotation
    rotate(card, cardAnimation) {
        // Increment the current rotation and apply it to the card's style
        cardAnimation.currentRotation++;
        card.style.transform = "rotateY(" + cardAnimation.currentRotation + "deg)";
        // Save the current transform style for further animations
        cardAnimation.currentTransformStyle = card.style.transform;
    }
    
    // Shrink the card by decreasing its scale
    shrink(card, cardAnimation) {
        cardAnimation.currentScale -= 0.011; // Decrease scale
        card.style.transform = cardAnimation.currentTransformStyle + " scale(" + cardAnimation.currentScale + "," + cardAnimation.currentScale + ")"; // Apply scale transform
    }

    // Create and display confetti animation
    createConfetti() {
        const confettiContainer = document.createElement('div'); // Create a container for confetti
        confettiContainer.classList.add('confetti');
        confettiContainer.id = "confetti_container";

        // Generate 100 confetti pieces
        for (let i = 0; i < 100; i++) {
            const confettiPiece = document.createElement('div');
            confettiPiece.classList.add('confetti-piece');
            confettiPiece.style.backgroundColor = this.getRandomColor(); // Assign random color
            confettiPiece.style.left = Math.random() * 100 + 'vw'; // Random horizontal position
            confettiPiece.style.top = Math.random() * -20 + 'vh'; // Random starting vertical position
            confettiPiece.style.animationDuration = Math.random() * 3 + 2 + 's'; // Random animation duration
            confettiPiece.style.animationDelay = Math.random() * 5 + 's'; // Random animation delay
            confettiPiece.style.width = Math.random() * 10 + 5 + 'px'; // Random width
            confettiPiece.style.height = confettiPiece.style.width; // Square shape

            confettiContainer.appendChild(confettiPiece);
        }

        document.body.appendChild(confettiContainer);

        // Remove confetti after 10 seconds
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
        }, 10000);
    }

    // Helper function to get a random color from a predefined list
    getRandomColor() {
        const colors = ['#FFC0CB', '#FFD700', '#ADFF2F', '#00FFFF', '#FF69B4', '#FFA07A'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Uncomment the following line if using this class with the test suite
// module.exports = CardAnimation;
