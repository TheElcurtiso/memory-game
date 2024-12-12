

// Class responsible for handling tab navigation functionality
class Tabs {

    // Activates the tab functionality by adding event listeners to tab buttons
    activate() {
        let tabButtons = document.getElementsByClassName("tablinks"); // Get all elements with the class "tablinks"
        let tabContent = document.getElementsByClassName("tabcontent"); // Get all elements with the class "tabcontent"

        // Iterate through each tab button and add a click event listener
        for (let tabButtonPosition = 0; tabButtonPosition < tabButtons.length; tabButtonPosition++) {
            document.getElementById(tabButtons[tabButtonPosition].id).addEventListener("click", () => {
                // Set the clicked tab as active and show its corresponding content
                this.setActive(tabButtonPosition, tabButtons, tabContent);
            });
        }
    }

    // Sets the active tab and hides other tabs' content
    setActive(activeButton, tabButtons, tabContent) {
        // Iterate through each tab button to update their states
        for (let currentTabButton = 0; currentTabButton < tabButtons.length; currentTabButton++) {
            if (currentTabButton == activeButton) { 
                // If the current button is the active button, set it to active
                tabButtons[currentTabButton].className = "tablinks active";
                tabContent[currentTabButton].className = "tabcontent"; // Show the corresponding tab content
            } else {
                // If not active, remove the active class and hide its content
                tabButtons[currentTabButton].className = "tablinks";
                tabContent[currentTabButton].className = "tabcontent hide"; // Hide the tab content
            }
        }
    }
}

// Uncomment the following line if using this class with a test suite
// module.exports = Tabs;
