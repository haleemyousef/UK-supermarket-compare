// listen for a click on the search button
document.getElementById("search-button").addEventListener("click", function() {
	// get the search term
	var searchTerm = document.getElementById("search-query").value;
	// create the urls for the search engines
	var googleUrl = "https://www.google.com/search?q=" + searchTerm;
	var duckduckgoUrl = "https://duckduckgo.com/?q=" + searchTerm;
	var bingUrl = "https://www.bing.com/search?q=" + searchTerm;

	// create the tabs
	chrome.tabs.create({ url: googleUrl }, function(googleTab) {
		chrome.tabs.create({ url: duckduckgoUrl }, function(duckduckgoTab) {
			chrome.tabs.create({ url: bingUrl }, function(bingTab) {
				// create the tab group
				var tabIds = [googleTab.id, duckduckgoTab.id, bingTab.id];
				chrome.tabs.group({ tabIds: tabIds }, function() {
					chrome.tabGroups.update({ tabGroupId: tabIds[0], title: searchTerm });
				});
			});
		});
	});
});