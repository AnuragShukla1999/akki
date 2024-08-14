import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FaHome } from "react-icons/fa";


import { FaTableList } from "react-icons/fa6";

import '../styles/Sidebar.css'

const Sidebar = () => {
    const [openSubRoutes, setOpenSubRoutes] = useState({});

    const toggleSubRoutes = (path) => {
        setOpenSubRoutes(prev => ({
            ...prev,
            [path]: !prev[path]
        }));
    };

    const routes = [
        {
            path: "/dashboard",
            name: "Dashboard",
            icon: <FaHome />,
        },
        {
            path: "/table",
            name: "Table",
            icon: <FaTableList />,
        }
    ];

    return (
        <div className="sidebar">
            <Link to='/dashboard' className='sidebar-header'>
                LOGO
            </Link>
            <hr className='hr-line' />

            <ul className='sidebar-menu'>
                {routes.map((route) => (
                    <li key={route.path} className='sidebar-menu-item'>
                        <div className='sidebar-menu-item-div'>
                            <Link
                                to={route.path}
                                className='sidebar-menu-link'
                            >
                                <div>{route.icon}</div>
                                <span className='link-span'>{route.name}</span>
                            </Link>
                            {route.subRoutes && (
                                <MdKeyboardArrowDown
                                    onClick={() => toggleSubRoutes(route.path)}
                                    className={`arrow-down ${openSubRoutes[route.path] ? 'rotate' : ''}`}
                                />
                            )}
                        </div>
                        {route.subRoutes && openSubRoutes[route.path] && (
                            <ul className='sidebar-submenu'>
                                {route.subRoutes.map((subRoute) => (
                                    <li key={subRoute.path} className='sidebar-submenu-item'>
                                        <Link
                                            to={subRoute.path}
                                            className='sidebar-submenu-link'
                                        >
                                            <div className='text-base'>{subRoute.icon}</div>
                                            <span>{subRoute.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;
