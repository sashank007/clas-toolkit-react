var CASAuthentication = require('cas-authentication');

var Authentication = (() => {
  var instance;

  createInstance = (casAuthenticationInfo) => {
    return new CASAuthentication(casAuthenticationInfo);
  }

  return {
    getInstance: (casAuthenticationInfo) => {
      if (!instance) {
        instance = createInstance(casAuthenticationInfo);
      }
      return instance;
    }
  };
})();

module.exports = Authentication;
