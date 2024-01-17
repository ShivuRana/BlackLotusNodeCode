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
                                    <li class="breadcrumb-item"><a href="#">month long course</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">edit topics</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>Edit Topic</h3>
                            </div>
                        </div>

                        <div className='addtopic-main'>
                            <form>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1'>
                                        <label>Topic Type</label>
                                        <div class="dropdown">
                                            <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Induction
                                                <span class="cstn-module-caret2"><i class="fa fa-chevron-down"></i></span>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                                <li><a href='#'>Module</a></li>
                                                <li><a href='#'>Module</a></li>
                                                <li><a href='#'>Module</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Topic Name</label><br />
                                        <input type="text" placeholder="Introduction Mindfulness Meditation"></input>
                                    </div>
                                </div>

                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Description</label><br />
                                        <textarea type="text" placeholder="Write description"></textarea>
                                    </div>
                                </div>

                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Induction Name</label><br />
                                        <input type="text" placeholder="Induction"></input>
                                    </div>
                                    <div className='col-6 InputField-1  '>
                                        <label>Induction Code</label><br />
                                        <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
                                            <div className='cstm-checkboxIntro'>
                                                <div className='addcourse-option'>
                                                    <h3>I</h3>
                                                </div>
                                                <div className='intor-course viewcourse-input'>
                                                    <input type="text" placeholder='1'></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className='viewtopic-para'>
                                    <div className='signlanguageeffect'>
                                        <h5>Enter Image of Sign language</h5>
                                        <div className='signbox'>
                                            <div className='signlanguage-box'>
                                                <h6>I1</h6>
                                                <span className='viewImage-option2'>
                                                    <span> <i class="fa fa-pencil" aria-hidden="true"></i></span>
                                                    <span> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                                </span>
                                            </div>
                                            <div className='row-2 add-videoLink'>
                                                <a href='#'>+Add audio</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Upload Video</label><br />
                                        <div className='viewtopicMusic-Images'>
                                            <div className='row-1 Main-video'>
                                                <div className='music-icon'>
                                                    <img src={VideoIcon} />
                                                </div>
                                                <div className='music-name'>
                                                    <label className='inputchoosefile'>
                                                        <input type="file" ></input>
                                                        <span> <h6>Drag & drop or click to add video.</h6>
                                                            <h5>Please use MP4 formate of video</h5></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewtopic-Images'>
                                    <div className='uploadedvideoMain'>
                                        <div className='uploadimg uploadimgeffect row-1'>
                                            <img src={uploadedvideo1} />
                                            {/* <h5>Meditation video</h5>
                                                <p>150.20 MB</p> */}
                                            <span className='viewImage-option'>
                                                <span> <i class="fa fa-pencil" aria-hidden="true"></i></span>
                                                <span> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                            </span>
                                        </div>
                                        <div className='uploadimg uploadimgeffect row-1'>
                                            <img src={uploadedvideo2} />
                                            <span className='viewImage-option'>
                                                <span> <i class="fa fa-pencil" aria-hidden="true"></i></span>
                                                <span> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                            </span>
                                        </div>
                                        <div className='uploadimg uploadimgeffect row-1'>
                                            <img src={uploadedvideo3} />
                                            <span className='viewImage-option'>
                                                <span> <i class="fa fa-pencil" aria-hidden="true"></i></span>
                                                <span> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                            </span>
                                        </div>
                                        <div className='uploadimg uploadimgeffect row-1'>
                                            <img src={uploadedvideo4} />
                                            <span className='viewImage-option'>
                                                <span> <i class="fa fa-pencil" aria-hidden="true"></i></span>
                                                <span> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                            </span>
                                        </div>
                                        <div className='uploadimg uploadimgeffect row-1'>
                                            <img src={uploadedvideo1} />
                                            <span className='viewImage-option'>
                                                <span> <i class="fa fa-pencil" aria-hidden="true"></i></span>
                                                <span> <i class="fa fa-trash" aria-hidden="true"></i></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Upload images</label><br />
                                        <div className='viewtopicMusic-Images'>
                                            <div className='row-1 Main-video'>
                                                <div className='music-icon'>
                                                    <img src={ImageIcon} />
                                                </div>
                                                <div className='music-name'>
                                                    <label className='inputchoosefile'>
                                                        <input type="file" ></input>
                                                        <span> <h6>Drag & drop or click to add video.</h6>
                                                            <h5>Please use MP4 formate of video</h5></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='viewtopic-Images'>
                                    <div className='uploadedvideoMain'>
                                        <div className='uploadimg'>
                                            <img src={viewimg1} />
                                        </div>
                                        <div className='uploadimg'>
                                            <img src={viewimg2} />
                                        </div>
                                        <div className='uploadimg'>
                                            <img src={viewimg3} />
                                        </div>
                                        <div className='uploadimg'>
                                            <img src={viewimg4} />
                                        </div>
                                        <div className='uploadimg'>
                                            <img src={viewimg5} />
                                        </div>
                                        <div className='uploadimg'>
                                            <img src={viewimg6} />
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField edit-audiosource'>
                                        <label>Audio Source</label><br />
                                        <div className='edit-audio'>
                                            <div className='row-1 edit-Main-music'>
                                                <div className='edit-audio'>
                                                    <div className='music-icon'>
                                                        <img src={MusicIcon} />
                                                    </div>
                                                    <div className='music-name'>
                                                        <h6>Morning Flower</h6>
                                                        <h5>MP3</h5>
                                                    </div>
                                                </div>
                                                <div className='edit-delete-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal"><a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a></button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"><a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a></button>
                                                </div>
                                            </div>
                                            <div className='row-2 add-videoLink'>
                                                <a href='#'>+Add audio</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField'>
                                        <label>Audio Suggestion</label><br />
                                        <div className='edit-audio'>
                                            <div className='row-1 edit-Main-music'>
                                                <div className='edit-audio'>
                                                    <div className='music-icon'>
                                                        <img src={MusicIcon} />
                                                    </div>
                                                    <div className='music-name'>
                                                        <h6>Meditaion Music</h6>
                                                        <h5>MP3</h5>
                                                    </div>
                                                </div>
                                                <div className='edit-delete-icon'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal"><a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a></button>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"><a href="#" class="cstm-delete"><i class="fa fa-trash" aria-hidden="true"></i></a></button>
                                                </div>
                                            </div>
                                            <div className='row-2 add-videoLink'>
                                                <a href='#'>+Add audio</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 Edit-InputField'>
                                        <div class="dropdown">
                                            <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select quiz
                                                <span class="cstn-module-caret3"><i class="fa fa-chevron-down"></i></span>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                                <li><a href='#'>Module</a></li>
                                                <li><a href='#'>Module</a></li>
                                                <li><a href='#'>Module</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='intro-courseMain'>
                                        <div className='InputField-1 cstm-checkbox'>
                                            <input type="checkbox"></input>
                                            <label>Introduction To The Course</label>
                                        </div>
                                        <div className='delete-course'>
                                            <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"><a href="#" class="cstm-delete cstm-trash"><i class="fa fa-trash" aria-hidden="true"></i></a></button>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 modal-addbtn"><button class="cstm-btn1">Update</button></div>
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
                                <h4>Are you sure to delete<br /> this audio?</h4>
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
