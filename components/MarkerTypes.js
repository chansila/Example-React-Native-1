var React = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  ToolbarAndroid,
  Dimensions,
  TouchableOpacity,
  Image,
} = React;

var MapView = require('react-native-maps');
var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./style');

var MarkerTypes = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };
  },
  render() {
    return (
      // <MapView
      //     ref="map"
      //     style={styles.map}
      //     cacheEnabled={true}
      //     showsUserLocation={true}
      //     initialRegion={{
      //       latitude: LATITUDE,
      //       longitude: LONGITUDE,
      //       latitudeDelta: LATITUDE_DELTA,
      //       longitudeDelta: LONGITUDE_DELTA,
      //     }}
      //   >
      //     <MapView.Marker
      //       coordinate={this.state.a}
      //       onSelect={(e) => console.log('onSelect', e.nativeEvent.coordinate)}
      //       onDrag={(e) => console.log('onDrag', e.nativeEvent.coordinate)}
      //       onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinate)}
      //       onDragEnd={(e) => this.setState ({ 
      //           latitude: e.nativeEvent.coordinate.latitude,
      //           longitude: e.nativeEvent.coordinate.longitude
      //         }) 
      //       }
      //       onPress={(e) => console.log('onPress', e.nativeEvent.coordinate)}
      //       draggable
      //     />
      //   </MapView>
      <View>

      </View>
    );
  },
});

module.exports = MarkerTypes;