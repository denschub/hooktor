const Service = require("../service");

module.exports = class GenericService extends Service {
  async isValid() {
    if (!this._serviceConfig.secret) {
      return true;
    }

    return this.oneOrManyAsArray(this._serviceConfig.secret)
      .includes(this._headers["x-hook-token"]);
  }

  async execute() {
    let command = this._serviceConfig.run;
    this.runExternal(command, this._body);
  }
};
