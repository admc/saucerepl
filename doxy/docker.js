var Docker = require('dockerode');
var fs = require('fs');

var docker_host = '192.168.59.103';
var docker_port = 2376;

var dockerInstance = null;

var dockerStartCmd = false;

var dockerArgs  = {
    host: docker_host,
    port: docker_port,
    protocol: 'https',
    ca: fs.readFileSync('/Users/dylanlacey/.boot2docker/certs/boot2docker-vm/ca.pem'),
    cert: fs.readFileSync('/Users/dylanlacey/.boot2docker/certs/boot2docker-vm/cert.pem'),
    key: fs.readFileSync('/Users/dylanlacey/.boot2docker/certs/boot2docker-vm/key.pem')
};

function withDocker(cb) {
  if (!dockerInstance){
    console.log("Creating new Docker instance");
    dockerInstance = new Docker(dockerArgs);
  }

  cb(null, dockerInstance);
}

exports.startContainer = function (image, port, cb) {
  console.log("Starting " + image+ " on port " + port);
  portMapping = '' + port + ':' + docker_port;
  containerArgs = {
    create_options: {publish: portMapping}
  };

  if(dockerStartCmd) {
    containerArgs.startCmd = dockerStartCmd;
  }

  withDocker(function (err, instance) {
    console.log("Docker instance found");
    instance.createContainer({"Image": image}, function (err, container) {
      if(err) {
        console.log("Error creating container");
        console.log(containerArgs);
        console.log(err);
      } else {
        container.start(containerArgs, function (err, data) {
          cb(null, data);
        });
      }
    });
  });
};

exports.endContainer = function (container, cb) {
  docker.getContainer(container).stop(cb);
};