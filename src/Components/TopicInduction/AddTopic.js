import React from 'react';
import VideoIcon from "../../Images/video-icon.png";
import backarrow from "../../Images/short_left.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";
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
                                    <li class="breadcrumb-item"><a href="#">month long course</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">add topics</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>Add Topic</h3>
                            </div>
                        </div>

                        <div className='addtopic-main'>
                            <form>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1'>
                                        <label> Topic Type</label>
                                        <div class="dropdown">
                                            <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select topic
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
                                        <input type="text" placeholder="Enter topic name"></input>
                                    </div>
                                </div>
                                <div className='addtopic-field'>                                   
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Induction Name</label><br />
                                        <input type="text" placeholder="Enter induction name"></input>
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
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Description</label><br />
                                        <textarea type="text" placeholder="Write description"></textarea>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Upload sign language image</label><br />
                                        <div className='viewtopicMusic-Images'>
                                            <div className='row-1 Main-video'>
                                                <div className='music-icon'>
                                                    <img src={ImageIcon} />
                                                </div>
                                                <div className='music-name'>
                                                    <label className='inputchoosefile'>
                                                        <input type="file" ></input>
                                                        <span> <h6>Drag & drop or click to add Images</h6>
                                                            <h5>Please use JPEG, PNG formate of images</h5></span>
                                                    </label>
                                                </div>
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
                                                        <span><h6>Drag & drop or click to add video.</h6>
                                                            <h5>Please use MP4 formate of video</h5></span>
                                                    </label>
                                                </div>
                                            </div>
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
                                                        <span> <h6>Add audio File</h6>
                                                            <h5>Please use MP4 formate of video</h5></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Upload Audio Suggestion</label><br />
                                        <div className='viewtopicMusic-Images'>
                                            <div className='row-1 Main-video'>
                                                <div className='music-icon'>
                                                    <img src={MusicIcon} />
                                                </div>
                                                <div className='music-name'>
                                                    <label className='inputchoosefile'>
                                                        <input type="file" ></input>
                                                        <span> <h6>Add audio File</h6>
                                                            <h5>Please use MP4 formate of video</h5></span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1'>
                                        <div class="dropdown">
                                            <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Select quiz 
                                                <span class="cstn-module-caret2"><i class="fa fa-chevron-down"></i></span>
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
                                   
                                   <div className='col-6 InputField-1 cstm-ModalField '>
                                       <label>Add Key Reminders </label><br />
                                       <textarea type="text" placeholder="Write key"></textarea>
                                   </div>
                               </div>
                                <div class="col-12 modal-addbtn"><button class="cstm-btn1">Add</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default AddTopic;
