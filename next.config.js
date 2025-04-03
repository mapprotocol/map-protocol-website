const withMDX = require('@next/mdx')({
    extension: /\.md$/
})

/** @type {import('next').NextConfig} */
const {i18n} = require('./next-i18next.config')

const nextConfig = {
    i18n,
    images: {
        domains: ['assets.coingecko.com', "pbs.twimg.com"],
    },
    pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
    // Optionally, add any other Next.js config below
}

module.exports = withMDX(nextConfig)
