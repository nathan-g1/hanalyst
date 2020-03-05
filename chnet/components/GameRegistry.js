import React, { Component } from 'react'
import { Text, StyleSheet, BackHandler, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from './custom/Header';
import Button from './custom/Button';
import TextInput from './custom/TextInput';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Navigation } from 'react-native-navigation';
import RNPickerSelect from 'react-native-picker-select';
var radio_props = [
    { label: 'Home  ', value: 0 },
    { label: 'Away', value: 1 }
];

const gameType = [
    {
        label: 'Premier League',
        value: 'premierleague',
    },
    {
        label: 'Higher League',
        value: 'higherleague',
    },
    {
        label: 'National League',
        value: 'nationalleague',
    },
];
export default class GameRegistry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            mode: 'time',
            show: false,
            refree: 'Nabil',
            location: '',
            gameType: 'Premier League',
            venue: 'Sodo',
            ha: true,
            oppoent: 'Manchester United',
            start: false,
        }
    }
    setDate = (va) => {
        this.setState({ date: va })
    }
    setMode = (va) => {
        this.setState({ mode: va });
    }
    setShow = (va) => {
        // !this.state.show
        this.setState({ show: va });
    }
    onChange = (event, selectedDate) => {
        const currentDate = selectedDate || this.state.date;

        this.setDate(currentDate);
        this.setShow(false);
    }

    showMode = (currentMode) => {
        this.setShow(true);
        this.setMode(currentMode);
    }

    startGame = () => {
        let v = this.state.ha == 0 || this.state.ha == true ? true : false;
        let data = {
            startTime: "2020-02-27T07:28:54.386Z",
            endTime: "2020-02-27T07:28:54.386Z",
            venue: this.state.venue,
            ha: v,
            gameType: this.state.gameType,
            playingTeams: [
                {
                    teamTwo: this.state.oppoent
                }
            ],
            referee: this.state.refree
        };
        let url = 'https://hanalyst.herokuapp.com/api/games';
        this.postGameInformation(url, data);
    }
    postGameInformation = async (url, data) => {
        console.log(JSON.stringify(data));
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        }).then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
                this.goToHomePage('app');
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    // showDatepicker = () => {
    //     this.showMode('date');

    // };

    showTimepicker = () => {
        this.setShow(true);
    };

    goToHomePage = (screenName) => {
        Navigation.push(this.props.componentId, {
            component: {
                name: screenName,
                options: {
                    topBar: { visible: false, height: 0, }
                }
            }
        })
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        const url = 'https://hanalyst.herokuapp.com/api/teams';
        let opponentItems = [];
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                responseJson.filter((obj, i) => {
                    opponentItems.push(
                        {
                            'label': obj['name'],
                            'value': obj['id']
                        }
                    )
                    console.log(opponentItems);
                });
                this.setState({
                    opponent: opponentItems,
                }, function () {
                });
            })
            .catch((error) => {
                throw error;
            });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    }

    onBackPress = () => {
        return true; // < ----make sure you return true.
    }

    render() {
        return (
            <View style={styles.container}>
                <Header>Game Information</Header>
                {/* <View style={styles.horizontalView}> */}
                {/* <Button title="Start Time" onPress={this.showTimepicker} /> */}
                <Button mode="contained" style={{ backgroundColor: '#2ecc71' }} onPress={this.showTimepicker}>Select Time</Button>
                {this.state.show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        timeZoneOffsetInMinutes={0}
                        value={this.state.date}
                        mode={'time'}
                        is24Hour={false}
                        display="default"
                        onChange={this.onChange}
                    />
                )}
                {/* <Text style={styles.textDate}>Game starts at: {JSON.stringify(this.state.date)}</Text> */}
                <Text style={styles.textDate}>Game starts at: {this.state.date.toTimeString()}</Text>
                {/* </View> */}
                <TextInput
                    label="Refree"
                    returnKeyType="next"
                    value={this.state.refree}
                    onChangeText={text => this.setState({ refree: text })}
                    autoCapitalize="none"
                />
                <Text>Select Game Type</Text>
                <RNPickerSelect
                    onValueChange={(value) => { this.setState({ gameType: value }) }}
                    items={gameType}
                    placeholder={{
                        label: 'Select a game type...',
                        value: null,
                        color: '#600EE6',
                    }}
                    style={{
                        inputAndroid: {
                            backgroundColor: '#2ecc71',
                            borderColor: 'black',
                            borderRadius: 4,
                            borderWidth: 0.6,
                            color: 'black',
                        }
                    }}
                    value={this.state.gameType}
                    // useNativeAndroidPickerStyle={true}
                    textInputProps={{ underlineColorAndroid: '#600EE6' }}
                />
                <View paddingVertical={5} />
                <Text>Select Opponent Team</Text>
                <RNPickerSelect
                    onValueChange={(value) => {
                        this.setState({ opponentTeamSelected: value });
                    }}
                    items={this.state.opponent}
                    placeholder={{
                        label: 'Select opponent team...',
                        value: null,
                        color: '#600EE6',
                    }}
                    style={{
                        inputAndroid: {
                            backgroundColor: '#2ecc71',
                            borderColor: 'black',
                            borderRadius: 4,
                            borderWidth: 0.6,
                            color: 'black',
                        }
                    }}
                    value={this.state.opponentTeamSelected}
                    useNativeAndroidPickerStyle={true}
                    textInputProps={{ underlineColorAndroid: '#600EE6' }}
                />
                <TextInput
                    label="Venue"
                    returnKeyType="next"
                    value={this.state.venue}
                    onChangeText={text => this.setState({ venue: text })}
                    autoCapitalize="none"
                />

                <RadioForm
                    formHorizontal={true}
                    animation={true}
                    labelHorizontal={true}
                    buttonColor={'#2196f3'}
                    radio_props={radio_props}
                    labelStyle={{ fontSize: 20, color: '#2ecc71' }}
                    initial={0}
                    onPress={(value) => { this.setState({ ha: value }) }}
                />
                <Button mode="contained" onPress={this.startGame}>Start Game Analysis</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 30,
        marginRight: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    textDate: {
        fontSize: 20
    }
});


