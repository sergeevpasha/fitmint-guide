const withPWA = require('next-pwa');
const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n,
    pwa: {
        dest: 'public'
    }
};

module.exports = withPWA(nextConfig);
