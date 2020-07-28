import React from 'react';
import { Checkbox } from 'antd';
import {screen_scale_height, screen_scale_width} from "../parameter/parameters";
import {randomNum} from "../../common/utils"
import  Heatmap  from 'heatmap.js';
import back from "../../asset/test/world_clear.jpg";
import backgroundBanner from "../../asset/背景.jpg";

const imgWidht = 1200
const imgHeight = 300
const iconWidth = 103/4
const iconHeight = 153/4
const SCALE = 3
const CheckboxGroup = Checkbox.Group;
let plainOptions = ['显示轨迹', '显示热力图'];

export default class TestView extends React.Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            img: 'http://192.168.88.221:5000/static/staticPic/back.jpg',
            checkedList:plainOptions,
        };
        this._checkBoxOnChange = this._checkBoxOnChange.bind(this)
    }


    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    componentDidMount() {
        this.canvas = document.getElementById('lscanvas')
        // this.ctx = this.canvas.getContext('2d')

        let map = Heatmap.create({

            container: document.getElementById('lscanvas'),

            radius: 80,
            // radius: 0,

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

            },
            position:'absolute'

        });


        let data = [];

        for (let i = 0 ; i < 100 ; i++){
            data.push({x: randomNum(10, 1100), y: randomNum(250/2.5, 250/2.5*2), value: randomNum(1, 50)})
        }

        map.setData({

            max: 50,

            data

        })
    }

    _checkBoxOnChange(checkedList) {
        this.setState({
            checkedList
        })
    }

    render() {
        return (
            <div src={back} style={{
                position:"relative",
                width: imgWidht,
                height:imgHeight,
            }} >
                <img src={back} width={imgWidht} height={imgHeight} style={{position:'absolute'}}/>
                <div id="lscanvas"
                     style={{
                         // border:'5px solid #FF1C1F',
                         width: '100%',
                         height:'100%',
                         zIndex:3,
                     }}>
                </div>
                <div style={{position:'absolute', right:10, top:0, zIndex:99}}>
                    <CheckboxGroup
                        options={plainOptions}
                        value={this.state.checkedList}
                        onChange={this._checkBoxOnChange}
                    />
                </div>
            </div>
        )
    }
}