import React,{useState,useEffect} from 'react';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrap/dist/css/bootstrap.css';

import MontlyCount from "../../Images/count1.png";
import YearlyCount from "../../Images/count2.png";
import Quiz from "../../Images/count3.png";
import Flashcard from "../../Images/count4.png";
import QuizReportChart from "../../Images/quizreport-chart.svg";
import UserGraph from "../../Images/usergraph.png";
import MontlyUser from "../../Images/montly-user.png";
import yearlyUser from "../../Images/yearly-user.png";

import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';
import NavLinkHeader from '../NavMenu/NavLinkHeader';
import { useNavigate, Navigate } from "react-router-dom";


const Dashboard = () => {
      const history = useNavigate();
   useEffect(() => {
      const loggedInUser = localStorage.getItem("token");
      !loggedInUser && history("/");
   }, []);


    return (
        <>
            <div className='wrapper dashboard-main'>
               <Header />

                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>
                    <div className='leftPanel'>
                       <Sidebar />
                    </div>
                    <div className='rightPanel'>
                        <div className='right-panel-content'>
                            <div className='dashboardHeader'>
                                <h4>Dashboard</h4>
                            </div>
                            <div className='dashboardBody'>
                                <div className='dashboard-leftpanel'>
                                    <div className='countbox-main'>
                                        <div className="countBox">
                                            <img src={MontlyCount} />
                                            <h5>3000</h5>
                                            <p>Monthly Topic Count</p>
                                        </div>
                                        <div className="countBox">
                                            <img src={YearlyCount} />
                                            <h5>3000</h5>
                                            <p>Yearly Topic Count</p>
                                        </div>
                                        <div className="countBox">
                                            <img src={Quiz} />
                                            <h5>3000</h5>
                                            <p>Quiz Count</p>
                                        </div>
                                        <div className="countBox countbox2">
                                            <img src={Flashcard} />
                                            <h5>3000</h5>
                                            <p>Flashcard Count</p>
                                        </div>
                                    </div>
                                    <div className='quizMain'>
                                        <div className='quizreport-box'>
                                            <div className='quizreport-Main'>
                                                <div className='quiz-header'>
                                                    <h5>Quiz Report</h5>
                                                </div>
                                                <div className='graph-content'>
                                                    <div className='graph-box'>
                                                        <div className='graphBox-pass'></div>
                                                        <h5>Pass</h5>
                                                    </div>
                                                    <div className='graph-box'>
                                                        <div className='graphBox-fails'></div>
                                                        <h5>Pass</h5>
                                                    </div>
                                                    <div class="dropdown">
                                                        <button id="dLabel" className='cstm-moduldroupdown cstm-dashboard-droupdown' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            2022
                                                            <span class="cstn-module-caret"><i class="fa fa-chevron-down"></i></span>
                                                        </button>
                                                        <ul class="dropdown-menu" aria-labelledby="dLabel">
                                                            <li><a href='#'>2022</a></li>
                                                            <li><a href='#'>2022</a></li>
                                                            <li><a href='#'>2022</a></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='quizreport-chart'>
                                                <img src={QuizReportChart} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className='topingrating-Main'>
                                        <div className='topicRating-box'>
                                            <div className='quizreport-Main ratingMain'>
                                                <div className='quiz-header'>
                                                    <h5>Topic Ratings</h5>
                                                </div>
                                                <div className='graph-content'>
                                                    <div className='viewAll-btn'>
                                                        <button>View All</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="table-responsive bg-white rounded">

                                                <table class="table mb-0 table-center">
                                                    <tr>
                                                        <th className="border-bottom w-1">No.</th>
                                                        <th className="border-bottom w-15">Topic Name</th>
                                                        <th className="border-bottom w-15">Rating</th>
                                                        <th className="border-bottom w-8">Date </th>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>1</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                    <tr>
                                                        <td className='table-no'>2</td>
                                                        <td>Introduction Mindfulness Meditation</td>
                                                        <td className='start-rating'>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <span class="fa fa-star checked"></span>
                                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModalRating">
                                                                <a href="#" className='rating-content'>(150 Rating)</a>
                                                            </button>
                                                        </td>
                                                        <td>1 Feb, 2022</td>
                                                    </tr>
                                                </table>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className='dashboard-rightpenel'>
                                    <div className='topicRating-box Requestduser'>
                                        <div className='quizreport-Main ratingMain'>
                                            <div className='quiz-header'>
                                                <h5>Requested users</h5>
                                            </div>
                                            <div className='graph-content'>
                                                <div className='viewAll-btn'>
                                                    <button>View All</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='requested-user'>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className='requesteduserMain'>
                                                <div className='requestuser-content'>
                                                    <h5>Dianne Russell</h5>
                                                    <p>Month Long Course</p>
                                                </div>
                                                <div className='requesteduser-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-right"><i class="fa fa-check" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn cstm-cross" data-toggle="modal" data-target="#myModal">
                                                        <a href="#" class="cstm-delete"><i class="fa fa-times" aria-hidden="true"></i></a>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='topicRating-box'>
                                        <div className='quizreport-Main ratingMain'>
                                            <div className='quiz-header'>
                                                <h5>Users Count</h5>
                                            </div>
                                        </div>
                                        <div className='usergrph'>
                                            <div className='cstm-usergraph'>
                                                <img src={UserGraph} />
                                            </div>
                                        </div>
                                        <div className='usergraph-content'>
                                            <div className='usergraph-box'>
                                                <div className='graphBox-yealy'></div>
                                                <h5>Monthly Users</h5>
                                            </div>
                                            <div className='usergraph-box'>
                                                <div className='graphBox-montly'></div>
                                                <h5>Yearly Users</h5>
                                            </div>
                                            
                                        </div>
                                        <div className='montly-yearly-user'>
                                            <div className='monlthy-user'>
                                                <img src={MontlyUser} />
                                                <h6>250</h6>
                                                <p>Total Monthly User</p>
                                            </div>
                                            <div className='monlthy-user'>
                                                <img src={yearlyUser} />
                                                <h6>1000</h6>
                                                <p>Total Yearly User</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard;
