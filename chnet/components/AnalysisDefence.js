import React, { Component } from 'react';
import { Text, ScrollView, TouchableWithoutFeedback, View, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import defence from './analysisUtil/analysisDataAdditional';

const numColumns = 5;
export default class AnalysisDefence extends Component {
    constructor(props) {
        super(props);
        this.state = { def: defence, eff: 0, modalVisible: false }
    }
    onCloseModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
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
                <View>
                    <Modal visible={this.state.modalVisible}>
                        <View>
                            <Text>who?</Text>
                            <TouchableWithoutFeedback onPress={() => this.onCloseModal()}>
                                <Text>Close</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </Modal>
                    <View style={styles.labelContainer}>
                        <Text style={styles.label}>Defence:</Text>
                        <Text style={styles.label}>Time: </Text>
                        <Text style={styles.eff}>Effectiveness: {this.state.eff} %</Text>
                    </View>
                    <FlatList
                        extraData={this.state}
                        data={this.state.def}
                        style={styles.container}
                        renderItem={this.renderItem}
                        numColumns={numColumns}
                    />
                </View>
            </ScrollView>
        );
    }
    customClick = ({ item, index }) => {
        // call modal of who and where
        // think of something to undo and confirmation
        let { def } = this.state;
        let target = def[index];
        this.onCloseModal();
        console.log(target);
        target.value++;
        def[index] = target;
        this.setState({ def });
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
        justifyContent: 'space-between',
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
