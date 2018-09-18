const Service = require("../service");

module.exports = class GitLabService extends Service {
  async isValid() {
    if (!this._serviceConfig.secret) {
      console.warn("No secret configured, skipping GitLab secret check.");
      return true;
    }

    return this._serviceConfig.secret == this._headers["x-gitlab-token"];
  }

  async execute() {
    let event = this._headers["x-gitlab-event"];

    let command = this._serviceConfig.events[event];
    if (!command) {
      console.info(`No script configured for GitLab event '${event}'`);
      return;
    }

    switch (event) {
      case "Push Hook":
        this.executePush(command);
        break;
      case "Merge Request Hook":
        this.executeMergeRequest(command);
        break;
      default:
        this.executeGeneric(command);
        break;
    }
  }

  executeGeneric(command) {
    this.runExternal(command, this._body, {
      "EVENT": this._headers["x-gitlab-event"]
    });
  }

  executeMergeRequest(command) {
    let parsedBody = JSON.parse(this._body);

    this.runExternal(command, this._body, {
      "ACTION": parsedBody.object_attributes.action,
      "EVENT": this._headers["x-gitlab-event"],
      "MR": parsedBody.object_attributes.iid
    });
  }

  executePush(command) {
    let parsedBody = JSON.parse(this._body);

    let env = {
      "EVENT": this._headers["x-gitlab-event"],
      "REF": parsedBody.ref
    };
    if (parsedBody.head_commit) {
      env.HEAD = parsedBody.checkout_sha;
    }

    this.runExternal(command, this._body, env);
  }
};
