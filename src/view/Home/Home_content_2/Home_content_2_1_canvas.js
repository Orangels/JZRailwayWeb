import React from 'react';
import { inject, observer } from 'mobx-react/index'
import { toJS , autorun} from 'mobx'
import { Checkbox } from 'antd';
import  Heatmap  from 'heatmap.js';
import {screen_scale_height, screen_scale_width, trackerColoreMap, personIDColreMap} from "../../parameter/parameters";

import { imgWidht, imgHeight, iconWidth, iconHeight, heatMapMaxValue, trackerMaxValue } from "../../parameter/home_content_2_1_parametere_data"

import {deepCopy, randomNum} from '../../../common/utils'
import xxs from "../../../asset/test/xxs_icon.jpg";
import wzh from "../../../asset/test/wzh_icon.jpg";
import ls from "../../../asset/test/ls_icon.jpg";
import None_person from "../../../asset/test/none_person.jpg";
import back from "../../../asset/test/world_clear.jpg";
import back_tmp from "../../../asset/test/back.jpg";

import './Home_content_2_1_canvas.css'

const CheckboxGroup = Checkbox.Group;
let plainOptions = ['显示轨迹', '显示热力图'];

const clearImgWidth = 30

@inject('appStore') @observer
class Home_content_2_1_canvas extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            // img: 'http://192.168.88.221:5000/static/staticPic/back.jpg'
            checkedList:[]
        };
        this._checkBoxOnChange = this._checkBoxOnChange.bind(this)

        this._drawImage = this._drawImage.bind(this);
        this._update_data = this._update_data.bind(this)
        this._getColor = this._getColor.bind(this)
        this._drawPoint = this._drawPoint.bind(this)
        this._addToPoint = this._addToPoint.bind(this)
        this._addToTracker = this._addToTracker.bind(this)
        this._drawTracker = this._drawTracker.bind(this)
        this._draw = this._draw.bind(this)
    }

    _checkBoxOnChange(checkedList) {
        this.setState({
            checkedList,
        });
    }

    /**
     * 模拟实时更新数据
     * */
    _update_data(rect) {
        let rect_center = deepCopy(rect)
        let rect_tmp = rect.map((val, index)=>{
            val.x = Math.ceil(val.x*imgWidht)-iconWidth/2
            val.y = Math.ceil(val.y*imgHeight)-iconHeight
            val.PersonID = Math.abs(val.PersonID)
            val.trackID = Math.abs(val.trackID)
            return val
        })

        rect_center = rect_center.map((val, index)=>{
            val.x = Math.ceil(val.x*imgWidht)
            val.y = Math.ceil(val.y*imgHeight)
            val.PersonID = Math.abs(val.PersonID)
            val.trackID = Math.abs(val.trackID)
            return val
        })

        // let rect_tmp = [
        //     {
        //         x:randomNum(1, imgWidht/2),
        //         y:randomNum(1, imgHeight/2),
        //         PersonID:420,
        //         trackID:0,
        //     },
        //     {
        //         x:randomNum(imgWidht/2, imgWidht),
        //         y:randomNum(imgHeight/2, imgHeight),
        //         PersonID:421,
        //         trackID:1,
        //     }
        // ]
        this._drawImage(rect_tmp, false)
        this._addToTracker(rect_center, trackerMaxValue)
        this._addToPoint(deepCopy(rect_center))
    }

    _draw(){

        this.imgageIcomCoors = toJS(this.props.appStore.imgageIcomCoors || [])
        // //heatMap
        this.heatMapPoints = toJS(this.props.appStore.heatMapPoints || {});
        // //tracker
        this.trackIDsArr = toJS(this.props.appStore.trackIDsArr || {})
        //
        this.trackerArr = toJS(this.props.appStore.trackerArr || [])

        // this.trackerTimestamp = this.props.appStore.trackerTimestamp

        this._drawImage(this.imgageIcomCoors, false)
        this._drawPoint(this.heatMapPoints)
        this._drawTracker(this.trackerArr)
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
        // this.props.appStore.updateHeatMapPoints(this.heatMapPoints)
        // this.props.appStore.updateTrackIDsArr(this.trackIDsArr)
    }

    componentDidMount() {
        this.canvas = document.getElementById('lscanvas')
        this.canvas_tracker = document.getElementById('ls_tracker_canvas')
        // this.canvas_heatMap = document.getElementById('ls_heatmap_canvas')

        this.ctx = this.canvas.getContext('2d')
        this.ctx_tracker = this.canvas_tracker.getContext('2d')
        // this.canvas_heatMap = this.canvas_heatMap.getContext('2d')

        this.imgageIcomCoors = this.props.appStore.imgageIcomCoors || []
        //heatMap
        this.heatMapPoints = this.props.appStore.heatMapPoints || {}
        //tracker
        this.trackIDsArr = this.props.appStore.trackIDsArr || {}

        this.trackerArr = this.props.appStore.trackerArr || []

        this.rectCache = [];

        this.personIconDic = {
            420: ls,
            421: wzh,
            423: xxs,
            1: None_person
        }
        this._drawImage([], true)

        // init heatMap
        this.heatMap = Heatmap.create({

            container: document.getElementById('ls_heatmap_canvas'),

            // radius: 80,
            radius: 0,

            maxOpacity: .9,

            minOpacity: 0,

            blur: 1,

            // backgroundColor: '#0DEEFF',

            gradient: {

                '.1': '#32A933',

                '.2': '#3ACB49',

                '.4': '#94E149',

                '.82': '#CDDE40',

                '1': '#ED6B44'

            }

        });

        // this.timer = setInterval(this._update_data, 1000);
        // this.timer = setTimeout(this._update_data, 1000);

        // // draw img
        // autorun(()=>{
        //     this._drawImage(toJS(this.props.appStore.imgageIcomCoors), false)
        // })
        //
        // //draw tracker
        // autorun(()=>{
        //     // console.log('update draw tracker')
        //     // console.log(toJS(this.props.appStore.trackerArr))
        //     this._drawTracker(toJS(this.props.appStore.trackerArr))
        // })
        //
        // //draw heatMap
        // autorun(()=>{
        //     this._drawPoint(toJS(this.props.appStore.heatMapPoints))
        // })

    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    _getColor(intensity) {
        // var colors = ["#072933", "#2E4045", "#8C593B", "#B2814E", "#FAC268", "#FAD237"];
        let colors=[
            'rgba(255, 17, 5, 0.3)',
            'rgba(255, 142, 12, 0.3)',
            'rgba(255, 221, 11, 0.3)',
            // 'rgba(216, 255, 9, 0.4)',
            // 'rgba(21, 255, 72 ,0.5)',
            // 'rgba(18, 255, 233 ,0.5)'
        ];
        colors.reverse()
        return colors[Math.floor(intensity/2)];
    }

    _drawPoint(heatMapPoints) {
        let data = []
        for (let heatMapPoint in heatMapPoints){
            let result = {}
            result.x = heatMapPoints[heatMapPoint].x
            result.y = heatMapPoints[heatMapPoint].y
            result.value = heatMapPoints[heatMapPoint].value
            data.push(result)
        }

        this.heatMap.setData({

            max: heatMapMaxValue,

            data

        })
    }

    _addToPoint(trackerObjs) {
        for (let trackerPerson of trackerObjs){
            let {x, y} = trackerPerson
            if (!this.heatMapPoints[[x,y]]) {
                this.heatMapPoints[[x,y]] = {
                    x:x,
                    y:y,
                    value:1
                };
            } else if (this.heatMapPoints[[x,y]]< heatMapMaxValue) {
                this.heatMapPoints[[x,y]] = {
                    x:x,
                    y:y,
                    value: this.heatMapPoints[[x,y]].value + 1
                };
            }
        }
        this._drawPoint()
    }

    _drawImage(rect, init) {
        let personImgs = []
        // this.rectCache.forEach((val, index)=>{
        //     // console.log(index)
        //     this.ctx.clearRect(val.x, val.y, iconWidth+20, iconHeight+20);
        // })

        // let img = new Image();
        //
        // img.onload = () => {
        //
        //     // this.ctx.drawImage(img,0, 0, imgWidht, imgHeight);
        //
        //     this.rectCache.forEach((val, index)=>{
        //         // console.log(index)
        //         this.ctx.clearRect(val.x-20, val.y-20, iconWidth+40, iconHeight+40);
        //     })
        //
        //     personImgs.forEach((val, index)=>{
        //         // console.log(val)
        //         this.ctx.drawImage(val.img,val.x, val.y, iconWidth, iconHeight);
        //         // this._addToPoint(val.x, val.y)
        //     })
        // }
        // img.src = back;

        personImgs = rect.map((val, index)=> {
            let personImg = new Image()
            // console.log(val)
            personImg.src = this.personIconDic[val.PersonID]
            return {
                x:val.x,
                y:val.y,
                img:personImg
            }
        })

        if (personImgs.length > 0){
            personImgs[personImgs.length-1].img.onload = () =>{
                this.rectCache.forEach((val, index)=>{
                    // console.log(index)
                    // this.ctx.clearRect(val.x-clearImgWidth, val.y-clearImgWidth, iconWidth+2*clearImgWidth, iconHeight+2*clearImgWidth);
                })
                this.ctx.clearRect(0, 0, imgWidht, imgHeight)

                personImgs.forEach((val, index)=>{
                    // console.log(val)
                    this.ctx.drawImage(val.img,val.x, val.y, iconWidth, iconHeight);
                    // this._addToPoint(val.x, val.y)
                })
            }
        }else {
            this.rectCache.forEach((val, index)=>{
                // console.log(index)
                // this.ctx.clearRect(val.x-clearImgWidth, val.y-clearImgWidth, iconWidth+2*clearImgWidth, iconHeight+2*clearImgWidth);
            })
            this.ctx.clearRect(0, 0, imgWidht, imgHeight)
        }


        this.rectCache = rect
    }

    _addToTracker (trackerObjs, maxSize) {

        let trackerArr = {}

        for (let trackerPerson of trackerObjs){
            let trackID = trackerPerson['trackID']
            if (this.trackIDsArr.hasOwnProperty(trackID)){
                this.trackIDsArr[[trackID]].push({x:trackerPerson.x, y: trackerPerson.y, PersonID: trackerPerson.PersonID})
                this.trackIDsArr[[trackID]]= this.trackIDsArr[[trackID]].slice(-maxSize)
            }else {
                this.trackIDsArr[[trackID]]= [{x:trackerPerson.x, y: trackerPerson.y, PersonID: trackerPerson.PersonID}]
            }
            trackerArr[[trackID]] = deepCopy(this.trackIDsArr[[trackID]])
        }

        this._drawTracker(trackerArr)
    }

     _drawTracker(trackerObjs) {
        let colorMap = ['#297E0D', '#7E0D08']

        this.ctx_tracker.clearRect(0,0,imgWidht,imgHeight);
        for (let trackID in trackerObjs){
            let pointsArr = trackerObjs[trackID]
            for (let i = 0; i < pointsArr.length - 1; i ++){
                let startPoint = pointsArr[i]
                let endPoint = pointsArr[i+1]

                let personID = startPoint.PersonID

                this.ctx_tracker.lineWidth = 2
                this.ctx_tracker.beginPath()
                this.ctx_tracker.moveTo(startPoint.x, startPoint.y)
                this.ctx_tracker.lineTo(endPoint.x, endPoint.y)
                if (Math.abs(personID) != 1){
                    this.ctx_tracker.strokeStyle = personIDColreMap[[personID]]
                }else {
                    this.ctx_tracker.strokeStyle = trackerColoreMap[trackID % trackerColoreMap.length]
                }
                this.ctx_tracker.lineCap = 'round'
                this.ctx_tracker.lineJoin = 'round'
                this.ctx_tracker.stroke()
            }
        }
    }

    render() {
        return (
            <div style={{position: "relative"}} className={'Home_content_2_1_canvas'}>
                <div style={{position:'absolute', top:0, zIndex:99, color:'#FFFFFF',}}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedList}
                        onChange={this._checkBoxOnChange}
                    />
                </div>
                <div style={{position:'absolute', top:0, zIndex:99, right:0, backgroundColor:'#FFFFFF', padding:"0px 5px",
                    borderRadius:5
                }}>
                    {this.props.appStore.trackerTimestamp}
                </div>
                <img src={back} width={imgWidht} height={imgHeight} style={{zIndex:3}}/>
                <canvas id="lscanvas" width={imgWidht} height={imgHeight}
                        style={{border:'0px solid #FF1C1F', borderRadius:5, zIndex:29, position:"absolute", top:0}}>
                </canvas>
                <canvas id="ls_tracker_canvas" width={imgWidht} height={imgHeight}
                        style={{border:'0px solid #FF1C1F', borderRadius:5,
                            zIndex: this.state.checkedList.includes(plainOptions[0]) ? 39 : -1,
                            position:"absolute", top:0,
                        }}>
                </canvas>
                <div className={`ls_heatmap_canvas_wrap`} style={{position:"absolute", top:0,
                    // zIndex: this.state.checkedList.includes(plainOptions[1]) ? 19 : -1,
                }}>
                    <div id="ls_heatmap_canvas"
                         style={{border:'0px solid #FF1C1F', borderRadius:5,
                             zIndex: this.state.checkedList.includes(plainOptions[1]) ? 19 : -1,
                             position:"absolute", top:0,
                             width:imgWidht,
                             height:imgHeight
                         }} />
                </div>
            </div>

        )
    }
}

export default Home_content_2_1_canvas;