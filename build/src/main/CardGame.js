// Constants defining the card image height and the minimum number of cards
const cardImageHeight = 103;
const lowestNumberOfCards = 8;

// Class responsible for managing the logic of a card matching game
class CardGame {
    constructor() {
        this.randomCards = {}; // Object mapping card pairs
        this.visuals = []; // Array to hold visual elements related to cards
        this.displayCards = []; // Array of card elements to display
        this.cardImages = {}; // Object mapping card indexes to their images
        this.totalCounter = 0; // Counter for total attempts
        this.successfulCounter = 0; // Counter for successful matches
    }

    // Sets up the cards for a new game
    setupCards(displayImages, settings) {
        displayImages.removeAll(); // Clear any existing card images
        this.randomCards = this.randomiseCards(settings); // Randomize the cards
        console.log(this.randomCards);
        this.visuals = displayImages.generate(this.randomCards, settings); // Generate visual elements for the cards
        this.displayCards = this.visuals[0]; // Assign display card elements
        this.cardImages = this.visuals[1]; // Assign card images
        this.totalCounter = 0; // Reset total attempts counter
        this.successfulCounter = 0; // Reset successful matches counter

        const cardNode = document.getElementById("cards");
        // Set the height of the card container based on the number of cards
        cardNode.style.height = (this.displayCards.length / lowestNumberOfCards * cardImageHeight) + "px";
    }

    // Randomizes card pairs and returns an object mapping pairs
    randomiseCards(settings) {
        let cards = [];
        let numberOfCards = settings.getNumberOfCards(); // Get the number of cards from settings
        for (let sequentialNum = 0; sequentialNum < numberOfCards; sequentialNum++) {
            cards[sequentialNum] = sequentialNum; // Fill cards array sequentially
        }
        this.shuffle(cards); // Shuffle the cards

        let matchingCards = {};
        for (let currentCard = 0; currentCard < numberOfCards; currentCard += 2) {
            // Create pairs of matching cards
            matchingCards[cards[currentCard]] = cards[currentCard + 1];
            matchingCards[cards[currentCard + 1]] = cards[currentCard];
        }
        return matchingCards;
    }
    
    // Shuffle the array of cards using Fisher-Yates algorithm
    shuffle(cards) {
        let currentIndex = cards.length;

        // Continue shuffling until no elements remain
        while (currentIndex != 0) {
            // Pick a remaining element randomly
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap the current element with the randomly selected one
            [cards[currentIndex], cards[randomIndex]] = [
                cards[randomIndex], cards[currentIndex]];
        }
    }

