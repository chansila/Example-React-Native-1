import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  ToolbarAndroid,
  Text,
  View,
} from 'react-native';
import styles from './style';
var Icon = require('react-native-vector-icons/Ionicons');

var REQUEST_URL = 'http://locationcode.rotati.com/api/v1/';

class ListLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      userToken: this.props.userToken,
      userProfiles: this.props.userProfiles
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    var userId = this.state.userProfiles.data['id'];
    var token = this.state.userToken['access-token'];
    var tokenType = this.state.userToken['token-type'];
    var uid = this.state.userToken['uid'];
    var client = this.state.userToken['client'];
    var expiry = this.state.userToken['expiry'];
    fetch(REQUEST_URL+'locations?access-token='+token+'&uid='+uid+'&expiry='+expiry+'&client='+client+'&token-type='+tokenType)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <Icon.ToolbarAndroid
           title="Location Code"
           navIconName="android-arrow-back"
           titleColor="white"
           onIconClicked={this.backButton.bind(this)}
           style={styles.toolbar} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderMovie}
          style={styles.listView}
        />
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={{flex: 1,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
        <Image source={require('../assets/loading.gif')} />
      </View>
    );
  }

  backButton(){
    return this.props.navigator.pop();
  }

  renderMovie(location) {
    return (
      <View style={{borderBottomWidth: 0.5,borderBottomColor: 'grey',flex: 1,flexDirection: 'row',backgroundColor: '#F5FCFF',}}>
        <Image
            source={{uri: "http://locationcode.rotati.com/"+location.location_photos[0].photo['url']}}
            style={styles.thumbnail}
          />
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{location.name}</Text>
          <Text style={styles.year}>{location.street}</Text>
        </View>
      </View>
    );
  }
}

module.exports = ListLocation;