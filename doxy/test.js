var Containers = require('./containers');

Containers.new('python', function(err, port){
  if(err){
    console.log("Everything is terrible");
  }
  console.log("Created a docker container on " + port);
});