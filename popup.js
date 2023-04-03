callCalculate = (tab) => {
    const {id, url} = tab;
    if (url.indexOf('https://www.youtube.com/playlist?') > -1){
      chrome.scripting.executeScript(
        {
          target: {tabId: id},
          files: ['content.js']
        }
      )
      //console.log(`Tab id: ${id} and url: ${url}`)
    }
    else{
        document.querySelector("#p1").innerHTML = "This page doesn't have a YouTube playlist.";
        document.querySelector("footer").innerHTML = " ";
    }
  }
  
  getCurrentTab = async () => {
    let queryOptions = { active: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  
  
  getCurrentTab().then((tab)=>{
    callCalculate(tab)
  })
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    document.querySelector("#v").innerHTML = request.v;
    document.querySelector("#avg").innerHTML = request.avg;
    document.querySelector("#p1").innerHTML = request.t1;
    document.querySelector("#p1_5").innerHTML = request.t1_5;
    document.querySelector("#p2").innerHTML = request.t2;
  })