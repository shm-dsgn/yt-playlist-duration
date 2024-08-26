// Function to store the selected speed and timestamp in Chrome storage
function storeSelectedSpeed(speed) {
  chrome.storage.local.set({ selectedSpeed: speed, timestamp: Date.now() }, () => {
    if (chrome.runtime.lastError) console.error("Error storing speed:", chrome.runtime.lastError);
  });
}

// Function to retrieve the selected speed from Chrome storage and check timestamp
function getStoredSpeed(callback) {
  chrome.storage.local.get(['selectedSpeed', 'timestamp'], (result) => {
    if (chrome.runtime.lastError) {
      console.error("Error retrieving speed:", chrome.runtime.lastError);
      return callback('1');
    }

    const expirationTime = 72 * 60 * 60 * 1000;
    const storedTimestamp = result.timestamp || 0;
    const isExpired = Date.now() - storedTimestamp > expirationTime;

    if (isExpired) {
      chrome.storage.local.remove(['selectedSpeed', 'timestamp'], () => {
        if (chrome.runtime.lastError) console.error("Error removing expired data:", chrome.runtime.lastError);
        callback('1');
      });
    } else {
      callback(result.selectedSpeed || '1');
    }
  });
}

function callCalculate(tab) {
  const { id, url } = tab;
  const isPlaylist = url.includes("https://www.youtube.com/playlist?") || url.match(/^.*(youtu.be\/|list=)([^#\&\?]*).*/);
  if (isPlaylist) {
    chrome.scripting.executeScript({ target: { tabId: id }, files: ["content.js"] });
  } else {
    document.querySelector("#v").innerText = "This page doesn't have a YouTube playlist.";
    document.querySelector("footer").innerText = "";
    document.querySelector("#controls").style.display = "none";
  }
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

getCurrentTab().then(callCalculate);

chrome.runtime.onMessage.addListener((request) => {
  document.querySelector("#v").innerText = request.vid;
  document.querySelector("#avg").innerText = request.avgTime;
  document.querySelector("#duration").innerText = request.time1;
  document.querySelector("#controls").style.display = "";

  getStoredSpeed((storedSpeed) => {
    const durationText = getDurationForSpeed(storedSpeed, request);
    document.querySelector("#speed").value = storedSpeed;
    document.querySelector("#duration").innerText = durationText;
  });

  document.querySelector("#speed").addEventListener("change", function() {
    const speed = this.value;
    storeSelectedSpeed(speed);
    document.querySelector("#duration").innerText = getDurationForSpeed(speed, request);
  });
});

// Function to get the duration based on speed
function getDurationForSpeed(speed, request) {
  return {
    "1": request.time1,
    "1.25": request.time1_25,
    "1.5": request.time1_5,
    "1.75": request.time1_75,
    "2": request.time2
  }[speed] || request.time1;
}