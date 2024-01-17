import React,{useCallback} from 'react';
import accordiondots from "../../Images/que-dot.png";
import swal from "sweetalert";

import backarrow from "../../Images/short_left.png";
import App from '../../App';
import { useEffect } from 'react';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import Sidebar from '../NavMenu/Sidebar';
import Header from '../NavMenu/Header';
import Services from '../../Services/auth.service';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';


const ViewQuiz = () => {
    const [questionData,setQuestionData] = useState([]);
    const [questionName,setquestionName] = useState();
    const [noDataMsg,setNoDataMsg] = useState('');
    const getid = useLocation().search;
    const QuizID = new URLSearchParams(getid).get("id");
    const navigate = useNavigate();
    const [selectedId, setselectedId] = useState();

    const [dragAndDrop, setDragAndDrop] = useState({
        draggedFrom: null,
        draggedTo: null,
        isDragging: false,
        originalOrder: [],
        updatedOrder: [],
    });

    const onDrop = useCallback((acceptedFiles) => {
        // Do something with the files
    }, []);
 
    useEffect(()=>{

        Services.getQuizeById(QuizID)
        .then((response) => {
            if (response.data.status === 200) {
                var QuizeId = response.data.data.quizName;
                setquestionName(QuizeId);
            } else {
                console.log("error");
            }
        })
        .catch(function (err) {
        });

        Services.getQuestionByQuizId(QuizID).then((response) => {
            console.log(response, "res1");
            if (response.data.status === 200) {
                var arr = response.data.data;
                console.log(response.data.data.length,'length');
                setNoDataMsg(response.data.message);
                setQuestionData(arr);
            } else {
                console.log("error");
            }
        })
        .catch(function (err) {
            console.log(err, "erron api1");
        });
    },[]);

    const redirectToAddQuestion = (id) =>{
        navigate("/add-question/?id="+id)
    }

    const handleDelete = () => {
        Services.deleteQuestionById(selectedId)
            .then((response) => {
                // return false;
                if (response.status === 200) {

                    setQuestionData(
                        questionData.filter((post) => {
                            return post._id !== selectedId;
                        })
                    );

                    swal("Success", response.data.message, "success");
                    document.querySelector(".modal-content").remove();
                    document.querySelector(".modal-backdrop").remove();
                    document.querySelector("#myModal4").classList.remove("in");

                } else {
                    swal("Failed", response.data.message, "error");
                }
            })
            .catch(function (err) {
                swal("Failed", err.response.data.message, "error");
            });
    };

    const handleDiscard = () =>{
        // document.querySelector(".modal-content").remove();
        document.querySelector(".modal-backdrop").remove();
        document.querySelector("#myModal4").classList.remove("in");
    }

    const onDragStart = (event) => {
        const initialPosition = Number(event.currentTarget.dataset.position);
        setDragAndDrop({
          ...dragAndDrop,
          draggedFrom: initialPosition,
          isDragging: true,
          originalOrder: questionData,
        });
    
        // Note: this is only for Firefox.
        // Without it, the DnD won't work.
        // But we are not using it.
        event.dataTransfer.setData("text/html", "");
      };
    
      // onDragOver fires when an element being dragged
      // enters a droppable area.
      // In this case, any of the items on the list
      const onDragOver = (event) => {
        // in order for the onDrop
        // event to fire, we have
        // to cancel out this one
        event.preventDefault();
    
        let newList = dragAndDrop.originalOrder;
    
        // index of the item being dragged
        const draggedFrom = dragAndDrop.draggedFrom;
    
        // index of the droppable area being hovered
        const draggedTo = Number(event.currentTarget.dataset.position);
    
        const itemDragged = newList[draggedFrom];
        const remainingItems = newList.filter(
          (item, index) => index !== draggedFrom
        );
    
        newList = [
          ...remainingItems.slice(0, draggedTo),
          itemDragged,
          ...remainingItems.slice(draggedTo),
        ];
    
        if (draggedTo !== dragAndDrop.draggedTo) {
          setDragAndDrop({
            ...dragAndDrop,
            updatedOrder: newList,
            draggedTo: draggedTo,
          });
        }
      };
    
      const onDrop_list = (event) => {
        setQuestionData(dragAndDrop.updatedOrder);
        console.log(dragAndDrop.updatedOrder,'dragAndDrop.updatedOrder');
        console.log('hii');
        var questions = [];
        console.log(questions,'question11');
        dragAndDrop.updatedOrder.map((question)=>{
            console.log(questions,'question');
            questions.push({ _id: question._id })
        })
        
         var arr2 = { quizId: QuizID, questions: questions };
        console.log(arr2,'questions');

        Services.reorderQuiz(arr2).then((response) => {
            if (response.data.status) {
                // setTableData(response.data.data)
                console.log(response.data.data, "res1");
                // return false;
                Services.getQuestionByQuizId(QuizID).then((response) => {
                    console.log(response, "res1");
                    if (response.data.status === 200) {
                        var arr = response.data.data;
                        setQuestionData(arr);
                    } else {
                        console.log("error");
                    }
                })
                .catch(function (err) {
                    console.log(err, "erron api1");
                });

                console.log("ReorderQuiz listing..")
            }
        }).catch((e) => {
            console.log(e)
        })

        setDragAndDrop({
          ...dragAndDrop,
          draggedFrom: null,
          draggedTo: null,
          isDragging: false,
        });
      };
    
      const onDragLeave = () => {
        // setshowupdateorder(true);
        setDragAndDrop({
          ...dragAndDrop,
          draggedTo: null,
        });
      };
   

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
                            <a onClick={()=>{ navigate("/quiz")}}><img src={backarrow} /> Back</a>
                        </div>
                        <div className='cstm-navigation'>
                            <nav aria-label="breadcrumb">
                                <ol class="breadcrumb">
                                    <li class="breadcrumb-item"><a href="#">dashboard</a></li>
                                    <li class="breadcrumb-item"><a href="#">question listing</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">introduction to the course</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>{questionName}</h3> 
                            </div>
                            <div className='cstm-search-createbtn'>

                                <div className=''>
                                    <button type='button' class="cstm-btn1" data-toggle="modal" data-target="#myModal" onClick={()=>redirectToAddQuestion(QuizID)}>
                                        Create Question 
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='main-ViewTopicLayout'>
                            <div className='cstm-accodiation'>
                                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">

                                    { questionData.length !== undefined ? questionData.map((data,index)=>(
                                        <div 
                                            data-id={index}
                                            key={index}
                                            data-position={index}
                                            draggable
                                            onDragStart={onDragStart}
                                            onDragOver={onDragOver}
                                            onDrop={onDrop_list}
                                            onDragLeave={onDragLeave}
                                            className="card dragdrop2"
                                            // className={dragAndDrop && dragAndDrop.draggedTo=== Number(index) ? "card dropArea" : "card"}
                                            // className={`card ${dragAndDrop && 
                                            //   dragAndDrop.draggedFrom === index
                                            //     ? "dragging"
                                            //     : ""
                                            // } `}
                                        >
                                            <div class="panel panel-default main-accordaion">
                                                <div class="panel-heading cstm-panel-heading" role="tab" id={data._id}>
                                                    <h4 class="panel-title cstm-panel-titleicon">
                                                        <a role="button" data-toggle="collapse" data-parent="#accordion" href={data._id} aria-expanded="true" aria-controls="collapseone">
                                                            <img src={accordiondots} />
                                                            <span>{index+1}).</span>{data.question}
                                                        </a>
                                                    </h4>
                                                    <div className='accordion-icon'>
                                                        {/* <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal"><a href="#" class="cstm-eye"><i class="fa fa-eye" aria-hidden="true"></i></a></button> */}
                                                        <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal" onClick={()=>navigate('/edit-question/?id='+data._id)}><a href="#" class="cstm-edit"><i class="fa fa-pencil" aria-hidden="true"></i></a></button>
                                                        <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"  onClick={() => setselectedId(data._id)}><a href="#" class="cstm-delete mrn-rt"><i class="fa fa-trash" aria-hidden="true"></i></a></button>
                                                    </div>
                                                </div>
                                                <div id={data._id} className={`panel-collapse collapse in`} role="tabpanel" aria-labelledby={data._id}>
                                                    {data.answerType === 'text' ? (
                                                        <div class="panel-body">
                                                            <div className='cstm-panel-body'>
                                                                <div className='answer-col1'>
                                                                    {data.options.option1 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>A</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                            <label>{ data.options.option1}</label>
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    {data.options.option2 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>B</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                            <label>{data.options.option2 && data.options.option2}</label>
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    <div className='main-answer'></div>
                                                                </div>
                                                                <div className='answer-col1'>
                                                                    {data.options.option3 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>C</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                            <label>{data.options.option3 && data.options.option3}</label>
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    {data.options.option4 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>D</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                            <label>{data.options.option4 && data.options.option4}</label>
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    <div className='main-answer'></div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    ):(
                                                        <div class="panel-body">
                                                            <div className='cstm-panel-body'>
                                                                <div className='answer-col1'>
                                                                    {data.options.option1 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>A</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                            <img src={`https://the-black-lotus.s3.us-west-1.amazonaws.com/`+data.options.option1}></img>
                                                                            {/* <label>{ data.options.option1}</label> */}
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    {data.options.option2 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>B</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                        <img src={`https://the-black-lotus.s3.us-west-1.amazonaws.com/`+data.options.option2}></img>
                                                                            {/* <label>{data.options.option2 && data.options.option2}</label> */}
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    <div className='main-answer'></div>
                                                                </div>
                                                                <div className='answer-col1'>
                                                                    {data.options.option3 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>C</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                        <img src={`https://the-black-lotus.s3.us-west-1.amazonaws.com/`+data.options.option3}></img>
                                                                            {/* <label>{data.options.option3 && data.options.option3}</label> */}
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    {data.options.option4 && (
                                                                    <div className='main-answer cstm-checkboxIntro'>
                                                                        <div className='addcourse-option2'>
                                                                            <h3>D</h3>
                                                                        </div>
                                                                        <div className='answerOption'>
                                                                        <img src={`https://the-black-lotus.s3.us-west-1.amazonaws.com/`+data.options.option4}></img>
                                                                            {/* <label>{data.options.option4 && data.options.option4}</label> */}
                                                                        </div>
                                                                    </div>
                                                                    )}
                                                                    <div className='main-answer'></div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div> 
                                        </div>      
                                    )) : (<div>{noDataMsg}</div>)}
                                </div>
                            </div>
                        </div>
                    </div>
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
                                <h4>Are you sure to delete<br /> this quiz Question?</h4>
                            </div>
                            <div className='delete-btn'>
                                <button className='cstm-deletebtn' onClick={handleDelete}>Delete</button>
                                <button className='cstm-discardbtn' onClick={handleDiscard}>Discard</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div> 
        </>

    )
}
export default ViewQuiz;
