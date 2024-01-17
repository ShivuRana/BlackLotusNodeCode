import React,{useState} from 'react';
import backarrow from "../../Images/short_left.png";
import viewimg1 from "../../Images/img1.png";
import viewimg2 from "../../Images/img2.png";
import viewimg3 from "../../Images/img3.png";
import viewimg4 from "../../Images/img4.png";
import ImageIcon from "../../Images/image-icon.png";

import App from '../../App';
import Sidebar from '../NavMenu/Sidebar';
import Header from '../NavMenu/Header';
import Services from '../../Services/auth.service';
import { useLocation, useNavigate, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { useEffect } from 'react';
const EditQuestion = () => {
    const [err,setErr] = useState('');
    const [errquestion,seterrQuestion] = useState();
    const [question,setQuestion] = useState('');
    const [ansType,setAnsType] = useState('');
    const [forms,setForms] = useState([]);
    const [QuizID,setQuizID] = useState([]);

    const getid = useLocation().search; 
    const QuestionID = new URLSearchParams(getid).get("id");
    const navigate = useNavigate();
   

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("token");
        !loggedInUser && navigate("/");

        Services.getQuestionById(QuestionID).then((response) => {
            if (response.data.status === 200) {
                var arr1 = response.data.data;
                console.log(arr1,'response');
                setQuestion(arr1.question);
                setAnsType(arr1.answerType);
                setQuizID(arr1.quizId);

                var arr = [];

                var count = 0;
                console.log(Object.keys(arr1).length,' arr.options');
                var j =1;
                for(var i = 0; i < Object.keys(arr1).length+1/2; i++) {
                    console.log(arr1.options['option'+j],'arr1.option');
                    if(arr1.options['option'+j]){
                        console.log(count,'count');
                        arr[count] = {
                            option: arr1.options['option'+j],
                            answer: arr1.options['answer'+j],
                            error:'' ,
                            previewimgurl: "https://the-black-lotus.s3.us-west-1.amazonaws.com/"+arr1.options['option'+j], 
                            errS: false,
                            img_location:arr1.options['option'+j]
                        };
                        count++;
                        j++
                    }  
                }
                setForms(arr); 
                // setQuestionData(arr);
            } else {
                console.log("error");
            }
        })
        .catch(function (err) {
            console.log(err, "erron api");
        });


    },[]);
    
    const onclickaddmore = (type) =>{
        var arr = [];
        // setSeltextAnsCount(seltextAnsCount+1);
        
        for (var i = 0; i < forms.length+1; i++) {
            if(i<forms.length){
                console.log(forms[i],'forms[i]');
                arr[i] = { ...forms[i] } 
            }else{
                console.log( arr[i] ,' arr[i] ');
                arr[i] = {
                    option: "",
                    answer: false,
                    error:'', 
                    previewimgurl : "",
                    errS: true
                };
            }
        }

        if(forms.length+1 < 2){
            setErr('Please add atleast 2 options');
        }else{
            setErr('');
        }

        setForms(arr);
    }

    const DeleteTextoption = (index) =>{
        var forms1 = forms.filter((item,i)=>{
           return index !== i
        })
        setForms(forms1);
        // setSeltextAnsCount(seltextAnsCount-1)
    }

    const handleChangeTextCheckbox = (e,i) =>{
        console.log(e.target.checked,'checkedd',forms,i);
        forms[i].answer = e.target.checked;
        if(e.target.checked === true){
            setErr('');
        }
        setForms([...forms])
    }

    const handleChangeTextOptions = (name, value, i, type) => {
        var arr = [];
        for (var n = 0; n < forms.length; n++) {
            if(n === i){
                if(type === 'image'){
                    if (value === ''){
                        arr[i] = { ...forms[i], [name]: value,['previewimgurl']:URL.createObjectURL(value),['error']:'field is required.',['errS']:true };
                    }else{
                        arr[i] = { ...forms[i], [name]: value,['previewimgurl']:URL.createObjectURL(value),['error']:'',['errS']:false};
                    }

                    var filesplit = value.name.split(".").pop();
                    var imageExtension = [
                      "png",
                      "jpg",
                      "jpeg",
                      "apng",
                      ".avif",
                      "jfif",
                      "pjpeg",
                      "pjp",
                      "svg",
                      "webp",
                    ];
                    
                    var err1 = imageExtension.includes(filesplit) 
                      ? (err1 = "")
                      : (err1 = "Upload image only");
                    if(err1){
                        if (value === ''){
                            arr[i] = { ...forms[i], [name]: value,['previewimgurl']:URL.createObjectURL(value),['error']:'field is required.',['errS']:true };
                        }else{    
                            arr[i] = { ...forms[i], [name]: value,['previewimgurl']:'',['error']:err1,['errS']:true};
                        }
                    }
                    else{
                        if (value === ''){
                            arr[i] = { ...forms[i], [name]: value,['previewimgurl']:URL.createObjectURL(value),['error']:'field is required.',['errS']:true };
                        }else{  
                            arr[i] = { ...forms[i], [name]: value,['previewimgurl']:URL.createObjectURL(value),['error']:'',['errS']:false};
                        }
                    }


                }else{
                    if (value === ''){
                        arr[i] = { ...forms[i], [name]: value,['error']:'field is required.',['errS']:true};
                    }else{
                        arr[i] = { ...forms[i], [name]: value,['error']:'',['errS']:false};
                    }
                }
            }else{
                arr[n] = { ...forms[n] };
            }
        }

        if(forms.length < 2){
            setErr('Please add atleast 2 options');
        }else{
            setErr('');
        }

        setForms(arr);
    };
    // console.log(forms, "forms");

    const submitData = () =>{
        console.log(question,'question');
        console.log(ansType,'ansType');
        console.log(forms,'forms');
        // return false;
        var arr =[]
        var existError = false
        // for (var i = 0; i < forms.length; i++) {
        //     if(ansType === 'image'){
        //         if (forms[i].option === ''){
        //             arr[i] = { ...forms[i],['error']:'Please enter option value' };
        //         }else{
        //             arr[i] = { ...forms[i],['error']:''};
        //         }
        //     }else{
        //         if (forms[i].option === ''){
        //             arr[i] = { ...forms[i],['error']:'Please enter option value'};
        //         }else{
        //             arr[i] = { ...forms[i],['error']:''};
        //         }
        //     }
        // }
        // setForms(arr);

        if(question === ''){
            existError = true
            seterrQuestion('field is required.');
        }

        var ansArr = [];
        forms.map((item,i)=>{
            if(item.errS){
                forms[i].error = 'field is required.'
                existError = true
            }
            ansArr.push(item.answer);
            setForms([...forms])
        })

        if(!ansArr.includes(true)){
            existError = true
            setErr('Please Select right answer');
        }

        if(forms.length < 2){
            existError = true;
            setErr('Please add atleast 2 options');
        }


        // if(existError){
        //     console.log("form has error")
        // } else {
        //     console.log("submitted...")
        // }
        // var flag1 = false;
        // if((forms[0] &&  forms[0].option!='') && (forms[1] && forms[1].option!='')){
        //     flag1 = true;
        // }else{

        // }

// return false;
        if(!existError){
            if(ansType === 'image'){
                console.log(forms,'forms11www');
                const fileData = new FormData();
                console.log(forms,'forms');
                var questionIddata = [];

                forms.map((data, index) => {
                    if(typeof data.option === 'object'){
                        fileData.append("image", data.option)
                        questionIddata.push(index);
                    }
                })
                // return false;
                Services.uploadQuestionOption(fileData).then((response)=>{
                    console.log(response,'response');
                    if (response.data.status === 200) {
                        let new_image = response.data.data.map((item) => { return item.location })
                        // console.log(new_image,'new_image');
                        if (new_image.length > 0) {
                            forms.map((data, index) => {
                                if(typeof forms[index].option === 'object'){
                                    if(questionIddata.includes(index)){
                                        questionIddata.map((qid,i1)=>{
                                            if(qid === index){
                                                forms[index].img_location = new_image[i1];
                                            }
                                        })
                                    }
                                }
                            })
                            setForms([...forms])
                        }
                        // return false;
                        setTimeout(()=>{
                            console.log(forms,'forms12');

                        },4000)
                        var options = {}
                            if(forms.length !== 0){
                                forms.map((data,i)=>{
                                    var j=i+1;
                                    // if(forms[i].img_location === undefined){
                                    //     options['option'+j] = new_image[i];
                                    // }else{
                                    //     options['option'+j] = data.img_location;
                                    // }
                                    options['option'+j] = data.img_location;
                                    options['answer'+j] = data.answer;
                                })
                            }
                            var bodyData = {
                                "quizId": QuizID,
                                "question": question,
                                "answerType": ansType,
                                "questionId":QuestionID,
                                options
                            }

                            console.log(bodyData,'bodyData');
                            // return false
                            Services.updateQuizQuestion(bodyData).then((response)=>{
                                if (response.data.status === 200) {
                                    // var arr = response.data.data;
                                    swal("Success", response.data.message, "success");
                                    navigate("/quiz/view/?id=" + QuizID);
                                    // setQuestionData(arr);
                                } else{
                                    swal("Failed", response.data.message, "error");
                                }
                                
                            })
                            .catch((err) => {
                                swal("Failed", err.response.data.message, "error");
                            });

                    }
                }).catch((err)=>{
                    swal("Failed", err.response.data.message, "error");
                })
                console.log('imgg');
            }else{
                var options = {}
                if(forms.length !== 0){
                    forms.map((data,i)=>{
                        var j=i+1;
                        options['option'+j] = data.option;
                        options['answer'+j] = data.answer;
                    })
                }

                var bodyData = {
                    "quizId": QuizID,
                    "question": question,
                    "answerType": ansType,
                    "questionId":QuestionID,
                    options
                }

                Services.updateQuizQuestion(bodyData).then((response)=>{
                    if (response.data.status === 200) {
                        // var arr = response.data.data;
                        swal("Success", response.data.message, "success");
                        navigate("/quiz/view/?id=" + QuizID);
                        // setQuestionData(arr);
                    } else{
                        swal("Failed", response.data.message, "error");
                    }
                    
                })
                .catch((err) => {
                    swal("Failed", err.response.data.message, "error");
                });
            }
        }

        console.log(bodyData,'bodyData');
        // return false;
        

    }

    const onChangeQuestion = (e) =>{
        setQuestion(e.target.value); 
        if(e.target.value === ''){
            seterrQuestion('Please enter Question name');
        }else{
            seterrQuestion('');
        }
    }

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
                                        <input type="text" placeholder="Write question" onChange={onChangeQuestion} value={question} ></input>
                                        {errquestion && (<span style={{ color: "red" }}>{errquestion}</span>)}
                                    </div>
                                </div>
                                <div className='addtopic-field'>
                                    <div className='col-6 InputField-1'>
                                        <label>Answer Type</label>
                                        <div class="dropdown">
                                            <select onChange={(e)=>{
                                                setAnsType(e.target.value);
                                            }} value={ansType}>
                                                <option value="text">Text</option>
                                                <option value="image">Images</option>
                                            </select>
                                            {/* <button id="dLabel" className='cstm-moduldroupdown2' type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Images
                                                <span class="cstn-module-caret2"><i class="fa fa-chevron-down"></i></span>
                                            </button>
                                            <ul class="dropdown-menu" aria-labelledby="dLabel">
                                                {/* <li><a href='#'>test1</a></li>
                                                <li><a href='#'>test1</a></li>
                                                <li><a href='#'>test1</a></li>
                                            </ul>  */}
                                        </div>
                                    </div>

                                </div>
                                {/* <div className='addtopic-field'>
                                    <div className='col-6 InputField-1 cstm-ModalField '>
                                        <label>Answer Type</label><br />
                                        <input type="text" placeholder="The reason you tidy up your meditation area is:"></input>
                                    </div>
                                </div> */}

                    { ansType  === "text" && (
                                <>
                                 {forms.map((forms1,i) => (
                                <>
                                <span key={i}></span> 
                                <div className='addtopic-field '>
                                    <div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
                                    <div className='cstm-checkboxIntro'>
                                           <div className='addcourse-option'>
                                                <h3>{ i === 0 && 'A' || i === 1 && 'B' || i === 2 && 'C' || i === 3 && 'D'}</h3>
                                           </div>
                                           <div className='intor-course'>
                                                {/* <label>Introduction To The Course</label> */}
                                                <input type="text" name='option' placeholder='options' onChange={(e) => {
                                                    handleChangeTextOptions(e.target.name, e.target.value, i,'text');
                                                    }}  value={forms1.option}></input>
                                           </div>
                                       </div>
                                       <div className='cstm-checkbox'>
                                           <input type="checkbox" onChange={(e)=>handleChangeTextCheckbox(e,i)} checked={forms1.answer}></input>
                                            <a onClick={()=>DeleteTextoption(i)}> X </a>
                                       </div>
                                    </div>
                                    
                                </div>
                                {forms1.errS && (<span style={{ color: "red" }}>{forms1.error}</span>)}
                                </>
                                 ))}
                                 {forms.length !== 4 && (
                                    <div className='addtopic-field' onClick={()=>onclickaddmore('text')}>
                                        <div className='col-6 InputField-1 add-option'>
                                        <div class="row-2 add-videoLink"><a href="#">+Add more option</a></div>
                                        </div>
                                    </div>
                                )}
                                </>
                                )} 
                                {ansType  === "image"  && (
                                <>
                                    {forms.map((forms1,i) => (
                                    <>
                                        <div className='addtopic-field'>
                                            <div className='col-6 InputField-1 edit-audiosource'>
                                            {/* <label>Audio Source</label><br /> */}
                                            <div className='edit-audio'>
                                                <div className='row-1 addquestion-images cstm-addimage'>
                                                    <div className='edit-audio'>
                                                        <div className='music-icon'>
                                                            <img src={ImageIcon} />
                                                        </div>
                                                    <div className='music-name'>
                                                        <label className='inputchoosefile'>
                                                        <input type="file" accept="image/png, image/jpg, image/jpeg" name='option' /* onChange={handleOnImage} */ onChange={(e) => {
                                                    handleChangeTextOptions(e.target.name, e.target.files[0], i,'image');
                                                    }} />
                                                        <h6>Drag & drop or click to add Images</h6>
                                                        <h5>Please use JPEG, PNG formate of images</h5>
                                                        </label>
                                                    </div>
                                                    </div>

                                                    <div className='cstm-checkbox'>
                                                        <input type="checkbox" onChange={(e)=>handleChangeTextCheckbox(e,i)} checked={forms1.answer}></input>
                                                        <a onClick={()=>DeleteTextoption(i)}> X </a>
                                                    </div>
                                                </div>
                                                {forms1.previewimgurl && forms1.previewimgurl.length > 0 && <img className="sign_image" width="200" height="200" src={forms1.previewimgurl} />}
                                                </div>
                                                </div>
                                        </div>
                                        {forms1.errS && (<span style={{ color: "red" }}>{forms1.error}</span>)}
                                    </>
                                    ))}
                                    {forms.length !== 4 && (
                                        <div className='addtopic-field' onClick={()=>onclickaddmore('text')}>
                                            <div className='col-6 InputField-1 add-option'>
                                            <div class="row-2 add-videoLink"><a href="#">+Add more option</a></div>
                                            </div>
                                        </div>
                                    )}
                                </>
                                )}

                                {/* <div className='MainImage-Question'>
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

                                <div className='addtopic-field '>
                                    <div className='notes'>
                                        <h5>Note: please check mark for right answer.</h5>
                                    </div>
                                </div> */}
                                 {err && (<span style={{ color: "red" }}>{err}</span>)}
                                <div class="col-12 modal-addbtn"><button type="button" class="cstm-btn1 cstm-updatebtn" onClick={submitData}>Update</button></div>
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
export default EditQuestion;
