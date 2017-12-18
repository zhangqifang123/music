import React from 'react'
import {Router,Route,hashHistory,IndexRoute,Link} from 'react-router'
import paly from '../page/player'
import list from '../page/musiclist'
class App extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
              <Router history={hashHistory}>
                 <IndexRoute path="/" component={paly} exact ></IndexRoute>
                 <Router path="/list" component={list}/>
              </Router>
        )
    }
}
export default App