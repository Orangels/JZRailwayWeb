import React from 'react'
import {randomNum,} from "../../common/utils";
import {chart_color} from '../../common/data/pie_chart_data'

import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util,
} from "bizcharts";
import { Button, Icon} from 'antd';
import {screen_scale_width} from "../parameter/parameters";

const data_ori = [
    {
        time: "8:00",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:00",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:00",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:05",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:05",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:05",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:10",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:10",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:10",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:15",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:15",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:15",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:20",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:20",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:20",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:25",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:25",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:25",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:30",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:30",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:30",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
    {
        time: "8:35",
        state_type: "进入人数",
        state: randomNum(5,10)
    },
    {
        time: "8:35",
        state_type: "离开人数",
        state: randomNum(0,8)
    },
    {
        time: "8:35",
        state_type: "陌生人数",
        state: randomNum(1,5)
    },
];
const cols = {
    time: {
        range: [0, 1],
        alias: '时间' ,
    },
    state:{
        // min:20,
        // max:10,
        alias:'实时状态',
        // tickCount:5,
    }
};





export default class Chart_custom extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            data:[],
            updateable:false,
            auto:false,
            btn_start_selected:false,
            btn_start_text:'开始分析',
            btn_start_icon:'play-circle',
            onGetG2Instance:null
        }

        this._start_play = this._start_play.bind(this)
        this._update_data = this._update_data.bind(this)
        this._resetTimer = this._resetTimer.bind(this)
    }



    /**
     * 模拟实时更新数据
     * */
    _update_data(e) {

        let hour = parseInt(this.date/24)
        let min = this.date%24

        this.date += 5


        if (this.state.updateable){
            let data = this.state.data
            let jump_num = this.props.dataSource.keys.length()
        }
    }


    _start_play(e){
        this.setState({
            btn_start_text: this.state.btn_start_selected ? '开始分析' : '停止分析',
            btn_start_icon: this.state.btn_start_selected ?  'play-circle' : 'pause-circle',
            btn_start_selected:!this.state.btn_start_selected,
            updateable:!this.state.updateable,
        });

        if (this.date !== undefined){
            this.date = new Date()
            // this.date = {
            //     hour:this.date.getHours(),
            //     min:this.date.getMinutes()
            // }
            this.date = this.date.getHours()*60 + this.date.getMinutes()
        }

        this.timer = setInterval(this._update_data, 1000);
    }

    _resetTimer() {
        clearInterval(this.timer);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }


    componentDidMount() {
        let props = this.props
        let auto = props.auto || false

        let dataSource = this.props.dataSource || data_ori
        let data = dataSource || data_ori

        let onGetG2Instance = this.props.onGetG2Instance || null

        this.setState({
            auto:auto,
            data:data,
            onGetG2Instance: onGetG2Instance
        });

        // timer 计数器
        this.num = 0
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let data = nextProps.dataSource || data_ori
        let onGetG2Instance = nextProps.onGetG2Instance
        this.setState({
            data:data,
            onGetG2Instance: onGetG2Instance
        });
    }



    render() {

        let onGetG2Instance = this.props.onGetG2Instance || null
        onGetG2Instance = onGetG2Instance || this.state.onGetG2Instance

        let height = this.props.height || 400
        let width = this.props.width || 'auto'
        let title = this.props.title || ""
        let Real_time = this.props.real_time || false

        let cols_real_time = {
            time: {
                range: [0, 1],
                alias: '时间' ,
            },
            state:{
                // min:60,
                max:15,
                alias:'实时状态'
            }
        };

        let show_cols = Real_time ? cols_real_time : cols

        return (
            <div style={{...{display:"flex",flexDirection:"column",
                    // paddingRight:50*screen_scale_width,
                    paddingTop:10*screen_scale_width,
                    position:'relative'
                }, ...this.props.style}}>
                <div className={"pie_title"} style={{position:"absolute", top:5, left: "40%", color:'white'}}>
                    {title}
                </div>
                <Chart
                        className={'lineCharts'}
                        height={height} data={this.state.data} scale={show_cols} forceFit
                       onGetG2Instance={onGetG2Instance}
                        width={width}>
                    <Legend  position={'bottom-center'}/>
                    <Axis name="time"
                          // title
                          label={Real_time ? {
                              formatter(text, item, index) {
                                  if (index%15===0){
                                      return text
                                  }else {
                                      return ""
                                  }
                              }
                          }:{
                              textStyle:{
                                  fill: '#FFFFFF'
                              },
                              formatter(text, item, index) {
                                  return text
                              }
                          }
                          }
                          />
                    <Axis
                        name="state"
                        // title
                        // label={{
                        //     formatter: val => `${val}°C`
                        // }}
                        label={{
                            offset:10,
                            textStyle:{
                                fill: '#FFFFFF'
                            },
                            formatter(text, item, index) {
                                return `${text}`;
                            },
                        }}
                    />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="line"
                        position="time*state"
                        size={2}
                        color={["state_type", chart_color]}
                        shape={"smooth"}
                    />
                    {/*<Geom type="area"*/}
                    {/*      position="time*state"*/}
                    {/*      color="state_type"*/}
                    {/*      shape="smooth" />*/}
                    <Geom
                        type="point"
                        position="time*state"
                        size={1}
                        shape={"circle"}
                        color={["state_type", chart_color]}
                        style={{
                            stroke: "#fff",
                            lineWidth: 1
                        }}
                    />
                </Chart>
                {
                    this.state.auto ?
                        <div style={{display:'flex',flexDirection:"row",justifyContent:'flex-end',marginBottom:20,marginRight:50}}>
                            <Button className='home_learn_button_3'
                                    shape="round" onClick={this._start_play}
                            style={{width:200}}>
                                {/*<Icon type={this.state.model_btn_icon} />*/}
                                <Icon type={this.state.btn_start_icon} />
                                {this.state.btn_start_text}
                            </Button>
                        </div> : null
                }
            </div>

        )
    }

}