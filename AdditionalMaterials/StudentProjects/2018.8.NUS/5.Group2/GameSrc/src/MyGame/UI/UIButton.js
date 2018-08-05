"use strict";

window.UI = window.UI || {};
window.UI.currentButtonGroup = null;

/** A class to control buttons in the UI.
 * The developer are supposed to use static methods rather than creating new instance.
 *
 * There are 0 custom buttons at the beginning.
 *
 * Example:
 * {
 *      UIButton.setCustomButtonNumber(2);
 *      UIButton.setCustomButtonOnclick(1, (event) => { alert(event.type); });
 *      UIButton.setCustomButtonOnclick(2, function (event) { alert("button2 clicked"); });
 *      UIButton.displayButtonGroup("custom-button-group");
 *  }
 */
class UIButton {
    /**
     * @constructor
     * The developer are supposed to use static methods rather than creating new instance.
     */
    constructor() {
        console.warn("The developer are supposed to use static methods rather than creating new instance.");
    }

    /** Display one button group and hide all other button groups.
     * There are 5 groups now. Their ids are "custom-button-group", "Skill-button-group", "default-button-group", "combat-button-group", "character-button-group"
     * @param groupId {string} : The 'id' attribute of the button-group element. The button-group is a 'div' element in
     * index.html.
     */
    static displayButtonGroup(groupId) {
        let i;
        window.UI.lastButtonGroup = window.UI.currentButtonGroup;
        window.UI.currentButtonGroup = groupId;
        const buttons_groups = document.getElementsByClassName("UI-button-group");
        for (i = 0; i < buttons_groups.length; i++) {
            if (buttons_groups[i].id === groupId)
                buttons_groups[i].style.display = "block";
            else
                buttons_groups[i].style.display = "none";
        }
    }

    /** Set the Skill name displayed by a button in the Skill button group.
     * @param skillIndex {number} : An integer specifying the index of the Skill. Range from 1 to 4.
     * @param skillName {string} : What name to display on the button.
     */
    static setSkillName(skillIndex, skillName) {
        document.getElementById("skill" + skillIndex.toString() + "-button").innerText = skillName;
    }

    /**
     * Set the number of skill buttons that is enabled.
     * @param skillNumber {number} : An integer, the custom buttons numeric.
     */
    static setSkillNumber(skillNumber) {
        console.assert(skillNumber <= 4 && skillNumber >= 0);
        let i;
        for (i = 0; i < 4; i++) {
            setDisabled(document.getElementById("skill" + i.toString() + "-button"), i >= skillNumber);
        }
    }

    /**
     * Set the number of custom buttons.
     * @param buttonNumber {number} : An integer, the custom buttons numeric.
     */
    static setCustomButtonNumber(buttonNumber) {
        const wrapper = document.getElementById("custom-button-group");
        while (wrapper.childNodes.length > buttonNumber)
            wrapper.removeChild(wrapper.firstChild);
        let button;
        while (wrapper.childNodes.length < buttonNumber) {
            button = document.createElement('button');
            button.className = "button button-parchment button-rounded";
            wrapper.appendChild(button);
        }
    }

    /**
     * @returns {number} : Custom buttons numeric.
     */
    static getCustomButtonNumber() {
        return document.getElementById("custom-button-group").childNodes.length;
    }

    /**
     * Set the onclick event listener of a custom button.
     * @param buttonNumber {number} : An integer specifying the index of the custom button.
     * @param onclick {function} : The function will receive 1 parameter: event.
     */
    static setCustomButtonOnclick(buttonNumber, onclick) {
        document.getElementById("custom-button" + buttonNumber.toString()).onclick = onclick;
    }

    /**
     * Add a attribute to the button whose 'id' attribute is buttonId. Use this with caution.
     * @param buttonId
     * @param attributeName
     * @param attributeValue
     */
    static setAttributeById(buttonId, attributeName, attributeValue) {
        document.getElementById(buttonId).setAttribute(attributeName, attributeValue);
    }

    /**
     * Disable or enable all buttons.
     * @param disabled {boolean}
     */
    static disableButtons(disabled) {
        const UIButtonGroups = document.getElementsByClassName("UI-button-group");
        let group, i;
        for (group = 0; group < UIButtonGroups.length; group++) {
            const buttons = UIButtonGroups[group].getElementsByTagName("button");
            for (i = 0; i < buttons.length; i++) {
                setDisabled(buttons[i], disabled);
            }
        }
    }

    static backButtonGroup() {
        window.UI.currentButtonGroup = window.UI.lastButtonGroup;
        window.UI.lastButtonGroup = null;
        const groupId = window.UI.currentButtonGroup;
        const buttons_groups = document.getElementsByClassName("UI-button-group");
        let i;
        for (i = 0; i < buttons_groups.length; i++) {
            if (buttons_groups[i].id === groupId)
                buttons_groups[i].style.display = "block";
            else
                buttons_groups[i].style.display = "none";
        }
    }
}

function setDisabled(element, disabled) {
    if (disabled)
        element.setAttribute("disabled", "true");
    else
        element.removeAttribute("disabled");
}
