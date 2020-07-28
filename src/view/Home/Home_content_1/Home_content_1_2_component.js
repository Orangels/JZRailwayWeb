import React from 'react'
import {screen_scale_width} from "../../parameter/parameters";
import backgroundBanner from '../../../asset/back_new/9_数据框.png'

const style = {
    wrap:{
        height:78*screen_scale_width,
        width:210*screen_scale_width,
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

export default class Home_content_1_2_component extends React.Component {
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