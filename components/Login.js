import React from 'react-native';
const {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Image,
  TextInput,
  ToastAndroid
} = React;
var styles = require('./style');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

const ACCESS_TOKEN='';
const USER_PROFILE='';

class Login extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: '',
      userDataResponse: ''
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem(ACCESS_TOKEN);
      if (value !== null){
       console.log('ACCESS_TOKENS',JSON.parse(value));
        this.setState({
          userDataResponse: JSON.parse(value)
        });
        console.log('uid', this.state.userDataResponse['uid']);
        console.log('access-token', this.state.userDataResponse['access-token']);
        console.log('client', this.state.userDataResponse['client']);
        console.log('expiry', this.state.userDataResponse['expiry']);
        console.log('token-type', this.state.userDataResponse['token-type']);
        this.verifyToken();

      } else {
        console.log('Not token set');
      }
    } catch (error) {
      console.log('Something went wrong!');
    }
  }

  async verifyToken(){
    let navigator = this.props.navigator;
    let userDataResponse = this.state.userDataResponse;
    let xhr = new XMLHttpRequest();
    console.log('access-token 2', this.state.userDataResponse['access-token']);
    xhr.open('GET', 'http://locationcode.rotati.com/api/v1/auth/validate_token');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    xhr.setRequestHeader('access-token', this.state.userDataResponse['access-token']);
    xhr.setRequestHeader('client', this.state.userDataResponse['client']);
    xhr.setRequestHeader('expiry', this.state.userDataResponse['expiry']);
    xhr.setRequestHeader('token-type', this.state.userDataResponse['token-type']);
    xhr.setRequestHeader('uid', this.state.userDataResponse['uid']);
    xhr.send(null);
    xhr.onload = function () {
      if (xhr.status === 200){
        return navigator.push({
          name: 'LocationPage',
          passProps: {
            userToken: userDataResponse,
            userProfiles: xhr.responseText
          }
        });
      }else{
        return ToastAndroid.show('Send Faild', ToastAndroid.SHORT);
      }
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           title="Location Code"
           titleColor="white"
           style={styles.toolbar}
         />
        <View style={styles.messageBox}>
          <Image
            style={styles.badge}
            source={require('../assets/badge.png')}
          />
          <Text style={styles.text_title}> Username / Email : </Text>
          <TextInput
              style={styles.textinput}
              onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor='grey'
              placeholder='Enter your Username or Email'
              onChangeText={(username) => this.setState({username})}
              value={this.state.username} />
          <Text style={styles.text_title}> Password : </Text>
          <TextInput
              ref='password'
              style={styles.textinput}
              placeholder='Enter your Password'
              placeholderTextColor='grey'
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password} />
          <View >
            <Button 
              onPress={this._handleLogin.bind(this)}
              containerStyle={styles.container_button}
              style={{fontSize: 15, color: '#fff'}} >
              Log In
            </Button>
          </View>
        </View>
      </View>
    )
  }
   _handleLogin(){
    let navigator = this.props.navigator;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://locationcode.rotati.com/api/v1/auth/sign_in');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    let formdata = new FormData();
    formdata.append("email", String(this.state.username));
    formdata.append("password", String(this.state.password));
    xhr.send(formdata);
    console.log(xhr);
    xhr.onload = function () {
      if (xhr.status === 200){
        AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(xhr.responseHeaders), () => {
          AsyncStorage.getItem(ACCESS_TOKEN, (err, result) => {
            console.log(result);
          });
        });
        // AsyncStorage.setItem(USER_PROFILE, JSON.stringify(xhr.responseText), () => {
        //   AsyncStorage.getItem(USER_PROFILE, (err, result) => {
        //     console.log(result);
        //   });
        // });
        return navigator.push({
          name: 'LocationPage',
          passProps: {
            userToken: xhr.responseHeaders,
            userProfiles: xhr.responseText
          }
        });
      }else{
        return ToastAndroid.show('Logon Failure Unknown username or bad password', ToastAndroid.SHORT);
      }
    };
  }
}

module.exports = Login;