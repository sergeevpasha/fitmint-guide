const path = require("path");

module.exports = {
    i18n: {
        defaultLocale: 'en',
        locales: ['en', 'ru', 'de']
    },
    localePath: path.resolve("./public/locales"),
};
