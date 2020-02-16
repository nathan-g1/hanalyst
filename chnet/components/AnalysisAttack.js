import React, { Component } from 'react';
import { Text, ScrollView, TouchableWithoutFeedback, View, Button, StyleSheet, Modal, FlatList, Dimensions } from 'react-native';
import attack from './analysisUtil/analysisData';
import PlayersList from './PlayersList';
import { Icon } from 'react-native-elements';
const numColumns = 5;
var currentMinute = 0;
var currentSeconds = 0;
export default class AnalysisAttack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            att: attack,
            eff: 0,
            minute: 0,
            seconds: 0,
            modalVisible: false,
            pausedVisible: false,
        }
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
    unPauseTime = () => {
        this.setState({ pausedVisible: !this.state.pausedVisible, minute: currentMinute, seconds: currentSeconds });
    }

    pauseTime = () => {
        // call a life cycle method probably on pause to stop the timer 
        // and show a modal with a resume button and a message diaplaying 
        // the timer has paused
        currentMinute = this.state.minute;
        currentSeconds = this.state.seconds;
        this.setState({ pausedVisible: !this.state.pausedVisible });
    }
    onCloseModal = (save) => {
        this.setState({ modalVisible: !this.state.modalVisible });
        if(save){
            // save content from football zone
        }
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
                <Modal transparent={true} style={styles.modal} visible={this.state.pausedVisible} animationType='slide'>
                    <View style={styles.modal}>
                        <View style={{ height: 50, alignItems: 'center' }}>
                            <Text style={{ fontSize: 20 }}>Timer has paused</Text>
                        </View>
                        <Button
                            onPress={() => this.unPauseTime()}
                            title="Resume"
                        />
                    </View>
                </Modal >
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
                            color='red'
                            onPress={() => this.onCloseModal()}
                            title="Cancel"
                        />
                    </View>
                </Modal >
                <View style={styles.labelContainer}>
                    <Text style={styles.label}>Attack</Text>
                    <View style={styles.timer}>
                        <Icon
                            name='pause'
                            color='white'
                            size={20}
                        />
                        <Button
                            onPress={() => this.pauseTime()}
                            title={`Time ${minute}:${seconds}`}
                            type="clear"
                            color='blue'
                        />
                    </View>

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
        backgroundColor: 'blue',
        flexDirection: 'row',
        width: 90
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
