import React, { useState, useEffect } from 'react'
import Header from '../NavMenu/Header'
import Sidebar from '../NavMenu/Sidebar'
import { useTable, usePagination, useGlobalFilter } from "react-table";
import authService from '../../Services/auth.service';
import Select from 'react-select'
import Services from '../../Services/auth.service';
import { Checkmark } from 'react-checkmark'
import ImageIcon from "../../Images/image-icon.png";

const AddFlashcard = () => {

	const [showImageDataForPreview, setImageDataForPreview] = useState();
	const [showarray, setarray] = useState([]);
	const [finalImages, setFinalImages] = useState([]);
	const [showImagesCount, setImagesCount] = useState(0);
	const [imagesPrev, setImagesPrev] = useState([]);


	const [showpopup, setpopup] = useState(false);

	const [showSucessMessage, setSucessMessage] = useState();
	const [isSubmit, setIsSubmit] = useState(false);
	const [isSubscribed, setIsSubscribed] = useState(false);

	const [showModuleId, setModuleId] = useState()
	const [showTopicId, setTopicId] = useState()
	const [ShowMonthTypeData, setMonthTypeData] = useState()
	const [showTopicTypeData, setTopicTypeData] = useState()

	const [FlashCardInput, setFlashCardInput] = useState({
		courseName: "",
		moduleName: "",
		topicName: "",
		question: "",
		answerType: "",
		options: {
			option0: "",
			answer0: false,

			option1: "",
			answer1: false,

			option2: "",
			answer2: false,

			option3: "",
			answer3: false,
			previewimgurl: ""
		},
		moduleId: "",
		topicId: ""
	});


	const [showerror, setError] = useState({
		courseName: "",
		moduleName: "",
		topicName: "",
		question: "",
		answerType: "",

		option0: "",
		option1: "",
		option2: "",
		option3: "",

		answer0: "",
		answer1: "",
		answer2: "",
		answer3: "",


		moduleId: "",
		topicId: ""
	});

	const [counter, setCounter] = useState(1);
	const [showWidgit, setWidgit] = useState();


	const handleCourseSelect = (e) => {
		const { name, value } = e.target
		setFlashCardInput({ ...FlashCardInput, [name]: value })
		switch (name) {
			case 'courseName':
				showerror.courseName = value.length > 0 ? "" : "Enter course name";
				break;
		}
		setError(showerror)
		if (e.target.value === "month_type") {
			var data = { "month_type": true }
			authService.GetModuleListing(data).then((response) => {
				if (response.data.status) {
					const numAscending = response.data.data.sort((a, b) => a.order - b.order);
					console.log(numAscending)
					setMonthTypeData(numAscending)
				}
			}).catch((e) => {
				console.log(e)
			})

		}
		else if (e.target.value === "year_type") {
			var data = { "year_type": true }
			authService.GetModuleListing(data).then((response) => {
				if (response.data.status) {
					const numAscending = response.data.data.sort((a, b) => a.order - b.order);
					console.log(numAscending)
					setMonthTypeData(numAscending)
				}
			}).catch((e) => {
				console.log(e)
			})

		}
	}

	let OptionsModulesName = ShowMonthTypeData !== undefined && ShowMonthTypeData.map((moduleNameList) => {
		return {
			value: moduleNameList.name,
			label: moduleNameList.name,
			setvalue: moduleNameList._id
		}
	})

	let OptionsTopicType = showTopicTypeData !== undefined && showTopicTypeData !== null && showTopicTypeData.map((topicNameList) => {
		return {
			value: topicNameList.name,
			label: topicNameList.name,
			setvalue: topicNameList._id
		}
	})

	const selecthandleOnChange = (selectlistValue, name,id,setvalue, i, l) => {
		// console.log(selectlistValue, "----selectlistValue");
 		// console.log(name,"name----");
		var arr=[]

		// setFlashCardInput({...FlashCardInput, ["moduleId"]:setvalue})
		// setFlashCardInput({...FlashCardInput, ["topicId"]:setvalue})
  		setModuleId(setvalue)
		setTopicId(setvalue)
		
		if(name === 'moduleName'){
			setFlashCardInput({ ...FlashCardInput, [name]: selectlistValue ,[id]: setvalue }) 
		}

		if(name === 'topicName'){
			setFlashCardInput({ ...FlashCardInput, [name]: selectlistValue ,[id]: setvalue }) 
		}



		Services.GetAllTopicsById(setvalue).then((response) => {
			if (response.data.status) {
				const numAscending = response.data.data.sort((a, b) => a.order - b.order);
				setTopicTypeData(numAscending)
			}
		}).catch((e) => {
			console.log(e)
		})

		switch (name) {
			case 'courseName':
				showerror.courseName = selectlistValue.length > 0 ? "" : "Enter course nams";
				break;

			case 'moduleName':
				showerror.moduleName = selectlistValue.length > 0 ? "" : "Enter module Name";
				break;
			case 'topicName':
				showerror.topicName = selectlistValue.length > 0 ? "" : "Enter topic Type";
				break;

		}
		setError(showerror)
		// console.log(setvalue)
		console.log(FlashCardInput,"mayud")

	}

	useEffect(() => {
		setWidgit(showWidgit)
		setModuleId(showModuleId)
		setTopicId(showTopicId)
	}, []);

	const handleAddFalshcardInput = (e) => {
		const { name, value } = e.target
		setFlashCardInput({ ...FlashCardInput, [name]: value })
		setWidgit(e.target.value)

		switch (name) {


			case 'moduleName':
				showerror.moduleName = value.length > 0 ? "" : "Select module Name";
				break;
			case 'topicName':
				showerror.topicName = value.length > 0 ? "" : "Select topic Type";
				break;
			case 'question':
				showerror.question = value.length > 0 ? "" : "Enter question";
				break;
			case 'answerType':
				showerror.answerType = value.length > 0 ? "" : "Select Answer Type";
				break;
		}
		setError(showerror)


	}

	const handleanother = (e, i) => {
		console.log(i, "12")
		FlashCardInput.options['option' + i] = e.target.value
		setFlashCardInput({ ...FlashCardInput });
	}

	const handleDeleteOption = (e, index) => {

		if (counter > 1) {
			setCounter(counter - 1)
		}
		console.log(FlashCardInput, "filter")
	}

	var array = [];
	const handleClick = () => {

		setarray(FlashCardInput)

		if (counter < 4) {
			setCounter(counter + 1)
		}

	}


	const validate = (values) => {
		if (!FlashCardInput.courseName) {
			showerror.courseName = "Select course name";
		}
		if (!FlashCardInput.moduleName) {
			showerror.moduleName = "Select module name";
		}
		if (!FlashCardInput.topicName) {
			showerror.topicName = "Select topic name";
		}
		if (!FlashCardInput.question) {
			showerror.question = "Enter question";
		}
		if (!FlashCardInput.answerType) {
			showerror.answerType = "Select Answer Type";
		}
		return showerror;
	};

	useEffect(() => {
		console.log(showerror);
		if (Object.keys(showerror).length === 0 && isSubmit) {
			console.log(FlashCardInput);
		}
	}, []);

	const handleImage = (name, file, i) => {
		console.log(name)
		console.log(file)
		console.log(i)
		console.log(URL.createObjectURL(file))
		var urlcustim = URL.createObjectURL(file)
		setImageDataForPreview(urlcustim)

		// setFlashCardInput({ ...FlashCardInput, [name]: urlcustim })
		// FlashCardInput.options['option' + i] = file

		FlashCardInput.options['option' + i] = urlcustim
		setFlashCardInput({ ...FlashCardInput });


 
	};


	const submitAddFlashcard = (e) => {
		// console.log(FlashCardInput, "***********")
		e.preventDefault();
		setError(validate(FlashCardInput));
		setIsSubmit(true);

		if (FlashCardInput.moduleName !== "" && FlashCardInput.topicName !== "" && FlashCardInput.question) {

			var data = {
				question: FlashCardInput.question,
				answerType: FlashCardInput.answerType,
				options: {
					option0: FlashCardInput.options.option0 !== "" && FlashCardInput.options.option0 !== undefined && FlashCardInput.options.option0 !== null ? FlashCardInput.options.option0 : null,
					answer0: Boolean(FlashCardInput.options.answer0 !== undefined && FlashCardInput.options.answer0 !== null ? FlashCardInput.options.answer0 : false),


					option1: FlashCardInput.options.option1 !== "" && FlashCardInput.options.option1 !== undefined && FlashCardInput.options.option1 !== null ? FlashCardInput.options.option1 : null,
					answer1: Boolean(FlashCardInput.options.answer1 !== undefined && FlashCardInput.options.answer1 !== null ? FlashCardInput.options.answer1 : false),


					option2: FlashCardInput.options.option2 !== "" && FlashCardInput.options.option2 !== undefined && FlashCardInput.options.option2 !== null ? FlashCardInput.options.option2 : null,
					answer2: Boolean(FlashCardInput.options.answer2 !== undefined && FlashCardInput.options.answer2 !== null ? FlashCardInput.options.answer2 : false),


					option3: FlashCardInput.options.option3 !== "" && FlashCardInput.options.option3 !== undefined && FlashCardInput.options.option3 !== null ? FlashCardInput.options.option3 : null,
					answer3: Boolean(FlashCardInput.options.answer3 !== undefined && FlashCardInput.options.answer3 !== null ? FlashCardInput.options.answer3 : false),


				},
				question_type: "question",
				topic_type: "induction",
				moduleId: FlashCardInput.moduleId,
				topicId: FlashCardInput.topicId,
				topicName: FlashCardInput.topicName,
				moduleName: FlashCardInput.moduleName,
				questionId: "null"
 			}


			console.log(data, "submit")

			console.log(FlashCardInput, "FlashCardInput")
			authService.addFlashcard("", data).then((response) => {
				if (response.data.status) {
					console.log(response.data.data, "Flashcard created..")
					setSucessMessage(response.data.message)
					setpopup(true)
				}

			}).catch((e) => {
				console.log(e)
			})
		}
	}



	const handleChangeforchekbox = (e, i) => {
		FlashCardInput.options['answer' + i] = e.target.checked
		setFlashCardInput({ ...FlashCardInput });
		// const abcd = {};
		// abcd[event.target.className] = event.target.checked;
		// setFlashCardInput({ ...FlashCardInput, ...abcd });
		// // console.log(FlashCardInput, "FlashCardInput for cherk box");
		// console.log(event.target.checked)

		// // var arr = [{ abcd[event.target.className]: event.target.checked }];

		// if (event.target.checked) {
		// 	console.log('✅ Checkbox is checked');
		// } else {
		// 	console.log('⛔️ Checkbox is NOT checked');
		// }
		// setIsSubscribed(current => !current);
	};



	return (<>
		<div className='wrapper dashboard-main'>
			<Header />
			<div className='top-header-divider'></div>
			<div className='fullpage-layout'>
				<Sidebar />
				<div className='rightPanel'>
					<div className='right-panel-content'>
						<div className='cstm-back-breadcrums'>
							<div className='backarrow'>
								{/* <a href='#'><img src={backarrow} /> Back</a> */}
							</div>
							<div className='cstm-navigation'>
								<nav aria-label="breadcrumb">
									<ol class="breadcrumb">
										<li class="breadcrumb-item"><a href="#">dashboard</a></li>
										<li class="breadcrumb-item"><a href="#">year long course</a></li>
										<li class="breadcrumb-item active" aria-current="page">add flashcard</li>
									</ol>
								</nav>
							</div>
						</div>
						<div className='maintable'>
							<div className='cstm-contentHeader cstm-viewtopicMain'>
								<div className='cstm-header'>
									<h3>Add Flashcard</h3>
								</div>
							</div>
							<div className='addtopic-main'>
								<form>
									<div className='addtopic-field'>
										<div className='col-6 InputField-1 cstm-ModalField '>
											<label>Course Name</label><br />
											<div class="dropdown">
												<select className='cstm-moduldroupdown2' name='courseName' id='courseName' onChange={handleCourseSelect}>
													<option value="" selected>Select course</option>
													<option value="month_type">Month Long</option>
													<option value="year_type">Year Long</option>
												</select>
											</div>
											<span className='errorRed'>{showerror.courseName}</span>
										</div>
										<div className='col-6 InputField-1 cstm-ModalField '>
											<label>Module Name</label><br />
											<Select
												// className='cstm-moduldroupdown2'                                                
												name="moduleName"
												id="moduleId"
												options={OptionsModulesName}
												onChange={(e) => { selecthandleOnChange(e.value, 'moduleName','moduleId', e.setvalue); }}
												searchable
											/>

											<span className='errorRed'>{showerror.moduleName}</span>
										</div>
									</div>

									<div className='addtopic-field'>
										<div className='col-6 InputField-1'>
											<label>Topic Name</label>
											<div class="dropdown">
												<Select
													// className='cstm-moduldroupdown2'                                                
													name="topicName"
													id="topicId"
													options={OptionsTopicType}
													onChange={(e) => { selecthandleOnChange(e.value, 'topicName','topicId', e.setvalue); }}
													searchable
												/>
												<span className='errorRed'>{showerror.topicName}</span>
											</div>

										</div>
									</div>
									<div className='addtopic-field'>
										<div className='col-6 InputField-1 cstm-ModalField '>
											<label>Question</label><br />
											<input type="text" placeholder="Write question" name='question' id='question' onChange={handleAddFalshcardInput} value={FlashCardInput.question} />
											<span className='errorRed'>{showerror.question}</span>
										</div>
									</div>
									<div className='addtopic-field'>
										<div className='col-6 InputField-1'>
											<label>Answer Type</label>
											<select className='cstm-moduldroupdown2' name='answerType' id='answerType' onChange={handleAddFalshcardInput}>
												<option value="" selected>Select Answer Type</option>
												<option value="text">Text</option>
												<option value="image">Images</option>
											</select>
											<span className='errorRed'>{showerror.answerType}</span>
										</div>
									</div>

									{showWidgit === "text" && <>
										{/* {showWidgit} */}
										{Array.from(Array(counter)).map((c, index) => {
											return (
												<div className='addtopic-field '>
													<div className='col-6 InputField-1 cstm-Introcourse cstm-IntroCourse'>
														<div className='cstm-checkboxIntro'>
															<div className='addcourse-option'>
																<h3>{index === 0 && "A" || index === 1 && "B" || index === 2 && "C" || index === 3 && "D"}</h3>
															</div>
															<div className='intor-course'>
																<input type="text"
																	placeholder={`option ${index + 1}`}
																	name={`option${index}`}
																	value={FlashCardInput.options['option' + index]}
																	onChange={(e) => handleanother(e, index)}
																/>
															</div>
															{console.log(index, "index")}
															<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true" value={FlashCardInput.options['option' + index]} onClick={(e) => handleDeleteOption(index)} >&times;</button>

														</div>
														<div className='cstm-checkbox'>
															<input
																type="checkbox"
																name={`answer${index}`}
																defaultChecked={FlashCardInput.options['answer' + index]}
																onChange={(e) => handleChangeforchekbox(e, index)} />
														</div>
													</div>
												</div>
											);
										})}
										<span className='errorRed'>{showerror.option1}</span>

										<div className='addtopic-field'>
											<div className='col-6 InputField-1 add-option'>
												<div class="row-2 add-videoLink">
													<button type='button' onClick={handleClick}> +Add more option</button>
												</div>
											</div>
										</div>
									</>
									}
									{showWidgit === "image" &&
										<>
											{Array.from(Array(counter)).map((c, index) => {
												return (
													<>
														<div className='addtopic-field'>
															<div className='col-6 InputField-1 edit-audiosource'>
																<div className='edit-audio'>
																	<div className='row-1 addquestion-images cstm-addimage'>
																		<div className='edit-audio'>
																			<div className='music-icon'>
																				<img src={ImageIcon} />
																			</div>
																			<div className='music-name'>
																				<label className='inputchoosefile'>
																					<input
																						type="file"
																						accept="image/*"
																						name={`option${index}`}
																						onChange={(e) => {
																							handleImage(e.target.name, e.target.files[0], index);
																						}}
																					/>


																					<h6>Drag & drop or click to add Images</h6>
																					<h5>Please use JPEG, PNG formate of images</h5>
																				</label>
																			</div>
																		</div>
																		<button type="button" class="close" data-dismiss="modal" aria-label="Close" aria-hidden="true" value={FlashCardInput.options['option' + index]} onClick={(e) => handleDeleteOption(index)} >&times;</button>
																		<div className='cstm-checkbox'>
																			<input type="checkbox" name={`answer${index}`}
																				defaultChecked={FlashCardInput.options['answer' + index]}
																				onChange={(e) => handleChangeforchekbox(e, index)} />
																			{/* <a onClick={() => DeleteTextoption(i)}> X </a> */}
																		</div>
																	</div>
																	{index === 0 && <img className="sign_image" width="200" height="200" src={FlashCardInput.options.option0 !== undefined ? FlashCardInput.options.option0 : "-"} />}
																	{index === 1 && <img className="sign_image" width="200" height="200" src={FlashCardInput.options.option0 !== undefined ? FlashCardInput.options.option1 : "-"} />}
																	{index === 2 && <img className="sign_image" width="200" height="200" src={FlashCardInput.options.option0 !== undefined ? FlashCardInput.options.option2 : "-"} />}
																	{index === 3 && <img className="sign_image" width="200" height="200" src={FlashCardInput.options.option0 !== undefined ? FlashCardInput.options.option3 : "-"} />}


																</div>
															</div>
														</div>
													</>
												);
											})}
											<div className='row-2 add-morefield'>
												<button type='button' onClick={handleClick}> +Add more option</button>
											</div>
										</>
									}


									<div class="col-12 modal-addbtn">
										<button type='button' class="cstm-btn1 cstm-updatebtn" data-toggle="modal" data-target="#FlashcardCreate" onClick={submitAddFlashcard}>Add</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		{showpopup === true &&
			<>
				{showpopup}
				<div class="modal cstm-modal fade" id="FlashcardCreate" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel1">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header cstm-modalheader">
								<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
								<Checkmark size='75px' color='#223344' />
								<h4 class="modal-title-center cstm-modal-title">{showSucessMessage}</h4>
							</div>
						</div>
					</div>
				</div>
			</>
		}
	</>)
}

export default AddFlashcard