const Service = require("../service");

module.exports = class GenericService extends Service {
  async isValid() {
    return true;
  }

  async execute() {
    let command = this._serviceConfig.run;
    this.runExternal(command, this._body);
  }
};
