var totalTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

var vidCount=0;

document.querySelectorAll("ytd-playlist-video-renderer").forEach((element) => {
  try {
    var timelist = element
      .querySelector("#overlays")
      .querySelector("ytd-thumbnail-overlay-time-status-renderer")
      .querySelector("span")
      .firstChild.data.trim()
      .split(":");

      vidCount++;

    if (timelist.length === 2) {
      totalTime.minutes += parseInt(timelist[0]);
      totalTime.seconds += parseInt(timelist[1]);
    } else if (timelist.length === 3) {
      totalTime.hours += parseInt(timelist[0]);
      totalTime.minutes += parseInt(timelist[1]);
      totalTime.seconds += parseInt(timelist[2]);
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

  hrs = totalTime.hours>0? `${totalTime.hours} hours `: ``;
  mins = totalTime.minutes>0? `${totalTime.minutes} minutes `: ``;
  secs = totalTime.seconds>0? `${totalTime.seconds} seconds`: ``;

  return hrs + mins + secs;
}

//to calculate total no. of videos
var mvid = `Total no. of videos: ${vidCount}`;

//to calculate time at 1x
totalTime.minutes += parseInt(totalTime.seconds / 60);
totalTime.seconds = totalTime.seconds % 60;
totalTime.hours += parseInt(totalTime.minutes / 60);
totalTime.minutes = totalTime.minutes % 60;

var m1 = `Total time of playlist: ${totalTime.hours} hours ${totalTime.minutes} minutes ${totalTime.seconds} seconds`;


//to calculate average time
var totalTimeInSec = totalTime.seconds + totalTime.minutes * 60 + totalTime.hours * 3600;
var average = parseInt(totalTimeInSec / vidCount);
var m_avg = `Average duration of a video: ${timeCalc(average, totalTime)}`;

//to calculate time at 1.5x
var totalTimeInSec1_5 = totalTimeInSec / 1.5;
var m1_5 = `At 1.5x: ${timeCalc(totalTimeInSec1_5, totalTime)}`;


//to calculate time at 2x
var totalTimeInSec2 = totalTimeInSec / 2;
var m2 = `At 2x: ${timeCalc(totalTimeInSec2, totalTime)}`;

var details = {
  v: mvid,
  avg: m_avg,
  t1: m1,
  t1_5: m1_5,
  t2: m2
}

chrome.runtime.sendMessage(details);
