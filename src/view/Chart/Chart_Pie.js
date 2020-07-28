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
import Chart_custom from "./Chart_custom";


const {DataView} = DataSet;
const {Html} = Guide;
const data = [
    {
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
    },
];

const cols = {
    percent: {
        formatter: val => {
            // val = val * 100 + "%";
            val = `${(val * 100).toFixed(2)}%`;
            return val;
        }
    }
};

export default class Chart_Pie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // data:data,
            data: [],
            onGetG2Instance: null
        }

    }

    componentDidMount() {
        let dataSource = this.props.data || data
        // let dataSource = this.props.data
        let onGetG2Instance = this.props.onGetG2Instance || null

        this.setState({
            data: dataSource,
            onGetG2Instance: onGetG2Instance
        }, () => {
            this.dv.source(this.state.data).transform({
                type: "percent",
                field: "count",
                dimension: "item",
                as: "percent"
            });
        })

    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        let data = nextProps.data
        let onGetG2Instance = nextProps.onGetG2Instance
        this.setState({
            data: data,
            onGetG2Instance: onGetG2Instance
        });
    }

    render() {
        let onGetG2Instance = this.props.onGetG2Instance || null
        onGetG2Instance = onGetG2Instance || this.state.onGetG2Instance

        this.dv = new DataView();
        this.dv.source(this.state.data).transform({
            type: "percent",
            field: "count",
            dimension: "item",
            as: "percent"
        });

        let height = this.props.height || 250
        let width = this.props.width || 'auto'
        // console.log(width)
        // console.log(height)
        let Real_time = this.props.real_time || false

        return (
            <div style={{
                ...{
                    display: "flex",
                    flexDirection: "column",
                    background: 'clear',
                    borderRadius: 4
                }, ...this.props.style
            }}>
                <Chart
                    height={height}
                    data={this.dv}
                    scale={cols}
                    // padding={[80, 100, 80, 80]}
                    forceFit
                    onGetG2Instance={onGetG2Instance}
                >
                    <Coord type={"theta"} radius={0.75} innerRadius={0.6}/>
                    <Axis name="percent"/>
                    <Legend
                        position="bottom"
                    />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <Geom
                        type="intervalStack"
                        position="percent"
                        color="item"
                        tooltip={[
                            "item*percent",
                            (item, percent) => {
                                percent = percent * 100 + "%";
                                return {
                                    name: item,
                                    value: percent
                                };
                            }
                        ]}
                        style={{
                            lineWidth: 1,
                            stroke: "#fff"
                        }}
                    >
                        <Label
                            content="percent"
                            formatter={(val, item) => {
                                return item.point.item + ": " + val;
                            }}
                        />
                    </Geom>
                </Chart>
            </div>
        )

    }

}