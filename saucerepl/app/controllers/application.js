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


var wd = require('wd')
  , fs = require('fs')
  , Docker = require('dockerode')
  ;

var Application = function () {
  var self = this;
  self.wd = {}
  self.wd.driver = wd;
  self.wd.sessions = [];
  self.wd.creds = {
    username: process.env.SAUCE_USERNAME || "SAUCE_USERNAME",
    accessKey: process.env.SAUCE_ACCESS_KEY || "SAUCE_ACCESS_KEY"
  }
  self.wdSessions = [];
  self.wd.desired = {
    browser: 'firefox',
    platform: 'LINUX',
    tags: ["examples"],
    name: "Sauce REPL",
    "command-timeout": 300,
    "idle-timeout": 90
  };

  self.dock = {};
  self.dock.containers = [];
  /*self.dock = {};
  self.dock.ports = [];
  self.dock.docker = new Docker({
    socketPath: '/Users/adam/.boot2docker/boot2docker-vm.sock',
    protocol: 'https',
    host: '192.168.59.103',
    port: 2376,
    ca: fs.readFileSync('/Users/adam/.boot2docker/certs/boot2docker-vm/ca.pem'),
    cert: fs.readFileSync('/Users/adam/.boot2docker/certs/boot2docker-vm/cert.pem'),
    key: fs.readFileSync('/Users/adam/.boot2docker/certs/boot2docker-vm/key.pem')
  });*/

};

exports.Application = Application;



