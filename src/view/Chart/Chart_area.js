import React from 'react'
import {randomNum,} from "../../common/utils";
import {chart_color} from '../../common/data/pie_chart_data'
import {dateFormat} from '../../common/utils'

import {
    G2,
    Chart,
    Geom,
    Axis,
    Tooltip,
    Coord,
    Label,
    Legend,
    View,
    Guide,
    Shape,
    Facet,
    Util,
    Area,
    Line
} from "bizcharts";
import { Button, Icon} from 'antd';
import {screen_scale_width} from "../parameter/parameters";

let data_ori = [
    {
        country: "区域 1",
        time: "8:00",
        // timeValue: 1593000000,
        value: 5
    },
    {
        country: "区域 1",
        time: "8:30",
        // timeValue: 1593001800,
        value: 6
    },
    {
        country: "区域 1",
        time: "9:00",
        // timeValue: 1593003600,
        value: 8
    },
    {
        country: "区域 1",
        time: "9:30",
        // timeValue: 1593005400,
        value: 5
    },
    {
        country: "区域 1",
        time: "10:00",
        // timeValue: 1593007200,
        value: 4
    },
    {
        country: "区域 1",
        time: "10:30",
        // timeValue: 1593012600,
        value: 3
    },
    {
        country: "区域 1",
        time: "11:00",
        // timeValue: 1592928000,
        value: 9
    },
    {
        country: "区域 2",
        time: "8:00",
        // timeValue: 1593000000,
        value: 1
    },
    {
        country: "区域 2",
        time: "8:30",
        // timeValue: 1593001800,
        value: 1
    },
    {
        country: "区域 2",
        time: "9:00",
        // timeValue: 1593003600,
        value: 1
    },
    {
        country: "区域 2",
        time: "9:30",
        // timeValue: 1593005400,
        value: 1
    },
    {
        country: "区域 2",
        time: "10:00",
        // timeValue: 1593007200,
        value: 2
    },
    {
        country: "区域 2",
        time: "10:30",
        // timeValue: 1593012600,
        value: 7
    },
    {
        country: "区域 2",
        time: "11:00",
        // timeValue: 1592928000,
        value: 1
    },
    {
        country: "区域 3",
        time: "8:00",
        // timeValue: 1593000000,
        value: 1
    },
    {
        country: "区域 3",
        time: "8:30",
        // timeValue: 1593001800,
        value: 2
    },
    {
        country: "区域 3",
        time: "9:00",
        // timeValue: 1593003600,
        value: 2
    },
    {
        country: "区域 3",
        time: "9:30",
        // timeValue: 1593005400,
        value: 6
    },
    {
        country: "区域 3",
        time: "10:00",
        // timeValue: 1593007200,
        value: 5
    },
    {
        country: "区域 3",
        time: "10:30",
        // timeValue: 1593012600,
        value: 7
    },
    {
        country: "区域 3",
        time: "11:00",
        // timeValue: 1592928000,
        value: 4
    },
];

const cols = {
    time: {
        range: [0, 1],
        alias: '时间' ,
    },
    value:{
        // min:20,
        max:10,
        alias:'实时状态',
        // tickCount:5,
    }
}

// const cols = {
//     time: {
//         range: [0, 1],
//         alias: '时间' ,
//     },
//     value:{
//         // min:20,
//         type: 'linear',
//         max:10,
//         alias:'实时状态',
//         // tickCount:5,
//     }
// };


export default class Chart_area extends React.Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
      }


    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }


    componentWillReceiveProps(nextProps, nextContext) {
        let data = nextProps.dataSource || data_ori
        let onGetG2Instance = nextProps.onGetG2Instance
        this.setState({
            data:data,
            onGetG2Instance: onGetG2Instance
        });
    }

      render() {
          let scale = {
              value: {
                  nice: true,
              },
              year: {
                  type: 'linear',
                  // tickInterval: 50,
              },
          };

          let height = this.props.height || 400
          let width = this.props.width || 'auto'

          return (
              <div style={{...{display:"flex",flexDirection:"column", paddingRight:50*screen_scale_width,
                      // paddingTop:20*screen_scale_width,
                  }, ...this.props.style}}>
                  <Chart scale={cols} width={width} height={height} data={data_ori} autoFit>
                      <Axis name="time"
                            label={{
                                offset:10,
                                textStyle:{
                                    fill: '#FFFFFF'
                                },
                                formatter(text, item, index) {
                                    // return `${dateFormat(text*1000, 'H:i')}`;
                                    return text
                                },
                            }}
                      />
                      <Axis name="value"
                            label={{
                                offset:10,
                                textStyle:{
                                    fill: '#0CFFEE'
                                },
                                // formatter(text, item, index) {
                                //     console.log(text)
                                //     return `${text}`;
                                // },
                            }}/>
                      <Legend />
                      <Tooltip
                          crosshairs={{
                              type: "line"
                          }}
                      />
                      {/*<Geom type="areaStack" position="time*value" color={["country", chart_color]} />*/}
                      {/*<Geom type="lineStack" position="time*value" size={2} color={["country", chart_color]} />*/}
                      <Geom type="area" position="time*value" color={["country", chart_color]} />
                      <Geom type="line" position="time*value" size={2} color={["country", chart_color]} />
                  </Chart>
              </div>
              )
      }
}