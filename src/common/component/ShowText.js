import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../view/parameter/parameters";


const style = {
    wrap:{
        // height:30*screen_scale_width,
        height:30*screen_scale_height,
        display:'flex',
        alignItems: 'center',
    },
    title:{
        color:'#FFFFFF',
        fontSize:14*screen_scale_width,
        width:65*screen_scale_width
    },
    text:{
        marginLeft:8*screen_scale_width,
        color:'#09FAFC',
        fontSize: 18*screen_scale_width,
        letterSpacing:5
    }
}

export default class ShowText extends React.Component {
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