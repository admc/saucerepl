var Docker = require('./docker');

var images = {
  ruby : "ruby",
  python: "training/webapp",
  node: "node"
};

var basePort = 3005;
var lastPort = basePort;

var containers = [];

function nextDockerPort() {
  lastPort = lastPort + 1;
  return lastPort;
}

exports.new = function (language, cb) {
  port = nextDockerPort();
  image = images[language];
  container = Docker.startContainer(image, port, function(err, id) {
    if(err) {
      console.log("Couldn't start a container");
      cb(err);
    } else {
      containers.push({language:language, port:port, id:id});
      cb(null, port);
    }
  });
};

exports.killAll = function endContainers(cb) {
  containers.map( function(container) {
    docker.end(container.id);
  });
  cb();
};
