import React, { useState, useEffect } from "react";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import Header from "../NavMenu/Header";
import Sidebar from "../NavMenu/Sidebar";
import NavLinkHeader from "../NavMenu/NavLinkHeader";
import swal from "sweetalert";
import $ from "jquery";
import loader from "../../Images/loder.gif";

// services
import Services from "../../Services/auth.service";


//componets 
import QuizSelect from "../Common/quizSelect";
import ModuleSelect from "../Common/moduleSelect";
import AudioSuggestion from "../Common/audioSuggestion";


//images
import VideoIcon from "../../Images/video-icon.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";

//multiselect
import Multiselect from "multiselect-react-dropdown";

//editer
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { convertToHTML } from 'draft-convert';


//image video popup

import Flickity from "react-flickity-component";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

var bucketLink = 'https://the-black-lotus.s3.us-west-1.amazonaws.com/'

const EditYearTopic = () => {
	//only number allow in code
	setTimeout(() => {
		$(".code").keypress(function (e) {
			var charCode = (e.which) ? e.which : e.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) {
				return false;
			}
			return true;
		});
	}, 500);

	const getid = useLocation().search;
	const paramId = new URLSearchParams(getid).get("id");
	const [topicId, setTopicId] = useState(paramId)
	const [topicData, setTopicData] = useState({})

	const [videoPreview, setVideoPreview] = useState([])
	const [videoUpload, setVideoUpload] = useState([])
	const [deletevideo, setDeletevideo] = useState([])

	const [imagePreview, setImagePreview] = useState([])
	const [imageUpload, setImageUpload] = useState([])
	const [deleteImage, setDeleteImage] = useState([])

	const [audioPreview, setAudioPreview] = useState([])
	const [audioUpload, setAudioUpload] = useState([])
	const [deleteAudio, setDeleteAudio] = useState([])

	//induction sign image
	const [signImageFile, setSignImageFile] = useState();
	const [signImage, setSignImage] = useState("");
	const [hideInductionImage, setHideInductionImage] = useState(false)

	//techniques sign image
	const [signImageTechniqueFile, setSignImageTechniqueFile] = useState();
	const [signImageTechnique, setSignImageTechnique] = useState("");
	const [hideTechniqueImage, setHideTechniqueImage] = useState(false)


	//language Patterns sign image
	const [signImageLanguagePatternsFile, setSignImageLanguagePatternsFile] =
		useState();
	const [signImageLanguagePatterns, setSignImageLanguagePatterns] =
		useState("");
	const [hideLanguagePatternsImage, setHideLanguagePatternsImage] = useState(false)

	const [editorData, setEditorData] = useState(EditorState.createEmpty());


	const [inductionStatus, setInductionStatus] = useState(false);
	const [techniquesStatus, setTechniquesStatus] = useState(false);
	const [languagePatternsStatus, setLanguagePatternsStatus] = useState(false);

	//multi select pattern type
	const [itemsPatternType, setItemsPatternType] = useState([]);
	const patternType = [
		{ name: "pattern1", id: 1 },
		{ name: "pattern2", id: 2 },
	];

	//induction multiselect
	const [itemsInduction, setItemsInduction] = useState([]);
	const [inductionType, setInductionType] = useState([]);
	const [selectedIndOption, setSelectedIndOption] = useState([]);


	//techniques multiselect
	const [itemsTechnique, setItemsTechnique] = useState([]);
	const [techniqueType, setTechniqueType] = useState([])
	const [selectedTechOption, setSelectedTechOption] = useState([]);




	const [isLoading, setIsLoading] = useState(false)

	const [isOpenVideo, setIsOpenVideo] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [imgIndex, setImgIndex] = useState(0);

	var ImgPopupArr = [];
	var VideoPopupArr = [];

	const [errorInput, setErrorInput] = useState({
		moduleId: '',
		name: '',
		description: '',
		quizId: '',
		audioSuggestionId: '',
		induction_type_name: "",
		induction_type_code: "",
		induction_sign_image: "",
		induction_key_reminder: "",

		techniques_type_name: "",
		techniques_type_code: "",
		techniques_sign_image: "",
		techniques_key_reminder: "",

		language_patterns_type_name: "",
		language_patterns_type_code: "",
		language_patterns_sign_image: "",
		language_patterns_example: "",
		language_patterns_defination: "",
		language_patterns_patternType: "",
		language_patterns_inductionType: "",
		language_patterns_techniquesType: "",
		language_patterns_key_reminder: "",

		video: '',
		image: '',
		audio: '',

		topic_type: '',

	})



	useEffect(() => {
		function gettopicData() {
			Services.getTopicById(topicId)
				.then((response) => {
					if (response.data.status === 200) {
						console.log(response.data, "response")
						const info = response.data.data
						if (info.topic_type === "induction") {
							setInductionStatus(true);
						} else {
							setInductionStatus(false);
						}
						if (info.topic_type === "techniques") {
							setTechniquesStatus(true);
						} else {
							setTechniquesStatus(false);
						}
						if (info.topic_type === "language_patterns") {
							setLanguagePatternsStatus(true);
							getInductionList();
							getTechniquesList();
						} else {
							setLanguagePatternsStatus(false);
						}
						setTopicData(info)
						var inductionName = [];
						info.inductionId?.map((id) => {
							Services.getTopicById(id).then((response) => {
								var topicName = response.data.data.name
								var topicId = response.data.data._id
								inductionName.push({ "_id": topicId, "name": topicName },)
							})
						})
						setSelectedIndOption(inductionName)

						var techniquesName = [];
						info.techniqueId?.map((id) => {
							Services.getTopicById(id).then((response) => {
								var topicName = response.data.data.name
								var topicId = response.data.data._id
								techniquesName.push({ "_id": topicId, "name": topicName },)
							})
						})
						setSelectedTechOption(techniquesName)

						const contentBlock = htmlToDraft(info.key_reminder);
						const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
						const editorState = EditorState.createWithContent(contentState);
						setEditorData(editorState);

						// setSelectedIndOption()
						// var editorState = EditorState.createEmpty();
						// // if (info.key_reminder !== null) {
						// 	const contentBlock = htmlToDraft(info.key_reminder);
						// 	const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
						// 	editorState = EditorState.createWithContent(contentState);
						// // }
						// setEditorData(editorState);
					}
				})
				.catch((error) => {
					console.log(error)
				})
		}
		gettopicData()
	}, [topicId])


	const onChangeModule = (id) => {
		if (id === '') {
			errorInput.moduleId = "Field is require"
			setErrorInput({ ...errorInput })
		} else {
			errorInput.moduleId = ""
			setErrorInput({ ...errorInput })
			topicData.moduleId = id
			setTopicData({ ...topicData })
		}
	}
	const onChangeQuiz = (id) => {
		if (id === '') {
			errorInput.quizId = "Field is require"
			setErrorInput({ ...errorInput })
		} else {
			errorInput.quizId = ""
			setErrorInput({ ...errorInput })
			topicData.quizId = id
			setTopicData({ ...topicData })
		}
	}
	//audio suggestion
	const onChangeAudioSuggestion = (id) => {
		if (id === '') {
			errorInput.audioSuggestionId = "Field is require"
			setErrorInput({ ...errorInput })
		} else {
			errorInput.audioSuggestionId = ""
			setErrorInput({ ...errorInput })
			topicData.audioSuggestionId = id
			setTopicData({ ...topicData })
		}
	}

	//get Induction list
	function getInductionList() {
		var allInductionList = [];
		Services.getInductionList().then((response) => {
			const inductionData = response.data.data;
			inductionData?.map((item) => {
				allInductionList.push({ "_id": item._id, "name": item.name })

			})
			// console.log(inductionData._id,"id")
			// setInductionType(inductionData)
		}).catch(function (err) {
			console.log(err, "erron api");
		});
		// console.log(allInductionList,"allInductionList")
		setInductionType(allInductionList);

	}
	console.log(inductionType, "ind type")
	//get techniques list
	function getTechniquesList() {
		Services.getTechniquesList().then((response) => {
			const techniquesData = response.data.data;
			setTechniqueType(techniquesData);
		}).catch(function (err) {
			console.log(err, "erron api");
		});
	}

	//induction sign image change
	const handleOnSignInduction = (e) => {
		e.preventDefault();
		setHideInductionImage(true);
		errorInput.induction_sign_image =
			e.target.value.length > 0 ? "" : "Please enter sign language";
		setSignImageFile(URL.createObjectURL(e.target.files[0]));
		let signImage = e.target.files[0];
		setSignImage(signImage);
		setErrorInput({ ...errorInput });
	};
	//techniques sign image change
	const handleOnSignTechniques = (e) => {
		e.preventDefault();
		setHideTechniqueImage(true);
		errorInput.techniques_sign_image =
			e.target.value.length > 0 ? "" : "Please enter sign language";
		setSignImageTechniqueFile(URL.createObjectURL(e.target.files[0]));
		let signImage = e.target.files[0];
		setSignImageTechnique(signImage);
		setErrorInput({ ...errorInput });
	};
	//language_patterns sign image change
	const handleOnSignLanguagePatterns = (e) => {
		e.preventDefault();
		setHideLanguagePatternsImage(true);
		errorInput.language_patterns_sign_image =
			e.target.value.length > 0 ? "" : "Please enter sign language";
		setSignImageLanguagePatternsFile(URL.createObjectURL(e.target.files[0]));
		let signImage = e.target.files[0];
		setSignImageLanguagePatterns(signImage);
		setErrorInput({ ...errorInput });
	};


	//editer for induction
	const handelChangeInduction = (editorState) => {
		setTopicData({
			...topicData,
			// ["key_reminder"]: draftToHtml(
			// 	convertToRaw(editorState.getCurrentContent())
			// ),
			key_reminder: draftToHtml(convertToRaw(editorState.getCurrentContent()))
		});
	};
	//editer for techniques
	// const handelChangeTechnique = (editorState) => {
	// 	setTopicData({
	// 		...topicData,
	// 		["key_reminder"]: draftToHtml(
	// 			convertToRaw(editorState.getCurrentContent())
	// 		),
	// 	});
	// };
	// //editer for language 
	// const handelChangeLanguagePattern = (editorState) => {
	// 	setTopicData({
	// 		...topicData,
	// 		["key_reminder"]: draftToHtml(
	// 			convertToRaw(editorState.getCurrentContent())
	// 		),
	// 	});
	// };

	//language pattern -pattern type
	const handlePatternTypeSelect = (selectedList) => {
		setItemsPatternType(selectedList);
		if (selectedList === "") {
			errorInput.language_patterns_patternType = "Please select language pattern type";
		} else {
			errorInput.language_patterns_patternType = "";
		}
		setErrorInput({ ...errorInput });
	};
	const handlePatternTypeRemove = (selectedList) => {
		setItemsPatternType(selectedList);
	};

	//language pattern -induction type
	const handleInductionTypeSelect = (selectedList) => {
		setItemsInduction(selectedList);
		if (selectedList === "") {
			errorInput.language_patterns_inductionType = "Please select inductions";
		} else {
			errorInput.language_patterns_inductionType = "";
		}
		setErrorInput({ ...errorInput });
	};
	const handleInductionTypeRemove = (selectedList) => {
		setItemsInduction(selectedList);
	};

	//language pattern -techniques type
	const handleTechniquesTypeSelect = (selectedList) => {
		setItemsTechnique(selectedList);
		if (selectedList === "") {
			errorInput.language_patterns_techniquesType = "Please select techniques";
		} else {
			errorInput.language_patterns_techniquesType = "";
		}
		setErrorInput({ ...errorInput });
	};
	const handleTechniquesTypeRemove = (selectedList) => {
		setItemsTechnique(selectedList);
	};

	const onChangeInput = (e) => {
		const { value, name } = e.target
		switch (name) {
			case 'name':
				if (value === '') {
					errorInput.name = "Field is require"
				} else {
					errorInput.name = ""
				}
				break;
			case 'description':
				if (value === '') {
					errorInput.description = "Field is require"
				} else {
					errorInput.description = ""
				}
				break;
			case "type_name":
				if (topicData.topic_type === "induction") {
					errorInput.induction_type_name =
						value.length > 0 ? "" : "Please enter induction name";
				}
				if (topicData.topic_type === "techniques") {
					errorInput.techniques_type_name =
						value.length > 0 ? "" : "Please enter techniques name";
				}
				if (topicData.topic_type === "language_patterns") {
					errorInput.language_patterns_type_name =
						value.length > 0 ? "" : "Please enter language_patterns name";

				}
				break;
			case "type_code":
				if (topicData.topic_type === "induction") {

					errorInput.induction_type_code =
						value.length > 0 ? "" : "Please enter induction code";
				}
				if (topicData.topic_type === "techniques") {
					errorInput.techniques_type_code =
						value.length > 0 ? "" : "Please enter techniques code";

				}
				if (topicData.topic_type === "language_patterns") {
					errorInput.language_patterns_type_code =
						value.length > 0 ? "" : "Please enter language patterns code";
				}
				break;
			case "pattern_defination":
				errorInput.language_patterns_defination =
					value.length > 0 ? "" : "Please enter language pattern definition";
				break;
			case "pattern_example":
				errorInput.language_patterns_example =
					value.length > 0 ? "" : "Please enter language pattern examples";
				break;
			default:
				break;
		}
		setErrorInput({ ...errorInput })
		setTopicData({ ...topicData, [name]: value })
	}

	const onChangevideo = (e) => {
		const targetFiles = e.target.files;
		let videoObj = [];
		let selectedFIles = [];
		for (var f = 0; f < targetFiles.length; f++) {
			// videoObj.push(targetFiles[f])
			const url = URL.createObjectURL(targetFiles[f])
			const filesplit = targetFiles[f].name.split(".").pop();
			var videoExtension = [
				"mp4",
				"MOV",
				"mov",
				"wmv",
				"avi",
				"avchd",
				"flv",
				"f4v",
				"swf",
				"mkv",
				"webm",
				"html5",
				"mpeg-2",
			];

			videoExtension.includes(filesplit) && selectedFIles.push(url) && videoObj.push(targetFiles[f]) ? errorInput.video = "" : errorInput.video = "Upload video only"
			setErrorInput({ ...errorInput })

		}
		setVideoUpload([...videoUpload, ...videoObj])
		setVideoPreview([...videoPreview, ...selectedFIles])

	}

	const handleVideoDlt = (e, index, type) => {
		e.preventDefault()
		if (type === 1) {
			setDeletevideo([...deletevideo, topicData.video[index]])
			topicData.video.splice(index, 1)
			setTopicData({ ...topicData })
		} else if (type === 2) {
			videoUpload.splice(index, 1)
			setVideoUpload([...videoUpload])
			videoPreview.splice(index, 1)
			setVideoPreview([...videoPreview])
		}
	}

	const onChangeImage = (e) => {
		const targetFiles = e.target.files;
		let imgObj = [];
		let selectedFIles = [];
		for (var f = 0; f < targetFiles.length; f++) {
			// imgObj.push(targetFiles[f])
			const url = URL.createObjectURL(targetFiles[f])
			// selectedFIles.push(url)
			const filesplit = targetFiles[f].name.split(".").pop()
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
			imageExtension.includes(filesplit) && selectedFIles.push(url) && imgObj.push(targetFiles[f]) ? errorInput.image = "" : errorInput.image = "Upload image only"
			setErrorInput({ ...errorInput })
		}
		setImageUpload([...imageUpload, ...imgObj])
		setImagePreview([...imagePreview, ...selectedFIles])
	}

	const handleImageDlt = (e, index, type) => {
		e.preventDefault()
		if (type === 1) {
			setDeleteImage([...deleteImage, topicData.images[index]])
			topicData.images.splice(index, 1)
			setTopicData({ ...topicData })
		} else if (type === 2) {
			imageUpload.splice(index, 1)
			setImageUpload([...imageUpload])
			imagePreview.splice(index, 1)
			setImagePreview([...imagePreview])
		}
	}


	const onChangeAudio = (e) => {
		const targetFiles = e.target.files;
		let audioObj = [];
		let selectedFIles = [];
		for (var f = 0; f < targetFiles.length; f++) {
			// audioObj.push(targetFiles[f])
			const url = URL.createObjectURL(targetFiles[f])
			const filesplit = targetFiles[f].name.split(".").pop()
			var audioExtension = [
				"mp3",
				"AAC",
				"Ogg Vorbis",
				"FLAC",
				"ALAC",
				"WAV",
				"AIFF",
				"DSD",
				"PCM",
			];
			// audioObj.push(targetFiles[f])
			audioExtension.includes(filesplit) && selectedFIles.push(url) && audioObj.push(targetFiles[f]) ? errorInput.audio = "" : errorInput.audio = "Upload audio only"
			setErrorInput({ ...errorInput })
		}
		setAudioUpload([...audioUpload, ...audioObj])
		setAudioPreview([...audioPreview, ...selectedFIles])
	}

	const handleAudioDlt = (e, index, type) => {
		e.preventDefault()
		if (type === 1) {
			setDeleteAudio([...deleteAudio, topicData.audio[index]])
			topicData.audio.splice(index, 1)
			setTopicData({ ...topicData })
		} else if (type === 2) {
			audioUpload.splice(index, 1)
			setAudioUpload([...audioUpload])
			audioPreview.splice(index, 1)
			setAudioPreview([...audioPreview])
		}
	}


	const handleUpdateSubmit = async (e) => {
		e.preventDefault()
		let existError = false
		if (topicData.name === "" || errorInput.name != '') {
			existError = true
			errorInput.name = "Please enter topic name";
		}
		if (topicData.description === "" || errorInput.description != '') {
			existError = true
			errorInput.description = "Please enter description";
		}
		if (topicData.moduleId === "" || errorInput.moduleId != '') {
			existError = true
			errorInput.moduleId = "Please select module";
		}
		if (topicData.quizId === "" || errorInput.quizId != '') {
			existError = true
			errorInput.quizId = "Please select quiz";
		}
		if (topicData.audioSuggestionId === "" || errorInput.audioSuggestionId != '') {
			existError = true
			errorInput.audioSuggestionId = "Please select audio suggestion";
		}
		console.log("error", existError)
		setErrorInput({ ...errorInput })
		console.log(errorInput, "errorInput")
		if (!existError) {
			if (errorInput.image === "" && errorInput.video === "" && errorInput.audio === "") {
				setIsLoading(true)
				// $(".loader-main").show();

				const fileData = new FormData();
				let mediaArray = Array.prototype.concat(videoUpload, imageUpload, audioUpload)

				if (mediaArray.length > 0) {
					mediaArray.map((item3) => {
						fileData.append("image", item3)
					})
				}
				const response = await Services.uploadTopicMedia(fileData)

				if (response.data.status === 200) {
					let new_image = response.data.data[0].images.map((item) => { return item.location })
					let new_video = response.data.data[0].video.map((item) => { return item.location })
					let new_audio = response.data.data[0].audio.map((item) => { return item.location })
					topicData.video = Array.prototype.concat(topicData.video, new_video)
					topicData.images = Array.prototype.concat(topicData.images, new_image)
					topicData.audio = Array.prototype.concat(topicData.audio, new_audio)
				}
				topicData.id = topicData._id
				delete topicData._id

				const updatedTopic = await Services.editTopic(topicData)

				if (updatedTopic.data.status === 200) {
					let delMediaArray = Array.prototype.concat(deletevideo, deleteImage, deleteAudio)

					if (delMediaArray.length > 0) {
						const result = await Services.mediaDeleteTopic(delMediaArray)
					}
					// setSuccessMsg(updatedTopic.data.message)
					swal("Success", updatedTopic.data.message, "success");
					// $(".loader-main").hide();


					setIsLoading(false)

					// setTimeout(() => {
					// 	setSuccessMsg('')
					// }, 500);
				}

			}

		}
	}



	//image and video preview on popup
	topicData.images?.map((img) => {
		ImgPopupArr.push("https://the-black-lotus.s3.us-west-1.amazonaws.com/" + img)

	})
	var PopupImgArr = [...ImgPopupArr, ...imageUpload];
	topicData.video?.map((video) => {
		VideoPopupArr.push("https://the-black-lotus.s3.us-west-1.amazonaws.com/" + video)
	})
	var PopupVideoArr1 = [...VideoPopupArr, ...videoUpload];

	return (
		<>
			<div className="wrapper dashboard-main">
				<Header />
				<div className="top-header-divider"></div>
				<div className="fullpage-layout">
					<Sidebar />
					<div className="rightPanel">
						<div className="right-panel-content">
							<NavLinkHeader
								main_title="Dashboard"
								title1="Year Long Course"
								title1_link="year-topic"
								title2="Edit Topic"
							/>
						</div>

						<div className='maintable'>
							<div className='cstm-contentHeader cstm-viewtopicMain'>
								<div className='cstm-header'>
									<h3>Edit Topic</h3>
								</div>
							</div>

							<div className='addtopic-main'>
								<form>
									<div className='addtopic-field'>
										<div className='col-6 InputField-1'>
											<ModuleSelect moduleId={topicData.moduleId} monthtype={topicData.month_type} yeartype={topicData.year_type} onChangeModule={onChangeModule} />
											<span className="error">{errorInput.moduleId}</span>
										</div>
										<div className='col-6 InputField-1 cstm-ModalField '>
											<label>Topic Name*</label><br />
											<input type="text" name="name" value={topicData.name} onChange={onChangeInput} placeholder="Enter topic name" />
											<span className="error">{errorInput.name}</span>
										</div>
									</div>
									<div className="col-6 InputField-1">
										<label>Select Topic Type</label>
										<div class="dropdown">
											<select
												value={topicData.topic_type}
												onChange={onChangeInput}
												className="cstm-moduldroupdown2"
												name="topic_type"
												disabled
											>
												<option value="course_content">Course Content</option>
												<option value="induction">Induction</option>
												<option value="techniques">Technique</option>
												<option value="language_patterns">
													Language Pattern
												</option>
											</select>
											{errorInput.topic_type !== "" && (
												<span style={{ color: "red" }}>{errorInput.topic_type}</span>
											)}
										</div>
									</div>

									<div className='addtopic-field'>
										<div className='col-6 InputField-1 cstm-ModalField '>
											<label>Description*</label><br />
											<textarea type="text" name="description" placeholder="Write description" onChange={onChangeInput} value={topicData.description}></textarea>
											<span className="error">{errorInput.description}</span>
										</div>
									</div>
									{/* induction  */}
									{inductionStatus && (
										<>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Induction Name*</label>
													<br />
													<input
														type="text"
														value={topicData.type_name}
														name="type_name"
														placeholder="Enter induction name"
														onChange={onChangeInput}
													></input>
													{errorInput.induction_type_name !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.induction_type_name}
														</span>
													)}
												</div>
												<div className="col-6 InputField-1  ">
													<label>Induction Code*</label>
													<br />
													<div className="col-6 InputField-1 cstm-Introcourse cstm-IntroCourse">
														<div className="cstm-checkboxIntro">
															<div className="addcourse-option">
																<h3>I</h3>
															</div>
															<div className="intor-course viewcourse-input">
																<input
																	value={topicData.type_code}
																	type="text"
																	maxLength={6}
																	className="code"
																	name="type_code"
																	placeholder="1"
																	onChange={onChangeInput}
																/>
															</div>
														</div>
													</div>
													{errorInput.induction_type_code !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.induction_type_code}
														</span>
													)}
												</div>
											</div>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Upload sign language image*</label>
													<br />
													<div className="viewtopicMusic-Images">
														<div className="row-1 Main-video">
															<div className="music-icon">
																<img src={ImageIcon} />
															</div>
															<div className="music-name">
																<label className="inputchoosefile">
																	<input
																		type="file"
																		accept="image/*"
																		name="sign_image"
																		onChange={handleOnSignInduction}
																	/>
																	<span>
																		{" "}
																		<h6>
																			Drag & drop or click to add Images
																		</h6>
																		<h5>
																			Please use JPEG, PNG formate of images
																		</h5>
																	</span>
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
											{errorInput.induction_sign_image !== "" && (
												<span style={{ color: "red" }}>
													{errorInput.induction_sign_image}
												</span>
											)}
											{/* already geted image */}
											{!hideInductionImage &&
												<img
													className="sign_image"
													width="200"
													height="200"
													src={"https://the-black-lotus.s3.us-west-1.amazonaws.com/" + topicData.sign_image}
												/>
											}

											{/* when upload image then show */}
											{signImageFile && signImageFile.length > 0 && (
												<img
													className="sign_image"
													width="200"
													height="200"
													src={signImageFile}
												/>
											)}
										</>
									)}
									{/* induction end */}

									{/* techniques  */}
									{techniquesStatus && (
										<>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Technique Name*</label>
													<br />
													<input
														type="text"
														value={topicData.type_name}
														name="type_name"
														placeholder="Enter techniques name"
														onChange={onChangeInput}
													></input>
													{errorInput.techniques_type_name !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.techniques_type_name}
														</span>
													)}
												</div>
												<div className="col-6 InputField-1  ">
													<label>Technique Code*</label>
													<br />
													<div className="col-6 InputField-1 cstm-Introcourse cstm-IntroCourse">
														<div className="cstm-checkboxIntro">
															<div className="addcourse-option">
																<h3>T</h3>
															</div>
															<div className="intor-course viewcourse-input">
																<input
																	value={topicData.type_code}
																	type="text"
																	maxLength={6}
																	className="code"
																	name="type_code"
																	placeholder="1"
																	onChange={onChangeInput}
																/>
															</div>
														</div>
													</div>
													{errorInput.techniques_type_code !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.techniques_type_code}
														</span>
													)}
												</div>
											</div>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Upload sign language image*</label>
													<br />
													<div className="viewtopicMusic-Images">
														<div className="row-1 Main-video">
															<div className="music-icon">
																<img src={ImageIcon} />
															</div>
															<div className="music-name">
																<label className="inputchoosefile">
																	<input
																		type="file"
																		accept="image/*"
																		name="sign_image"
																		onChange={handleOnSignTechniques}
																	/>
																	<span>
																		{" "}
																		<h6>
																			Drag & drop or click to add Images
																		</h6>
																		<h5>
																			Please use JPEG, PNG formate of images
																		</h5>
																	</span>
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
											{errorInput.techniques_sign_image !== "" && (
												<span style={{ color: "red" }}>
													{errorInput.techniques_sign_image}
												</span>
											)}
											{/* already geted image */}
											{!setHideTechniqueImage &&
												<img
													className="sign_image"
													width="200"
													height="200"
													src={"https://the-black-lotus.s3.us-west-1.amazonaws.com/" + topicData.sign_image}
												/>
											}

											{/* when upload image then show */}
											{signImageTechniqueFile && signImageTechniqueFile.length > 0 && (
												<img
													className="sign_image"
													width="200"
													height="200"
													src={signImageTechniqueFile}
												/>
											)}
										</>
									)}
									{/* techniques end */}

									{/* language pattern  */}
									{languagePatternsStatus && (
										<>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Language Patterns Name*</label>
													<br />
													<input
														type="text"
														value={topicData.type_name}
														name="type_name"
														placeholder="Enter language patterns name"
														onChange={onChangeInput}
													></input>
													{errorInput.language_patterns_type_name !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.language_patterns_type_name}
														</span>
													)}
												</div>
												<div className="col-6 InputField-1  ">
													<label>Language Patterns Code*</label>
													<br />
													<div className="col-6 InputField-1 cstm-Introcourse cstm-IntroCourse">
														<div className="cstm-checkboxIntro">
															<div className="addcourse-option">
																<h3>L</h3>
															</div>
															<div className="intor-course viewcourse-input">
																<input
																	value={topicData.type_code}
																	type="text"
																	maxLength={6}
																	className="code"
																	name="type_code"
																	placeholder="1"
																	onChange={onChangeInput}
																/>
															</div>
														</div>
													</div>
													{errorInput.language_patterns_type_code !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.language_patterns_type_code}
														</span>
													)}
												</div>
											</div>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Language Patterns Defination</label>
													<br />
													<textarea
														onChange={onChangeInput}
														value={topicData.pattern_defination}
														type="text"
														name="pattern_defination"
														placeholder="Write defination"
													/>
													{errorInput.language_patterns_defination !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.language_patterns_defination}
														</span>
													)}
												</div>
											</div>
											<div className="addtopic-field">
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Language Patterns Example</label>
													<br />
													<textarea
														value={topicData.pattern_example}
														onChange={onChangeInput}
														type="text"
														name="pattern_example"
														placeholder="Write example"
													/>
													{errorInput.language_patterns_example !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.language_patterns_example}
														</span>
													)}
												</div>
											</div>
											{/* pattern type */}
											<div className="col-6 InputField-1">
												<label>Pattern Type</label>
												<div class="dropdown">
													<Multiselect
														options={patternType}
														// selectedValues={itemsPatternType.map((i)=>{
														// 	return i;
														// })}
														onSelect={handlePatternTypeSelect}
														onRemove={handlePatternTypeRemove}
														displayValue="name"
														showCheckbox
													/>

													{errorInput.language_patterns_patternType !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.language_patterns_patternType}
														</span>
													)}
												</div>
											</div>

											{/* induction type */}
											{/* {console.log(selectedIndOption, "selected Option Display")}
											{console.log(inductionType, "inductionType")} */}
											<div className="col-6 InputField-1">
													<label>Induction Type</label>
													<div class="dropdown">
														<Multiselect
															displayValue="name"
															options={inductionType}
															selectedValues={selectedIndOption.map((i)=>{
																return i
															})}
															onSelect={handleInductionTypeSelect}
															onRemove={handleInductionTypeRemove}
														    showCheckbox={true}
														/>

														{errorInput.language_patterns_inductionType !== "" && (
															<span style={{ color: "red" }}>
																{errorInput.language_patterns_inductionType}
															</span>
														)}
													</div>
												</div>

											{/* techniques type */ }
											<div className="col-6 InputField-1">
												<label>Technique Type</label>
												<div class="dropdown">
													<Multiselect
														options={techniqueType}
														selectedValues={selectedTechOption.map((i)=>{
																return i
															})}
														onSelect={handleTechniquesTypeSelect}
														onRemove={handleTechniquesTypeRemove}
														displayValue="name"
														showCheckbox={true}
													/>

													{errorInput.language_patterns_techniquesType !== "" && (
														<span style={{ color: "red" }}>
															{errorInput.language_patterns_techniquesType}
														</span>
													)}
												</div>
											</div>
												<div className = "addtopic-field" >
												<div className="col-6 InputField-1 cstm-ModalField ">
													<label>Upload sign language image*</label>
													<br />
													<div className="viewtopicMusic-Images">
														<div className="row-1 Main-video">
															<div className="music-icon">
																<img src={ImageIcon} />
															</div>
															<div className="music-name">
																<label className="inputchoosefile">
																	<input
																		type="file"
																		accept="image/*"
																		name="sign_image"
																		onChange={handleOnSignLanguagePatterns}
																	/>
																	<span>
																		{" "}
																		<h6>
																			Drag & drop or click to add Images
																		</h6>
																		<h5>
																			Please use JPEG, PNG formate of images
																		</h5>
																	</span>
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
											{errorInput.language_patterns_sign_image !== "" && (
										<span style={{ color: "red" }}>
											{errorInput.language_patterns_sign_image}
										</span>
									)}
									{/* already geted image */}
									{!setHideTechniqueImage &&
										<img
											className="sign_image"
											width="200"
											height="200"
											src={"https://the-black-lotus.s3.us-west-1.amazonaws.com/" + topicData.sign_image}
										/>
									}

									{/* when upload image then show */}
									{signImageLanguagePatternsFile && signImageLanguagePatternsFile.length > 0 && (
										<img
											className="sign_image"
											width="200"
											height="200"
											src={signImageLanguagePatternsFile}
										/>
									)}
								</>
									)}
								{/* language pattern end */}
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
														<input type="file" name="video" onChange={onChangevideo} multiple accept=".mp4,.mov,.mwv,.avi,.flv,.mkv,.webm"></input>
														<span> <h6>Drag & drop or click to add video.</h6>
															<h5>Please use MP4 formate of video</h5></span>
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
								{errorInput.video !== "" && (
									<span style={{ color: "red" }}>{errorInput.video}</span>
								)}

								<div className='viewtopic-Images'>
									<div className='uploadedvideoMain'>
										{topicData.video?.map((vd, v) => (
											<div key={v} className='uploadimg uploadimgeffect row-1'>
												<video
													width="200"
													height="200"
													controls
													src={`${bucketLink}${vd}`}
													id={v}
													data-toggle="modal" data-target="#myModal4"
													onClick={() => setIsOpenVideo(true)}
												/>
												<span className='viewImage-option'>
													<span> <i class="fa fa-trash" aria-hidden="true" onClick={(e) => handleVideoDlt(e, v, 1)}></i></span>
												</span>
											</div>
										))}
										{videoPreview?.map((pre, p) => (
											<div key={p} className='uploadimg uploadimgeffect row-1'>
												<video
													width="200"
													height="200"
													controls
													src={`${pre}`}
													id={p}
													data-toggle="modal" data-target="#myModal4"
													onClick={() => setIsOpenVideo(true)}
												/>
												<span className='viewImage-option'>
													<span> <i class="fa fa-trash" aria-hidden="true" onClick={(e) => handleVideoDlt(e, p, 2)}></i></span>
												</span>
											</div>
										))}
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
														<input type="file" name="images" onChange={onChangeImage} multiple accept="image/*"></input>
														<span> <h6>Drag & drop or click to add image.</h6>
															<h5>Please use image formate of image</h5></span>
													</label>
												</div>
											</div>
										</div>
									</div>
								</div>
								{errorInput.image !== "" && (
									<span style={{ color: "red" }}>{errorInput.image}</span>
								)}

								<div className='viewtopic-Images'>
									<div className='uploadedvideoMain'>
										{topicData.images?.map((img, im) => (
											<div key={im} className='uploadimg'>
												<img src={`${bucketLink}${img}`} onClick={() => setIsOpen(true)}

												/>
												<span className='viewImage-option'>
													<span> <i class="fa fa-trash" aria-hidden="true" onClick={(e) => handleImageDlt(e, im, 1)}></i></span>
												</span>
											</div>
										))}
										{imagePreview?.map((img, nm) => (
											<div key={nm} className='uploadimg'>
												<img src={`${img}`} onClick={() => setIsOpen(true)}

												/>
												<span className='viewImage-option'>
													<span> <i class="fa fa-trash" aria-hidden="true" onClick={(e) => handleImageDlt(e, nm, 2)}></i></span>
												</span>
											</div>
										))}

										{isOpen && <Lightbox
											// imageTitle={images1[imgIndex].title}
											// imageCaption={images1[imgIndex].caption}
											mainSrc={PopupImgArr[imgIndex]}
											nextSrc={PopupImgArr[(imgIndex + 1) % PopupImgArr.length]}
											prevSrc={PopupImgArr[(imgIndex + PopupImgArr.length - 1) % PopupImgArr.length]}
											onCloseRequest={() => setIsOpen(false)}
											onMovePrevRequest={() => setImgIndex((imgIndex + PopupImgArr.length - 1) % PopupImgArr.length)}
											onMoveNextRequest={() => setImgIndex((imgIndex + 1) % PopupImgArr.length)}
										/>}
									</div>
								</div>
								<div className='addtopic-field'>
									<div className='col-6 InputField-1 cstm-ModalField edit-audiosource'>
										<label>Audio Source</label><br />
										<div className='edit-audio'>
											{topicData.audio?.map((aud, a) => (
												<div key={a} className="row-1 edit-Main-music">
													<div className="music-icon">
														<img src={MusicIcon} />
													</div>
													<audio controls autoplay id={a}>
														<source src={`${bucketLink}${aud}`} type="audio/mp3" />
													</audio>
													<div className="edit-delete-icon">
														<button
															type="button"
															onClick={(e) => handleAudioDlt(e, a, 1)}
															class="cstm-icon-btn cstm-delete"
														>
															<i
																class="fa fa-trash"
																aria-hidden="true"
															></i>
														</button>
													</div>
												</div>
											))}
											{audioPreview?.map((audp, ap) => (
												<div key={ap} className="row-1 edit-Main-music">
													<div className="music-icon">
														<img src={MusicIcon} />
													</div>
													<audio controls autoplay id={ap}>
														<source src={`${audp}`} type="audio/mp3" />
													</audio>
													<div className="edit-delete-icon">
														<button
															type="button"
															onClick={(e) => handleAudioDlt(e, ap, 2)}
															class="cstm-icon-btn cstm-delete"
														>
															<i
																class="fa fa-trash"
																aria-hidden="true"
															></i>
														</button>
													</div>
												</div>
											))}
											<div className='row-2 add-videoLink'>
												<a href='#'><input type="file" name="audio" onChange={onChangeAudio} multiple accept=".mp3"></input></a>
											</div>
										</div>
									</div>
								</div>
								{errorInput.audio !== "" && (
									<span style={{ color: "red" }}>{errorInput.audio}</span>
								)}
								{/* induction editor */}
								{inductionStatus && (
									<Editor
										editorState={editorData}
										onEditorStateChange={handelChangeInduction}
										toolbar={{
											// options: ['inline', 'blockType', 'list', 'link', 'embedded', 'emoji', 'remove', 'history'],
											inline: { inDropdown: true },
											list: { inDropdown: true },
											link: { inDropdown: true },
											history: { inDropdown: true },
											fontFamily: {
												options: ["condor"],
											},
										}}
									/>
								)}
								{/* techniques editer */}
								{techniquesStatus && (
									<Editor
										// editorState={editVal.description1}
										// onEditorStateChange={handelChangeTechnique}
										toolbar={{
											// options: ['inline', 'blockType', 'list', 'link', 'embedded', 'emoji', 'remove', 'history'],
											inline: { inDropdown: true },
											list: { inDropdown: true },
											link: { inDropdown: true },
											history: { inDropdown: true },
											fontFamily: {
												options: ["condor"],
											},
										}}
									/>
								)}

								{/* language patter editer */}
								{languagePatternsStatus && (
									<Editor
										// editorState={editerData}
										// onEditorStateChange={handelChangeLanguagePattern}
										toolbar={{
											// options: ['inline', 'blockType', 'list', 'link', 'embedded', 'emoji', 'remove', 'history'],
											inline: { inDropdown: true },
											list: { inDropdown: true },
											link: { inDropdown: true },
											history: { inDropdown: true },
											fontFamily: {
												options: ["condor"],
											},
										}}
									/>
								)}
								<div className='addtopic-field'>
									<div className='col-6 InputField-1 Edit-InputField'>
										<div class="dropdown">
											<AudioSuggestion audioSuggestionId={topicData.audio_suggestion} onChangeAudioSuggestion={onChangeAudioSuggestion} />
											{errorInput.audioSuggestionId !== "" && (
												<span style={{ color: "red" }}>{errorInput.audioSuggestionId}</span>
											)}
										</div>
									</div>
								</div>
								<div className='addtopic-field'>
									<div className='col-6 InputField-1 Edit-InputField'>
										<div class="dropdown">
											<QuizSelect quizid={topicData.quizId} onChangeQuiz={onChangeQuiz} />
											<span className="error">{errorInput.quizId}</span>
										</div>
									</div>
								</div>

								<div class="col-12 modal-addbtn">
									<button class="cstm-btn1 cstm-topic-update-btn" type="submit" onClick={handleUpdateSubmit} disabled={isLoading}>Update</button>
								</div>
								{isLoading &&
									<div id="login-loader" className='loader-main'>
										<img src={loader} />
									</div>}
							</form>
							{/* <h4>{successMsg}</h4> */}
						</div>
					</div>
				</div>
			</div>


			{/* videos Gallary display modal */}
			<div class="modal cstm-modal fade" id="myModal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel4">
				<div class="modal-dialog modal-dialog-centered cstm-delete-modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header cstm-modalheader">
							<button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title cstm-modal-title" id="myModalLabel4"></h4>
						</div>
						<div class="modal-body modal-contentbody">
							<div className='delte-header'>
								{isOpenVideo &&
									<Flickity
										options={{ initialIndex: 1, draggable: false }}
										className={'carousel'}
										elementType={'div'}
									>
										{PopupVideoArr1.map((url) => (
											<>
												<div class="gallery-cell" >
													<video width="100%" height="100%" class="test" controls src={url} />
												</div>
											</>
										))}
									</Flickity>}
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* ---end modal-- */}
		</div>
		</>
	)
}

export default EditYearTopic
