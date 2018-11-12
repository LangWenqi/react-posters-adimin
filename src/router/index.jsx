import React, {Component} from "react";
// import { BrowserRouter as Router, Route, Switch,Redirect} from "react-router-dom";
import {Router, Route, Switch, Redirect} from "react-router-dom";//用router 注入history可使用路由全局跳转
import history from '@/history';
import asyncComponent from "@/middleware/AsyncComponent";
const Index = asyncComponent(() => import("@/pages/index/index"));
const posters = asyncComponent(() => import("@/pages/posters/posters"));
const login = asyncComponent(() => import("@/pages/login/login"));
// import Index from "@/pages/index/index"
// import posters from "@/pages/posters/posters"
// import login from "@/pages/login/login"
const routes = [
    {
        path: "/index",
        component: Index,
        redirect: {
            from: '/index',
            to: '/index/0'
        },
        routes: [
            {
                path: "/index/:id",
                component: posters,
                exact: true
            },
        ]
    },
    {
        path: "/login",
        component: login,
        exact: true
    }
];
export const RouteWithSubRoutes = route => (
    <React.Fragment>
        <Route exact={route.exact}
               path={route.path}
               render={props => (
                   <route.component {...props} routes={route.routes}>
                       {route.routes && route.routes.length > 0 ?
                           <Switch>
                               {route.routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                               {route.redirect ?
                                   <Redirect from={route.redirect.from} to={route.redirect.to}></Redirect> : null}
                           </Switch>
                           : null}
                   </route.component>
               )}
        />
    </React.Fragment>
);
// basename="/dist"
export default class extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
                    <Redirect from={'/'} to={'/login'}></Redirect>
                </Switch>
            </Router>
        );
    }
}
