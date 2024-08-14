import React, { useContext, useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../context/ConfigContext';

const Navbar = () => {

    const navigate = useNavigate();

    const { logout } = useContext(AuthContext);

    

    // const userLoggedIn = localStorage.getItem('user');


    // const [openSidebar, setOpenSidebar] = useState(false);
    const [openUserMenu, setOpenUserMenu] = useState(false);


    const userMenuRef = useRef(null);

    // const toggleSideBar = () => {
    //     setOpenSidebar(prev => !prev);
    //     console.log("Sidebar toggled");
    // };

    // const closeSidebar = () => {
    //     setOpenSidebar(false);
    // };

    const toggleUserMenu = () => {
        setOpenUserMenu(prev => !prev);
        console.log("User menu toggled");
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        logout();
        navigate('/');
        setOpenUserMenu(false)
    };



    const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setOpenUserMenu(false);
        }
    };

    useEffect(() => {
        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Clean up the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='navbar'>
            <div className='navbar-logo'>
            </div>
            <div className='user-actions'>
                <div className='user-profile' onClick={toggleUserMenu}>
                    <CgProfile className='icon' />
                </div>

                {openUserMenu && (
                    <div className='user-menu' ref={userMenuRef}>
                        <div className='user-menu-item' onClick={handleLogout}>
                            Logout
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Navbar;
