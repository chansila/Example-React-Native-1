import React from 'react-native';
var styles = require('./style');
var Icon = require('react-native-vector-icons/Ionicons');

const {
  Text,
  View,
  TouchableHighlight,
  ToastAndroid,
} = React;

class Navigation extends React.Component {
  render(){
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 220, backgroundColor: '#d2691e',justifyContent: 'center',alignItems: 'center'}} >
          <Image style={styles.profile_picture} source={require('../assets/profile_pic.jpg')}/>
          <Text style={{fontWeight: 'bold', padding: 2, color: '#fff'}}>Chan Sila</Text>
          <Text style={{color: '#fff'}}>chansila8@gmail.com</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5, marginTop: 12}}>
          <Icon name="android-person" style={{ marginLeft: 15, fontSize: 25}}/>
          <TouchableHighlight onPress={this._onPressProfile} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Profile</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5}}>
          <Icon name="location" style={{ marginLeft: 15, fontSize: 25}}/>
          <TouchableHighlight onPress={this._onPressLocation} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>  Locations</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',borderBottomWidth: 1, borderBottomColor: '#dcdcdc'}}>
          <Icon name="log-out" style={{marginLeft: 15, fontSize: 25, color: 'red'}}/>
          <TouchableHighlight onPress={this._onPressLogout} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Logout</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5, marginTop: 6}}>
          <Icon name="android-mail" style={{ marginLeft: 15, fontSize: 25}}/>
          <TouchableHighlight onPress={this._onPressFeedBack} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Feed Back</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5}}>
          <Icon name="star" style={{ marginLeft: 15, fontSize: 25, color: 'gold'}}/>
          <TouchableHighlight onPress={this._onPressRateUs} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Rate Us</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

module.exports =Navigation;