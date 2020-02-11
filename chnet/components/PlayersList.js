import React, { Component } from 'react'
import { Text, View, ActivityIndicator, FlatList, Dimensions, StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements'
export default class PlayersList extends Component {
    constructor(props) {
        super(props);
        this.state = { players: [], isLoading: true };
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
                console.error(error);
            });

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

                {
                    this.state.players.map((l, i) => (
                        <ListItem
                            key={i}
                            leftAvatar={{ source: { uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' } }}
                            title={l.name}
                            subtitle={l.name}
                            badge={{ value: l.tnumber, textStyle: { color: 'black', backgroundColor: 'white', fontSize: 32 } }}
                            bottomDivider
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
});
