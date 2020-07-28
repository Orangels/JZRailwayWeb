import React from 'react'

import { Menu, Icon, Button, Layout, Avatar, Tabs, Select, DatePicker, Progress, Input, Radio,
    TimePicker } from 'antd';

import {system_param, screen_width,model_width, model_height,screen_scale_width,screen_scale_height} from '../../parameter/parameters'
import MainContentTempalte from '../../../common/Home_content_template'
import backgroundBanner from '../../../asset/back/3配置.png'
import Upload_compent from '../Upload_compent'

const style = {
    wrap:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        width:979*screen_scale_width,
        height:734 * screen_scale_height,
    }
}

export default class Config_content_2_1 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            disable:true
        };
        this._change_config = this._change_config.bind(this)
        this._cancel_config=this._cancel_config.bind(this)
    }

    _change_config(e){
        this.setState({
            disable: !this.state.disable
        },()=>{
            this.props.changeState()
        })
    }

    _cancel_config(e){
        this.setState({
            disable: true
        },()=>{
            this.props.changeState()
        })
    }

    render() {

        return (
            <MainContentTempalte style={{...style.wrap, ...this.props.style}}
                                 childStyle={{
                                     display:'flex',
                                     width:(979-35)*screen_scale_width,
                                     marginTop:30*screen_scale_width,
                                 }}
                                 title={'服务器配置'}>
                <div style={{height:'auto',display:'flex',flexDirection:'column',}}>
                    <div style={{display:"flex",alignItems:'center'}}>
                          <span style={{fontSize:16*screen_scale_width,color:'#FFFFFF'}}>
                             网络配置
                          </span>
                        <Button type="primary" style={{width:100*screen_scale_width, marginLeft:(750-100-20)*screen_scale_width, marginRight:10*screen_scale_width}}
                                onClick={this._change_config}>
                            {this.state.disable ? '编辑' : '确定'}
                        </Button>
                        <Button type="primary" style={{width:100*screen_scale_width, marginLeft:(20)*screen_scale_width,}}
                                onClick={this._cancel_config}>
                            取消
                        </Button>
                    </div>
                    <div style={{marginLeft:20,marginTop:20, display:'flex', flexDirection:'row'}}>
                        <Input addonBefore='ip 地址:' defaultValue={'192.168.88.27'} disabled={this.state.disable} style={{marginLeft:10}}/>
                        <Input addonBefore='网关:' defaultValue={'192.168.88.1'} disabled={this.state.disable} style={{marginLeft:10}}/>
                        <Input addonBefore='子网掩码:' defaultValue={'255.255.255.0'} disabled={this.state.disable} style={{marginLeft:10}}/>
                    </div>
                    {/*<div style={{display:"flex",justifyContent:"space-between", marginTop:20}}>*/}
                    {/*          <span style={{fontSize:16*screen_scale_width,color:'#FFFFFF'}}>*/}
                    {/*             数据传输配置*/}
                    {/*          </span>*/}
                    {/*</div>*/}
                    {/*<div style={{marginLeft:20,marginTop:20, }}>*/}
                    {/*    <span style={{marginRight:20, fontSize:16*screen_scale_width}}>数据发送间隔:</span>*/}
                    {/*    <Radio.Group name="data_interval" defaultValue={3} disabled={this.state.disable}>*/}
                    {/*        <Radio value={1}>5 s</Radio>*/}
                    {/*        <Radio value={2}>10 s</Radio>*/}
                    {/*        <Radio value={3}>15 s</Radio>*/}
                    {/*        <Radio value={4}>1 min</Radio>*/}
                    {/*    </Radio.Group>*/}
                    {/*    <Input addonBefore='单人最多发送张数' defaultValue={3} disabled={this.state.disable} style={{marginLeft:10,*/}
                    {/*        width:250*screen_scale_width*/}
                    {/*    }}/>*/}
                    {/*</div>*/}
                    <div style={{display:"flex",justifyContent:"space-between", marginTop:20}}>
                              <span style={{fontSize:16*screen_scale_width,color:'#FFFFFF'}}>
                                 工作时间配置
                              </span>
                    </div>
                    <div style={{marginLeft:20,marginTop:20, }}>
                        <span style={{fontSize:16*screen_scale_width}}>时间范围:</span>
                        <TimePicker placeholder={`开始时间`} use12Hours format="h:mm a"  disabled={this.state.disable}
                                    style={{marginLeft:40}}/>
                        <TimePicker placeholder={`结束时间`} use12Hours format="h:mm a"  disabled={this.state.disable}
                                    style={{marginLeft:40}}/>
                    </div>
                    <div style={{display:"flex",justifyContent:"space-between", marginTop:20}}>
                              <span style={{fontSize:16*screen_scale_width,color:'#FFFFFF'}}>
                                 自动重启配置
                              </span>
                    </div>
                    <div style={{marginLeft:20,marginTop:20, }}>
                        <span style={{marginRight:20, fontSize:16*screen_scale_width}}>自动重启:</span>
                        <Radio.Group name="auto_reboot" defaultValue={1} disabled={this.state.disable}>
                            <Radio value={1}>开启</Radio>
                            <Radio value={2}>关闭</Radio>
                        </Radio.Group>
                        <span style={{marginLeft:60*screen_scale_width}}>自动重启时间:</span>
                        <TimePicker placeholder={`自动重启时间`} use12Hours format="h:mm a"  disabled={this.state.disable}
                                    style={{marginLeft:40}}/>

                    </div>
                    <div style={{display:"flex",justifyContent:"space-between", marginTop:20}}>
                              <span style={{fontSize:16*screen_scale_width,color:'#FFFFFF'}}>
                                 固件版本升级
                              </span>
                    </div>
                    <div style={{marginLeft:20,marginTop:20, }}>
                        <span style={{marginRight:20, fontSize:16*screen_scale_width}}>当前固件版本:  sys-verson-v1.1</span>
                        <Upload_compent disabled={this.state.net_compile}/>

                    </div>
                </div>
            </MainContentTempalte>
        )
    }

}