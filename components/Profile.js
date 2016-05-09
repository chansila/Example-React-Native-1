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
      userProfiles: JSON.parse(this.props.userProfiles)
    };
  }

  backButton(){
    return this.props.navigator.pop();
  }
  render(){
    var _scrollView: ScrollView;
    console.log(this.props.userProfiles);
    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           title="Location Code"
           navIconName="android-arrow-back"
           titleColor="white"
           onIconClicked={this.backButton.bind(this)}
           style={styles.toolbar}
         />
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          > 
          <View style={styles.form_container}>
            <Text style={styles.text_title}>{this.state.userProfiles.data['id']}</Text>
            <Text style={styles.text_title}>{this.state.userProfiles.data['username']}</Text>
            <Text style={styles.text_title}>{this.state.userProfiles.data['email']}</Text>
            
          </View>

          <View>
            <Button 
              onPress={this.gotoResultPage}
              containerStyle={styles.container_button}
              style={{fontSize: 15, color: '#fff'}}
            >
              Save Information
            </Button>
          </View>
        </ScrollView>
      </View>
    )
  }
}

module.exports = Profile;