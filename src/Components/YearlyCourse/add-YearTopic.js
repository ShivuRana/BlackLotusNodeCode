import React, { useState, useEffect } from "react";
import Header from "../NavMenu/Header";
import Sidebar from "../NavMenu/Sidebar";
import NavLinkHeader from "../NavMenu/NavLinkHeader";
import Services from "../../Services/auth.service";
import { useNavigate } from "react-router-dom";
import VideoIcon from "../../Images/video-icon.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";
import swal from "sweetalert";
import loader from "../../Images/loder.gif";
import $ from "jquery";

//multiselect
import Multiselect from "multiselect-react-dropdown";

//editer
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";


const AddYearTopic = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const [showCount, setCount] = useState(0);
  const [quizData, setQuizeData] = useState();
  const [moduleData, setModuleData] = useState();
  const [audioSuggestion,setAudioSuggestion]=useState();

  //induction sign image
  const [signImageFile, setSignImageFile] = useState();
  const [signImage, setSignImage] = useState("");

  //techniques sign image
  const [signImageTechniqueFile, setSignImageTechniqueFile] = useState();
  const [signImageTechnique, setSignImageTechnique] = useState("");

  //language Patterns sign image
  const [signImageLanguagePatternsFile, setSignImageLanguagePatternsFile] =
    useState();
  const [signImageLanguagePatterns, setSignImageLanguagePatterns] =
    useState("");
  //images

  const [imagesPrev, setImagesPrev] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  var imgArray = [];
  var imgExtArray = [];

  const [videosPrev, setVideosPrev] = useState([]);
  const [finalVideos, setFinalVideos] = useState([]);
  var videoArray = [];
  var videoExtArray = [];

  const [audiosPrev, setAudiosPrev] = useState([]);
  const [finalAudios, setFinalAudios] = useState([]);
  var audioArray = [];
  var audioExtArray = [];

  var moduleArr = [];
  var AllUploadedFiles = [];

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
  const [inductionType, setInductionType] = useState([])
  
  //techniques multiselect
  const [itemsTechnique, setItemsTechnique] = useState([]);
  const [techniqueType, setTechniqueType] = useState([])

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    module: "",
    quiz: "",
    topic_type: "",
    audio_suggestion:"",
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
    language_patterns_key_reminder: "",

  });
  const [err, seterr] = useState({
    name: "",
    description: "",
    module: "",
    topic_type: "",
    audio_suggestion:"",
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


    quiz: "",
    image: "",
    video: "",
    audio: "",
    sugg: "",
  });

  const history = useNavigate();
  function createDataModule(_id, name) {
    return {
      _id,
      name,
    };
  }
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    !loggedInUser && history("/");

    var queryVar = {
      year_type: true,
    };
    Services.GetModuleListing(queryVar)
      .then((response) => {
        if (response.data.status === 200) {
          var arr = response.data.data;
          if (response.data.data.length > 0) {
            var newarr = [];
            for (var i = 0; i < arr.length; i++) {
              newarr[i] = createDataModule(arr[i]._id, arr[i].name);
            }
            newarr.map((data1) => {
              moduleArr = [...moduleArr, data1];
            });
            setModuleData(moduleArr);
          }
          QuizListing();
          AudioSuggestionListing();
        } else {
          console.log("error");
        }
      })
      .catch(function (err) {
        console.log(err, "erron api");
      });

    setCount(100);
  }, []);

  const QuizListing = () => {
    Services.getQuize()
      .then((response) => {
        if (response.data.status === 200) {
          var arr = response.data.data;
          if (response.data.data.length > 0) {
            setQuizeData(arr);
          }
        }
      })
      .catch(function (err) {
        console.log(err, "erron api");
      });
  };
  //audio suggestion list get
  const AudioSuggestionListing = () => {
    Services.getAudioSuggestion()
    .then((response) => {
      if (response.data.status === 200) {
        var arr = response.data.data;
        if (response.data.data.length > 0) {
          setAudioSuggestion(arr);
        }
      }
    })
    .catch(function (err) {
      console.log(err, "erron api");
    });
  }
  
  //get Induction list
  function getInductionList() {
    Services.getInductionList().then((response) => {
      const inductionData = response.data.data;
      setInductionType(inductionData);

    }).catch(function (err) {
      console.log(err, "erron api");
    });
  }
  function getTechniquesList() {
    Services.getTechniquesList().then((response) => {
      const techniquesData = response.data.data;
      setTechniqueType(techniquesData);
    }).catch(function (err) {
      console.log(err, "erron api");
    });
  }

  function deleteImages(e, name) {
    if (name === "image") {
      const imgp = imagesPrev.filter((item, index) => index !== e);
      const fi = finalImages.filter((item, index) => index !== e);
      setFinalImages([...fi]);
      setImagesPrev([...imgp]);
    }

    if (name === "video") {
      const vidP = videosPrev.filter((item, index) => index !== e);
      const fv = finalVideos.filter((item, index) => index !== e);
      setFinalVideos([...fv]);
      setVideosPrev([...vidP]);
    }

    if (name === "audio") {
      const audp = audiosPrev.filter((item, index) => index !== e);
      const fa = finalAudios.filter((item, index) => index !== e);
      setFinalAudios([...fa]);
      setAudiosPrev([...audp]);
    }
  }
  const handleImageChange = (e) => {
    e.preventDefault();
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
      imgArray = [...imgArray, f];
    });
    setFinalImages([...finalImages, ...imgArray]);
    const arr = [];
    imgArray.forEach(function (f, index) {
      var u = URL.createObjectURL(f);
      arr.push(u);
      var filesplit = f.name.split(".").pop();
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

      imageExtension.includes(filesplit) && imgExtArray.push(u)
        ? (err.image = "")
        : (err.image = "Upload image only");
      seterr({ ...err });

      setImagesPrev([...imagesPrev, ...imgExtArray]);
    });
  };

  const handleVideoChange = (e) => {
    e.preventDefault();
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
      videoArray = [...videoArray, f];
    });
    setFinalVideos([...finalVideos, ...videoArray]);
    const arr = [];
    videoArray.forEach(function (f, index) {
      var u = URL.createObjectURL(f);
      arr.push(u);
      var filesplit = f.name.split(".").pop();
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
      videoExtension.includes(filesplit) && videoExtArray.push(u)
        ? (err.video = "")
        : (err.video = "Upload video only");
      seterr({ ...err });
      setVideosPrev([...videosPrev, ...videoExtArray]);
    });
  };

  const handleAudioChange = (e) => {
    e.preventDefault();
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
      audioArray = [...audioArray, f];
    });
    setFinalAudios([...finalAudios, ...audioArray]);
    const arr = [];
    audioArray.forEach(function (f, index) {
      var u = URL.createObjectURL(f);
      arr.push(u);
      var filesplit = f.name.split(".").pop();
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
      audioExtension.includes(filesplit) && audioExtArray.push(u)
        ? (err.audio = "")
        : (err.audio = "Upload audio only");
      seterr({ ...err });
      setAudiosPrev([...audiosPrev, ...audioExtArray]);
    });
  };

  //induction sign image change
  const handleOnSignInduction = (e) => {
    e.preventDefault();
    err.induction_sign_image =
      e.target.value.length > 0 ? "" : "Please enter sign language";
    setSignImageFile(URL.createObjectURL(e.target.files[0]));
    let signImage = e.target.files[0];
    setSignImage(signImage);
    seterr({ ...err });
  };
  //techniques sign image change
  const handleOnSignTechniques = (e) => {
    e.preventDefault();
    err.techniques_sign_image =
      e.target.value.length > 0 ? "" : "Please enter sign language";
    setSignImageTechniqueFile(URL.createObjectURL(e.target.files[0]));
    let signImage = e.target.files[0];
    setSignImageTechnique(signImage);
    seterr({ ...err });
  };
  //language_patterns sign image change
  const handleOnSignLanguagePatterns = (e) => {
    e.preventDefault();
    err.language_patterns_sign_image =
      e.target.value.length > 0 ? "" : "Please enter sign language";
    setSignImageLanguagePatternsFile(URL.createObjectURL(e.target.files[0]));
    let signImage = e.target.files[0];
    setSignImageLanguagePatterns(signImage);
    seterr({ ...err });
  };

  //EDITER FOR INDUCTION
  const handelChangeInduction = (editorState) => {
    setFormFields({
      ...formFields,
      ["induction_key_reminder"]: draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      ),
    });
  };
