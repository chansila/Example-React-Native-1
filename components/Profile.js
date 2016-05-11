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
  Modal,
  ToastAndroid,
  DrawerLayoutAndroid,
  NativeModules: {
    ImagePickerManager
  }
} = React;

export default class Profile extends React.Component{
  constructor(props) {
    super(props);
  
    this.state = {
      userProfiles: this.props.userProfiles,
      userToken: this.props.userToken,
      username: this.props.userProfiles.username,
      userID: this.props.userProfiles.id,
      firstName: this.props.userProfiles.first_name,
      lastName: this.props.userProfiles.last_name,
      email: this.props.userProfiles.email,
      address: this.props.userProfiles.address+'',
      current_password: '',
      animated: true,
      modalVisible: false,
      transparent: false

    };
  }

  backButton(){
    return this.props.navigator.pop();
  }
  render(){
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {padding: 20}
      : null;
    var _scrollView: ScrollView;
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
          <Text style={styles.user_profile}>{this.state.userProfiles.first_name} {this.state.userProfiles.last_name}'s Profile: </Text>
          <View style={styles.form_container}>
            <Text style={styles.text_title}>Username :</Text>
            <TextInput
            ref='username'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.email.focus(); }}
            onChangeText={(username) => this.setState({username})}
            value={this.state.username}
            defaultValue={this.state.userProfiles.username} />

            <Text style={styles.text_title}>Email :</Text>
            <TextInput
            ref='email'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.first_name.focus(); }}
            onChangeText={(email) => this.setState({email})}
            value={this.state.email}
            defaultValue={this.state.userProfiles.email} />

            <Text style={styles.text_title}>First Name :</Text>
            <TextInput
            ref='first_name'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.last_name.focus(); }}
            onChangeText={(firstName) => this.setState({firstName})}
            value={this.state.firstName}
            defaultValue={this.state.userProfiles.first_name} />

            <Text style={styles.text_title}>Last Name :</Text>
            <TextInput
            ref='last_name'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.address.focus(); }}
            onChangeText={(lastName) => this.setState({lastName})}
            value={this.state.lastName}
            defaultValue={this.state.userProfiles.last_name} />

            <Text style={styles.text_title}>Address :</Text>
            <TextInput
            ref='address'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.password.focus(); }}
            onChangeText={(address) => this.setState({address})}
            value={this.state.address}
            defaultValue={this.state.userProfiles.address} />

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
    console.log('userID',this.state.userID);
    console.log('FName',this.state.firstName);
    console.log('LName',this.state.lastName);
    console.log('Add',this.state.address);
    console.log('Pass',this.state.current_password);
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
    xhr.setRequestHeader('access-token', token);
    xhr.setRequestHeader('client', client);
    xhr.setRequestHeader('expiry', userExpiry);
    xhr.setRequestHeader('token-type', tokenType);
    xhr.setRequestHeader('uid', uid);
    let formdata = new FormData();
    formdata.append("username", this.state.username);
    formdata.append("first_name", this.state.firstName);
    formdata.append("last_name", this.state.lastName);
    formdata.append("address", this.state.address);
    formdata.append("current_password", this.state.current_password);
    xhr.send(formdata);
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
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: false
        });
        console.log('On success :',this.state.modalVisible);
        ToastAndroid.show('Update Profile success!', ToastAndroid.LONG);
      }else{
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: false
        });
        console.log('On Failed :',this.state.modalVisible);
        ToastAndroid.show('Send Fails! Error => :'+JSON.parse(xhr.responseText).errors.full_messages, ToastAndroid.LONG);
      }
    }.bind(this);
    console.log(xhr);
  console.log('hi');
  }

}

module.exports = Profile;