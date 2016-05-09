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

// var NavigationBarRouteMapper = {
//   LeftButton(route, navigator, index, navState) {
//     if(index > 0 && route.name != "LocationPage") {
//       return (
//         <TouchableHighlight
//           underlayColor="transparent"
//           onPress={() => { if (index > 0) { navigator.pop() } }}>
//           <Icon style={ styles.leftNavButtonText } name="android-arrow-back" size={30} color="#008CBA" />
//         </TouchableHighlight>)
//     }
//     else { return null }
//   },

//   RightButton(route, navigator, index, navState) {
//     return null
//   },

//   Title(route, navigator, index, navState) {
//     return <Text style={ styles.title }>Location Code</Text>
//   }
// };

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  },
  // title: {
  //   marginTop:10,
  //   marginLeft: 45,
  //   fontSize:20,
  //   fontWeight: 'bold',
  //   color: 'grey',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // leftNavButtonText: {
  //   marginLeft:13,
  //   marginTop: 15
  // },
  // rightNavButtonText: {
  //   fontSize: 18,
  //   marginRight:13,
  //   marginTop:2
  // },
  // nav: {
  //   height: 60,
  //   backgroundColor: '#1c204C',
  // }
});

AppRegistry.registerComponent('location_code', () => location_code);
