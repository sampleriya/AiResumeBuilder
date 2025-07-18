/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  optimizeFonts: false,
  // For Static Export
  // output: 'export',
  i18n: {
    locales: ["en", "ar"],
    defaultLocale: "en",
  },
}

module.exports = nextConfig