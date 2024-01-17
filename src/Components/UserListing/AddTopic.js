import React from 'react';
import backarrow from "../../Images/short_left.png";
import dot from "../../Images/dot.png";
import App from '../../App';


const AddTopic = () => {

    return (
        <>

            <div className='rightPanel'>
                <div className='right-panel-content'>
                    <div className='cstm-back-breadcrums'>
                        <div className='backarrow'>
                            <a href='#'><img src={backarrow} /> Back</a>
                        </div>
                        <div className='cstm-navigation'>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="#">user</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">user request</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>User Request</h3>
                            </div>
                            <div className='cstm-search-createbtn'>
                                <div className='serachbox searchbox-2'>
                                    <i class="fa fa-search" aria-hidden="true"></i>
                                    <input type="text" placeholder='Search'></input>
                                </div>
                            </div>
                        </div>
                        <div id="Dashboard" className="main-tab">
                            <div class="table-responsive bg-white rounded">
                                <table class="table mb-0 table-center">
                                    <tr>

                                        <th className="border-bottom w-4">No.</th>
                                        <th className="border-bottom w-15">User Name</th>
                                        <th className="border-bottom w-30">Email Address</th>
                                        <th className="border-bottom w-10">Phone_No</th>
                                        <th class="border-bottom w-10">Course <i class="fa fa-chevron-down cstm-icon cstm-CourseIcon"></i> </th>
                                        <th class="border-bottom w-10">Applied Date</th>
                                        <th class="border-bottom w-15">Action</th>

                                    </tr>
                                    <tr>

                                        <td>1</td>
                                        <td>Leslie Alexander</td>
                                        <td>sara.cruz@example.com</td>
                                        <td>(505) 555-0125</td>
                                        <td className='cstm-switch'>Month </td>
                                        <td>1 Feb, 2020</td>
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

                                        <td>1</td>
                                        <td>Leslie Alexander</td>
                                        <td>sara.cruz@example.com</td>
                                        <td>(505) 555-0125</td>
                                        <td className='cstm-switch'>Month </td>
                                        <td>1 Feb, 2020</td>
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


                {/* MODAL-BODY */}

                <div class="modal cstm-modal fade" id="myModal2" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
                <div class="modal-dialog modal-dialog-centered cstm-modal-dialog-user" role="document">
                    <div class="modal-content">
                        <div class="modal-header cstm-modalheader">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title cstm-modal-title" id="myModalLabel2">View User</h4>
                        </div>
                        <div class="modal-body modal-contentbody">
                            <div className='topicinduction-main  userlisting-main'>
                                <div className='viewtopic-para2 TopicListing'>
                                    <h5>User Name</h5>
                                    <h6>Robert Fox</h6>
                                </div>
                             
                            </div>
                            <div className='topicinduction-main'>
                                <div className='viewtopic-para2 TopicListing'>
                                    <h5>Email Address</h5>
                                    <h6>curtis.weaver@example.com</h6>
                                </div>
                                <div className='viewtopic-para3 TopicListing2'>
                                    <h5>Course</h5>
                                    <h6>Month Long Course</h6>
                                </div>
                            </div>

                            <div className='topicinduction-main'>
                                <div className='viewtopic-para2 TopicListing'>
                                    <h5>Start Date</h5>
                                    <h6>1 Feb,2022</h6>
                                </div>
                                <div className='viewtopic-para3 TopicListing2'>
                                    <h5>End Date</h5>
                                    <h6>1 Feb,2023</h6>
                                </div>
                            </div>
                            <div className='delete-btn userlisting-btn'>
                                <button className='cstm-approved'>Approved</button>
                                <button className='cstm-deletebtn'>Decline</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default AddTopic;
