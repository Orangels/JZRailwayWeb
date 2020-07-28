import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import Home_content_template from "../../../common/Home_content_template";
import Histogram from '../../Chart/Histogram'
import Chart_area from '../../Chart/Chart_area'
import backgroundBanner from "../../../asset/back_new/11_课程分布.png";

export default class Home_content_3_3 extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Home_content_template style={{
                width:499*screen_scale_width,
                // height:310 * screen_scale_width,
                height:358 * screen_scale_height,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
                marginTop: 10*screen_scale_width
            }} title={'区域人员统计'}>
                {/*<Histogram  title={'进出人员统计'}*/}
                {/*            // height={300*screen_scale_width}*/}
                {/*            height={365*screen_scale_height}*/}
                {/*            width={490*screen_scale_width}*/}
                {/*/>*/}
                <Chart_area
                    height={365*screen_scale_height}
                    width={490*screen_scale_width}
                />
            </Home_content_template>
        )

    }
}