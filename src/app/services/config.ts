export const ConfigData = {
  // DEFINE YOUR URL
  'rootUrl': 'http://ramlaonline.com/wp-json/wp/v2/',

  // DEFAULT VALUE IS FALSE, SHOW ALL YOUR CATEGORIES
  'enableExcludeFromMenu': true,

  // enableExcludeFromMenu SET TO true TO ENABLE excudeFromMenu
  // if want to exclude from menu your category set value FALSE
  // all category enter with lower case
  'excludeFromMenu': {
    // name: "أخبار رياضية"
    21: true,
    // name: "أخبار عالمية"
    15: true,
    // name: "أخبار محلية"
    2: true,
    // name: "أخبار هامة"
    29: false,
    // name: "إعرف بلدك"
    20: true,
    // name: "الصحة والمنزل"
    9: true,
    // name: "المرئيات"
    27: true,
    // name: "تقارير"
    17: true,
    // name: "توعية وترفيه"
    18: true,
    // name: "مقالات"
    1: true,
    // name: "وفيات"
    24: true,

  },

  'oneSignal': {
    'appID': 'b5f0bd50-c4ed-44f2-89ad-cb7a1efbdda4',
    'googleProjectId': '708359667620'
  },

  // ADS
  'bannerAds': {
    'enable': true,
    'config': {
      'id': '',
      'isTesting': true,
      'autoShow': true
    }
  },
  'interstitialAds': {
    'showAdsAfterXPosts': 10,
    'enable': true,
    'config': {
      'id': '',
      'isTesting': true,
      'autoShow': true
    }
  }
 };
