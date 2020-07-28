import React from 'react'
import { Button } from 'antd'
import {screen_scale_height, screen_scale_width} from "../../../parameter/parameters";
import Home_content_template from "../../../../common/Home_content_template";
import backgroundBanner from "../../../../asset/stu_back/3_学情分析.png";


let defaultContent='辛学仕同学的互动度为23，低于正常范围（54），建议努力提高课堂上与老师和的互动，专注度为72，高于正常范（54），学习认真，辛学仕同学的互动度为23，低于正常范围（54），建议努力提高课堂上与老师和的互动，专注度为72，高于正常\n' +
    '范围（54），学习认真，辛学仕同学的互动度为23，低于正常范围（54），建议努力提高课堂上与老师和的互动，专注度为72，高于正常范围（54），学习认真，辛学仕同学的互动度为23，低于正常范围'

export default class Content_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            content:['']
        }

    }

    componentDidMount() {
        this.setState({
            content:this.props.data || []
        })

    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            content:nextProps.data || []
        })
    }

    render() {
        let content_com = this.state.content.map((item,i)=>{
            return (
                <p>
                    {item}
                </p>
            )
        })

        return (
            <Home_content_template style={{
                width:709*screen_scale_width,
                height:248 * screen_scale_height,
                background: `url(${backgroundBanner}) no-repeat `,
                backgroundSize:'100% 100%',

            }} title={'学情分析'}>
                {
                    this.state.content.length > 0 ? (
                        <Button style={{
                            position:"absolute",
                            top:20*screen_scale_width,
                            right:20*screen_scale_width,
                            width:100*screen_scale_width,
                            height:40*screen_scale_width,
                            borderRadius:10,
                            color:'#FFFFFF',
                            backgroundColor:'transparent',
                            display:'flex',
                            justifyContent:'center'
                        }}
                                onClick={this.props.generate_report}
                        >
                            生成报表
                        </Button>
                    ) : null
                }
                <div className={`Student_content_1_2_1`}
                    style={{
                        alignSelf:'center',
                        width:(709-30-17)*screen_scale_width,
                        // marginTop:10*screen_scale_width
                        marginTop:30*screen_scale_width
                    }}
                >
                    {/*{this.state.content}*/}
                    {content_com}
                </div>
            </Home_content_template>
        )

    }
}