const mongoose = require('mongoose');

const url = process.env.MONGO_URI;

console.log('connecting to', url);

mongoose.connect(url)
  .then((result) => {
    console.log('connected to DB');
  })
  .catch((err) => {
    console.log('error connecting to DB :', err);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: (v) => /^\d{2,3}-\d{1,}$/.test(v),
      message: 'Incorrect phone format, should be DD-DDDDD... or DDD-DDDDD...'
    }
  }
});

personSchema.set('toJSON', {
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = doc._id.toString();
    delete ret._id;
  }
});

module.exports = mongoose.model('Person', personSchema);