//EDITER FOR TECHNIQUES
  const handelChangeTechnique = (editorState) => {
    setFormFields({
      ...formFields,
      ["techniques_key_reminder"]: draftToHtml(
        convertToRaw(editorState.getCurrentContent())
      ),
    });
  };
//EDITER FOR LANGUAGE PATTERN 
const handelChangeLanguagePattern = (editorState) => {
  setFormFields({
    ...formFields,
    ["language_pattern_key_reminder"]: draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ),
  });
};

  //language pattern -pattern type
  const handlePatternTypeSelect = (selectedList) => {
    setItemsPatternType(selectedList);
    if (selectedList === "") {
      err.language_patterns_patternType = "Please select language pattern type";
    } else {
      err.language_patterns_patternType = "";
    }
    seterr({ ...err });
  };
  const handlePatternTypeRemove = (selectedList) => {
    setItemsPatternType(selectedList);
  };

  //language pattern -induction type
  const handleInductionTypeSelect = (selectedList) => {
    setItemsInduction(selectedList);
    if (selectedList === "") {
      err.language_patterns_inductionType = "Please select inductions";
    } else {
      err.language_patterns_inductionType = "";
    }
    seterr({ ...err });
  };
  const handleInductionTypeRemove = (selectedList) => {
    setItemsInduction(selectedList);
  };

  //language pattern -techniques type
  const handleTechniquesTypeSelect = (selectedList) => {
    setItemsTechnique(selectedList);
    if (selectedList === "") {
      err.language_patterns_techniquesType = "Please select techniques";
    } else {
      err.language_patterns_techniquesType = "";
    }
    seterr({ ...err });
  };
  const handleTechniquesTypeRemove = (selectedList) => {
    setItemsTechnique(selectedList);
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "name":
        err.name = value.length > 0 ? "" : "Please enter topic name";
        break;
      case "description":
        err.description = value.length > 0 ? "" : "Please enter description";
        break;
      case "module":
        err.module = value.length > 0 ? "" : "Please select module";
        break;
      case "topic_type":
        err.topic_type = value.length > 0 ? "" : "Please select topic type";
        if (value === "induction") {
          setInductionStatus(true);
        } else {
          setInductionStatus(false);
        }
        if (value === "techniques") {
          setTechniquesStatus(true);
        } else {
          setTechniquesStatus(false);
        }
        if (value === "language_patterns") {
          setLanguagePatternsStatus(true);
          getInductionList();
          getTechniquesList();
        } else {
          setLanguagePatternsStatus(false);
        }
        break;
      case "quiz":
        err.quiz = value.length > 0 ? "" : "Please select quiz";
        break;
      case "audio_suggestion":
          err.audio_suggestion =
            value.length > 0 ? "" : "Please select audio suggestion";
          break;  
      case "induction_type_name":
        err.induction_type_name =
          value.length > 0 ? "" : "Please enter induction name";
        break;
      case "induction_type_code":
        err.induction_type_code =
        value.length > 0 ? "" : "Please enter induction code";
        break;
      case "techniques_type_name":
        err.techniques_type_name =
          value.length > 0 ? "" : "Please enter techniques name";
        break;
      case "techniques_type_code":
        err.techniques_type_code =
        value.length > 0 ? "" : "Please enter techniques code";
        break;
      case "language_patterns_type_name":
        err.language_patterns_type_name =
          value.length > 0 ? "" : "Please enter language_patterns name";
        break;
      case "language_patterns_type_code":
        err.language_patterns_type_code =
        value.length > 0 ? "" : "Please enter language patterns code";
        
      case "language_patterns_defination":
        err.language_patterns_defination =
          value.length > 0 ? "" : "Please enter language pattern definition";
        break;
      case "language_patterns_example":
        err.language_patterns_example =
          value.length > 0 ? "" : "Please enter language pattern examples";
        break;
      default:
        break;
    }

    setFormFields({ ...formFields, [name]: value });
    seterr({ ...err });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (formFields.name === "") {
      err.name = "Please enter topic name";
    } else {
      err.name = "";
    }
    if (formFields.description === "") {
      err.description = "Please enter description";
    } else {
      err.description = "";
    }
    if (formFields.module === "") {
      err.module = "Please select module";
    } else {
      err.module = "";
    }
    if (formFields.topic_type === "") {
      err.topic_type = "Please select topic type";
    } else {
      err.topic_type = "";
    }
    if (formFields.quiz === "") {
      err.quiz = "Please select quiz";
    } else {
      err.quiz = "";
    }
    if (formFields.audio_suggestion === "") {
      err.audio_suggestion = "Please select audio suggestion";
    } else {
      err.audio_suggestion = "";
    }
    //induction
    if (formFields.topic_type === "induction") {
      if (formFields.induction_type_name === "") {
        err.induction_type_name = "Please enter induction name";
      } else {
        err.induction_type_name = "";
      }
      if (formFields.induction_type_code === "") {
        err.induction_type_code = "Please enter induction code";
      } else {
        err.induction_type_code = "";
      }
      if (signImage === "") {
        err.induction_sign_image = "Please enter sign language";
      } else {
        err.induction_sign_image = "";
      }
      if (formFields.induction_key_reminder === "") {
        err.induction_key_reminder = "Please enter key reminder";
      } else {
        err.induction_key_reminder = "";
      }
    }

    //techniques
    if (formFields.topic_type === "techniques") {
      if (formFields.techniques_type_name === "") {
        err.techniques_type_name = "Please enter techniques name";
      } else {
        err.techniques_type_name = "";
      }
      if (formFields.techniques_type_code === "") {
        err.techniques_type_code = "Please enter techniques code";
      } else {
        err.techniques_type_code = "";
      }
      if (signImageTechnique === "") {
        err.techniques_sign_image = "Please enter sign language";
      } else {
        err.techniques_sign_image = "";
      }
      if (formFields.techniques_key_reminder === "") {
        err.techniques_key_reminder = "Please enter key reminder";
      } else {
        err.techniques_key_reminder = "";
      }
    }

    //language_patterns
    if (formFields.topic_type === "language_patterns") {
      if (formFields.language_patterns_type_name === "") {
        err.language_patterns_type_name = "Please enter language patterns name";
      } else {
        err.language_patterns_type_name = "";
      }
      if (formFields.language_patterns_type_code === "") {
        err.language_patterns_type_code = "Please enter language patterns code";
      } else {
        err.language_patterns_type_code = "";
      }
      if (signImageLanguagePatterns === "") {
        err.language_patterns_sign_image = "Please enter sign language";
      } else {
        err.language_patterns_sign_image = "";
      }
      if (formFields.language_patterns_defination === "") {
        err.language_patterns_defination =
          "Please enter language pattern definition";
      } else {
        err.language_patterns_defination = "";
      }
      if (formFields.language_patterns_example === "") {
        err.language_patterns_example =
          "Please enter language pattern examples";
      } else {
        err.language_patterns_example = "";
      }
      if (itemsPatternType === "") {
        err.language_patterns_patternType =
          "Please select language pattern type";
      } else {
        err.language_patterns_patternType = "";
      }
      if (itemsInduction === "") {
        err.language_patterns_inductionType = "Please select inductions";
      } else {
        err.language_patterns_inductionType = "";
      }
      if (itemsTechnique === "") {
        err.language_patterns_techniquesType = "Please select techniques";
      } else {
        err.language_patterns_techniquesType = "";
      }
    }

    seterr({ ...err });
    // console.log(err, "err");
    if (
      err.name === "" &&
      err.description === "" &&
      err.module === "" &&
      err.quiz === "" &&
      err.topic_type === ""
    ) {
      setIsLoading(true);

      if (signImage || signImageTechnique || signImageLanguagePatterns) {
        let formData = new FormData();
        if (signImage) {
          formData.append("image", signImage);
        }
        if (signImageTechnique) {
          formData.append("image", signImageTechnique);
        }
        if (signImageLanguagePatterns) {
          formData.append("image", signImageLanguagePatterns);
        }
        //banner image upload
        Services.uploadTopicSign(formData)
          .then((response) => {
            // console.log(response, "response img");
            if (response.data.status === 200) {
              const uploadedSignImage = response.data.data[0].location;

              AllUploadedFiles = [
                ...finalImages,
                ...finalVideos,
                ...finalAudios,
              ];

              if (
                finalImages.length > 0 ||
                finalVideos.length > 0 ||
                finalAudios.length > 0
              ) {
                const fileData = new FormData();
                AllUploadedFiles.map((file, index) => {
                  fileData.append("image", file);
                });
                Services.ImgTopic(fileData)
                  .then((response) => {
                    // console.log(response, "response");
                    if (response.data.status === 200) {
                      let new_image = response.data.data[0].images.map(
                        (item) => {
                          return item.location;
                        }
                      );
                      let new_video = response.data.data[0].video.map(
                        (item) => {
                          return item.location;
                        }
                      );
                      let new_audio = response.data.data[0].audio.map(
                        (item) => {
                          return item.location;
                        }
                      );

                      if (
                        new_image.length > 0 ||
                        new_video.length > 0 ||
                        new_audio.length > 0
                      ) {
                        AddTopicData(
                          new_image,
                          new_video,
                          new_audio,
                          uploadedSignImage
                        );
                      }
                    }
                  })
                  .catch(function (err) {
                    // console.log(err, "err");
                  });
              }
            }
          })
          .catch(function (err) {
            console.log(err, "err");
          });
      }else{

        AllUploadedFiles = [
          ...finalImages,
          ...finalVideos,
          ...finalAudios,
        ];

        if (
          finalImages.length > 0 ||
          finalVideos.length > 0 ||
          finalAudios.length > 0
        ) {
          const fileData = new FormData();
          AllUploadedFiles.map((file, index) => {
            fileData.append("image", file);
          });
          Services.ImgTopic(fileData)
            .then((response) => {
              // console.log(response, "response");
              if (response.data.status === 200) {
                let new_image = response.data.data[0].images.map(
                  (item) => {
                    return item.location;
                  }
                );
                let new_video = response.data.data[0].video.map(
                  (item) => {
                    return item.location;
                  }
                );
                let new_audio = response.data.data[0].audio.map(
                  (item) => {
                    return item.location;
                  }
                );

                if (
                  new_image.length > 0 ||
                  new_video.length > 0 ||
                  new_audio.length > 0
                ) {
                  AddTopicData(
                    new_image,
                    new_video,
                    new_audio,
                    ""
                    // uploadedSignImage
                  );
                }
              }
            })
            .catch(function (err) {
              // console.log(err, "err");
            });
        }

        // AddTopicData([], [], [], "");

      }
    }

    function AddTopicData(
      arrayImages,
      arrayVideo,
      arrayAudio,
      uploadedSignImage
    ) {
      var addTopic = {
        name: formFields.name,
        description: formFields.description,
        month_type: false,
        year_type: true,
        moduleId: formFields.module,
        quizId: formFields.quiz,
        topic_type: formFields.topic_type,
        type_name:
          formFields.induction_type_name ||
          formFields.techniques_type_name ||
          formFields.language_patterns_type_name,
        type_code:
          formFields.induction_type_code ||
          formFields.techniques_type_code ||
          formFields.language_patterns_type_code,
        sign_image: uploadedSignImage,
        pattern_defination: formFields.language_patterns_defination,
        pattern_example: formFields.language_patterns_example,
        pattern_type: itemsPatternType.map(p => { return p.id }),
        inductionId: itemsInduction.map(i => { return i._id }),
        techniqueId: itemsTechnique.map(t => { return t._id }),
        images: arrayImages,
        video: arrayVideo,
        audio: arrayAudio,
        audio_suggestion: formFields.audio_suggestion,
        key_reminder:
          formFields.induction_key_reminder ||
          formFields.techniques_key_reminder ||
          formFields.language_patterns_key_reminder,
      };
      // console.log(addTopic, "addTopic");
      // return false;
      Services.addTopic(addTopic)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status == 200) {
            swal("Success", response.data.message, "success");
            history("/year-topic");
          } else {
            swal("Failed", response.data.message, "error");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          swal("Failed", err.data.message, "error");
        });
    }
  };

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
                title2="Add Topic"
              />
              <div className="maintable">
                <div className="cstm-contentHeader cstm-viewtopicMain">
                  <div className="cstm-header">
                    <h3>Add Topic</h3>
                  </div>
                </div>

                <div className="addtopic-main">
                  <form enctype="multipart/form-data">
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1">
                        <label>Select Module</label>
                        <div class="dropdown">
                          <select
                            // value={selectedModule}
                            onChange={handleOnchange}
                            className="cstm-moduldroupdown2"
                            name="module"
                          >
                            <option value="">Select Module</option>
                            {moduleData &&
                              moduleData.map((module, index) => (
                                <option value={module._id}>
                                  {module.name}
                                </option>
                              ))}
                          </select>
                          {err.module !== "" && (
                            <span style={{ color: "red" }}>{err.module}</span>
                          )}
                        </div>
                      </div>
                      <div className="col-6 InputField-1 cstm-ModalField ">
                        <label>Topic Name</label>
                        <br />
                        <input
                          onChange={handleOnchange}
                          type="text"
                          name="name"
                          placeholder="Enter topic name"
                        />
                        {err.name !== "" && (
                          <span style={{ color: "red" }}>{err.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="col-6 InputField-1">
                      <label>Select Topic Type</label>
                      <div class="dropdown">
                        <select
                          // value={selectedModule}
                          onChange={handleOnchange}
                          className="cstm-moduldroupdown2"
                          name="topic_type"
                        >
                          <option value="">Select Topic Type</option>
                          <option value="course_content">Course Content</option>
                          <option value="induction">Induction</option>
                          <option value="techniques">Technique</option>
                          <option value="language_patterns">
                            Language Pattern
                          </option>
                        </select>
                        {err.topic_type !== "" && (
                          <span style={{ color: "red" }}>{err.topic_type}</span>
                        )}
                      </div>
                    </div>
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 cstm-ModalField ">
                        <label>Description</label>
                        <br />
                        <textarea
                          onChange={handleOnchange}
                          type="text"
                          name="description"
                          placeholder="Write description"
                        />
                        {err.description !== "" && (
                          <span style={{ color: "red" }}>
                            {err.description}
                          </span>
                        )}
                      </div>
                    </div>
                    {/* induction  */}
                    {inductionStatus && (
                      <>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Induction Name</label>
                            <br />
                            <input
                              type="text"
                              name="induction_type_name"
                              placeholder="Enter induction name"
                              onChange={handleOnchange}
                            ></input>
                            {err.induction_type_name !== "" && (
                              <span style={{ color: "red" }}>
                                {err.induction_type_name}
                              </span>
                            )}
                          </div>
                          <div className="col-6 InputField-1  ">
                            <label>Induction Code</label>
                            <br />
                            <div className="col-6 InputField-1 cstm-Introcourse cstm-IntroCourse">
                              <div className="cstm-checkboxIntro">
                                <div className="addcourse-option">
                                  <h3>I</h3>
                                </div>
                                <div className="intor-course viewcourse-input">
                                  <input
                                    type="text"
                                    maxLength={6}
                                    className="code"
                                    name="induction_type_code"
                                    placeholder="1"
                                    onChange={handleOnchange}
                                  />
                                </div>
                              </div>
                            </div>
                            {err.induction_type_code !== "" && (
                              <span style={{ color: "red" }}>
                                {err.induction_type_code}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Upload sign language image</label>
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
                                      name="induction_sign_image"
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
                        {err.induction_sign_image !== "" && (
                          <span style={{ color: "red" }}>
                            {err.induction_sign_image}
                          </span>
                        )}
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
                            <label>Technique Name</label>
                            <br />
                            <input
                              type="text"
                              name="techniques_type_name"
                              placeholder="Enter techniques name"
                              onChange={handleOnchange}
                            ></input>
                            {err.techniques_type_name !== "" && (
                              <span style={{ color: "red" }}>
                                {err.techniques_type_name}
                              </span>
                            )}
                          </div>
                          <div className="col-6 InputField-1  ">
                            <label>Technique Code</label>
                            <br />
                            <div className="col-6 InputField-1 cstm-Introcourse cstm-IntroCourse">
                              <div className="cstm-checkboxIntro">
                                <div className="addcourse-option">
                                  <h3>I</h3>
                                </div>
                                <div className="intor-course viewcourse-input">
                                  <input
                                    type="text"
                                    maxLength={6}
                                    className="code"
                                    name="techniques_type_code"
                                    placeholder="1"
                                    onChange={handleOnchange}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            {err.techniques_type_code !== "" && (
                              <span style={{ color: "red" }}>
                                {err.techniques_type_code}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Upload sign language image</label>
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
                                      name="techniques_sign_image"
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
                        {err.techniques_sign_image !== "" && (
                          <span style={{ color: "red" }}>
                            {err.techniques_sign_image}
                          </span>
                        )}
                        {signImageTechniqueFile &&
                          signImageTechniqueFile.length > 0 && (
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

                    {/* language_patterns  */}
                    {languagePatternsStatus && (
                      <>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Language Patterns Name</label>
                            <br />
                            <input
                              type="text"
                              name="language_patterns_type_name"
                              placeholder="Enter language patterns name"
                              onChange={handleOnchange}
                            ></input>
                            {err.language_patterns_type_name !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_type_name}
                              </span>
                            )}
                          </div>
                          <div className="col-6 InputField-1  ">
                            <label>Language Patterns Code</label>
                            <br />
                            <div className="col-6 InputField-1 cstm-Introcourse cstm-IntroCourse">
                              <div className="cstm-checkboxIntro">
                                <div className="addcourse-option">
                                  <h3>I</h3>
                                </div>
                                <div className="intor-course viewcourse-input">
                                  <input
                                    type="text"
                                    maxLength={6}
                                    className="code"
                                    name="language_patterns_type_code"
                                    placeholder="1"
                                    onChange={handleOnchange}
                                  ></input>
                                </div>
                              </div>
                            </div>
                            {err.language_patterns_type_code !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_type_code}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Language Patterns Defination</label>
                            <br />
                            <textarea
                              onChange={handleOnchange}
                              type="text"
                              name="language_patterns_defination"
                              placeholder="Write defination"
                            />
                            {err.language_patterns_defination !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_defination}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Language Patterns Example</label>
                            <br />
                            <textarea
                              onChange={handleOnchange}
                              type="text"
                              name="language_patterns_example"
                              placeholder="Write example"
                            />
                            {err.language_patterns_example !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_example}
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
                              selectedValues={itemsPatternType}
                              onSelect={handlePatternTypeSelect}
                              onRemove={handlePatternTypeRemove}
                              displayValue="name"
                              showCheckbox
                            />

                            {err.language_patterns_patternType !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_patternType}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* induction type */}
                        <div className="col-6 InputField-1">
                          <label>Induction Type</label>
                          <div class="dropdown">
                            <Multiselect
                              options={inductionType}
                              selectedValues={itemsInduction}
                              onSelect={handleInductionTypeSelect}
                              onRemove={handleInductionTypeRemove}
                              displayValue="name"
                            />

                            {err.language_patterns_patternType !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_patternType}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* techniques type */}
                        <div className="col-6 InputField-1">
                          <label>Technique Type</label>
                          <div class="dropdown">
                            <Multiselect
                              options={techniqueType}
                              selectedValues={itemsTechnique}
                              onSelect={handleTechniquesTypeSelect}
                              onRemove={handleTechniquesTypeRemove}
                              displayValue="name"
                            />

                            {err.language_patterns_techniquesType !== "" && (
                              <span style={{ color: "red" }}>
                                {err.language_patterns_techniquesType}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="addtopic-field">
                          <div className="col-6 InputField-1 cstm-ModalField ">
                            <label>Upload sign language image</label>
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
                                      name="language_patterns_sign_image"
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
                        {err.language_patterns_sign_image !== "" && (
                          <span style={{ color: "red" }}>
                            {err.language_patterns_sign_image}
                          </span>
                        )}
                        {signImageLanguagePatternsFile &&
                          signImageLanguagePatternsFile.length > 0 && (
                            <img
                              className="sign_image"
                              width="200"
                              height="200"
                              src={signImageLanguagePatternsFile}
                            />
                          )}
                      </>
                    )}
                    {/* language_patterns end */}

                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 cstm-ModalField ">
                        <label>Upload Video</label>
                        <br />
                        <div className="viewtopicMusic-Images">
                          <div className="row-1 Main-video">
                            <div className="music-icon">
                              <img src={VideoIcon} />
                            </div>
                            <div className="music-name">
                              <label className="inputchoosefile">
                                <input
                                  accept=".mp4,.mov"
                                  multiple
                                  type="file"
                                  name="image_video"
                                  id="org-image"
                                  onChange={handleVideoChange}
                                />
                                <span>
                                  <h6>Drag & drop or click to add video.</h6>
                                  <h5>Please use MP4 formate of video</h5>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {err.video !== "" && (
                      <span style={{ color: "red" }}>{err.video}</span>
                    )}
                    <div className="viewtopic-Images">
                      <div className="uploadedvideoMain">
                        {videosPrev &&
                          videosPrev.map((url, index) => (
                            <div className="uploadimg uploadimgeffect row-1">
                              <video
                                width="200"
                                height="200"
                                controls
                                src={url}
                                id={index}
                              />
                              <span className="viewImage-option">
                                <span>
                                  {" "}
                                  <i
                                    class="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <span>
                                  {" "}
                                  <i
                                    class="fa fa-trash"
                                    aria-hidden="true"
                                    onClick={() => deleteImages(index, "video")}
                                  ></i>
                                </span>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 cstm-ModalField ">
                        <label>Upload images</label>
                        <br />
                        <div className="viewtopicMusic-Images">
                          <div className="row-1 Main-video">
                            <div className="music-icon">
                              <img src={ImageIcon} />
                            </div>
                            <div className="music-name">
                              <label className="inputchoosefile">
                                <input
                                  accept="image/*"
                                  multiple
                                  type="file"
                                  name="image_video"
                                  id="org-image"
                                  style={{ opacity: 0, cursor: "pointer" }}
                                  onChange={handleImageChange}
                                />
                                <span>
                                  {" "}
                                  <h6>Drag & drop or click to add image.</h6>
                                  <h5>Please use JPEG, PNG formate of image</h5>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {err.image !== "" && (
                      <span style={{ color: "red" }}>{err.image}</span>
                    )}
                    <div className="viewtopic-Images">
                      <div className="uploadedvideoMain">
                        {/* onchange images prew */}

                        {imagesPrev &&
                          imagesPrev.map((url, index) => (
                            <div className="uploadimg uploadimgeffect row-1">
                              <img src={url} id={index} />
                              <span className="viewImage-option">
                                <span>
                                  {" "}
                                  <i
                                    class="fa fa-pencil"
                                    aria-hidden="true"
                                  ></i>
                                </span>

                                <span>
                                  {" "}
                                  <i
                                    class="fa fa-trash"
                                    aria-hidden="true"
                                    onClick={() => deleteImages(index, "image")}
                                  ></i>
                                </span>
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 cstm-ModalField edit-audiosource">
                        <label>Upload Audio</label>
                        <br />
                        <div className="edit-audio">
                          {audiosPrev &&
                            audiosPrev.map((url, index) => (
                              <div className="row-1 edit-Main-music">
                                <div className="music-icon">
                                  <img src={MusicIcon} />
                                </div>
                                <audio controls id={index} autoplay src={url} />
                                {/* </audio> */}
                                <div className="edit-delete-icon">
                                  <button
                                    type="button"
                                    onClick={() => deleteImages(index, "audio")}
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
                          <div className="row-2 add-videoLink">
                            <input
                              multiple
                              accept=".mp3"
                              type="file"
                              onChange={handleAudioChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {err.audio !== "" && (
                      <span style={{ color: "red" }}>{err.audio}</span>
                    )}
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1">
                        <div class="dropdown">
                          <select
                            // value={selectedModule}
                            onChange={handleOnchange}
                            className="cstm-moduldroupdown2"
                            name="audio_suggestion"
                          >
                            <option value="">Select Audio Suggestion</option>

                            {audioSuggestion &&
                              audioSuggestion.map((item, index) => (
                                <option value={item._id}>
                                  {item.suggesionName}
                                </option>
                              ))}
                          </select>
                          {err.audio_suggestion !== "" && (
                            <span style={{ color: "red" }}>
                              {err.audio_suggestion}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="addtopic-field">
                      <div className="col-6 InputField-1">
                        <div class="dropdown">
                          <select
                            onChange={handleOnchange}
                            className="cstm-moduldroupdown2"
                            name="quiz"
                          >
                            <option value="">Select Quiz</option>
                            {quizData &&
                              quizData.map((quiz, index) => (
                                <option value={quiz._id}>
                                  {quiz.quizName}
                                </option>
                              ))}
                          </select>
                          {err.quiz !== "" && (
                            <span style={{ color: "red" }}>{err.quiz}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* induction editor */}
                    {inductionStatus && (
                      <Editor
                        // editorState={editVal.description1}
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
                        onEditorStateChange={handelChangeTechnique}
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
                        // editorState={editVal.description1}
                        onEditorStateChange={handelChangeLanguagePattern}
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

                    <div class="col-12 modal-addbtn">
                      <button
                        type="button"
                        onClick={handleOnSubmit}
                        class="cstm-btn1"
                      >
                        Add
                      </button>
                    </div>
                    {isLoading && (
                      <div id="login-loader" className="loader-main">
                        <img src={loader} />
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddYearTopic;
