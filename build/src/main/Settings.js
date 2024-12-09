// Class responsible for managing game settings, including player data and scores
class Settings {

    constructor() {
        this.playerName = "Guest"; // Default player name
        this.correctScore = 0; // Score based on correct matches
        this.highScore = 0; // Highest score achieved
        this.numberOfCards = 48; // Default number of cards in the game
    }

    // Sets the player's name
    setName(playerName) {
        this.playerName = playerName;
    }

    // Gets the correct score
    getCorrectScore() {
        return this.correctScore;
    }

    // Sets the correct score
    setCorrectScore(correctScore) {
        this.correctScore = correctScore;
    }

    // Gets the high score
    getHighScore() {
        return parseFloat(this.highScore);
    }

    // Sets the high score
    setHighScore(highScore) {
        this.highScore = highScore;
    }

    // Gets the number of cards
    getNumberOfCards() {
        return this.numberOfCards;
    }

    // Sets the number of cards
    setNumberOfCards(numberOfCards) {
        this.numberOfCards = numberOfCards;
    }

    // Saves the player settings and updates the game state
    saveData() {
        document.getElementById("save_settings").addEventListener("click", () => {
            let playerName = document.getElementById("player_name").value;
            // Validate that the player name contains only alphabetic characters
            let isAlphabetic = /^[A-Za-z]+$/.test(playerName);
            if(isAlphabetic && playerName.length <= 20) {
                // Clear any error messages and update the player name
                document.getElementById("player_name_group").className = "";
                document.getElementById("error_message").innerHTML = "";

                this.setName(playerName); // Update the player's name
                this.setNumberOfCards(document.getElementById("num_cards").value); // Update the number of cards
                // Update the display data and refresh game setup
                this.setDisplayData();
                cardGame.setupCards(displayImages, this);
                cardGame.makeCardsClickable();
            } else {
                // Display an error message if the name validation fails
                let errorMessage = playerName.length > 20 ? "Name is too long!" : "Please use only alphabetical characters!"; 
                document.getElementById("player_name_group").className = "error";
                document.getElementById("error_message").innerHTML = errorMessage;
            }
        });
    }

    // Loads saved player data from local storage
    loadData() {
        this.playerName = localStorage.getItem("playerName") || "Guest"; // Load player name or default to "Guest"
        this.correctScore = localStorage.getItem("correctScore") || 0; // Load correct score or default to 0
        this.highScore = localStorage.getItem("highScore") || 0; // Load high score or default to 0
        this.numberOfCards = localStorage.getItem("numberOfCards") || 48; // Load number of cards or default to 48
    }

    // Updates the display with the current player data and saves it to local storage
    setDisplayData() {
        document.getElementById("player").innerHTML = "Player: " + this.playerName; // Display player name
        document.getElementById("high_score").innerHTML = "High Score: " + this.highScore + "%"; // Display high score
        document.getElementById("correct").innerHTML = "Correct: " + this.correctScore + "%"; // Display correct score
        localStorage.setItem("playerName", this.playerName); // Save player name to local storage
        localStorage.setItem("correctScore", this.correctScore); // Save correct score to local storage
        localStorage.setItem("highScore", this.highScore); // Save high score to local storage
        localStorage.setItem("numberOfCards", this.numberOfCards); // Save number of cards to local storage
    }
}

// Uncomment the following line if using this class with a test suite
// module.exports = Settings;
