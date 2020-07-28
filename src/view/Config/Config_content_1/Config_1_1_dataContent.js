import React from 'react'
import {system_param, screen_width,model_width, model_height,screen_scale_width,screen_scale_height} from '../../parameter/parameters'

import backgroundBanner from '../../../asset/back/2数据框.png'

const style = {
    wrap:{
        height:78*screen_scale_width,
        // width:210*screen_scale_width,
        width:250*screen_scale_width,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems: 'center',
        background:`url(${backgroundBanner}) no-repeat `,
        backgroundSize: '100% 100%',
        marginTop:5*screen_scale_width

    },
    title:{
        color:'#09FAFC',
        fontSize:28*screen_scale_width,
    },
    text:{
        color:'#FFFFFF',
        fontSize: 14*screen_scale_width,
    }
}

export default class Config_1_1_dataContent extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {
        let { title, text }  = this.props

        return (
            <div style={{...style.wrap, ...this.props.style}}>
                <span style={style.title}>
                    {title}
                </span>
                <span style={style.text}>
                    {text}
                </span>
            </div>
        )
    }
}