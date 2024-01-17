import React from 'react';
import backarrow from "../../Images/short_left.png";
import viewimg1 from "../../Images/img1.png";
import viewimg2 from "../../Images/img2.png";
import viewimg3 from "../../Images/img3.png";
import viewimg4 from "../../Images/img4.png";
import App from '../../App';


const ViewQuestionImage = () => {

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
                                    <li class="breadcrumb-item active" aria-current="page">view question</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>View Question</h3>
                            </div>
                        </div>

                        <div className='addtopic-main'>
                            <form>
                               
                            <div className='viewtopic-para'>
                                    <h5>Question Type</h5>
                                    <h6>Text</h6>
                                </div>
                                <div className='viewtopic-para'>
                                    <h5>Question</h5>
                                    <h6>The reason you tidy up your meditation area is:</h6>
                                </div>

                                <div className='MainImage-Question'>
                                    <div className='edit-ImageQuestionMain'>
                                        <div className='Image-qustion'>
                                            <div className='image-questionOption'>
                                                <h5>A.</h5>
                                            </div>
                                            <div className='QuestionImg'>
                                                <img src={viewimg1} />
                                                <div className='cstm-Imagecheckbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='edit-ImageQuestionMain'>
                                        <div className='Image-qustion'>
                                            <div className='image-questionOption'>
                                                <h5>B.</h5>
                                            </div>
                                            <div className='QuestionImg'>
                                                <img src={viewimg2} />
                                                <div className='cstm-Imagecheckbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                               
                                <div className='MainImage-Question'>
                                    <div className='edit-ImageQuestionMain'>
                                        <div className='Image-qustion'>
                                            <div className='image-questionOption'>
                                                <h5>C.</h5>
                                            </div>
                                            <div className='QuestionImg'>
                                                <img src={viewimg3} />
                                                <div className='cstm-Imagecheckbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='edit-ImageQuestionMain'>
                                        <div className='Image-qustion'>
                                            <div className='image-questionOption'>
                                                <h5>D.</h5>
                                            </div>
                                            <div className='QuestionImg'>
                                                <img src={viewimg4} />
                                                <div className='cstm-Imagecheckbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ViewQuestionImage;
