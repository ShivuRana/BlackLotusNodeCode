import React from 'react';
import backarrow from "../../Images/short_left.png";
import App from '../../App';


const ViewQuestion = () => {

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
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse cstm-active-checkbox viewquestion-layout'>
                                        <div className='cstm-checkboxIntro cstm-checkboxIntro2'>
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
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse viewquestion-layout'>
                                        <div className='cstm-checkboxIntro cstm-checkboxIntro2'>
                                            <div className='addcourse-option'>
                                                <h3>B</h3>
                                            </div>
                                            <div className='intor-course'>
                                                <input type="text" placeholder='Because it interferes with the cosmic energy.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse viewquestion-layout'>
                                        <div className='cstm-checkboxIntro'>
                                            <div className='addcourse-option'>
                                                <h3>C</h3>
                                            </div>
                                            <div className='intor-course'>
                                                <input type="text" placeholder='Because it interferes with the cosmic energy.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox"></input>
                                        </div>
                                    </div>
                                </div>
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse viewquestion-layout'>
                                        <div className='cstm-checkboxIntro'>
                                            <div className='addcourse-option'>
                                                <h3>D</h3>
                                            </div>
                                            <div className='intor-course'>
                                            <input type="text" placeholder='Because it interferes with the cosmic energy.'></input>
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox" ></input>
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
export default ViewQuestion;
