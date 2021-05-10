require('dotenv').config();

const mongoose = require("mongoose");
const dbCon = process.env.MONGO_URI;
console.log(dbCon);
mongoose.connect("mongodb+srv://khadija:taiyeba@cluster0.gjjfs.mongodb.net/mongo?retryWrites=true&w=majority", { 
  useNewUrlParser: true, 
  useUnifiedTopology: true });

 
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);


const createAndSavePerson = (done) => 
{
  let Khadija= new Person({
    name: "Khadija",
    age: 22,
    favoriteFoods: ["anythingspicy","thaifood","turkishfood","bengalifood"]
  });

 Khadija.save((error, data) => 
 {
    if (error) {
      console.log(error);
    } else {
       done(null, data);
    }
  });
 
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
		if (err) return done(err);
		done(null, people);
	});
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: [food] }, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findPersonById = (personId, done) => {
  Person.findById({ _id: personId }, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
	Person.findById(personId, (err, person) => {
		if (err) return done(err);
		person.favoriteFoods.push(foodToAdd);
		person.save((err, person) => {
			if (err) return done(err);
			done(null, person);
		});
	});
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
Person.findOneAndUpdate(
		{ name: personName },
		{ age: ageToSet },
		{ new: true },
		(err, person) => {
			if (err) return done(err);
			done(null, person);
		}
	);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
		if (err) return done(err);
		done(null, data);
	});
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};

const queryChain = (done) => 
{
  const foodToSearch = "anythingspicy";
Person.find({ favoriteFoods: foodToSearch })
		.sort({ name: 'asc' })
		.limit(2)
		.select('-age')
		.exec((err, data) => {
			if (err) throw err;
			done(null, data);
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
