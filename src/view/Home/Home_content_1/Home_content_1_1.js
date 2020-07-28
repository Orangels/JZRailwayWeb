import React from 'react'
import TabBar from '../../../common/TabBar'
import Roulette_head from '../Roulette_head'
import Home_content_template from '../../../common/Home_content_template'
import Chart_circle from '../../Chart/Chart_circle'
import {chart_color} from  '../../Chart/chart_config'
import {Home_data} from '../Home_data'
import backgroundBanner from "../../../asset/back_new/2_校园综合数据.png";
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import ShowText from '../../../common/component/ShowText'
import Chart_Pie from "../../Chart/Chart_Pie";


const style = {
    wrapStyle:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        width:499*screen_scale_width,
        height:578 * screen_scale_height,
        // height:577 * screen_scale_height,
    },
    roulette:{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        top:249*screen_scale_width,
        left:176*screen_scale_width,
        backgroundColor:'#000000',
        color:'#FFFFFF',
        width:130*screen_scale_width,
        // height:44*screen_scale_width,
        height:44*screen_scale_height,
        fontSize:16*screen_scale_width,
        borderRadius:44/2*screen_scale_width
    },
}

export default class Home_content_1_1 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            interactive_state:0,
            focus_state: 0,
            active_state:0,
            current_page:0,
            stranger:0,
            home_circle_data:{
                entry:[
                    {
                        count: 0,
                        item: '进入',
                    },
                    {
                        count: 0,
                        item: '离开',
                    },
                ],
                register:[
                    {
                        count: 0,
                        item: '已注册',
                    },
                    {
                        count: 0,
                        item: '未注册',
                    },
                ],
            }
        };
    }

    componentDidMount() {
        let {interactive_state, focus_state, active_state, text_content} = this.props.data
        let { current_page , home_circle_data } = this.props
        console.log(home_circle_data)
        this.setState({
            // interactive_state:interactive_state,
            // focus_state: focus_state,
            // active_state:active_state,
            // current_page:current_page,
            // stranger: text_content[text_content.length-1][1],
            home_circle_data
        }, ()=>{
            console.log(this.state.home_circle_data)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('home_content_1_1 update props')
        let {interactive_state, focus_state, active_state, text_content} = nextProps.data
        let {current_page, home_circle_data} = nextProps
        console.log(home_circle_data)
        this.setState({
            // interactive_state:interactive_state,
            // focus_state: focus_state,
            // active_state:active_state,
            // current_page:current_page,
            // stranger: text_content[text_content.length-1][1],
            home_circle_data
        }, ()=>{
            console.log(this.state.home_circle_data)
        })
    }

    render() {

        let textContent = this.props.data['text_content'].map((value,index)=>{
            // let left = index >3 ? 50*screen_scale_width : 0
            let left = index >2 ? 50*screen_scale_width : 0
            return (
                <ShowText title={value[0]} text={value[1]} key={`textContent_${index}`} style={{marginLeft: left,
                    // marginTop:7*screen_scale_width
                    marginTop:10*screen_scale_width
                }}/>
            )
        })

        return (
            <Home_content_template style={{...style.wrapStyle,
                // width:88*5*screen_scale_width
            }}
                                   title={this.props.data.title}>
                <div style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:"space-around",
                    height:400*screen_scale_height,
                    width:400*screen_scale_width,
                    position:"relative"
                }}>
                    <Chart_circle height={400*screen_scale_height}
                                  width={400*screen_scale_width}
                                  title={''}
                                  colors = {chart_color}
                                  data={this.state.home_circle_data.entry}
                                  style={{
                                      overflow:'hidden',
                                      position:'absolute',
                                      left:-60
                                  }}/>
                    <Chart_circle height={400*screen_scale_height}
                                  width={400*screen_scale_width}
                                  title={''}
                                  colors={['#27ABB1', '#DAB43A']}
                                  data={this.state.home_circle_data.register}
                                  // data={[
                                  //     {
                                  //         count: 3,
                                  //         item: '已注册',
                                  //     },
                                  //     {
                                  //         count: 1,
                                  //         item: '未注册',
                                  //     },
                                  // ]}
                                  style={{
                                      overflow:'hidden',
                                      position:'absolute',
                                      right:-100
                                  }}/>
                </div>
                <TabBar items={Home_data['class_statistical']['tabValue']} resolve={this.props.click} type={0}
                        style={{width:88*5*screen_scale_width,
                            // height:44*screen_scale_width,
                            height:44*screen_scale_height,
                            // marginTop:38*screen_scale_width
                            marginTop:38*screen_scale_height
                        }}
                current_page={this.state.current_page}/>
            </Home_content_template>
        )
    }

}