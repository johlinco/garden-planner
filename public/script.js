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

const api = 'http://localhost:3000/item';



//FUNCTIONS



function clearList() {
	list.innerHTML = "";
};


//prints list of days for watering
function wateringDays(plantedDate, waterFrequency) {
	let inGround = plantedDate;
	console.log(inGround);
	return inGround;
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
      myReject("Error");
    }
  };
  req.send();
})
};

//updates JSON db to reflect current status of checkbox based id and new status of checkbox
function updateCheckbox(id, checkStatus) {

		let patchCheckboxPromise = new Promise(function(myResolve, myReject) {
			let req = new XMLHttpRequest();
			req.open('PATCH', api + "/" + id);
			req.onload = function() {
				if (req.status == 200) {
					myResolve(req.response);
				} else {
					myReject("Error")
				}
			};
			req.setRequestHeader('Content-Type', 'application/json');
			if (checkStatus == false) {
				req.send(JSON.stringify({completed: false}));
				console.log('false is working');
			} if (checkStatus == true) {
				req.send(JSON.stringify({completed: true}));
				console.log('true is working');
			};	
		});
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

//removes item from JSON db when delete button is clicked
function deleteTodo(id) {
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



function renderCheckListItems() {

		//API request to get checklist items
		getTodoItemsPromise().then(
		//parsing JSON db	into array
	  function(value) {
	    const obj = JSON.parse(value);
	    console.log(obj.length);
	    console.log(obj);

	    
  		//loops through array
		  for (let i = 0; i < obj.length; i++) {
	  	

				//creates watering to dos from text for each array item
		  	var node = document.createElement("li");
						node.innerHTML = "Water " + obj[i].plant_name;
						node.id = obj[i].id;
						list.appendChild(node);

				//creates thinning to dos from text for each array item
		  	var node = document.createElement("li");
						node.innerHTML = "Thin " + obj[i].plant_name;
						node.id = obj[i].id;
						list.appendChild(node);

				//creates harvest to dos from text for each array item
		  	var node = document.createElement("li");
						node.innerHTML = "Harvest " + obj[i].plant_name;
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

		    wateringDays(obj[i].planted_date, obj[i].water_frequency);

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
	if(e.target && e.target.type == "checkbox") {
		console.log(e.target.id);
		console.log(e.target.checked);
		updateCheckbox(e.target.id, e.target.checked);
	} 

});


document.getElementById("results").addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.class == "button") {
		 //List item found!  Output the ID!
		console.log(e.target.id);
		deleteTodo(e.target.id)
			.then(clearList())
			.then(renderCheckListItems());
	} 
});
