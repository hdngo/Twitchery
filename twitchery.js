document.addEventListener("DOMContentLoaded", function(){
	console.log("game starto")

	var searchForm = document.getElementsByTagName("form")[0]
	searchForm.addEventListener("submit", returnSearchResults)

	//lesson learned: without the event.preventDefault(), the search bar would automatically clear its content and remove the dynamically appended content after being submitted
	function returnSearchResults(event){
		event.preventDefault()

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
		    alert('hit the api')
		    var queryResults = JSON.parse(xmlhttp.responseText)
		    var streamResults = queryResults["streams"]
		    streamResults.forEach(function(result){
		    	console.log('a result')
		    	console.log(result)
		    })
		    debugger
		    }


		  }  
		xmlhttp.open("GET", "https://api.twitch.tv/kraken/search/streams?q=starcraft", true)
		xmlhttp.send()
		// var searchResults = document.getElementById('search-results')
		// var searchBar = this.children[0]
		// alert(searchBar.value)
		// var resultDiv = document.createElement('div')
		// searchResults.appendChild(resultDiv)
	}


})

