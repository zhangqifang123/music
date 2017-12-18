import React from 'react'

class Dom extends React.Component{
    constructor(props){
        super(props)
        this.state={
            val:""
        }
    }
    handleChange(e){
        let value =e.target.value
        this.setState({
            val:value
        })
    }
    render(){
        return(
             <div>
                 <p>{this.state.val}</p>
                 <input type="text" value={this.state.val} onChange={this.handleChange.bind(this)} />

             </div>
        )
    }
}
export default Dom