import React from 'react'
import Template from '../../common/composite_template'
import {screen_scale_width, screen_scale_height} from "../parameter/parameters";

import Config_content_1_1 from './Config_content_1/Config_content_1_1'
import Config_content_2_1 from './Config_content_2/Config_content_2_1'
import Config_content_2_2 from './Config_content_2/Config_content_2_2'
import Config_content_2_3 from './Config_content_2/Config_content_2_3'

import {message} from "antd";
import {_fetch} from "../../common/utils";
import './Config.less'


const style = {
    wrap:{
        display:'flex',
        flexDirection:'column',
        alignSelf:'center',
        marginTop:(19.3+152/2)*screen_scale_height,
        marginLeft:31*screen_scale_width,
        marginRight:30*screen_scale_width,
        width:(1920-30-30)*screen_scale_width,
        height:'auto'
    },
    content_1_1:{
        display:'flex',
        flexDirection:'row',
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

export default class Config extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            disable:true,
            is_online:false
        };
        this._changeStete=this._changeStete.bind(this)
        this._register=this._register.bind(this)
        this._off_line=this._off_line.bind(this)
    }


    _register(){
        this.setState({
            is_online:true
        },()=>{
            message.success('注册成功',2);
        })
        // let register_url = window.location.origin
        // // let register_url = 'http://192.168.88.27:9000';
        // register_url = `${register_url}/register_device`
        // _fetch(register_url,null,(data)=>{
        //     console.log(data)
        //     if (data['Results']===200){
        //         this.setState({
        //             is_online:true
        //         },()=>{
        //             message.success('注册成功',2);
        //         })
        //     }else {
        //         message.error('注册失败',2);
        //     }
        // })
    }

    _off_line(){
        this.setState({
            is_online:false
        },()=>{
            message.success('下线成功',2);
        })
        // let register_url = 'http://192.168.88.27:9000';
        // let register_url = window.location.origin
        // register_url = `${register_url}/off_line`
        // _fetch(register_url,null,(data)=>{
        //     console.log(data)
        //     if (data['Results']===200){
        //         this.setState({
        //             is_online:false
        //         },()=>{
        //             message.success('下线成功',2);
        //         })
        //     }else {
        //         message.error('下线失败',2);
        //     }
        // })
    }

    _changeStete(e){
        this.setState({
            disable:!this.state.disable
        })
    }

    componentDidMount() {
        // 获取注册信息
        // let register_url = 'http://192.168.88.27:9000';
        let register_url = window.location.origin
        register_url = `${register_url}/query_register`
        _fetch(register_url,null,(data)=>{
            this.setState({
                is_online:data.register
            },()=>{
                console.log(this.state.is_online)
            })
        })
    }


    render() {
        return (
            <Template classTag={'Config'} current_page={2} history={this.props.history}
                      style={{flexDirection:'column', height:1080*screen_scale_height}}
            >
                <div style={style.wrap} className={'Config_wrap'}>
                    <Config_content_1_1 is_online={this.state.is_online} />
                    <div style={style.content_2}>
                        <Config_content_2_1 changeState={this._changeStete}/>
                        <div style={style.content_2_2}>
                            <Config_content_2_2 state={this.state.disable}/>
                            <Config_content_2_3 style={{marginTop:20*screen_scale_height}}
                                                state={this.state.disable}
                                                is_online={this.state.is_online}
                                                register={this._register}
                                                off_line={this._off_line}
                            />
                        </div>
                    </div>
                </div>
            </Template>
        )
    }

}