    // Checks if the win condition is met and updates scores
    checkWinCondition(settings, cardAnimation) {
        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                // Check if all pairs have been successfully matched
                if (this.successfulCounter == settings.getNumberOfCards() / 2) {
                    let currentScore = parseFloat(this.successfulCounter / this.totalCounter * 100).toFixed(2);
                    settings.setCorrectScore(currentScore);
                    // Update high score if current score is higher
                    if (currentScore > settings.getHighScore()) {
                        settings.setHighScore(currentScore);
                    }
                    settings.setDisplayData(); // Update displayed data with new scores

                    const cardNode = document.getElementById("cards");
                    cardNode.innerHTML = ""; // Clear card display
                    let winText = document.createElement("p");
                    winText.id = "win_text";
                    winText.innerText = "You Win!"; // Display win message
                    cardNode.appendChild(winText);

                    cardAnimation.createConfetti(); // Trigger confetti animation
                    resolve("The player has won!");
                }
                resolve("The player hasn't won yet.");
            }, 4000); // Delay before checking win condition
        });
    }

    // Displays the first selected card
    showFirstCard(selectedCard, cardBox, cardAnimation) {
        // Start rotation animation
        let rotateCard = setInterval(cardAnimation.rotate, 10, this.displayCards[selectedCard], cardAnimation);

        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                // Change the selected card's image to reveal it
                this.displayCards[selectedCard].src = this.cardImages[selectedCard];
                setTimeout(() => { 
                    // Re-enable card interactions except for the selected card
                    cardBox.style.pointerEvents = "all";
                    // Stop the rotation animation
                    clearInterval(rotateCard);
                    // Reset the rotation value
                    cardAnimation.setRotation(0);
                    resolve("First card is shown!");
                }, 1000); // Duration of the card reveal
            }, 1000); // Delay before showing the card
        });
    }

    // Displays the second selected card and checks for a match
    showSecondCard(selectedCard, cardBox, timeoutBuffer, cardAnimation) {
        // Start rotation animation
        let rotateCard = setInterval(cardAnimation.rotate, 10, this.displayCards[selectedCard], cardAnimation);

        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                this.displayCards[selectedCard].src = this.cardImages[selectedCard];
                setTimeout(() => { 
                    clearInterval(rotateCard);
                    // Reset the selected cards if they don't match
                    cardAnimation.resetSelectedCards(cardBox, this.displayCards, timeoutBuffer, selectedCard, cardAnimation);
                    resolve("Second card is shown!");
                }, 1000); // Duration of the card reveal
            }, 1000); // Delay before showing the card
        });
    }

    // Displays a matching card pair and starts the shrinking animation
    showMatchingCard(selectedCard, cardBox, timeoutBuffer, cardAnimation) {
        // Start rotation animation
        let rotateCard = setInterval(cardAnimation.rotate, 10, this.displayCards[selectedCard], cardAnimation);

        return new Promise((resolve, reject) => { 
            setTimeout(() => {
                // Reveal the card
                this.displayCards[selectedCard].src = this.cardImages[selectedCard];
                setTimeout(() => {
                    // Stop the rotation animation
                    clearInterval(rotateCard);
                    // Reset the rotation value
                    cardAnimation.setRotation(0);
                    // Start shrinking animation for matched cards
                    cardAnimation.startShrinking(cardBox, this.displayCards, timeoutBuffer, selectedCard, cardAnimation);
                    resolve("Cards are matching!");
                }, 1000); // Duration of the card reveal
            }, 1000); // Delay before showing the card
        });
    }

    // Makes cards clickable and handles card selection logic
    makeCardsClickable() {
        let cardBuffer = -1; // Buffer to store the first selected card
        for (let selectedCard = 0; selectedCard < this.displayCards.length; selectedCard++) {
            this.displayCards[selectedCard].addEventListener("click", () => {
                let timeoutBuffer = cardBuffer; // Store the current buffer
                let cardBox = document.getElementById("cards");

                // If the first card has not been selected
                if (cardBuffer == -1) {
                    cardBuffer = selectedCard; // Store the selected card in the buffer
                    cardBox.style.pointerEvents = "none"; // Disable card interactions
                    this.displayCards[selectedCard].style.pointerEvents = "none"; // Disable interaction for the selected card
                    this.showFirstCard(selectedCard, cardBox, cardAnimation);
                }
                // If the first card has been selected and the second card matches
                else if (this.randomCards[cardBuffer] == selectedCard && cardBuffer != selectedCard) {
                    cardBox.style.pointerEvents = "none"; // Disable card interactions
                    this.displayCards[selectedCard].style.pointerEvents = "none"; // Disable interaction for the selected card
                    this.showMatchingCard(selectedCard, cardBox, timeoutBuffer, cardAnimation);
                    cardBuffer = -1; // Reset the buffer
                    this.successfulCounter++; // Increment successful match counter
                    this.totalCounter++; // Increment total attempts counter
                    this.checkWinCondition(settings, cardAnimation); // Check if the game is won
                }
                // If the first card has been selected and the second card doesn't match
                else if (this.randomCards[cardBuffer] != selectedCard && cardBuffer != selectedCard) {
                    cardBox.style.pointerEvents = "none"; // Disable card interactions
                    this.displayCards[selectedCard].style.pointerEvents = "none"; // Disable interaction for the selected card
                    this.showSecondCard(selectedCard, cardBox, timeoutBuffer, cardAnimation);
                    cardBuffer = -1; // Reset the buffer
                    this.totalCounter++; // Increment total attempts counter
                }
            });
        }
    }
}

// Uncomment the following line if using this class with the test suite
// module.exports = CardGame;
