import React, { useEffect, useState } from 'react';
import Header from '../NavMenu/Header'
import Sidebar from '../NavMenu/Sidebar'
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../../Services/auth.service';

const ViewFlashcard = () => {
    const [showFlashcardViewdata, setFlashcardViewdata] = useState();
    const [flashcardEditID, setflashcardEditID] = useState();
    const navigate = useNavigate();
    let location = useLocation();

    useEffect(() => {
        var displayApiInformation = location.state;

        setflashcardEditID(displayApiInformation)
        console.log(location.state, "mayur")

        AuthService.GetFlashcardByID(location.state).then((response) => {
            if (response.data.status) {
                console.log(response.data.data, "view")
                setFlashcardViewdata(response.data.data)
            }
        }).catch((e) => {
            console.log(e)
        })

    }, [location.state]);



    function backToFlashcardMainPage() {
        navigate("/flashcard")
    }

    return (<>

        <div className='wrapper dashboard-main'>
            <Header />
            <Sidebar />
            <div className='top-header-divider'></div>
            <div className='fullpage-layout'>
                <div className='rightPanel'>
                    <div className='maintable'>
                        <button onClick={backToFlashcardMainPage}>Back</button>

                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>View Flashcard</h3>
                            </div>
                        </div>
                        <div className='addtopic-main'>
                            <form>
                                <div className='topicinduction-main'>
                                    <div className='viewtopic-para'>
                                        <h5>Course Name</h5>
                                        <h6>{showFlashcardViewdata !== "" && showFlashcardViewdata !== undefined && showFlashcardViewdata !== null ? showFlashcardViewdata.topic_name : "-"}</h6>
                                    </div>
                                    <div className='viewtopic-para'>
                                        <h5>Module Name</h5>
                                        <h6>{showFlashcardViewdata !== undefined && showFlashcardViewdata !== null ? showFlashcardViewdata.question_type : "-"}</h6>
                                    </div>
                                </div>
                                <div className='viewtopic-para'>
                                    <h5>Topic Name</h5>
                                    <h6>{showFlashcardViewdata !== undefined && showFlashcardViewdata !== null ? showFlashcardViewdata.topic_type : "-"}</h6>

                                </div>
                                <div className='viewtopic-para'>
                                    <h5>Question</h5>
                                    <h6>{showFlashcardViewdata !== undefined && showFlashcardViewdata !== null ? showFlashcardViewdata.question : "-"}</h6>
                                </div>


                                <div className='addtopic-field '>
                                    <div
                                        className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse cstm-active-checkbox viewquestion-layout'>
                                        <div className='cstm-checkboxIntro cstm-checkboxIntro2'>
                                            <div className='addcourse-option'>
                                                <h3>A</h3>
                                            </div>
                                            <div className='intor-course viewcourse-input'>
                                                <input type="text" readOnly value={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.option1} />
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox" checked={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.answer1}></input>
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
                                                <input type="text" readOnly value={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.option2} />
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                        <input type="checkbox" readOnly checked={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.answer2}></input>
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
                                                <input type="text" readOnly value={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.option3} />
                                            </div>
                                        </div>
                                        <div className='cstm-checkbox'>
                                        <input type="checkbox" readOnly checked={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.answer3}></input>
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
                                                <input type="text" readOnly value={showFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.option4} />
                                            </div>
                                        <div className='cstm-checkbox'>
                                            <input type="checkbox" checked={console.logshowFlashcardViewdata !== undefined && showFlashcardViewdata !== null && showFlashcardViewdata.options.answer4}></input>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delet Popup Topic */}


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
        </div>
    </>)
}

export default ViewFlashcard