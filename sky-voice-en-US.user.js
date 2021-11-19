// ==UserScript==
// @name         Sky VoiceKeyboard (English)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  With Google Chrome, open the URL of QR code generated with Sky on Nintendo Switch, then the speech recognition be automatically started.
// @author       namosuke
// @match        https://keyboard.sky.thatgame.co/keyboard/
// @icon         https://www.google.com/s2/favicons?domain=thatgame.co
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.lang = 'en-US';
    speechRecognition.onresult = e => {
        const result = event.results[0][0].transcript;
        console.log(result);
        let input = document.querySelector('textarea');
        let nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
        nativeInputValueSetter.call(input, result);
        let ev = new Event('input', { bubbles: true});
        input.dispatchEvent(ev);
        document.querySelector('button').click();
        speechRecognition.stop();
    };
    speechRecognition.onend = () => {
        speechRecognition.start();
    };
    speechRecognition.start();
})();