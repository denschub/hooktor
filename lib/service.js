const childProcess = require("child_process");

module.exports = class Service {
  constructor(serviceConfig, headers, body) {
    this._serviceConfig = serviceConfig;
    this._headers = headers;
    this._body = body;
  }

  async isValid() {
    console.warn("Running default validator.");
    return true;
  }

  async execute() {
    console.warn("Running default execution.");
    return true;
  }

  runExternal(command, stdin, env = {}) {
    let child = childProcess.spawn(command, [], {
      detached: true,
      env: Object.assign({}, process.env, env),
      stdio: ["pipe", "ignore", "ignore"]
    });

    child.on("error", (error) => {
      console.error("Could not run child:", error.errno);
    });

    if (child.stdin) {
      child.stdin.on("error", () => {});
      child.stdin.write(stdin);
      child.stdin.end();
    }
  }
};
