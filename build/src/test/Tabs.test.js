/**
 * @jest-environment jsdom
 */

const Tabs = require('../main/Tabs');

describe("CardAnimation", () => {
    const tabs = new Tabs();
  
    test("Check if tabs are created correctly", () => {
        const tabLinks = document.createElement("tablinks");
        const tabContent = document.createElement("tabcontent");

        document.body.appendChild(tabLinks);
        document.body.appendChild(tabContent);

        tabs.activate();
        expect(document.getElementsByClassName("tablinks active")).not.toBeNull();
    });

  });
  