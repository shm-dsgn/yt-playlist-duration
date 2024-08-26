var totalTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

var vidCount = 0;
var windowType;

if (window.location.href.includes("playlist")) {
  allPlaylistVideos = document.querySelectorAll("ytd-playlist-video-renderer");
  windowType = "playlist";
} else {
  allPlaylistVideos = document.querySelectorAll(
    "ytd-playlist-panel-video-renderer"
  );
  windowType = "panel";
}

allPlaylistVideos.forEach((element) => {
  try {
    var timelist;
    if (windowType === "playlist") {
      timelist = element
        .querySelector("#overlays")
        .querySelector("ytd-thumbnail-overlay-time-status-renderer")
        .querySelector("span")
        .firstChild.data.trim()
        .split(":");
    } else if (windowType === "panel") {
      timelist = element.querySelector("span#text").innerHTML.split(":");
    }
    vidCount++;
    //console.log(timelist);

    if (timelist.length === 2) {
      totalTime.minutes += Number(timelist[0]);
      totalTime.seconds += Number(timelist[1]);
    } else if (timelist.length === 3) {
      totalTime.hours += Number(timelist[0]);
      totalTime.minutes += Number(timelist[1]);
      totalTime.seconds += Number(timelist[2]);
    }
  } catch (err) {
    console.log(err);
  }
});

//to calculate time
timeCalc = (time, totalTime) => {
  totalTime.minutes = parseInt(time / 60);
  totalTime.seconds = parseInt(time % 60);
  totalTime.hours = parseInt(totalTime.minutes / 60);
  totalTime.minutes = parseInt(totalTime.minutes % 60);

  let hrs, mins, secs;

  hrs = totalTime.hours > 0 ? `${totalTime.hours} hrs ` : ``;
  mins = totalTime.minutes > 0 ? `${totalTime.minutes} mins ` : ``;
  secs = totalTime.seconds > 0 ? `${totalTime.seconds} s` : ``;

  return hrs + mins + secs;
};

//to calculate total no. of videos
var mvid = `No. of videos counted: ${vidCount}`;

//to calculate time at 1x
totalTime.minutes += parseInt(totalTime.seconds / 60);
totalTime.seconds = totalTime.seconds % 60;
totalTime.hours += parseInt(totalTime.minutes / 60);
totalTime.minutes = totalTime.minutes % 60;

var totalTimeInSec =
  totalTime.seconds + totalTime.minutes * 60 + totalTime.hours * 3600;

var t1 = `Total time: ${totalTime.hours} hrs ${totalTime.minutes} mins ${totalTime.seconds} s`;

//to find average duration of video
var average = parseInt(totalTimeInSec / vidCount);
var t_avg = `Avg. duration of a video: ${timeCalc(average, totalTime)}`;

var t1_25 = `At 1.25x: ${timeCalc(totalTimeInSec / 1.25, totalTime)}`;

var t1_5 = `At 1.5x: ${timeCalc(totalTimeInSec / 1.5, totalTime)}`;

var t1_75 = `At 1.75x: ${timeCalc(totalTimeInSec / 1.75, totalTime)}`;

var t2 = `At 2x: ${timeCalc(totalTimeInSec / 2, totalTime)}`;

// Send details back including all speeds
var details = {
  vid: mvid,
  avgTime: t_avg,
  time1: t1,
  time1_25: t1_25,
  time1_5: t1_5,
  time1_75: t1_75,
  time2: t2,
};

chrome.runtime.sendMessage(details);
