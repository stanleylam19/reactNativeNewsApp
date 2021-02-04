import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

class NewsDetail extends Component {
    
    constructor(props){
        super(props);
        let websiteData = this.props.route.params.data;
        this.props.navigation.setOptions({ 
            headerTitle: websiteData.title,
            headerTitleStyle: {
                fontWeight: "bold"
            }
        })
        this.state = {
            url: websiteData.url
        }
    }
    
    render() {
        return (
            <WebView
                originWhitelist={['intent://']}
                source={{ uri: this.state.url }}/>  
        );
    }
}

export default NewsDetail;