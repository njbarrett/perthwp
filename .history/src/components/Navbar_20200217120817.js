import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/logo.svg';

const Navbar = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            navBarActiveClass: ''
        };
    }

    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                          navBarActiveClass: 'is-active'
                      })
                    : this.setState({
                          navBarActiveClass: ''
                      });
            }
        );
    };

    render() {
        return (
            <nav
                className="navbar is-transparent"
                role="navigation"
                aria-label="main-navigation"
            >
                <div className="container flex items-center justify-between flex-wrap p-6">
                    <div className="flex items-center flex-shrink-0 mr-10">
                        <Link to="/" className="navbar-item" title="Logo">
                            <img
                                src={logo}
                                alt="Perth White Pointers"
                                style={{ width: '200px' }}
                            />
                        </Link>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                            <svg
                                class="fill-current h-3 w-3"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>
                    <div
                        id="navMenu"
                        className={`font-bold w-full block flex-grow lg:flex lg:items-center lg:w-auto lg:ml-auto`}
                    >
                        <div className="lg:flex-grow">
                            <Link
                                className="block mt-4 lg:inline-block lg:mt-0 mr-6"
                                to="/about"
                            >
                                About
                            </Link>
                            <Link
                                className="block mt-4 lg:inline-block lg:mt-0 mr-6"
                                to="/products"
                            >
                                Products
                            </Link>
                            <Link
                                className="block mt-4 lg:inline-block lg:mt-0 mr-6"
                                to="/blog"
                            >
                                Blog
                            </Link>
                            <Link
                                className="block mt-4 lg:inline-block lg:mt-0 mr-6"
                                to="/contact"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default Navbar;
