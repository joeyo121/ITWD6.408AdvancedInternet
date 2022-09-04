//-----------------------------------------------------
//CURTAIN MENU
function openNav() {
	//If viewport width is < 768px then make curtain menu 100%
	let viewportWidth = window.innerWidth || document.documentElement.clientWidth;
	
	if (viewportWidth >= 768) {
	//If viewport width is min-width: 768px then make curtain menu 50%
	document.getElementById("curtain-nav").style.width = "50%";	
	} else {
	document.getElementById("curtain-nav").style.width = "100%";
	}		
}

function closeNav() {
	document.getElementById("curtain-nav").style.width = "0%";			
}

//-----------------------------------------------------
//RSS Feed	
function loadRSS() {
	//Use CORS API website as proxy
	let proxy = "https://cors-anywhere.herokuapp.com/";
	//Declare the URL where we fetch RSS file: NASA RSS Breaking NEWS
	let url = "https://www.nasa.gov/rss/dyn/breaking_news.rss";

	//Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", proxy + url, true);
	xhttp.send();
	//Process RSS file when it has been loaded successfully
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	//Load XML file as "XML" format and parse/process it by calling function parseRSS()
	let rss = this.responseText;
	parseRSS(this); }
	};
}

function parseRSS(rss) {
	//Load all "items" inside the RSS document, each item is a news
	let items = rss.responseXML.getElementsByTagName("item");
	let rssContent = "";//varible "rssContent" is used to store rss content in HTML format
	//Loop through all items and extract child node content: "title", "link", "description" and "pubdate"
	for (let i = 0; i< items.length; i++) {
	let nodes = items[i].children;
	//Extract "title", "link", "description" and "pubdate" of each "node"
	let title, pubdate, description, link;
	for (let j = 0; j < nodes.length; j++) {
	if (nodes[j].tagName == "title") {
	title = nodes[j].childNodes[0].nodeValue;
	} else if (nodes[j].tagName == "link") {
	link = nodes[j].childNodes[0].nodeValue;
	} else if (nodes[j].tagName == "description") {
	description = nodes[j].childNodes[0].nodeValue;
	} else if (nodes[j].tagName == "pubDate") {
	pubdate = nodes[j].childNodes[0].nodeValue;
		}
	}	
	//Format the extracted information above in HTML format and append it to the "rssContent" variable
	//each item (news) is wrapped inside a <div>
	rssContent += `<div class="col-12 col-md-6 bg-secondary bg-opacity-25 border border-white border-5 p-4">
		<h3>${title}</h3>
		<p style="font-style: italic;">${pubdate}</p>
		<p>${description}</p>
		<p><a href="${link}">Read more</a></p>
		 </div>`;
	}
	
	//Display the "rssContent" on the webpage
	document.getElementById("rssFeed").innerHTML = rssContent;
}

//-----------------------------------------------------
//Tablet List
let tabletList = [{id: 0, title: "Tablet: Ipad", image_url: "MEDIA/ipad.png", descr: "Apple iPad 10.2\" (9th Gen) 64GB Wi-Fi - (Silver) - A13 Bionic chip with Neural Engine"},
					{id: 1, title: "Tablet: Samsung", image_url: "MEDIA/samsung.png", descr: "Samsung Galaxy TAB A8 (WiFi) Tablet -10.5\" 4GB Ram 64GB Storage - Wi-Fi Android - Grey"},
					{id: 2, title: "Tablet: Microsoft", image_url: "MEDIA/microsoft.png", descr: "Microsoft Surface Pro 8 (Home & Personal Model) -13\" Touchscreen Intel 11th Gen i5 Processor 8GB 128GB Win 11 Home - Platinum"},
					{id: 3, title: "Tablet: Lenovo", image_url: "MEDIA/lenovo.png", descr: "Lenovo M10 HD (TB-X505F) WiFi Only - 10.1\" IPS HD (800x1280) Qualcomm Snapdragon 429 2GB Ram 32GB Storage Android - Black - 2M Front /5MP Rear Camera"},
					{id: 4, title: "Tablet: Huawei", image_url: "MEDIA/huawei.png", descr: "Huawei Matepad T10 WiFi Tablet - 9.7\" 1280x800 - Kirin 710A Octa-Core - 2GB RAM - 32GB Storage - EMUI OS 10.1 - Deep Sea Blue - Bundled with Huawei Band 4E (Limited Qty)"},
				];

