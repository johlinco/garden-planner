//DOM ELEMENTS
var button = document.getElementById('btn');
var plant_name_input = document.getElementById('plant_name_input')
var harvest_time_input= document.getElementById('harvest_time_input')
var thinning_time_input = document.getElementById('thinning_time_input')
var thinning_spacing_input = document.getElementById('thinning_spacing_input')
var water_frequency_input = document.getElementById('water_frequency_input')
var planted_date_input = document.getElementById('planted_date_input')


//VARIABLES

const api = 'http://localhost:3000/item';



//FUNCTIONS


function postRequest(data) {
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open('POST', api);
		request.onreadystatechange = () => {
			if (request.readystate === 4) {
				if (request.status === 201) {
					resolve(JSON.parse(request.reponse));
				} else {
					reject(JSON.parse(request.response));
				}
			}
		};
		request.setRequestHeader('Content-Type', 'application/json');
		request.send(JSON.stringify(data));
	});
}


function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
	console.log(result);
}

//EVENT LISTENERS
btn.addEventListener('click', ($event) => {
	$event.preventDefault();
	

	const post = {
		plant_name: plant_name_input.value,
		harvest_time: parseInt(harvest_time_input.value),
		thinning_time: parseInt(thinning_time_input.value),
		thinning_spacing: parseInt(thinning_spacing_input.value),
		water_frequency: parseInt(water_frequency_input.value),
		planted_date: planted_date_input.value
	};

	postRequest(post);

	console.log(post);


});


