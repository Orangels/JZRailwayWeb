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
        "周日": 0,
        "周一": 0,
        "周二": 0,
        "周三": 0,
        "周四": 0,
        "周五": 0,
        "周六": 0,
    },
    {
        name: "离开人数",
        "周日": 0,
        "周一": 0,
        "周二": 0,
        "周三": 0,
        "周四": 0,
        "周五": 0,
        "周六": 0,
    },
    {
        name: "陌生人数",
        "周日": 0,
        "周一": 0,
        "周二": 0,
        "周三": 0,
        "周四": 0,
        "周五": 0,
        "周六": 0,
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


class Histogram extends React.Component {

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

        let mode = this.props.mode || 0
        let fields_arr = [
            ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
            ['一班','二班','三班','四班','五班',]
        ]

        let show_data_arr = [data_default_course, data_default_class]

        let ds = new DataSet();

        let show_data = (this.state.data).length > 0 ? this.state.data : show_data_arr[mode]

        let dv = ds.createView().source(show_data);

        // if (this.state.data !== undefined){
        //     dv = ds.createView().source(this.state.data);
        // }


        dv.transform({
            type: "fold",
            fields: fields_arr[mode],
            // 展开字段集
            key: "course",
            // key字段
            value: "state" // value字段
        });

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
                <Chart height={height*0.95} width={width} data={dv} forceFit>
                    <Axis name="course" />
                    <Axis name="state" />
                    <Legend />
                    <Tooltip
                        crosshairs={{
                            type: "y"
                        }}
                    />
                    <Geom
                        type="interval"
                        // type='intervalStack'
                        position="course*state"
                        // color={"name"}
                        color={["name", chart_color]}
                        adjust={[
                            {
                                type: "dodge",
                                marginRatio: 1 / 32
                            }
                        ]}
                    />
                </Chart>
            </div>
        );
    }
}

export default Histogram;
