/*
* Script by @ParasKCD, you can follow me on Twitter @ParasKCD https://twitter.com/ParasKCD

* inspired by Junesiphone's jpopup.js
* Also uses a slightly Modified version of Juneiphone's createDOM.js, a small utility that uses Vanilla Js' createElement();
* Website - http://junesiphone.com/

Usage:

For Confirmation from user
thePrompter({
    type: "confirm",
    message: "messageText",
    promptYesText: "ButtonText",
    promptNoText: "ButtonText",
    promptYes: function() {
        //do Something
    },
    promptNo: function() {
        //do Something
    }
});

thePrompter({
    type: "alert",
    message: "messageText",
    promptYesText: "ButtonText",
    promptYes: function() {
        //do Something
    }
});
*/

(function(doc) {
    var thePrompter = function(opts) {
        var createDiv = function(options) {
            var div = doc.createElement(options.type);
            if(options.id) {
                div.id = options.id;
            }
            if(options.innerHTML) {
                div.innerHTML = options.innerHTML;
            }
            if (options.className) {
                div.setAttribute('class', options.className);
            }
            if(options.attribute) {
                div.setAttribute(options.attribute[0], options.attribute[1]);
            }
            return div;
        };
        var eventManagers = [],
            pushToEventManager = function(parameters) {
                eventManagers.push({
                    button: parameters.button,
                    event: parameters.event,
                    done: parameters.done
                });
                parameters.button.addEventListener(parameters.event, parameters.done);
            },
            removeEvents = function() {
                var event;
                for(let i = 0; i < eventManagers.length; i++) {
                    event = eventManagers[i];
                    event.button.removeEventListener(event.event, event.done);
                }
            },
            addEvents = function(button, div, event) {
                pushToEventManager({
                    button: button,
                    event: event,
                    done: function(e) {
                        if(e.target.id === "promptNo") {
                            if(opts.promptNo) {
                                opts.promptNo();
                            }
                        } else {
                            if(opts.promptYes) {
                                opts.promptYes();
                            }
                        }
                        removeEvents();
                        doc.body.removeChild(div);
                    }
                });
            },
            alertPrompt = function() {
                var promptWindow = createDiv({
                        type: 'div',
                        id: 'promptWindow'
                    }),
                    promptMessage = createDiv({
                        type: 'div',
                        id: 'promptMessage',
                        innerHTML: opts.message
                    }),
                    promptOptions = createDiv({
                        type: 'div',
                        className: 'promptOptions'
                    }),
                    promptYes = createDiv({
                        type: 'div',
                        id: 'promptYes',
                        className: 'oneButton',
                        innerHTML: opts.promptYesText,
                        attribute: ['title', opts.promptYesText]
                    });

                promptWindow.appendChild(promptMessage);
                promptOptions.appendChild(promptYes);
                promptWindow.appendChild(promptOptions);
                doc.body.appendChild(promptWindow);
                addEvents(promptYes, promptWindow, 'touchend');
                promptWindow = promptYes = promptMessage = promptOptions = null;
            },
            confirmPrompt = function() {
                var promptWindow = createDiv({
                        type: 'div',
                        id: 'promptWindow'
                    }),
                    promptMessage = createDiv({
                        type: 'div',
                        id: 'promptMessage',
                        innerHTML: opts.message
                    }),
                    promptOptions = createDiv({
                        type: 'div',
                        className: 'promptOptions'
                    }),
                    promptYes = createDiv({
                        type: 'div',
                        id: 'promptYes',
                        innerHTML: opts.promptYesText,
                        attribute: ['title', opts.promptYesText]
                    }),
                    promptNo = createDiv({
                        type: 'div',
                        id: 'promptNo',
                        innerHTML: opts.promptNoText,
                        attribute: ['title', opts.promptNoText]
                    });
                promptWindow.appendChild(promptMessage);
                promptOptions.appendChild(promptYes);
                promptOptions.appendChild(promptNo);
                promptWindow.appendChild(promptOptions);
                doc.body.appendChild(promptWindow);
                addEvents(promptYes, promptWindow, 'touchend');
                addEvents(promptNo, promptWindow, 'touchend');
                promptWindow = promptYes = promptNo = promptMessage = promptOptions = null;
            };
        switch(opts.type) {
            case "confirm": confirmPrompt();
                            break;

            case "alert": alertPrompt();
                            break;
            
            default: return;
        }
    }
    window.thePrompter = thePrompter;
}(document));