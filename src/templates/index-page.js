import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';

export const IndexPageTemplate = ({ image, title, subheading }) => (
    <div>
        <div
            className="banner mt-0"
            style={{
                backgroundImage: `url(${
                    !!image.childImageSharp
                        ? image.childImageSharp.fluid.src
                        : image
                })`,
                backgroundPosition: `top left`,
                backgroundAttachment: `fixed`
            }}
        >
            <div
                className="banner__content"
                style={{
                    display: 'flex',
                    height: '600px',
                    lineHeight: '1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column'
                }}
            >
                <h2
                    className="font-bold text-white mb-6 uppercase text-2xl"
                    style={{
                        color: 'white',
                        lineHeight: '1',
                        padding: '0.25em'
                    }}
                >
                    {subheading}
                </h2>
                <h1 className="font-bold text-6xl text-white mb-10">{title}</h1>
                <div className="flex">
                    <Link to="/join" className="button mr-6 button--primary">
                        Join Us
                    </Link>
                    <Link to="/sponsors" className="button button--secondary">
                        Sponsor Us
                    </Link>
                </div>
            </div>
        </div>
        <section class="section">
            <div class="container flex md:flex-no-wrap">
                <div className="md:mr-12 flex-shrink-0">
                    <img
                        src="https://via.placeholder.com/500x550"
                        alt="image"
                    />
                </div>
                <div>
                    <h2 class="text-4xl">Welcome to Perth White Pointers</h2>
                    <p class="mb-6">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiutempor incididunt ut labore et dolore magna
                        aliqua. Ut enim ad minveniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commonsequat. Duis
                        aute irure dolor in reprehenderit in voluptate velit
                        esse.
                    </p>
                    <h3 class="text-2xl mb-2">About Us</h3>
                    <p class="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiutempor incididunt ut labore et dolore magna
                        aliqua.
                    </p>
                    <h3 class="text-2xl mb-2">Our History</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiutempor incididunt ut labore et dolore magna
                        aliqua.
                    </p>
                </div>
            </div>
        </section>
    </div>
);

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    mainpitch: PropTypes.object,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array
    })
};

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                subheading={frontmatter.subheading}
                mainpitch={frontmatter.mainpitch}
                description={frontmatter.description}
                intro={frontmatter.intro}
            />
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object
        })
    })
};

export default IndexPage;

export const instagramQuery = graphql`
    fragment InstagramPosts on Query {
        allInstaNode {
            edges {
                node {
                    id
                    likes
                    comments
                    mediaType
                    preview
                    original
                    timestamp
                    caption
                    localFile {
                        childImageSharp {
                            fixed(width: 150, height: 150) {
                                ...GatsbyImageSharpFixed
                            }
                        }
                    }
                    # Only available with the public api scraper
                    thumbnails {
                        src
                        config_width
                        config_height
                    }
                    dimensions {
                        height
                        width
                    }
                }
            }
        }
    }
`;

export const pageQuery = graphql`
    query IndexPageTemplate {
        markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
            frontmatter {
                title
                image {
                    childImageSharp {
                        fluid(maxWidth: 2048, quality: 100) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                heading
                subheading
                intro {
                    blurbs {
                        image {
                            childImageSharp {
                                fluid(maxWidth: 240, quality: 64) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                        text
                    }
                    heading
                    description
                }
            }
        }
        ...InstagramPosts
    }
`;
