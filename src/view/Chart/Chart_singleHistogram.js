import React from "react";
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
    Util
} from "bizcharts";
import DataSet from "@antv/data-set";
import {randomNum} from "../../common/utils";
import {chart_color} from '../../common/data/pie_chart_data'
import {screen_scale_width} from "../parameter/parameters";


const data = [
    {
        name: "进入人数",
        "周日": randomNum(50,65),
        "周一": randomNum(45,55),
        "周二": randomNum(50,65),
        "周三": randomNum(40,50),
        "周四": randomNum(50,60),
        "周五": randomNum(40,55),
        "周六": randomNum(45,66),
    },
    {
        name: "离开人数",
        "周日": randomNum(40,50),
        "周一": randomNum(40,45),
        "周二": randomNum(45,50),
        "周三": randomNum(40,50),
        "周四": randomNum(45,60),
        "周五": randomNum(45,40),
        "周六": randomNum(40,45),
    },
    {
        name: "陌生人数",
        "周日": randomNum(0,20),
        "周一": randomNum(0,20),
        "周二": randomNum(0,20),
        "周三": randomNum(0,20),
        "周四": randomNum(0,20),
        "周五": randomNum(0,20),
        "周六": randomNum(0,20),
    },
]
const data_default_course = [
    {
        name: "进入人数",
        value: 15,
    },
    {
        name: "离开人数",
        value: 4,
    },
    {
        name: "陌生人数",
        value: 2,
    },
]

const data_default_class = [
    {
        name: "进入人数",
        "一班": 0,
        "二班": 0,
        "三班": 0,
        "四班": 0,
        "五班": 0,
    },
    {
        name: "离开人数",
        "一班": 0,
        "二班": 0,
        "三班": 0,
        "四班": 0,
        "五班": 0,
    },
    {
        name: "陌生人数",
        "一班": 0,
        "二班": 0,
        "三班": 0,
        "四班": 0,
        "五班": 0,
    },
]


class Single_Histogram extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            data:data,
            onGetG2Instance:null
        }
    }


    componentDidMount() {
        console.log('Histogram mount')
        let dataSource = this.props.dataSource || data
        // console.log(this.props.data)
        let onGetG2Instance = this.props.onGetG2Instance || null

        this.setState({
            data:dataSource,
            onGetG2Instance: onGetG2Instance
        },()=>{
            // console.log(this.state.data)
        })
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let dataSource = nextProps.dataSource || data
        let onGetG2Instance = nextProps.onGetG2Instance
        this.setState({
            data:dataSource,
            onGetG2Instance:onGetG2Instance
        },()=>{
            // console.log(this.state.data)
        });
    }

    render() {

        const cols = {
            state: {
                tickInterval: 10
            }
        };

        let onGetG2Instance = this.props.onGetG2Instance || null
        onGetG2Instance = onGetG2Instance || this.state.onGetG2Instance

        let height = this.props.height || 400
        let width = this.props.width || 'auto'

        return (
            <div style={{display:"flex",flexDirection:"column",background:'clear',borderRadius:4,
                paddingRight:50*screen_scale_width,
                overflow:'Hidden'
                // paddingTop:20*screen_scale_width
            }}>
                <Chart height={height*0.95} width={width} data={data_default_course} forceFit>
                    <Axis name="name"
                          label={{
                              offset:10,
                              textStyle:{
                                  fill: '#FFFFFF'
                              },
                              formatter(text, item, index) {
                                  return `${text}`;
                              },
                          }}
                    />
                    <Axis name="value"
                          label={{
                              offset:10,
                              textStyle:{
                                  fill: '#FFFFFF'
                              },
                              formatter(text, item, index) {
                                  return `${text}`;
                              },
                          }}
                    />
                    <Legend />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        // type='intervalStack'
                        position="name*value"
                        // color={"name"}
                        color={["name", chart_color]}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                        ]}

                    >
                        <Label content={['name*value', (name, value) => `${value}人`]}
                               offset={20}
                               // labelLine={{
                               //     lineWidth: 1, // 线的粗细
                               //     stroke: '#ff8800', // 线的颜色
                               //     lineDash: [2, 2], // 虚线样式
                               // }}
                               textStyle= {{
                                   textAlign: 'center', // 文本对齐方向，可取值为： start middle end
                                   fill: '#FFAB0B', // 文本的颜色
                                   fontSize: '12', // 文本大小
                                   fontWeight: 'bold', // 文本粗细
                                   textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
                               }}
                        />
                    </Geom>
                </Chart>
            </div>
        );
    }
}

export default Single_Histogram;
