document.addEventListener("DOMContentLoaded", function(){
	var baseAPIUrl = "https://api.twitch.tv/kraken/search/streams?q="

	var searchForm = document.getElementsByTagName("form")[0]
	searchForm.addEventListener("submit", returnSearchResults)
	var searchBar = searchForm.children[0]

	var resultsMessage = document.getElementById('results-message')
	var searchResults = document.getElementById('search-results')
	var searchResultsList = document.getElementById('search-results-list')
	var resultsCountText = document.getElementById('results-count')

	function returnSearchResults(event){
		event.preventDefault()
		resultsMessage.style.visibility = 'visible'
		clearSearchResultsList();

		var searchQuery = searchBar.value

		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {

		    var queryResults = JSON.parse(xmlhttp.responseText)

		    updateResults(queryResults['_total'])

		    handlePagination(queryResults)

		    var streamResults = queryResults["streams"]
		    streamResults.forEach(function(result){
		    	searchResultsList.appendChild(createThumbnailImage(result))
		    	searchResultsList.appendChild(addStreamName(result))
		    	searchResultsList.appendChild(addViewersCount(result))
		    	searchResultsList.appendChild(addStreamDescription(result))
		    })
		    }
		  else if(xmlhttp.readyState==4 && xmlhttp.status==400){
		  	updateResults()
		  }

		  }  
		xmlhttp.open("GET", baseAPIUrl + searchQuery, true)
		xmlhttp.send()
		resetSearchBar();
	}

	function clearSearchResultsList(){
		searchResultsList.innerHTML = "";
	}

	function updateResults(resultsCount){
		if(resultsCount === 0 || resultsCount === undefined){
			hideResultsCount();
			throwNoResultsMessage();
		}
		else{
			resultsCountText.innerText = resultsCount
			showResultsCount();
		}
	}

	function handlePagination(queryResults){
		if(queryResults["_total"] > 10){
			//denominator in the current page/ total pages
			// console.log("generate " + Math.ceil(queryResults["_total"] / 10) + " pages")
			var currentPageNumber = document.getElementById("current-page-number")
			var indexOfResultPageNumber = queryResults["_links"]["self"].indexOf("offset")

			//identified bug - the api still provides a next link even if there are no streams returned from the next link
			var resultPageNumber = parseInt(queryResults["_links"]["self"].substring(indexOfResultPageNumber + 7, indexOfResultPageNumber + 8)) + 1
			currentPageNumber.innerText = resultPageNumber

			var totalPageCount = document.getElementById("total-num-pages")
			var indexOfLimitParam = queryResults["_links"]["self"].indexOf("limit")
			var requestLimit = queryResults["_links"]["self"].substring(indexOfLimitParam + 6, indexOfLimitParam + 8)
			totalPageCount.innerText = Math.ceil(queryResults["_total"] / requestLimit)

			if(queryResults["_links"]["next"]){
				var nextPageLink = document.getElementsByClassName("next-link")[0]
				nextPageLink.setAttribute("href", queryResults["_links"]["next"])
				nextPageLink.addEventListener('click', navigateToPage)
			}
			if(queryResults["_links"]["prev"]){
				var previousPageLink = document.getElementsByClassName("previous-link")[0]
				previousPageLink.setAttribute("href", queryResults["_links"]["prev"])
				previousPageLink.addEventListener('click', navigateToPage)
			}
		}
	}

	function createSearchResultRow(resultStreamObject){
		var resultDiv = document.createElement("div")
	}

	function createThumbnailImage(resultStreamObject){
		var thumbnailUrl = resultStreamObject["preview"]["medium"]
		var thumbnailImage = new Image('180', '180')
		thumbnailImage.classList.add('thumbnail-img')
		thumbnailImage.src = thumbnailUrl
		return thumbnailImage
	}

	function addStreamName(resultStreamObject){
		var streamName = document.createElement('h2')
		streamName.innerText = resultStreamObject["channel"]["status"]
		return streamName
	}

	function addViewersCount(resultStreamObject){
		var viewersCount = document.createElement('p')
		viewersCount.innerText = "Viewers " + resultStreamObject.viewers
		return viewersCount
	}

	function addStreamDescription(resultStreamObject){
		var streamDescription = document.createElement('p')
		var channelName = resultStreamObject["channel"]["display_name"]
		var gameName = resultStreamObject["channel"]["game"]
		streamDescription.innerText = channelName + " playing " + gameName
		return streamDescription
	}

	function showResultsCount(){
		resultsMessage.style.display = "inline"
	}

	function hideResultsCount(){
		resultsMessage.style.display = "none"
	}

	function throwNoResultsMessage(){
		var noResultsMessage = document.createElement("p")
		noResultsMessage.innerText = "Sorry, we couldn't find anything. Try something else!"
		searchResultsList.appendChild(noResultsMessage)
	}

	function resetSearchBar(){
		searchBar.value = ""
	}

	function navigateToPage(event){
		event.preventDefault()
		clearSearchResultsList();
		var xmlhttp;
		if (window.XMLHttpRequest)
		  {// code for IE7+, Firefox, Chrome, Opera, Safari
		  xmlhttp=new XMLHttpRequest();
		  }
		else
		  {// code for IE6, IE5
		  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		  }
		xmlhttp.onreadystatechange=function()
		  {
		  if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {

		    var queryResults = JSON.parse(xmlhttp.responseText)

		    updateResults(queryResults['_total'])

		    handlePagination(queryResults)

		    var streamResults = queryResults["streams"]
		    streamResults.forEach(function(result){
		    	searchResultsList.appendChild(createThumbnailImage(result))
		    	searchResultsList.appendChild(addStreamName(result))
		    	searchResultsList.appendChild(addViewersCount(result))
		    	searchResultsList.appendChild(addStreamDescription(result))
		    })
		    }
		  else if(xmlhttp.readyState==4 && xmlhttp.status==400){
		  	updateResults()
		  }

		  }  
		xmlhttp.open("GET", this.href, true)
		xmlhttp.send()
	}

})

