import React from 'react';
import { View, Switch, StyleSheet, Text, Button,Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
/*import * as moment from "moment";
import "moment/locale/nl";*/
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isEnabled: false,
      show: false,
      mode: 'date',
      date: new Date(),
      chosenDate:''
    };
  }
  onChange = (event, selectedDate) => {
    var currentDate = selectedDate ||this.state.date ;
     console.log(selectedDate ||this.state.date)
    this.setState({show: Platform.OS === 'ios'})
    this.setState({ date: currentDate });
    // this.setState({time:currentDate})
    // console.log(selectedDate)
  };

  showMode = (currentMode) => {
    this.setState({ mode: currentMode });
    this.setState({ show: true });
  };

  showDatepicker = (datetime) => {
    this.showMode("date")
    chosenDate:moment(datetime).format('MMMM, Do YYYY HH:mm')
    
  };

  showTimepicker = (datetime) => {
    this.showMode("time")
    chosenDate:moment(datetime).format('MMMM, Do YYYY HH:mm')
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ alignItems: 'center', height: 100 }}>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={this.state.isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={(value) => {
              this.setState({
                isEnabled: value,
              });
            }}
            value={this.state.isEnabled}
          />
          <View style={{ flex: 0.5 }}>
            {this.state.isEnabled ? (
              <View>
                <View>
                  <Button
                    onPress={this.showDatepicker}
                    title="Show date picker!"
                  />
                </View>
                <View>
                  <Button
                    onPress={this.showTimepicker}
                    title="Show time picker!"
                  />
                </View>
                {this.state.show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={this.state.date}
                    mode={this.state.mode}
                    is24Hour={true}
                    display="default"
                    onChange={this.onChange}
                  />
                )}
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});