import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import Home_content_template from "../../../common/Home_content_template";
import Chart_custom from '../../Chart/Chart_custom'
import backgroundBanner from "../../../asset/back_new/7_校园学情状态历史.png";

export default class Home_content_3_2 extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {

        return (
            <Home_content_template style={{
                width:499*screen_scale_width,
                height:308 * screen_scale_height,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
                marginTop: 15*screen_scale_width
            }} title={'当前出入人员统计'}>
                <Chart_custom  title={''}
                               // height={276*screen_scale_width}
                               height={276*screen_scale_height}
                               width={496*screen_scale_width}
                />
            </Home_content_template>
        )

    }
}