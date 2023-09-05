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
      function secondsToHoursMinutes(seconds) {
        // Calculate hours and remaining seconds
        const hours = Math.floor(seconds / 3600);
        const remainingSeconds = seconds % 3600;

        // Calculate minutes
        const minutes = Math.floor(remainingSeconds / 60);

        return { hours, minutes };
      }

      // Example usage:
      const totalSeconds = 7200; // Replace with the number of seconds you want to convert
      const { hours, minutes } = secondsToHoursMinutes(totalSeconds);

      console.log(`${hours} hour(s) ${minutes} minute(s)`);

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
        const seconds1 = battery.chargingTime;
        secondsToHoursMinutes(seconds1);
      }

      // Battery DisCharging Time
      battery.addEventListener("dischargingtimechange", () => {
        updateBatteryDisChargingTime();
      });
      function updateBatteryDisChargingTime() {
        const seconds2 = battery.chargingTime;
        secondsToHoursMinutes(seconds2);
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
