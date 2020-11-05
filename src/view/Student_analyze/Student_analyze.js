import React from 'react'
import io from 'socket.io-client'
import { toJS } from 'mobx'
import video from 'video.js';
import videoSWF from 'videojs-swf/dist/video-js.swf';
import {Drawer, Col, Row, Tag, Button, Popover, Modal, Form, Input, message} from 'antd'
import {LoginTag, screen_scale_height, screen_scale_width, trackerColoreMap, personIDColreMap} from "../parameter/parameters";
import {_fetch, deepCopy, get_2_float} from "../../common/utils";
import Queue_len from "../../common/dataStructs"
import {url, GET_RTMP_URL, ADD_RTMP_URL, DEL_RTMP_URL} from '../../common/urls'
import "video.js/dist/video-js.css";
import "videojs-flash"

import Template from '../../common/composite_template'
import './student_analyze.less'
import {inject, observer} from "mobx-react";
import backgroundBanner from "../../asset/back_new/2_校园综合数据.png";

const content_1_height = 600
// const warning_img_height = 230
const warning_img_height = 150
const img_col = 5
const img_width = 250
const fish_video_width = 48
// const perimeter_video_width = fish_video_width * 1.5
const perimeter_video_width = 48

const styles = {
    content:{
        marginTop:96*screen_scale_width,
        marginLeft:30*screen_scale_width,
        display:'flex',
        flexDirection:'column',
    },
    content_1_wrap:{
        display:'flex',
    },
    content_1_2_wrap:{
        display:'flex',
        flexDirection:'column',
        marginLeft: 26*screen_scale_width
    },
    wrap_div:{
        marginTop:96*screen_scale_width,
        marginLeft:15*screen_scale_width,
        // background:`url(${bg}) no-repeat `,
        // backgroundSize: '100% 100%',
        // transition:'all .5s'
    },
    waring_img :{
        width:img_width,
        height:warning_img_height,
        position:'relative',
        marginTop:20
    },
    waring_tag:{
        position: 'absolute',
        top:0,
        left:8
    },
    device_div:{
        display:"flex",
        flexDirection:"row",
        width: 180,
    },
    device_span:{
        color:'#FFFFFF'
    },
    device_tag:{
        marginLeft:10,
    }
}

const FormItem = Form.Item