//-----------------------				
//Automatic Slideshow
let autoIndex = 0;
function autoSlideshow() {
	//Change the autoIndex 
	if (autoIndex < tabletList.length -1) {
		autoIndex ++;
	} else {
		autoIndex = 0;
	}
	
	//Extract title, url, description. Then display them on HTML Elements
	document.getElementById("auto-slide-title").innerHTML = tabletList[autoIndex].title;
	document.getElementById("auto-slide-image").src = tabletList[autoIndex].image_url; 
	document.getElementById("auto-slide-description").innerHTML = tabletList[autoIndex].descr; 
	
	//Wait 2.8 seconds and display next movie
	setTimeout(autoSlideshow, 2800);
}

//Execute the autoSlideshow() function when on the website
//autoSlideshow();

//-----------------------
//Manual Slideshow
let manualIndex = 0;
//Next Tablet
function nextTablet() {
	//Increase the index by 1 if the index <= length
	if (manualIndex < tabletList.length -1) {
		manualIndex ++;
	} else {
		manualIndex = 0;
	}

	//Extract the title, image url and display on HTML elements
	document.getElementById("manual-slide-title").innerHTML = tabletList[manualIndex].title;
	document.getElementById("manual-slide-image").src = tabletList[manualIndex].image_url;
	document.getElementById("manual-slide-description").innerHTML = tabletList[manualIndex].descr;
}

//Previous Tablet
function previousTablet() {
	//Decrease the index if the index is not 0
	if (manualIndex > 0) {
		manualIndex --;
	} else {
		manualIndex = tabletList.length -1;
	}
	
	//Extract the title, image url and display on HTML elements
	document.getElementById("manual-slide-title").innerHTML = tabletList[manualIndex].title;
	document.getElementById("manual-slide-image").src = tabletList[manualIndex].image_url;
	document.getElementById("manual-slide-description").innerHTML = tabletList[manualIndex].descr;
}

//-----------------------------------------------------
//Customize webpage
//Change font size
let fontSizeList = [{id: 0, label: "Small", size: "0.8em"},
					{id: 1, label: "Regular", size: "1.0em"},
					{id: 2, label: "Large", size: "1.5em"},
					{id: 3, label: "Extra Large", size: "2.0em"},
					];

//Populate the select "options" with all the color in the array when the page is loaded						
function loadFontSize() {
	let fontSizeSelect = document.getElementById("text-size");
	for (var i=0; i < fontSizeList.length; i++) {
		//Create a new child HTML node as "option" as a child node
		let node = document.createElement("option");
		//Assign option "text content" and "vaule" to this new node
		node.value = fontSizeList[i].id.toString();
		node.textContent = fontSizeList[i].label.toString();
		//Append the above Html node (option) to the parent node
		fontSizeSelect.appendChild(node);
	}
	//Set the first item as selected option * id 1 for regular
	fontSizeSelect.selectedIndex =1;
}

function customizeText() {
	let selectedTextSize = document.getElementById("text-size").value;
	document.getElementById("customizeSample").style.fontSize = fontSizeList[selectedTextSize].size;
}

//----------------
//Change background color
//Color list
let colorList = [{id: 0, label: "White", color: "#FFFFFF"},
				{id: 1, label: "Orange", color: "#E0B35E"},
				{id: 2, label: "Blue", color: "#1C9EC6"},
				{id: 3, label: "Green", color: "#0BA552"},
				{id: 4, label: "Black", color: "#161109"},
				];

//Populate the select "options" with all the color in the array when the page is loaded				
function loadColors() {
	let colorSelect = document.getElementById("selected-backgroundcolor");
	for(var i=0; i < colorList.length; i++) {
		//Create a new child HTML node/element as "<option>" (as a child node)
		let node = document.createElement("option");
		//Assign option "text content" and "value" to this new node
		node.value = colorList[i].id.toString();
		node.textContent = colorList[i].label.toString();
		//Append the above Html node (option) to the parent node
		colorSelect.appendChild(node);
	}
	//Set the first item as selected option
	colorSelect.selectedIndex =0;
}

function customizeBackground() {
	let selectedColorIndex = document.getElementById("selected-backgroundcolor").value;
	document.getElementById("customizeSample").style.backgroundColor = colorList[selectedColorIndex].color;
	
	//Change the font color to white if black(id: 4) is selected as the background color
	if (document.getElementById("selected-backgroundcolor").value == 4 ) {
		document.getElementById("customizeSample").style.color = "#FFFFFF";
	}
	//Else keep text color as black
	else {
		document.getElementById("customizeSample").style.color = "#000000";
	}
}

