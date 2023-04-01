var totalTime = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

document.querySelectorAll("ytd-playlist-video-renderer").forEach((element) => {
  try {
    var timelist = element
      .querySelector("#overlays")
      .querySelector("ytd-thumbnail-overlay-time-status-renderer")
      .querySelector("span")
      .firstChild.data.trim()
      .split(":");

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

totalTime.minutes += parseInt(totalTime.seconds / 60);
totalTime.seconds = totalTime.seconds % 60;

totalTime.hours += parseInt(totalTime.minutes / 60);
totalTime.minutes = totalTime.minutes % 60;

var msg = `Total time of playlist: ${totalTime.hours} hours, ${totalTime.minutes} minutes, ${totalTime.seconds} seconds`; 
alert(msg);
