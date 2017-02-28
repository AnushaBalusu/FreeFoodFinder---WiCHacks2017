var map;
var infowindow;
var timeArray = initTime();
var centerloc = {lat: 43.085, lng: -77.676};
var foodTypeArray = ["Pizza", "Pasta", "Cookies", "Cupcakes", "Hot Chocolate"];
var foodDict;
var locationDict = {
	"Panera Theatre": {
		lat:43.087214,
		lng:-77.668283
	}

};


var foodObject = {
	loc: "",
	lat: 0,
	lng: 0,
	timeStart: "",
	timeEnd: "",
	foodType: "",
	desc: ""
};

function reqListener () {
   console.log(this.responseText);
}


function initTime() {
	var timeArr = [];
	var j=0;
	for(var i=0; i<24; i++) {
		timeArr[j++] = i + ":00"; 
		timeArr[j++] = i + ":30";
	}

	return timeArr;
}         

function initMap() {
	console.log("initMap called");		
	var oReq = new XMLHttpRequest(); //New request object
	oReq.onload = function() {
		console.log(this.responseText);
   		//foodDict = JSON.parse(this.responseText);
   		data = JSON.parse(this.responseText);
		foodDict = data['event'];
   		console.log("data received" + foodDict[0]['lat']);

		foodTypeArray = data['food'];
		console.log("food types received" + foodTypeArray[0]['name']);
		
		locArray = data['loc'];
		console.log("locs received" + locArray[0]['name']);
		loadMap();
	};
	oReq.open("get", "fetchEvents.php", true);
	oReq.send();
}

function loadMap() {
	var mapSettings ={
          center: centerloc,
          zoom: 16
      	};

	map = new google.maps.Map(document.getElementById("map"), mapSettings);
        infowindow = new google.maps.InfoWindow({ maxWidth: 400});

	console.log("foodDict Loaded???" + foodDict.length);
        for(var entry in foodDict) {
          var pos = new google.maps.LatLng(foodDict[entry].lat,foodDict[entry].lng);
          var message = "<h2>"+foodDict[entry].loc+"</h2><b>Desc: </b>" + foodDict[entry].desc +"<br/><b> Time: </b>"+ foodDict[entry].timeStart + "-" 
             +foodDict[entry].timeEnd + "<br/><b>Food Type: </b>" + foodDict[entry].foodType;
          var title = foodDict[entry].desc;
	 console.log(message);
          createMarker(pos, title, message);
      }

	centerPosition(map);
	
	var buttonControlDiv = document.createElement('div');	// AddEvent button
	var buttonControl = new ButtonControl(buttonControlDiv, map);
	buttonControlDiv.index = 1;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(buttonControlDiv);

	
	var eventControlDiv = document.createElement('div'); // Event creation display
	eventControlDiv.id = "bla";
	var eventControl = new EventControl(eventControlDiv, map);
	eventControlDiv.index = 2;
	map.controls[google.maps.ControlPosition.TOP_RIGHT].push(eventControlDiv);


	buttonControlDiv.addEventListener('click', function() {
		eventControlDiv.style.visibility = "visible";
	
	});

} 


/*
 * adds the button control - AddEvent
 * */
function ButtonControl(buttonControlDiv, map) {
	
	var buttonUI = document.createElement('div');  // button UI
	buttonUI.title = 'Click to recenter the map';
	buttonUI.id = 'myButton';
	buttonControlDiv.appendChild(buttonUI);

	
	var buttonText = document.createElement('div');  // button text
	buttonText.id = 'myButtonText';
	buttonText.innerHTML = 'Add Event';
	buttonUI.appendChild(buttonText);

}


