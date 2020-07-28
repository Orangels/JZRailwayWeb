import React from 'react'
import {Col, Row, Tag} from 'antd'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import Home_content_template from "../../../common/Home_content_template";
import backgroundBanner from "../../../asset/back_new/5_部署概览.png";
import video from "video.js";
import "video.js/dist/video-js.css";
import "videojs-flash"
import videoSWF from 'videojs-swf/dist/video-js.swf';
import Chart_heatMap from '../../Chart/Chart_heatMap'
import Histogram from "../../Chart/Histogram";

export default class Home_content_2_1 extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        let options_0 = {
            autoplay:    true,
            controls:    false,
            preload:     true, //预加载
            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
            techOrder:   ['flash'],//Video.js技术首选的顺序
            aspectRatio: '3:2',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
            flash: { swf: videoSWF },
            live: true,
            sources: [{
                type: "rtmp/flv",
                src: "rtmp://192.168.88.221:1935/hls/world",
            }],
        }
        // this.player_0 = video(`home_video_0`,options_0);
    }

    componentWillUnmount() {
        this.player_0 && this.player_0.dispose()
    }

    render() {
        console.log(578 * screen_scale_height)
        return (
            <Home_content_template style={{
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
                width:809*screen_scale_width,
                height:578 * screen_scale_height,
            }}
                                   childStyle={{
                                       width:'96%',
                                       height:500 * screen_scale_height,
                                       // marginTop:20*screen_scale_width
                                   }}
                                   title={'部署情况'}>
                {/*<div style={{*/}
                {/*    // height:"99%",*/}
                {/*    height:"100%",*/}
                {/*    width:"100%",*/}
                {/*}}>*/}
                {/*</div>*/}
                {/*<div style={{width: "100%", position: "relative"}}>*/}
                {/*    <Tag color={'#FA0F21'} style={{position: 'absolute', top: 10, right: 10, zIndex: 99}}*/}
                {/*         closable>*/}
                {/*        {`平面图`}*/}
                {/*    </Tag>*/}
                {/*    <video id={`home_video_0`} className="video-js vjs-custom-skin video_0" preload="auto"*/}
                {/*           autoPlay="autoplay" data-setup=''*/}
                {/*           style={{*/}
                {/*               width: '100%',*/}
                {/*           }}*/}

                {/*    >*/}
                {/*        <source src="rtmp://192.168.88.221:1935/hls/room" type="rtmp/flv"/>*/}
                {/*    </video>*/}
                {/*</div>*/}
                <Chart_heatMap height={550*screen_scale_height}
                               width={825*screen_scale_width} />
            </Home_content_template>
        )

    }
}