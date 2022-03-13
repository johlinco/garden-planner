


//DOM ELEMENTS
var button = document.getElementById('btn');
var plant_name_input = document.getElementById('plant_name_input')
var harvest_time_input= document.getElementById('harvest_time_input')
var thinning_time_input = document.getElementById('thinning_time_input')
var thinning_spacing_input = document.getElementById('thinning_spacing_input')
var water_frequency_input = document.getElementById('water_frequency_input')
var planted_date_input = document.getElementById('planted_date_input')
var list = document.getElementById('results')

//VARIABLES

const api = '/api/plants';


//FUNCTIONS



function clearList() {
	list.innerHTML = "";
};



//gets data from JSON db
function getTodoItemsPromise() {
	return new Promise(function(myResolve, myReject) {
  let req = new XMLHttpRequest();
  req.open('GET', api);
  req.onload = function() {
    if (req.status == 200) {
      myResolve(req.response);
    } else {
      myReject("Get Error");
    }
  };
  req.send();
})
};


function postRequest(data) {
	return new Promise(function(myResolve, myReject) {
		let req = new XMLHttpRequest();
		req.open('POST', api);
		req.onload = function() {
			if (req.status == 201) {
				myResolve(req.response);
			} else {
				myReject("Error")
			}
		};
		req.setRequestHeader('Content-Type', 'application/json');
		req.send(JSON.stringify(data));
	});
};

//takes id of plant removes corresponding item from JSON db
function deletePlant(id) {
	return new Promise(function(myResolve, myReject) {
	let req = new XMLHttpRequest();
	req.open('DELETE', api + "/" + id);
	req.onload = function() {
		if (req.status == 200) {
			myResolve(req.response);
		} else {
			myReject("Error")
		}
	};
		req.send();
	});
};

// generates array of dates for watering, takes 
function wateringDays(plantedDate, waterFrequency) {
	let dates = [];
	let someDate = new Date(plantedDate).getTime() / 1000;
	let numberOfDaysToAdd = waterFrequency;
	while (someDate <= 1634011200) {
	someDate = new Date(someDate * 1000);
	someDate = someDate.setDate(someDate.getDate() + numberOfDaysToAdd); 
	dates.push(new Date(someDate));
	someDate = new Date(someDate).getTime() / 1000;
	}	
	return dates;
};

function renderCheckListItems() {

		//API request to get checklist items
		getTodoItemsPromise().then(
		//parsing JSON db	into array
	  function(value) {
	    const obj = JSON.parse(value);
	    console.log(obj);



  		//loops through array of plants from JSON db
		  for (let i = 0; i < obj.length; i++) {
	  	
		  var dates = wateringDays(obj[i].planted_date, obj[i].water_frequency);

				//creates watering to dos from text for each array item
		  	for (let d = 0; d < dates.length; d++) {
			  	var node = document.createElement("li");
							node.innerHTML = dates[d].getUTCMonth() + 1 + "/" + dates[d].getUTCDate() + ": Water " + obj[i].plant_name;
							node.id = obj[i].id;
							list.appendChild(node);
				}			

				//creates thinning to dos from text for each array item
		  	if (obj[i].thinning_time !== null) {
			  	var node = document.createElement("li");
			  			thinningDate = new Date(obj[i].planted_date);
			  			thinningDate = thinningDate.setDate(thinningDate.getDate() + obj[i].thinning_time);
			  			thinningDate = new Date(thinningDate);
							node.innerHTML = thinningDate.getUTCMonth() + 1 + "/" + thinningDate.getUTCDate() + ": Thin " + obj[i].plant_name + " plants to one plant every " + obj[i].thinning_spacing + " inches";
							node.id = obj[i].id;
							list.appendChild(node);
				};

				//creates harvest to dos from text for each array item
		  	var node = document.createElement("li");
		  			harvestDate = new Date(obj[i].planted_date);
		  			harvestDate = harvestDate.setDate(harvestDate.getDate() + obj[i].harvest_time);
		  			harvestDate  = new Date(harvestDate);
						node.innerHTML = harvestDate.getUTCMonth() + 1 + "/" + harvestDate.getUTCDate() + ": Harvest " + obj[i].plant_name;
						node.id = obj[i].id;
						list.appendChild(node);


				//creates delete buttons for each array item
				const buttonElem = document.createElement('button');
				    buttonElem.innerText = 'delete';
						buttonElem.type = "delete";
						buttonElem.id = obj[i].id;
						buttonElem.class = "button";			    
				    list.appendChild(buttonElem);
				    list.appendChild(document.createElement("br"));



		  }
	  },

	  function(error) {
	    console.log(error);
	  }
  );  
}

//EVENT LISTENERS
btn.addEventListener('click', ($event) => {
	$event.preventDefault();
	//renderCheckListItems();

	const post = {
		plant_name: plant_name_input.value,
		completed: false,
		harvest_time: parseInt(harvest_time_input.value),
		thinning_time: parseInt(thinning_time_input.value),
		thinning_spacing: parseInt(thinning_spacing_input.value),
		water_frequency: parseInt(water_frequency_input.value),
		planted_date: planted_date_input.value
	};

	postRequest(post)
	.then(renderCheckListItems());
});



document.getElementById("results").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.class == "button") {
		 //List item found!  Output the ID!
		deletePlant(e.target.id)
			.then(clearList())
			.then(renderCheckListItems());
	} 
});
