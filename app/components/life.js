import React from 'react'
// import {Router,Route,hashHistory,IndexRoute,Link} from 'react-router'
import Childer from '../components/childer'
class Life extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num:0
        }
    }
    componentWillMount(){
        console.log("1.componentWillMount组件将要挂载");
    }
    componentDidMount(){
        console.log("3.componentdidMount组件挂载完成")
    }
    
    handleClick(){
        this.setState({
            num:this.state.num+1
        })
         console.log(this.state.num)
    }

    shouldComponentUpdata(newProps,newState){
        console.log("4.shouldComponentUpdata组件是否要进行更新");
        if(newState%5==0){
            return true
        }else {
            return false
        }
    }
    componentWillUpdate(){
        console.log("5.componentWillUpdate组件将要更新")
    }
    componentDidUpdate(){
        console.log("6.componentDidUpdate组件更新结束")
    }
    render(){
        console.log("2.组件挂载render")
        return(
             <div>
                <p>{this.state.num}</p>
                    <button onClick={this.handleClick.bind(this)}>+</button>
                    <Childer num={this.state.num}/>
             </div>
        )
    }
}
 
export default Life