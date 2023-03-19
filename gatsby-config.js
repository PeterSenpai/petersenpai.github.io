module.exports = {
    plugins: [
        {
            resolve: "gatsby-theme-portfolio-minimal",
            options: {
                siteUrl: "https://petersenpai.github.io/",
                manifestSettings: {
                    favicon: "./content/images/favicon.png",
                    siteName: "Peter's Portfolio", // Used in manifest.json
                    shortName: "Peter Tao", // Used in manifest.json
                    startUrl: "/", // Used in manifest.json
                    backgroundColor: "#FFFFFF", // Used in manifest.json
                    themeColor: "#000000", // Used in manifest.json
                    display: "minimal-ui", // Used in manifest.json
                },
                contentDirectory: "./content",
                blogSettings: {
                    path: "/blog", // Defines the slug for the blog listing page
                    usePathPrefixForArticles: false, // Default true (i.e. path will be /blog/first-article)
                },
                // googleAnalytics: {
                //     trackingId: "G-144YH36SVY",
                //     anonymize: false,
                //     environments: ["production"],
                // },
            },
        },
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: ["G-35EELXQV8V"],
                pluginConfig: {
                    head: true,
                },
            },
        },
    ],
};
