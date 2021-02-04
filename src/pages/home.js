import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Navigator } from 'react-native';
import axios from 'axios';
import ListView from 'deprecated-react-native-listview';

var ScrollImage = require('../components/scrollImage');
var NewsDetail = require('../pages/newsDetail');

const localData = require('../utils/temp_data.json');

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headerDataArr: [],
            dataSource: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            })
        }
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }
    
    componentWillMount(){
        this.loadDataFromAPI();
    }
    
    componentWillUnmount(){
        // remove async operation state
        this.setState = (state, callback) => {
            return;
        }
    }
    
    loadDataFromAPI(){
        // visit this url to get news
        let url = "https://3g.163.com/touch/reconstruct/article/list/BA10TA81wangning/0-8.html"
        let opts = {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
        
        axios.get(url)
            .then((response) => {
                let str = response.data
                str = str.slice(9,str.length-1)
                let data = JSON.parse(str)
                let arr = []
                for (let key in data)
                    for (let item in data[key])
                        arr.push( this.getAPIData(data[key][item]) )
                this.setState({ headerDataArr: arr,
                                dataSource: this.state.dataSource.cloneWithRows(arr) })
            })
            .catch((error) => {
                //get some news from localData if it failed to fetch the data online
                let arr = []
                for(let key in localData)
                    for(let item in localData[key])
                        arr.push( this.getAPIData(localData[key][item]) )
                this.setState({ headerDataArr: arr,
                                dataSource: this.state.dataSource.cloneWithRows(arr) })
            })
    }
    
    getAPIData(obj){
        let title = obj.title
        let url = obj.url
        let imgsrc = obj.imgsrc
        return {title, url, imgsrc}
    }
    
    renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.5} 
                onPress={()=>this.props.navigation.navigate('NewsDetail', {data: rowData})}
                >
                <View style={styles.cellViewStyle}>
                    <Image source={{uri:rowData.imgsrc}} style={styles.imgStyle}/>
                    <View style={styles.rightViewStyle}>
                        <Text style={styles.titleStyle}>{rowData.title}</Text>
                        <Text>{rowData.url}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    
    renderHeader() {
        if(this.state.headerDataArr.length === 0) return
        
        return (
            <ScrollImage imageDataArr = {this.state.headerDataArr}/>
        )
    }
    
    render() {
        const {dataSource, headerDataArr} = this.state
        
        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderRow}
                renderHeader={this.renderHeader}
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cellViewStyle: {
        flexDirection: 'row',
        padding: 10,
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 0.5
    },
    imgStyle: {
        width: 90,
        height: 90
    },
    rightViewStyle: {
        width: 260,
        marginLeft: 8
    },
    titleStyle: {
        fontSize: 16
    }
});

export default Home;