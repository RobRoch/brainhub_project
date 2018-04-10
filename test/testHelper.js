var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before((done) =>{
    mongoose.connect('mongodb://Rob:brain@ds046067.mlab.com:46067/brainhub_project_db');
    mongoose.connection
    .once('open',()=> { done(); })
    .on('error', (error) => {
        console.warn('Error',error);
    });
});

beforeEach((done) => {
    mongoose.connection.collections.registries.drop(() => {
        done();
    });
})