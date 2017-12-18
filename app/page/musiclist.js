import React from 'react'
import Musiclistitem from '../components/musiclistitem'
import '../components/musiclistitem.less'
class Musiclist extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let listEle = null;
        listEle = this.props.musicList.map((item)=>{
             return <Musiclistitem 
                       focus={item === this.props.currentMusicItem}
                       key={item.id}
                       MusicItem={item}>
                    </Musiclistitem>
        })
        return(
            <ul>
            {listEle}
        </ul>
        )
    }
}
export default Musiclist