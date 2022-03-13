const mongoose = require('mongoose');

const PlantSchema = mongoose.Schema({
	plant_name: {
		type: String,
		required: true
	},
	completed: {
		type: Boolean,
		default: false
	},
	harvest_time: {
		type: Number,
		required: true
	},
	thinning_time: {
		type: Number
	},
	thinning_spacing: {
		type: Number
	},
	water_frequency: {
		type: Number
	},
	planted_date: {
		type: Date,
		required: true
	}
})

module.exports = mongoose.model('plants', PlantSchema);