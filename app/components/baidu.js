import React from 'react'
import jsonp from 'jsonp'

class Baidu extends React.Component {
    constructor() {
        super()
        this.state = {
            words: [],
            index: -1
        }
    }
    handleClick(e) {
        let wd = e.target.value;
        jsonp(`https://www.baidu.com/su?wd=${wd}`, {
            param: 'cb',
        }, (arr, res) => {
                           console.log(res)
                           let arr1 =res.s;
                           
            this.setState({
                words: res.s
            })
               })
            }
    handlekeyDown(e) {
        let code = e.keyCode;
        if (code == 38 || code == 40) {
            let index = this.state.index
            if (code == 38) {
                index--
                if (index == -2) {
                    index = this.state.words.length - 1
                }
            } else if (code == 40) {
                index++;
                if (index == this.state.words.length) {
                    index = -1;
                    
                }
            }
            this.setState({
                index: index
            })
        }
        if (e.keyCode == 13) {
            window.location.href = `https://www.baidu.com/s?wd=${e.target.value}`;
        }
    }
    render() {
        return (
            <div className="input-group">
                <input type="text" onClick={this.handleClick.bind(this)} onKeyDown={this.handlekeyDown.bind(this)}
                    value={this.state.index == -1 ? this.wd : this.state.words[this.state.index]} />
                <span class="input-group-addon btn btn-primary" >搜索</span>
                <ul className="list-grop">
                    {
                        this.state.words.map((word, index) => (
                            <li key={index} className={"list-group" + (index === this.state.index ? 'active' : "")}>{word}</li>
                        ))
                    }
                </ul>
            </div>

        )
    }
}




export default Baidu