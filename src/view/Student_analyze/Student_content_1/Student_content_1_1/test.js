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
import { randomNum } from "../../../../common/utils";

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
        }
        this._minusPerson=this._minusPerson.bind(this)
        this.changeRef=this.changeRef.bind(this)
        this.onRef=this.onRef.bind(this)
        this._addPerson=this._addPerson.bind(this)
        this._cancelClick=this._cancelClick.bind(this)
        this._click=this._click.bind(this)
    }

    _click(num,rotateNum,e,){

        console.log(`click num ${num}`)
        console.log(`click rotateNu, ${rotateNum}`)
        console.log(this.RotateCard)

        if (num===0){
            this.setState({
                Pie_data:[]
            },()=>{
                this.RotateCard[rotateNum]._rotate(num)
            })
        }else {
            e.stopPropagation()
            this.setState({
                Pie_data:Pie_data
            },()=>{
                this.RotateCard[rotateNum]._rotate(num)
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
            this.RotateCard[rotateNum]._rotate(num)
        })
    }

    onRef = (ref) => {
        // this.RotateCard = ref;
        this.RotateCard.push(ref)
        console.log(ref)
    }

    changeRef (index, ref) {
        this.RotateCard[index] = ref
    }

    _addPerson(num,e){
        let index = this.state.selectPersons.length
        if (this.state.selectPersons.length < 3){
            let [...selectPersonsTmp] = this.state.selectPersons
            selectPersonsTmp.push(default_select_person)
            this.setState({
                selectPersons:selectPersonsTmp
            },()=>{
                this.swiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    // direction:'vertical',
                    // loop: true,//无缝轮播
                    observer: true,
                    observeParents: false,
                    navigation: {//左右分页
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
                this.swiper.updateSlides()
                this.swiper.update()
                this.swiper.slideTo(num+1, 1000, false);
                console.log(this.state.selectPersons)
                message.success('添加成功',2);
            })
        }else {
            message.error('已达到添加上限',2);
        }
    }

    _minusPerson(num, e){

        let index = this.state.selectPersons.length
        console.log(`num-${num}`)
        console.log(this.state.selectPersons)

        if (this.state.selectPersons.length > 0){

            this.RotateCard.splice(num,1)
            this.swiper.slideTo(0, 1000, false);
            let [...selectPersonsTmp] = this.state.selectPersons
            selectPersonsTmp.splice(num,1);
            this.setState({
                selectPersons:selectPersonsTmp
            },()=>{
                this.swiper = new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    // direction:'vertical',
                    // loop: true,//无缝轮播
                    observer: true,
                    observeParents: false,
                    navigation: {//左右分页
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                })
                this.swiper.updateSlides()
                this.swiper.update()
                console.log(this.state.selectPersons)
                message.success('删除成功',2);
            })
        }else {
            message.error('已清空',2);
        }
    }

    componentWillMount() {
        this.RotateCard = []
    }

    componentDidMount() {
        this.swiper = new Swiper('.swiper-container', {
            direction: 'horizontal',
            // direction:'vertical',
            // loop: true,//无缝轮播
            // observer:true,
            observeParents:true,
            navigation: {//左右分页
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        })
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
                <div className="swiper-container" style={{
                    display:'flex',
                }}>
                    {
                        this.state.selectPersons.length > 0 ?
                            this.state.selectPersons.map((selectPerson,index)=>{
                                console.log(selectPerson)
                                return (
                                    <div className={`swiper-wrapper ${selectPerson.person}_swiper`}>
                                        <div className="swiper-slide"
                                             style={{width:396, }}
                                             key={`${index}_slide`}>
                                            <RotateCard
                                                onRef={this.onRef}
                                                changeRef={this.changeRef}
                                                transition={2}
                                                key={`${index}_RotateCard`}
                                                tagPoint={index}
                                                mode={1}
                                            >
                                                <SelectPerson
                                                    key={`${index}_selectPerson`}
                                                    style={{ width:'100%', height:'100%'}}
                                                    selectPerson={selectPerson}
                                                    _cancelClick={this._cancelClick.bind(this,0,index)}/>
                                                <PersonalInformation key={`personInf_${index}`}
                                                                     className={`${randomNum(0,100)}_PersonalInformation`}
                                                                     style={{width:'100%', height:'100%'}}  onClick={this._click.bind(this,1,index)}
                                                                     data={this.state.Pie_data}
                                                                     selectPerson={selectPerson}
                                                                     mode={1}
                                                                     addPerson={this._addPerson.bind(this,index)}
                                                                     minusPerson={this._minusPerson.bind(this, index)}
                                                />
                                            </RotateCard>
                                        </div>
                                    </div>
                                )
                            })

                            :
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
                    }
                    {
                        this.state.selectPersons.length > 0 ?
                            (
                                ["swiper-button-prev",'swiper-button-next'].map((value,index)=>{
                                    return  <div className={value}
                                                 onClick={()=>{
                                                     console.log(value)
                                                 }
                                                 }>
                                    </div>
                                })

                            )
                            : null
                    }
                </div>
            </Home_content_template>
        )

    }
}