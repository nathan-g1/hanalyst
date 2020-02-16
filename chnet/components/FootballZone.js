import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity, FlatList, ImageBackground, StyleSheet, Dimensions, Alert } from 'react-native';
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
    onPress = (zoneNum) => {
        console.log(zoneNum);
    }
    render() {
        const { container, firstSection, TextStyleMiddleInside, TextStyleCornerMiddle, TextStyleCorner, TextStyleInside } = styles;
        return (
            <View style={container}>
                <Text>Select action zone</Text>
                <ImageBackground source={require('../images/zonenew.png')} style={{ width: 360, height: 500 }}>
                    <View style={firstSection}>
                        <TouchableOpacity onPress={()=>this.onPress(2)} style={TextStyleCorner}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(1)} style={TextStyleInside}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(3)} style={TextStyleCorner}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={firstSection}>
                        <TouchableOpacity onPress={()=>this.onPress(6)} style={TextStyleCornerMiddle}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(5)} style={TextStyleMiddleInside}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(4)} style={TextStyleCornerMiddle}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                    </View>
                    <View style={firstSection}>
                        <TouchableOpacity onPress={()=>this.onPress(9)} style={TextStyleCornerMiddle}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(8)} style={TextStyleMiddleInside}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(7)} style={TextStyleCornerMiddle}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                    </View>

                    <View style={firstSection}>
                        <TouchableOpacity onPress={()=>this.onPress(12)} style={TextStyleCorner}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(11)} style={TextStyleInside}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.onPress(10)} style={TextStyleCorner}>
                            <Text color='transparent' ></Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        // flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30

    },
    zoneStyle: {
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    listStyle: {
        // flex: 1,
        marginVertical: 10,
        // marginLeft:110,
        // marginTop:90
    },
    itemSyle: {
        margin: 1,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'pink',
        height: Dimensions.get('window').width / numColumns,
    },
    textStyle: {
        fontSize: 30,
        color: 'pink'
    },
    firstSection: {
        // height: 80,
        flexDirection: 'row',
        // marginVertical: 10,
        // backgroundColor: 'lightblue',
        // justifyContent: 'space-between'
    },
    TextStyleCorner: {
        height: 80,
        width: 85,
        borderWidth: 1,
        borderColor: 'pink',
    },
    TextStyleInside: {
        height: 80,
        borderWidth: 1,
        borderColor: 'pink',
        width: 190
    },
    TextStyleMiddleInside: {
        borderWidth: 1,
        borderColor: 'pink',
        height: 175,
        width: 190
    },
    TextStyleCornerMiddle: {
        borderWidth: 1,
        borderColor: 'pink',
        height: 175,
        width: 85
    },
});


