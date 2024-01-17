import React, { useState, useEffect } from 'react'
import Header from '../NavMenu/Header'
import Sidebar from '../NavMenu/Sidebar'
import NavLinkHeader from '../NavMenu/NavLinkHeader'
import Services from '../../Services/auth.service';
import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import $ from 'jquery';

import MusicIcon from "../../Images/music-icon.png";


const ViewTopic = () => {

    const history = useNavigate();
    useEffect(() => {
        const loggedInUser = localStorage.getItem("token");
        !loggedInUser && history("/");

        getDataById();
    }, []);

    const getid = useLocation().search;
    const TopicID = new URLSearchParams(getid).get("id");
    const [topicData, setTopicData] = useState({});
    const [moduleName, setModule] = useState();
    const [images, setImages] = useState();
    const [video, setVideos] = useState();
    const [audio, setAudio] = useState();
    const [audio_sugg, setAudioSugg] = useState();
    var Urls = [];
    var VideoUrls = [];
    var AudioUrls = [];

    const getDataById = () => {

        Services.getTopicById(TopicID)
            .then((response) => {
                console.log(response, "response");
                // return false;
                if (response.data.status === 200) {
                    var data = response.data.data;
                    var imgs = response.data.data.images;
                    var vide = response.data.data.video;
                    var aud = response.data.data.audio;
                    imgs?.map((url) => {
                        Urls = [...Urls, "https://the-black-lotus.s3.us-west-1.amazonaws.com/" + url]
                    })
                    vide?.map((url) => {
                        VideoUrls = [...VideoUrls, "https://the-black-lotus.s3.us-west-1.amazonaws.com/" + url]
                    })
                    aud?.map((url) => {
                        AudioUrls = [...AudioUrls, "https://the-black-lotus.s3.us-west-1.amazonaws.com/" + url]
                    })
                    setImages(Urls);
                    setVideos(VideoUrls);
                    setAudio(AudioUrls);
                    var reqData = {
                        _id: data._id,
                        name: data.name,
                        description: data.description,
                    }
                    setTopicData(reqData);
                    Services.getModuleById(data.moduleId)
                        .then((response) => {
                            if (response.data.status === 200) {
                                var moduleName = response.data.data.name;
                                setModule(moduleName);
                            } else {
                                console.log("error");
                            }
                        })
                        .catch(function (err) {
                            console.log(err, "erron api");
                        });
                }
            })
            .catch(function (err) {
                console.log(err, "err");
            });
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
                            <NavLinkHeader main_title="Dashboard" title1="Topics" title1_link="topic" title2="View Topic" />
                            <div className='maintable'>
                                <div className='cstm-contentHeader cstm-viewtopicMain'>
                                    <div className='cstm-header'>
                                        <h3>View Topic</h3>
                                    </div>
                                </div>
                                <div className='main-ViewTopicLayout'>
                                    <div className='viewtopic-para'>
                                        <h5>Module Name</h5>
                                        <h6>{moduleName ? moduleName : "-"}</h6>
                                    </div>
                                    <div className='viewtopic-para'>
                                        <h5>Topic Name</h5>
                                        <h6>{topicData.name ? topicData.name : "-"}</h6>
                                    </div>
                                    <div className='viewtopic-para'>
                                        <h5>Description</h5>
                                        <h6>{topicData.description ? topicData.description : '-'}</h6>
                                    </div>
                                    <div className='viewtopic-para'>
                                        <h5>Images</h5>
                                        <div className='viewtopic-Images'>
                                            <div className='row-1 viewtopicImg'>
                                                {images ? images.map((url, index) => (
                                                    <img src={url} />
                                                )) : "-"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='viewtopic-para'>
                                        <h5>Video</h5>
                                        <div className='viewtopic-Images viewtopicImg'>
                                            <div className='row-1'>
                                                {console.log(video, "video")}
                                                {video ? video.map((url, index) => (
                                                    <video width="200" height="200" controls src={url} alt="..." />

                                                )) : '-'
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='viewtopicMusic-para'>
                                        <h5 >Audio Source</h5>
                                        <div className='viewtopicMusic-Images'>

                                            {audio ? audio.map((url, index) => (
                                                <div className='row-1 Main-music'>
                                                    <div className='music-icon'>
                                                        <img src={MusicIcon} />
                                                    </div>
                                                    <audio controls autoplay>
                                                        <source src={url} type="audio/mp3" />
                                                    </audio>
                                                </div>
                                            )) : "-"
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewTopic
