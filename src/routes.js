import React from 'react'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import Login from './views/Login'
import Home from './views/Home'
import { isLogin } from './utils';


class Routes extends React.PureComponent {


    render() {
        const { history } = this.props
            
       if (isLogin())
            this.props.history.push(`/login`)   

        return (
            <Router history={history}>
                <BrowserRouter>
                  
                            <Switch>
                              
                                <Route path={`/login`} exact component={Login} />
                                <Route path={`/home`} exact component={Home} />
                             

                            </Switch>

                </BrowserRouter>
            </Router>
        )
    }
}


export default (Routes)