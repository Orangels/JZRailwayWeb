import React from 'react'

import {screen_scale_width} from "../parameter/parameters";
import {_download_file, deepCopy, randomNum, show_2_int, show_2_ste} from "../../common/utils";
import {
    mean_data,
    teacher as person,
    state_arr,
    summary_teacher_default,
    state_default,
    summary_default
} from '../../common/data/person'


import Template from '../../common/composite_template'
import Student_content_2_1 from './Student_content_2/Student_content_2_1'
import Content_1 from './Student_content_1/Student_content_1_2/Content_1'
import Content_2 from './Student_content_1/Student_content_1_2/Content_2'

import Student_content_1_1 from './Student_content_1/Student_content_1_1/Student_content_1_1'
import Student_content_1_3 from './Student_content_1/Student_content_1_1/Student_content_1_3'

import './teacher_analyze.less'

const style = {
    content:{
        marginTop:96*screen_scale_width,
        marginLeft:30*screen_scale_width,
        display:'flex',
        flexDirection:'column',
    },
    content_1_wrap:{
        display:'flex',
    },
    content_1_2_wrap:{
        display:'flex',
        flexDirection:'column',
        marginLeft: 26*screen_scale_width
    }
}

export default class Teacher_analyze extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            show_mode:0,  // 专注, 活跃, 互动
            summary:'',
            main_person:{},
            compare_persons:[],
            data_2:{
                total_state: [],
                course_state:[],
            },
        };
        this._change_compare_persons = this._change_compare_persons.bind(this)
        this._change_main_person = this._change_main_person.bind(this)
        this._generate_date_timer = this._generate_date_timer.bind(this)
        this._query = this._query.bind(this)
        this._changeMode=this._changeMode.bind(this)
        this._generate_report=this._generate_report.bind(this)
    }

    _generate_report(){

        let url = window.location.origin
        console.log(url)
        let compare_mode = this.state.main_person.hasOwnProperty('person') && this.state.compare_persons.length > 0
        let upload_data = {...this.state, select_tab:'Data_repoty_tab_3', compare_mode: compare_mode}
        console.log(upload_data)
        // url = 'http://192.168.88.91:9000/generate_reports'
        url = `${url}/generate_reports`
        // let url = 'http://127.0.0.1:9000/generate_reports'
        _download_file(url, {
            state_data:{...upload_data}
        },(blob)=> {
            console.log('200 ok')
            let url = window.URL.createObjectURL(blob);
            let filename = 'report.docx'
            let a = document.createElement('a')
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
        })
    }

    _changeMode(param){
        this.setState({
            show_mode:param
        },()=>{
            // this._query()
            this._updateSummary()
        })
    }

    // _generate_date_timer(start_time, end_time){
    //     let diff_time = (end_time - start_time)/10
    //
    //     // let random_sid_1 = randomNum(0, 149-40)
    //     // let random_sid_2 = randomNum(0, 149-40)
    //
    //     let jump_flag = Math.floor((mean_data[0].length-40) / person.length)
    //
    //     let random_sid_1 = 19
    //     let random_sid_2 = 75
    //
    //     console.log('*******')
    //     console.log(random_sid_1)
    //     console.log(random_sid_2)
    //     console.log('*******')
    //
    //     let data_2 = {
    //         total_state: [],
    //         course_state:[],
    //     }
    //
    //     let hasMain_person = Object.keys(this.state.main_person).length > 0 ? true : false
    //     let index = this.state.show_mode
    //
    //     let course_state = []
    //     let total_state = []
    //
    //
    //     if (hasMain_person){
    //         course_state.push({
    //             name: person[this.state.main_person['person']]['name'],
    //             "一班": mean_data[index][this.state.main_person['person']*jump_flag+0],
    //             "二班": mean_data[index][this.state.main_person['person']*jump_flag+1],
    //             "三班": mean_data[index][this.state.main_person['person']*jump_flag+2],
    //             "四班": mean_data[index][this.state.main_person['person']*jump_flag+3],
    //             "五班": mean_data[index][this.state.main_person['person']*jump_flag+4],
    //         },)
    //     }
    //
    //
    //     for ( let compare_person_index in this.state.compare_persons){
    //         console.log(this.state.compare_persons[compare_person_index]['person'])
    //         if (Object.keys(this.state.compare_persons[compare_person_index]).length>0){
    //             course_state.push({
    //                 name: person[this.state.compare_persons[compare_person_index]['person']]['name'],
    //                 "一班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+0],
    //                 "二班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+1],
    //                 "三班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+2],
    //                 "四班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+3],
    //                 "五班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+4],
    //             })
    //         }
    //
    //     }
    //
    //     console.log(course_state)
    //
    //     for (let i=0;i<40;i++){
    //         let timetamp = start_time + i*diff_time
    //         let date = new Date(timetamp)
    //         let month = date.getMonth() + 1
    //         let day = date.getDate()
    //         let hour = show_2_int(date.getHours())
    //         let min = show_2_int(date.getMinutes())
    //
    //         if (hasMain_person){
    //             total_state.push({
    //                 // time: `${month}-${day}\n${hour}:${min}`,
    //                 time: `${i}分`,
    //                 state_type: person[this.state.main_person['person']]['name'],
    //                 state:mean_data[index][this.state.main_person['person']*jump_flag+i]
    //             })
    //         }
    //
    //         for ( let compare_person_index in this.state.compare_persons){
    //             if (Object.keys(this.state.compare_persons[compare_person_index]).length>0){
    //                 total_state.push({
    //                     // time: `${month}-${day}\n${hour}:${min}`,
    //                     time: `${i}分`,
    //                     state_type: person[this.state.compare_persons[compare_person_index]['person']]['name'],
    //                     state:mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+i]
    //
    //                 })
    //             }
    //         }
    //     }
    //
    //     data_2.course_state = [...course_state]
    //     data_2.total_state = [...total_state]
    //
    //
    //     this.setState({
    //         data_2:data_2
    //         // loading:false
    //     },()=>{
    //         console.log(this.state.data_2)
    //         this._updateSummary()
    //     });
    //
    //
    // }

    _generate_date_timer(start_time, end_time){
        let diff_time = (end_time - start_time)/10

        // let random_sid_1 = randomNum(0, 149-40)
        // let random_sid_2 = randomNum(0, 149-40)

        let jump_flag = Math.floor((mean_data[0].length-40) / person.length)

        let random_sid_1 = 19
        let random_sid_2 = 75

        console.log('*******')
        console.log(random_sid_1)
        console.log(random_sid_2)
        console.log('*******')

        let data_2 = {
            total_state: {
                [state_arr[0]]:[],
                [state_arr[1]]:[],
                [state_arr[2]]:[],
            },
            course_state:{
                [state_arr[0]]:[],
                [state_arr[1]]:[],
                [state_arr[2]]:[],
            }
        }

        let hasMain_person = Object.keys(this.state.main_person).length > 0 ? true : false
        // let index = this.state.show_mode

        let course_state = {
            [state_arr[0]]:[],
            [state_arr[1]]:[],
            [state_arr[2]]:[],
        }
        let total_state = {
            [state_arr[0]]:[],
            [state_arr[1]]:[],
            [state_arr[2]]:[],
        }

        if (hasMain_person){
            for (let index=0;index<3;index++){
                course_state[state_arr[index]].push({
                    name: person[this.state.main_person['person']]['name'],
                    // "英语": mean_data[index][this.state.main_person['person']*jump_flag+0],
                    // "语文": mean_data[index][this.state.main_person['person']*jump_flag+1],
                    // "数学": mean_data[index][this.state.main_person['person']*jump_flag+2],
                    // "物理": mean_data[index][this.state.main_person['person']*jump_flag+3],
                    // "化学": mean_data[index][this.state.main_person['person']*jump_flag+4],
                    // "生物": mean_data[index][this.state.main_person['person']*jump_flag+5],
                    // "地理": mean_data[index][this.state.main_person['person']*jump_flag+6],
                    "一班": mean_data[index][this.state.main_person['person']*jump_flag+0],
                    "二班": mean_data[index][this.state.main_person['person']*jump_flag+1],
                    "三班": mean_data[index][this.state.main_person['person']*jump_flag+2],
                    "四班": mean_data[index][this.state.main_person['person']*jump_flag+3],
                    "五班": mean_data[index][this.state.main_person['person']*jump_flag+4],
                },)
            }
        }

        for ( let compare_person_index in this.state.compare_persons){
            console.log(this.state.compare_persons[compare_person_index]['person'])
            if (Object.keys(this.state.compare_persons[compare_person_index]).length>0){
                for (let index=0;index<3;index++){
                    course_state[state_arr[index]].push({
                        name: person[this.state.compare_persons[compare_person_index]['person']]['name'],
                        "一班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+0],
                        "二班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+1],
                        "三班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+2],
                        "四班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+3],
                        "五班": mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+4],
                    })

                }
            }

        }

        console.log(course_state)

        for (let i=0;i<40;i++){
            let timetamp = start_time + i*diff_time
            let date = new Date(timetamp)
            let month = date.getMonth() + 1
            let day = date.getDate()
            let hour = show_2_int(date.getHours())
            let min = show_2_int(date.getMinutes())

            if (hasMain_person){
                for (let index=0;index<3;index++){
                    total_state[state_arr[index]].push({
                        // time: `${month}-${day}\n${hour}:${min}`,
                        time: `${i}分`,
                        state_type: person[this.state.main_person['person']]['name'],
                        state:mean_data[index][this.state.main_person['person']*jump_flag+i]
                    })
                }
            }

            for ( let compare_person_index in this.state.compare_persons){
                if (Object.keys(this.state.compare_persons[compare_person_index]).length>0){
                    for (let index=0;index<3;index++){
                        total_state[state_arr[index]].push({
                            // time: `${month}-${day}\n${hour}:${min}`,
                            time: `${i}分`,
                            state_type: person[this.state.compare_persons[compare_person_index]['person']]['name'],
                            state:mean_data[index][this.state.compare_persons[compare_person_index]['person']*jump_flag+i]

                        })
                    }
                }
            }
        }

        // data_2.course_state = [...course_state]
        // data_2.total_state = [...total_state]
        data_2.course_state = deepCopy(course_state)
        data_2.total_state = deepCopy(total_state)

        console.log(data_2)
        this.setState({
            data_2:data_2
            // loading:false
        },()=>{
            console.log(this.state.data_2)
            this._updateSummary()
        });


    }

    _query(e){
        this._generate_date_timer(this.state.timestamp_start, this.state.timestamp_end)
    }

    // _updateSummary(){
    //     let hasMain_person = Object.keys(this.state.main_person).length && this.state.main_person.hasOwnProperty('person') > 0 ? true : false
    //
    //     if (hasMain_person){
    //         let hasCompare_person = false
    //         let summary = ''
    //         for ( let compare_person_index in this.state.compare_persons) {
    //             if (Object.keys(this.state.compare_persons[compare_person_index]).length > 0) {
    //                 hasCompare_person = true
    //                 break
    //             }
    //         }
    //
    //         let name = person[this.state.main_person['person']]['name']
    //         let state_name = state_arr[this.state.show_mode]
    //         let state_total = this.state.data_2.total_state[state_name]
    //         let state = 0
    //         let num = 0
    //         let summary_num = 0
    //         // console.log(state_total)
    //         for (let i in state_total){
    //             if (state_total[i]['state_type'] === name){
    //                 num += 1
    //                 state += state_total[i]['state']
    //             }
    //         }
    //         state /= num
    //
    //         if (state >= state_default[this.state.show_mode]-state_default[3] && state < state_default[this.state.show_mode]+state_default[3]){
    //             summary_num = 1
    //         }else if(state >= state_default[this.state.show_mode]+state_default[3]){
    //             summary_num = 2
    //         }
    //
    //         summary = `${name}的${state_name}是${Math.floor(state)},${summary_teacher_default[this.state.show_mode][summary_num]}`
    //
    //         this.setState({
    //             summary:summary
    //         })
    //     }
    //
    //
    // }

    _updateSummary(){
        let hasMain_person = Object.keys(this.state.main_person).length && this.state.main_person.hasOwnProperty('person') > 0 ? true : false

        if (hasMain_person){
            let hasCompare_person = false
            let summary = []

            let name = person[this.state.main_person['person']]['name']
            let state_name = state_arr[this.state.show_mode]
            let state_total = this.state.data_2.total_state[state_name]
            let state = 0
            let num = 0
            let summary_num = 0
            // console.log(state_total)
            for (let i in state_total){
                if (state_total[i]['state_type'] === name){
                    num += 1
                    state += state_total[i]['state']
                }
            }
            state /= num

            if (state >= state_default[this.state.show_mode]-state_default[3] && state < state_default[this.state.show_mode]+state_default[3]){
                summary_num = 1
            }else if(state >= state_default[this.state.show_mode]+state_default[3]){
                summary_num = 2
            }

            let summary_str = `${name}教授班级的的${state_name}是${Math.floor(state)},${summary_default[this.state.show_mode][summary_num]}`

            summary.push(summary_str)


            //添加 对比学生

            for ( let compare_person_index in this.state.compare_persons) {
                if (Object.keys(this.state.compare_persons[compare_person_index]).length > 0) {
                    // hasCompare_person = true
                    // break
                    let name = person[this.state.compare_persons[compare_person_index]['person']]['name']
                    let state_name = state_arr[this.state.show_mode]
                    let state_total = this.state.data_2.total_state[state_name]
                    let state = 0
                    let num = 0
                    let summary_num = 0
                    // console.log(state_total)
                    for (let i in state_total){
                        if (state_total[i]['state_type'] === name){
                            num += 1
                            state += state_total[i]['state']
                        }
                    }
                    state /= num

                    if (state >= state_default[this.state.show_mode]-state_default[3] && state < state_default[this.state.show_mode]+state_default[3]){
                        summary_num = 1
                    }else if(state >= state_default[this.state.show_mode]+state_default[3]){
                        summary_num = 2
                    }

                    let summary_str = `${name}教授班级的的${state_name}是${Math.floor(state)},${summary_default[this.state.show_mode][summary_num]}`

                    summary.push(summary_str)
                }
            }

            this.setState({
                // summary:summary
                summary:summary
            })
        }


    }

    _change_main_person(param) {

        this.setState({
            main_person:param
        },()=>{
            console.log(this.state.main_person)
            this._query()
        })
    }

    _change_compare_persons(param) {
        this.setState({
            compare_persons:param
        },()=>{
            console.log(this.state.compare_persons)
            this._query()
        })
    }

    render() {
        return (
            <Template classTag={'Teacher'} current_page={3} history={this.props.history}
                      style={{flexDirection:'column',}}
            >
                <div style={style.content} className={'Student_content_1'}>
                    <div style={style.content_1_wrap}>
                        <Student_content_1_1 uploadDate={this._change_main_person} show_mode={this.state.show_mode}/>
                        <div style={style.content_1_2_wrap} >
                            <Content_1
                                data={this.state.summary}
                                generate_report={this._generate_report}
                            />
                            <Content_2
                                Histogram_data={this.state.data_2.course_state[state_arr[this.state.show_mode]]}/>
                        </div>
                        <Student_content_1_3 style={{marginLeft:26*screen_scale_width}}
                                             uploadDate={this._change_compare_persons}
                                             show_mode={this.state.show_mode}/>
                    </div>
                </div>
                <div style={{...style.content, marginTop:15*screen_scale_width}} className={'Student_content_2'}>
                    <Student_content_2_1
                        // line_data={this.state.data_2.total_state}
                        line_data={this.state.data_2.total_state[state_arr[this.state.show_mode]]}
                        _changeMode={this._changeMode}
                    />
                </div>
            </Template>
        )
    }

}