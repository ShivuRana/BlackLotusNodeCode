import React, { useState, useEffect, useCallback } from "react";
import Header from "../NavMenu/Header";
import Sidebar from "../NavMenu/Sidebar";
import NavLinkHeader from "../NavMenu/NavLinkHeader";
import Services from "../../Services/auth.service";
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import MusicIcon from "../../Images/music-icon.png";
import swal from "sweetalert";
import loader from "../../Images/loder.gif";

const EditAudio = () => {
  const [isLoading, setIsLoading] = useState(false);
  //images
  const [audiosPrev, setAudiosPrev] = useState([]);
  const [audio, setAudio] = useState([]);
  const [finalAudios, setFinalAudios] = useState();

  var audioArray = [];
  var audioExtArray = [];
  var AllUploadedFiles = [];

  const [formFields, setFormFields] = useState({
    name: "",
  });

  const [err, seterr] = useState({
    name: "",
    audio: "",
  });

  const history = useNavigate();
  const getid = useLocation().search; 
  const audioId = new URLSearchParams(getid).get("id");
  
  useEffect(() => {
    const loggedInUser = localStorage.getItem("token");
    !loggedInUser && history("/");

    Services.getAudioSuggesionById(audioId).then((response)=>{
        if(response.data.status === 200){
            console.log(response.data.data,'response');
            setFormFields({...formFields,['name']:response.data.data.suggesionName});
            setAudiosPrev([...audiosPrev,'https://the-black-lotus.s3.us-west-1.amazonaws.com/'+response.data.data.audioUrl]);
                audioArray = [...audioArray, response.data.data.audioUrl];
            setFinalAudios([...audioArray]);
        }
    })
  }, []);

  const handleAudioChange = (e) => {
    e.preventDefault();
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
      audioExtension.includes(filesplit) && audioExtArray.push(u)
        ? (err.audio = "")
        : (err.audio = "Upload audio only");
      seterr({ ...err });
      setAudiosPrev([...audioExtArray]);
    });
  };

  const handleOnchange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "name":
        err.name = value.length > 0 ? "" : "Please enter audio name";
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
      err.name = "Please enter audio name";
    } else {
      err.name = "";
    }


    seterr({ ...err });
    console.log(err, "err");
    if (
      err.name === ""
    ) {
      setIsLoading(true);

      AllUploadedFiles = [...finalAudios];

      if (typeof finalAudios[0] === "object") {
        const fileData = new FormData();
        AllUploadedFiles.map((file, index) => {
          fileData.append("image", file);
        });

        console.log(AllUploadedFiles,'AllUploadedFiles');
        Services.ImgTopic(fileData)
          .then((response) => {
            console.log(response, "response");
            if (response.data.status === 200) {
             
              let new_audio = response.data.data[0].audio.map((item) => {
                return item.location;
              });

              if (
                new_audio.length > 0
              ) {
                AddAudio(new_audio);
              }
            }
          })
          .catch(function (err) {
            console.log(err, "err");
          });
      } else{
        AddAudio(finalAudios);
      }
    }

    function AddAudio(arrayAudio) {
      var addTopic = {
        suggesionName: formFields.name,
        audioUrl: arrayAudio[0],
        id:audioId
      };

      console.log(addTopic,'addTopic');
      Services.editAudioSuggesion(addTopic)
        .then((response) => {
          setIsLoading(false);
          if (response.data.status == 200) {
            swal("Success", response.data.message, "success");
            history("/audio-suggesion");
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
                title1="Audio Suggesion"
                title1_link="audio-suggesion"
                title2="Edit Audio Suggesion"
              />
              <div className="maintable">
                <div className="cstm-contentHeader cstm-viewtopicMain">
                  <div className="cstm-header">
                    <h3>Edit Audio Suggesion</h3>
                  </div>
                </div>

                <div className="addtopic-main">
                  <form enctype="multipart/form-data">
                    <div className="addtopic-field">
                      <div className="col-6 InputField-1">
                        <label>Audio Name</label>
                        <br />
                        <input
                          onChange={handleOnchange}
                          type="text"
                          name="name"
                          placeholder="Enter audio name"
                          value={formFields.name}
                        />
                        {err.name !== "" && (
                          <span style={{ color: "red" }}>{err.name}</span>
                        )}
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

                    {/* {forms1.previewimgurl && forms1.previewimgurl.length > 0 && <img className="sign_image" width="200" height="200" src={forms1.previewimgurl} />} */}
                    <div class="col-12 modal-addbtn">
                      <button
                        type="button"
                        onClick={handleOnSubmit}
                        class="cstm-btn1"
                      >
                        Update
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

export default EditAudio;
