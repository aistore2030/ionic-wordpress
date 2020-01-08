export const ConfigData = {
  // DEFINE YOUR URL
  rootUrl: 'http://ramlaonline.com/wp-json/wp/v2/',

  // DEFAULT VALUE IS FALSE, SHOW ALL YOUR CATEGORIES
  enableExcludeFromMenu: true,

  // enableExcludeFromMenu SET TO true TO ENABLE excudeFromMenu
  // if want to exclude from menu your category set value FALSE
  // all category enter with lower case
  excludeFromMenu: {
    // name: "اللد الرملة"
    20: true,

    // name: "أخبار محلية"
    2: true,


    // name: "أخبار عالمية"
    15: true,


    // name: "تقارير"
    1: true,


    // name: "وفيات"
    24: true,


    // name: "إجتماعيات"
    9: true,


    // name: "إعلانات"
    18: true,


    // name: "مقالات"
    30: true,


    // name: "أخبار رياضية"
    21: true,


    // name: "أخبار هامة"
    29: false

  },

  orderedMenu: {
    // name: "اللد الرملة"
    20: 1,

    // name: "أخبار محلية"
    2: 2,


    // name: "أخبار عالمية"
    15: 3,


    // name: "تقارير"
    1: 4,


    // name: "وفيات"
    24: 5,


    // name: "إجتماعيات"
    9: 6,


    // name: "إعلانات"
    18: 7,


    // name: "مقالات"
    30: 8,


    // name: "أخبار رياضية"
    21: 9

  },

  oneSignal: {
    appID: 'b5f0bd50-c4ed-44f2-89ad-cb7a1efbdda4',
    googleProjectId: '708359667620'
  },

  // ADS
  bannerAds: {
    enable: false,
    config: {
      id: '',
      isTesting: true,
      autoShow: true
    }
  },
  interstitialAds: {
    showAdsAfterXPosts: 10,
    enable: false,
    config: {
      id: '',
      isTesting: true,
      autoShow: true
    }
  }
};
