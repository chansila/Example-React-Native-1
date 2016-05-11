import React from 'react-native';
const {
  Text,
  View,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Image,
  TextInput,
  ScrollView,
  ToastAndroid
} = React;
var styles = require('./style');
var Button = require('react-native-button');
var Icon = require('react-native-vector-icons/Ionicons');

const ACCESS_TOKEN='';
const USER_PROFILE='';

class Register extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      userDataResponse: '',
      animated: true,
      modalVisible: false,
      transparent: false
    };
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
        <ScrollView>
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
          <Text style={styles.text_title}> First name : </Text>
          <TextInput
              style={styles.textinput}
              onSubmitEditing={(event) => { this.refs.lastName.focus(); }}
              placeholderTextColor='grey'
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName} />
          <Text style={styles.text_title}> Last name : </Text>
          <TextInput
              ref='lastName'
              style={styles.textinput}
              onSubmitEditing={(event) => { this.refs.username.focus(); }}
              placeholderTextColor='grey'
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName} />
          <Text style={styles.text_title}> Username : </Text>
          <TextInput
              ref='username'
              style={styles.textinput}
              onSubmitEditing={(event) => { this.refs.email.focus(); }}
              placeholderTextColor='grey'
              onChangeText={(username) => this.setState({username})}
              value={this.state.username} />
          <Text style={styles.text_title}> Email : </Text>
          <TextInput
              ref='email'
              style={styles.textinput}
              onSubmitEditing={(event) => { this.refs.password.focus(); }}
              placeholderTextColor='grey'
              onChangeText={(email) => this.setState({email})}
              value={this.state.email} />
          <Text style={styles.text_title}> Password : </Text>
          <TextInput
              ref='password'
              style={styles.textinput}
              placeholder='Enter your Password'
              placeholderTextColor='grey'
              onSubmitEditing={(event) => { this.refs.password_confirm.focus(); }}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password} />
          <Text style={styles.text_title}> Password confirmation : </Text>
          <TextInput
              ref='password_confirm'
              style={styles.textinput}
              placeholder='Enter your Password'
              placeholderTextColor='grey'
              secureTextEntry={true}
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              value={this.state.confirmPassword} />
          <View >
            <Button 
              onPress={this._handleRegister.bind(this)}
              containerStyle={styles.container_button_save}
              style={{fontSize: 15, color: '#fff'}} >
              Save
            </Button>
            <Text>Already have an account?</Text>
            <TouchableOpacity onPress={this.gotoLoginPage.bind(this)}>
              <Text style={{color: 'blue'}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
    )
  }
  gotoLoginPage(){
    this.props.navigator.push({
      name: 'Login'
    });
  }

  _handleRegister(){
    let navigator = this.props.navigator;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://locationcode.rotati.com/api/v1/auth');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    let formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("email", this.state.email);
    formdata.append("first_name", this.state.firstName);
    formdata.append("last_name", this.state.lastName);
    formdata.append("password", this.state.password);
    formdata.append("password_confirmation", this.state.confirmPassword);
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
        return ToastAndroid.show('Register errors: '+JSON.parse(xhr.responseText).errors.full_messages, ToastAndroid.LONG);
      }
    }.bind(this);
  }
}

module.exports = Register;