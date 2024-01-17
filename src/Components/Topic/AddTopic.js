import React from 'react';
import VideoIcon from "../../Images/video-icon.png";
import backarrow from "../../Images/short_left.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";
import App from '../../App';

const AddTopic1 = () => {
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
                                        <label>Select Module</label>
                                        <div class="dropdown">
                                            <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Select Module
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
                                        <label>Description</label><br />
                                        <textarea type="text" placeholder="Write description"></textarea>
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
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Upload Audio </label><br />
                                        <div className='viewtopicMusic-Images'>
                                            <div className='row-1 Main-video'>
                                                <div className='music-icon'>
                                                    <img src={MusicIcon} />
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
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Upload Audio Suggestion </label><br />
                                        <div className='viewtopicMusic-Images'>
                                            <div className='row-1 Main-video'>
                                                <div className='music-icon'>
                                                    <img src={MusicIcon} />
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
                                
                                <div class="col-12 modal-addbtn"><button class="cstm-btn1">Add</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default AddTopic1;
