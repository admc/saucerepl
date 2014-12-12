/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
var execSync = require("exec-sync");
var exec = require('child_process').exec;

var Main = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];
};

Main.prototype.index = function (req, resp, params) {
  this.respond({params: params}, {
    format: 'html'
  , template: 'app/views/main/index'
  });
};

Main.prototype.proxy = function (req, resp, params) {
  var self = this;
  var driver = self.wd.driver;

/*  exec('export DOCKER_HOST=tcp://192.168.59.103:2376 DOCKER_CERT_PATH=/Users/adam/.boot2docker/certs/boot2docker-vm DOCKER_TLS_VERIFY=1 && docker run -p 3000:3000 -d admc/node-tty', function(err, stdout, stderr) {
   console.log(stdout);
    self.respond({thing: stdout.toString()}, {
      format: 'json'
    });
  })*/

  var browser = driver.remote("ondemand.saucelabs.com", 80, self.wd.creds.username, self.wd.creds.accessKey);
  browser.init(self.wd.desired, function() {
    browser.get("http://saucelabs.com", function() {
    })
  })
      self.respond({ session: browser._sessionId}, {
        format: 'json'
      });
};

exports.Main = Main;
