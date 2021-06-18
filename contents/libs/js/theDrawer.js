/*
* Script by @ParasKCD, you can follow me on Twitter @ParasKCD https://twitter.com/ParasKCD

* Slightly Modified Version of Matt Clarke's App | List Widget which is bundled with XenHTML by default. 
* You can follow him on Twitter @_Matchstic https://twitter.com/_matchstic
* Grab XenHTML from https://xenpublic.incendo.ws/

* Also uses a slightly Modified version of Juneiphone's createDOM.js, a small utility that uses Vanilla Js' createElement();
* Website - http://junesiphone.com/

functionality

//if you wanna use it as just opening the Drawer
theDrawer({
    appChanger: false, //States if you want to use it as an appChanger or not.
    container: document.getElementById("container"), //States the container (div) you want the Drawer to attach to.
    title: "Applications", //States the title that can be put above the container.
    idSuffix: "apps", //States what suffix will be used in the Id of each app.
    addEvent: document.getElementById("buttonId") //States the container to attach an eventListener to.
});

//if you wanna use it to do something else.
theDrawer({
    appChanger: true,
    container: document.getElementById("container"),
    title: "App Changer",
    addEvent: document.getElementById("buttonId"),
    done: function(theApp) {
        //do something with that App!
    }
})
*/

(function(doc){
    var theDrawer = function(opts) {
        var allApps = api.apps.allApplications,
            drawerEntries = [],
            appChanger = opts.appChanger,
            container = opts.container,
            theMainButton = opts.addEvent,
            holder,
            createDiv = function(options) {
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
                if(options.appIcon) {
                    div.style.backgroundImage = options.appIcon;
                }
                if(options.openApp) {
                    div.addEventListener('click', function(){
                        api.apps.launchApplication(options.openApp);
                        closeDrawer();
                    });
                }
                if(options.changeApp) {
                    div.addEventListener('click', function() {
                        opts.done(options.changeApp);
                        closeDrawer();
                        opts.done = null;
                    })
                }
                if(options.attribute) {
                    div.setAttribute(options.attribute[0], options.attribute[1]);
                }
                return div;
            },
            addEvents = function(button, type, func) {
                button.addEventListener(type, func);
            },
            createDrawer = function() {
                container.innerHTML = '';
                container.className = 'drawer open';
                var header = createDiv({
                    type: 'div',
                    className: 'header'
                })
                var title = createDiv({
                        type: 'div',
                        id: 'drawerTitle',
                        innerHTML: opts.title
                    });
                    header.appendChild(title);
                var closeButton = createDiv({
                        type: 'div',
                        id: 'drawerButton',
                        class: 'theButton',
                        innerHTML: "Close"
                    });
                addEvents(closeButton, "click", closeDrawer); 
                header.appendChild(closeButton);
                container.appendChild(header);
                appChanger ? generateAppChanger() : generateApps();      
            },
            openDrawer = function() {
                drawerEntries = [];
                container.style.display = 'block';
                createDrawer();
            },
            closeDrawer = function() {
                container.style.display = 'none';
                drawerEntries = [];
                holder.innerHTML = '';
                container.innerHTML = '';
            },
            generateAppChanger = function() {
                holder = createDiv({
                    type: 'div',
                    id: 'appsHolder'
                });
                for(let i = 0; i < allApps.length; i++) {
                    //Appholder
                    let app = createDiv({
                            type: 'div',
                            id: allApps[i].identifier,
                            className: 'appDiv',
                            changeApp: allApps[i].identifier
                        });
                    // Icon
                    let appIcon = createDiv({
                            type: 'img',
                            className: 'appIcon'
                        });
                        appIcon.src = allApps[i].icon
                        app.appendChild(appIcon);
                    // Name
                    let appName = createDiv({
                            type: 'p',
                            className: 'appName',
                            innerHTML: allApps[i].name
                        });
                    app.appendChild(appName);
                    drawerEntries.push(app);
                }
                drawerEntries.forEach(function(e) {
                    holder.appendChild(e);
                });
                container.appendChild(holder);
            },
            generateApps = function() {
                holder = createDiv({
                    type: 'div',
                    id: 'appsHolder'
                });
                for(let i = 0; i < allApps.length; i++) {
                    //Appholder
                    let app = createDiv({
                            type: 'div',
                            id: allApps[i].identifier + opts.idSuffix,
                            className: 'appDiv',
                            openApp: allApps[i].identifier
                        });
                    // Icon
                    let appIcon = createDiv({
                            type: 'img',
                            className: 'appIcon'
                        });
                        appIcon.src = allApps[i].icon
                        app.appendChild(appIcon);
                    // Name
                    let appName = createDiv({
                            type: 'p',
                            className: 'appName',
                            innerHTML: allApps[i].name
                        });
                    app.appendChild(appName);
                    drawerEntries.push(app);
                }
                drawerEntries.forEach(function(e) {
                    holder.appendChild(e);
                });
                container.appendChild(holder);
            };
            if(opts.addEvent && !appChanger) {
                addEvents(theMainButton, 'click', openDrawer);
            } else {
                openDrawer();
            }
                     
    };
    window.theDrawer = theDrawer;
}(document))