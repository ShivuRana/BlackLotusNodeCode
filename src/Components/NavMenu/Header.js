import React from 'react'
import logo from "../../Images/logo.png";
import logo1 from "../../Images/logo1.png";
import AdminImage from "../../Images/admin-img.png";
import Notification from "../../Images/Notification.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Header = () => {
   const history = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        // localStorage.removeItem("user_id");
        history("/");

    };

    return (

        <div className='main-topheader'>
            <div className='topheaderMain '>
                <div className='logo-section'>
                    <NavLink to="/">
                        <img src={logo1} />
                    </NavLink>
                    {/* <img src={logo1} /> */}
                </div>
                <div className='admin-section d-flex'>
                    <div className='admin-img'>
                        <span className='notification'></span>
                        <img src={Notification} />
                    </div>
                    <div className='admin-login'>
                        <div class="dropdown">
                            <button class="dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                                <img src={AdminImage} />
                                <span class="caret"></span>
                            </button>
                            <ul class="dropdown-menu cstm-dropdown" aria-labelledby="dropdownMenu1">
                                <li><NavLink
                                    to="/profile"
                                    className={({ isActive }) => (isActive ? "active-us" : "")}
                                >
                                    Profile
                                </NavLink></li>
                                <li><a href="" onClick={logout}>Logout</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}
export default Header;
