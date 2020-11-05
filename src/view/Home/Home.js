import React from 'react'
import {Row, Col} from 'antd'
import {toJS} from 'mobx'
import io from 'socket.io-client'
import Template from '../../common/composite_template'
import Home_statistical from './Home_statistical'
import Home_content_1_1 from './Home_content_1/Home_content_1_1'
import Home_content_1_2 from './Home_content_1/Home_content_1_2'
import Home_content_2_1 from './Home_content_2/Home_content_2_1'
import Home_content_2_2 from './Home_content_2/Home_content_2_2'
import Home_content_3_1 from './Home_content_3/Home_content_3_1'
import Home_content_3_2 from './Home_content_3/Home_content_3_2'
import Home_content_3_3 from './Home_content_3/Home_content_3_3'

import Home_content_2_1_canvas from './Home_content_2/Home_content_2_1_canvas'

import {screen_scale_width, screen_scale_height} from "../parameter/parameters";
import {Home_data, home_content_1_3_data, home_content_2_1_data, home_content_2_2_data, home_content_2_1_pie_data, home_content_2_1_pie_data_interval} from './Home_data'
import Home_content_template from "../../common/Home_content_template";
import Chart_custom from "../Chart/Chart_custom";
import Histogram from '../Chart/Histogram'
import {randomNum, _fetch, deepCopy} from "../../common/utils";
import {url, CAMERAPERSONS} from "../../common/urls"
import {inject, observer} from "mobx-react";
import './Home.less'

const style = {
    content:{
        marginTop:96*screen_scale_width,
        marginLeft:30*screen_scale_width,
        marginRight:30*screen_scale_width,
        display:'flex',
        // flexDirection:'column',
        flexDirection:'row',
        justifyContent:'space-between'
        // overflowY:'hidden'
    },
}

// let home_content_2_1_data = [
//     {
//         time: "8:00",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:00",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
//     {
//         time: "8:05",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:05",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
//     {
//         time: "8:10",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:10",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
//     {
//         time: "8:15",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:15",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
//     {
//         time: "8:20",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:20",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
//     {
//         time: "8:25",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:25",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
//     {
//         time: "8:30",
//         state_type: "区域 1",
//         state: randomNum(5,10)
//     },
//     // {
//     //     time: "8:30",
//     //     state_type: "区域 2",
//     //     state: randomNum(5,10)
//     // },
// ]
// let home_content_1_3_data = [
//     {
//         time: "8:00",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
//     {
//         time: "8:05",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
//     {
//         time: "8:10",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
//     {
//         time: "8:15",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
//     {
//         time: "8:20",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
//     {
//         time: "8:25",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
//     {
//         time: "8:30",
//         state_type: "进入人数",
//         state: randomNum(5,10)
//         // state: 0
//     },
// ]
// let home_content_2_2_data = [
//     {
//         country: "实时旅客人数",
//         time: "8:00",
//         // timeValue: 1593000000,
//         value: 5
//     },
//     {
//         country: "实时旅客人数",
//         time: "8:30",
//         // timeValue: 1593001800,
//         value: 6
//     },
//     {
//         country: "实时旅客人数",
//         time: "9:00",
//         // timeValue: 1593003600,
//         value: 8
//     },
//     {
//         country: "实时旅客人数",
//         time: "9:30",
//         // timeValue: 1593005400,
//         value: 5
//     },
//     {
//         country: "实时旅客人数",
//         time: "10:00",
//         // timeValue: 1593007200,
//         value: 4
//     },
//     {
//         country: "实时旅客人数",
//         time: "10:30",
//         // timeValue: 1593012600,
//         value: 3
//     },
//     {
//         country: "实时旅客人数",
//         time: "11:00",
//         // timeValue: 1592928000,
//         value: 9
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "8:00",
//         // timeValue: 1593000000,
//         value: 1
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "8:30",
//         // timeValue: 1593001800,
//         value: 1
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "9:00",
//         // timeValue: 1593003600,
//         value: 1
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "9:30",
//         // timeValue: 1593005400,
//         value: 1
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "10:00",
//         // timeValue: 1593007200,
//         value: 2
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "10:30",
//         // timeValue: 1593012600,
//         value: 7
//     },
//     {
//         country: "历史平均旅客人数",
//         time: "11:00",
//         // timeValue: 1592928000,
//         value: 1
//     },
// ];

