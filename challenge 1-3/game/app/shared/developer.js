var config = require('../../config/app.json');

module.exports = {
  prepareDevResponse: function(error) {
      if (!config.developer_mode) {
          delete error.dev_error;
      }
  }  
};