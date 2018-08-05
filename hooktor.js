const fs = require("fs");
const Receiver = require("./lib/receiver");

if (process.argv.length < 3) {
  console.error("Please specifiy the config file location as the first parameter.");
  process.exit();
}
const config = JSON.parse(fs.readFileSync(process.argv[2]));

let services = {};
config.enabledServices.forEach((service) => {
  services[service] = require(`./lib/services/${service}`);
});

let receiver = new Receiver(
  services,
  config.projectConfigRoot
);

receiver.listen(
  config.server.listen.port,
  config.server.listen.address
);
