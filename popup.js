callCalculate = (tab) => {
  const { id, url } = tab;
  if (
    url.indexOf("https://www.youtube.com/playlist?") > -1 ||
    url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/)
  ) {
    chrome.scripting.executeScript({
      target: { tabId: id },
      files: ["content.js"],
    });
  } else {
    document.querySelector("#p1").innerHTML =
      "This page doesn't have a YouTube playlist.";
    document.querySelector("footer").innerHTML = " ";
  }
};

getCurrentTab = async () => {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

getCurrentTab().then((tab) => {
  callCalculate(tab);
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  document.querySelector("#v").innerHTML = request.vid;
  //document.querySelector("#t_v").innerHTML = request.total_vid;
  document.querySelector("#avg").innerHTML = request.avgTime;
  document.querySelector("#p1").innerHTML = request.time1;
  document.querySelector("#p1_5").innerHTML = request.time1_5;
  document.querySelector("#p2").innerHTML = request.time2;
});
