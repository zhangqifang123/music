import React from 'react'
import '../components/musiclistitem.less'
import {Pubsub} from 'pubsub-js'
class Musiclistitem extends React.Component{
    constructor(props){
        super(props)
    }
    PlayMusic (musicItem){
        // 把事件发出去进行外面进行处理
        PubSub.publish('PLAY_MUSIC',musicItem); 
    }
    deleteMusic(musicItem,e){
      e.stopPropagation();
        PubSub.publish('DELETE_MUSIC',musicItem); 
    }
    render(){
        let musicItem = this.props.MusicItem;
        return( 
             <li onClick={this.PlayMusic.bind(this,musicItem)}  className={`components-listitem row ${this.props.focus?"focus":''}`}>
                 <strong><p>{musicItem.title}-{musicItem.artist}</p></strong>
                 <p className="-col-auto delete" onClick={this.deleteMusic.bind(this,musicItem)}></p>

            </li>
        )
       
    }
}

export default Musiclistitem