// Source for the sandboxed GTM custom template editor; not executed by Next.js.
// Requires narrowly scoped consent write permission and data-layer read permission.
const setDefaultConsentState = require('setDefaultConsentState');
const updateConsentState = require('updateConsentState');
const copyFromDataLayer = require('copyFromDataLayer');
const deniedState = {
  analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied',
  ad_personalization: 'denied', personalization_storage: 'denied',
  functionality_storage: 'denied', security_storage: 'granted'
};
setDefaultConsentState(deniedState);
updateConsentState({
  analytics_storage: copyFromDataLayer('bm_analytics', 2) === true ? 'granted' : 'denied',
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
});
data.gtmOnSuccess();
