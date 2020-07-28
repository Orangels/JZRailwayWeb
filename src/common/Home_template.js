import React from 'react'
import backgroundBanner from '../asset/背景.jpg'
import content_1_banner from '../asset/边框5.png'
import navigation_banner from '../asset/边框3.png'
import navigation_button from '../asset/按钮5.png'
import navigation_current_button from '../asset/按钮4.png'

import TweenLite from 'gsap'
import Circ from 'gsap'
import { LoginTag } from '../view/parameter/parameters'
import { model_width, screen_scale_width, screen_scale_height } from '../view/parameter/parameters'
// import './Home_template.less'

const style = {
    backgroundBanner:{
        // background:`url(${backgroundBanner}) no-repeat `,
        // backgroundColor:'#422947',
        backgroundColor:'#020C11',
        width: "100%",
        height:3560/2*screen_scale_width,
        // backgroundSize: '100% 100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        position:'relative',
    },
    content_1_banner:{
        marginTop:25.5*screen_scale_width,
        background:`url(${content_1_banner}) no-repeat `,
        width: 3720/2*screen_scale_width,
        // height:1615*screen_scale_width,
        height:1700*screen_scale_width,
        backgroundSize: '100% 100%',
        display:'flex',
        flexDirection:'column',
        position:'relative'
    },
    navigation_banner:{
        position:'absolute',
        background:`url(${navigation_banner}) no-repeat `,
        width: 982/2*screen_scale_width,
        height:252/2*screen_scale_width,
        backgroundSize: '100% 100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        left:3720/2*screen_scale_width/2 - 982/2*screen_scale_width/2,
        color:'#FFFFFF',
        fontSize:34*screen_scale_width
    },
    navigation_button:{
        position:'absolute',
        background:`url(${navigation_button}) no-repeat `,
        width: 232/2*screen_scale_width,
        height:100/2*screen_scale_width,
        backgroundSize: '100% 100%',
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        color:'#FFFFFF',
        fontSize:16*screen_scale_width,
        cursor:'pointer'
    },
    quitBtn:{
        position:'absolute',
        // left:271*screen_scale_width,
        // top:20*screen_scale_width,
        right:30*screen_scale_width,
        top:30*screen_scale_width,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        fontSize:16*screen_scale_width,
        cursor:'pointer',
        backgroundColor:'#5856C2',
        color:'#FFFFFF',
        borderRadius:10,
        // width: 110*screen_scale_width,
        // height:44*screen_scale_height,
        width: 100*screen_scale_width,
        height:33*screen_scale_height,
    }
}

const navgation_btn = ['综合统计', '学生分析', '班级分析', '教师分析', '系统配置']

