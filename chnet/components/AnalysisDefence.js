import React, { Component } from 'react';
import { Text, ScrollView, Button, TouchableWithoutFeedback, View, StyleSheet, FlatList, Dimensions, Modal } from 'react-native';
import defence from './analysisUtil/analysisDataAdditional';
import PlayersList from './PlayersList';



const numColumns = 5;
export default class AnalysisDefence extends Component {
    constructor(props) {
        super(props);
        this.state = { def: defence, eff: 0, modalVisible: false }
    }
    onCloseModal = (bool) => {
        this.setState({ modalVisible: !this.state.modalVisible });
        return bool;
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
                <Modal transparent={true} style={styles.modal} visible={this.state.modalVisible} animationType='slide'>
                    <View style={styles.modal}>
                        <View style={{ height: 50, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Who?</Text>
                        </View>
                        <View style={styles.modalTitle}>
                            <Text style={styles.label, { fontSize: 15 }}>Player Name</Text>
                            <Text style={styles.eff, { fontSize: 15 }}>Shirt Number</Text>
                        </View>
                        <PlayersList onCloseModal={this.onCloseModal} />
                        <Button
                            onPress={() => this.onCloseModal()}
                            title="Cancel"
                            color='red'
                        />
                    </View>
                </Modal >
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Defence</Text>
                    <Text style={styles.eff}>Effectiveness: {this.state.eff}%</Text>
                </View>
                <FlatList
                    extraData={this.state}
                    data={this.state.def}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns}
                />
            </ScrollView >
        );
    }
    customClick = ({ item, index }) => {
        // call modal of who and where
        // think of something to undo and confirmation
        if (!this.onCloseModal()) return;
        let { def } = this.state;
        let target = def[index];
        console.log(target);
        target.value++;
        def[index] = target;
        this.setState({ def });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 10,
        backgroundColor: 'teal'
    },
    code: {
        fontSize: 20,
        alignItems: 'flex-start',
        color: 'teal'
    },
    labelContainer: {
        justifyContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        borderColor: 'teal',
    },
    label: {
        alignItems: 'flex-start',
        paddingTop: 8
    },
    eff: {
        alignItems: 'flex-end',
        color: 'red',
        paddingTop: 8
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
        color: 'black',
    },
    modal: {
        padding: 2,
        margin: 10,
        backgroundColor: 'white',
    },
    modalTitle: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: 'teal',
        borderBottomWidth: 2,
        fontSize: 30,
    },
});
