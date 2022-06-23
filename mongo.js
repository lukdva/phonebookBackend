const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const url = process.env.MONGO_URI;

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 4) {
  mongoose
    .connect(url)
    .then((result) => Person.find({}))
    .then((persons) => {
      console.log('phonebook:');
      persons.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      mongoose.connection.close();
    });
}
else {
  const personName = process.argv[3];
  const phone = process.argv[4] || '';

  mongoose
    .connect(url)
    .then((result) => {
      console.log(result);
      const newPerson = new Person({
        name: personName,
        number: phone
      });
      console.log(newPerson);
      return newPerson.save();
    })
    .then((result) => {
      console.log('result of save', result);
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
}
