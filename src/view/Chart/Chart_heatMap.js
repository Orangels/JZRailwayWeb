import React from 'react'

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
import {Button, Icon} from 'antd';
import {_fetch} from "../../common/utils";
import {screen_scale_width} from "../parameter/parameters";
import {chart_heatMapData} from '../../common/data/Chart_heatMapData'
import './Chart_hearMap.less'

const {Image, Html} = Guide;


export default class Chart_heatMap extends React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            data: null,
            showBox: 0,
            img: 'http://192.168.88.221:5000/static/staticPic/back.jpg',
            img_1: 'http://192.168.88.221:5000/static/staticPic/3.jpg',
        };
        this._update_data = this._update_data.bind(this)
    }

    /**
     * 模拟实时更新数据
     * */
    _update_data(e) {
        this.num += 1
        if (this.num % 2 == 0) {
            this.setState({
                // img:'http://192.168.88.221:5000/static/staticPic/back.jpg'
                showBox: 0,
            })
        } else {
            this.setState({
                // img:'http://192.168.88.221:5000/static/staticPic/back.jpg'
                showBox: 1,
            })
        }
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
    }

    componentDidMount() {
        // _fetch("https://alifd.alibabausercontent.com/materials/@bizcharts/heatmap-image/0.3.0/mock.json",
        //     {},(json=>{
        //         this.setState({
        //             data:json
        //         })
        //     }))
        this.num = 0
        // this.timer = setInterval(this._update_data, 100);

    }


    componentWillReceiveProps(nextProps, nextContext) {
        let data = nextProps.dataSource || null
        let onGetG2Instance = nextProps.onGetG2Instance
        this.setState({
            data: data,
            onGetG2Instance: onGetG2Instance
        });
    }

    render() {
        let height = this.props.height || 400
        let width = this.props.width || 'auto'
        return (

            <div className={'Chart_hearMap'}>
                <Chart
                    padding={[0, 20, 20, 10]}
                    // data={data_ori}
                    data={[{
                        "g": 10,
                        "l": 50,
                        "tmp": 300
                    }]}
                    forceFit
                    height={height * 0.95}
                    width={width}
                >
                    {/*<Tooltip showTitle={false} />*/}
                    <Legend position={"bottom"} offsetY={-55}/>
                    <Geom
                        type="heatmap"
                        position="g*l"
                        color={[
                            "tmp",
                            "#F51D27-#FA541C-#FF8C12-#FFC838-#FAFFA8-#80FF73-#12CCCC-#1890FF-#6E32C2"
                        ]}
                    />
                    <Guide>
                        <Image
                            start={["min", "max"]}
                            end={["max", "min"]}
                            src={'http://192.168.88.221:5000/static/staticPic/back.jpg'}
                        />
                    </Guide>
                </Chart>
            </div>

        );
    }

}

const styles = {
    wrap: {
        // position: 'absolute',
        // top:20,
        // left:0,
        // backfaceVisibility: 'hidden'
    }
}