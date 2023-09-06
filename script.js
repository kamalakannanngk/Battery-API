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
        if (batteryLevel < 20) {
          alert(`Battery low!`);
        }
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
        if (chargingTime !== null) {
          batteryChargingTime.innerHTML = secondsToHoursMinutes(chargingTime);
        } else {
          batteryChargingTime.innerHTML = "Battery is discharging";
        }
      }

      // Battery DisCharging Time
      battery.addEventListener("dischargingtimechange", () => {
        updateBatteryDisChargingTime(battery.dischargingTime);
      });
      function updateBatteryDisChargingTime(dischargingTime) {
        if (dischargingTime !== null) {
          batteryDisChargingTime.innerHTML =
            secondsToHoursMinutes(dischargingTime);
        } else {
          batteryDisChargingTime.innerHTML = "Battery is Charging";
        }
      }

      // Battery level change
      battery.addEventListener("levelchange", () => {
        updateLevelChange();
      });
      function updateLevelChange() {
        const level = battery.level * 100 + "%";
        batteryLevel.innerHTML = level;
        if (level < 20) {
          alert(`Battery low!`);
        }
      }
    });
  }
};
battery();
