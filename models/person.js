const mongoose = require('mongoose')

const url = process.env.MONGO_URI

console.log('connecting to', url)

mongoose.connect(url)
.then(result => {
    console.log('connected to DB')
})
.catch(err => {
    console.log('error connecting to DB :', err)
})

const personSchema = new mongoose.Schema({
    name: String,
    number: String
});

personSchema.set('toJSON', {
    versionKey: false,
    transform: (doc, ret) => {
        ret.id = doc._id.toString();
        delete ret._id;
    }
});

module.exports = mongoose.model('Person', personSchema)