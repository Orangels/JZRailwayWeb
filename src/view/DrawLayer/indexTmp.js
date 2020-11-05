import React from 'react'
import Template from '../../common/composite_template'
import {screen_scale_width, screen_scale_height} from "../parameter/parameters";
import entry from '../../asset/test/entry.jpg'
import gather from '../../asset/test/gather.jpg'


import {message, Row, Col, Button, Tabs} from "antd";
import {_fetch, deepCopy} from "../../common/utils";

import './drawLayer.less'

const canvasWidht = 742.39/0.75*screen_scale_width
const canvasHeight = 742.39/0.75*screen_scale_width/16*9


const { TabPane } = Tabs;



const styles = {
    wrap_div:{
        marginTop:96*screen_scale_width,
        marginLeft:30*screen_scale_width,
        marginRight:30*screen_scale_width
        // background:`url(${bg}) no-repeat `,
        // backgroundSize: '100% 100%',
        // transition:'all .5s'
    },
    content_1_1:{
        display:'flex',
        flexDirection:'column',
        border:"dashed 1px #EA7D3C",
        borderRadius:20,
        height:880*screen_scale_width,
        padding: "10px 0px",
        alignItems:'center',
        // overflow:'scroll'

    },
    content_2:{
        display:'flex',
        flexDirection:'row',
        marginTop: 20*screen_scale_height
    },
    content_2_2:{
        display:'flex',
        flexDirection:'column',
        marginLeft: 20*screen_scale_width
    }

}

