import React from 'react-native';
import LocationPage from './components/LocationPage';
import Login from './components/Login';
import Profile from './components/Profile';

var {
  Navigator,
  StyleSheet,
  AppRegistry,
} = React;
var Icon = require('react-native-vector-icons/Ionicons');

class location_code extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <Navigator style={styles.navigator}
        initialRoute={{name: "Login"}}
        renderScene= {this.renderScene}
        configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FadeAndroid;
        }} />

    );
  }

   renderScene(route, navigator) {
    if (route.name === "Login") {
      return <Login navigator={navigator} {...route.passProps} />
    }
    if (route.name === "LocationPage") {
      return <LocationPage navigator={navigator} {...route.passProps} />
    }
    if (route.name === "Profile") {
      return <Profile navigator={navigator} {...route.passProps} />
    }
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
});

AppRegistry.registerComponent('location_code', () => location_code);
