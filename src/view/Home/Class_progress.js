import React, {Component} from 'react';
import { Progress } from 'antd';
import Chart_custom from '../Chart/Chart_custom'
import {screen_scale_width} from "../parameter/parameters";
import './Home.less'

const style = {
    wrapStyle:{
        display:'flex',
        marginTop:64*screen_scale_width,
    },
    wrapProgress:{
        display:'flex',
        flexDirection:'column',
    },
    progress:{
        display:'flex',
    },
    progress_title:{
        color:'#FFFFFF',
        fontSize:14*screen_scale_width
    },
    progress_text:{
        color:'#FFFFFF', fontSize:16*screen_scale_width, backgroundColor:'#331D3D',
        width:310*screen_scale_width,height:44*screen_scale_width,display:'flex',
        justifyContent:'center',alignItems:'center'
    }
};


class ClassProgress extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

    render() {
        return (
            <div className={'progress_ls'} style={style.wrapStyle}>
               <div style={style.wrapProgress}>
                   <div style={style.progress}>
                       <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                           <Progress type="circle" percent={84} strokeColor={{
                               '0%':'#22EEFF',
                               '100%':'#40B2FF'
                           }}
                           />
                           <span style={style.progress_title}>
                            平均活跃度
                        </span>
                       </div>
                       <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginLeft:80.5*screen_scale_width}}>
                           <Progress type="circle" percent={84} strokeColor={{
                               '0%':'#8D84FF',
                               '100%':'#554BCD'
                           }}/>
                           <span style={style.progress_title}>
                            平均专注度
                        </span>
                       </div>
                       <div style={{display:'flex', flexDirection:'column', alignItems:'center', marginLeft:80.5*screen_scale_width}}>
                           <Progress type="circle" percent={84} strokeColor={{
                               '0%':'#FD8A75',
                               '100%':'#FFA18F'
                           }}/>
                           <span style={style.progress_title}>
                            平均活动率
                        </span>
                       </div>
                   </div>
                   <div style={{display:'flex', marginLeft:38*screen_scale_width, marginTop:40*screen_scale_width}}>
                       <div style={{display:'flex', flexDirection:"column"}}>
                           <span style={{color:'#FFFFFF', fontSize:16*screen_scale_width, whiteSpace:'pre'}}>当天出勤人数            <span style={{
                               color:'#22EEFF',
                               fontSize:32*screen_scale_width
                           }}>28</span> </span>
                           <span style={{color:'#FFFFFF', fontSize:16*screen_scale_width, whiteSpace:'pre', marginTop:50*screen_scale_width}}>出勤率                 <span style={{
                               color:'#22EEFF',
                               fontSize:32*screen_scale_width
                           }}>100%</span> </span>
                       </div>
                       <div style={{display:'flex', flexDirection:"column", marginLeft:100*screen_scale_width}}>
                           <div style={style.progress_text}>
                               回答问题 <span style={{color:'#22EEFF'}}>79</span>次
                           </div>
                           <div style={{...style.progress_text, marginTop:10*screen_scale_width}}>
                               认真听课 <span style={{color:'#22EEFF'}}>2222h</span>,占比<span style={{color:'#22EEFF'}}>87%</span>
                           </div>
                           <div style={{...style.progress_text, marginTop:10*screen_scale_width}}>
                               学生交流,不专注行为次数累计
                           </div>
                       </div>
                   </div>
               </div>
                <div style={{width:'98%', backgroundColor:'clear', marginLeft:50*screen_scale_width}}
                     className={`Home_line_chart`}>
                    <Chart_custom  dataSource={''} title={''} height={(493-50-64)*screen_scale_width} width={1000*screen_scale_width}
                                   />
                </div>
            </div>
        );
    }
}

export default ClassProgress;