import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native';
var createReactClass = require('create-react-class');

var TimerMixin = require('react-timer-mixin');

const width = Dimensions.get('window').width;

var ScrollImage = createReactClass({
    mixins: [TimerMixin],
    
    getDefaultProps() {
        return {
            duration: 2000,
            
            imageDataArr: []
        }
    },
    
    getInitialState() {
        return {
            currentPage: 0,
            title: this.props.imageDataArr[0].title
        }
    },
    
    onScrollBeginDrag() {
        this.clearInterval(this.timer);
    },
    
    onScrollEndDrag() {
        this.startTimer();
    },
    
    componentDidMount() {
        this.startTimer();
    },
    
    startTimer() {
        let scrollView = this.refs.scrollView;
        let imgCount = this.props.imageDataArr.length;
        
        this.timer = this.setInterval(function() {
            let activePage = 0;
            if((this.state.currentPage+1) >= imgCount){
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }
            
            let title = this.props.imageDataArr[activePage].title;
            if(title.length > 20){
                title = title.slice(0,20)
                title += "..."
            }
            
            this.setState({
                currentPage: activePage,
                title: title
            });
            
            let offsetX = activePage * width;
            scrollView.scrollTo({x:offsetX, y:0, animated:true});
        }, this.props.duration);
    },
    
    renderAllImage() {
        let allImage = [];
        let imgsArr = this.props.imageDataArr;
        for(let i=0; i<imgsArr.length; i++) {
            let imgItem = imgsArr[i];
            allImage.push(
                <Image key={i} source={{uri: imgItem.imgsrc}} style={{width: width, height:120}}/>
            )
        }
        return allImage;
    },
    
    renderPageCircle() {
        let indicatorArr = [];
        let style;
        let imgsArr = this.props.imageDataArr;
        for(let i=0; i<imgsArr.length; i++){
            style = (i==this.state.currentPage) ? {color: 'orange'} : {color: '#ffffff'};
            indicatorArr.push(
                <Text key={i} style={[{fontSize:25}, style]}>&bull;</Text>
            );
        }
        return indicatorArr;
    },
    
    renderList(list){
        return list.map( (item,idx) => 
            <Text key={idx}>{item.title}{"\n"}{item.url}{"\n"}</Text>
        );
    },
    
    onAnimationEnd(e){
        let offsetX = e.nativeEvent.contentOffset.x;
        let currentPage = Math.floor(offsetX / width);
        let title = this.props.imageDataArr[currentPage].title;
        if(title.length > 20){
            title = title.slice(0,20)
            title += "..."
        }
        
        this.setState({
            currentPage: currentPage,
            title: title
        });
    },
    
    render() {
        return (
            <View style={styles.container}>
                <ScrollView
                    ref="scrollView"
                    horizontal={true}
                    showHorizontalScrollIndicator={false}
                    pageingEnabled={true}
                    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
                    onScrollBeginDrag={this.onScrollBeginDrag}
                    onScrollEndDrag={this.onScrollEndDrag}
                >
                {this.renderAllImage()}
                </ScrollView>
                <View style={styles.pageViewStyle}>
                    <Text style={{color: 'white'}}>{this.state.title}</Text>
                    <View style={{flexDirection: 'row'}}>
                    {this.renderPageCircle()}
                    </View>
                </View>
            </View>
        );
    }
});

const styles = StyleSheet.create({
    pageViewStyle: {
        width: width,
        height: 25,
        backgroundColor: 'rgba(0,0,0,0.4)',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
});

module.exports = ScrollImage;