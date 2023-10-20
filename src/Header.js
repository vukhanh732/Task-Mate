import React from 'react';
import logo from './logo.png'; // This imports the logo based on your directory structure

function Header() {
    return (
        <div className="header">
            <img src={logo} alt="Task Mate Logo" className="header-logo" width={200} height={200}/>
        </div>
    );
}

export default Header;
