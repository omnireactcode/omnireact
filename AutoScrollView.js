import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';

const SCROLLVIEW_REF = 'scrollview'

export default class AutoScrollView extends Component {

  state = { height: 0, autoPlay: true }

  constructor(props) {
    super(props)
    this._goToNextPage = this._goToNextPage.bind(this)
    this._onScroll = this._onScroll.bind(this)
    this._startAutoPlay = this._startAutoPlay.bind(this)
    this._stopAutoPlay = this._stopAutoPlay.bind(this)
    this._onScrollViewLayout = this._onScrollViewLayout.bind(this)

    this._currentIndex = 0;
    this._childrenCount = 5;
  }

  componentDidMount() {
    if (this.state.autoPlay) this._startAutoPlay()
    else this._stopAutoPlay()
  }

  render() {
    const containerHeight = 200;
    const childHeight = 100;
    const margin = (containerHeight - childHeight) / 2

    return (
      <View style={{ flex: 1, backgroundColor: 'slategrey' }}>
        <View style={{ height: containerHeight, backgroundColor: 'white' }}>
          <ScrollView
            onLayout={this._onScrollViewLayout}
            onScroll={this._onScroll}
            ref={SCROLLVIEW_REF}
            pagingEnabled={true}
            scrollEventThrottle={8}
          >
            <View style={{ backgroundColor: 'purple', flex: 1, height: childHeight, margin: margin }} />
            <View style={{ backgroundColor: 'blue', flex: 1, height: childHeight, margin: margin }} />
            <View style={{ backgroundColor: 'maroon', flex: 1, height: childHeight, margin: margin }} />
            <View style={{ backgroundColor: 'black', flex: 1, height: childHeight, margin: margin }} />
            <View style={{ backgroundColor: 'salmon', flex: 1, height: childHeight, margin: margin }} />
          </ScrollView>
        </View>

      </View>
    );
  }
  _onScroll(event) {
    let { y } = event.nativeEvent.contentOffset, offset, position = Math.floor(y / this.state.height)
    if (y === this._preScrollY) return;
    this._preScrollY = y
    offset = y / this.state.height - position

    if (offset === 0) {
      this._currentIndex = position
      this._timerId = setInterval(this._goToNextPage, 3000)
    }
  }

  _onScrollViewLayout(event) {
    let { height } = event.nativeEvent.layout
    this.setState({ height: height })
  }

  _goToNextPage() {
    this._stopAutoPlay()
    let nextIndex = (this._currentIndex + 1) % this._childrenCount;
    this.refs[SCROLLVIEW_REF].scrollTo({ y: this.state.height * nextIndex })

  }

  _startAutoPlay() {
    this._timerId = setInterval(this._goToNextPage, 3000)
  }

  _stopAutoPlay() {
    if (this._timerId) {
      clearInterval(this._timerId)
      this._timerId = null
    }
  }



}


