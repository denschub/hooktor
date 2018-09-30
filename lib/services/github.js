const crypto = require("crypto");
const Service = require("../service");

module.exports = class GitHubService extends Service {
  async isValid() {
    if (!this._serviceConfig.secret) {
      console.warn("No secret configured, skipping GitHub signature check.");
      return true;
    }

    return this.oneOrManyAsArray(this._serviceConfig.secret)
      .map((secret) => "sha1=" + crypto.createHmac("sha1", secret).update(this._body).digest("hex"))
      .includes(this._headers["x-hub-signature"]);
  }

  async execute() {
    let event = this._headers["x-github-event"];

    let command = this._serviceConfig.events[event];
    if (!command) {
      console.info(`No script configured for GitHub event '${event}'`);
      return;
    }

    switch (event) {
      case "push":
        this.executePush(command);
        break;
      case "pull_request":
        this.executePullRequest(command);
        break;
      default:
        this.executeGeneric(command);
        break;
    }
  }

  executeGeneric(command) {
    this.runExternal(command, this._body, {
      "EVENT": this._headers["x-github-event"]
    });
  }

  executePullRequest(command) {
    let parsedBody = JSON.parse(this._body);

    this.runExternal(command, this._body, {
      "ACTION": parsedBody.action,
      "BASE": parsedBody.pull_request.base.ref,
      "EVENT": this._headers["x-github-event"],
      "PR": parsedBody.pull_request.number
    });
  }

  executePush(command) {
    let parsedBody = JSON.parse(this._body);

    let env = {
      "EVENT": this._headers["x-github-event"],
      "REF": parsedBody.ref
    };
    if (parsedBody.head_commit) {
      env.HEAD = parsedBody.head_commit.id;
    }

    this.runExternal(command, this._body, env);
  }
};
