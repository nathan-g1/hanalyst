import React, { Component } from 'react'
import { Text, Modal, View, ActivityIndicator, Button, FlatList, Dimensions, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
import FootballZone from './FootballZone';
export default class PlayersList extends Component {
    constructor(props) {
        super(props);
        this.state = { players: [], isLoading: true, showZone: false };
        // accept time and what analysis code from both [attack and defence] using props
    }

    componentDidMount() {
        return fetch('https://hanalyst.herokuapp.com/api/players')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    players: responseJson,
                }, function () {
                });
            })
            .catch((error) => {
                throw error;
            });
    }
    sendPlayerData = (item, index) => {
        // save selected player data to later post on game history 
        // call Football zone
        this.setState({ showZone: !this.state.showZone });
        console.log(item);
        console.log(index);
    }
    closeModalZone = (bool) => {
        this.setState({ showZone: !this.state.showZone });
        if (bool) {
            this.props.onCloseModal();
        }
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        return (

            <View>
                <Modal style={styles.modal} visible={this.state.showZone} animationType='slide'>
                    <View style={styles.modal}>
                        <FootballZone closeModalZone={this.closeModalZone} />
                        <Button
                            onPress={() => this.closeModalZone()}
                            title="Cancel"
                            color='red'
                        />
                    </View>
                </Modal >
                {
                    this.state.players.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                            title={l.name}
                            subtitle={l.name}
                            badge={{ value: l.tnumber, textStyle: { color: 'black', backgroundColor: 'white', fontSize: 32 } }}
                            bottomDivider
                            chevron
                            onPress={() => this.sendPlayerData(l, i)}
                        />
                    ))
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
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
    modal: {
        // padding: 2,
        // margin: 90,
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
