import React from 'react'
import dashboardimg from "../../Images/dashboard.png";
import user from "../../Images/users.png";
import course from "../../Images/course.png";
import quiz from "../../Images/quiz.png";
import flashcard from "../../Images/flashcard.png";
import { Link, NavLink } from "react-router-dom";
import { useNavigate, Navigate } from "react-router-dom";


export default function Sidebar() {
    const history = useNavigate();

    const currentPath = window.location.pathname;
    console.log(currentPath, "currentPath");



    return (
        <>
            <div className='leftPanel'>
                <div className="panel-group cstm-nav-tabs" id="accordion" role="tablist" aria-multiselectable="true">
                    <div className="panel">
                        <div className="panel-heading" role="tab" id="headingOne">
                            <h4 className="panel-title">

                                <Link to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span> <img src={dashboardimg} /></span> Dashboard
                                </Link>
                            </h4>

                        </div>
                    </div>
                    <div className="panel ">
                        <div className="panel-heading" role="tab" id="headingTwo">
                            <h4 className="panel-title font-icon">
                                <a className={`collapsed ${currentPath === "/users" || currentPath === "/requested-users" ? "active" : ""}`} role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    <span><img src={user} /></span>
                                    Users
                                    <i className="fa fa-chevron-right cstm-icon"></i>
                                </a>
                            </h4>
                        </div>
                        <div id="collapseTwo" className={`panel-collapse collapse ${currentPath === "/users" ? "in" : ""}`} role="tabpanel" aria-labelledby="headingTwo">
                            <div className="cstm-submenu">
                                <ul>
                                    <li>
                                        <NavLink to="/users" className={({ isActive }) => (isActive ? "active" : "")} > <i className="fa fa-caret-right" ></i>User Listing</NavLink>

                                    </li>
                                    <li>
                                        <NavLink to="/requested-users" className={({ isActive }) => (isActive ? "active" : "")} > <i className="fa fa-caret-right" ></i>Requested User</NavLink>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="panel ">
                        <div className="panel-heading" role="tab" id="headingThree">
                            <h4 className="panel-title">
                                <a className={`collapsed ${currentPath === "/topic" || currentPath === "/view-topic" || currentPath === "/add-topic" || currentPath === "/editTopic" ? "active" : ""}`} role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    <span><img src={course} /></span>
                                    Month Long Course
                                    <i className="fa fa-chevron-right cstm-icon"></i>
                                </a>
                            </h4>
                        </div>
                        <div id="collapseThree" className={`panel-collapse collapse ${currentPath === "/topic" ? "in" : ""}`} role="tabpanel" aria-labelledby="headingThree">
                            <div className="cstm-submenu">
                                <ul>
                                    <li>
                                        <NavLink
                                            to="/modules"
                                            className={({ isActive }) => (isActive ? "active" : "")}
                                        >
                                            <i className="fa fa-caret-right" ></i>
                                            Modules
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink
                                            to="/topic"
                                            className={({ isActive }) => (isActive ? "active" : "")}
                                        >
                                            <i className="fa fa-caret-right" ></i>

                                            Topics
                                        </NavLink>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>

                    <div className="panel ">
                        <div className="panel-heading" role="tab" id="headingThree">
                            <h4 className="panel-title">
                                <a className={`collapsed ${currentPath === "/year-topic" || currentPath === "/view-YearTopic" || currentPath === "/add-YearTopic" || currentPath === "/edit-YearTopic" ? "active" : ""}`} role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                    <span><img src={course} /></span>
                                    Year Long Course
                                    <i className="fa fa-chevron-right cstm-icon"></i>
                                </a>
                            </h4>
                        </div>
                        <div id="collapsefour" className={`panel-collapse collapse ${currentPath === "/year-topic" ? "in" : ""}`} role="tabpanel" aria-labelledby="headingThree">
                            <div className="cstm-submenu">
                                <ul>
                                    <li><a href="#"><i className="fa fa-caret-right" ></i> Modules</a></li>

                                    {/* <li>
                                        <NavLink
                                            to="/modules"
                                            className={({ isActive }) => (isActive ? "active" : "")}
                                        >
                                            <i className="fa fa-caret-right" ></i>
                                            Modules
                                        </NavLink>
                                    </li> */}
                                    <li>
                                        <NavLink
                                            to="/year-topic"
                                            className={({ isActive }) => (isActive ? "active" : "")}
                                        >
                                            <i className="fa fa-caret-right" ></i>

                                            Topics
                                        </NavLink>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading" role="tab" id="headingfive">
                            <h4 className="panel-title">
                                <Link to="/quiz" className={({ isActive }) => (isActive ? "active" : "")}> <span><img src={quiz} /></span>Quiz
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading" role="tab" id="headingsix">
                            <h4 className="panel-title">
                                <Link to="/flashcard" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span><img src={flashcard} /></span>Flashcard
                                </Link>
                            </h4>
                        </div>
                    </div>
                    <div className="panel">
                        <div className="panel-heading" role="tab" id="headingsix">
                            <h4 className="panel-title">
                                <Link to="/audio-suggesion" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <span>
                                        <img src={flashcard} />
                                    </span>Audio Suggesion
                                </Link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

