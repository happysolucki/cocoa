/*
* Script by @ParasKCD, you can follow me on Twitter @ParasKCD https://twitter.com/ParasKCD

* inspired by Junesiphone's storage.js
* Website - http://junesiphone.com/

Usage:

//Initiate Storage
theStorage.init({
    title: "storageName", //Make sure to change this
    extraStorage: { //Used to preload Items
        dockIcons: ["com.apple.mobilephone", "com.apple.MobileSMS", "com.apple.mobilesafari", "placeholder3", "placeholder4"], 
    }
});

//Replace App from widget
Illustration/example given in theDrawer.js (Requires theDrawer.js and thePrompter.js)

//Add/Replace Any SettingItem and store it in 
theStorage.replaceValueInLS(""+ keyName, "" + value);

//Remove SettingItem and save
theStorage.removeItemFromLS("" + keyName);
*/

var theStorage = {
    storageTitle: '',
    storageData: [],
    load: function() {
        var getStorage = JSON.parse(localStorage.getItem(theStorage.storageTitle)),
            i;
        if (getStorage != null) {
            for (i = 0; i < this.storageData.length; i++) {
                theStorage[this.storageData[i]] = getStorage[this.storageData[i]];
            }
        }
    },
    save: function() {
        var setStorage = {};
        for (var i = 0; i < this.storageData.length; i++) {
            setStorage[this.storageData[i]] = this[this.storageData[i]];
        }
        localStorage.setItem(this.storageTitle, JSON.stringify(setStorage));
    },
    replaceAppFromLS: function(array, older, newer) {
        if (this[array].indexOf(newer) > -1) {
            thePrompter({
                type: "alert",
                message: "You've already added this App!",
                promptYesText: "Sorry"
            });
            return;
        } else {
            var index = this[array].indexOf(older);
            if (index !== -1) {
                this[array][index] = newer;
            }
            this.save();
        }
    },
    replaceValueInLS: function(storageTitle, itemValue) {
        theStorage[storageTitle] = itemValue;
        this.storageData.push(storageTitle);
        this.save();
    },
    removeItemFromLS: function(array) {
        theStorage[array] = null;
        theStorage.save();
    },
    resetStorage: function() {
        localStorage.removeItem(this.storageTitle);
        location.href = location.href;
    },
    init: function(opts) {
        var i;
        this.storageTitle = opts.title;
        var extraStorage = [];
        Object.keys(opts.extraStorage).forEach(function(storageItem) {
            extraStorage.push(storageItem);
        });
        if (extraStorage.length > 0) {
            this.storageData = this.storageData.concat(extraStorage);
        }
        if (localStorage.getItem(opts.title)) {
            this.storageData = Object.keys(JSON.parse(localStorage.getItem(this.storageTitle)));
            this.load();
            return;
        } else {
            for (i = 0; i < this.storageData.length; i++) {
                theStorage[this.storageData[i]] = opts.extraStorage[this.storageData[i]];
            }
        }
        
    }
};