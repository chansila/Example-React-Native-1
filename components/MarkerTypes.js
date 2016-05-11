var React = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Modal,
  ToolbarAndroid,
  Dimensions,
  TouchableOpacity,
  Image,
} = React;
var { width, height } = Dimensions.get('window');
var MapView = require('react-native-maps');
var Icon = require('react-native-vector-icons/Ionicons');
var styles = require('./style');

const ACCESS_TOKEN = '';
const ASPECT_RATIO = width / height;
const LATITUDE = 11.5735966;
const LONGITUDE = 104.9211546;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

var MarkerTypes = React.createClass({
  getInitialState() {
    return {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        animated: false,
        modalVisible: false,
        transparent: true
      },
      a: {
        latitude: LATITUDE + SPACE,
        longitude: LONGITUDE + SPACE,
      }
    };
  },
  render() {
    console.log('transparent', this.state.transparent);
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? '#f5fcff' : '#f5fcff',
    };
    return (
      <View style={{flex: 1}}>
      <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
        <MapView
            ref="map"
            style={[styles.map,modalBackgroundStyle]}
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
          <TouchableOpacity style={{borderRadius: 5,marginLeft: 80,alignItems: 'center',height: 40,marginTop: 10,backgroundColor: 'rgba(255,255,255,0.7)',width: 200,paddingHorizontal: 12,alignItems: 'center',marginHorizontal: 10,}} onPress={this._onPress} underlayColor='#fff'>
            <Text style={{fontSize: 16, marginTop: 10}}>Select this Location</Text>
          </TouchableOpacity>
        </Modal>
      <TouchableOpacity onPress={this._onPressMap} underlayColor='#fff'>
        <Text style={{color: '#000',flex: 1}}>SELECT MAP</Text>
      </TouchableOpacity>
      <Text>{this.state.latitude}</Text>
      <Text>{this.state.longitude}</Text>
      </View>
    );
  },
  _onPress(){
    this.setState({ 
      animated: false,
      modalVisible: false,
      transparent: true
    })
  },
  _onPressMap(){
    this.setState({ 
      animated: true,
      modalVisible: true,
      transparent: true
    })
  },
});

module.exports = MarkerTypes;