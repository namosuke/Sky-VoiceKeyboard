// ==UserScript==
// @name         Sky VoiceKeyboard (日本語)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Nintendo Switch版のSkyで発行されるQRコードのURLをGoogle Chromeで開くと、自動的に音声認識が始まります。
// @author       namosuke
// @match        https://keyboard.sky.thatgame.co/keyboard/
// @icon         https://www.google.com/s2/favicons?domain=thatgame.co
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let speechRecognition = new webkitSpeechRecognition();
    speechRecognition.lang = 'ja-JP';
    speechRecognition.onresult = e => {
        const result = e.results[0][0].transcript;
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