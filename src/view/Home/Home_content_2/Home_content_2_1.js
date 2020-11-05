import React from 'react'
import {Progress} from 'antd'
import Chart_area from "../../Chart/Chart_area"
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import Home_content_template from "../../../common/Home_content_template";
// import backgroundBanner from '../../../asset/back_new/10_数据概览.png'
import backgroundBanner from '../../../asset/back_new/数据概览.png'
import Chart_custom from "../../Chart/Chart_custom";
import Chart_Pie from "../../Chart/Chart_Pie"
import Single_Histogram from '../../Chart/Chart_singleHistogram'
import Histogram from "../../Chart/Histogram";
import {deepCopy, randomNum, show_2_ste} from "../../../common/utils";
import Roulette_head from "../Roulette_head";
// import backgroundBanner from "../../../asset/stu_back/4_学科分布.png";


const progress_width = 200

let Ul_component = ({data, style})=> {
    let textContent = data.map((value,index)=>{
        let left = index%2 === 0 ? 34*screen_scale_width : 200*screen_scale_width
        return (
            <li style={{
                listStyle:'disc outside',
                color:'#FFFFFF',
                marginLeft:left,
                // marginTop:22*screen_scale_width,
                marginTop:15*screen_scale_height,
                // width:130/0.75*screen_scale_width
                width:180/0.75*screen_scale_width
            }} key={`li_${index}`}>
                <div style={{
                    display:'flex',
                    flexDirection:'column',
                }}>
                    <span style={{fontSize:14*screen_scale_width, color:'#FFFFFF',}}>
                        {value['title']}
                    </span>
                    <span style={{fontSize:10*screen_scale_width, color:'#FFFFFF', letterSpacing:0.2}}>
                        <span style={{fontSize:18*screen_scale_width,color:'#09FAFC'}}>
                            {value['text_1']}
                        </span>人,平均<span style={{color:'#09FAFC'}}>{value['text_2']}</span>人/小时
                    </span>
                </div>
            </li>
        )
    })
    return (
        <ul style={{
            display:'flex',
            flexWrap:'wrap',
            flexDirection: 'row',
            alignItems:'flex-start'
        }}>
            {textContent}
        </ul>
    )
}

let home_content_2_2_data = [
    {
        time: "8:00",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:00",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:00",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:05",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:05",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:05",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:10",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:10",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:10",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:15",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:15",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:15",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:20",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:20",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:20",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:25",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:25",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:25",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:30",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:30",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:30",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:35",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:35",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:35",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
]

let pie_data = [
    {
        item: "0-5min",
        count: 49
    },
    {
        item: "5-10min",
        count: 21
    },
    {
        item: "10-20min",
        count: 17
    },
    {
        item: ">20min",
        count: 13
    },
];

export default class Home_content_2_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: home_content_2_2_data,
            pieData: pie_data,
            pieTitle:'区域 1驻留时长占比'
        }
        this._update_pieData = this._update_pieData.bind(this)
    }

    _update_pieData(){
        let pieData = [
            {
                item: "0-5min",
                count: randomNum(40,50)
            },
            {
                item: "5-10min",
                count: randomNum(20,30)
            },
            {
                item: "10-20min",
                count: randomNum(15,20)
            },
            {
                item: ">20min",
                count: randomNum(5,15)
            },
        ];

        let title = ""
        if (this.state.pieTitle == "区域 1驻留时长占比"){
            title = "区域 2驻留时长占比"
        }else {
            title = "区域 1驻留时长占比"
        }
        this.setState({
            pieData:pieData,
            pieTitle: title
        })

    }

    componentDidMount() {
        let {data} = this.props || home_content_2_2_data
        let {pieData} = this.props || pie_data

        this.setState({
            data:data,
            pieData
        })

        console.log("init pir timer")
        // this.timer = setInterval(this._update_pieData, 1000*10);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {data} = nextProps || home_content_2_2_data
        let {pieData} = nextProps || pie_data

        this.setState({
            data:data,
            pieData
        })
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    render() {
        let component_text = this.state.state_props

        let pieData_tmp = deepCopy(this.state.pieData)
        let sum = 0

        for (let pieData_single of pieData_tmp){
            console.log(pieData_single)
            sum += pieData_single.count
        }

        let Pie_chart_tmp = (
            <div style={{
                width:400*screen_scale_width,
                paddingTop:40*screen_scale_height,
                display:'flex',
                justifyContent:'center'
                // marginLeft:118*screen_scale_width
            }}>
                <Progress type="circle" percent={51} format={percent => `未发生驻留`}
                          strokeColor={{
                              '0%':'#08D6E2',
                              '100%':'#51ECDA'
                          }}
                          width={progress_width*screen_scale_width}/>
            </div>
        )

        if (sum != 0){
            Pie_chart_tmp = (
                <Chart_Pie height={330*screen_scale_width}
                           width={400*screen_scale_width}
                           data={this.state.pieData}
                           title={this.state.pieTitle}
                           style={{
                               paddingRight:10*screen_scale_width,
                               overflow:'hidden'
                           }}/>
            )
        }

        return (
            <Home_content_template style={{
                // width:810*screen_scale_width,
                height:358 * screen_scale_height,
                width:'100%',
                marginTop: 10*screen_scale_width,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
            }} title={this.props.data['title'] || "区域驻留统计"}
                                   childName={'progress_ls'}>
                <div style={{
                    // background:`url(${backgroundBanner}) no-repeat `,
                    // backgroundSize: '100% 100%',
                    display:'flex',
                    width:'100%',
                    height:'100%',
                    // flexWrap:'wrap',
                    flexDirection: 'row',
                    marginTop:10*screen_scale_height,
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
                                   title={'实时区域驻留人数'}
                                   height={330*screen_scale_height}
                                   width={500*screen_scale_width}/>
                    {Pie_chart_tmp}

                </div>
            </Home_content_template>
        )

    }
}