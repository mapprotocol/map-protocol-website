module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr', 'de', 'kr', 'es',
      'ja', 'zh', 'tr', 'vi', 'it',
      'zh-TW','hi','ar','uk','ru'],
  },
  debug: false,

  /** To avoid issues when deploying to some paas (vercel...) */
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',

};