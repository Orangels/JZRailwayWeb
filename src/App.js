import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from 'react-router-dom'
import Home from './view/Home/Home'
import Student_analyze from './view/Student_analyze/Student_analyze'
import Class_analyze from './view/Class_analyze/Class_analyze'
import Teacher_analyze from './view/Teacher_analyze/Teacher_analyze'
import Config from './view/Config/Config'
import Test from './Test'
import TestView from './view/TestView/TestView'

import Login from './view/Login/Login'

import { LoginTag } from '../src/view/parameter/parameters'
import { createBrowserHistory } from 'history';

import './App.css'

const history = createBrowserHistory();

// Get the current location.
const location = history.location;

export const NotFound404 = (props) => (
    <div className="whoops-404">
      <h1>没有页面可以匹配</h1>
    </div>
)

const routes = [
  { path: '/',
    component: Home
  },
  {
    path:'/real_time_show',
    component:Student_analyze,
  },
  { path: '/config',
    component: Config,
  },
  {
    path:'/theme',
    component:NotFound404
  },
    {
        path:'/test',
        component:TestView
    }
];


// login 鉴权
const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact render={props => {
        return (
            <route.component {...props} style={{ width: document.body.clientWidth, height: document.body.clientHeight}} routes={route.routes}/>
        )
    }}/>
);

class App extends React.Component{
  // 构造
    constructor(props) {
      super(props);
      // 初始状态
      this.state = {};
    }

    render() {
      let component_arr_map = routes.map((route, i) => {
        let exact = i === 0 ? true : false
        return (
            <Route key={`router_${i}`} path={route.path} exact={exact} render={props => (
                // 把自路由向下传递来达到嵌套。
                <route.component {...props} />
            )}/>
        )
      })
      return (
        <Router >
            <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} history={history} {...route} value='asdasd'/>
                ))}
            </ReactCSSTransitionGroup>
        </Router>
      )
    }
}





export default App;
