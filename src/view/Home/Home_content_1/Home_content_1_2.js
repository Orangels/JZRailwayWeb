import React from 'react';
import { inject, observer } from 'mobx-react/index'
import { toJS , autorun} from 'mobx'
import { Tag } from 'antd';

import {screen_scale_height, screen_scale_width, trackerColoreMap, personIDColreMap} from "../../parameter/parameters";

import { imgWidht, imgHeight, iconWidth, iconHeight, heatMapMaxValue, trackerMaxValue } from "../../parameter/home_content_2_1_parametere_data"

import {deepCopy, randomNum} from '../../../common/utils'
import back_tmp from "../../../asset/test/back.jpg";

import video from 'video.js';
import videoSWF from 'videojs-swf/dist/video-js.swf';
import "video.js/dist/video-js.css";
import "videojs-flash"

import './Home_content_1_2.less'
import Home_content_template from "../../../common/Home_content_template";


@inject('appStore') @observer
class Home_content_1_2 extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // img: 'http://192.168.88.221:5000/static/staticPic/back.jpg'
            checkedList:[],
            showNum:0,
            videoArr:[0, 1, 2]
        };
    }


    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
        if (this.players){
            this.players.forEach((val, index)=>{
                val.dispose()
            })
        }
        // this.player && this.player.dispose()
        // this.props.appStore.updateHeatMapPoints(this.heatMapPoints)
        // this.props.appStore.updateTrackIDsArr(this.trackIDsArr)
    }

    componentDidMount() {
        let options = {
            autoplay:    true,
            controls:    true,
            preload:     true, //预加载
            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
            techOrder:   ['flash'],//Video.js技术首选的顺序
            aspectRatio: '16:9',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
            flash: { swf: videoSWF },
            live: true,
            sources: [{
                type: "rtmp/flv",
                src: "rtmp://192.168.88.197:1935/hls/000",
            }],
        }

        this.players = [];

        this.state.videoArr.forEach((val, index)=>{
            let options = {
                autoplay:    true,
                controls:    true,
                preload:     true, //预加载
                fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                techOrder:   ['flash'],//Video.js技术首选的顺序
                aspectRatio: '16:9',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                flash: { swf: videoSWF },
                live: true,
                sources: [{
                    type: "rtmp/flv",
                    src: `rtmp://192.168.88.197:1935/hls/00${index}`,
                }],
            }
            this.players.push(video(`home_video_${index}`,options))
        })

    }

    componentWillReceiveProps(nextProps, nextContext) {
        // this.players.forEach((val, index)=>{
        //     let player = val;
        //     player.dispose()
        // })
    }

    render() {

        let videoComponents = this.state.videoArr.map((val, index)=>{
            let zIndex = index == this.props.appStore.homeVideoShowNum ? 90 : 10
            return (
                <div style={{width: "100%",
                    // position: "relative",
                    position:'absolute',
                    zIndex:zIndex}}>
                    <Tag color={'#FA0F21'} style={{position: 'absolute', top: 10, left: 10, zIndex: zIndex}}
                         closable>
                        {`枪机 ${val}`}
                    </Tag>
                    <video id={`home_video_${index}`} className="video-js vjs-custom-skin video_0 ls_content_1_2_video" preload="auto"
                           autoPlay="autoplay" data-setup=''
                           style={{
                               width: '100%',
                               // objectFit:"fill"
                               // objectFit:'contain'
                           }}

                    >
                        <source src={`rtmp://192.168.88.197:1935/hls/00${index}`} type="rtmp/flv"/>
                    </video>
                </div>
            )
        })

        return (
            <div style={{position: "relative", width:'100%', height:imgHeight, }} className={'Home_content_1_2'}>
                {videoComponents}
            </div>

        )
    }
}

export default Home_content_1_2;