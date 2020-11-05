import React from 'react'
import {Row, Col} from 'antd'
import {screen_scale_height, screen_scale_width} from "../view/parameter/parameters"
import item_banner from '../asset/按钮3.png'
import item_banner_current from '../asset/按钮2.png'


const style = {
    wrapStyle:[
        {
            display:'flex',
        },
        {
            display:'flex',
            flexDirection: 'column',
        }
    ],
    item:[
        {
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            color: '#FFFFFF',
            // backgroundColor:'#001017',
            fontSize:14*screen_scale_width,
            border:'1px solid #FFFFFF',
            // borderRadius:2,
            cursor:'pointer',
            transition: '.3s all',
        },
        {
            background:`url(${item_banner}) no-repeat `,
            width: 230/2*screen_scale_width,
            // height:76/2*screen_scale_width,
            height:76/2*screen_scale_height,
            backgroundSize: '100% 100%',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            color:'#FFFFFF',
            fontSize:14*screen_scale_width,
            cursor:'pointer',
            marginTop:10*screen_scale_width
        }
    ],
    current_style:[
        {
            // backgroundColor:'#001017',
            border:'1px solid #09FAFC',
            color:'#09FAFC',
            // transform: "scale(1.1, 1.1)",
            transform: "translateY(-10px)",
            transition: '.3s all',
            backgroundColor:'transparent'
        },
        {
            color:'#09FAFC',
            background:`url(${item_banner_current}) no-repeat `,
            width: 258/2*screen_scale_width,
            backgroundSize: '99% 99%',
        }
    ]
}

export default class TabBar extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            current_page:0
        };
      }

      _click(index, resolve){
          this.setState({
              current_page:index
          },()=>{
              resolve(index)
          })
      }


    componentDidMount() {
        let {current_page} = this.props
        this.setState({
            current_page:current_page,
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let {current_page} = nextProps
        console.log(`tabbar ${current_page}`)
        this.setState({
            current_page:current_page,
        })
    }


      render() {
          let { items, resolve } = this.props
          let { type } = this.props || 0

          let itemLen = items.length
          items = items.map((value,index)=>{
              let current_style = index === this.state.current_page ? style.current_style[type] : {}
              return (
                  <Col span={24/itemLen} style={{...style.item[type], ...current_style}}
                       onClick={this._click.bind(this,index,resolve)}
                       key={`TabBarItem_${index}`}>
                      {value}
                  </Col>
              )
          });

          return (
              <Row style={{...style.wrapStyle[type], ...this.props.style}} >
                  {items}
              </Row>
          )
      }

}