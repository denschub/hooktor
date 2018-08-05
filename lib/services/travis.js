const crypto = require("crypto");
const querystring = require("querystring");
const request = require("request");
const Service = require("../service");

module.exports = class TravisService extends Service {
  constructor(serviceConfig, headers, body) {
    super(serviceConfig, headers, body);

    this._payload = querystring.parse(body).payload;
  }

  async isValid() {
    let signature = Buffer.from(this._headers.signature, "base64");

    let pubKey = await this.getTravisPubKey();
    return crypto
      .createVerify("sha1")
      .update(this._payload)
      .verify(pubKey, signature);
  }

  async getTravisPubKey() {
    return new Promise((resolve, reject) => {
      let apiRoot = this._serviceConfig.apiRoot || "https://api.travis-ci.org";
      request(apiRoot + "/config", { json: true }, (err, _, body) => {
        if (err) {
          reject(err);
        }

        resolve(body.config.notifications.webhook.public_key);
      });
    });
  }

  async execute() {
    let parsedPayload = JSON.parse(this._payload);

    let state = parsedPayload.state;
    let command = this._serviceConfig.states[state];
    if (!command) {
      console.info(`No script configured for Travis state '${state}'`);
      return;
    }

    this.runExternal(command, this._payload, {
      "RESULT": parsedPayload.result,
      "STATE": state,
      "STATUS_MESSAGE": parsedPayload.status_message,
      "STATUS": parsedPayload.status
    });
  }
};
