import React from 'react';
import viewimg1 from "../../Images/img1.png";
import viewimg2 from "../../Images/img2.png";
import viewimg3 from "../../Images/img3.png";
import viewimg4 from "../../Images/img4.png";
import viewimg5 from "../../Images/img5.png";
import viewimg6 from "../../Images/img6.png";
import video1 from "../../Images/video1.png";
import MusicIcon from "../../Images/music-icon.png";
import backarrow from "../../Images/short_left.png";
import App from '../../App';


const ViewTopic = () => {

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
                                    <li class="breadcrumb-item active" aria-current="page">view topics</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>View Topic</h3>
                            </div>
                        </div>
                        <div className='main-ViewTopicLayout'>
                            <div className='viewtopic-para'>
                                <h5>Topic Type</h5>
                                <h6>Induction</h6>
                            </div>
                            <div className='viewtopic-para'>
                                <h5>Topic Name</h5>
                                <h6>Introduction Mindfulness Meditation</h6>
                            </div>
                            <div className='topicinduction-main'>
                                <div className='viewtopic-para'>
                                    <h5>Induction Name</h5>
                                    <h6>Induction</h6>
                                </div>
                                <div className='viewtopic-para'>
                                    <h5>Induction Name</h5>
                                    <h6>Induction</h6>
                                </div>
                            </div>
                            <div className='viewtopic-para'>
                                <h5>Description</h5>
                                <h6>Meditation is considered a type of mind-body complementary medicine. Meditation can produce a deep state of relaxation and a tranquil mind. During
                                    meditation, you focus your attention and eliminate the stream.</h6>
                            </div>
                            <div className='viewtopic-para signlanguage-box'>
                                <h5>Sign language</h5>
                                <h6>I1</h6>
                            </div>
                            <div className='viewtopic-para'>
                                <h5>Images</h5>
                                <div className='viewtopic-Images'>
                                    <div className='row-1'>
                                        <img src={viewimg1} />
                                        <img src={viewimg2} />
                                        <img src={viewimg3} />
                                        <img src={viewimg4} />
                                    </div>
                                    <div className='row-2'>
                                        <img src={viewimg5} />
                                        <img src={viewimg6} />
                                    </div>
                                </div>
                            </div>
                            <div className='viewtopic-para'>
                                <h5>Video</h5>
                                <div className='viewtopic-Images'>
                                    <div className='row-1'>
                                        <img src={video1} />
                                        <img src={video1} />
                                        <img src={video1} />
                                        <img src={video1} />
                                    </div>
                                </div>
                            </div>
                            <div className='viewtopicMusic-para'>
                                <h5 >Audio Source</h5>
                                <div className='viewtopicMusic-Images'>
                                    <div className='row-1 Main-music'>
                                        <div className='music-icon'>
                                            <img src={MusicIcon} />
                                        </div>
                                        <div className='music-name'>
                                            <h6>Mrditation Music</h6>
                                            <h5>MP3</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='viewtopicMusic-para'>
                                <h5 >Audio Suggestion</h5>
                                <div className='viewtopicMusic-Images'>
                                    <div className='row-1 Main-music'>
                                        <div className='music-icon'>
                                            <img src={MusicIcon} />
                                        </div>
                                        <div className='music-name'>
                                            <h6>Mrditation Music</h6>
                                            <h5>MP3</h5>
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
export default ViewTopic;
