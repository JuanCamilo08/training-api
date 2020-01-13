const mongoose = require('mongoose');

(async function api() {
  const { error } = await mongoose.connect('mongodb://localhost:27017/kitchen', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  if (error) return console.error(error);
  console.log('MongoDB Connected...');
})();
