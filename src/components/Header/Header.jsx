import React from 'react'
import './header.css'

const Header = (props) => {
    return (
        <header className="header">
            {props.title}
        </header>
    )
}

export default Header;