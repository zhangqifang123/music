import React from 'react';
import Header from './components/header'
import Play from './page/player'
import Musiclist from './page/musiclist'
import { MUSIC_LIST } from './config/musiclist'
import { Router, IndexRoute, Link, Route, hashHistory } from 'react-router'
import { Pubsub } from 'pubsub-js'
import { musicItem } from './components/musiclistitem.js'
import 'jplayer'
// import Baidu from './components/baidu'
// import Dom from './components/dom'
// import Life from './components/life'
let duration = null;
class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0],
        }
    }
    playMusic(musicItem) {
        $("#player").jPlayer("setMedia", {
            mp3:musicItem.file
        }).jPlayer('play')
        this.setState({
            currentMusicItem: musicItem
        })
    }
    // 下一曲和上一曲
    playNext(type = 'next') {
        //当前播放的音乐位置
        let index = this.findMusicIndex(this.state.currentMusicItem) + 1
        let newIndex = null;
        let musicListLength = this.state.musicList.length
        if (type === 'next') {
            // 取余数
            newIndex = (index + 1) % musicListLength;
        } else {
            // index可能小于0，成为一个负数  上一曲
            alert(musicListLength)
            newIndex = (index + musicListLength - 1) % musicListLength;
            alert(newIndex)
        }

        this.playMusic(this.state.musicList[newIndex])
    }
    // 当前音乐在列表的位置
    findMusicIndex() {
        return this.state.musicList.indexOf(musicItem);
    }
    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        })
        //   调用播放音乐
        this.playMusic(this.state.currentMusicItem)
        //  监听当本首歌曲播放完毕之后，自动进行下一曲的播放
        $("#player").bind($.jPlayer.event.ended, (e) => {
            this.playNext()
        })
        //订阅器
        PubSub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    // 当前的item 不等于要删除的musicItem    删除一个以后，过滤，
                    return item !== musicItem;
                })
            })
        })
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMusic(musicItem)
        })
        //上一曲
        PubSub.subscribe('PLAY_PREV', (msg, musicItem) => {
            this.playNext('prev')
        })
        //下一曲
        PubSub.subscribe('PLAY_NEXT', (msg, musicItem) => {
            alert("下一曲2")
            this.playNext()
        })
    }
    // 解绑
    componentWillUnMount() {
        Pubsub.subscribe('DELETE_MUSIC');
        Pubsub.subscribe('PLAY_MUSIC');
        Pubsub.subscribe('PLAY_PREV');
        Pubsub.subscribe('PLAY_NEXT');
    }
    render() {
        return (
            <div>
                {/* <Life/> */}
                <Header />
                {/* <Play currentMusicItem={this.state.currentMusicItem}/> */}
                {/* <Musiclist 
                currentMusicItem={this.state.currentMusicItem}
                MusicList={this.state.musicList}
                /> */}
                {React.cloneElement(this.props.children, this.state)}
                {/* <Baidu/> */}
                {/* <Dom/> */}
            </div>

        )
    }
}
class Root extends React.Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={Play}></IndexRoute>
                    <Route path="./list" component={Musiclist}></Route>
                </Route>
            </Router>
        );
    }

}
export default Root