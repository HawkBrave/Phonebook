const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

(async () => {
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

  console.log("Connected to MongoDB");

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  });

})().catch(error => console.log(error.message));

module.exports = mongoose.model('Person', personSchema);