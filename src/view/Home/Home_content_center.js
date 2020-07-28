import React from 'react'
import Home_content_template from '../../common/Home_content_template'
import {Home_data} from './Home_data'
import {screen_scale_width} from "../parameter/parameters";
import Home from "./Home";

const style = {
    wrapStyle:{
        width:678*screen_scale_width,
        height:280 * screen_scale_width,
        topwidth:320*screen_scale_width,
        topheight:40 * screen_scale_width,
        topleft:170*screen_scale_width,
        toptop:(-50-10) / 2 * screen_scale_width,
        margin:`${(251-41)*screen_scale_width}px 32px 0px 32px`
    },
}

export default class Home_content_center extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

      render() {

        let content_component_left = Home_data.center_content[0].map((divList, index)=>{
            let fontSize = index === 0 ? 16*screen_scale_width : 32*screen_scale_width
            let left = index === 0 ? 0 : 45*screen_scale_width
            let content_item = divList.map((value, jndex)=> {
                let top = jndex === 0 ? 0 : 20 *screen_scale_width
                return (
                    <div style={{marginTop:top}}>
                        {value}
                    </div>
                )
            })
            return (
                <div style={{display:'flex',flexDirection:"column",justifyContent:'space-around',
                    color:'#FFFFFF',fontSize:fontSize, marginLeft: left}}>
                    {content_item}
                </div>
            )
        })

          let content_component_right = Home_data.center_content[1].map((divList, index)=>{
              let fontSize = index === 0 ? 16*screen_scale_width : 32*screen_scale_width
              let left = index === 0 ? 0 : 45*screen_scale_width
              let content_item = divList.map((value, jndex)=> {
                  let top = jndex === 0 ? 0 : 20 *screen_scale_width
                  return (
                      <div style={{marginTop:top}}>
                          {value}
                      </div>
                  )
              })
              return (
                  <div style={{display:'flex',flexDirection:"column",justifyContent:'space-around',
                      color:'#FFFFFF',fontSize:fontSize, marginLeft:left}}>
                      {content_item}
                  </div>
              )
          })
        return (
            <Home_content_template style={style.wrapStyle} title={'数据总览'} >
                <div style={{display:'flex', justifyContent:'space-around',alignItems:'center', height:'100%', width:'100%'}}>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        {content_component_left}
                    </div>
                    <div style={{height:210*screen_scale_width,width:1,backgroundColor:'#FD8A75'}}/>
                    <div style={{display:'flex', justifyContent:'space-between'}}>
                        {content_component_right}
                    </div>
                </div>
            </Home_content_template>
        )
      }
}