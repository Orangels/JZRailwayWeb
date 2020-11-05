import React from 'react'
import Template from '../../common/composite_template'
import {screen_scale_width, screen_scale_height} from "../parameter/parameters";
import entry from '../../asset/test/entry.jpg'
import gather from '../../asset/test/gather.jpg'


import {message, Row, Col, Button, Tabs, Form, Input} from "antd";
import {_fetch, deepCopy, get_2_float} from "../../common/utils";
import {GET_REMOTE_CONFIG, CHANGE_REMOTE_CONFIG, url, CAMERAIMGS} from '../../common/urls'
import {cameraParams, imgsDefault} from "./cameraParams"

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

const FormItem = Form.Item

@Form.create()
class DrawLayer extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            imgs:imgsDefault,
            selectImg:{
                index:0,
                src:`${url}/static/cameraImgs/gather.jpg`,
                polygon:[],
                direction:[],
                line:[],
                duration:[],
                parmasToken:"0",
                selectPoly: -1
            },
            selectBtn : -1,
            // selectPoly: -1
            cameraParams,
            selectTab:'heatMap'


        };

        this.defaultStatus = {
            polygon:[],
            parmasToken:[],
            selectPoly:-1,
            duration: 0
        }

        this.polygon_new = deepCopy(this.state.cameraParams.camera[[this.state.selectImg.index]][[this.state.selectTab]].params)
        console.log(this.polygon_new)

        this.polygon = []
        this.direction = []
        this.line = []
        this.duration = []
        this.parmasToken = []

        this.selectPoints = []

        this.isDrawPolygoning = false
        this.isDragging = false
        this.polygonCompile = false
        this.addPolygonCompile = false
        this.countintState = -1 // -1: no count 0: poly , 1: direction 2: line
        this.isDrawDirection = false
        this.isDrawLine = false

        this.calibrationNum = 10



        this._updateBackground = this._updateBackground.bind(this)
        this._initCanvas = this._initCanvas.bind(this)
        this._initCountintCanvas = this._initCountintCanvas.bind(this)
        this.drawPolygon = this.drawPolygon.bind(this)
        this.fillPolygon = this.fillPolygon.bind(this)
        this.rayCasting = this.rayCasting.bind(this)
        this.addToPolygon = this.addToPolygon.bind(this)
        this.addToLine = this.addToLine.bind(this)
        this.drawLine = this.drawLine.bind(this)
        this.drawArrows = this.drawArrows.bind(this)
        this.clickPoint = this.clickPoint.bind(this)
        this.dragCircle = this.dragCircle.bind(this)
        this.stopDragging = this.stopDragging.bind(this)
        this._drawCounting = this._drawCounting.bind(this)
        this._changeTab = this._changeTab.bind(this)
        this._btnConfirm = this._btnConfirm.bind(this)
        this._btnCancel = this._btnCancel.bind(this)
        this._updateRemoteConfig = this._updateRemoteConfig.bind(this)
        this._convertCoord = this._convertCoord.bind(this)
        this._syncRemoteConfig = this._syncRemoteConfig.bind(this)
    }

    _changeTab(key) {
        console.log(key)
        this.setState({
            selectTab: key
        }, ()=>{
            console.log(key)
            this.polygon = []
            this.parmasToken = []
            this._syncRemoteConfig()
            console.log(this.polygon)
            console.log(this.line)
            console.log(this.direction)
            console.log(this.state.imgs)
            if (key != "counting"){
                this._initCanvas("ls_tracker_canvas")
            }else {
                this.countintState = -1
                this._initCountintCanvas("ls_count_canvas")
            }

        })
    }

    _selectImage(index, e){

        if (this.addPolygonCompile || this.polygonCompile){
            message.warning("请先退出编辑状态")
            return
        }

        if (this.state.selectImg.index == index){
            return;
        }

        if (this.state.selectTab != "counting"){
            console.log(this.state.selectImg)
            // this._btnCancel()
            let imgsObjs = deepCopy(this.state.imgs)
            imgsObjs[this.state.selectImg.index].polygon = deepCopy(this.polygon)
            imgsObjs[this.state.selectImg.index].selectPoly = this.state.selectImg.selectPoly
            imgsObjs[this.state.selectImg.index].direction = deepCopy(this.state.selectImg.direction)
            imgsObjs[this.state.selectImg.index].line = deepCopy(this.state.selectImg.line)
            imgsObjs[this.state.selectImg.index].parmasToken = deepCopy(this.parmasToken)
            console.log(imgsObjs)

            let selectImgTmp = {
                index:index,
                src:this.state.imgs[index].src,
                polygon:deepCopy(this.state.imgs[index].polygon),
                selectPoly: this.state.imgs[index].selectPoly,
                direction: this.state.imgs[index].direction,
                line: this.state.imgs[index].line,
                duration: deepCopy(this.duration),
                parmasToken: this.state.imgs[index].paramsToken
            }
            this.setState({
                selectImg: selectImgTmp,
                imgs:imgsObjs,
                selectBtn : -1,
            }, ()=>{
                console.log(this.state.imgs)
                console.log(this.state.selectImg)
                this.polygon = deepCopy(this.state.selectImg.polygon)
                this.line = deepCopy(this.state.selectImg.line)
                this.direction = deepCopy(this.state.selectImg.direction)
                this.parmasToken = deepCopy(this.state.selectImg.parmasToken)

                this._syncRemoteConfig()

                let canvas = document.getElementById('ls_tracker_canvas');
                let context = canvas.getContext('2d');
                requestAnimationFrame(() => {
                    // fillPolygon(polygon, context, 300, 300)
                    this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                })
            })
        } else {

            console.log(this.state.selectImg)
            // this._btnCancel()
            let imgsObjs = deepCopy(this.state.imgs)
            console.log(imgsObjs)
            imgsObjs[this.state.selectImg.index].polygon = deepCopy(this.polygon)
            imgsObjs[this.state.selectImg.index].selectPoly = this.state.selectImg.selectPoly
            imgsObjs[this.state.selectImg.index].direction = deepCopy(this.direction)
            imgsObjs[this.state.selectImg.index].line = deepCopy(this.line)
            imgsObjs[this.state.selectImg.index].parmasToken = deepCopy(this.parmasToken)
            console.log(imgsObjs)

            let selectImgTmp = {
                index:index,
                src:this.state.imgs[index].src,
                polygon:deepCopy(this.state.imgs[index].polygon),
                selectPoly: this.state.imgs[index].selectPoly,
                direction: this.state.imgs[index].direction,
                line: this.state.imgs[index].line,
                duration: deepCopy(this.duration),
                parmasToken: this.state.imgs[index].paramsToken
            }
            this.setState({
                selectImg: selectImgTmp,
                imgs:imgsObjs,
                selectBtn : -1,
            }, ()=>{
                console.log(this.state.imgs)
                console.log(this.state.selectImg)
                this.polygon = deepCopy(this.state.selectImg.polygon)
                this.line = deepCopy(this.state.selectImg.line)
                this.direction = deepCopy(this.state.selectImg.direction)
                this.parmasToken = deepCopy(this.state.selectImg.parmasToken)

                this._syncRemoteConfig()

                let canvas = document.getElementById('ls_count_canvas');
                let context = canvas.getContext('2d');
                this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
                this.addToLine(this.line, context, canvasWidht, canvasHeight,1, 0)
                this.addToLine(this.direction, context, canvasWidht, canvasHeight,1, 1)
            })

        }



    }


    _updateBackground(e){
        _fetch(CAMERAIMGS, {}, (json)=>{
            if (json.code == 200){
                let imgs = deepCopy(this.state.imgs)
                let new_imgs = deepCopy(json.result)
                for (let i = 0; i < imgs.length; i++){
                    imgs[i].src = `${url}${new_imgs[i]}`
                }

                let selectImg = this.state.selectImg
                selectImg.src = imgs[[selectImg.index]].src
                this.setState({
                    imgs:imgs,
                    selectImg: selectImg
                }, ()=>{
                    message.success('加载图片成功')
                })
            }else {
                message.error('更新失败, 服务器不可用');
            }
        })

    }

    _initCountintCanvas(nodeID, mode=0){
        /**
         *
         * @type mode : 0 poly 1: counting
         */
        let canvas = document.getElementById(nodeID);
        let context = canvas.getContext('2d');

        // this.polygon = this.state.imgs[this.state.selectImg.index].polygon
        console.log(this.polygon)
        console.log(this.line)
        console.log(this.direction)
        this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
        this.addToLine(this.line, context, canvasWidht, canvasHeight,1, 0)
        this.addToLine(this.direction, context, canvasWidht, canvasHeight,1, 1)

        canvas.onclick = (e) => {
            if (!this.polygonCompile && this.countintState == 0) {
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
                        this.countintState = 1

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
            }else if(!this.polygonCompile && this.countintState == 1){
                let x = e.layerX
                let y = e.layerY

                if (!this.isDrawLine){
                    this.isDrawLine = true
                    this.line.push([{x, y}, {x, y}])
                }else {
                    let lines = this.line[this.line.length-1]
                    if (lines.length > 2){
                        this.isDrawLine = false
                        this.countintState = 2
                    }else {
                        lines.push({x, y})
                    }
                }

                canvas.onmousemove = (e)=>{
                    if (this.isDrawLine){
                        let lines = this.line[this.line.length-1]
                        let move_x = e.layerX;
                        let move_y = e.layerY;
                        lines[lines.length-1] = {x:move_x, y:move_y}
                        this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
                        this.addToLine(this.line, context, canvasWidht, canvasHeight,1, 0)
                    }
                }
            }else if(!this.polygonCompile && this.countintState == 2){
                let x = e.layerX
                let y = e.layerY

                if (!this.isDrawDirection){
                    this.isDrawDirection = true
                    this.direction.push([{x, y}, {x, y}])
                }else {
                    this.isDrawDirection = false
                    this.countintState = -1

                }

                canvas.onmousemove = (e)=>{
                    if (this.isDrawDirection){
                        let lines = this.direction[this.direction.length-1]
                        let move_x = e.layerX;
                        let move_y = e.layerY;
                        lines[lines.length-1] = {x:move_x, y:move_y}
                        console.log(this.line)
                        console.log(this.direction)
                        this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
                        this.addToLine(this.line, context, canvasWidht, canvasHeight,1, 0)
                        this.addToLine(this.direction, context, canvasWidht, canvasHeight,1, 1)
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
                        isInPloy = this.rayCasting({x:e.layerX, y:e.layerY}, this.polygon[i].slice(0, this.polygon[i].length-1))
                        console.log(isInPloy)
                        selectImg.selectPoly = i
                        if (isInPloy){
                            this.setState({
                                selectImg
                            },()=>{
                                console.log(this.state.selectImg)
                                this._drawCounting()
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
                        this._drawCounting()
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

    _initCanvas(nodeID){
        /**
         *
         * @type mode : 0 poly 1: counting
         */
        let canvas = document.getElementById(nodeID);
        let context = canvas.getContext('2d');

        // this.polygon = this.state.imgs[this.state.selectImg.index].polygon

        requestAnimationFrame(()=>{
            this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
        })

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

            if (this.state.selectTab == "counting"){
                this._drawCounting()
            }else {
                this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
            }
        }
    }

    addToLine(trackerObjs, ctx, canWidth, canHeight, clear=0, mode=0){
        /**
         * clear : 0 clear ctx, 1 do not clear
         * mode : 0 line , 1 arrow
         */
        requestAnimationFrame(()=>{
            this.drawLine(trackerObjs, ctx, canWidth, canHeight, clear, mode)
        })
    }

    drawLine(trackerObjs, ctx, canWidth, canHeight, clear=0, mode=0) {
        /**
         * clear : 0 clear ctx, 1 do not clear
         * @type mode 0: line 1: arrows
         */
        let colorMap = ['#0032FF', '#22AA50']
        if (clear==0){
            ctx.clearRect(0,0,canWidth,canHeight);
        }

        trackerObjs.forEach((val, index)=>{
            for (let i = 0; i <= val.length-2; i ++){

                let startPoint = val[i]
                let endPoint = val[i+1]

                ctx.lineWidth = 2
                ctx.beginPath()
                ctx.moveTo(startPoint.x, startPoint.y)
                ctx.lineTo(endPoint.x, endPoint.y)
                ctx.strokeStyle = colorMap[mode]
                ctx.lineCap = 'round'
                ctx.lineJoin = 'round'
                ctx.stroke()

                if (mode && i == val.length-2){
                    this.drawArrows(ctx, startPoint, endPoint)
                }

            }
        })

    }

    drawArrows(ctx, startPoint, endPoint) {

        let endRadians = Math.atan((endPoint.y - startPoint.y) / (endPoint.x - startPoint.x));  // 计算出当前直线的角度
        endRadians += ((endPoint.x >= startPoint.x) ? 90 : -90) * Math.PI / 180;  // 角度的正负取值
        ctx.translate(endPoint.x, endPoint.y);  // 使用translate函数转换坐标系，将该坐标重新定义为原点
        ctx.rotate(endRadians);  // 把该直线看做水平坐标（目的是让整个canvas没有角度，方便计算）

        // 下面就是根据直线终点绘制三角箭头，并填充三角形
        ctx.moveTo(0,  -2 * ctx.lineWidth);
        ctx.lineTo(2* ctx.lineWidth, 3 * ctx.lineWidth);
        ctx.lineTo(-2 * ctx.lineWidth, 3 * ctx.lineWidth);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();

        ctx.rotate(-endRadians);
        ctx.translate(-endPoint.x, -endPoint.y);
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
        let colorMap = ['#B0171F']
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

    _drawCounting(){
        let canvas = document.getElementById("ls_count_canvas");
        let context = canvas.getContext('2d');

        this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
        this.addToLine(this.line, context, canvasWidht, canvasHeight,1, 0)
        this.addToLine(this.direction, context, canvasWidht, canvasHeight,1, 1)
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
        console.log(this.state.cameraParams)
        this._updateBackground()
        _fetch(GET_REMOTE_CONFIG, {}, (json)=>{
            if (json.code == 200){
                this.setState({
                    cameraParams: json.result
                }, ()=>{
                    console.log(json.result)
                    this._syncRemoteConfig()
                    message.success('加载配置成功')
                    this._initCanvas("ls_tracker_canvas")
                })
            }else {
                message.error('加载配置失败')
                this._initCanvas("ls_tracker_canvas")
            }
        })

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
            this.countintState = 0
        }
        else if (index == 1) {
            this.polygonCompile = true
            this.addPolygonCompile = false
        }
        else if (index == 2){
            if (this.state.selectImg.selectPoly != -1){
                this.parmasToken.splice(this.state.selectImg.selectPoly, 1)
                this.polygon.splice(this.state.selectImg.selectPoly, 1)
                if (this.state.selectTab == "counting"){
                    this.line.splice(this.state.selectImg.selectPoly, 1)
                    this.direction.splice(this.state.selectImg.selectPoly, 1)
                }

                if (this.state.selectTab == 'hesitate'){
                    this.duration.splice(this.state.selectImg.selectPoly, 1)
                }

                let selectImgTmp = deepCopy(this.state.selectImg)
                let imgsTmp = deepCopy(this.state.imgs)
                selectImgTmp.polygon = this.polygon
                selectImgTmp.line = this.line
                selectImgTmp.direction = this.direction
                selectImgTmp.duration = this.duration
                selectImgTmp.selectPoly = -1
                selectImgTmp.parmasToken = this.parmasToken
                imgsTmp[[selectImgTmp.index]].polygon = this.polygon
                imgsTmp[[selectImgTmp.index]].line = this.line
                imgsTmp[[selectImgTmp.index]].direction = this.direction
                imgsTmp[[selectImgTmp.index]].parmasToken = this.parmasToken

                this.defaultStatus = {
                    polygon:deepCopy(this.polygon),
                    selectPoly:-1,
                    duration: deepCopy(this.duration),
                    parmasToken: deepCopy(this.parmasToken)
                }

                this.setState({
                    selectImg:selectImgTmp,
                    imgs:imgsTmp,
                },()=>{

                    if (this.state.selectTab == "counting"){
                        let canvas = document.getElementById('ls_count_canvas');
                        let context = canvas.getContext('2d');
                        this.addToPolygon(this.polygon, context, canvasWidht, canvasHeight)
                        this.addToLine(this.line, context, canvasWidht, canvasHeight,1, 0)
                        this.addToLine(this.direction, context, canvasWidht, canvasHeight,1, 1)
                    }else {
                        let canvas = document.getElementById('ls_tracker_canvas');
                        let context = canvas.getContext('2d');
                        requestAnimationFrame(()=>{
                            this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                        })
                    }
                })

                this._updateRemoteConfig()

            }else {
                message.warning("请先选择组件")
            }
        }

    }

    _btnConfirm(e){

        if (this.countintState != -1 && this.selectPoints == "counting"){
            message.warning('不能保存, 有未操作的数据')
            return
        }

        // 更新 params token
        if (this.state.selectBtn == 0){
            this.parmasToken.push(`${Date.parse(new Date())}`)
            console.log(this.parmasToken)
        }


        this.setState({
            selectBtn:-1
        })
        this.polygonCompile = false
        this.addPolygonCompile = false

        let selectImg = deepCopy(this.state.selectImg)

        this.setState({
            selectImg:{...selectImg, ...{polygon: this.polygon, parmasToken: this.parmasToken}}
        }, ()=>{
            this._updateRemoteConfig()
            this.defaultStatus = {
                polygon:deepCopy(this.polygon),
                selectPoly:this.state.selectImg.selectPoly,
                duration: deepCopy(this.duration),
                parmasToken: deepCopy(this.parmasToken)
            }
        })
    }

    _btnCancel(e){

        this.isDrawPolygoning = false
        this.isDragging = false
        this.polygonCompile = false
        this.addPolygonCompile = false

        this.isDrawDirection = false
        this.isDrawLine = false
        this.countintState = -1

        let canvas = document.getElementById('ls_tracker_canvas');
        let context = canvas.getContext('2d');

        this.setState({
            selectBtn:-1
        })

        this.polygon = deepCopy(this.defaultStatus.polygon)
        this.parmasToken = deepCopy(this.defaultStatus.parmasToken)
        this.duration = deepCopy(this.defaultStatus.duration)
        let selectImg = deepCopy(this.state.selectImg)
        selectImg.selectPoly = this.defaultStatus.selectPoly
        selectImg.polygon = this.polygon
        selectImg.parmasToken = this.parmasToken
        selectImg.duration = this.duration
        this.setState({
            selectImg
        }, ()=>{

            if (this.state.selectTab == "counting"){
                this._drawCounting()
            }else {
                requestAnimationFrame(()=>{
                    this.drawPolygon(this.polygon, context, canvasWidht, canvasHeight)
                })
            }

        })
    }

    _updateRemoteConfig(){
        console.log(this.state.selectImg)
        console.log(this.polygon)
        console.log(this.state.cameraParams)
        console.log(this.parmasToken)

        let cameraParamsTmp = deepCopy(this.state.cameraParams)
        cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params = []
        cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].online = false

        let durationDefault = 10

        for (let i = 0; i < this.polygon.length; i++){
            cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].online = true
            // let remoteParamsLength = cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params.length
            // cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params = []
            // if (i<remoteParamsLength){

            if (this.state.selectTab != "counting"){
                console.log(this.state.selectTab)
                console.log('no count')
                if (this.state.selectTab == "hesitate"){

                    this.props.form.validateFieldsAndScroll((err, values) => {
                        if (err) {
                            console.log(err)
                            message.warning('请先填写正确的表单')
                        } else {
                            durationDefault = parseInt(values[`duration_${i}`])
                        }
                    })

                    cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params.push({
                        polygon:this._convertCoord(this.polygon[i], canvasWidht, canvasHeight),
                        duration: durationDefault,
                        parmasToken:this.parmasToken[i]
                    })
                }else {
                    cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params.push({
                        polygon:this._convertCoord(this.polygon[i], canvasWidht, canvasHeight),
                        parmasToken: this.parmasToken[i]
                    })
                }

            }else {
                console.log(this.state.selectTab)
                console.log('c  ount')
                console.log(this.line)
                console.log(this.direction)
                cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params.push({
                    polygon: this._convertCoord(this.polygon[i], canvasWidht, canvasHeight),
                    line: this._convertCoord(this.line[i], canvasWidht, canvasHeight),
                    direction: this._convertCoord(this.direction[i], canvasWidht, canvasHeight),
                    parmasToken: this.parmasToken[i]
                })
            }

        }

        this.setState({
            cameraParams: cameraParamsTmp
        }, ()=>{
            console.log(this.state.cameraParams)
            _fetch(CHANGE_REMOTE_CONFIG, this.state.cameraParams, (json)=>{
                if (json.code == 200){
                    message.success("更新配置成功")
                    this._syncRemoteConfig()
                }else {
                    message.error("更新配置成功")
                }
            })
        })

    }

    _syncRemoteConfig(){
        this.polygon = []
        this.line = []
        this.direction = []
        this.duration = []
        this.parmasToken = []

        let cameraParamsTmp = deepCopy(this.state.cameraParams)
        let selectImg = deepCopy(this.state.selectImg)
        let showPoly = cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].online
        if (showPoly){
            console.log(cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params)
            let remoteParamsLength = cameraParamsTmp.camera[[this.state.selectImg.index]][[this.state.selectTab]].params.length
            for (let i = 0; i < remoteParamsLength; i++){
                this.polygon.push(
                    this._convertCoord(cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].polygon,
                        canvasWidht, canvasHeight, 1
                        )
                )

                this.parmasToken.push(
                    cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].parmasToken
                )

                if (cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].hasOwnProperty("direction")){
                    this.direction.push(
                        this._convertCoord(cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].direction,
                            canvasWidht, canvasHeight, 1
                        )
                    )
                }
                if (cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].hasOwnProperty("line")){
                    this.line.push(
                        this._convertCoord(cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].line,
                            canvasWidht, canvasHeight, 1
                        )
                    )
                }

                if (cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].hasOwnProperty("duration")){
                    this.duration.push(
                        cameraParamsTmp.camera[[selectImg.index]][[this.state.selectTab]].params[i].duration
                    )
                }
            }
            console.log(this.polygon)
            console.log(this.line)
            console.log(this.direction)
            console.log(this.duration)
            console.log(this.parmasToken)

            selectImg.polygon = this.polygon
            selectImg.parmasToken = this.parmasToken
            selectImg.line = this.line
            selectImg.direction = this.direction
            selectImg.duration = this.duration

            this.setState({
                selectImg: selectImg
            },()=>{
                this.defaultStatus = {
                    polygon:deepCopy(this.polygon),
                    parmasToken:deepCopy(this.parmasToken),
                    selectPoly:this.state.selectImg.selectPoly,
                    duration: this.state.selectImg.duration
                }
            })
        }

        //sync state.imgs
        let stateImgs = deepCopy(imgsDefault)
        for (let i = 0; i < stateImgs.length; i++){
            stateImgs[i].src = this.state.imgs[i].src
        }
        for (let i = 0; i < cameraParamsTmp.camera.length; i++){
            let remoteParamsLength = cameraParamsTmp.camera[i][[this.state.selectTab]].params.length
            for (let j = 0; j < remoteParamsLength; j++){
                stateImgs[i].direction = []
                stateImgs[i].polygon = []
                stateImgs[i].line = []

                stateImgs[i].polygon.push(
                    this._convertCoord(cameraParamsTmp.camera[i][[this.state.selectTab]].params[j].polygon,
                        canvasWidht, canvasHeight, 1)
                )
                if (cameraParamsTmp.camera[i][[this.state.selectTab]].params[j].hasOwnProperty("direction")){
                    stateImgs[i].direction.push(
                        this._convertCoord(cameraParamsTmp.camera[i][[this.state.selectTab]].params[j].direction,
                            canvasWidht, canvasHeight, 1)
                    )
                }

                if (cameraParamsTmp.camera[i][[this.state.selectTab]].params[j].hasOwnProperty("line")){
                    stateImgs[i].line.push(
                        this._convertCoord(cameraParamsTmp.camera[i][[this.state.selectTab]].params[j].line,
                            canvasWidht, canvasHeight, 1)
                    )
                }
            }

        }
        this.setState({
            imgs: stateImgs
        })
    }

    _convertCoord(coords, width, height, mode=0){
        /**
         * mode: 0 coords to scale, 1: scale to coords
         */
        let results = deepCopy(coords)
        if (mode==0){
            for (let coord of results){
                coord.x = +(coord.x / width).toFixed(2)
                coord.y = +(coord.y / height).toFixed(2)
            }
            // console.log(results)

        }else {
            for (let coord of results){
                coord.x = +(coord.x * width).toFixed(2)
                coord.y = +(coord.y * height).toFixed(2)
            }
            // console.log(results)
        }
        return results
    }

    handleSubmit = (e) => {
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                console.log(err)
                message.warning('请先填写正确的表单')
            } else {
                let duration = values[`duration_0`]
                console.log(duration)
            }
        })
    }

    render() {

        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 14, offset:0},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
        };

        // const formItemLayout = {
        //     wrapperCol: {
        //         xs: {
        //             span: 24,
        //             offset: 0,
        //         },
        //         sm: {
        //             span: 16,
        //             offset: 8,
        //         },
        //     },
        // }


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
            <Template classTag={'remoteConfig'} current_page={2} history={this.props.history}
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
                            <img src={this.state.selectImg.src} width={'80%'} style={{zIndex:89}}/>
                            <canvas id="ls_tracker_canvas" width={canvasWidht}
                                    height={canvasHeight}
                                    style={{
                                        zIndex: this.state.selectTab == "counting" ? 79 : 99,
                                        position:"absolute", top:0,left:'10%'
                                    }}/>

                            <canvas id="ls_count_canvas" width={canvasWidht}
                                    height={canvasHeight}
                                    style={{
                                        zIndex: this.state.selectTab == "counting" ? 99 : 79,
                                        position:"absolute", top:0,left:'10%'
                                    }}/>
                        </div>
                        <Tabs defaultActiveKey="1" onChange={this._changeTab} style={{width:'100%', padding:"5px 20px"}} type="card">
                            <TabPane tab="热力图" key="heatMap">
                                <Row type="flex" justify="space-around"
                                    style={{
                                        // backgroundColor:'#CECECE',
                                        height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                    <Col span={6} style={{display:'flex', flexDirection:'column', justifyContent:'space-around',
                                        height:'100%'
                                    }}>
                                        {DrawBtn}
                                    </Col>
                                    <Col span={11} style={{display: 'flex', flexDirection:'column', }}>
                                        <Form layout='horizontal' style={{margin: '0 auto'}}
                                              // onSubmit={this.handleSubmit}
                                        >
                                            {
                                                this.state.selectImg.polygon.map((val, index)=>{
                                                    return (
                                                        <Row gutter={8}>
                                                            <Col span={20}>
                                                                <FormItem label='名称: ' labelCol={{xs: {span: 24},
                                                                    sm: {span: 8, offset:0},}}
                                                                          wrapperCol={{
                                                                              xs: {span: 24},
                                                                              sm: {span: 10},
                                                                          }}
                                                                >
                                                                    {
                                                                        getFieldDecorator(`location_name_heatMap_${index}`, {
                                                                            initialValue:`区域 ${index}`,
                                                                            rules: [
                                                                                {
                                                                                    required: true,
                                                                                    message: '区域名称'
                                                                                }
                                                                            ]
                                                                        })(
                                                                            <Input disabled={this.state.selectBtn == -1 ? true : false}/>
                                                                        )
                                                                    }
                                                                </FormItem>
                                                            </Col>
                                                            {/*<Col span={12}>*/}
                                                            {/*    <FormItem label='告警时长阈值: ' {...formItemLayout}>*/}
                                                            {/*        {*/}
                                                            {/*            getFieldDecorator('ip', {*/}
                                                            {/*                initialValue:`120 `,*/}
                                                            {/*                rules: [*/}
                                                            {/*                    {*/}
                                                            {/*                        required: true,*/}
                                                            {/*                        message: '告警时长'*/}
                                                            {/*                    }*/}
                                                            {/*                ]*/}
                                                            {/*            })(*/}
                                                            {/*                <Input disabled={this.state.selectBtn == -1 ? true : false}/>*/}
                                                            {/*            )*/}
                                                            {/*        }*/}
                                                            {/*    </FormItem>*/}
                                                            {/*</Col>*/}
                                                        </Row>
                                                    )
                                                })
                                            }
                                        </Form>
                                    </Col>
                                    <Col span={6} style={{display:'flex', justifyContent:'space-around',
                                        height:'100%', marginTop:10*screen_scale_width
                                    }}>
                                        <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="primary"
                                                onClick={this._btnConfirm}
                                                disabled={this.state.selectBtn == -1 ? true : false}
                                        >确定</Button>
                                        <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="danger"
                                                onClick={this._btnCancel}
                                        >取消</Button>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tab="驻留观察" key="hesitate">
                                <Row style={{
                                    // backgroundColor:'#CECECE',
                                    height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                    <Row type="flex" justify="space-around"
                                         style={{
                                             // backgroundColor:'#CECECE',
                                             height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                        <Col span={6} style={{display:'flex', flexDirection:'column', justifyContent:'space-around',
                                            height:'100%'
                                        }}>
                                            {DrawBtn}
                                        </Col>
                                        <Col span={11}>
                                            <Form layout='horizontal' style={{margin: '0 auto'}} onSubmit={this.handleSubmit}>
                                                {
                                                    this.state.selectImg.polygon.map((val, index)=>{
                                                        return (
                                                            <Row gutter={8}>
                                                                <Col span={12}>
                                                                    <FormItem label='名称: ' labelCol={{xs: {span: 24},
                                                                        sm: {span: 8, offset:0},}}
                                                                              wrapperCol={{
                                                                                  xs: {span: 24},
                                                                                  sm: {span: 10},
                                                                              }}
                                                                    >
                                                                        {
                                                                            getFieldDecorator(`location_name_hesitate_${index}`, {
                                                                                initialValue:`区域 ${index}`,
                                                                                rules: [
                                                                                    {
                                                                                        required: true,
                                                                                        message: '区域名称'
                                                                                    }
                                                                                ]
                                                                            })(
                                                                                <Input disabled={this.state.selectBtn == -1 ? true : false}/>
                                                                            )
                                                                        }
                                                                    </FormItem>
                                                                </Col>
                                                                <Col span={12}>
                                                                    <FormItem label='告警时长(秒): ' {...formItemLayout}>
                                                                        {
                                                                            getFieldDecorator(`duration_${index}`, {
                                                                                initialValue: this.state.selectImg.duration[index],
                                                                                rules: [
                                                                                    {
                                                                                        required: true,
                                                                                        message: '告警时长'
                                                                                    }
                                                                                ]
                                                                            })(
                                                                                <Input disabled={this.state.selectBtn == -1 ? true : false}/>
                                                                            )
                                                                        }
                                                                    </FormItem>
                                                                </Col>
                                                            </Row>
                                                        )
                                                    })
                                                }
                                            </Form>
                                        </Col>
                                        <Col span={6} style={{display:'flex', justifyContent:'space-around',
                                            height:'100%', marginTop:10*screen_scale_width
                                        }}>
                                            <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="primary"
                                                    onClick={this._btnConfirm}
                                                    disabled={this.state.selectBtn == -1 ? true : false}
                                            >确定</Button>
                                            <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="danger"
                                                    onClick={this._btnCancel}
                                            >取消</Button>
                                        </Col>
                                    </Row>
                                </Row>
                            </TabPane>
                            <TabPane tab="卡口计数" key="counting">
                                <Row style={{
                                    // backgroundColor:'#CECECE',
                                    height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                    <Row style={{
                                        // backgroundColor:'#CECECE',
                                        height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                        <Row type="flex" justify="space-around"
                                             style={{
                                                 // backgroundColor:'#CECECE',
                                                 height: 135/0.75*screen_scale_width, borderRadius:5}}>
                                            <Col span={6} style={{display:'flex', flexDirection:'column', justifyContent:'space-around',
                                                height:'100%'
                                            }}>
                                                {DrawBtn}
                                            </Col>
                                            <Col span={11}>
                                                <Form layout='horizontal' style={{margin: '0 auto'}}
                                                      // onSubmit={this.handleSubmit}
                                                >
                                                    {
                                                        this.state.selectImg.polygon.map((val, index)=>{
                                                            return (
                                                                <Row gutter={8}>
                                                                    <Col span={12}>
                                                                        <FormItem label='名称: ' labelCol={{xs: {span: 24},
                                                                            sm: {span: 8, offset:0},}}
                                                                                  wrapperCol={{
                                                                                      xs: {span: 24},
                                                                                      sm: {span: 10},
                                                                                  }}
                                                                        >
                                                                            {
                                                                                getFieldDecorator(`location_name_counting_${index}`, {
                                                                                    initialValue:`区域 ${index}`,
                                                                                    rules: [
                                                                                        {
                                                                                            required: true,
                                                                                            message: '区域名称'
                                                                                        }
                                                                                    ]
                                                                                })(
                                                                                    <Input disabled={this.state.selectBtn == -1 ? true : false}/>
                                                                                )
                                                                            }
                                                                        </FormItem>
                                                                    </Col>
                                                                </Row>
                                                            )
                                                        })
                                                    }
                                                </Form>
                                            </Col>
                                            <Col span={6} style={{display:'flex', justifyContent:'space-around',
                                                height:'100%', marginTop:10*screen_scale_width
                                            }}>
                                                <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="primary"
                                                        onClick={this._btnConfirm}
                                                        disabled={this.state.selectBtn == -1 ? true : false}
                                                >确定</Button>
                                                <Button style={{width:'50%', marginLeft:20*screen_scale_width}} type="danger"
                                                        onClick={this._btnCancel}
                                                >取消</Button>
                                            </Col>
                                        </Row>
                                    </Row>
                                </Row>
                            </TabPane>
                        </Tabs>,
                    </Col>
                </Row>
            </Template>
        )
    }

}

export default  DrawLayer;