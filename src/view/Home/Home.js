import React from 'react'
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

import {screen_scale_width, screen_scale_height, url} from "../parameter/parameters";
import {Home_data} from './Home_data'
import Home_content_template from "../../common/Home_content_template";
import Chart_custom from "../Chart/Chart_custom";
import Histogram from '../Chart/Histogram'
import {randomNum, _fetch, deepCopy} from "../../common/utils";
import {inject, observer} from "mobx-react";

const style = {
    content:{
        marginTop:96*screen_scale_width,
        marginLeft:30*screen_scale_width,
        display:'flex',
        flexDirection:'column',
        overflowY:'hidden'
    },
}

let home_content_2_2_data = [
    {
        time: "8:00",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:00",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:00",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:05",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:05",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:05",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:10",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:10",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:10",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:15",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:15",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:15",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:20",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:20",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:20",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:25",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:25",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:25",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:30",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:30",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:30",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
    {
        time: "8:35",
        state_type: "进入人数",
        // state: randomNum(5,10)
        state: 0
    },
    {
        time: "8:35",
        state_type: "离开人数",
        // state: randomNum(0,8)
        state: 0
    },
    {
        time: "8:35",
        state_type: "陌生人数",
        // state: randomNum(1,5)
        state: 0
    },
]

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
            home_content_2_2_data: home_content_2_2_data,
            home_content_2_2_update_index:0
        };
        // this._updata_data = this._updata_data.bind(this)
          this._ws_new_coor = this._ws_new_coor.bind(this)
          this._ws_new_state = this._ws_new_state.bind(this)
          this._update_home_content_2_data = this._update_home_content_2_data.bind(this)
          this.mapClick = this.mapClick.bind(this)
      }

    _update_home_content_2_data(){
          let index = this.state.home_content_2_2_update_index
           index = index % (home_content_2_2_data.length)
          let entry_persons = this.state.home_circle_data.entry[0].count;
          let exit_persons = this.state.home_circle_data.entry[1].count;
          let register_persons = this.state.home_circle_data.register[1].count;

          let home_content_2_2_updateData = deepCopy(this.state.home_content_2_2_data)

            home_content_2_2_updateData[index].state = entry_persons;
            home_content_2_2_updateData[index+1].state = exit_persons;
            home_content_2_2_updateData[index+2].state = register_persons;

        index += 3
        this.setState({
            home_content_2_2_data:home_content_2_2_updateData,
            home_content_2_2_update_index: index
        },()=>{
            // console.log(this.state.home_content_2_2_data)
            // console.log(this.state.home_content_2_2_update_index)
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
        this.timer = setInterval(this._update_home_content_2_data, 2000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
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
            current_page: e % 5
        })
    }

    render() {
          return (
              <Template classTag={'Home'} current_page={0} history={this.props.history}
                        style={{height:1080*screen_scale_height}}
                        new_coor={this._ws_new_coor}
                        new_state={this._ws_new_state}
                        ref="totalWrapComponent"
              >
                  <div style={style.content} className={'Home_content_1'}>
                      <Home_content_1_1 data={this.state.class_statistical}
                                        home_circle_data={this.state.home_circle_data}
                                        click={this.mapClick}
                                        current_page={this.state.current_page}/>
                      <Home_content_1_2 data={Home_data['device_states']}/>
                  </div>
                  <div style={style.content} className={'Home_content_2'}>
                      {/*<Home_content_2_1 click={this.mapClick} />*/}
                      <Home_content_2_1_canvas ref="canvasComponent"/>
                      <Home_content_2_2 data={this.state.home_content_2_2_data}/>
                  </div>
                  <div style={style.content} className={'Home_content_3'}>
                      <Home_content_3_1 />
                      {/*<Home_content_3_2 />*/}
                      <Home_content_3_3 />
                  </div>
              </Template>
          )
      }

}
export default Home