export default class DrawLayer extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgs:[
                // {
                //     "heatMap":{
                //         src:entry,
                //         polygon:[],
                //         selectPoly: -1
                //     },
                //     "hesitate":{
                //         src:entry,
                //         polygon:[],
                //         selectPoly: -1,
                //         duration:120
                //     },
                //     "counting":{
                //         src:entry,
                //         polygon:[],
                //         selectPoly: -1
                //     }
                //
                //
                // },
                {
                    src:gather,
                    polygon:[],
                    selectPoly: -1
                },
                {
                    src:gather,
                    polygon:[],
                    selectPoly: -1
                },
                {
                    src:entry,
                    polygon:[],
                    selectPoly: -1
                },
                {
                    src:entry,
                    polygon:[],
                    selectPoly: -1
                },
            ],
            selectImg:{
                index:0,
                src:entry,
                polygon:[],
                selectPoly: -1
            },
            selectBtn : -1,
            // selectPoly: -1

        };

        this.defaultStatus = {
            polygon:[],
            selectPoly:-1
        }
        this.polygon = []
        this.selectPoints = []

        this.isDrawPolygoning = false
        this.isDragging = false
        this.polygonCompile = false
        this.addPolygonCompile = false

        this.lineCompile = false
        this.calibrationNum = 10



        this._updateBackground = this._updateBackground.bind(this)
        this._initCanvas = this._initCanvas.bind(this)
        this.drawPolygon = this.drawPolygon.bind(this)
        this.fillPolygon = this.fillPolygon.bind(this)
        this.isInPolygon = this.isInPolygon.bind(this)
        this.rayCasting = this.rayCasting.bind(this)
        this.addToPolygon = this.addToPolygon.bind(this)
        this.clickPoint = this.clickPoint.bind(this)
        this.dragCircle = this.dragCircle.bind(this)
        this.stopDragging = this.stopDragging.bind(this)
        this._changeTab = this._changeTab.bind(this)
        this._btnConfirm = this._btnConfirm.bind(this)
        this._btnCancel = this._btnCancel.bind(this)
    }

    _changeTab(key) {
        console.log(key)
    }

    _selectImage(index, e){

        if (this.addPolygonCompile || this.polygonCompile){
            message.warning("请先退出编辑状态")
            return
        }
        console.log(this.state.selectImg)
        // this._btnCancel()
        let imgsObjs = deepCopy(this.state.imgs)
        imgsObjs[this.state.selectImg.index].polygon = deepCopy(this.polygon)
        imgsObjs[this.state.selectImg.index].selectPoly = this.state.selectImg.selectPoly
        console.log(imgsObjs)

        let selectImgTmp = {
            index:index,
            src:this.state.imgs[index].src,
            polygon:deepCopy(this.state.imgs[index].polygon),
            selectPoly: this.state.imgs[index].selectPoly,
        }
        this.setState({
            selectImg: selectImgTmp,
            imgs:imgsObjs,
            selectBtn : -1,
        }, ()=>{
            console.log(this.state.imgs)
            console.log(this.state.selectImg)
            this.polygon = deepCopy(this.state.selectImg.polygon)

            let canvas = document.getElementById('ls_tracker_canvas');
            let context = canvas.getContext('2d');
            requestAnimationFrame(() => {
                // fillPolygon(polygon, context, 300, 300)
                this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
            })
        })

    }


    _updateBackground(e){
        message.error('更新失败, 服务器不可用');
    }

    _initCanvas(nodeID){
        let canvas = document.getElementById(nodeID);
        let context = canvas.getContext('2d');

        this.polygon = this.state.imgs[this.state.selectImg.index].polygon

        canvas.onclick = (e) => {
            if (!this.polygonCompile && this.addPolygonCompile) {
                console.log(e.clientX)
                console.log(e.target.offsetLeft)
                console.log(e)

                let x = e.layerX
                let y = e.layerY

                if (!this.isDrawPolygoning) {
                    this.isDrawPolygoning = true
                    this.polygon.push([])
                    this.polygon[this.polygon.length - 1].push({x, y})
                    this.polygon[this.polygon.length - 1].push({x, y})
                } else {

                    let polygon = this.polygon[this.polygon.length - 1]
                    let startPoint = polygon[0]

                    let calTmp = Math.sqrt(Math.pow(startPoint.x - x, 2) + Math.pow(startPoint.y - y, 2))

                    if (calTmp < this.calibrationNum) {
                        polygon[polygon.length - 1] = {x: startPoint.x, y: startPoint.y}
                        this.isDrawPolygoning = false

                        requestAnimationFrame(() => {
                            // fillPolygon(polygon, context, 300, 300)
                            this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                        })

                        // 封闭多边形, 进入 compile
                        this.polygonCompile = true
                        this.addPolygonCompile = false

                    } else {
                        this.polygon[this.polygon.length - 1].push({x, y})
                    }
                }

                canvas.onmousemove =  (e)=>{
                    if (this.isDrawPolygoning) {
                        let polygon = this.polygon[this.polygon.length - 1]
                        let move_x = e.layerX
                        let move_y = e.layerY
                        polygon[polygon.length - 1] = {x: move_x, y: move_y}
                        this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
                    }

                }
            }

        }

        canvas.onmousedown = (e) =>{
            if (this.polygonCompile){
                let selectImg = deepCopy(this.state.selectImg)
                let isInPloy = false
                if (this.polygon.length > 0){
                    for (let i = 0 ; i < this.polygon.length; i++){
                        // let isInPloy = this.isInPolygon(point, polygon[i].slice(0, polygon[i].length-1))
                        isInPloy = this.rayCasting({x:e.layerX, y:e.layerY}, this.polygon[i].slice(0, this.polygon[i].length-1))
                        console.log(isInPloy)
                        selectImg.selectPoly = i
                        if (isInPloy){
                            this.setState({
                                selectImg
                            },()=>{
                                console.log(this.state.selectImg)
                                this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                            })
                            break
                        }
                    }
                }

                if (!isInPloy){
                    console.log('********')
                    selectImg.selectPoly = -1
                    this.setState({
                        selectImg
                    }, ()=>{
                        this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                    })

                }

                this.isDragging = true
                this.clickPoint(e)
                canvas.onmousemove = this.dragCircle.bind(this, context)

            }
        }

        canvas.onmouseup = (e)=>{
            if (this.polygonCompile){
                this.stopDragging(e)
            }
        }

        canvas.onmouseout = (e)=>{
            if (this.polygonCompile){
                this.stopDragging(e)
            }
        }



    }

    clickPoint(e){

        let x = e.layerX
        let y = e.layerY

        let selectOver = false

        for (let i =0; i < this.polygon.length; i ++){
            for (let j = 0; j < this.polygon[i].length; j ++){
                let polygon = this.polygon[i]
                let point = polygon[j]

                let distance = Math.sqrt(Math.pow(point.x-x, 2) + Math.pow(point.y-y, 2))
                if (distance < 5){
                    if (j == 0){
                        this.selectPoints.push([i, this.polygon[i].length-1])
                    }
                    this.selectPoints.push([i, j])
                    selectOver = true
                    break
                }
            }
            if (selectOver){
                break
            }
        }
    }

    stopDragging(e){
        this.isDragging = false
        this.selectPoints = []
    }

    dragCircle(context, e){
        if (this.isDragging){

            let x = e.layerX
            let y = e.layerY

            this.selectPoints.forEach((selectPoint, index)=>{
                let indexX = selectPoint[0]
                let indexY = selectPoint[1]
                this.polygon[indexX][indexY] = {x, y}
            })
            this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
        }
    }

    addToPolygon(trackerObjs, ctx, canWidth, canHeight) {
        requestAnimationFrame(()=>{
            this.drawPolygon(trackerObjs, ctx, canWidth, canHeight)
        })
    }


    fillPolygon(polygon, ctx, canWidth, canHeight) {

        let colorMap = 'rgba(21, 255, 72, 0.2)'

        ctx.lineWidth = 2
        ctx.beginPath()
        for (let i = 0; i < polygon.length-1; i ++){

            let startPoint = polygon[i]
            let endPoint = polygon[i+1]
            // ctx.moveTo(startPoint.x, startPoint.y)
            ctx.lineTo(startPoint.x, startPoint.y)
            ctx.lineTo(endPoint.x, endPoint.y)
            ctx.strokeStyle = colorMap
            ctx.lineCap = 'round'
            ctx.lineJoin = 'round'
            ctx.stroke()

        }
        ctx.closePath();
        ctx.fillStyle = ctx.strokeStyle
        ctx.fill();


    }

    drawPolygon(trackerObjs, ctx, canWidth, canHeight) {
        // let colorMap = ['#297E0D', '#7E0D08']
        let colorMap = ['#15FF48']
        ctx.clearRect(0,0,canWidth,canHeight);

        trackerObjs.forEach((polygon, i)=>{
            if (i == this.state.selectImg.selectPoly){
                this.fillPolygon(polygon, ctx, canWidth, canvasHeight)
            }else {
                for (let i = 0; i < polygon.length-1; i ++){
                    ctx.beginPath()
                    ctx.lineWidth = 2
                    let startPoint = polygon[i]
                    let endPoint = polygon[i+1]

                    ctx.moveTo(startPoint.x, startPoint.y)
                    ctx.lineTo(endPoint.x, endPoint.y)

                    ctx.strokeStyle = colorMap[i % 1]

                    ctx.lineCap = 'round'
                    ctx.lineJoin = 'round'
                    ctx.stroke()
                }
            }
        })

    }

    isInPolygon(checkPoint, polygonPoints) {
        let counter = 0;
        let i;
        let xinters;
        let p1, p2;
        let pointCount = polygonPoints.length;
        p1 = polygonPoints[0];

        for (i = 1; i <= pointCount; i++) {
            p2 = polygonPoints[i % pointCount];
            if (
                checkPoint[0] > Math.min(p1[0], p2[0]) &&
                checkPoint[0] <= Math.max(p1[0], p2[0])
            ) {
                if (checkPoint[1] <= Math.max(p1[1], p2[1])) {
                    if (p1[0] != p2[0]) {
                        xinters =
                            (checkPoint[0] - p1[0]) *
                            (p2[1] - p1[1]) /
                            (p2[0] - p1[0]) +
                            p1[1];
                        if (p1[1] == p2[1] || checkPoint[1] <= xinters) {
                            counter++;
                        }
                    }
                }
            }
            p1 = p2;
        }
        if (counter % 2 == 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * @description 射线法判断点是否在多边形内部
     * @param {Object} p 待判断的点，格式：{ x: X坐标, y: Y坐标 }
     * @param {Array} poly 多边形顶点，数组成员的格式同 p
     * @return {String} 点 p 和多边形 poly 的几何关系
     */
    rayCasting(p, poly) {
        let px = p.x,
            py = p.y,
            flag = false

        for(let i = 0, l = poly.length, j = l - 1; i < l; j = i, i++) {
            let sx = poly[i].x,
                sy = poly[i].y,
                tx = poly[j].x,
                ty = poly[j].y

            // 点与多边形顶点重合
            if((sx === px && sy === py) || (tx === px && ty === py)) {
                return true
            }

            // 判断线段两端点是否在射线两侧
            if((sy < py && ty >= py) || (sy >= py && ty < py)) {
                // 线段上与射线 Y 坐标相同的点的 X 坐标
                var x = sx + (py - sy) * (tx - sx) / (ty - sy)

                // 点在多边形的边上
                if(x === px) {
                    return true
                }

                // 射线穿过多边形的边界
                if(x > px) {
                    flag = !flag
                }
            }
        }

        // 射线穿过多边形边界的次数为奇数时点在多边形内
        return flag
    }

    componentDidMount() {
        this._initCanvas("ls_tracker_canvas")
    }

    componentWillUnmount() {

    }

    _btnClick(index){
        if (index != 2){
            this.setState({
                selectBtn:index
            })
        }

        if (index == 0){
            this.addPolygonCompile = true
            this.polygonCompile = false
        }
        else if (index == 1) {
            this.polygonCompile = true
            this.addPolygonCompile = false
        }
        else if (index == 2){
            if (this.state.selectImg.selectPoly != -1){

                this.polygon.splice(this.state.selectImg.selectPoly, 1)
                let selectImgTmp = deepCopy(this.state.selectImg)
                let imgsTmp = deepCopy(this.state.imgs)
                selectImgTmp.polygon = this.polygon
                selectImgTmp.selectPoly = -1
                imgsTmp[[selectImgTmp.index]].polygon = this.polygon

                this.defaultStatus = {
                    polygon:deepCopy(this.polygon),
                    selectPoly:-1
                }

                this.setState({
                    selectImg:selectImgTmp,
                    imgs:imgsTmp,
                },()=>{
                    let canvas = document.getElementById('ls_tracker_canvas');
                    let context = canvas.getContext('2d');
                    requestAnimationFrame(()=>{
                        this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                    })
                })

            }else {
                message.warning("请先选择组件")
            }
        }

    }

    _btnConfirm(e){
        this.setState({
            selectBtn:-1
        })
        this.polygonCompile = false
        this.addPolygonCompile = false

        this.defaultStatus = {
            polygon:deepCopy(this.polygon),
            selectPoly:this.state.selectImg.selectPoly
        }
        let selectImg = deepCopy(this.state.selectImg)

        this.setState({
            selectImg:{...selectImg, ...{polygon: this.polygon,}}
        }, ()=>{
            console.log(this.state.selectImg)
        })
    }

    _btnCancel(e){

        this.isDrawPolygoning = false
        this.isDragging = false
        this.polygonCompile = false
        this.addPolygonCompile = false

        let canvas = document.getElementById('ls_tracker_canvas');
        let context = canvas.getContext('2d');

        this.setState({
            selectBtn:-1
        })

        this.polygon = deepCopy(this.defaultStatus.polygon)
        let selectImg = deepCopy(this.state.selectImg)
        selectImg.selectPoly = this.defaultStatus.selectPoly
        this.setState({
            selectImg
        }, ()=>{
            requestAnimationFrame(()=>{
                this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
            })
        })
    }

    render() {

        let imgsComponent = this.state.imgs.map((val, index)=>{

            let borderStyle = index == this.state.selectImg.index ? {border:'solid 2px #1AAD53'} : {}

            return (
                <img src={val.src} width={'95%'} style={{...{marginTop:30*screen_scale_width, borderRadius:10, cursor:'pointer',},
                    ...borderStyle
                }} onClick={this._selectImage.bind(this, index)}
                />
            )
        })

        let btnText = ['添加区域', '修改区域', '删除区域']

        let DrawBtn = btnText.map((val, index)=>{
            let btnType = this.state.selectBtn == index ? 'danger' : 'primary'
            let btnDisable = true
            if (this.state.selectBtn == -1){
                btnDisable = false
            } else {
                btnDisable = this.state.selectBtn == index ? false : true
            }

            let colorStyle = btnDisable ? {color:'#7E0D08'} : {}

            return (
                <Button style={{...{width:'50%',}, ...colorStyle}} type={btnType} disabled={btnDisable}
                        onClick={this._btnClick.bind(this, index)}
                >{val}</Button>
            )
        })

        return (
            <Template classTag={'Config'} current_page={2} history={this.props.history}
                      style={{flexDirection:'column', height:1080*screen_scale_height}}
            >

                <Row className={'drawLayer'} gutter={12} style={styles.wrap_div} type="flex" justify="space-around" align="middle" >
                    <Col span={7} style={styles.content_1_1}>
                        <Button type="danger" style={{width:'60%'}} onClick={this._updateBackground}>
                            更新底图
                        </Button>
                        <div className={'showImage'} style={{display:'flex', flexDirection:'column', overflow:'scroll',
                            marginTop:10*screen_scale_width, alignItems:'center'
                        }}>
                            {imgsComponent}
                        </div>
                    </Col>
                    <Col span={16} style={styles.content_1_1}>
                        <div style={{position:'relative', display:'flex', flexDirection:"column", alignItems:'center'}}>
                            <img src={this.state.selectImg.src} width={'80%'} />
                            <canvas id="ls_tracker_canvas" width={canvasWidht}
                                    height={canvasHeight}
                                    style={{
                                        zIndex: 99,
                                        position:"absolute", top:0,left:'10%'
                                    }}/>
                        </div>
                        <Tabs defaultActiveKey="1" onChange={this._changeTab} style={{width:'100%', padding:"5px 20px"}} type="card">
                            <TabPane tab="热力图" key="heatMap">
                                <Row type="flex" justify="space-around"
                                     style={{backgroundColor:'#CECECE', height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                    <Col span={6} style={{display:'flex', flexDirection:'column', justifyContent:'space-around',
                                        height:'100%'
                                    }}>
                                        {DrawBtn}
                                    </Col>
                                    <Col span={11}>
                                    </Col>
                                    <Col span={6} style={{display:'flex', justifyContent:'space-around',
                                        height:'100%', marginTop:10*screen_scale_width
                                    }}>
                                        <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="primary"
                                                onClick={this._btnConfirm}
                                        >确定</Button>
                                        <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="danger"
                                                onClick={this._btnCancel}
                                        >取消</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="驻留观察" key="hesitate">
                                <Row style={{backgroundColor:'#CECECE', height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                </Row>
                            </TabPane>
                            <TabPane tab="卡口技术" key="counting">
                                <Row style={{backgroundColor:'#CECECE', height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                </Row>
                            </TabPane>
                        </Tabs>,
                    </Col>
                </Row>
            </Template>
        )
    }

}