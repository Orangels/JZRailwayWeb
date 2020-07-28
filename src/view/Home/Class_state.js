import React from 'react'
import backgroundBanner from '../../asset/边框4.png'
import Home_content_template from '../../common/Home_content_template'
import TabBar from '../../common/TabBar'
import ClassProgress from './Class_progress'
import {screen_scale_width} from "../parameter/parameters";
import male_icon from '../../asset/male.png'
import female_icon from '../../asset/female.png'
import {person} from '../../common/data/person'
import btnBanner from "../../asset/按钮1.png";
import './Home.less'

const style = {
    wrapStyle:{
        width:(1818-30)*screen_scale_width,
        height:(1007+120-40) * screen_scale_width,
        topwidth:(174.6+21.9+3.7)*screen_scale_width,
        topheight:32 * screen_scale_width,
        topleft:(1818/2-(174.6+21.9+3.7)/2)*screen_scale_width,
        toptop:(-50-10) / 2 * screen_scale_width,
        margin:`${55*screen_scale_width}px 0px 0px 0px`
    },
    btn:{
        background: `url(${btnBanner}) no-repeat `,
        width: 82*screen_scale_width,
        height: 38 * screen_scale_width,
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        position: 'relative',
        marginTop:20/2*screen_scale_width,
        fontSize:16*screen_scale_width,
        color:'#FFFFFF',
        cursor:'pointer'
    },
    line:{
        width:1760*screen_scale_width,
        height:1,
        marginTop:54*screen_scale_width
}
}

export default class Class_state extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }


      render() {

          let img_width = 136*screen_scale_width;
          let content_1_height = 610;
          let gender_img = 25;
          let student_card_height = 30;
          let person_new = person.concat(person)
          let img_wall = person_new.map((item,i)=>{
              let color = item.gender ? '#52B3E1' : '#E075BB'
              let left = i%11 === 0 ? 0 : 21.7*screen_scale_width
              return (
                  <div  style={{height:img_width,width:img_width,position:"relative", marginLeft:left,background:`url(${item.img}) center no-repeat`,
                      backgroundSize:'100% 100%',opacity:item.opacity}}>
                      <img src={item.gender ? male_icon : female_icon} style={{height:gender_img,width:gender_img,position:"absolute", top:0, right:0}} />
                      <div style={{height:'auto',width:'100%',position:"absolute", bottom:0,backgroundColor:`rgba(61,62,73,0.5)`, color:color,textAlign:'center', fontSize:12}}
                      >{`${item.name}:${item.id}`}</div>
                  </div>
              )

          });

          return (
              <Home_content_template style={{...style.wrapStyle, margin:`${this.props.style.marginTop}px 0 0 ${21*screen_scale_width}px`,
              padding:`${40*screen_scale_width}px 0px 0 ${30*screen_scale_width}px`, alignItems:'flex-start'}}
                                     banner={backgroundBanner}
                                     title={'班级动态'}>
                  <TabBar items={['实时模式','载入模式',]} resolve={(index)=>{console.log(index)}} style={{ alignSelf:'flex-start'}}
                          type={0}/>

                  <div style={{display:'flex', flexWrap:'wrap', marginTop:30, overflowY:'auto', flexBasis:'35%',}}>
                      {img_wall}
                  </div>
                  <div style={{display:'flex', alignSelf:'center'}}>
                      <div style={style.btn}>
                          上一页
                      </div>
                      <div style={{...style.btn, marginLeft:20*screen_scale_width}}>
                          下一页
                      </div>
                  </div>
                  <div className={'Home_line'} style={style.line}/>
                  <div style={{
                      position:"absolute",
                      top:530*screen_scale_width,
                      // left:869*screen_scale_width,
                      left:885*screen_scale_width,
                      color:'#FFFFFF',
                      fontSize:20*screen_scale_width
                  }}>
                      班级详情
                  </div>
                  <ClassProgress />

              </Home_content_template>
          )
      }

}