function EventControl(eventControlDiv, map) {
	var eventFormUI = document.createElement('div');
	eventFormUI.id = 'eventForm';
	eventControlDiv.appendChild(eventFormUI);

	
	//var closeBtn = document.createElement('img');  // close button
	var closeBtn = document.createElement('div');  // close button
	closeBtn.id = "closeBtn";
	closeBtn.innerHTML = " X";
//	closeBtn.setAttribute('src', 'images/closeBtn.png');
	
	closeBtn.addEventListener('click', function() {
		eventControlDiv.style.visibility = "hidden";
	
	});
	eventFormUI.appendChild(closeBtn);

	
	var locationUI = document.createElement('div');  // location
	locationUI.id = 'eventRow';
	var locLabel = document.createElement('div');
	locLabel.id = 'myLabel';
	locLabel.innerHTML = 'Location';
	locationUI.appendChild(locLabel);

	var locTextBox = document.createElement('select');
	locTextBox.id = 'myTextBox';
	setFoodOptions(locTextBox, locArray);
	locationUI.appendChild(locTextBox);
	eventFormUI.appendChild(locationUI);

	
	var timeUI = document.createElement('div');  // Time
	timeUI.id = 'eventRow';

	
	var timeStartLabel = document.createElement('div');  // Start Time
	timeStartLabel.id = 'mySelectLabel';
	timeStartLabel.innerHTML = 'Start Time';
	timeUI.appendChild(timeStartLabel);

	var timeStartInput = document.createElement('select');
	timeStartInput.id = 'mySelectBox';
	setOptions(timeStartInput, timeArray);
	timeUI.appendChild(timeStartInput);

	
	var timeEndLabel = document.createElement('div');  // End Time
	timeEndLabel.id = 'mySelectLabel';
	timeEndLabel.innerHTML = 'End Time';
	timeUI.appendChild(timeEndLabel);

	var timeEndInput = document.createElement('select');
	timeEndInput.id = 'mySelectBox';
	setOptions(timeEndInput, timeArray);
	timeUI.appendChild(timeEndInput);
	eventFormUI.appendChild(timeUI);

	
	var foodTypeUI = document.createElement('div');  // Food type
	foodTypeUI.id = 'eventRow';
	var foodTypeLabel = document.createElement('div');
	foodTypeLabel.id = 'myLabel';
	foodTypeLabel.innerHTML = 'Food Type';
	foodTypeUI.appendChild(foodTypeLabel);

	var foodTypeBox = document.createElement('select');
	foodTypeBox.id = 'mySelectBox';
	setFoodOptions(foodTypeBox, foodTypeArray);
	foodTypeUI.appendChild(foodTypeBox);
	eventFormUI.appendChild(foodTypeUI);

	
	var descLabel = document.createElement('div');  // Event Description
	descLabel.id = 'myLabel';
	descLabel.innerHTML = 'Event Description';
	eventFormUI.appendChild(descLabel);

	var descBox = document.createElement('textarea');
	descBox.id = 'myDescBox';
	eventFormUI.appendChild(descBox);

	var breakUI = document.createElement('div');
	breakUI.innerHTML = '<br />';
	eventFormUI.appendChild(breakUI);
	
	var submitUI = document.createElement('div');  // button UI
	submitUI.id = 'myButton1';
	eventFormUI.appendChild(submitUI);

	
	var submitText = document.createElement('div');  // button text
	submitText.id = 'myButtonText';
	submitText.innerHTML = 'Submit';
	submitUI.appendChild(submitText);
	
	submitUI.addEventListener('click', function() {
		alert("Event Submitted");
		foodObject = createFoodObject(locTextBox[locTextBox.selectedIndex].value, 
			timeStartInput.options[timeStartInput.selectedIndex].value, 
			timeEndInput.options[timeEndInput.selectedIndex].value, 
			foodTypeBox.options[foodTypeBox.selectedIndex].value, descBox.value);
		addNewFoodObject(foodObject);	

	});

}

function createFoodObject(loc, start, end, type, desc) {
	foodObject["lat"] = 22.00;
	foodObject["lng"] = 22.00;
	foodObject["timeStart"] = start;
	foodObject["timeEnd"] = end;
	foodObject["foodType"] = type;
	foodObject["desc"] = desc;
	foodObject["loc"] = loc;
	return foodObject;
}

function addNewFoodObject(foodObject) {
	console.log("adding");

	$.post('insertEvent.php', {data: JSON.stringify(foodObject)}, function(results){
  	// the output of the response is now handled via a variable call 'results'
  	   //alert(results);
		initMap();
  	});
	
}

function setOptions(timeStartInput, timeArray) {
       console.log("time array:" + timeArray);
	for(var i = 0; i < timeArray.length; i++) {
    	var opt = document.createElement('option');
    	opt.innerHTML = timeArray[i];
    	opt.value = timeArray[i];
    	timeStartInput.appendChild(opt);
	}
}


function setFoodOptions(element, objList) {
       console.log("time array:" + objList);
	for(var i = 0; i < objList.length; i++) {
    	var opt = document.createElement('option');
    	opt.innerHTML = objList[i]['name'];
    	opt.value = objList[i]['ID'];
    	element.appendChild(opt);
	}
}


function createMarker(latlng, title, content){

          var marker = new google.maps.Marker({
            map: map,
            position: latlng,
            title: title
            }); //end Marker
          google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(content);
            infowindow.open(map, marker);
          });
  
          
      }

function centerButton(controlDiv, map) {

       var controlUI = document.createElement('div');
       controlUI.style.backgroundColor = '#fff';
       controlUI.style.border = '2px solid #fff';
       controlUI.style.borderRadius = '3px';
       controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
       controlUI.style.cursor = 'pointer';
       controlUI.style.marginBottom = '22px';
       controlUI.style.textAlign = 'center';
       controlUI.title = 'Click to recenter the map';
       controlDiv.appendChild(controlUI);

       var controlText = document.createElement('div');
       controlText.style.color = 'rgb(25,25,25)';
       controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
       controlText.style.fontSize = '16px';
       controlText.style.lineHeight = '38px';
       controlText.style.paddingLeft = '5px';
       controlText.style.paddingRight = '5px';
       controlText.innerHTML = 'Center RIT Map';
       controlUI.appendChild(controlText);

       controlUI.addEventListener('click', function() {
         map.setCenter(centerloc);
       });

     }

     function centerPosition(map){

       var centerControlDiv = document.createElement('div');
       var centerControl = new centerButton(centerControlDiv, map);

       centerControlDiv.index = 1;
       map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);

       //limit zoom out
       google.maps.event.addListener(map, 'zoom_changed', function() {
       	if (map.getZoom() < 16) map.setZoom(16);
        }); //end of limit zoom out
       }
