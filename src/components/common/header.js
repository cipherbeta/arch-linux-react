import React, { Component } from 'react';
import logo from '../../assets/img/archlogo.svg';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    state = {
        mini: false
    }

    componentDidMount(){
        document.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount(){
        document.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        let y = Math.round(window.scrollY);
        if(y > 0 && this.state.mini === false) {
            this.setState({ mini: true });
        } else if (y < 1 && this.state.mini === true) {
            this.setState({ mini: false });
        }
    }

    render(){
        return(
            <header id="header_wrapper" className={this.state.mini ? "tiny" : null}>
                <div className="logo">
                    <NavLink to="/">
                        <img src={logo} alt="arch linux logo"/>
                    </NavLink>
                </div>
                <div className="navigation">
                    <NavLink exact strict to="/">
                        Home
                    </NavLink>
                    <NavLink to="/about">
                        About Us
                    </NavLink>
                    <NavLink to="/forums">
                        Forums
                    </NavLink>
                    <a href="https://wiki.archlinux.org/" target="_blank" rel="noopener noreferrer">
                        Wiki
                    </a>
                    <NavLink to="/bugs">
                        Bugs
                    </NavLink>
                    <NavLink to="/security">
                        Security
                    </NavLink>
                    <NavLink to="/aur">
                        AUR
                    </NavLink>
                    <NavLink to="/download">
                        Download
                    </NavLink>
                </div>
            </header>
        );
    }
}

export default Header;