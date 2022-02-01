//MONGODB Password: Carmack1
//MONGODB Connection: mongodb+srv://johlinco:<password>@cluster0.v1fbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

mongoose.connect('mongodb+srv://johlinco:Carmack1@cluster0.v1fbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(() => {
    console.log('successfully connected to Mondo DB Atlas.');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas');
    console.error(error);
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://johlinco:Carmack1@cluster0.v1fbj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

  const kittySchema = new mongoose.Schema({
  name: String
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
     ? "Meow name is " + this.name
     : "I don't have a name";
    console.log(greeting);
  };

  const Kitten = mongoose.model('Kitten', kittySchema);

  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); // 'Silence'

  const fluffy = new Kitten({ name: 'fluffy' });
  fluffy.speak(); // "Meow name is fluffy"

  await fluffy.save();
  fluffy.speak();

  const kittens = await Kitten.find();
  console.log(kittens);

  await Kitten.find({ name: /^fluff/ });
};


  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})