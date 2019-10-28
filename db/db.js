const mongoose = require('mongoose');

const connectionString = 'mongodb://localhost/cyberpunk2077';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
