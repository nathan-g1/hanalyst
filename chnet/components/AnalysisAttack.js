import React, { Component } from 'react';
import { Text, ScrollView, TouchableWithoutFeedback, View, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import attack from './analysisUtil/analysisData';
import PlayersList from './PlayersList';
import { Icon, Button } from 'react-native-elements';
const numColumns = 5;
export default class AnalysisAttack extends Component {
    constructor(props) {
        super(props);
        this.state = { att: attack, eff: 0, minute: 0, seconds: 0, modalVisible: false }
    }
    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { minute, seconds } = this.state;
            if (seconds == 59) {
                this.setState(({ seconds }) => ({
                    seconds: 0,
                    minute: minute + 1
                }))
            }
            this.setState(({ seconds }) => ({
                seconds: seconds + 1
            }))
        }, 1000)
    }
    pauseTime = () => {
        // call a life cycle method probably on pause to stop the timer 
        // and show a modal with a resume button and a message diaplaying 
        // the timer has paused
    }
    onCloseModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
        return false;
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
        const { minute, seconds } = this.state;
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
                        <PlayersList />
                        <Button
                            buttonStyle={{ color: 'red' }}
                            icon={
                                <Icon
                                    name='cancel'
                                    color='red'
                                />
                            }
                            onPress={() => this.onCloseModal()}
                            title="Cancel"
                            type="outline"
                        />
                    </View>
                </Modal >
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Attack</Text>
                    <Button
                        style={styles.timer}
                        icon={
                            <Icon
                                name='pause'
                                color='red'
                                size={20}
                            />
                        }
                        onPress={() => this.pauseTime()}
                        title={`${minute}:${seconds}`}
                        type="clear"
                    />

                    <Text style={styles.eff}>Effectiveness: {this.state.eff}%</Text>
                </View>
                <FlatList
                    extraData={this.state}
                    data={this.state.att}
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
        borderTopWidth: 2,
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
    timer: {
        color: 'yellow',
        width: 40
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
        backgroundColor: 'lightblue',
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
