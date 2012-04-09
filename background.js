/*============================================================================================================
  Coprolalia Chrome Extension
  by Dr. Mike
  
  This work is provided without any warranty whatsoever. Use at your own risk.
  This work is licensed under a Creative Commons Attribution-Noncommercial-Share Alike 3.0 Unported License.
  However, we can do a Creative Commons BY-SA if you offer me to share the $$$ with me. 
  Email: coprolalia.web@gmail.com  
============================================================================================================*/

//----------------------------------------------------------------------------------------------------------
function getStatus() 
//----------------------------------------------------------------------------------------------------------
{
	if(!localStorage.getItem("status")) 
		localStorage.setItem("status", "on");
	
	return localStorage.getItem("status");
}

//----------------------------------------------------------------------------------------------------------
function updateIcon()
//----------------------------------------------------------------------------------------------------------
{
	var status = getStatus();
	chrome.browserAction.setIcon({ path: status + ".png" });
	chrome.browserAction.setTitle({ title: (status == "on" ? "Coprolalia is active. Click to deactivate." :	"Coprolalia is inactive. Click to activate.") });
}

//----------------------------------------------------------------------------------------------------------
function iconClicked() 
//----------------------------------------------------------------------------------------------------------
{
	var status = getStatus();
	status = (status == "on" ? "off" : "on");
	localStorage.setItem("status", status);
	
	updateIcon();
}

//----------------------------------------------------------------------------------------------------------
chrome.browserAction.onClicked.addListener(iconClicked);

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if(request.method == "getStatus")
      sendResponse({ data: getStatus() });
    else
      sendResponse({});
});

updateIcon();