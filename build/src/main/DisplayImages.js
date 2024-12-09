// Image source for the back of the card
var backImgSrc = "images/back.png";
// Base path for card images
const cardImgSrcStart = "images/card_";

// Class responsible for handling the display of card images
class DisplayImages {

    // Remove all card images from the display
    removeAll() {
        let all_cards = document.getElementById("cards");
        // Remove child elements from the card container until none remain
        while (all_cards != null && all_cards.firstChild) {
            all_cards.removeChild(all_cards.firstChild);
        }
    }

    // Generate card images for display based on randomized card pairs
    generate(randomCards, settings) {
        let imageCounter = 1; // Counter for assigning images to card pairs
        let displayCards = []; // Array to hold the image elements for display
        let cardImages = {}; // Object to map card indices to their image sources

        for (let i = 0; i < settings.getNumberOfCards(); i++) {
            var newImg = new Image(); // Create a new image element
            newImg.src = backImgSrc; // Set the source to the back of the card
            displayCards[i] = newImg; // Store the image element in the display array
            
            // If the current index is greater than the paired card index, assign an image
            if (i > randomCards[i]) {
                // Assign the same image to both cards in the pair
                cardImages[i] = cardImgSrcStart + imageCounter + ".png";
                cardImages[randomCards[i]] = cardImgSrcStart + imageCounter + ".png";
                imageCounter++; // Increment image counter for next pair
            }
            // Append the new image to the card container in the DOM
            document.getElementById("cards").appendChild(newImg);
        }
        // Return the arrays of display card elements and their corresponding images
        return [displayCards, cardImages];
    }
}

// Uncomment the following line if using this class with the test suite
// module.exports = DisplayImages;
