import React, { Component } from 'react';
import { Text, ScrollView, TouchableWithoutFeedback, View, StyleSheet, FlatList, Dimensions } from 'react-native';
import attack from './analysisUtil/analysisData';

const numColumns = 5;
export default class AnalysisAttack extends Component {
    constructor(props) {
        super(props);
        this.state = { att: attack, eff: 0 }
    }
    renderItem = ({ item, index }) => {
        return (
            <TouchableWithoutFeedback onPress={() => this.customClick({ item, index })}>
                <View key={item.id} style={styles.attackCell}>
                    <View>
                        <Text style={styles.code} key={item.code}> {item.code}</Text>
                        <Text style={styles.desc} key={item.desc}> {item.desc}</Text>
                    </View>
                    <Text style={styles.valueStyle} key={item.value}> {item.value} </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
    render() {
        return (
            <ScrollView>
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Attack</Text>
                    <Text style={styles.label}>Time: </Text>
                    <Text style={styles.eff}>Effectiveness: {this.state.eff} %</Text>
                </View>
                <FlatList
                    extraData={this.state}
                    data={this.state.att}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
            </ScrollView>
        );
    }
    customClick = ({ item, index }) => {
        // call modal of who and where
        // think of something to undo and confirmation
        let { att } = this.state;
        let target = att[index];
        this.setState({
            eff: Math.round((this.state.att[8].value * 100) / this.state.att[8].value + this.state.att[9].value)
        });
        target.value++;
        att[index] = target;
        this.setState({ att });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10
    },
    code: {
        fontSize: 20,
        alignItems: 'flex-start',
        color: 'teal'
    },
    labelContainer: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row'
    },
    label: {
        alignItems: 'flex-start'
    },
    eff: {
        alignItems: 'flex-end',
        color: 'red'
    },
    time: {
        color: 'yellow'
    },
    desc: {
        fontSize: 10,
        alignItems: 'center',
        color: 'darkgreen'
        
    },
    attackCell: {
        backgroundColor: 'lightgrey',
        margin: 1,
        flex: 1,
        flexDirection: 'column',
        borderRadius: 3,
        height: Dimensions.get('window').width / numColumns,
    },
    valueStyle: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: 'lightgreen',
        color: 'blue',
    }
});
