import React from 'react';
import viewimg1 from "../../Images/img1.png";
import viewimg2 from "../../Images/img2.png";
import viewimg3 from "../../Images/img3.png";
import viewimg4 from "../../Images/img4.png";
import viewimg5 from "../../Images/img5.png";
import viewimg6 from "../../Images/img6.png";
import uploadedvideo1 from "../../Images/uploaded-video1.png";
import uploadedvideo2 from "../../Images/uploaded-video2.png";
import uploadedvideo3 from "../../Images/uploaded-video3.png";
import uploadedvideo4 from "../../Images/uploaded-video4.png";
import VideoIcon from "../../Images/video-icon.png";
import backarrow from "../../Images/short_left.png";

import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";
import App from '../../App';


const EditTopic = () => {

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
                                    <li class="breadcrumb-item"><a href="#">question listing</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">edit question</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>Edit Question</h3>
                            </div>
                        </div>

                        <div className='addtopic-main'>
                            <form>
                                <div className='addtopic-field'>

                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Question</label><br />
                                        <input type="text" placeholder="The reason you tidy up your meditation area is:"></input>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1'>
                                        <label>Answer Type</label>
                                        <div class="dropdown">
                                            <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Text
                                                <span class="cstn-module-caret2"><i class="fa fa-chevron-down"></i></span>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                                <li><a href='#'>test1</a></li>
                                                <li><a href='#'>test1</a></li>
                                                <li><a href='#'>test1</a></li>
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse cstm-active-checkbox'>
                                        <div className='cstm-checkboxIntro'>
                                            <div className='addcourse-option'>
                                                <h3>A</h3>
                                            </div>
                                            <div className='intor-course viewcourse-input'>
                                            <input type="text" placeholder='Because it interferes with the cosmic energy.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox" checked></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
                                        <div className='cstm-checkboxIntro'>
                                            <div className='addcourse-option'>
                                                <h3>B</h3>
                                            </div>
                                            <div className='intor-course viewcourse-input'>
                                            <input type="text" placeholder='Because it just a good idea.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
                                        <div className='cstm-checkboxIntro'>
                                            <div className='addcourse-option'>
                                                <h3>C</h3>
                                            </div>
                                            <div className='intor-course viewcourse-input'>
                                            <input type="text" placeholder='Because it just a good idea.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
                                        <div className='cstm-checkboxIntro'>
                                            <div className='addcourse-option'>
                                                <h3>D</h3>
                                            </div>
                                            <div className='intor-course viewcourse-input'>
                                            <input type="text" placeholder='None of the above.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='notes'>
                                        <h5>Note: please select right answer.</h5>
                                    </div>
                                </div>
                                <div class="col-12 modal-addbtn"><button class="cstm-btn1 cstm-updatebtn">Update</button></div>
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
export default EditTopic;
