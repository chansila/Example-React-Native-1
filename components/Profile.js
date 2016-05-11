import React from 'react-native';
var styles = require('./style');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

const {
  Text,
  View,
  TouchableHighlight,
  Image,
  AsyncStorage,
  ScrollView,
  TextInput,
  ToolbarAndroid,
  ToastAndroid,
  DrawerLayoutAndroid,
  NativeModules: {
    ImagePickerManager
  }
} = React;
const ACCESS_TOKEN='';
const USER_PROFILE='';

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      latitute: '',
      longitude: '',
      userProfiles: this.props.userProfiles,
      userToken: this.props.userToken,
      username: this.props.userProfiles.data['username'],
      first_name: this.props.userProfiles.data['first_name'],
      last_name: this.props.userProfiles.data['last_name'],
      email: this.props.userProfiles.data['email'],
      address: this.props.userProfiles.data['address']

    };
  }

  backButton(){
    return this.props.navigator.pop();
  }
  render(){
    var _scrollView: ScrollView;
    console.log(this.props.userProfiles);
    console.log(this.props.userToken);
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           title="Location Code"
           navIconName="android-arrow-back"
           titleColor="white"
           onIconClicked={this.backButton.bind(this)}
           style={styles.toolbar} />
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          > 
          <Text style={styles.user_profile}>{this.state.userProfiles.data['first_name']} {this.state.userProfiles.data['last_name']}'s Profile: </Text>
          <View style={styles.form_container}>
            <Text style={styles.text_title}>Username :</Text>
            <TextInput
            ref='username'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.email.focus(); }}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            defaultValue={this.state.userProfiles.data['username']} />

            <Text style={styles.text_title}>Email :</Text>
            <TextInput
            ref='email'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.first_name.focus(); }}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            defaultValue={this.state.userProfiles.data['email']} />

            <Text style={styles.text_title}>First Name :</Text>
            <TextInput
            ref='first_name'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.last_name.focus(); }}
            onChangeText={(first_name) => this.setState({first_name})}
            value={this.state.first_name}
            defaultValue={this.state.userProfiles.data['first_name']} />

            <Text style={styles.text_title}>Last Name :</Text>
            <TextInput
            ref='last_name'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.address.focus(); }}
            onChangeText={(last_name) => this.setState({last_name})}
            value={this.state.last_name}
            defaultValue={this.state.userProfiles.data['last_name']} />

            <Text style={styles.text_title}>Address :</Text>
            <TextInput
            ref='address'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.latitude.focus(); }}
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
            defaultValue={this.state.userProfiles.data['address']} />

            <Text style={styles.text_title}>Latitude :</Text>
            <TextInput
            ref='latitude'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.longitude.focus(); }}
            onChangeText={(latitude) => this.setState({latitude})}
            value={this.state.latitude}
            defaultValue={this.state.userProfiles.data['latitude']} />

            <Text style={styles.text_title}>Longitude :</Text>
            <TextInput
            ref='longitude'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.current_password.focus(); }}
            onChangeText={(longitude) => this.setState({longitude})}
            value={this.state.longitude}
            defaultValue={this.state.userProfiles.data['longitude']} />

            <Text style={styles.text_title}>Password :</Text>
            <Text style={{color: 'grey', paddingTop: 5}}>(leave blank if you don't want to change it)</Text>
            <TextInput
            ref='password'
            style={styles.textinput}
            secureTextEntry={true}
            onChangeText={(password) => this.setState({password})}
            value={this.state.password} />

            <Text style={styles.text_title}>Password confirmation :</Text>
            <TextInput
            ref='confirm_password'
            style={styles.textinput}
            secureTextEntry={true}
            onChangeText={(confirm_password) => this.setState({confirm_password})}
            value={this.state.confirm_password} />

            <Text style={styles.text_title}>Current Password :</Text>
            <Text style={{color: 'grey', paddingTop: 5}}>(we need your current password to confirm your changes)</Text>
            <TextInput
            ref='current_password'
            style={styles.textinput}
            secureTextEntry={true}
            onChangeText={(current_password) => this.setState({current_password})}
            value={this.state.current_password} />
            
          </View>

          <View>
            <Button 
              onPress={this._handleUpdateProfile.bind(this)}
              containerStyle={styles.container_button}
              style={{fontSize: 15, color: '#fff'}}
            >
              Update Profile
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }
  _handleUpdateProfile(){
    let navigator = this.props.navigator;
    let userProfiles = this.state.userProfiles;
    let uToken = this.state.userToken;
    let token = uToken['access-token'];
    let client = uToken['client'];
    let userExpiry = uToken['expiry'];
    let tokenType = uToken['token-type'];
    let uid = uToken['uid'];
    let xhr = new XMLHttpRequest();
    xhr.open('PUT', 'http://locationcode.rotati.com/api/v1/auth');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    xhr.setRequestHeader('access-token', token);
    xhr.setRequestHeader('client', client);
    xhr.setRequestHeader('expiry', userExpiry);
    xhr.setRequestHeader('token-type', tokenType);
    xhr.setRequestHeader('uid', uid);
    let formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("first_name", this.state.first_name);
    formdata.append("last_name", this.state.last_name);
    formdata.append("address", this.state.address);
    formdata.append("password",  this.state.current_password);
    formdata.append("latitude",  this.state.latitude);
    formdata.append("longitude",  this.state.longitude);
    xhr.send(formdata);
    xhr.onload = function () {
      if (xhr.status === 200){
        return ToastAndroid.show('Send Success!', ToastAndroid.SHORT);
      }else{
        return ToastAndroid.show('Send Faild', ToastAndroid.SHORT);
      }
    }
    console.log(xhr);
  }
}

module.exports = Profile;