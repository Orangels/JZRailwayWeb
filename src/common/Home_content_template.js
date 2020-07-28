import React from 'react'
import backgroundBanner from "../asset/back_new/2_校园综合数据.png";
import {screen_scale_height, screen_scale_width} from "../view/parameter/parameters";
import backBanner from "../asset/back/7.jpg";

const style = {
    wrap:{
        display: 'flex',
        flexDirection: 'column',
    },
    backgroundBanner: {
        backgroundColor:'clear',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
    topBanner: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#FFFFFF',
        fontSize: 16 * screen_scale_width,
        marginTop:25*screen_scale_height,
    },
}

export default class Home_content_template extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }

      render() {
          let props = this.props
          // let banner = props.banner || backgroundBanner
          return (
              <div style={{...style.backgroundBanner,
                  ...props.style
              }}>
                  <div style={style.topBanner}>
                      {this.props.title}
                  </div>
                  <div style={{
                      ...props.childStyle
                  }} className={props.childName || "home_content_templates"}>
                      {props.children}
                  </div>
              </div>
          )
      }
}