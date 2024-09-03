var totalTime = { seconds: 0, minutes: 0, hours: 0 };
var vidCount = 0;

var isPlaylistPage = window.location.href.includes("playlist");
var videoElements = document.querySelectorAll(isPlaylistPage 
  ? "ytd-playlist-video-renderer" 
  : "ytd-playlist-panel-video-renderer"
);

videoElements.forEach((element) => {
  try {
    var timeString = isPlaylistPage
      ? element.querySelector("#overlays ytd-thumbnail-overlay-time-status-renderer span").textContent.trim()
      : element.querySelector("span#text").textContent.trim();
      
    var timeParts = timeString.split(":").map(Number);

    if (timeParts.length === 2) {
      totalTime.minutes += timeParts[0];
      totalTime.seconds += timeParts[1];
    } else if (timeParts.length === 3) {
      totalTime.hours += timeParts[0];
      totalTime.minutes += timeParts[1];
      totalTime.seconds += timeParts[2];
    }

    vidCount++;
  } catch (err) {
    console.error("Error parsing time for a video:", err);
  }
});

var calculateTotalTime = (totalTime) => {
  totalTime.minutes += Math.floor(totalTime.seconds / 60);
  totalTime.seconds %= 60;
  totalTime.hours += Math.floor(totalTime.minutes / 60);
  totalTime.minutes %= 60;
};

var formatTime = (totalTime) => {
  return `${totalTime.hours > 0 ? `${totalTime.hours} hrs ` : ""}${totalTime.minutes > 0 ? `${totalTime.minutes} mins ` : ""}${totalTime.seconds} s`;
};

calculateTotalTime(totalTime);
var totalTimeInSec = totalTime.seconds + totalTime.minutes * 60 + totalTime.hours * 3600;
var averageTimeInSec = Math.floor(totalTimeInSec / vidCount);

var timeCalc = (timeInSeconds) => {
  var tempTime = {
    seconds: Math.floor(timeInSeconds % 60),
    minutes: Math.floor((timeInSeconds / 60) % 60),
    hours: Math.floor(timeInSeconds / 3600)
  };
  return formatTime(tempTime);
};

var details = {
  vid: `No. of videos counted: ${vidCount}`,
  avgTime: `Avg. length of a video: ${timeCalc(averageTimeInSec)}`,
  time1: `Total time: ${formatTime(totalTime)}`,
  time1_25: `At 1.25x: ${timeCalc(totalTimeInSec / 1.25)}`,
  time1_5: `At 1.5x: ${timeCalc(totalTimeInSec / 1.5)}`,
  time1_75: `At 1.75x: ${timeCalc(totalTimeInSec / 1.75)}`,
  time2: `At 2x: ${timeCalc(totalTimeInSec / 2)}`
};

chrome.runtime.sendMessage(details);