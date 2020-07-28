import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import {show_2_ste} from '../../../common/utils'
import Home_content_template from "../../../common/Home_content_template";
import { Progress } from 'antd';
import backgroundBanner from "../../../asset/back_new/2_校园综合数据.png";
import Chart_circle from "../../Chart/Chart_circle";
import {chart_color} from "../../Chart/chart_config";

const progress_width = 130

const style = {
    wrapStyle:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        width:499*screen_scale_width,
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

export default class Home_content_3_1 extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (

                <Home_content_template style={{...style.wrapStyle,
                    // width:88*5*screen_scale_width
                }} title={'房间区域驻留状态'}
                                       childStyle={style.childWrap}
                                       childName={'progress_ls'}
                >
                    <div style={style.progress}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                            <Progress type="circle" percent={62} format={percent => `${show_2_ste(percent/100 * 24)} 小时`}
                                      strokeColor={{
                                          // '0%':'#08D6E2',
                                          // '100%':'#51ECDA'
                                          '0%': '#108ee9',
                                          '100%': '#87d068',
                                      }}
                                      width={progress_width*screen_scale_width}
                            />
                            <span style={style.progress_title}>
                                区域1驻留时长
                            </span>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', }}>
                            <Progress type="circle" percent={51} format={percent => `${show_2_ste(percent/100 * 24)} 小时`}
                                      strokeColor={{
                                          '0%':'#08D6E2',
                                          '100%':'#51ECDA'
                                      }}
                                      width={progress_width*screen_scale_width}/>
                            <span style={style.progress_title}>
                                    区域2驻留时长
                                </span>
                        </div>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', }}>
                            <Progress type="circle" percent={48} format={percent => `${show_2_ste(percent/100 * 24)} 小时`}
                                      strokeColor={{
                                          '0%':'#08D6E2',
                                          '100%':'#51ECDA'
                                      }}
                                      width={progress_width*screen_scale_width}/>
                            <span style={style.progress_title}>
                                区域3驻留时长
                            </span>
                        </div>
                    </div>
                    <div>
                        <div style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:"space-around",
                            height:350*screen_scale_height,
                            width:'100%',
                            position:"relative",
                            // background:'red'
                        }}>
                            <Chart_circle height={350*screen_scale_height}
                                          width={350*screen_scale_width}
                                          title={''}
                                          // colors = {chart_color}
                                // data={this.state.Pie_data}
                                          style={{
                                              overflow:'hidden',
                                              position:'absolute',
                                              left:-60
                                          }}
                                          isPie={true}
                            />
                            <span style={{
                                overflow:'hidden',
                                position:'absolute',
                                left:25,
                                bottom:35,
                                fontSize:12,
                                color:'#FFFFFF',
                            }}>
                              区域 1 人数统计
                            </span>
                            <Chart_circle height={350*screen_scale_height}
                                          width={350*screen_scale_width}
                                          title={''}
                                // colors = {chart_color}
                                // data={this.state.Pie_data}
                                          style={{
                                              overflow:'hidden',
                                              position:'absolute',
                                              left:65
                                          }}
                                          isPie={true}
                            />
                            <span style={{
                                overflow:'hidden',
                                position:'absolute',
                                left:150,
                                bottom:35,
                                fontSize:12,
                                color:'#FFFFFF',
                            }}>
                              区域 2 人数统计
                            </span>
                            <Chart_circle height={350*screen_scale_height}
                                          width={350*screen_scale_width}
                                          title={''}
                                          // colors={chart_color.slice(-2)}
                                          data={[
                                              {
                                                  count: 3,
                                                  item: '进入',
                                              },
                                              {
                                                  count: 1,
                                                  item: '离开',
                                              },
                                          ]}
                                          style={{
                                              overflow:'hidden',
                                              position:'absolute',
                                              right:-75
                                          }}
                                          isPie={true}
                            />
                            <span style={{
                                overflow:'hidden',
                                position:'absolute',
                                right:20,
                                bottom:35,
                                fontSize:12,
                                color:'#FFFFFF',
                            }}>
                              区域 3 人数统计
                            </span>
                        </div>
                    </div>
                </Home_content_template>
        )

    }
}