import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../parameter/parameters";
import WaterWave from "../../../common/component/WaterWave"
import Home_content_template from "../../../common/Home_content_template";
import Home_content_1_2_component from './Home_content_1_2_component'
import {randomNum} from "../../../common/utils";
import backgroundBanner from "../../../asset/back_new/8_设备概览.png";

export default class Home_content_1_1 extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            temperature:0,
            net_speed:60
        }
        this._updata_data = this._updata_data.bind(this)
    }
    _updata_data(){
        this.setState({
            // temperature:randomNum(70,90),
            net_speed:randomNum(50,80)
        })
    }

    componentDidMount() {
        this.timer = setInterval(this._updata_data, 2*1000);
    }

    componentWillUnmount() {
        this.timer && clearInterval(this.timer)
        console.log('clear home_1_2 timer')
    }

    render() {
        let wave_params = this.props.data['wave_params']
        let component_text = this.props.data['text_content']
        let textContent = component_text.map((value,index)=>{
            let left = index%2 === 0 ? 21*screen_scale_width : 34*screen_scale_width
            // if (index === 4){
            //     // return (
            //     //     <Home_content_1_2_component title={`${this.state.temperature}℃`} text={value[1]} key={`textContent_1_2_${index}`}
            //     //                                 style={{marginLeft:left}}/>
            //     // )
            //     return (
            //         <Home_content_1_2_component title={`${this.state.temperature}`} text={value[1]} key={`textContent_1_2_${index}`}
            //                                     style={{marginLeft:left}}/>
            //     )
            // }
            if (index === 5){
                return (
                    <Home_content_1_2_component title={`${this.state.net_speed}ms`} text={value[1]} key={`textContent_1_2_${index}`}
                                                style={{marginLeft:left}}/>
                )
            }
            return (
                <Home_content_1_2_component title={value[0]} text={value[1]} key={`textContent_1_2_${index}`}
                                            style={{marginLeft:left}}/>
            )
        })

        let waveComponents = wave_params.map((value, index)=>{
            return (
                <WaterWave type="circle" width={100} height={100}
                           showText={`${value[0]}`}
                           showText_1={`${value[1]}`}
                           rangeValue={value[2]} />
            )
        })

        return (
            <Home_content_template
                style={{
                    background: `url(${backgroundBanner}) no-repeat `,
                    backgroundSize:'100% 100%',
                    width:499*screen_scale_width,
                    height:358 * screen_scale_height,
                    marginTop: 10*screen_scale_width,
                }}
                childStyle={{
                    display: 'flex',
                    flexWrap:'wrap',
                    flexDirection: 'row',
                    justifyContent:'space-around',
                    alignItems: 'center',
                    position: 'relative',
                    marginTop:20*screen_scale_height
                }}

                                   title={this.props.data['title'] || " "}>
                {/*{textContent}*/}
                {waveComponents}
            </Home_content_template>
        )

    }
}