import React from 'react'
import {Input, Button, Progress, message} from 'antd'
import {system_param, screen_width,model_width, model_height,screen_scale_width,screen_scale_height} from '../../parameter/parameters'
import MainContentTempalte from '../../../common/Home_content_template'
import backgroundBanner from '../../../asset/back/7云服务配置.png'

import {camera_inf, school_inf} from '../../../common/data/pageData'
import {_fetch} from "../../../common/utils";

const style = {
    wrap:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        width:849*screen_scale_width,
        height:464 * screen_scale_height,
    }
}

const Finish_icon = ()=> (
    <i aria-label="icon: check-circle" className="anticon anticon-check-circle">
        <svg viewBox="64 64 896 896" className="" data-icon="check-circle" width="1em" height="1em"
             fill="#60EDFE" aria-hidden="true" focusable="false">
            <path
                d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
        </svg>
    </i>
)

export default class Config_content_2_3 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            is_online:false,
            disabled:true
        };
    }

    componentDidMount() {
        this.setState({
            disabled:this.props.state,
            is_online:this.props.is_online
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            disabled:nextProps.state,
            is_online:nextProps.is_online
        })
    }

    render() {

        let camera_config_component = school_inf.text_content.map((value,index)=>{
            return (
                <div key={`Config_content_2_3_input_${index}`}
                     style={{width:340*screen_scale_width, marginLeft:40*screen_scale_width,marginTop:20*screen_scale_width,
                         backgroundColor:'clear'
                     }}>
                    <Input addonBefore={value[0]}   disabled={this.state.disabled}
                           placeholder={this.state.is_online ? value[1] : ''}
                           style={{
                               backgroundColor:'clear'
                           }}/>
                </div>
            )
        })

        let percent = this.state.is_online ? 100 : 0

        return (
            <MainContentTempalte style={{...style.wrap, ...this.props.style}}
                                 childStyle={{
                                     display:'flex',
                                     width:(848-40)*screen_scale_width,
                                     marginTop:30*screen_scale_width,
                                     flexDirection:'column'
                                 }}
                                 title={'边缘端配置导入'}>
                <div style={{
                    display:'flex',
                    flexDirection:'row'
                }}>
                    {camera_config_component}
                </div>
                <div style={{
                    width:'100%',
                    marginTop:60*screen_scale_width,
                    display:'flex',
                    justifyContent:'space-between',
                }}>
                    <Button style={{
                        width:130*screen_scale_width,
                        height:44*screen_scale_width,
                        backgroundColor:'#5856C2',
                        marginLeft:40*screen_scale_width,
                        fontSize:16*screen_scale_width,
                        color:'#FFFFFF'
                    }}
                            onClick={()=>{
                                this.props.register()
                            }}>
                        导入设备信息
                    </Button>
                    <Button style={{
                        width:130*screen_scale_width,
                        height:44*screen_scale_width,
                        backgroundColor:'#5856C2',
                        marginRight:40*screen_scale_width,
                        fontSize:16*screen_scale_width,
                        color:'#FFFFFF'
                    }}
                            onClick={()=>{
                                // this.props.off_line()
                                localStorage.clear();
                                message.success("离线成功")
                            }}>
                        下线
                    </Button>
                </div>
                <Progress percent={percent} style={{marginTop:20, marginLeft:20, width:'98%', }}
                          strokeColor={{
                              '0%': '#5856C2',
                              '100%': '#5856C2',
                          }}/>
                <div style={{display:"flex",marginLeft:20, marginTop:20, width:'97%',justifyContent:"space-between"}}>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        {this.state.is_online ? <Finish_icon/> : null}
                        <span style={{marginTop:10*screen_scale_width}}>连接摄像头</span>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        {this.state.is_online ? <Finish_icon/> : null}
                        <span style={{marginTop:10*screen_scale_width}}>时间戳同步</span>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        {this.state.is_online ? <Finish_icon/> : null}
                        <span style={{marginTop:10*screen_scale_width}}>硬件信息</span>
                    </div>
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        {this.state.is_online ? <Finish_icon/> : null}
                        <span style={{marginTop:10*screen_scale_width}}>软件信息</span>
                    </div>
                    {/*<div style={{*/}
                    {/*    display:'flex',*/}
                    {/*    flexDirection:'column',*/}
                    {/*    justifyContent:'center',*/}
                    {/*    alignItems:'center'*/}
                    {/*}}>*/}
                    {/*    {this.state.is_online ? <Finish_icon/> : null}*/}
                    {/*    <span style={{marginTop:10*screen_scale_width}}>学期课表</span>*/}
                    {/*</div>*/}
                    <div style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center'
                    }}>
                        {this.state.is_online ? <Finish_icon/> : null}
                        <span style={{marginTop:10*screen_scale_width}}>导入完成</span>
                    </div>
                </div>
            </MainContentTempalte>
        )
    }

}