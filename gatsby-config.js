const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const fullConfig = resolveConfig(tailwindConfig);

module.exports = {
  siteMetadata: {
    title: `JavaScript Ecuador`,
    description: `Web de la Comunidad JavaScript Ecuador`,
    author: `@taylorbryant`,
    generator: `Gatsby`,
    keywords: `html, css, javascript, jamstack`
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-tailwind`,
        short_name: `starter`,
        start_url: `/`,
        background_color: fullConfig.theme.colors.white,
        theme_color: fullConfig.theme.colors.teal["400"],
        display: `minimal-ui`,
        icon: `src/images/javascriptecuador.png`,
      },
    },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog-entries`,
      path: `${__dirname}/src/pages/blog`,
    },
  },
    // `gatsby-plugin-mdx`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        defaultLayouts: {
          // articles: require.resolve('./src/templates/articles-layout.js'),
          default: require.resolve('./src/templates/blog-entry.js'),
        },
      },
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [require(`cssnano`)]
            : []),
        ],
      },
    },
    `gatsby-plugin-offline`,
  ],
};
