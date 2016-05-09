import React from 'react-native';
var Swiper = require('react-native-swiper');
var Button = require('react-native-button');
var styles = require('./style');
var Icon = require('react-native-vector-icons/Ionicons');

const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  TextInput,
  Platform,
  ToolbarAndroid,
  Picker,
  ScrollView,
  ToastAndroid,
  DrawerLayoutAndroid,
  NativeModules: {
    ImagePickerManager
  }
} = React;

export default class LocationPage extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      token: this.props.userToken['access-token'],
      userUid: this.props.userToken['uid'],
      userClient: this.props.userToken['client'],
      userExpiry: this.props.userToken['expiry'],
      tokenType: this.props.userToken['token-type'],
      userProfiles: this.props.userProfiles,
      imageSource: [],
      latitute: 11.549084,
      longitude: 104.9264285
    };
    ToastAndroid.show('You have Login success!', ToastAndroid.LONG);
  }

  selectPhotoTapped() {
    const options = {
      title: 'Photo Picker',
      takePhotoButtonTitle: 'Take Photo...',
      chooseFromLibraryButtonTitle: 'Choose from Library...',
      storageOptions: {
        skipBackup: true,
        path: 'disk',
        savePrivate: true
      }
    };

    ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePickerManager Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        var source;
        if (Platform.OS === 'android') {
          source = {uri: response.uri, isStatic: true};
        } else {
          source = {uri: response.uri.replace('file://', ''), isStatic: true};
        }

        this.setState({
          imageSource: this.state.imageSource.concat([source])
        });
        console.log('Clicked Add Photo',this.state.imageSource);
      }
    });
  }
  openDrawer(){
    this.refs['DRAWER_REF'].openDrawer()
  }
  _onPressProfile(){
    this.refs['DRAWER_REF'].closeDrawer();
    return this.props.navigator.push({
      name: 'Profile',
      passProps: {
        userToken: this.state.userToken,
        userProfiles: this.state.userProfiles
      }
    });
  }
  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 220, backgroundColor: '#d2691e',justifyContent: 'center',alignItems: 'center'}} >
          <Image style={styles.profile_picture} source={require('../assets/profile_pic.jpg')}/>
          <Text style={{fontWeight: 'bold', padding: 2, color: '#fff'}}>Chan Sila</Text>
          <Text style={{color: '#fff'}}>chansila8@gmail.com</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5, marginTop: 12}}>
          <Icon name="android-person" style={{ marginLeft: 15, fontSize: 25}}/>
          <TouchableHighlight onPress={this._onPressProfile.bind(this)} underlayColor='#fff'>
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
    );
    var _scrollView: ScrollView;
    return (
      <DrawerLayoutAndroid
        ref='DRAWER_REF'
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => navigationView}>
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           title="Location Code"
           navIconName="android-menu"
           titleColor="white"
           onIconClicked={this.openDrawer.bind(this)}
           style={styles.toolbar}
         />
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          > 
        <View style={styles.form_container}>
          <Text style={styles.text_title}>Name :</Text>
          <TextInput
            style={styles.textinput}
            returnKeyType = {"next"}
            autoFocus = {true}
            onSubmitEditing={(event) => { this.refs.stated.focus(); }}
            placeholder='Enter you Business Name'
            placeholderTextColor='grey'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name} />

          <Text style={styles.text_title}>State :</Text>
          <TextInput
            ref='stated'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.district.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(stated) => this.setState({stated})}
            value={this.state.stated} />

          <Text style={styles.text_title}>District :</Text>
          <TextInput
            ref='district'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.commune.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(district) => this.setState({district})}
            value={this.state.district} />

          <Text style={styles.text_title}>Commune :</Text>
          <TextInput
            ref='commune'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.city.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(commune) => this.setState({commune})}
            value={this.state.commune} />

          <Text style={styles.text_title}>City :</Text>
          <TextInput
            ref='city'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.home.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(city) => this.setState({city})}
            value={this.state.city} />

          <Text style={styles.text_title}>Home Number :</Text>
          <TextInput
            ref='home'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.street.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(home) => this.setState({home})}
            value={this.state.home} />

          <Text style={styles.text_title}>Street Number :</Text>
          <TextInput
            ref='street'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.description.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(street) => this.setState({street})}
            value={this.state.street} />

          <Text style={styles.text_title}>Description :</Text>
          <TextInput
            ref='description'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.code.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(description) => this.setState({description})}
            value={this.state.description} />
          <Picker
            selectedValue={this.state.category}
            onValueChange={(cate) => this.setState({category: cate})}>
            <Picker.Item label="Coffee Shop" value="6" />
            <Picker.Item label="Web Development" value="5" />
            <Picker.Item label="Restaurant" value="7" />
            <Picker.Item label="Banks & Finance" value="10" />
          </Picker>
          
        </View>

        <View>
          <Button 
            onPress={this.selectPhotoTapped.bind(this)}
            containerStyle={styles.container_button}
            style={{fontSize: 15, color: '#fff'}}
          >
            Select Photo
          </Button>
          <Button 
            onPress={this.gotoResultPage.bind(this)}
            containerStyle={styles.container_button}
            style={{fontSize: 15, color: '#fff'}}
          >
            Save Information
          </Button>
        </View>
        <Swiper loop={false} height={300}>
          { this.state.imageSource.length <= 0 ? <Text></Text> :
              this.state.imageSource.map(function(imageselected,key){
                return(
                  <View key={key++} style={[styles.imageContainer, {marginBottom: 20}]}>
                    <Image style={styles.image} source={imageselected} />
                  </View>
                )
              })
          }
        </Swiper>
        </ScrollView>
      </View>
      </DrawerLayoutAndroid>
    );
  }

  gotoResultPage(){
    let navigator = this.props.navigator;
    let token = this.state.token;
    let uid = this.state.userUid;
    let tokenType = this.state.tokenType;
    let userExpiry = this.state.userExpiry;
    let client = this.state.userClient;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://locationcode.rotati.com/api/v1/locations');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    xhr.setRequestHeader('access-token', token);
    xhr.setRequestHeader('client', client);
    xhr.setRequestHeader('expiry', userExpiry);
    xhr.setRequestHeader('token-type', tokenType);
    xhr.setRequestHeader('uid', uid);
    let formdata = new FormData();
    formdata.append("location[name]", this.state.name);
    formdata.append("location[description]", this.state.description);
    formdata.append("location[home]", this.state.home);
    formdata.append("location[street]", this.state.street);
    formdata.append("location[commune]", this.state.commune);
    formdata.append("location[district]", this.state.district);
    formdata.append("location[city]", this.state.city);
    formdata.append("location[state]", this.state.stated);
    formdata.append("location[latitude]", this.state.latitute);
    formdata.append("location[longitude]", this.state.longitude);
    formdata.append("location[location_categories_attributes[][category_id]]", this.state.category);
    this.state.imageSource.map(function(imageselected,key){
      formdata.append("location[location_photos_attributes["+key+"][photo]]", {uri: imageselected.uri, name: _generateUUID()+'.jpg', type: 'multipart/form-data'});
    });
    xhr.send(formdata);
    xhr.onload = function () {
      if (xhr.status === 201){
        return ToastAndroid.show('Send Success!', ToastAndroid.SHORT);
      }else{
        return ToastAndroid.show('Send Faild', ToastAndroid.SHORT);
      }
    }
    console.log(xhr);
  }

}
function _generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};

module.exports = LocationPage;