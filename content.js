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

timeCalc = (time, totalTime) => {
  totalTime.minutes = parseInt(time / 60);
  totalTime.seconds = parseInt(time % 60);
  totalTime.hours = parseInt(totalTime.minutes / 60);
  totalTime.minutes = parseInt(totalTime.minutes % 60);

  return totalTime;
}

var mvid = `Total no. of videos: ${vidCount}`;

totalTime.minutes += parseInt(totalTime.seconds / 60);
totalTime.seconds = totalTime.seconds % 60;
totalTime.hours += parseInt(totalTime.minutes / 60);
totalTime.minutes = totalTime.minutes % 60;

var m1 = `Total time of playlist: ${totalTime.hours} hours, ${totalTime.minutes} minutes, ${totalTime.seconds} seconds`;


//to calculate average time
var totalTimeInSec = totalTime.seconds + totalTime.minutes * 60 + totalTime.hours * 3600;
var average = parseInt(totalTimeInSec / vidCount);
var avgTime = timeCalc(average, totalTime)
var m_avg = `Average duration of a video: ${avgTime.hours} hours, ${avgTime.minutes} minutes, ${avgTime.seconds} seconds`;

//to calculate time at 1.5x
var totalTimeInSec1_5 = totalTimeInSec / 1.5;
var totalTime1_5 = timeCalc(totalTimeInSec1_5, totalTime)
var m1_5 = `At 1.5x: ${totalTime1_5.hours} hours, ${totalTime1_5.minutes} minutes, ${totalTime1_5.seconds} seconds`;


//to calculate time at 2x
var totalTimeInSec2 = totalTimeInSec / 2;
var totalTime2 = timeCalc(totalTimeInSec2, totalTime)
var m2 = `At 2x: ${totalTime2.hours} hours, ${totalTime2.minutes} minutes, ${totalTime2.seconds} seconds`;

var details = {
  v: mvid,
  avg: m_avg,
  t1: m1,
  t1_5: m1_5,
  t2: m2
}

chrome.runtime.sendMessage(details);
