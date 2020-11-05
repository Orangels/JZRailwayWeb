import React from 'react'
import Chart_area from "../../Chart/Chart_area"
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import Home_content_template from "../../../common/Home_content_template";
// import backgroundBanner from '../../../asset/back_new/10_数据概览.png'
import backgroundBanner from '../../../asset/back_new/数据概览.png'
import Chart_custom from "../../Chart/Chart_custom";
import Single_Histogram from '../../Chart/Chart_singleHistogram'
import Histogram from "../../Chart/Histogram";
// import backgroundBanner from "../../../asset/stu_back/4_学科分布.png";


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
        country: "实时旅客人数",
        time: "8:00",
        // timeValue: 1593000000,
        value: 5
    },
    {
        country: "实时旅客人数",
        time: "8:30",
        // timeValue: 1593001800,
        value: 6
    },
    {
        country: "实时旅客人数",
        time: "9:00",
        // timeValue: 1593003600,
        value: 8
    },
    {
        country: "实时旅客人数",
        time: "9:30",
        // timeValue: 1593005400,
        value: 5
    },
    {
        country: "实时旅客人数",
        time: "10:00",
        // timeValue: 1593007200,
        value: 4
    },
    {
        country: "实时旅客人数",
        time: "10:30",
        // timeValue: 1593012600,
        value: 3
    },
    {
        country: "实时旅客人数",
        time: "11:00",
        // timeValue: 1592928000,
        value: 9
    },
    {
        country: "历史平均旅客人数",
        time: "8:00",
        // timeValue: 1593000000,
        value: 1
    },
    {
        country: "历史平均旅客人数",
        time: "8:30",
        // timeValue: 1593001800,
        value: 1
    },
    {
        country: "历史平均旅客人数",
        time: "9:00",
        // timeValue: 1593003600,
        value: 1
    },
    {
        country: "历史平均旅客人数",
        time: "9:30",
        // timeValue: 1593005400,
        value: 1
    },
    {
        country: "历史平均旅客人数",
        time: "10:00",
        // timeValue: 1593007200,
        value: 2
    },
    {
        country: "历史平均旅客人数",
        time: "10:30",
        // timeValue: 1593012600,
        value: 7
    },
    {
        country: "历史平均旅客人数",
        time: "11:00",
        // timeValue: 1592928000,
        value: 1
    },
];

export default class Home_content_2_2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: home_content_2_2_data
        }

    }

    componentDidMount() {
        let {data} = this.props || home_content_2_2_data

        this.setState({
            data:data
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let data = nextProps.data || home_content_2_2_data
        console.log(data)
        this.setState({
            data:data
        })
    }

    render() {
        let component_text = this.state.state_props
        return (
            <Home_content_template style={{
                // width:810*screen_scale_width,
                height:358 * screen_scale_height,
                width:'100%',
                marginTop: 10*screen_scale_width,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
            }} title={"实时候车旅客人数"}>
                <div style={{
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
                    {/*<Chart_custom  title={''}*/}
                    {/*    // height={276*screen_scale_width}*/}
                    {/*               dataSource={this.state.data}*/}
                    {/*               height={330*screen_scale_height}*/}
                    {/*               width={800*screen_scale_width}/>*/}
                    <Chart_area
                        height={330*screen_scale_height}
                        width={800*screen_scale_width}
                        dataSource={this.state.data}
                    />
                </div>
            </Home_content_template>
        )

    }
}