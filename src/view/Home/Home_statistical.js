import React from 'react'
import TabBar from '../../common/TabBar'
import Roulette_head from './Roulette_head'
import Home_content_template from '../../common/Home_content_template'
import {Home_data} from './Home_data'
import backgroundBanner from "../../asset/边框1.png";
import topBanner from "../../asset/边框2.png";
import btnBanner from "../../asset/按钮1.png";
import {screen_scale_width} from "../parameter/parameters";
import ShowText from '../../common/component/ShowText'

const style = {
    wrapStyle:{
        width:496*screen_scale_width,
        height:530 * screen_scale_width,
    },
    backgroundBanner: {
        background: `url(${backgroundBanner}) no-repeat `,
        width: 1076/2*screen_scale_width,
        height: 982 / 2 * screen_scale_width,
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    topBanner:{
        background: `url(${topBanner}) no-repeat `,
        width: 440/2*screen_scale_width,
        height: 84 / 2 * screen_scale_width,
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        position: 'absolute',
        color:'#FFFFFF',
        fontSize:20*screen_scale_width,
        left:153*screen_scale_width,
        top:(-84-10) / 4 * screen_scale_width
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
        height:44*screen_scale_width,
        fontSize:16*screen_scale_width,
        borderRadius:44/2*screen_scale_width
    },
    btn:{
        background: `url(${btnBanner}) no-repeat `,
        width: 260/2*screen_scale_width,
        height: 76 / 2 * screen_scale_width,
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems: 'center',
        position: 'relative',
        marginTop:59/2*screen_scale_width,
        fontSize:16*screen_scale_width,
        color:'#FFFFFF',
        cursor:'pointer'
    }
}

export default class Home_statistical extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

      render() {

          let textContent = Home_data['class_statistical']['text_content'].map((value,index)=>{
              let left = index >3 ? 50*screen_scale_width : 0
              return (
                  <ShowText title={value[0]} text={value[1]} key={`textContent_${index}`} style={{marginLeft: left, marginTop:7*screen_scale_width}}/>
              )
          })

          return (
              <Home_content_template style={style.wrapStyle} title={this.props.data.title}>
                  <div style={{
                      display:"flex",
                      flexDirection: 'column',
                      alignItems:'flex-start',
                      flexWrap:'wrap',
                      width:'100%',
                      paddingLeft:20*screen_scale_width,
                      marginTop:16*screen_scale_width,
                      height:30*screen_scale_width*4 + 7*screen_scale_width*4
                  }}>
                      {textContent}
                  </div>
                  <div style={{ display:'flex', alignItems:'center', width:'100%', marginTop:62*screen_scale_width-7*screen_scale_width*4,
                      position:'relative'
                  }}>
                      <Roulette_head style={{marginLeft:128*screen_scale_width}}/>

                  </div>
                  <div style={{
                      ...style.roulette, top:314*screen_scale_width,
                      left:64*screen_scale_width,
                      color:'#09FAFC'
                  }}>
                      活跃度 92
                  </div>
                  <div style={{
                      ...style.roulette, top:244*screen_scale_width,
                      left:297*screen_scale_width,
                      color:'#FF9895'
                  }}>
                      互动率 72
                  </div>
                  <div style={{
                      ...style.roulette, top:341*screen_scale_width,
                      left:279*screen_scale_width,
                      color:'#FFE98C'
                  }}>
                      专注度 92
                  </div>
                  <div style={{
                      position: 'absolute',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent:'center',
                      alignItems: 'center',
                      top:283*screen_scale_width,
                      left:209*screen_scale_width,
                      width:'auto',
                      height:'auto',
                      fontSize:50*screen_scale_width,
                      color:'#22EEFF'
                  }}>
                      94
                  </div>
                  <TabBar items={Home_data['class_statistical']['tabValue']} resolve={(index)=>{console.log(index)}} type={0}
                          style={{width:88*5*screen_scale_width, height:44*screen_scale_width, marginTop:38*screen_scale_width}}/>
              </Home_content_template>
          )
      }

}