//-----------------------------------------------------
//Add new comment
//Comment Data: 
let allComments = [{name: "Sarah", comment: "Very good"},
					{name: "Harry", comment: "A13 Bionic chip excellent."},
					{name: "Brian", comment: "I recommend this product!"},
					{name: "Michelle", comment: "Not enough gigs. Do not recommend."},
					];

//----------------
//Load all exisiting comments
function loadComments() {
	for (var i=0; i < allComments.length; i++) {
		let name = allComments[i].name;
		let comment = allComments[i].comment;
				
		//Create a new HTML node/element <p> to display this comment
		let node = document.createElement("p");
		let hr = document.createElement("hr");
		//
		let textnode = document.createTextNode(name + ": " + comment);
		
		node.appendChild(textnode); //Append the content to the HTML node
		node.appendChild(hr); //Add horizontal line to divide comments
		let parent_node = document.getElementById("comment-list");
		
		parent_node.appendChild(node);
		
	}
}

//----------------
//Add a new comment
function addComment() {
	//Get entered value/data by user
	let enteredCommentName = document.getElementById("comment_name").value;
	let enteredCommentText = document.getElementById("comment_text").value;
	
	//Add new comments to the array
	allComments.push({name: enteredCommentName, comment: enteredCommentText});
	alert("Thank you for your comment!");
	
	//Display this new comment on the HTML Page
	//Create a new child HTML node/element as "<p>"
	let node = document.createElement("p");
	//Create a new textNode
	let textNode = document.createTextNode(enteredCommentName + ": " + enteredCommentText);
	//Append the content to the HTML Node
	node.appendChild(textNode);
	//Get the id of parent node "comment-list"
	let parent_node = document.getElementById("comment-list");
	//Append the above child HTML node to the parent node
	parent_node.appendChild(node);
	
	//Clear comment box
	document.getElementById("comment_name").value = "";
	document.getElementById("comment_text").value = "";
}

//-----------------------------------------------------
//Vote: Like/Dislike
//Assume current votes
let currentVotes = {like: 16, dislike: 2};

//Load the current votes to HTML 
document.getElementById("likeNumber").innerHTML = currentVotes.like;
document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;

//Variables to track the clicking status
//Rule: allow only one vote
let voteStatus = {like: false, dislike: false};

//Click on like button
function like() {
	//Check current status of like button
	if (voteStatus.like == false) {
		//Increase a "Like": Increase the like number 1
		document.getElementById("likeNumber").innerHTML = currentVotes.like + 1;
		//Change the background color to green
		document.getElementById("likeButton").style.backgroundColor = "green";
		//Change the current status of "like" button: has been clicked
		voteStatus.like = true;
		
		//Check "dislike" status - if dislike has been voted, down it by one & change status to False &
		//change background color to white
		if (voteStatus.dislike == true) {
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
		voteStatus.dislike = false;//
		document.getElementById("dislikeButton").style.backgroundColor = "white"; 
		}
	} else {
		//Keep the current number of like
		document.getElementById("likeNumber").innerHTML = currentVotes.like;
		//Change the background color of Like button to WHITE
		document.getElementById("likeButton").style.backgroundColor = "white";
		//Change the current status of "like" button
		voteStatus.like = false;//has been clicked 
	}
}

//Click Dislike button
function dislike() {
	//Check current status of "dislike" button (has been clicked or not)
	if (voteStatus.dislike == false) {
		//Increase a "disLike" by 1
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike + 1;
		//Change the background color of Like button to RED
		document.getElementById("dislikeButton").style.backgroundColor = "red";
		//Change the current status of "dislike" button
		voteStatus.dislike = true;//has been clicked
		
		//Check "like" status - if like has been voted, down it by one & change status to False & change
		//background color to white
		if (voteStatus.like == true) {
		document.getElementById("likeNumber").innerHTML = currentVotes.like;
		voteStatus.like = false;//
		document.getElementById("likeButton").style.backgroundColor = "white";
		}
	} else {
		//Keep the current number of of "dislike"
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
		//Change the background color of disLike button to WHITE
		document.getElementById("dislikeButton").style.backgroundColor = "white";
		//Change the current status of "dislike" button
		voteStatus.dislike = false;//has been clicked
	}
}
