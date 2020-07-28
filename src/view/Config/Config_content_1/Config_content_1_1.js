import React from 'react'
import {system_param, screen_width,model_width, model_height,screen_scale_width,screen_scale_height} from '../../parameter/parameters'
import MainContentTempalte from '../../../common/Home_content_template'
import backgroundBanner from '../../../asset/back/1设备状态.png'
import finfishIcon from '../../../asset/back/9完成icon.svg'
import Config_1_1_dataContent from './Config_1_1_dataContent'
import { dev_inf } from '../../../common/data/pageData'
import { randomNum, randomNum_f } from '../../../common/utils'

import {Cascader} from 'antd'

import ReactSVG from 'react-svg'
import shapeIcon from "../../../asset/icon/Shape.svg";

const options = [
    {
        value: 'nano_0',
        label: '边缘端 1',
    },
    {
        value: 'nano_1',
        label: '边缘端 2',
    },
    {
        value: 'nano_2',
        label: '边缘端 3',
    },
    {
        value: 'nano_3',
        label: '边缘端 4',
    },
    {
        value: 'nano_4',
        label: '边缘端 5',
    },
]

const style = {
    wrap:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        width:1859*screen_scale_width,
        height:198 * screen_scale_height,
    }
}

export default class Config_content_1_1 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dev_confg:dev_inf.text_content,
            is_online:false
        };
        this._updata_data = this._updata_data.bind(this)
        this._select_class = this._select_class.bind(this)
        this._displayRender = this._displayRender.bind(this)
    }

    _select_class(value){
        console.log(value)
    }

    _displayRender(label){
        return label[label.length - 1];
    }

    _updata_data(){
        let dev_config_tmp = [...this.state.dev_confg]

        dev_config_tmp[0][0] = `${randomNum(40,60)}%`
        dev_config_tmp[1][0] = `${randomNum(6,10)}%`
        // dev_config_tmp[3][0] = `${randomNum_f(3,6)*1024}M`

        this.setState({
            dev_config:dev_config_tmp
        })
    }

    componentDidMount() {
        this.setState({
            is_online:this.props.is_online
        })
        this.timer = setInterval(this._updata_data, 2*1000);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            is_online:nextProps.is_online
        })
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
        console.log('clear home_1_2 timer')
    }

    render() {

        let dev_config = this.state.dev_confg.map((value,index)=>{
            return (
                <Config_1_1_dataContent title={value[0]} text={value[1]} key={`textContent_1_2_${index}`}
                                            style={{marginLeft:42*screen_scale_width}}/>
            )
        })

        let text_color = this.state.is_online ? '#9299FB' : '#F8110F'

        return (
            <MainContentTempalte style={{...style.wrap, ...this.props.style}}
                                 childStyle={{
                                     display:'flex',
                                     width:(1859-34)*screen_scale_width,

                                 }}
                                 title={'服务器状态'}>
                <div style={{
                    height:80*screen_scale_width,
                    marginTop:28*screen_scale_width,
                    marginLeft:34*screen_scale_width,
                    display:'flex',
                    alignSelf:'center'
                }}>
                    {/*<div style={{*/}
                    {/*    display:'flex',*/}
                    {/*    alignItems:'center'*/}
                    {/*}}>*/}
                    {/*    <ReactSVG src={shapeIcon} />*/}
                    {/*    <span style={{*/}
                    {/*        color:text_color,*/}
                    {/*        fontSize:16*screen_scale_width,*/}
                    {/*        marginLeft:10*screen_scale_width,*/}
                    {/*        width:32*2*screen_scale_width*/}
                    {/*    }}>*/}
                    {/*        {this.state.is_online ? '已关联' : '未关联'}*/}
                    {/*    </span>*/}
                    {/*    <Cascader*/}
                    {/*        options={options}*/}
                    {/*        expandTrigger="hover"*/}
                    {/*        // displayRender={this._displayRender}*/}
                    {/*        style={{ marginTop:10*screen_scale_width, marginLeft:10*screen_scale_width,}}*/}
                    {/*        // defaultValue={['3年', '2班']}*/}
                    {/*        placeholder={'选择边缘端'}*/}
                    {/*        onChange={this._select_class}*/}
                    {/*        className={'config_class_select'}*/}
                    {/*    />*/}
                    {/*</div>*/}
                    {/*<div style={{*/}
                    {/*    backgroundColor:'#484E94',*/}
                    {/*    width:1,*/}
                    {/*    height:80*screen_scale_width,*/}
                    {/*    marginLeft:25*screen_scale_width*/}
                    {/*}}>*/}
                    {/*</div>*/}
                    {dev_config}
                </div>

            </MainContentTempalte>
        )
    }

}