@inject('appStore') @observer
class Home extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            class_statistical:Home_data.class_statistical,
            preview_data:Home_data.preview_data,
            current_page: 0,
            // url: 'http://127.0.0.1:9000/get_state'
            url: 'http://192.168.88.27:9000/get_state',
            entryPersons:{
                entry:0,
                exit:0,
                register:0,
                unRegister:0
            },
            home_circle_data:{
                entry:[
                    {
                        count: 0,
                        item: '进入',
                    },
                    {
                        count: 0,
                        item: '离开',
                    },
                ],
                register:[
                    {
                        count: 0,
                        item: '已注册',
                    },
                    {
                        count: 0,
                        item: '未注册',
                    },
                ],
            },
            home_content_2_1_data: home_content_2_1_data,
            home_content_2_1_pie_data: home_content_2_1_pie_data,
            home_content_2_2_data: home_content_2_2_data,
            home_content_1_3_data: home_content_1_3_data,
            home_content_2_2_update_index:0,
            total_result: {
                entry: 0,
                heatmap: 0,
                hesitate: 0
            }
        };
        // this._updata_data = this._updata_data.bind(this)
          this._ws_new_coor = this._ws_new_coor.bind(this)
          this._ws_new_state = this._ws_new_state.bind(this)
          this._update_home_content_2_data = this._update_home_content_2_data.bind(this)
          this.mapClick = this.mapClick.bind(this)
          this._update_home_content_1_btn_data = this._update_home_content_1_btn_data.bind(this)
      }

    _update_home_content_2_data(){
          let index = this.state.home_content_2_2_update_index
           index = index % (home_content_2_1_data.length)

        _fetch(CAMERAPERSONS, {}, (json)=>{
            if (json.code == 200){
                console.log(json.result)
                let result = json.result
                let entryData = deepCopy(this.state.home_content_1_3_data)
                let hesitateData = deepCopy(this.state.home_content_2_1_data)
                let heatMapData = deepCopy(this.state.home_content_2_2_data)
                let home_content_2_1_pie_data_tmp = deepCopy(home_content_2_1_pie_data)
                entryData[index].state = result.entry
                hesitateData[index].state = result.hesitate
                heatMapData[index].value = result.heatmap

                let hes_total_times = result.hes_total_times

                console.log(hes_total_times)

                for (let i = 0; i < hes_total_times.length; i++){
                    if (hes_total_times[i] < home_content_2_1_pie_data_interval){
                        home_content_2_1_pie_data_tmp[0].count += 1
                    }else if(hes_total_times[i] < home_content_2_1_pie_data_interval * 2){
                        home_content_2_1_pie_data_tmp[1].count += 1
                    }else if(hes_total_times[i] < home_content_2_1_pie_data_interval * 3){
                        home_content_2_1_pie_data_tmp[2].count += 1
                    }else {
                        home_content_2_1_pie_data_tmp[3].count += 1
                    }
                }

                console.log(home_content_2_1_pie_data_tmp)

                index += 1
                this.setState({
                    home_content_2_1_data: hesitateData,
                    home_content_2_2_data: heatMapData,
                    home_content_1_3_data: entryData,
                    home_content_2_1_pie_data: home_content_2_1_pie_data_tmp,
                    home_content_2_2_update_index:index,
                    total_result: deepCopy(result)
                })
            }else {

            }
        })

    }

    _update_home_content_1_btn_data(){
        this.setState({
            current_page: (this.state.current_page + 1) % 3
        },()=>{
            this.props.appStore.updateHomeVideoShowNum(this.state.current_page)
        })
    }

    _ws_new_state(data) {
        let entryPersons = toJS(this.props.appStore.entryPersons)
        let persons_arr_cp = deepCopy(entryPersons)
        let persons = persons_arr_cp.data
        let entryPersons_state = deepCopy(this.state.entryPersons)
        let registerPerson = 0
        let unRegisterPerson = 0
        entryPersons_state.entry = persons.length
        persons.forEach((person, index)=>{
            if (person.rec) {
                registerPerson += 1
            }else {
                unRegisterPerson += 1
            }
        })
        entryPersons_state.register = registerPerson
        entryPersons_state.unRegister = unRegisterPerson

        //update home_circle_data

        let home_circle_data = {
            entry:[
                {
                    count: entryPersons_state.entry,
                    item: '进入',
                },
                {
                    count: entryPersons_state.exit,
                    item: '离开',
                },
            ],
            register:[
                {
                    count: entryPersons_state.register,
                    // count: 10,
                    item: '已注册',
                },
                {
                    count: entryPersons_state.unRegister,
                    item: '未注册',
                },
            ],
        }

        this.setState({
            entryPersons: entryPersons_state,
            home_circle_data
        }, ()=>{
            console.log(this.state.entryPersons)
            console.log(this.state.home_circle_data)
        })
    }


    _ws_new_coor(data){
        // let results = data.result
        // console.log('*******')
        // console.log(this.refs.canvasComponent)

        // this.refs.canvasComponent.wrappedInstance._update_data(deepCopy(results['bbox']));
        // console.log('draw canvas')
        window.requestAnimationFrame(this.refs.canvasComponent.wrappedInstance._draw)
        // this.refs.canvasComponent.wrappedInstance._draw();
    }

    componentDidMount() {
        // let url_socket = `${url}/Camera_Web_ws`
        //本机测试 用固定 url
        // console.log('长连接 服务器')
        // 测试 先关闭 socket
        // this.socket = io(url_socket)
        // this.socket.on('new_coor',this._ws_new_coor)
        this._ws_new_state()
        this.timer_0 = setInterval(this._update_home_content_2_data, 1000*3);
        this.timer_1 = setInterval(this._update_home_content_1_btn_data, 1000*60);
    }

    componentWillUnmount() {
        this.timer_0 && clearInterval(this.timer_0)
        this.timer_1 && clearInterval(this.timer_1)
        // this.socket.disconnect()
        // this.socket.emit('disconnect')
        // console.log('clear home_1_2 timer')
    }


    mapClick(e){
        console.log(`Home click ${e}`)
        let data_tmp = {}
        let total_persons = randomNum(5, 10)
        let exit_persons = randomNum(0, 5)
        let onLine_person = randomNum(0,total_persons)
        let none_persons = total_persons - onLine_person
        data_tmp['text_content'] = [
            ['布控位置', `大厅门 ${e % 5}`],
            ['进入人数', total_persons],
            ['离开人数', exit_persons],
            ['在线人员', onLine_person],
            ['陌生人',  none_persons],
        ]
        let class_statistical_data = Object.assign({},this.state.class_statistical, data_tmp)
        this.setState({
            class_statistical:class_statistical_data,
            current_page: e % 3
        },()=>{
            this.props.appStore.updateHomeVideoShowNum(this.state.current_page)
        })
    }

    render() {
          return (
              <Template classTag={'Home'} current_page={0} history={this.props.history}
                        style={{height:1080*screen_scale_height, display:'flex',
                            flexDirection:'column', overflowY:'hidden', overflowX:'hidden',
                        }}
                        new_coor={this._ws_new_coor}
                        new_state={this._ws_new_state}
                        ref="totalWrapComponent"
              >
                  <Row gutter={5} style={style.content} className={'Home_content_1'}>
                      <Col span={5}>
                          <Home_content_1_1 data={this.state.class_statistical}
                                            home_circle_data={this.state.home_circle_data}
                                            click={this.mapClick}
                                            current_page={this.state.current_page}/>
                      </Col>
                      <Col span={13}>
                          <Home_content_1_2 ref="canvasComponent"/>
                      </Col>
                      <Col span={6}>
                          <Home_content_3_1 data={this.state.home_content_1_3_data} totalNum={this.state.total_result.entry}/>
                      </Col>
                  </Row>
                  <Row gutter={12}
                      style={{...style.content, marginTop:0, marginLeft:20*screen_scale_width,
                          marginRight:20*screen_scale_width
                      }} className={'Home_content_2'}
                  >
                      <Col span={12} >
                          <Home_content_2_1 data={this.state.home_content_2_1_data}
                                            pieData={this.state.home_content_2_1_pie_data}/>
                      </Col>
                      <Col span={12}>
                          <Home_content_2_2 data={this.state.home_content_2_2_data}
                                            />
                      </Col>
                  </Row>
              </Template>
          )
      }

}
export default Home