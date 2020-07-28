import React from 'react'
import { Select } from 'antd'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import Home_content_template from "../../../common/Home_content_template";
import Chart_custom from '../../Chart/Chart_custom'
import backgroundBanner from "../../../asset/stu_back/8_状态曲线.png";
import {grade_arr} from "../../../common/data/person";

const { Option } = Select;

export default class Student_content_1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            line_data:[],
        }
        this._changeMode=this._changeMode.bind(this)
    }

    _changeMode(value){
        console.log(value)
        this.props._changeMode(value)
    }

    componentDidMount() {
        let line_data = this.props.line_data || []
        this.setState({
            line_data,
        },()=>{
            // console.log(this.state.Histogram_data)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let line_data = nextProps.line_data || []
        this.setState({
            line_data,
        },()=>{
            // console.log(this.state.Histogram_data)
        })
    }

    render() {

        return (
            <Home_content_template style={{
                width:1859*screen_scale_width,
                height:378 * screen_scale_height,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',
                overflow:'Hidden'
            }} title={'状态曲线'}>
                <Chart_custom  title={''}
                    // height={276*screen_scale_width}
                               width={1859*screen_scale_width}
                               height={300*screen_scale_height}
                               dataSource={this.state.line_data}
                />
                <Select style={{
                    width: 120*screen_scale_width,
                    position:'absolute',
                    top:20*screen_scale_width,
                    right:50*screen_scale_width
                }}
                        onChange={this._changeMode}
                        defaultValue={0}>
                    <Option value={0}>专注度</Option>
                    <Option value={1}>活跃度</Option>
                    <Option value={2}>互动度</Option>
                </Select>
            </Home_content_template>
        )

    }
}