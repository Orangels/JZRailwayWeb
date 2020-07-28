import React from 'react';
import {randomNum,} from "../../common/utils";
import {chart_color} from '../../common/data/pie_chart_data'

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
} from "bizcharts";
import { Button, Icon} from 'antd';
import {screen_scale_width} from "../parameter/parameters";
import DataSet from "@antv/data-set";

const {DataView} = DataSet;
const {Html} = Guide;
const data = [
    {
        count: 4,
        item: '进入',
    },
    {
        count: 1,
        item: '离开',
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

export default class Chart_circle extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.state = {
              // data:data,
              data: [],
              onGetG2Instance: null
          }
      }

    componentDidMount() {
          console.log(this.props.data)
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
        // let data = nextProps.data || data
        // console.log(data)
        // let onGetG2Instance = nextProps.onGetG2Instance || null
        // this.setState({
        //     data: data,
        //     onGetG2Instance: onGetG2Instance
        // });
        let dataSource = nextProps.data || data
        // let onGetG2Instance = this.props.onGetG2Instance || null

        this.setState({
            data: dataSource,
            // onGetG2Instance: onGetG2Instance
        }, () => {
            this.dv.source(this.state.data).transform({
                type: "percent",
                field: "count",
                dimension: "item",
                as: "percent"
            });
        })
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

        // console.log(this.state.data)

        let height = this.props.height || 250
        let width = this.props.width || 'auto'
        let colors = this.props.colors || ''
        let isPie = this.props.isPie || false

        let innerRadius = isPie ? 0 : 0.5 /0.75
        // let labelOffset = isPie ? -30 : 25
        let labelOffset = 25

        return (
            <div style={{
                ...{
                    display: "flex",
                    background: 'clear',
                    borderRadius: 4
                }, ...this.props.style
            }} className={'ls_chartCirle_div'}
            >
                <Chart
                    className={'ls_chartCirle'}
                    data={this.dv}
                    height={height}
                    width={width}
                    scale={cols}
                    padding={[60, 75, 60, 60]}
                    forceFit
                    onGetG2Instance={onGetG2Instance}
                >
                    <Coord type="theta" radius={0.5} />
                    <Tooltip
                        showTitle={false}
                        itemTpl="<li><span style=&quot;background-color:{color};&quot; class=&quot;g2-tooltip-marker&quot;></span>{name}: {value}</li>"
                    />
                    <View data={this.dv} scale={cols}>
                        <Coord type="theta" radius={0.75} innerRadius={innerRadius} />
                        <Geom
                            type="intervalStack"
                            position="percent"
                            color={['item', colors]}
                            tooltip={[
                                'item*percent',
                                (item, percent) => {
                                    percent = `${(percent * 100).toFixed(2)}%`;
                                    return {
                                        name: item,
                                        value: percent,
                                    };
                                },
                            ]}
                            style={{
                                lineWidth: 1,
                                stroke: '#fff',
                            }}
                            select={false}
                        >
                            <Label content="item"
                                   textStyle={{
                                       textAlign: 'center',
                                       fill: '#FFFFFF',
                                       textBaseline:'middle'
                                   }}
                                   formatter={(a, b) => {
                                       // console.log(b)
                                       return `${a}:${b.point.count}人`
                                   }}
                                   offset={labelOffset}
                            />
                        </Geom>
                    </View>
                </Chart>
            </div>
        )
    }
}