import React from 'react';
import VideoIcon from "../../Images/video-icon.png";
import backarrow from "../../Images/short_left.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";
import App from '../../App';
import Header from '../NavMenu/Header';
import Sidebar from '../NavMenu/Sidebar';

const AddQuiz = () => {
    return (
        <>
         <div className='wrapper dashboard-main'>
            <Header />
            <div className='top-header-divider'></div>
            <div className='fullpage-layout'>
                <Sidebar />
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
                                    <li class="breadcrumb-item active" aria-current="page">create question</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>Create Question</h3>
                            </div>
                        </div>
                        <div className='addtopic-main'>
                            <form>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Question</label><br />
                                        <input type="text" placeholder="Write question"></input>
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
                                                <li><a href='#'>Module</a></li>
                                                <li><a href='#'>Module</a></li>
                                                <li><a href='#'>Module</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
                                    <div className='cstm-checkboxIntro'>
                                           <div className='addcourse-option'>
                                                <h3>A</h3>
                                           </div>
                                           <div className='intor-course'>
                                                {/* <label>Introduction To The Course</label> */}
                                                <input type="text" placeholder='Introduction To The Course'></input>
                                           </div>
                                       </div>
                                       <div className='cstm-checkbox'>
                                           <input type="checkbox"></input>
                                       </div>
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 add-option'>
                                    <div class="row-2 add-videoLink"><a href="#">+Add more option</a></div>
                                    </div>
                                </div>
                                <div class="col-12 modal-addbtn"><button class="cstm-btn1">Add</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
        </>

    )
}
export default AddQuiz;
