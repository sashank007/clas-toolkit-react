require('dotenv').config();

var dev_mode = process.env.DEV_MODE;
if (dev_mode == "false") {
  dev_mode = false
}
else {
  dev_mode = true
}

const config = {
  cas_url     : 'https://weblogin.asu.edu/cas',
  service_url : 'https://tools-stg.clas.asu.edu',
  cas_version     : '2.0',
  renew           : false,
  is_dev_mode     : dev_mode,
  dev_mode_user   : 'rbruce2',
  dev_mode_info   : {},
  session_name    : 'cas_user',
  session_info    : 'cas_userinfo',
  destroy_session : true,
};

module.exports = config;
