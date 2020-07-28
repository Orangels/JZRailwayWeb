import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../../parameter/parameters";
import Home_content_template from "../../../../common/Home_content_template";
import backgroundBanner from "../../../../asset/stu_back/1_个人信息.png";
import RotateCard from '../../../../common/component/RotateCard'
import PersonalInformation from '../../../../common/component/personComponent/PersonalInformation'
import SelectPerson from '../../../../common/component/personComponent/SelectPerson'

import { default_select_person, person, course_arr, class_arr, grade_arr } from '../../../../common/data/person'

import { focus_state, active_state, interactive_state } from "../../../../common/data/pie_chart_data";

const style = {
    person:{
        widht:'100%',
        height:(283+185)*screen_scale_height
    }
}

const Pie_data = [focus_state, active_state, interactive_state]

export default class Student_content_1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            show_mode:0,
            Pie_data:Pie_data,
            selectPerson:{

            }
        }
        this.onRef=this.onRef.bind(this)
    }

    componentDidMount() {
        let show_mode = this.props.show_mode || 0
        this.setState({
            show_mode:show_mode
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let show_mode = nextProps.show_mode || 0
        this.setState({
            show_mode:show_mode
        })
        // this.RotateCard._rotateTest(0)
    }

    _click(num,e){
        console.log(num)
        if (num===0){
            e.stopPropagation()
            this.setState({
                Pie_data:[[],[],[]]
            },()=>{
                this.RotateCard._rotate(num)
            })
        }else {
            e.stopPropagation()
            this.setState({
                Pie_data:Pie_data
            },()=>{
                this.RotateCard._rotate(num)
            })
        }
    }

    _cancelClick(num, rotateNum, param,e){

        //param 保存的设定信息
        console.log(param)
        this.setState({
            Pie_data:Pie_data,
            selectPerson:{...param}
        },()=>{
            this.RotateCard._rotate(num)
            this.props.uploadDate(param)
        })
    }


    onRef = (ref) => {
        this.RotateCard = ref;
    }

    render() {
        let props = this.props
        return (

            <Home_content_template style={{
                                            ...{
                                                width:549*screen_scale_width,
                                                height:556 * screen_scale_height,
                                                background: `url(${backgroundBanner}) no-repeat `,
                                                backgroundSize:'100% 100%',
                                            }, ...props.style
                                        }} title={'个人信息'}
                                   childStyle={{
                                       display:'flex',
                                       justifyContent:'center',
                                       marginTop: 20*screen_scale_height,
                                       height:(283+190)*screen_scale_height,
                                       width:'100%',
                                   }}
                                   childName={'student_content_1_1'}
            >
                <RotateCard
                            onRef={this.onRef}
                            transition={2}
                >
                    <SelectPerson style={{ width:'100%', height:'100%'}}
                                  selectPerson={this.state.selectPerson}
                                  _cancelClick={this._cancelClick.bind(this,0,0)}/>
                    <PersonalInformation style={{width:'100%', height:'100%'}}  onClick={this._click.bind(this,1)}
                                         selectPerson={this.state.selectPerson}
                                         data={this.state.Pie_data[this.state.show_mode]}
                                         data_mode={this.state.show_mode}/>
                </RotateCard>
            </Home_content_template>
        )

    }
}