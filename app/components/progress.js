import React from 'react';
import './progress.less'
class Progress extends React.Component{
    constructor(props){
        super(props)
        this.state={
            barColor:"black"
        }
    }
    changeProgress(e){  
        let progressBar = this.refs.progressBar
        //這是進度條的progeress  
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress);
    }
    render(){
        return(
            <div ref="progressBar" className="components-progress row" onClick={this.changeProgress.bind(this)} >
                <div className="progress" style={{width:`${this.props.progress}%`,background:this.props.barColor}} ></div>
            </div>
        )
    }
}
export default Progress