import React from 'react'
import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.css'
import { Progress } from 'antd';
import Chart_Pie from '../../../view/Chart/Chart_Pie'
import {screen_scale_height, screen_scale_width} from "../../../view/parameter/parameters";
import { init_select_person, default_select_person, person, course_arr, class_arr, grade_arr } from '../../data/person'

import Roulette_head from "../../../view/Home/Roulette_head";

import plus from '../../../asset/plus.png'
import minus from '../../../asset/minus.png'

const btn_icon = [minus]

const style = {
    wrap:{
        display:'flex',
        flexDirection:'column',
        position:'relative',
    },
    person:{
        display:'flex',
        flexDirection:'row',
        position:'relative',
    },
    personInformation:{
        flexGrow:1,
        height:188*screen_scale_height
    },
    personText_wrap:{
        display:'flex',
        alignItems: 'center'
    },
    persopnText:{
        fontSize:14*screen_scale_height,
        marginTop:13*screen_scale_height,
        color:'#FFFFFF',
    }
}

export default class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            selectPerson:{},
            Pie_data:[],
            mode:0,
            className:0
        }
        this._addPerson = this._addPerson.bind(this)
        this._minusPerson = this._minusPerson.bind(this)
        this._refresh = this._refresh.bind(this)
    }

    componentDidMount(){
        let dataSource = this.props.data
        let { selectPerson, mode, className } = this.props
        console.log(this.props)
        console.log(selectPerson)

        this.setState({
            Pie_data:dataSource,
            selectPerson:{...selectPerson},
            mode:mode,
            className:className
        },()=>{
            // console.log(person[this.state.selectPerson.person])
        })

    }

    componentWillUnmount() {
        console.log(`person inf unmount ${this.state.selectPerson.person}`)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let dataSource = nextProps.data
        let { selectPerson, mode, className } = nextProps

        console.log(selectPerson)

        this.setState({
            Pie_data:dataSource,
            selectPerson:{...selectPerson},
            mode:mode,
            className:className
        },()=>{

        })
    }

    _refresh(){
        this.forceUpdate();
    }

    _addPerson(e){
        e.stopPropagation()
        this.props.addPerson()
    }

    _minusPerson(e){
        e.stopPropagation()
        this.props.minusPerson()
    }

    render() {
        let props = this.props
        console.log(Object.keys(this.state.selectPerson).length)
        console.log(Object.keys(this.state.selectPerson))
        let show_person_flag = Object.keys(this.state.selectPerson).length ? true : false
        let person_icon = null
        let person_grade = show_person_flag ? this.state.selectPerson.grade+1 : '-'
        let person_class = show_person_flag ? this.state.selectPerson.classNum+1 : '-'
        let person_focus_state = show_person_flag ? person[this.state.selectPerson.person].focus_state : 0
        let person_active_state = show_person_flag ? person[this.state.selectPerson.person].active_state : 0
        let person_interactive_state = show_person_flag ? person[this.state.selectPerson.person].interactive_state : 0


        return (
            <div style={{
                ...style.wrap, ...props.style
            }}
                 // className={`${this.state.selectPerson.person}_personInfor`}
                 className={`${this.state.className}`}
                 onClick={props.onClick}>
                <div style={style.person}>
                    <Roulette_head style={{
                        height:188*screen_scale_height,
                        width:188*screen_scale_height,
                        marginLeft:31*screen_scale_height
                    }}
                    name={'student_Roulette'}/>
                    <div style={{
                        // 加 key 解决了 background-size 失效的问题
                        // 在云端的解决办法是 把 background-size 放到 background 里
                        // background: `url(${person[this.state.selectPerson.person].img}) center center / 100% 100% no-repeat`,
                        background: person_icon,
                        backgroundSize:'100% 100%',
                        height:160*screen_scale_height,
                        width:160*screen_scale_height,
                        borderRadius:160/2*screen_scale_height,
                        position: 'absolute',
                        left:(31+(188-160)/2)*screen_scale_height,
                        top:(188-160)/2*screen_scale_height,
                    }} className={`personIcon`}
                    // key={`personIcon_${person[this.state.selectPerson.person].name}`}
                    >
                    </div>
                    <div style={style.personInformation}>
                        <div style={{display:'flex', flexDirection:'column',marginLeft:20*screen_scale_width}}
                             className={'progress_ls'}>
                            <span style={style.persopnText}>{`班级 : ${person_grade}年${person_class}班`}</span>
                            <div style={style.personText_wrap}>
                                <span style={style.persopnText}>专注度 : </span>
                                <Progress percent={person_focus_state}
                                          strokeColor={'#60EDFE'}
                                          format={(percent)=>percent}
                                />
                            </div>
                            <div style={style.personText_wrap}>
                                <span style={style.persopnText}>活跃度 : </span>
                                <Progress percent={person_active_state}
                                          strokeColor={'#60EDFE'}
                                          format={(percent)=>percent}
                                />
                            </div>
                            <div style={style.personText_wrap}>
                                <span style={style.persopnText}>互动率 : </span>
                                <Progress percent={person_interactive_state}
                                          strokeColor={'#60EDFE'}
                                          format={(percent)=>percent}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`student_pie_1`}
                     style={{
                         marginTop:10*screen_scale_width,
                         flexGrow:1,
                         display:'flex',
                     }}
                     onClick={(e)=>{
                         e.stopPropagation()
                     }}
                >
                    {
                        show_person_flag ? (<Chart_Pie height={300*screen_scale_width} title={'专注度分布'}
                                                    data={this.state.Pie_data}
                                                    style={{
                                                        paddingRight:10*screen_scale_width,
                                                        overflow:'hidden'
                                                    }}/>) : null
                    }
                </div>
                <div style={{
                    position:'absolute',
                    bottom:20*screen_scale_width,
                    left:235*screen_scale_width,
                    width:30*screen_scale_width,
                    height:4*screen_scale_width,
                    backgroundColor:'#60EDFE',
                    cursor:'pointer',
                }}
                     onClick={(e)=>{
                         e.stopPropagation()
                     }}/>
                <div style={{
                    position:'absolute',
                    bottom:20*screen_scale_width,
                    left:(235+60)*screen_scale_width,
                    width:30*screen_scale_width,
                    height:4*screen_scale_width,
                    backgroundColor:'#FFFFFF',
                    cursor:'pointer',
                }}/>
                {
                    this.state.mode ?
                        (
                            btn_icon.map((value,index)=>{
                                // let clickFun = index===0 ? this._addPerson:this._minusPerson
                                let clickFun = this._minusPerson
                                return (
                                    <div style={{
                                        background: `url(${btn_icon[index]}) center no-repeat`,
                                        backgroundSize:'100% 100%',
                                        display:'flex',
                                        flexDirection:'column',
                                        justifyContent:'center',
                                        alignSelf:'center',
                                        alignItems:'center',
                                        fontSize:16*screen_scale_width,
                                        cursor:'pointer',
                                        // backgroundColor:'#5856C2',
                                        color:'#FFFFFF',
                                        borderRadius:16*screen_scale_width,
                                        width: 32*screen_scale_width,
                                        height:32*screen_scale_height,
                                        position:'absolute',
                                        top:5*screen_scale_width,
                                        right:0*screen_scale_width
                                    }}
                                         onClick={clickFun}
                                         className={`${index}_btn`}
                                    >
                                    </div>
                                )
                            })
                        ) : null
                }
            </div>
        )
    }
}