import React, { useState, useEffect } from "react";
import Header from "../NavMenu/Header";
import Sidebar from "../NavMenu/Sidebar";
import NavLinkHeader from "../NavMenu/NavLinkHeader";
import Services from "../../Services/auth.service";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import Flickity from "react-flickity-component";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

import VideoIcon from "../../Images/video-icon.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";



const EditTopic = () => {
  const history = useNavigate();


  const getid = useLocation().search;
  const TopicID = new URLSearchParams(getid).get("id");

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    module: "",
    quize: "",
    moduleId: "",
    quizeId: "",
  });
  const [err, seterr] = useState({
    name: "",
    description: "",
    module: "",
    quize: "",
    image: "",
    video: "",
    audio: "",
    sugg: "",
  });

 

  const [moduleData, setModuleData] = useState();
  const [selectedModule, setSelectedModule] = useState("");
  const [selectedQuize, setSelectedQuize] = useState("");
  const [quizData, setQuizeData] = useState();

  const [imgIndex, setImgIndex] = useState(0);

  const [isOpenVideo, setIsOpenVideo] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [videoIndex, setVideoIndex] = useState(0);

var AllFilesData=[];


  // -----------------------------

   // ---------------

  const [imageGet, setImagesGet] = useState([]);
  const [imagesPrev, setImagesPrev] = useState([]);
  const [finalImages, setFinalImages] = useState([]);
  var imageGetArray = [];
  var arrayImages = [];
  var imgArray = [];
  var imgExtArray = [];

  const [videoGet, setVideosGet] = useState([]);
  const [videosPrev, setVideosPrev] = useState([]);
  const [finalVideos, setFinalVideos] = useState([]);
  var videoGetArray = [];
  var arrayVideos = [];
  var videoArray = [];
  var videoExtArray = [];

  const [audioGet, setAudiosGet] = useState([]);
  const [audiosPrev, setAudiosPrev] = useState([]);
  const [finalAudios, setFinalAudios] = useState([]);
  var audioGetArray = [];
  var arrayAudios = [];
  var audioArray = [];
  var audioExtArray = [];

  const [suggGet, setSuggGet] = useState([]);
  const [suggPrev, setSuggPrev] = useState([]);
  const [finalSugg, setFinalSugg] = useState([]);

  const [showCount, setCount] = useState(0);

  var suggGetArray = [];
  var arraySugg = [];
  var suggArray = [];
  var suggExtArray = [];


  // ------------------------------
  var moduleArr = [];
  function createDataModule(_id, name) {
    return {
      _id,
      name,
    };
  }
  useEffect(() => {
    // const loggedInUser = localStorage.getItem("token");
    // !loggedInUser && history("/");

    // ModuleDataGet();
    // QuizListing();

    // getDataById();
    Services.getTopicById(TopicID)
      .then((response) => { 
        if (response.data.status === 200) {
          var data = response.data.data;
          var imgs = response.data.data.images;
          var vide = response.data.data.video;
          var aud = response.data.data.audio;
         console.log(imgs,"imgs");

        //  var filesplit=[];
        //  imgs.map((url) => {
        //   splitfile=url.location.split(".").pop();
        //   filesplit.push(splitfile);
        // })





         var filesplit=[];
        var splitfile =[];
        var imgearr=[];
          imgs.map((url) => { 

            console.log(url, "URL")
            url.map((file)=>{
              console.log(file.location,"dsjfj")
             imgearr.push(file.location);
              splitfile=file.location.split(".").pop();
              filesplit.push(splitfile); 
          });
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
          imageExtension.includes(filesplit) && imgearr;
        })

          // vide.map((url) => {
          //   var filesplit = url.split(".").pop();
          //   var videoExtension = [
          //     "mp4",
          //     "MOV",
          //     "mov",
          //     "wmv",
          //     "avi",
          //     "avchd",
          //     "flv",
          //     "f4v",
          //     "swf",
          //     "mkv",
          //     "webm",
          //     "html5",
          //     "mpeg-2",
          //   ];
          //   videoExtension.includes(filesplit) && videoGetArray.push(url);
          // });
          // aud.map((url) => {
          //   var filesplit = url.split(".").pop();
          //   var audioExtension = [
          //     "mp3",
          //     "AAC",
          //     "Ogg Vorbis",
          //     "FLAC",
          //     "ALAC",
          //     "WAV",
          //     "AIFF",
          //     "DSD",
          //     "PCM",
          //   ];
          //   audioExtension.includes(filesplit) && audioGetArray.push(url);
          // }); 
          
          console.log(imageGetArray,"imageGetArray")
          setImagesGet([...imageGet, ...imgearr]);
          setVideosGet([...videoGet, ...videoGetArray]);
          setAudiosGet([...audioGet, ...audioGetArray]);
       

          var reqData = {
            _id: data._id,
            name: data.name,
            description: data.description,
            moduleId: data.moduleId,
            quizeId: data.quizId
          };

          setFormFields(reqData);
          setSelectedModule(data.moduleId);
          data.moduleId && Services.getQuizeById(data.quizId)
            .then((response) => {
              if (response.data.status === 200) {
                var QuizId = response.data.data._id;
                setSelectedQuize(QuizId);
              } else {
                console.log("error");
              }
            })
            .catch(function (err) {
              console.log(err, "erron api12");
            });
        }
      })
      .catch(function (err) {
        console.log(err, "err");
        // swal("Failed", err.response.data.message, "error");
      });

      ModuleDataGet();
      QuizListing();

      setCount(100)
  }, []);

  const ModuleDataGet =()=>{

    var queryVar = {
      "month_type": true,
    };
    Services.GetModuleListing(queryVar)
      .then((response) => {
        // console.log(response, "res123");
        // return false;
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
            // getDataById();
          }
        } else {
          console.log("error");
        }
      })
      .catch(function (err) {
        console.log(err, "erron api");
      });

  }
  const QuizListing = () => {

    Services.getQuize()
      .then((response) => {
        // console.log(response, "res123");
        // return false;
        if (response.data.status === 200) {
          var arr = response.data.data;
          if (response.data.data.length > 0) {
            setQuizeData(arr);
          }
        } else {
          console.log("error");
        }
      })
      .catch(function (err) {
        console.log(err, "erron api");
      });
  }
 
  function deleteImagesGet(e, name) {
    if (name === "image") {
      const Delimages = imageGet.filter((item, index) => index !== e);
      setImagesGet([...Delimages]);
    }

    if (name === "video") {
      const Delvideos = videoGet.filter((item, index) => index !== e);
      setVideosGet([...Delvideos]);
    }
    if (name === "audio") {
      const Delaudios = audioGet.filter((item, index) => index !== e);
      setAudiosGet([...Delaudios]);
    }
    if (name === "sugg") {
      const Delsugg = suggGet.filter((item, index) => index !== e);
      setSuggGet([...Delsugg]);
    }




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

    if (name === "sugg") {
      const suggp = imagesPrev.filter((item, index) => index !== e);
      const fs = finalSugg.filter((item, index) => index !== e);
      setFinalSugg([...fs]);
      setSuggPrev([...suggp]);
    }
  }

  const handleImageChange = (e) => {
    e.preventDefault();
    // errEditCharityVal.image_video = e.target.value.length > 0 ? "" : "Select image or video";
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
      imgArray = [...imgArray, f];
    });
    setFinalImages([...imgArray]);
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
      // var videoExtension = ["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm", "html5", "mpeg-2"];
      imageExtension.includes(filesplit) && imgExtArray.push(u);
      setImagesPrev([...imagesPrev, ...imgExtArray]);
    });
  };
  const handleVideoChange = (e) => {
    e.preventDefault();
    // errEditCharityVal.image_video = e.target.value.length > 0 ? "" : "Select image or video";
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
      videoArray = [...videoArray, f];
    });
    setFinalVideos([...videoArray]);
    const arr = [];
    videoArray.forEach(function (f, index) {
      var u = URL.createObjectURL(f);
      arr.push(u);
      var filesplit = f.name.split(".").pop();
      var videoExtension = [
        "mp4",
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
      // var videoExtension = ["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm", "html5", "mpeg-2"];
      videoExtension.includes(filesplit) && videoExtArray.push(u);
      setVideosPrev([...videosPrev, ...videoExtArray]);
    });
  };
  const handleAudioChange = (e) => {
    e.preventDefault();
    // errEditCharityVal.image_video = e.target.value.length > 0 ? "" : "Select image or video";
    var files = e.target.files;
    var filesArr = Array.prototype.slice.call(files);
    filesArr.forEach(function (f, index) {
      audioArray = [...audioArray, f];
    });
    setFinalAudios([...audioArray]);
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
      // var videoExtension = ["mp4", "mov", "wmv", "avi", "avchd", "flv", "f4v", "swf", "mkv", "webm", "html5", "mpeg-2"];
      audioExtension.includes(filesplit) && audioExtArray.push(u);
      setAudiosPrev([...audiosPrev, ...audioExtArray]);
    });
  };
  
  const handleOnSelect =(e)=>{
    const {name,value}=e.target;
    err.quize = value.length > 0 ? "" : "Please select quize";
    
    // setFormFields({ ...formFields, [name]: value });
    setFormFields({...formFields,quizeId : e.target.value});
    seterr({ ...err });
    

  }
  const handleOnSelectModule =(e)=>{
    const {name,value}=e.target;
    err.module = value.length > 0 ? "" : "Please select module";
    
    // setFormFields({ ...formFields, [name]: value });
    setFormFields({...formFields,moduleId : e.target.value});
    seterr({ ...err });
    

  }
  const handleOnchange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "name":
        err.name = value.length > 0 ? "" : "Enter topic name";
        break;
      case "description":
        err.description = value.length > 0 ? "" : "Enter description";
        break;
      // case "module":
      //   err.module = value.length > 0 ? "" : "Please select module";
      //   break;
      // case "quize":
      //   err.quize = value.length > 0 ? "" : "Please select quize";
      //   break;

      default:
        break;
    }

    setFormFields({ ...formFields, [name]: value });
    // setSelectedModule({...formFields,moduleId : e.target.value});

    seterr({ ...err });
  };

  const [allImages, setAllImages] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  const [allAudios, setAllAudios] = useState([]);
  const [allSugg, setAllSugg] = useState([]);

  const handleOnSubmit = async (e) => {
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
    if (formFields.moduleId === "") {
      err.module = "Please select module";

    } else {
      err.module = "";

    }
    if (formFields.quizeId === "") {
      err.quize = "Please select quize";

    } else {
      err.quize = "";

    }
    // if(selectedQuize ==="" || formFields.quize ===""){
    //     err.quize = "Please select quize";
    // }else{
    //   err.quize = "";

    // }

    // await UploadImages();
    // console.log(allImages, "allImagesss");

    seterr({ ...err });
    console.log(err, "err");
    if (
      err.name === ""
      && err.description === ""
      && err.module === ""
      // && err.quize === ""

    ) {
      AllFilesData =[...finalImages,...finalVideos,...finalAudios];

      console.log(AllFilesData,"AllFilesData");

      if (finalImages.length > 0 || finalVideos.length>0 || finalAudios.length>0 ) {

        const fileData = new FormData();
        AllFilesData.map((file, index)=>{
            fileData.append("image", file)
          })

          Services.ImgTopic(fileData)
          .then((response) => {
            console.log(response,"response img api")

              if (response.status === 200) {
                  const dataAll = response.data.data;
                  var ArrImg=[]
                  var ArrVideo=[]
                  var ArrAudio=[]

                  dataAll.map((file) => {
                    console.log(file,"file")
                    var img=file.images;
                    var vid=file.video;
                    var audi=file.audio;
                    img.map((file)=>{
                    ArrImg.push(file.location);

                    })
                    vid.map((file)=>{
                      ArrVideo.push(file.location);
  
                      })
                      audi.map((file)=>{
                        ArrAudio.push(file.location);
    
                        })


                    // ArrImg.push(file.images.location);
                    // ArrVideo.push(file.video.location);
                    // ArrAudio.push(file.audio.location);

                  })
                  // return false;
                  var finalImagesData = [];
                  finalImagesData = [...ArrImg, ...imageGet];
                  var finalVideosData = [];
                  finalVideosData = [...ArrVideo, ...videoGet];
                  var finalAudioData = [];
                  finalAudioData = [...ArrAudio, ...audioGet];
                  EditTopicData(finalImagesData, finalVideosData, finalAudioData);

                  
              }
          })
          .catch(function (err) {
              console.log(err, "err");

          })
        // AllFilesData.push()
      }else{
        EditTopicData(imageGet, videoGet, audioGet);


      }

      function EditTopicData(images, videos, audios) {
        // if (editTopicVal) {

        var editData = {
          name: formFields.name,
          description: formFields.description,
          moduleId: formFields.moduleId,
          images: images,
          video: videos,
          audio: audios,
          audio_sugg: "",
          quizeId: formFields.quizeId,
          id: TopicID,
        };
        console.log(editData, "editData");
        // return false;
        Services.editTopic(editData)
          .then((response) => {
            // $(".loader-main").hide();

            if (response.data.status == 200) {
              swal("Success", response.data.message, "success");
            } else {
              swal("Failed", response.data.message, "error");
            }
          })
          .catch((err) => {
            swal("Failed", err.response.data.message, "error");
          });
        // }
      }
    }
  };

 
 //image and video preview on popup
  var Imgarr = [];
  imageGet.map((img) => {
    Imgarr.push("https://the-black-lotus.s3.us-west-1.amazonaws.com/" + img)

  })
  var PopupImgArr = [...Imgarr, ...imagesPrev];

  var Videoarr = [];
  videoGet.map((video) => {
    Videoarr.push("https://the-black-lotus.s3.us-west-1.amazonaws.com/" + video)


  })

  var PopupVideoArr1 = [...Videoarr, ...videosPrev];

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
                title1="Topics"
                title1_link="topic"
                title2="View Topic"
              />
              <div className="maintable">
                <div className="cstm-contentHeader cstm-viewtopicMain">
                  <div className="cstm-header">
                    <h3>Edit Topic</h3>
                  </div>
                </div>

                {/* <Carousel initialIndex={1} data={PopupVideoArr1} /> */}


                <div className="addtopic-main">
                  <form onSubmit={handleOnSubmit} >
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1">
                        <label>Select Module</label>
                        <div class="dropdown">
                          <select
                            value={selectedModule}
                            onChange={handleOnSelectModule}
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
                          type="text"
                          name="name"
                          onChange={handleOnchange}
                          value={formFields.name}
                          placeholder="Enter topic name"
                        ></input>
                        {err.name !== "" && (
                          <span style={{ color: "red" }}>{err.name}</span>
                        )}
                      </div>
                    </div>

                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 cstm-ModalField ">
                        <label>Description</label>
                        <br />
                        <textarea
                          type="text"
                          name="description"
                          onChange={handleOnchange}
                          value={formFields.description}
                          placeholder="Write description"
                        ></textarea>
                        {err.description !== "" && (
                          <span style={{ color: "red" }}>{err.description}</span>
                        )}
                      </div>
                    </div>
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
                                {/* <input type="file" ></input> */}
                                <input
                                  // accept=".mov,.mp4"
                                  multiple
                                  type="file"
                                  name="image_video"
                                  id="org-image"
                                  // value={editcharityVal.image_video}
                                  // style={{ opacity: 0, cursor: 'pointer' }}
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
                                data-toggle="modal" data-target="#myModal4"
                                onClick={() => setIsOpenVideo(true)}


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
                        {/* get images prev */}
                        {videoGet &&
                          videoGet.map((url, index) => (
                            <div className="uploadimg uploadimgeffect row-1">
                              <video
                                width="200"
                                height="200"
                                controls
                                data-toggle="modal" data-target="#myModal4"
                                src={
                                  "https://the-black-lotus.s3.us-west-1.amazonaws.com/" +
                                  url
                                }
                                onClick={() => setIsOpenVideo(true)}

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
                                    onClick={() =>
                                      deleteImagesGet(index, "video")
                                    }
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
                                {/* <input type="file" ></input> */}
                                <input
                                  accept="image/*"
                                  multiple
                                  type="file"
                                  name="image_video"
                                  id="org-image"
                                  // value={editcharityVal.image_video}
                                  // style={{ opacity: 0, cursor: 'pointer' }}
                                  onChange={handleImageChange}
                                />
                                <span>
                                  {" "}
                                  <h6>Drag & drop or click to add video.</h6>
                                  <h5>Please use MP4 formate of video</h5>
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="viewtopic-Images">
                      <div className="uploadedvideoMain">
                        {/* onchange images prew */}

                        {imagesPrev &&
                          imagesPrev.map((url, index) => (
                            <div className="uploadimg uploadimgeffect row-1">
                              {/* <input type='file'> */}

                              <img
                                src={url}
                                id={index}
                                onClick={() => setIsOpen(true)}
                              // onClick={(e) => addEventListener(e, url)}
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
                                    onClick={() => deleteImages(index, "image")}
                                  ></i>
                                </span>
                              </span>
                              {/* </input> */}
                            </div>
                          ))}

                        {/* get images prev */}
                        {imageGet &&
                          imageGet.map((url, index) => (
                            <div className="uploadimg uploadimgeffect row-1">
                              <img
                                src={
                                  "https://the-black-lotus.s3.us-west-1.amazonaws.com/" +
                                  url
                                }
                                onClick={() => setIsOpen(true)}
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
                                    onClick={() =>
                                      deleteImagesGet(index, "image")
                                    }
                                  ></i>
                                </span>
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
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 cstm-ModalField edit-audiosource">
                        <label>Audio Source</label>
                        <br />
                        <div className="edit-audio">
                          {audiosPrev &&
                            audiosPrev.map((url, index) => (
                              <div className="row-1 edit-Main-music">
                                <div className="music-icon">
                                  <img src={MusicIcon} />
                                </div>
                                <audio controls autoplay id={index}>
                                  <source src={url} type="audio/mp3" />
                                </audio>
                                <div className="edit-delete-icon">
                                  <button
                                    type="button"
                                    class="cstm-icon-btn cstm-edit"
                                  >
                                    <i
                                      class="fa fa-pencil"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
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
                          {/* get time preview */}
                          {audioGet &&
                            audioGet.map((url, index) => (
                              <div className="row-1 edit-Main-music">
                                <div className="music-icon">
                                  <img src={MusicIcon} />
                                </div>
                                <audio controls autoplay id={index}>
                                  <source
                                    src={
                                      "https://the-black-lotus.s3.us-west-1.amazonaws.com/" +
                                      url
                                    }
                                    type="audio/mp3"
                                  />
                                </audio>
                                <div className="edit-delete-icon">
                                  <button
                                    type="button"
                                    class="cstm-icon-btn cstm-edit"
                                  >
                                    <i
                                      class="fa fa-pencil"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteImagesGet(index, "audio")
                                    }
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
                              accept=".mp3"
                              multiple
                              type="file"
                              name="image_video"
                              id="org-image"
                              // value={editcharityVal.image_video}
                              // style={{ opacity: 0, cursor: 'pointer' }}
                              onChange={handleAudioChange}
                            />
                            {/* <a href='#'>+Add audio</a> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="addtopic-field">
                      <div className="col-6 InputField-1">
                        <div class="dropdown">
                          <select
                            // value={selectedModule}
                            // onChange={handleOnchange}
                            className="cstm-moduldroupdown2"
                            name="quize"
                          >
                            <option value="">Select Audio Suggestion</option>

                            {/* {quizData &&
                              quizData.map((quize, index) => (
                                <option value={quize._id}>
                                  {quize.quizName}
                                </option>
                              ))} */}
                          </select>

                        </div>
                      </div>
                    </div>


                    <div className="addtopic-field">
                      <div className="col-6 InputField-1 Edit-InputField">
                        <div class="dropdown">
                          <select
                            value={selectedQuize}
                            onChange={handleOnSelect}
                            className="cstm-moduldroupdown2"
                            name="quize"
                          >
                            <option value="">Select Quize</option>
                            {quizData &&
                              quizData.map((quize, index) => (
                                <option value={quize._id}>
                                  {quize.quizName}
                                </option>
                              ))}
                          </select>
                          {err.quize !== "" && (
                            <span style={{ color: "red" }}>{err.quize}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <div className='addtopic-field'>
                                            <div className='intro-courseMain'>
                                                <div className='InputField-1 cstm-checkbox'>
                                                    <input type="checkbox"></input>
                                                    <label>Introduction To The Course</label>
                                                </div>
                                                <div className='delete-course'>
                                                    <button type="button" class="cstm-icon-btn" data-toggle="modal" data-target="#myModal4"><a href="#" class="cstm-delete cstm-trash"><i class="fa fa-trash" aria-hidden="true"></i></a></button>
                                                </div>
                                            </div>
                                        </div> */}
                    <div class="col-12 modal-addbtn">
                      <button class="cstm-btn1">Update</button>
                    </div>
                  </form>
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
    </>
  );
};

export default EditTopic;
