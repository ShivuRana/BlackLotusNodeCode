import React, { useState, useEffect, useCallback } from "react";
import Header from "../NavMenu/Header";
import Sidebar from "../NavMenu/Sidebar";
import NavLinkHeader from "../NavMenu/NavLinkHeader";
import Services from "../../Services/auth.service";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import VideoIcon from "../../Images/video-icon.png";
import backarrow from "../../Images/short_left.png";
import ImageIcon from "../../Images/image-icon.png";
import MusicIcon from "../../Images/music-icon.png";
import swal from "sweetalert";
import $ from "jquery"; 
import loader from "../../Images/loder.gif";
// import AudioSuggestion from "../Common/audioSuggestion";

const AddTopic = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showCount, setCount] = useState(0);
  const [quizData, setQuizeData] = useState();
  const [audioSuggestion, setAudioSuggestion] = useState();
  const [moduleData, setModuleData] = useState();
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

  const [formFields, setFormFields] = useState({
    name: "",
    description: "",
    module: "",
    quize: "",
    audio_suggestion: "",
  });
  const [err, seterr] = useState({
    name: "",
    description: "",
    module: "",
    quize: "",
    audio_suggestion: "",
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
      month_type: true,
    };
    Services.GetModuleListing(queryVar)
      .then((response) => {
        console.log(response, "res123");
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
  };

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
      case "quize":
        err.quize = value.length > 0 ? "" : "Please select quize";
        break;
      case "audio_suggestion":
        err.audio_suggestion =
          value.length > 0 ? "" : "Please select audio suggestion";
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
    if (formFields.quize === "") {
      err.quize = "Please select quize";
    } else {
      err.quize = "";
    }
    if (formFields.audio_suggestion === "") {
      err.audio_suggestion = "Please select audio suggestion";
    } else {
      err.audio_suggestion = "";
    }

    seterr({ ...err });
    console.log(err, "err");
    if (
      err.name === "" &&
      err.description === "" &&
      err.module === "" &&
      err.quize === ""
    ) {
      setIsLoading(true);
      AllUploadedFiles = [...finalImages, ...finalVideos, ...finalAudios];

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
            console.log(response, "response");
            if (response.data.status === 200) {
              let new_image = response.data.data[0].images.map((item) => {
                return item.location;
              });
              let new_video = response.data.data[0].video.map((item) => {
                return item.location;
              });
              let new_audio = response.data.data[0].audio.map((item) => {
                return item.location;
              });

              if (
                new_image.length > 0 ||
                new_video.length > 0 ||
                new_audio.length > 0
              ) {
                AddTopicData(new_image, new_video, new_audio);
              }
            }
          })
          .catch(function (err) {
            console.log(err, "err");
          });
      } else {
        AddTopicData([], [], []);
      }
    }

    function AddTopicData(arrayImages, arrayVideo, arrayAudio) {
      var addTopic = {
        name: formFields.name,
        description: formFields.description,
        month_type: true,
        year_type: false,
        moduleId: formFields.module,
        quizId: formFields.quize,
        topic_type: "course_content",
        type_name: "",
        type_code: "",
        sign_image: "",
        pattern_defination: "",
        pattern_example: "",
        pattern_type: "",
        inductionId: null,
        techniqueId: null,
        images: arrayImages,
        video: arrayVideo,
        audio: arrayAudio,
        audio_suggestion: formFields.audio_suggestion,
      };
      Services.addTopic(addTopic)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status == 200) {
            swal("Success", response.data.message, "success");
            history("/topic");
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
                title1="Topics"
                title1_link="topic"
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
                                  <h5>Please use Jpeg formate of image</h5>
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
                              accept=".mp3"
                              multiple
                              type="file"
                              name="image_video"
                              id="org-image"
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
                            name="quize"
                          >
                            <option value="">Select Quiz</option>
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

export default AddTopic;
