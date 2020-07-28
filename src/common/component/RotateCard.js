import React from 'react'
import {screen_scale_height, screen_scale_width} from "../../view/parameter/parameters";
import { diff } from '../../common/utils'

const style={
    wrap:{
        dispaly:'flex',
        flexDirection:'column',
        width:'98%',
        height:'100%',
        // transform: 'translate(-50%,-50%)',
        transition: 'all 1.5s',
        position:'relative',
    }
}

export default class RotateCard extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            children:[],
            rotateY:0
        }
        this._rotate=this._rotate.bind(this)
        this._rotateTest=this._rotateTest.bind(this)
        this._bindChildren=this._bindChildren.bind(this)
    }


    _rotateTest(num){
        let childComponent={}
        let props=this.props
        let { transition } = props
        transition = transition || 1.5
        if (num===0){
            childComponent=React.Children.map(props.children,(child,index)=> {
                let stylenNew = Object.assign({},child.props.style)
                stylenNew.position = 'absolute'
                stylenNew.top = 0
                stylenNew.left = 0
                stylenNew.transition = `all ${transition}s`
                stylenNew.backfaceVisibility='hidden'
                if (index === 0) {
                    stylenNew.transform='rotateY(179.1deg)'
                }else {
                    stylenNew.transform='rotateY(-0.1deg)'
                }
                return React.cloneElement(child, {
                    style: stylenNew,
                })
            })
        }else {
            childComponent=React.Children.map(props.children,(child,index)=> {
                let stylenNew = Object.assign({},child.props.style)
                stylenNew.position = 'absolute'
                stylenNew.top = 0
                stylenNew.left = 0
                stylenNew.transition = `all ${transition}s`
                stylenNew.backfaceVisibility='hidden'
                if (index === 0) {
                    stylenNew.transform='rotateY(0.1deg)'
                }else {
                    stylenNew.transform='rotateY(-179.1deg)'
                }
                return React.cloneElement(child, {
                    style: stylenNew,
                })
            })
        }
        this.setState({
            children:childComponent
        })
    }


    _rotate(num){
        let childComponent={}
        let props=this.props
        let { transition } = props
        transition = transition || 1.5
        if (num===0){
                childComponent=React.Children.map(props.children,(child,index)=> {
                    let stylenNew = Object.assign({},child.props.style)
                    stylenNew.position = 'absolute'
                    stylenNew.top = 0
                    stylenNew.left = 0
                    stylenNew.transition = `all ${transition}s`
                    stylenNew.backfaceVisibility='hidden'
                    if (index === 0) {
                        stylenNew.transform='rotateY(180deg)'
                    }else {
                        stylenNew.transform='rotateY(0deg)'
                    }
                    return React.cloneElement(child, {
                        style: stylenNew,
                    })
            })
        }else {
            childComponent=React.Children.map(props.children,(child,index)=> {
                let stylenNew = Object.assign({},child.props.style)
                stylenNew.position = 'absolute'
                stylenNew.top = 0
                stylenNew.left = 0
                stylenNew.transition = `all ${transition}s`
                stylenNew.backfaceVisibility='hidden'
                if (index === 0) {
                    stylenNew.transform='rotateY(0deg)'
                }else {
                    stylenNew.transform='rotateY(-180deg)'
                }
                return React.cloneElement(child, {
                    style: stylenNew,
                })
            })
        }
        this.setState({
            children:childComponent
        })
    }

    _bindChildren(props){
        let { transition } = props
        let childComponent=React.Children.map(props.children,(child,index)=> {
            let stylenNew = Object.assign({},child.props.style)
            stylenNew.position = 'absolute'
            stylenNew.top = 0
            stylenNew.left = 0
            stylenNew.backfaceVisibility='hidden'
            stylenNew.transition = `all ${transition}s`
            if (index === 1) {
                stylenNew.transform='rotateY(-180deg)'
            }
            return React.cloneElement(child, {
                style: stylenNew,
                callback:this._rotate.bind(this, index),
            })
        })
        this.setState({
            children:childComponent
        })
    }

    componentDidMount() {
        //传引用
        this.props.onRef(this);

        let props=this.props
        this._bindChildren(props)
    }

    componentWillUnmount() {
        console.log(this.props.tagPoint)
    }

    componentWillReceiveProps(nextProps, nextContext) {
        // console.log('this props')
        // console.log(this.props.children[0].props)
        // console.log('next props')
        // console.log(nextProps.children[0].props)
        if (nextProps.mode){
            nextProps.changeRef(nextProps.tagPoint,this)
        }
        let dif_1_props = this.props.children[0].props.selectPerson
        let dif_2_props = nextProps.children[0].props.selectPerson

        let dif_3_props = this.props.children[1].props.data_mode
        let dif_4_props = nextProps.children[1].props.data_mode
        // console.log('rotate card flush')
        // console.log(dif_3_props)
        // console.log(dif_4_props)
        // console.log(diff(dif_3_props, dif_4_props))
        if (diff(dif_1_props, dif_2_props) === false || diff(dif_3_props, dif_4_props) === false){
            console.log('update rotate children')
            let { transition } = nextProps
            let childComponent=React.Children.map(nextProps.children,(child,index)=> {
                let stylenNew = Object.assign({},child.props.style)
                let child_props = Object.assign({},child.props)
                stylenNew.position = 'absolute'
                stylenNew.top = 0
                stylenNew.left = 0
                stylenNew.backfaceVisibility='hidden'
                stylenNew.transition = `all ${transition}s`
                // 数组减员时, 下标没变, 但是数据变了, 得到的 state 的是上一个元素的 state, 这里不用传值了, 统一用第一个 child
                // stylenNew.transform=this.state.children[index].props.style.transform
                if (index === 0) {
                    stylenNew.transform='rotateY(180deg)'
                }
                return React.cloneElement(child, {
                    // ...child_props,
                    style: stylenNew,
                    callback:this._rotate.bind(this, index),
                })
            })
            this.setState({
                children:childComponent
            })
        }
        // this._bindChildren(nextProps)
    }

    render() {
        let props = this.props
        // console.log(props.children.length)
        let customName = props.className || 'customName'
        return (
            <div style={{...style.wrap, ...props.style}}
            className={`RotateCard ${customName}`}>
                {this.state.children}
                {/*{this.props.children}*/}
            </div>
        )
    }
}