import React from 'react'

import {
    Redirect,
} from 'react-router-dom'

import { LoginTag } from '../../view/parameter/parameters'
import { Menu, Icon, Button, Layout, Avatar, Tabs, Select, DatePicker, Progress, Input, Radio,
    TimePicker, Alert, message } from 'antd';

// import Header_banner from '../../asset/HOME_icon/banner.jpg'
// import Header_banner from '../../asset/HOME_icon/bg.png'
// import bupt from "../../asset/HOME_icon/bupt.png"
import Header_banner from '../../asset/Home_icon/bg.png'
import bupt from '../../asset/Home_icon/bupt.png'



let screen_height = document.documentElement.clientHeight;

export default class Login extends React.Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            change_view:false,
            user:0,
            password:0
        };
        this._login = this._login.bind(this)
        this.user = this.user.bind(this)
        this.password = this.password.bind(this)

    }

    user(value){
        console.log(value.target.value)
        this.setState({
            user:value.target.value
        })
    }

    password(value){
        console.log(value.target.value)
        this.setState({
            password:value.target.value
        })
    }

    _login(){
        console.log('login')
        if (this.state.user === 'admin' && this.state.password === 'admin'){
            localStorage.setItem(LoginTag, true);
            this.setState({
                change_view: true
            })
        }
        else {
            message.info('账号密码错误');
        }

    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        return this.state.change_view ?
            (
                <Redirect to={from}/>
            )
            :
            (
                <div style={{display:'flex', justifyContent:'center', alignItems:'center',
                    background:`url(${Header_banner}) no-repeat `,
                    width: '100%',
                    // width: "100%",
                    // height:500,
                    height:screen_height,
                    backgroundSize: '100% 100%',
                    position:'relative'
                }}>
                    <div style={{display:'flex', flexDirection:'row', marginRight:10, position:"absolute", right:20, top:0}}>
                        <dic style={{marginRight:20, display:'flex', flexDirection:'column', alignItems: 'flex-end'}}>
                            <span style={{fontSize:38, color:'#FFFFFF'}}>STEP智慧课堂</span>
                            <span style={{color:'#FFFFFF'}}>BUPT-PRIV</span>
                        </dic>
                        <img src={bupt} height={84} style={{marginTop:7, borderStyle:'solid', borderRadius:42, borderWidth:0}}/>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:'center',alignItems:'center',
                        width:400, backgroundColor:'#FFFFFF', borderRadius:5,
                    }}>
                        <span style={{fontSize:45, marginTop:20,}}>用户登录</span>
                        <Input placeholder={'账号'}  style={{ marginTop:20, width:303}} onChange={this.user} />
                        <Input.Password placeholder={'密码'} password style={{ marginTop:20, width:303}} onChange={this.password}/>
                        <Radio.Group name="login_mode" defaultValue={1} style={{marginTop:20}}>
                            <Radio value={1}>管理员</Radio>
                            {/*<Radio value={2}>教师</Radio>*/}
                            {/*<Radio value={3}>学生</Radio>*/}
                        </Radio.Group>
                        <Button type="primary" style={{width:300, marginTop:40, marginBottom:40,}}
                                onClick={this._login}>
                            登录
                        </Button>
                    </div>
                </div>
            )
    }

}