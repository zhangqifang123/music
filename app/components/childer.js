
import React from 'react'
class Childer extends React.Component{
    constructor(props){
        super(props)
        this.state={
            num:0
        }
    }
    componentWillReceiveProps(newProps,newState){
           console.log('componentWillReceiveProps',newProps)
        if(newProps.num%3 == 0){
            console.log(newProps)
            return true
        }else{
            return false
        }


    }
    render (){
        return(
            <div>
                <p>{this.props.num}</p>
            </div>
        )
    }
 }
 export default Childer