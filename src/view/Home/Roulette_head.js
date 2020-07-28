import React from 'react'
import backgroundBanner from "../../asset/back/4.png";
import {screen_scale_height, screen_scale_width} from "../parameter/parameters";


import './Home.less'

const style = {
    backgroundBanner: {
        background: `url(${backgroundBanner}) no-repeat `,
        width: 225*screen_scale_height,
        height: 228 * screen_scale_height,
        backgroundSize: '100% 100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
    },
}

export default class Roulette_head extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }


      render() {
          let className = this.props.name || 'Roulette'
          return (
              <div style={{...style.backgroundBanner, ...this.props.style}} className={className}>
              </div>
          )
      }
}