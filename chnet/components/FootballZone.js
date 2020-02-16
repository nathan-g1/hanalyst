import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, FlatList, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import ZoneList from './analysisUtil/ZoneList';
const numColumns = 3;
export default class FootballZone extends Component {
    constructor(props) {
        // this.props.handler;
        super(props);
        this.state = {
            zone: ZoneList
        }
    }
    renderItem = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.provideWholeData({ item, index })}>
                <View style={styles.itemSyle}>
                    <View><Text style={styles.textStyle}>{item.zoneNumber}</Text></View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    provideWholeData = ({ item, index }) => {
        console.log(item);
    }
    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <Text>Select action zone</Text>
                <ImageBackground source={require('../images/zone.png')} style={{ width: '100%', height: '90%' }}>
                    <FlatList
                        extraData={this.state}
                        data={this.state.zone}
                        renderItem={this.renderItem}
                        numColumns={numColumns}
                        style={styles.listStyle}/>
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
    },
    zoneStyle: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    listStyle: {
        flex: 1,
        marginVertical: 10,
        // marginLeft:110,
        // marginTop:90
    },
    itemSyle: {
        margin: 1,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        borderWidth: 1,
        height: Dimensions.get('window').width * 0.8 / numColumns,
    },
    textStyle: {
        fontSize: 30,
        color: 'black'
    }
});


