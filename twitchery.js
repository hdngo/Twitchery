document.addEventListener("DOMContentLoaded", function(){
	var baseAPIUrl = "https://api.twitch.tv/kraken/search/streams?q=";

	var searchForm = document.getElementsByTagName("form")[0];
	searchForm.addEventListener("submit", returnSearchResults);
	var searchBar = searchForm.children[0];

	var resultsMessage = document.getElementById('results-message');
	var searchResults = document.getElementById('search-results');
	var searchResultsList = document.getElementById('search-results-list');
	var resultsCountText = document.getElementById('results-count');

	var pageIndex = document.getElementById("page-index");
	var currentPageNumber = document.getElementById("current-page-number");
	var totalPageCount = document.getElementById("total-num-pages");
	var nextPageLink = document.getElementsByClassName("next-link")[0];
	var previousPageLink = document.getElementsByClassName("previous-link")[0];
	nextPageLink.addEventListener('click', navigateToPage);
	previousPageLink.addEventListener('click', navigateToPage);


	function navigateToPage(event, url){
		url = typeof url !== 'undefined' ? url : this.href;
		event.preventDefault();
		clearSearchResultsList();
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp =new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp =new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
		    {
		    var queryResults = JSON.parse(xmlhttp.responseText);
		    updateResults(queryResults['_total']);
		    handlePagination(queryResults);

		    var streamResults = queryResults["streams"];
		    streamResults.forEach(function(result){
		    	var newRow = createSearchResultRow(result);
		    	searchResultsList.appendChild(newRow);
		    	newRow.appendChild(createThumbnailImage(result));
		    	var infoBox = createInfoBox(result);
		    	newRow.appendChild(infoBox);
		    })
		    }
		  else if(xmlhttp.readyState == 4 && xmlhttp.status == 400){
		  	updateResults();
		  }
		  }  
		xmlhttp.open("GET", url, true);
		xmlhttp.send();
	}

	function clearSearchResultsList(){
		searchResultsList.innerHTML = "";
	}

	function resetSearchBar(){
		searchBar.value = "";
	}
	
	function returnSearchResults(event){
		resultsMessage.style.visibility = 'visible';

		var searchQuery = searchBar.value;
		var url = baseAPIUrl + searchQuery;
		navigateToPage(event, url);
		resetSearchBar();
	}

	function throwNoResultsMessage(){
		toggleDisplay(pageIndex, "none");
		var noResultsMessage = document.createElement("p");
		noResultsMessage.innerText = "Sorry, we couldn't find anything. Try something else!";
		searchResultsList.appendChild(noResultsMessage);
	}

	function updateResults(resultsCount){
		if(resultsCount === 0 || resultsCount === undefined){
			toggleDisplay(resultsMessage, "none")
			throwNoResultsMessage();
			toggleDisplay(previousPageLink, "none");
			toggleDisplay(nextPageLink, "none");
		}
		else{
			toggleDisplay(pageIndex, "inline");
			resultsCountText.innerText = resultsCount;
			toggleDisplay(resultsMessage, "inline")
		}
	}

	function showResultsCount(){
		resultsMessage.style.display = "inline";
	}

	function hideResultsCount(){
		resultsMessage.style.display = "none";
	}

	function handlePagination(queryResults){
		toggleDisplay(previousPageLink, "none");
		toggleDisplay(nextPageLink, "none");
		if(queryResults["_total"] > 10){
			var indexOfResultPageNumber = queryResults["_links"]["self"].indexOf("offset");

			var indexOfLimitParam = queryResults["_links"]["self"].indexOf("limit");
			var indexOfQueryParam = queryResults["_links"]["self"].indexOf("&q");

			var resultPageNumber = parseInt( (queryResults["_links"]["self"].substring(indexOfResultPageNumber + 7, indexOfQueryParam)) / 10) + 1;
			currentPageNumber.innerText = resultPageNumber;

			var requestLimit = queryResults["_links"]["self"].substring(indexOfLimitParam + 6, indexOfLimitParam + 8);
			var totalNumOfPages = Math.ceil(queryResults["_total"] / requestLimit);
			totalPageCount.innerText = totalNumOfPages;

			if(queryResults["_links"]["next"] && resultPageNumber !== totalNumOfPages){
				toggleDisplay(nextPageLink, "inline");
				nextPageLink.setAttribute("href", queryResults["_links"]["next"]);
			}
			if(queryResults["_links"]["prev"]){
				toggleDisplay(previousPageLink, "inline");
				previousPageLink.setAttribute("href", queryResults["_links"]["prev"]);
			}
		}
	}

	function toggleDisplay(domElement, displayValue){
		domElement.style.display = displayValue;
	}

	function createSearchResultRow(streamObject){
		var resultDiv = document.createElement("div");
		resultDiv.classList.add('row', 'w-100');
		return resultDiv;
	}

	function createThumbnailImage(streamObject){
		var thumbnailUrl = streamObject["preview"]["medium"];
		var thumbnailImage = new Image('180', '180');
		thumbnailImage.classList.add('thumbnail-img', 'inline-b');
		thumbnailImage.src = thumbnailUrl;
		return thumbnailImage;
	}

	function createInfoBox(streamObject){
		var infoBox = document.createElement('div');
		infoBox.classList.add('info-box', 'pos-abs', 'mrg-left-20p', 'inline-b');
		infoBox.appendChild(renderStreamName(streamObject));
		infoBox.appendChild(renderViewersCount(streamObject));
		infoBox.appendChild(renderStreamDescription(streamObject));
		return infoBox;
	}

	function renderStreamName(streamObject){
		var streamName = document.createElement('h3');
		streamName.classList.add('mrg-top-0', 'pad-right-40p');
		streamName.innerText = streamObject["channel"]["status"];
		return streamName;
	}

	function renderViewersCount(streamObject){
		var viewersCount = document.createElement('p');
		viewersCount.innerText = streamObject.game + ' - ' + streamObject.viewers + ' viewers';
		return viewersCount;
	}

	function renderStreamDescription(streamObject){
		var streamDescription = document.createElement('p');
		var channelName = streamObject["channel"]["display_name"];
		var gameName = streamObject["channel"]["game"];
		streamDescription.innerText = channelName + " playing " + gameName;
		return streamDescription;
	}

})
