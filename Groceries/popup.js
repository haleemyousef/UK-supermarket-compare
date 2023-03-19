document.getElementById("search-button").addEventListener("click", performSearch);

function performSearch() {
	var searchQuery = document.getElementById("search-query").value;
	var supermarket = [
		{ "name": "Tesco", "url": "https://www.tesco.com/groceries/en-GB/search?query=" },
		{ "name": "Sainsbury's", "url": "https://www.sainsburys.co.uk/gol-ui/SearchResults/" },
		{ "name": "Aldi", "url": "https://groceries.aldi.co.uk/en-GB/Search?keywords=" },
		{ "name": "Asda", "url": "https://groceries.asda.com/search/" },
		{ "name": "Morrisons", "url": "https://groceries.morrisons.com/search?entry=" },
		{ "name": "Marks & Spencer", "url": "https://www.ocado.com/search?entry=" },
		{ "name": "Waitrose", "url": "https://www.waitrose.com/ecom/shop/search?&searchTerm=" },
		{ "name": "Co-op", "url": "https://www.coop.co.uk/products/search?query=" },
		{ "name": "Iceland", "url": "https://www.iceland.co.uk/search?q=" },
		{ "name": "Home Bargains", "url": "https://www.homebargains.co.uk/search.aspx?searchterms=" },
		{ "name": "Poundland", "url": "https://www.poundland.co.uk/catalogsearch/result/?q=" }
		//{ "name": "OneBelow", "url": "" }, These do not have proper catalogue and search function online.
		//{ "name": "Lidl", "url": ""},
		//{ "name": "Farmfoods", "url": ""}
	];
	var tabIds = [];
	for (var i = 0; i < supermarket.length; i++) {
		var url = supermarket[i].url + searchQuery;
		chrome.tabs.create({ url: url }, function(tab) {
			tabIds.push(tab.id);
			if (tabIds.length === supermarket.length) {
				var groupName = searchQuery + " - UK Groceries";
				chrome.tabs.group({ tabIds: tabIds }, function(groupId) {
					chrome.tabGroups.update(groupId, { title: groupName, collapsed: true});
					chrome.tabs.query({ groupId: groupId }, function(tabs) {
						if (tabs.length > 0) {
							chrome.tabs.update(tabs[0].id, { active: true });
						}
					});
				});
			}
		});
	}
}
