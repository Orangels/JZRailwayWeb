import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../../parameter/parameters";
import Home_content_template from "../../../../common/Home_content_template";
import backgroundBanner from "../../../../asset/stu_back/4_学科分布.png";
import Histogram from "../../../Chart/Histogram";

export default class Content_2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Histogram_data:[],
        }
    }

    componentDidMount() {
        let Histogram_data = this.props.Histogram_data || []
        this.setState({
            Histogram_data,
        },()=>{
            console.log(this.state.Histogram_data)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let Histogram_data = nextProps.Histogram_data || []
        this.setState({
            Histogram_data,
        },()=>{
            console.log(this.state.Histogram_data)
        })
    }

    render() {

        return (
            <Home_content_template style={{
                width:709*screen_scale_width,
                height:288 * screen_scale_height,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
                marginTop: 20*screen_scale_width
            }} title={'学科分布'}>
                <Histogram  title={'课程对比'}
                    // height={300*screen_scale_width}
                            height={290*screen_scale_height}
                            width={709*screen_scale_width}
                            dataSource={this.state.Histogram_data}/>
            </Home_content_template>
        )

    }
}