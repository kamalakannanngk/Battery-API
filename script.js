const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

const battery = () => {
  if ("getBattery" in navigator) {
    navigator.getBattery().then((battery) => {
      function updateAll() {
        updateBatteryLevel();
        updateChargingInfo();
        updateBatteryChargingTime();
        updateBatteryDisChargingTime();
        updateLevelChange();
      }
      updateAll();

      // Battery Level
      battery.addEventListener("chargingchange", () => {
        updateBatteryLevel();
      });
      function updateBatteryLevel() {
        batteryLevel.innerHTML = battery.level * 100 + "%";
      }

      // Battery Charging
      battery.addEventListener("chargingchange", () => {
        updateChargingInfo();
      });
      function updateChargingInfo() {
        const isCharging = battery.charging ? "Yes" : "No";
        batteryCharging.innerHTML = isCharging;
      }

      // Battery Charging Time
      battery.addEventListener("chargingtimechange", () => {
        updateBatteryChargingTime();
      });
      function updateBatteryChargingTime() {
        batteryChargingTime.innerHTML = battery.chargingTime + " seconds";
      }

      // Battery DisCharging Time
      battery.addEventListener("dischargingtimechange", () => {
        updateBatteryDisChargingTime();
      });
      function updateBatteryDisChargingTime() {
        batteryDisChargingTime.innerHTML = battery.dischargingTime + " seconds";
      }
      //Battery level change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });
      function updateLevelChange() {
        const level = battery.level * 100 + "%";
        batteryLevel.innerHTML = level;
      }
    });
  }
};
battery();
