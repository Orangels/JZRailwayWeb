import React from 'react'
import {Select, DatePicker} from 'antd'
import moment from 'moment';
import {screen_scale_height, screen_scale_width} from "../../../view/parameter/parameters";
import {  init_select_person,default_select_person, person, course_arr, class_arr, grade_arr } from '../../data/person'


const { Option } = Select;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;


const style={
    wrap:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    content_1:{
        display:'flex',
        flexDirection:'row',
        width: 390*screen_scale_width,
        justifyContent:'space-between'
    },
    content_2:{
        display:'flex',
        flexDirection:'column',
    },
    content_2_span:{
        fontSize:16*screen_scale_width,
        color:'#FFFFFF',
        marginTop:14*screen_scale_width,
        marginBottom:10*screen_scale_width
    }

}

export default class SelectPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            startTime:Date.now(),
            endTime:Date.now(),
            grade:0,
            classNum:0,
            course:0
        }
        this._confirmClick = this._confirmClick.bind(this)
        this._cancelClick = this._cancelClick.bind(this)

        this._changePerson = this._changePerson.bind(this)
        this._changeTime = this._changeTime.bind(this)
        this._changeClass = this._changeClass.bind(this)
        this._changeGrade = this._changeGrade.bind(this)
        this._changeCourse = this._changeCourse.bind(this)
    }

    componentDidMount(){

    }

    componentWillReceiveProps(nextProps, nextContext) {

    }

    _changeGrade(value){
        this.setState({
            grade:value
        })
    }

    _changeClass(value){
        this.setState({
            classNum:value
        })
    }

    _changeCourse(value){
        this.setState({
            course:value
        })
    }

    _changePerson(value){
        this.setState({
            person:value
        },()=>{
            console.log(this.state)
        })
    }

    _changeTime(type, date, dateString){
        if (type===0){
            this.setState({
                startTime:date._d.getTime()
            })
        }else {
            this.setState({
                endTime:date._d.getTime()
            })
        }
    }

    componentDidMount() {
        let { selectPerson, } = this.props
        let mode = this.props.mode || 0
        selectPerson = selectPerson || this.state
        this.setState({
            ...selectPerson,
        },()=>{
            this.defaultState = Object.assign({},this.state)
        })

    }

    componentWillReceiveProps(nextProps, nextContext) {
        let { selectPerson, } = nextProps
        let mode = nextProps.mode || 0
        selectPerson = selectPerson || this.state

        this.setState({
            ...selectPerson
        },()=>{
            this.defaultState = Object.assign({},this.state)
        })

        // this.setState((prevState) => {
        //     console.log(`更新 state`)
        //     if (prevState.hasOwnProperty('person')){
        //         delete prevState.person
        //     }
        //     return selectPerson
        // },()=>{
        //     this.defaultState = Object.assign({},this.state)
        // })
    }

    _cancelClick(e){
        console.log('cancel click')
        console.log(this.defaultState)
        e.stopPropagation()

        // this.setState(this.defaultState,()=>{
        //     console.log(this.state)
        //     if (this.defaultState.hasOwnProperty('person')){
        //         this.props._cancelClick(this.state)
        //     }else {
        //         this.props._cancelClick({})
        //     }
        // })

        this.setState((prevState) => {
            if (prevState.hasOwnProperty('person')){
                delete prevState.person
            }
            return this.defaultState
        },()=>{
            console.log(this.state)
            if (this.defaultState.hasOwnProperty('person')){
                this.props._cancelClick(this.state)
            }else {
                this.props._cancelClick({})
            }
        })


    }

    _confirmClick(e){
        e.stopPropagation()
        console.log('confirmClick click')
        console.log(this.state)
        this.defaultState = Object.assign({},this.state)
        //TODO 这里做传值处理
        if (this.state.hasOwnProperty('person')){
            console.log(`传 state`)
            this.props._cancelClick(this.state)
        }else {
            console.log(`传 空`)
            this.props._cancelClick({})
        }
    }

    render() {
        let props = this.props
        return (
            <div style={{
                ...props.style
            }}
                 // onClick={this._cancelClick}
            >
                <div style={style.wrap}>
                    <div style={style.content_1}>
                        <div style={style.content_2}
                        onClick={(e)=>{
                            e.stopPropagation()
                        }}
                        >
                            <span style={style.content_2_span}>
                                年级
                            </span>
                            <Select style={{ width: 120 }} onChange={this._changeGrade}
                                    value={this.state.grade}>
                                {grade_arr.map((grade, index)=>{
                                    return (
                                        <Option value={index}>
                                            {grade}
                                        </Option>
                                    )
                                })}
                            </Select>

                            <span style={style.content_2_span}>
                                开始时间
                            </span>
                            <DatePicker onChange={this._changeTime.bind(this,0)}
                            style={{width:120}}
                                        value={moment(this.state.startTime)}/>
                            <span style={style.content_2_span}>
                                姓名
                            </span>
                            <Select  style={{ width: 120 }} onChange={this._changePerson}
                                     value={this.state.person}
                            >
                                {person.map((stu, index)=>{
                                    return (
                                        <Option value={index}>
                                            {stu.name}
                                        </Option>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={style.content_2}
                             onClick={(e)=>{
                                 e.stopPropagation()
                             }}
                        >
                            <span style={style.content_2_span}>
                                班级级
                            </span>
                            <Select style={{ width: 120 }} onChange={this._changeClass}
                            value={this.state.classNum}>
                                {class_arr.map((classNum, index)=>{
                                    return (
                                        <Option value={index}>
                                            {classNum}
                                        </Option>
                                    )
                                })}
                            </Select>

                            <span style={style.content_2_span}>
                                结束时间
                            </span>
                            <DatePicker onChange={this._changeTime.bind(this,1)}
                                        style={{width:120}}
                                        value={moment(this.state.endTime)}/>
                            {/*{*/}
                            {/*    this.state.mode !== 2 ? (*/}
                            {/*        <div style={style.content_2}>*/}
                            {/*            <span style={style.content_2_span}>*/}
                            {/*                科目*/}
                            {/*            </span>*/}
                            {/*            <Select style={{ width: 120 }} onChange={this._changeCourse}*/}
                            {/*                    value={this.state.course}>*/}
                            {/*                {course_arr.map((course, index)=>{*/}
                            {/*                    return (*/}
                            {/*                        <Option value={index}>*/}
                            {/*                            {course}*/}
                            {/*                        </Option>*/}
                            {/*                    )*/}
                            {/*                })}*/}

                            {/*            </Select>*/}
                            {/*        </div>*/}
                            {/*    ) : null*/}
                            {/*}*/}
                            <span style={style.content_2_span}>
                                            科目
                                        </span>
                            <Select style={{ width: 120 }} onChange={this._changeCourse}
                                    value={this.state.course}>
                                {course_arr.map((course, index)=>{
                                    return (
                                        <Option value={index}>
                                            {course}
                                        </Option>
                                    )
                                })}

                            </Select>
                        </div>
                    </div>
                    <button style={{
                        width:390*screen_scale_width,
                        height:44*screen_scale_width,
                        backgroundColor:'#5856C2',
                        color:'#FFFFFF',
                        borderRadius:10,
                        marginTop:30*screen_scale_width
                    }}
                    onClick={this._confirmClick}>
                        确定
                    </button>
                </div>
                <div style={{
                    position:'absolute',
                    bottom:20*screen_scale_width,
                    left:235*screen_scale_width,
                    width:30*screen_scale_width,
                    height:4*screen_scale_width,
                    backgroundColor:'#FFFFFF',
                    cursor:'pointer',
                }}
                     onClick={this._cancelClick}
                />
                <div style={{
                    position:'absolute',
                    bottom:20*screen_scale_width,
                    left:(235+60)*screen_scale_width,
                    width:30*screen_scale_width,
                    height:4*screen_scale_width,
                    backgroundColor:'#60EDFE',
                    cursor:'pointer',
                }}
                     onClick={(e)=>{
                         e.stopPropagation()
                     }}
                />
            </div>
        )
    }
}