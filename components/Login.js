import React from 'react-native';
const {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Modal,
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
      userDataResponse: '',
      animated: true,
      modalVisible: false,
      transparent: false
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
    this.setState ({ 
      modalVisible: true,
      transparent: true,
      animated: true
    });
    xhr.open('GET', 'http://locationcode.rotati.com/api/v1/auth/validate_token');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    xhr.setRequestHeader('access-token', this.state.userDataResponse['access-token']);
    xhr.setRequestHeader('client', this.state.userDataResponse['client']);
    xhr.setRequestHeader('expiry', this.state.userDataResponse['expiry']);
    xhr.setRequestHeader('token-type', this.state.userDataResponse['token-type']);
    xhr.setRequestHeader('uid', this.state.userDataResponse['uid']);
    xhr.send(null);
    // xhr.onreadystatechange = function () {
    //   if (xhr.readyState===2 || xhr.readyState===4) {
    //     this.setState ({ 
    //       modalVisible: true,
    //       transparent: true,
    //       animated: true
    //     });
    //   }
    // }.bind(this);
    xhr.onload = function () {
      if (xhr.status === 200){
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: true
        });
        return navigator.push({
          name: 'LocationPage',
          passProps: {
            userToken: userDataResponse,
            userProfiles: JSON.parse(xhr.responseText).data
          }
        });
      }else{
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: true
        });
        AsyncStorage.removeItem(ACCESS_TOKEN);
        ToastAndroid.show('Session expired!', ToastAndroid.SHORT);
      }
    }.bind(this);
  }

  render(){
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {padding: 20}
      : null;
    return(
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           title="Location Code"
           titleColor="white"
           style={styles.toolbar}
         />
        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
            <View style={[styles.container, modalBackgroundStyle]}>
              <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                <Image source={require('../assets/loading.gif')} />
              </View>
            </View>
          </Modal>
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
            <Button 
              onPress={this._handleRegister.bind(this)}
              containerStyle={styles.container_button}
              style={{fontSize: 15, color: '#fff'}} >
              Register
            </Button>
          </View>
        </View>
      </View>
    )
  }
  _handleRegister(){
    return this.props.navigator.push({
      name: 'Register'
    });
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
    xhr.onreadystatechange = function () {
      if (xhr.readyState===2 || xhr.readyState===4) {
        this.setState ({ 
          modalVisible: true,
          transparent: true,
          animated: true
        });
        console.log('On ready :',this.state.modalVisible);
      }
    }.bind(this);
    xhr.onload = function () {
      if (xhr.status === 200){
        AsyncStorage.setItem(ACCESS_TOKEN, JSON.stringify(xhr.responseHeaders), () => {
          AsyncStorage.getItem(ACCESS_TOKEN, (err, result) => {
            console.log(result);
          });
        });
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: false
        });
        return navigator.push({
          name: 'LocationPage',
          passProps: {
            userToken: xhr.responseHeaders,
            userProfiles: JSON.parse(xhr.responseText).data
          }
        });
      }else{
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: false
        });
        return ToastAndroid.show('Logon Failure Invalid username or password', ToastAndroid.SHORT);
      }
    }.bind(this);
  }
}

module.exports = Login;