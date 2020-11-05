import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import {show_2_ste} from '../../../common/utils'
import Home_content_template from "../../../common/Home_content_template";
import WaterWave from "../../../common/component/WaterWave"
import { Progress, Row, Col } from 'antd';
import backgroundBanner from "../../../asset/back_new/2_校园综合数据.png";
import Chart_circle from "../../Chart/Chart_circle";
import {chart_color} from "../../Chart/chart_config";
import Chart_custom from "../../Chart/Chart_custom";
import {randomNum} from "../../../common/utils"


const progress_width = 130

const style = {
    wrapStyle:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        // width:499*screen_scale_width,
        width:'100%',
        height:578 * screen_scale_height,
        // height:577 * screen_scale_height,
        // display:'flex',
        // flexDirection: 'column'

    },
    childWrap:{
        width:'100%',
        paddingTop:20*screen_scale_width,
        display:'flex',
        flexDirection: 'column',

    },
    progress:{
        display:'flex',
        justifyContent:'space-around',
        width:'100%',
        paddingTop:20*screen_scale_width
    },
    progress_title:{
        color:'#FFFFFF',
        fontSize:5*screen_scale_width,
        marginTop:10*screen_scale_width
    },
}

let home_content_2_2_data = [
    {
        time: "8:00",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
    {
        time: "8:05",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
    {
        time: "8:10",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
    {
        time: "8:15",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
    {
        time: "8:20",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
    {
        time: "8:25",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
    {
        time: "8:30",
        state_type: "进入人数",
        state: randomNum(5,10)
        // state: 0
    },
]

export default class Home_content_3_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: home_content_2_2_data,
            totalNum:0
        }
    }

    componentDidMount() {
        let {data} = this.props || home_content_2_2_data
        let totalNum = this.props.totalNum || 0
        this.setState({
            data:data,
            totalNum: totalNum
        })

        console.log("init pir timer")
        // this.timer = setInterval(this._update_pieData, 1000*10);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {data} = nextProps || home_content_2_2_data
        let totalNum = nextProps.totalNum || 0
        this.setState({
            data:data,
            totalNum: totalNum
        })
    }

    render() {
        return (

                <Home_content_template style={{...style.wrapStyle,
                    // width:88*5*screen_scale_width
                }} title={'旅客出入站统计'}
                                       childStyle={style.childWrap}
                                       childName={'progress_ls'}
                >
                   <Row type="flex" justify="space-around" align="middle">
                       <Col span={12} style={
                           {display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center' ,
                               color:'white', fontSize: 24
                           }
                       }>
                           <Row>
                               今日进站
                           </Row>
                           <Row>
                               旅客人数
                           </Row>
                       </Col>
                       <Col span={12} style={{display:'flex', flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                           <WaterWave type="circle" width={150} height={150}
                                      showText={`${this.state.totalNum}`}
                                      showText_1={``}
                                      rangeValue={95} />
                       </Col>
                   </Row>
                    <Row>
                        <Col span={24} style={{
                            // background:`url(${backgroundBanner}) no-repeat `,
                            // backgroundSize: '100% 100%',
                            width:'100%',
                            height:'100%',
                            flexWrap:'wrap',
                            flexDirection: 'row',
                            marginTop:10*screen_scale_height
                        }}>
                            {/*<Ul_component data={component_text}/>*/}
                            {/*<Chart_area  height={330*screen_scale_height}*/}
                            {/*             width={800*screen_scale_width}/>*/}
                            {/*<Histogram  title={'进出人员统计'}*/}
                            {/*            height={330*screen_scale_height}*/}
                            {/*            width={800*screen_scale_width}/>*/}
                            {/*<Single_Histogram  title={'进出人员统计'}*/}
                            {/*            height={330*screen_scale_height}*/}
                            {/*            width={800*screen_scale_width}/>*/}
                            <Chart_custom  title={''}
                                // height={276*screen_scale_width}
                                           dataSource={this.state.data}
                                           height={330*screen_scale_height}
                                           width={800*screen_scale_width}/>

                        </Col>
                    </Row>
                </Home_content_template>
        )

    }
}