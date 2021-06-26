(function () {
  api.system.observeData(function (systemData) {
    loadTime(systemData);
  });
  api.resources.observeData(function (resourcesData) {
    checkBattery(resourcesData);
  });
  api.media.observeData(function (musicData) {
    loadMusic(musicData);
  });

  api.apps.observeData(function (appData) {
    loadApps(appData);
  });
  loadStorage();
  taphold({
    time: 400,
    element: doc.getElementById("iconHolder"),
    action: function (element) {
      console.log(changingApp);
      tapHoldOnIcon(element);
    },
    passTarget: true,
  });
  taphold({
    time: 400,
    element: doc.getElementById("topHolder"),
    action: function (element) {
      console.log(changingApp);
      tapHoldOnIcon(element);
    },
    passTarget: true,
  });
  taphold({
    time: 400,
    element: doc.getElementById("midHolder"),
    action: function (element) {
      console.log(changingApp);
      tapHoldOnIcon(element);
    },
    passTarget: true,
  });
  taphold({
    time: 400,
    element: doc.getElementById("bottomHolder"),
    action: function (element) {
      console.log(changingApp);
      tapHoldOnIcon(element);
    },
    passTarget: true,
  });
})();

if (config.reset) {
  resetStorage();
}
