import React from 'react-native';
var Swiper = require('react-native-swiper');
var Button = require('react-native-button');
var styles = require('./style');
var Icon = require('react-native-vector-icons/Ionicons');
var MapView = require('react-native-maps');

const {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Dimensions,
  TextInput,
  Platform,
  ToolbarAndroid,
  Picker,
  ScrollView,
  ToastAndroid,
  AsyncStorage,
  DrawerLayoutAndroid,
  Modal,
  NativeModules: {
    ImagePickerManager
  }
} = React;

var { width, height } = Dimensions.get('window');

const ACCESS_TOKEN = '';
const ASPECT_RATIO = width / height;
const LATITUDE = 11.5735966;
const LONGITUDE = 104.9211546;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

export default class LocationPage extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      userProfiles: this.props.userProfiles,
      userToken: this.props.userToken,
      imageSource: [],
      latitude: '',
      longitude: '',
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      },
      categories: [],
      animated: true,
      modalVisible: false,
      transparent: false
    };
    ToastAndroid.show('You have Login success!', ToastAndroid.LONG);
  }

  componentDidMount() {
    this._loadCategory().done();
  }

  async _loadCategory(){
    let userDataResponse = this.state.userToken;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://locationcode.rotati.com/api/v1/categories');
    xhr.setRequestHeader('content-type', 'multipart/form-data');
    xhr.setRequestHeader('access-token', userDataResponse['access-token']);
    xhr.setRequestHeader('client', userDataResponse['client']);
    xhr.setRequestHeader('expiry', userDataResponse['expiry']);
    xhr.setRequestHeader('token-type', userDataResponse['token-type']);
    xhr.setRequestHeader('uid', userDataResponse['uid']);
    xhr.send(null);
    xhr.onload = function () {
      if (xhr.status === 200){
        return this.setState ({ 
          userToken: xhr.responseHeaders,
          categories: JSON.parse(xhr.responseText).data
        });
      }else{
        return ToastAndroid.show('Send Faild', ToastAndroid.SHORT);
      }
    }.bind(this);
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
        userProfiles: JSON.parse(this.state.userProfiles)
      }
    });
  }
  async _onPressLogout(){  
    try { 
      await AsyncStorage.removeItem(ACCESS_TOKEN);
      return this.props.navigator.push({ 
        name: 'Login'
      });
    }catch (error) { 
      return console.log(error);
    }
  }
  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {padding: 20}
      : null;
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 220, backgroundColor: '#d2691e',justifyContent: 'center',alignItems: 'center'}} >
          <Image style={styles.profile_picture} source={require('../assets/profile_pic.jpg')} />
          <Text style={{fontWeight: 'bold', padding: 2, color: '#fff'}}>Chan Sila</Text>
          <Text style={{color: '#fff'}}>chansila8@gmail.com</Text>
        </View>
        <View style={{flexDirection:'row',marginBottom: 5, marginTop: 12}}>
          <Icon name="android-person" style={{ marginLeft: 15, fontSize: 25}}/>
          <TouchableHighlight onPress={this._onPressProfile.bind(this)} underlayColor='#fff'>
            <Text style={{fontFamily: 'Serif',paddingTop: 18, fontSize: 16, flex: 1, marginLeft: 40}}>Profile</Text>
          </TouchableHighlight>
        </View>
        <View style={{flexDirection:'row',borderBottomWidth: 1, borderBottomColor: '#dcdcdc'}}>
          <Icon name="log-out" style={{marginLeft: 15, fontSize: 25, color: 'red'}}/>
          <TouchableHighlight onPress={this._onPressLogout.bind(this)} underlayColor='#fff'>
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
        <View style={styles.form_container}>
          <Text style={styles.text_title}>Business Name :</Text>
          <TextInput
            style={styles.textinput}
            returnKeyType = {"next"}
            onSubmitEditing={(event) => { this.refs.stated.focus(); }}
            placeholder='Enter you Business Name'
            placeholderTextColor='grey'
            onChangeText={(name) => this.setState({name})}
            value={this.state.name} />

          <Text style={styles.text_title}>State :</Text>
          <TextInput
            ref='stated'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.city.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(stated) => this.setState({stated})}
            value={this.state.stated} />

          <Text style={styles.text_title}>City :</Text>
          <TextInput
            ref='city'
            style={styles.textinput}
            onSubmitEditing={(event) => { this.refs.district.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(city) => this.setState({city})}
            value={this.state.city} />

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
            onSubmitEditing={(event) => { this.refs.home.focus(); }}
            placeholderTextColor='grey'
            onChangeText={(commune) => this.setState({commune})}
            value={this.state.commune} />

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
            placeholderTextColor='grey'
            onChangeText={(description) => this.setState({description})}
            value={this.state.description} />
          <Picker
            selectedValue={this.state.category}
            onValueChange={(cate) => this.setState({category: cate})}>
            {  
              this.state.categories.map(function(category,key){  
                return (
                  <Picker.Item key={key++} label={category.cat_name} value={category.id} />      
                )
              })
            }
          </Picker>
        </View>
        <View style={{flex: 1, height: 450, margin: 5}}>
          <MapView
          ref="map"
          style={styles.map}
          cacheEnabled={true}
          showsUserLocation={true}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <MapView.Marker
            coordinate={this.state.a}
            onSelect={(e) => console.log('onSelect', e.nativeEvent.coordinate)}
            onDrag={(e) => console.log('onDrag', e.nativeEvent.coordinate)}
            onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinate)}
            onDragEnd={(e) => this.setState ({ 
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude
              }) 
            }
            onPress={(e) => console.log('onPress', e.nativeEvent.coordinate)}
            draggable
          />
        </MapView>
      </View>
            <Button 
            onPress={this.selectPhotoTapped.bind(this)}
            containerStyle={styles.container_button}
            style={{fontSize: 15, color: '#fff'}}
            >
            Select Photo
          </Button>
        <Swiper loop={false} height={300}>
          { this.state.imageSource.length <= 0 ? <Text></Text> :
              this.state.imageSource.map(function(imageselected,key){
                return(
                  <View key={key++} style={[styles.imageContainer, {marginBottom: 20,marginLeft: 10, marginRight: 10}]}>
                    <Image style={styles.image} source={imageselected} />
                  </View>
                )
              })
          }
        </Swiper>
        <View>
          <Button 
            onPress={this.gotoResultPage.bind(this)}
            containerStyle={styles.container_button}
            style={{fontSize: 15, color: '#fff'}}
          >
            Save Information
          </Button>
        </View>
        </ScrollView>
      </View>
      </DrawerLayoutAndroid>
    );
  }

  gotoResultPage(){
    let navigator = this.props.navigator;
    let token = this.state.userToken['access-token'];
    let uid = this.state.userToken['uid'];
    let tokenType = this.state.userToken['token-type'];
    let userExpiry = this.state.userToken['expiry'];
    let client = this.state.userToken['client'];
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
    formdata.append("location[latitude]", this.state.latitude);
    formdata.append("location[longitude]", this.state.longitude);
    formdata.append("location[location_categories_attributes[][category_id]]", this.state.category);
    this.state.imageSource.map(function(imageselected,key){
      formdata.append("location[location_photos_attributes["+key+"][photo]]", {uri: imageselected.uri, name: _generateUUID()+'.jpg', type: 'multipart/form-data'});
    });
    xhr.onreadystatechange = function () {
      if (xhr.readyState===4) {
        this.setState ({ 
          modalVisible: true,
          transparent: true,
          animated: true
        });
        console.log('On ready :',this.state.modalVisible);
      }
    }.bind(this);
    xhr.send(formdata);
    xhr.onload = function () {
      if (xhr.status === 201){
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: false
        });
        console.log('On success :', this.state.modalVisible);
      }else {
        this.setState ({ 
          modalVisible: false,
          transparent: false,
          animated: false
        });
        console.log('On Failed :', this.state.modalVisible);
      }
    }.bind(this);
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