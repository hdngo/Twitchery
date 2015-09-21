# Twitchery
Twitchery is a single page web app that allows you to search for Twitch streams!

It's witchcraft with Twitch's craft..! Yet for some reason, I named it with the word sorcery in mind..

Check it out live on Heroku [here](http://twitchery.herokuapp.com/).

##UPDATE
New Features Implemented
  - Home Screen Animation
  - Loading Animation
  - Channel Tooltip
  - Channel and Stream Page Opening

##Technologies Used
* HTML
* CSS
* Vanilla JavaScript
* Twitch API


##User Stories
* A user can search for the streams that are currently available for a game.
* A user can see the results from their search.
* A user can page through multiple results.
* A user can see the stream's channel logo.
* A user can click on the stream name to view the actual stream.
* A user can click on the stream thumbnail to view the actual stream.
* A user can see the logo for the channel hosting the stream.
* A user should receive an 'error message' if they receive no results.

##Screenshots
![Landing Page](https://github.com/hdngo/Twitchery/blob/master/imgs/default-screen.png)
![Sample Results Page](https://github.com/hdngo/Twitchery/blob/master/imgs/sample-results.png)

##Personal Goals for this challenge
* Be consistent in the use of single / double quotes.
* Apply 'Atomic CSS' patterns.
* Adhere to SOLID and DRY code principles.
* Make GOOD Git commit messages, committing often.
* Follow good naming conventions for functions and variables.
* Use semicolons.
* Dynamically load as much of the DOM content as possible.
* Reinforce Vanilla JavaScript fundamentals.

##Potential Issues Found Thus Far
* The spacing of the elements on the page shift out of place and then readjust upon each XMLHttpRequest.
* The XHR response returned from hitting the API route returns a next link for the 'last page' of results, where upon redirecting to that link, no stream objects are returned.
* Because there is 'no saving' of the initial XHR response, the results count may change each time a user navigates to a previous page or the next page of results. I considered saving the initial response, but I chose to dynamically load each page.
* Overflow of stream title/name text. 
* The results content may be slow to load.

##Next Steps
* Implement promises that execute the XMLHTTPRequests, where some sort of loading screen/message is displayed until the promise is resolved and results are populated.
* Fix styling to prevent elements from shifting on the page with each GET request made, and fix word overflow.
* Make the web app responsive.
* Think of more features to implement!


##Resources used:
- Google
- Mozilla Developer Network
  - [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
  - [Image Constructor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image)
- W3Schools
  - [XMLHttpRequests](http://www.w3schools.com/ajax/ajax_xmlhttprequest_create.asp)
- StackOverflow
  - [XHR readyStates](http://stackoverflow.com/questions/632774/what-do-the-different-readystates-in-xmlhttprequest-mean-and-how-can-i-use-them)
  - [Default Parameters](http://stackoverflow.com/questions/894860/set-a-default-parameter-value-for-a-javascript-function)
  - [Removing Form Box Shadows](http://stackoverflow.com/questions/24222798/how-to-remove-the-blue-box-shadow-border-in-button-if-clicked)
  - [Adding Delays within Loops using IIFEs](http://stackoverflow.com/questions/11764714/applying-delay-between-iterations-of-javascript-for-loop)
- Twitch API Docs
  - [Search](https://github.com/justintv/Twitch-API/blob/master/v3_resources/search.md)