@Form.create()
@inject('appStore') @observer
class Student_analyze extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            src:['rtmp://192.168.88.221:1935/hls/room', 'rtmp://192.168.88.221:1935/hls/room_1', 'rtmp://192.168.88.221:1935/hls/room_2'],
            // persons: new Queue_len(8),
            persons : toJS(this.props.appStore.entryPersons),
            // drawer
            visible: false,
            cpu_percent:0,
            cpu_temp:0,
            gpu_percent:0,
            memory_total:'0M',
            memory_used:'0M',
            disk_total:'0G',
            disk_used:'0G',
            memory_percent:0,
            disk_percent:0,
            show_cam_0: true,
            show_cam_1: true,
        };

        this._ws_new_state = this._ws_new_state.bind(this)
        this.waring_img_history = this.waring_img_history.bind(this)
        this._delVideo = this._delVideo.bind(this)
        this._update_track_data = this._update_track_data.bind(this)
        this._drawTracker = this._drawTracker.bind(this)
        this.socket_cam = 1
    }

    _update_track_data(){
        this.trackerArr = toJS(this.props.appStore.imgageIcomCoors || [])
        this._drawTracker(this.trackerArr)
    }

    _drawTracker(trackerObjs){
        console.log(trackerObjs)
        let personsArr = deepCopy(this.state.persons)
        let persons = personsArr.data
        for (let i = 0; i < trackerObjs.length; i++){
            for (let j = 0; j< persons.length; j++){
                if (Math.abs(persons[j].id) == trackerObjs[i].PersonID){
                    persons[j].trackID = trackerObjs[i].trackID
                    // break
                }
            }
        }
        this.setState({
            persons:personsArr
        },()=>{
            console.log(this.state.persons)
        })
    }

    _ws_new_state(data){

        // let results = data.result
        // console.log('*******')
        // console.log(results)
        // let persons = this.state.persons
        // console.log(persons)
        // persons.push(results, true)
        // this.setState({
        //     persons:persons
        // })

        let persons = toJS(this.props.appStore.entryPersons)
        this.setState({
            persons: persons
        })

    }

    _addVideo(){

    }

    _delVideo(del_url){
        console.log(del_url)
        _fetch(DEL_RTMP_URL,{
            url : del_url
        },(json)=>{
            console.log(json)
            let urls = json.result.url
            console.log(urls)
            this.setState({
                src: urls
            },()=>{
                console.log(this.state.src[0])
                this.state.src.map((item, i)=>{
                    let options_1 = {
                        autoplay:    true,
                        controls:    true,
                        preload:     true, //预加载
                        fluid:       false, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                        // aspectRatio: '16:9',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                        techOrder:   ['html5'],//Video.js技术首选的顺序
                        live: true,
                        sources: [{
                            type: "application/x-mpegURL",
                            src: item,
                            withCredentials: false
                        }],
                        html5: { hls: { withCredentials: false } },
                    }

                    let player = video(`example_video_${i}`,options_1);
                    player.reset();
                    player.src({
                        type: "application/x-mpegURL",
                        src: item,
                        withCredentials: false
                    })
                    player.load();
                    player.play();
                })
            })
        })
    }

    componentDidMount() {

        let url_socket = `${url}/Camera_Web_ws`

        //本机测试 用固定 url
        console.log('长连接 服务器')
        // this.socket_cam = io(url_socket)
        // this.socket_cam.on('new_state',this._ws_new_state)
        this.start_time = new Date().getTime()
        // this.timer = setInterval(this._update_track_data, 10000);
        // this.socket_cam.on('new_person_state',this._ws_new_person_state);

        let show_cam_0 = localStorage.getItem("show_cam_0") || true
        let show_cam_1 = localStorage.getItem("show_cam_1") || true
        this.setState({
            show_cam_0,
            show_cam_1
        }, ()=>{
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

            let options_1 = {
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
                    src: "rtmp://192.168.88.197:1935/hls/001",
                }],
            }

            let options_2 = {
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
                    src: "rtmp://192.168.88.197:1935/hls/002",
                }],
            }

            let options_3 = {
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
                    src: "rtmp://192.168.88.221:1935/hls/003",
                }],
            }

            if (this.state.show_cam_0){
                let player = video(`example_video_0`,options);
                let player_1 = video(`example_video_1`,options_1);
            }
            if (this.state.show_cam_1){
                let player_2 = video(`example_video_2`,options_2);
                let player_3 = video(`example_video_3`,options_3);
            }
        })



    }

    handleSubmit = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err)
                message.warning('请先填写正确的表单')
            } else {
                let { ip } = values
                if (ip == "192.168.88.27"){
                    this.setState({
                        show_cam_0 : true
                    }, ()=>{
                        localStorage.setItem('show_cam_0', true);

                        let options = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '1:1',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/000",
                            }],
                        }

                        let options_1 = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '3:2',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/002",
                            }],
                        }

                        let options_2 = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '1:1',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/001",
                            }],
                        }

                        let options_3 = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '3:2',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/003",
                            }],
                        }

                        if (this.state.show_cam_0){
                            let player = video(`example_video_0`,options);
                            let player_1 = video(`example_video_1`,options_1);
                        }
                    })
                }else if (ip == "192.168.88.67"){
                    this.setState({
                        show_cam_1 : true
                    }, ()=>{
                        localStorage.setItem('show_cam_1', true);

                        let options = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '1:1',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/000",
                            }],
                        }

                        let options_1 = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '3:2',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/002",
                            }],
                        }

                        let options_2 = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '1:1',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/001",
                            }],
                        }

                        let options_3 = {
                            autoplay:    true,
                            controls:    true,
                            preload:     true, //预加载
                            fluid:       true, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                            techOrder:   ['flash'],//Video.js技术首选的顺序
                            aspectRatio: '3:2',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                            flash: { swf: videoSWF },
                            live: true,
                            sources: [{
                                type: "rtmp/flv",
                                src: "rtmp://192.168.88.221:1935/hls/003",
                            }],
                        }

                        if (this.state.show_cam_1){
                            let player_2 = video(`example_video_2`,options_2);
                            let player_3 = video(`example_video_3`,options_3);
                        }
                    })
                }
                // _fetch(ADD_RTMP_URL, {url:ip}, (json)=>{
                //     if (json.code != 200){
                //         message.error(json.message)
                //     }else {
                //         message.success('添加成功')
                //         let urls = json.result.url
                //         console.log(urls)
                //         this.setState({
                //             src: urls
                //         },()=>{
                //             console.log(this.state.src[0])
                //             this.state.src.map((item, i)=>{
                //                 let options_1 = {
                //                     autoplay:    true,
                //                     controls:    true,
                //                     preload:     true, //预加载
                //                     fluid:       false, //播放器将具有流畅的大小。换句话说，它将扩展以适应其容器
                //                     aspectRatio: '16:9',//将播放器置于流体模式，在计算播放器的动态大小时使用。由冒号（"16:9"或"4:3"）分隔的两个数字
                //                     techOrder:   ['html5'],//Video.js技术首选的顺序
                //                     live: true,
                //                     sources: [{
                //                         type: "rtmp/flv",
                //                         src: item,
                //                         withCredentials: false
                //                     }],
                //                     html5: { hls: { withCredentials: false } },
                //                 }
                //
                //                 let player = video(`example_video_${i}`,options_1);
                //                 player.reset();
                //                 player.src({
                //                     type: "rtmp/flv",
                //                     src: item,
                //                     withCredentials: false
                //                 })
                //                 player.load();
                //                 player.play();
                //             })
                //         })
                //     }
                // })
            }
        });
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
        this.handleSubmit(e)

    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentWillUnmount() {
        for (let i=0; i< 4; i++){
            let player = video(`example_video_${i}`);
            console.log(`dispose example_video_${i}`)
            player.dispose()
        }
        // this.socket_cam.disconnect()
        // this.socket_cam.emit('disconnect')
        this.timer && clearInterval(this.timer)
    }

    waring_img_history = (persons_arr, length)=>{
        //倒叙
        let persons_arr_cp = deepCopy(persons_arr)
        let persons = persons_arr_cp.data
        persons.reverse()
        let persons_history = persons.map((person, i)=>{
            // let color = trackerColoreMap[persons.length-1-i]
            let color = person.rec ? "cyan" : "red"
            if (Math.abs(person.id) != 1 ){
                color = personIDColreMap[[person.id]]
            }else if(person.hasOwnProperty('trackID')){
                color = trackerColoreMap[Math.abs(person.trackID) % trackerColoreMap.length]
            }

            return (
                <Col span={24/length} style={{position:'relative', marginTop:10}}>
                    <Tag color={color} style={styles.waring_tag} >
                        {person.name}
                    </Tag>
                    <Tag color={color} style={{position: 'absolute',
                        bottom:0,
                        right:0}} >
                        {person.date}
                    </Tag>
                    <Tag color={color} style={{position: 'absolute',
                        bottom:0,
                        left:8}} >
                        {`${get_2_float(person.score)}`}
                    </Tag>
                    {/*<img width={"100%"} height={130 / 3 * 2} src={`${url}${person.img}`} style={{}}/>*/}
                    <img width={"100%"} height={120} src={`${url}${person.img}`} style={{}}/>
                </Col>
            )
        })

        let person_back = (
            <Col span={24/length} style={{position:'relative',}}>
                {/*<div width={"100%"} height={130} src={back} style={{width:'100%', height: 130 /3 * 2, background:'clear'}}/>*/}
                <div style={{width:'100%', height: 130 / 3 * 2, background:'clear'}}/>
            </Col>
        )

        return persons_history.length > 0 ? persons_history : person_back
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };

        // let style_tmp = (this.state.show_cam_0 && this.state.show_cam_1) ? {} : {height:1080*screen_scale_height}

        let style_tmp = (this.state.show_cam_0 && this.state.show_cam_1) ? {height:840/0.75*screen_scale_width} : {height:1080*screen_scale_height}


        return (
            <Template classTag={'Student'} current_page={1} history={this.props.history}
                      style={{...{flexDirection:'column',}, ...style_tmp}}
                      new_state={this._ws_new_state}
            >
                {/*<Button type="primary" style={{marginLeft:10, position:'absolute', top:20*screen_scale_height, right:25}} onClick={this.showModal}>*/}
                {/*    添加设备*/}
                {/*</Button>*/}
                <div className="Mode_1" style={styles.wrap_div}>
                    <Modal
                        title="设备地址"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Form layout='horizontal' style={{margin: '0 auto'}} onSubmit={this.handleSubmit}>
                            <FormItem label='ip: ' {...formItemLayout}>
                                {
                                    getFieldDecorator('ip', {
                                        initialValue:"",
                                        rules: [
                                            {
                                                pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
                                                required: true,
                                                message: '请输入正确的ip 地址'
                                            }
                                        ]
                                    })(
                                        <Input />
                                    )
                                }
                            </FormItem>
                        </Form>
                    </Modal>
                    <Row gutter={0} >
                        <Col span={23}
                             className={'ls_content_div'}
                             style={{
                                 // paddingLeft:10,
                                 margin:"0px 20px",
                                 display:"flex",
                                 flexDirection:"column",
                             }}
                        >
                            {
                                this.state.show_cam_0 ? <div style={{paddingLeft:10, width:"100%", position:"relative", marginTop:10, display:'flex', justifyContent:'space-between'}} >
                                    <div style={{width: `${fish_video_width}%`, position: "relative", marginRight: "2%",}}>
                                        <Tag color={'#FA0F21'} style={{position: 'absolute', top: 10, left: 10, zIndex: 99}}
                                             closable>
                                            {`枪机 0`}
                                        </Tag>
                                        <video id={`example_video_0`} className="video-js vjs-default-skin video_0" preload="auto"
                                               autoPlay="autoplay"
                                            // style={{width:'100%', height:content_1_height,
                                               style={{
                                                   width: '100%',
                                                   // objectFit:"fill"
                                                   // objectFit:'contain'
                                               }}
                                               ref={(input) => {
                                                   this.video = input;
                                               }}

                                        >
                                            <source src="rtmp://192.168.88.221:1935/hls/room" type="rtmp/flv"/>
                                        </video>
                                    </div>
                                    <div style={{width: `${perimeter_video_width}%`, position: "relative", }}>
                                        <Tag color={'#FA0F21'} style={{position: 'absolute', top: 10, left: 10, zIndex: 99}}
                                             closable>
                                            {`枪机 1`}
                                        </Tag>
                                        <video id={`example_video_1`} className="video-js vjs-custom-skin video_0" preload="auto"
                                               autoPlay="autoplay" data-setup=''
                                            // style={{width:'100%', height:content_1_height,
                                               style={{
                                                   width: '100%',
                                                   // objectFit:"fill"
                                                   // objectFit:'contain'
                                               }}
                                            // ref={(input) => { this.video = input; }}

                                        >
                                            <source src="rtmp://192.168.88.221:1935/hls/room" type="rtmp/flv"/>
                                        </video>
                                    </div>
                                </div> : null
                            }
                            {
                                this.state.show_cam_1 ? <div style={{paddingLeft:10, width:"100%", position:"relative", marginTop:10, display:'flex', justifyContent:'space-between'}} >
                                    <div style={{width: `${fish_video_width}%`, position: "relative", marginRight: "2%"}}>
                                        <Tag color={'#FA0F21'} style={{position: 'absolute', top: 10, left: 10, zIndex: 99}}
                                             closable>
                                            {`枪机 2`}
                                        </Tag>
                                        <video id={`example_video_2`} className="video-js vjs-default-skin video_0" preload="auto"
                                               autoPlay="autoplay"
                                            // style={{width:'100%', height:content_1_height,
                                               style={{
                                                   width: '100%',
                                                   // objectFit:"fill"
                                                   // objectFit:'contain'
                                               }}
                                               ref={(input) => {
                                                   this.video = input;
                                               }}

                                        >
                                            <source src="rtmp://192.168.88.221:1935/hls/room" type="rtmp/flv"/>
                                        </video>
                                    </div>
                                    <div style={{width: `${perimeter_video_width}%`, position: "relative", zIndex:-1}}>
                                        <Tag color={'#FA0F21'} style={{position: 'absolute', top: 10, left: 10, zIndex: -1}}
                                             closable>
                                            {`枪机 3`}
                                        </Tag>
                                        <video id={`example_video_3`} className="video-js vjs-custom-skin video_0" preload="auto"
                                               autoPlay="autoplay" data-setup=''
                                            // style={{width:'100%', height:content_1_height,
                                               style={{
                                                   width: '100%',
                                                   // objectFit:"fill"
                                                   // objectFit:'contain'
                                               }}
                                            // ref={(input) => { this.video = input; }}

                                        >
                                            <source src="rtmp://192.168.88.221:1935/hls/room" type="rtmp/flv"/>
                                        </video>
                                    </div>
                                </div> : null
                            }
                        </Col>
                    </Row>
                </div>
            </Template>
        )
    }
}

export default Student_analyze