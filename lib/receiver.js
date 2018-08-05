const fs = require("fs");
const http = require("http");
const path = require("path");

const PATH_REGEX = /^\/([\w-]+)\/([\w-]+)$/i;

module.exports = class Receiver {
  constructor(services, projectConfigRoot) {
    this._services = services;
    this._projectConfigRoot = projectConfigRoot;
    this._server = http.createServer(this.receive.bind(this));
  }

  async receive(request, response) {
    if (request.method != "POST") {
      return this.endWithError(response, 405);
    }

    let urlParts = PATH_REGEX.exec(request.url);
    if (!urlParts) {
      return this.endWithError(response, 404);
    }

    let [projectName, endpoint] = urlParts.splice(1);

    let projectConfigFile = path.join(this._projectConfigRoot, `${projectName}.json`);
    let projectConfig;
    try {
      projectConfig = JSON.parse(fs.readFileSync(projectConfigFile));
    } catch (_) {
      return this.endWithError(response, 404,
        `Could not load project config file for '${projectName}'.`);
    }

    let serviceConfig = projectConfig[endpoint];
    if (!serviceConfig) {
      return this.endWithError(response, 404,
        `Endpoint '${endpoint}' not configured for '${projectName}'`);
    }

    let serviceName = serviceConfig.service;
    let ServiceClass = this._services[serviceName];
    if (!ServiceClass) {
      return this.endWithError(response, 404,
        `Could not find requested service '${serviceName}'`);
    }

    let body = await this.getRequestBody(request);
    let service = new ServiceClass(serviceConfig, request.headers, body);
    let isValid = await service.isValid();
    if (!isValid) {
      return this.endWithError(response, 400,
        "Validation failed for push");
    }

    response.writeHead(200);
    response.end();

    service.execute();
    return true;
  }

  getRequestBody(request) {
    return new Promise((resolve) => {
      let body = [];
      request.on("data", (chunk) => {
        body.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(body).toString());
      });
    });
  }

  endWithError(response, code, log = false) {
    if (log) {
      console.info(log);
    }

    response.writeHead(code);
    response.end();

    return true;
  }

  listen(port, address) {
    this._server.listen(port, address);
  }
};
