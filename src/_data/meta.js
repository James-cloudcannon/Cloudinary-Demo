/*
	google_analytics_key: this is currently the old UA key everntually we will switch this over to the manager key / GA4 key
	google_analytics_tag_manager_key: this is the tag manager key. It is connected to both UA & GA4
*/
module.exports = function() {
  return {
		env: process.env.ELEVENTY_ENV || "development",
		google_analytics_key: "UA-37472773-1",
		google_analytics_tag_manager_key: "GTM-K5XHWG6"
	};
};