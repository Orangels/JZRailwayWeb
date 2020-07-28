import React from 'react'
import {Input} from 'antd'
import {system_param, screen_width,model_width, model_height,screen_scale_width,screen_scale_height} from '../../parameter/parameters'
import MainContentTempalte from '../../../common/Home_content_template'
import backgroundBanner from '../../../asset/back/6相机配置.png'

import { camera_inf } from '../../../common/data/pageData'

const style = {
    wrap:{
        background: `url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        width:849*screen_scale_width,
        height:244 * screen_scale_height,
    }
}

export default class Config_content_2_2 extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            disabled:true
        };
    }

    componentDidMount() {
        this.setState({
            disabled:this.props.state
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            disabled:nextProps.state
        })
    }

    render() {

        let camera_config_component = camera_inf.text_content.map((value,index)=>{
            return (
                <div key={`Config_content_2_2_input_${index}`}
                    style={{width:340*screen_scale_width, marginLeft:40*screen_scale_width,marginTop:20*screen_scale_width,
                    backgroundColor:'clear'
                }}>
                    <Input addonBefore={value[0]}  defaultValue={value[1]} disabled={this.state.disabled}
                    style={{
                        backgroundColor:'clear'
                    }}/>
                </div>
            )
        })

        return (
            <MainContentTempalte style={{...style.wrap, ...this.props.style}}
                                 childStyle={{
                                     display:'flex',
                                     width:(848-40)*screen_scale_width,
                                     marginTop:30*screen_scale_width,
                                     flexWrap:'wrap'
                                 }}
                                 title={'相机配置'}>
                {camera_config_component}
            </MainContentTempalte>
        )
    }

}