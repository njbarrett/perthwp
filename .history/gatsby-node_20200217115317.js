const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = ({ actions, graphql }) => {
    const { createPage } = actions;

    return graphql(`
        {
            allMarkdownRemark(limit: 1000) {
                edges {
                    node {
                        id
                        fields {
                            slug
                        }
                        frontmatter {
                            tags
                            templateKey
                        }
                    }
                }
            }
        }
    `).then(result => {
        if (result.errors) {
            result.errors.forEach(e => console.error(e.toString()));
            return Promise.reject(result.errors);
        }

        const posts = result.data.allMarkdownRemark.edges;

        posts.forEach(edge => {
            const id = edge.node.id;
            createPage({
                path: edge.node.fields.slug,
                tags: edge.node.frontmatter.tags,
                component: path.resolve(
                    `src/templates/${String(
                        edge.node.frontmatter.templateKey
                    )}.js`
                ),
                // additional data can be passed via context
                context: {
                    id
                }
            });
        });

        // Tag pages:
        let tags = [];
        // Iterate through each post, putting all found tags into `tags`
        posts.forEach(edge => {
            if (_.get(edge, `node.frontmatter.tags`)) {
                tags = tags.concat(edge.node.frontmatter.tags);
            }
        });
        // Eliminate duplicate tags
        tags = _.uniq(tags);

        // Make tag pages
        tags.forEach(tag => {
            const tagPath = `/tags/${_.kebabCase(tag)}/`;

            createPage({
                path: tagPath,
                component: path.resolve(`src/templates/tags.js`),
                context: {
                    tag
                }
            });
        });
    });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;
    fmImagesToRelative(node); // convert image paths for gatsby images

    if (node.internal.type === `MarkdownRemark`) {
        const value = createFilePath({ node, getNode });
        createNodeField({
            name: `slug`,
            node,
            value
        });
    }
};

const PurgeCssPlugin = require(`purgecss-webpack-plugin`);
const path = require(`path`);
const glob = require(`glob`);

const PATHS = {
    src: path.join(__dirname, `src`)
};

const purgeCssConfig = {
    paths: glob.sync(`${PATHS.src}/**/*.js`, { nodir: true }),
    extractors: [
        {
            // Custom extractor to allow special characters (like ":") in class names
            // See: https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css-with-purgecss
            extractor: class {
                static extract(content) {
                    return content.match(/[A-Za-z0-9-_:/]+/g) || [];
                }
            },
            extensions: [`js`]
        }
    ],
    whitelist: [`class-to-whitelist`], // adjust for each project
    whitelistPatterns: [/body/, /headroom/, /ReactModal/, /ril/] // adjust for each project
};

exports.onCreateWebpackConfig = ({ actions, stage }) => {
    if (stage.includes(`develop`)) return;

    // Add PurgeCSS in production
    // See: https://github.com/gatsbyjs/gatsby/issues/5778#issuecomment-402481270
    if (stage.includes(`build`)) {
        actions.setWebpackConfig({
            plugins: [new PurgeCssPlugin(purgeCssConfig)]
        });
    }
};
