const batteryLevel = document.querySelector(".batteryLevel");
const batteryCharging = document.querySelector(".batteryCharging");
const batteryChargingTime = document.querySelector(".batteryChargingTime");
const batteryDisChargingTime = document.querySelector(
  ".batteryDisChargingTime"
);

function secondsToHoursMinutes(seconds) {
  // Calculate hours and remaining seconds
  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;

  // Calculate minutes
  const minutes = Math.floor(remainingSeconds / 60);

  // Return a formatted string
  return `${hours} hour ${minutes} minutes`;
}

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
        updateBatteryChargingTime(battery.chargingTime);
      });
      function updateBatteryChargingTime(chargingTime) {
        batteryChargingTime.innerHTML = secondsToHoursMinutes(chargingTime);
      }

      // Battery DisCharging Time
      battery.addEventListener("dischargingtimechange", () => {
        updateBatteryDisChargingTime(battery.dischargingTime);
      });
      function updateBatteryDisChargingTime(dischargingTime) {
        batteryDisChargingTime.innerHTML =
          secondsToHoursMinutes(dischargingTime);
      }

      // Battery level change
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
