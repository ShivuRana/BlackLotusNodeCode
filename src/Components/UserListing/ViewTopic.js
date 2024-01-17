import React from 'react';
import viewimg1 from "../../Images/img1.png";
import viewimg2 from "../../Images/img2.png";
import viewimg3 from "../../Images/img3.png";
import viewimg4 from "../../Images/img4.png";
import viewimg5 from "../../Images/img5.png";
import viewimg6 from "../../Images/img6.png";
import video1 from "../../Images/video1.png";
import MusicIcon from "../../Images/music-icon.png";
import backarrow from "../../Images/short_left.png";
import DailyFlowChart from "../../Images/daily-flow-chart.png";
import TotalReport from "../../Images/total-report.png"

import App from '../../App';


const ViewTopic = () => {

    return (
        <>

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
                                    <li class="breadcrumb-item"><a href="#">month long course</a></li>
                                    <li class="breadcrumb-item active" aria-current="page">view topics</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                    <div className='maintable'>
                        <div className='cstm-contentHeader cstm-viewtopicMain'>
                            <div className='cstm-header'>
                                <h3>View Statistics Chart</h3>
                            </div>
                        </div>
                        <div className='main-ViewTopicLayout main-chart'>
                            <div className='userchart1'>
                                <div className='dailyflow-chat'>
                                    <label>Daily Flow</label><br />
                                    <img src={DailyFlowChart} />
                                </div>
                            </div>
                            <div className='userchart2'>
                                <div className='dailyflow-chat'>
                                    <label>Daily Flow</label><br />
                                    <img src={TotalReport} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ViewTopic;
