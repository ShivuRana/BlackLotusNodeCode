import React from 'react';
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'bootstrap/dist/css/bootstrap.css';
import logo1 from "../../Images/logo1.png";
import AdminImage from "../../Images/admin-img.png";
import Notification from "../../Images/Notification.png";
import dashboardimg from "../../Images/dashboard.png";
import user from "../../Images/users.png";
import course from "../../Images/course.png";
import quiz from "../../Images/quiz.png";
import flashcard from "../../Images/flashcard.png";
import dot from "../../Images/dot.png";
import App from '../../App';

const Dashboard = () => {

    return (
        <> 
            <div className='wrapper dashboard-main'>
                <div className='main-topheader'>
                    <div className='topheaderMain '>
                        <div className='logo-section'>
                            <img src={logo1} />
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
                                        <li><a href="#">Profile</a></li>
                                        <li><a href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='top-header-divider'></div>
                <div className='fullpage-layout'>
                    <div className='leftPanel'>
                        <div class="panel-group cstm-nav-tabs" id="accordion" role="tablist" aria-multiselectable="true">
                            <div class="panel">
                                <div class="panel-heading" role="tab" id="headingOne">
                                    <h4 class="panel-title">
                                        <a className='active'>
                                            <span> <img src={dashboardimg} /></span>
                                            Dashboard
                                        </a>
                                    </h4>
                                </div>
                            </div>
                            <div class="panel ">
                                <div class="panel-heading" role="tab" id="headingTwo">
                                    <h4 class="panel-title font-icon">
                                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            <span><img src={user} /></span>

                                            Users
                                            <i class="fa fa-chevron-right cstm-icon"></i>
                                            {/* DOWN-ICON */}
                                            {/* <i class="fa fa-chevron-down cstm-icon"></i> */}
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                                    <div class="cstm-submenu">
                                        <ul>
                                            <li><a href="#"><i class="fa fa-caret-right" ></i> User1</a></li>
                                            <li><a href="#"><i class="fa fa-caret-right" ></i> User2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="panel ">
                                <div class="panel-heading" role="tab" id="headingThree">
                                    <h4 class="panel-title">
                                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            <span><img src={course} /></span>
                                            Month Long Course
                                            <i class="fa fa-chevron-right cstm-icon"></i>
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                                    <div class="cstm-submenu">
                                        <ul>
                                            <li><a href="#"><i class="fa fa-caret-right" ></i> User1</a></li>
                                            <li><a href="#"><i class="fa fa-caret-right" ></i> User2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="panel ">
                                <div class="panel-heading" role="tab" id="headingfour">
                                    <h4 class="panel-title">
                                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapsefour" aria-expanded="false" aria-controls="collapsefour">
                                            <span> <img src={course} /></span>
                                            Year Long Course
                                            <i class="fa fa-chevron-right cstm-icon"></i>
                                        </a>
                                    </h4>
                                </div>
                                <div id="collapsefour" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingfour">
                                    <div class="cstm-submenu">
                                        <ul>
                                            <li><a href="#"><i class="fa fa-caret-right" ></i> User1</a></li>
                                            <li><a href="#"><i class="fa fa-caret-right" ></i> User2</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="panel">
                                <div class="panel-heading" role="tab" id="headingfive">
                                    <h4 class="panel-title">
                                        <a>
                                            <span><img src={quiz} /></span>
                                            Quiz
                                        </a>
                                    </h4>
                                </div>
                            </div>
                            <div class="panel">
                                <div class="panel-heading" role="tab" id="headingsix">
                                    <h4 class="panel-title">
                                        <a>
                                            <span><img src={flashcard} /></span>
                                            Flashcard
                                        </a>
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='rightPanel'>
                        <div className='right-panel-content'>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="#">year long course</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">modules</li>
                                </ol>
                            </nav>
                            <div className='maintable'>
                                <div className='cstm-contentHeader'>
                                    <div className='cstm-header'>
                                        <h3>Year-Long Modules</h3>
                                    </div>
                                    <div className='cstm-search-createbtn'>
                                        <div className='serachbox'>
                                            <i class="fa fa-search" aria-hidden="true"></i>
                                            <input type="text" placeholder='Search module'></input>
                                        </div>
                                        <div className=''>
                                            <button type="button" class="cstm-btn1" data-toggle="modal" data-target="#myModal1">
                                                Create Module
                                            </button>
                                            <a href="#"></a>
                                        </div>
                                    </div>
                                </div>
                                <div id="Dashboard" className="tab-pane active main-tab">
                                    <div class="table-responsive bg-white rounded">
                                        <table class="table mb-0 table-center">
                                            <tr>
                                                <th className="border-bottom w-2"> &nbsp;</th>
                                                <th className="border-bottom w-4">No.</th>
                                                <th className="border-bottom w-15">Module Name</th>
                                                <th className="border-bottom w-27">Description </th>
                                                <th className="border-bottom w-15">Date </th>
                                                <th class="border-bottom w-10">Action </th>
                                            </tr>
                                            <tr>
                                                <td> <img src={dot} /> </td>
                                                <td>1</td>
                                                <td>Meditate</td>
                                                <td>Meditation is considered a type of mind...</td>
                                                <td>11/06/2022</td>
                                                <td>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2">
                                                        <a href="#" class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                                                        <a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4">

                                                        <a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> <img src={dot} /> </td>
                                                <td>2</td>
                                                <td>Meditate</td>
                                                <td>Meditation is considered a type of mind...</td>
                                                <td>11/06/2022</td>
                                                <td>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2">
                                                        <a href="#" class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                                                        <a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4">

                                                        <a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> <img src={dot} /> </td>
                                                <td>3</td>
                                                <td>Meditate</td>
                                                <td>Meditation is considered a type of mind...</td>
                                                <td>11/06/2022</td>
                                                <td>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2">
                                                        <a href="#" class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                                                        <a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4">

                                                        <a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> <img src={dot} /> </td>
                                                <td>4</td>
                                                <td>Meditate</td>
                                                <td>Meditation is considered a type of mind...</td>
                                                <td>11/06/2022</td>
                                                <td>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2">
                                                        <a href="#" class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                                                        <a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4">

                                                        <a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                                    </button>
                                                </td>

                                            </tr>
                                            <tr>
                                                <td> <img src={dot} /> </td>
                                                <td>5</td>
                                                <td>Meditate</td>
                                                <td>Meditation is considered a type of mind...</td>
                                                <td>11/06/2022</td>
                                                <td>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal2">
                                                        <a href="#" class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i>
                                                        </a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal3">
                                                        <a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                                                    </button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4">

                                                        <a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a>
                                                    </button>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL-BODY */}

            <div class="modal cstm-modal fade" id="myModal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel1">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel1">Add New Module</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <form>
                                <div className='col-12 cstm-ModalField main-modalfield'>
                                    <label>Module Name</label><br />
                                    <input type="text" placeholder='Enter module name'></input>
                                </div>
                                <div className='col-12 cstm-ModalField'>
                                    <label>Module Description</label><br />
                                    <textarea type="text" placeholder='Write description'></textarea>
                                </div>
                                <div className='col-12 modal-addbtn'>
                                    <button className='cstm-btn1'>Add</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal cstm-modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel2">View Module</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <h4>Module Name</h4>
                            <h6>Meditate</h6>
                            <h5 className='modal-desc'>Module Description</h5>
                            <p>
                                Meditation is considered a type of mind-body complementary medicine.
                                Meditation can produce a deep state of relaxation and a tranquil mind.During
                                meditation, you focus your attention and eliminate the stream.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal cstm-modal fade" id="myModal3" tabindex="-1" role="dialog" aria-labelledby="myModalLabel3">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel3">Edit Module</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <form>
                                <div className='col-12 cstm-ModalField main-modalfield'>
                                    <label>Module Name</label><br />
                                    <input type="text" placeholder='Enter module name'></input>
                                </div>
                                <div className='col-12 cstm-ModalField'>
                                    <label>Module Description</label><br />
                                    <textarea type="text" placeholder='Write description'></textarea>
                                </div>
                                <div className='col-12 modal-addbtn'>
                                    <button className='cstm-btn1'>Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal cstm-modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4">
                <div class="modal-dialog modal-dialog-centered cstm-delete-modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel4"></h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <div className='delte-header'>
                                <h4>Are you sure to delete<br /> this module?</h4>
                            </div>
                            <div className='delete-btn'>
                                <button className='cstm-deletebtn'>Delete</button>
                                <button className='cstm-discardbtn'>Discard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Dashboard;
