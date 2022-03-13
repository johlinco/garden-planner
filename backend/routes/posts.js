const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


//Gets back all posts
router.get('/', async (req, res) =>{
	//res.send('We are on posts. In the "posts.js" file, you dont need to specify the /posts route because app.js includes middleware that says how to direct all routes starting with /posts.');
	try{
		//Post.find() will return all of the items in the database. 
		const posts = await Post.find();
		res.json(posts);
	}catch(err){
		res.json({message: err});
	}
});


router.get('/specific', (req, res) => {
	res.send('This is a specific post. In the "posts.js" file you have specificed this route')
});

//Submits post
router.post('/', async (req, res) => {
	const post = new Post({
		plant_name: req.body.plant_name,
		completed: req.body.completed,
		harvest_time: req.body.harvest_time,
		thinning_time: req.body.thinning_time,
		thinning_spacing: req.body.thinning_spacing,
		water_frequency: req.body.water_frequency,
		planted_date: req.body.planted_date
	});
	try{
	const savedPost = post.save();
	res.json(savedPost);
	}catch(err){
		res.json({message: err});
	}
});

//Retrieve specific post
router.get('/:postId', async (req, res) => {
	try{
		const post = await Post.findById(req.params.postId);
		res.json(post);
	}catch(err){
		res.json({message: err});
	}
});

//Delete a specific post
router.delete('/:postId', async (req, res) => {
	try{
		const removedPost = await Post.remove({_id: req.params.postId })
		
	}catch(err){
		res.json({message: err});
	}	
});

//Update a post
router.patch('/:postId', async (req, res) => {
	try{
		const updatedPost = await Post.updateOne(
			{ _id: req.params.postId}, 
			{ $set: { title: req.body.title } }
		);
		res.json(updatedPost);
	}catch(err){
		res.json({ message: err});
	}
});


module.exports = router;