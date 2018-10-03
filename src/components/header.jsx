import React from 'react';

const Header = ({ siteTitle }) => (
    <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
            <a className="navbar-item" href="/">
                {siteTitle}
            </a>
        </div>
    </nav>
);

export default Header;