export default class Template extends React.Component{
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {};
        this._quitLogin=this._quitLogin.bind(this)
      }

      _router(index ) {
          let link = '/'
          let { history } = this.props
          switch (index) {
              case 0:
                  link='/'
                  break
              case 1:
                  link='/student_analyze'
                  break
              case 2:
                  link='/class_analyze'
                  break
              case 3:
                  link='/teacher_analyze'
                  break
              case 4:
                  link='/config'
                  break
              default:
                  link='/'
                  break

          }
          document.documentElement.scrollTop = document.body.scrollTop =0;
          this.props.history.push(link,);
      }

    _quitLogin(){
        localStorage.setItem(LoginTag,false)
        this.props.history.push('/login',);
    }

      componentDidMount() {
          (function() {

              var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

              // Main
              initHeader();
              initAnimation();
              addListeners();

              function initHeader() {
                  width = window.innerWidth;
                  height = window.innerHeight;
                  target = {x: width/2, y: height/2};

                  largeHeader = document.getElementById('large-header');
                  // largeHeader.style.height = height+'px';

                  canvas = document.getElementById('demo-canvas');
                  canvas.width = width;
                  canvas.height = height;
                  ctx = canvas.getContext('2d');

                  // create points
                  points = [];
                  for(var x = 0; x < width; x = x + width/20) {
                      for(var y = 0; y < height; y = y + height/20) {
                          var px = x + Math.random()*width/20;
                          var py = y + Math.random()*height/20;
                          var p = {x: px, originX: px, y: py, originY: py };
                          points.push(p);
                      }
                  }

                  // for each point find the 5 closest points
                  for(var i = 0; i < points.length; i++) {
                      var closest = [];
                      var p1 = points[i];
                      for(var j = 0; j < points.length; j++) {
                          var p2 = points[j]
                          if(!(p1 == p2)) {
                              var placed = false;
                              for(var k = 0; k < 5; k++) {
                                  if(!placed) {
                                      if(closest[k] == undefined) {
                                          closest[k] = p2;
                                          placed = true;
                                      }
                                  }
                              }

                              for(var k = 0; k < 5; k++) {
                                  if(!placed) {
                                      if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                          closest[k] = p2;
                                          placed = true;
                                      }
                                  }
                              }
                          }
                      }
                      p1.closest = closest;
                  }

                  // assign a circle to each point
                  for(var i in points) {
                      var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
                      points[i].circle = c;
                  }
              }

              // Event handling
              function addListeners() {
                  if(!('ontouchstart' in window)) {
                      window.addEventListener('mousemove', mouseMove);
                  }
                  window.addEventListener('scroll', scrollCheck);
                  window.addEventListener('resize', resize);
              }

              function mouseMove(e) {
                  var posx = 0;
                  var posy = 0
                  if (e.pageX || e.pageY) {
                      posx = e.pageX;
                      posy = e.pageY;
                  }
                  else if (e.clientX || e.clientY)    {
                      posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                      posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                  }
                  target.x = posx;
                  target.y = posy;
              }

              function scrollCheck() {
                  if(document.body.scrollTop > height) animateHeader = false;
                  else animateHeader = true;
              }

              function resize() {
                  width = window.innerWidth;
                  height = window.innerHeight;
                  largeHeader.style.height = height+'px';
                  canvas.width = width;
                  canvas.height = height;
              }

              // animation
              function initAnimation() {
                  animate();
                  for(var i in points) {
                      shiftPoint(points[i]);
                  }
              }

              function animate() {
                  if(animateHeader) {
                      ctx.clearRect(0,0,width,height);
                      for(var i in points) {
                          // detect points in range
                          if(Math.abs(getDistance(target, points[i])) < 4000) {
                              points[i].active = 0.3;
                              points[i].circle.active = 0.6;
                          } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                              points[i].active = 0.1;
                              points[i].circle.active = 0.3;
                          } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                              points[i].active = 0.02;
                              points[i].circle.active = 0.1;
                          } else {
                              points[i].active = 0;
                              points[i].circle.active = 0;
                          }

                          drawLines(points[i]);
                          points[i].circle.draw();
                      }
                  }
                  requestAnimationFrame(animate);
              }

              function shiftPoint(p) {
                  TweenLite.to(p, 1+1*Math.random(), {x:p.originX-50+Math.random()*100,
                      y: p.originY-50+Math.random()*100, ease:Circ.easeInOut,
                      onComplete: function() {
                          shiftPoint(p);
                      }});
              }

              // Canvas manipulation
              function drawLines(p) {
                  if(!p.active) return;
                  for(var i in p.closest) {
                      ctx.beginPath();
                      ctx.moveTo(p.x, p.y);
                      ctx.lineTo(p.closest[i].x, p.closest[i].y);
                      ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
                      ctx.stroke();
                  }
              }

              function Circle(pos,rad,color) {
                  var _this = this;

                  // constructor
                  (function() {
                      _this.pos = pos || null;
                      _this.radius = rad || null;
                      _this.color = color || null;
                  })();

                  this.draw = function() {
                      if(!_this.active) return;
                      ctx.beginPath();
                      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                      ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
                      ctx.fill();
                  };
              }

              // Util
              function getDistance(p1, p2) {
                  return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
              }

          })();
      }

    render() {
          let props = this.props;
          let { classTag } = props || 'page';
          let { current_page } = props || 0

          let navition_btn_component = navgation_btn.map((value,index)=>{
              let btn_banner = index === current_page ? navigation_current_button : navigation_button;
              let btn_style = {}
              switch (index) {
                  case 0:
                      btn_style = {
                          left:588*screen_scale_width,
                          top:47*screen_scale_width,
                          background:`url(${btn_banner}) no-repeat `,
                      }
                      break;
                  case 1:
                      btn_style = {
                          left:705*screen_scale_width,
                          top:131*screen_scale_width,
                          background:`url(${btn_banner}) no-repeat `,
                      }
                      break;
                  case 2:
                      btn_style = {
                          left:875*screen_scale_width,
                          top:160*screen_scale_width,
                          background:`url(${btn_banner}) no-repeat `,
                      }
                      break;
                  case 3:
                      btn_style = {
                          left:1042*screen_scale_width,
                          top:131*screen_scale_width,
                          background:`url(${btn_banner}) no-repeat `,
                      }
                      break;
                  case 4:
                      btn_style = {
                          left:1159*screen_scale_width,
                          top:47*screen_scale_width,
                          background:`url(${btn_banner}) no-repeat `,
                      }
                      break;
                  default:
                      break
              }

              return (
                  <div style={{...style.navigation_button, ...btn_style}}
                  onClick={this._router.bind(this,index)}
                       key={`Template_${index}`}>
                      {value}
                  </div>
              )
          });

          return (
              <div
                  className = {classTag}
              style={style.backgroundBanner}
                   >
                  <div id="large-header" className="large-header"
                       style={{
                           position:"absolute",
                           width: "100%",
                           height:3560/2*screen_scale_width,
                           top:0,
                           left:0,
                       }}>
                      <canvas id="demo-canvas"></canvas>
                  </div>
                  <div style={style.content_1_banner}>
                      <div style={style.navigation_banner}>
                          STEP 智慧课堂
                      </div>
                      {navition_btn_component}
                      <button style={style.quitBtn}
                              onClick={this._quitLogin}>
                          退出登录
                      </button>
                      {props.children}
                  </div>

              </div>
          )
      }



}
