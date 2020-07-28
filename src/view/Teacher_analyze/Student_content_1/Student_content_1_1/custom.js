import React from 'react'
import { message, } from 'antd';
import {screen_scale_height, screen_scale_width} from "../../../parameter/parameters";
import Home_content_template from "../../../../common/Home_content_template";
import backgroundBanner from "../../../../asset/stu_back/1_个人信息.png";
import RotateCard from '../../../../common/component/RotateCard'
import PersonalInformation from '../../../../common/component/personComponent/PersonalInformation'
import SelectPerson from '../../../../common/component/personComponent/SelectPerson'
import { default_select_person,default_select_person_1,default_select_person_2, person, course_arr, class_arr, grade_arr } from '../../../../common/data/person'


import ReactSwipe from 'react-swipe';

import Swiper from 'swiper/js/swiper.js'
import 'swiper/css/swiper.css'

const style = {
    person:{
        widht:'100%',
        height:(283+185)*screen_scale_height
    }
}

const Pie_data = [{
    item: "非常专注",
    count: 49
},
    {
        item: "非常不专注",
        count: 21
    },
    {
        item: "正常专注",
        count: 17
    },
    {
        item: "比较专注",
        count: 13
    },]

export default class Student_content_1_3 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            Pie_data:Pie_data,
            RotateCardArr:[],
            selectPersons:[],
            current_page:0,
        }
        this.onRef=this.onRef.bind(this)
        this._minusPerson=this._minusPerson.bind(this)
        this._addPerson=this._addPerson.bind(this)
        this._cancelClick=this._cancelClick.bind(this)
        this._click=this._click.bind(this)
        this._nextPerson=this._nextPerson.bind(this)
        this._previousPerson=this._previousPerson.bind(this)
    }

    _click(num,rotateNum,e,){
        console.log(`click num ${num}`)
        console.log(`click rotateNu, ${rotateNum}`)
        if (num===0){
            this.setState({
                Pie_data:[]
            },()=>{
                console.log(this.RotateCard)
                // this.RotateCard[rotateNum]._rotate(num)
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

    /**
     *
     * @param num mode 参数
     * @param rotateNum slide index
     * @param param  person obj
     * @param e
     * @private
     */
    _cancelClick(num, rotateNum, param,e){

        //param 保存的设定信息
        let [...selectPersonsTmp] = this.state.selectPersons
        selectPersonsTmp[rotateNum] = param
        this.setState({
            Pie_data:Pie_data,
            selectPersons:selectPersonsTmp
        },()=>{
            // this.RotateCard[rotateNum]._rotate(num)
            this.RotateCard._rotate(num)
        })
    }

    onRef = (ref) => {
        this.RotateCard = ref;
        // this.RotateCard.push(ref)
    }

    _addPerson(e){
        let index = this.state.selectPersons.length
        if (this.state.selectPersons.length < 3){
            let [...selectPersonsTmp] = this.state.selectPersons
            selectPersonsTmp.push({})
            this.setState({
                selectPersons:selectPersonsTmp
            },()=>{
                // this.reactSwipeEl.next()
                // console.log(this.state.selectPersons)
                message.success('添加成功',2);

            })
        }else {
            message.error('已达到添加上限',2);
        }
    }

    _minusPerson(num, e){

        let index = this.state.selectPersons.length
        let current_page = this.state.current_page

        if (current_page === index-1){
            current_page = index-2
        }
        if (current_page === -1){
            current_page = 0
        }
        // console.log(`num-${num}`)
        // console.log(this.state.selectPersons)

        if (this.state.selectPersons.length > 0){
            let [...selectPersonsTmp] = this.state.selectPersons
            selectPersonsTmp.splice(num,1);
            this.setState({
                selectPersons:selectPersonsTmp,
                current_page:current_page
            },()=>{
                // this.reactSwipeEl.prev()
                // console.log(this.state.selectPersons)
                message.success('删除成功',2);

            })
        }else {
            message.error('已清空',2);
        }
    }


    _nextPerson(){
        if (this.state.current_page+1<this.state.selectPersons.length){
            this.setState({
                current_page:this.state.current_page+1
            },()=>{
                console.log(`current page -- ${this.state.current_page}`)
            })
        }
    }

    _previousPerson(){
        if (this.state.current_page > 0){
            this.setState({
                current_page:this.state.current_page-1
            },()=>{
                console.log(`current page -- ${this.state.current_page}`)
            })
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    render() {
        let props = this.props
        console.log(`render`)
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
                <div
                    className="carousel"
                >
                    {
                        this.state.selectPersons.length > 0 ?

                            <RotateCard
                                onRef={this.onRef}
                                transition={2}
                                key={`${this.state.current_page}_RotateCard`}
                                style={{width:396, height:500*screen_scale_width}}
                                className={`${this.state.current_page}_rotate`}
                            >
                                <SelectPerson
                                    key={`${this.state.current_page}_selectPerson`}
                                    style={{ width:'100%', height:'100%', transition: 'all 1.5s',}}
                                    selectPerson={this.state.selectPersons[this.state.current_page]}
                                    _cancelClick={this._cancelClick.bind(this,0,this.state.current_page)}/>
                                <PersonalInformation key={`personInf_${this.state.current_page}`}
                                                     style={{width:'100%', height:'100%', transition: 'all 1.5s',}}
                                                     onClick={this._click.bind(this,1,this.state.current_page)}
                                                     data={this.state.Pie_data}
                                                     selectPerson={this.state.selectPersons[this.state.current_page]}
                                    // selectPerson={{}}
                                                     mode={1}
                                                     addPerson={this._addPerson}
                                                     minusPerson={this._minusPerson.bind(this, this.state.current_page)}
                                />
                            </RotateCard>


                            :
                            <div style={{width:396, height:500*screen_scale_width}}>
                                <button style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    justifyContent:'center',
                                    alignSelf:'center',
                                    alignItems:'center',
                                    fontSize:16*screen_scale_width,
                                    cursor:'pointer',
                                    backgroundColor:'#5856C2',
                                    color:'#FFFFFF',
                                    borderRadius:10,
                                    width: 110*screen_scale_width,
                                    height:44*screen_scale_height,
                                }}
                                        onClick={this._addPerson}
                                >
                                    添加对比
                                </button>
                            </div>

                    }
                </div>
                <button style={{
                    position: 'absolute',
                    bottom:0,
                    left:0,
                    width:100,
                    height:100}}
                        onClick={this._previousPerson}>Previous</button>
                <button style={{
                    position: 'absolute',
                    bottom:0,
                    right:0,
                    width:100,
                    height:100
                }}
                        onClick={this._nextPerson}>Next</button>

            </Home_content_template>
        )

    }
}