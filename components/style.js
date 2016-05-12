'use strict';

var React = require('react-native');

var {
  StyleSheet,
  PixelRatio
} = React;

module.exports = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  text_title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  textinput: {
    height: 40, 
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  user_profile: {
    marginTop: 10, 
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'notoserif', 
    fontWeight: 'bold'
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 63,
    height: 81,
    margin: 5,    
  },
  listView: {
    paddingTop: 5,
    marginBottom: 5,
    backgroundColor: '#F5FCFF',
  },
  wraper: {
    flex: 1,
    marginTop: 60,
    backgroundColor: '#fff'
  },
  messageBox: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
  },
  badge: {
    alignSelf: 'center',
    height: 120,
    width: 101,
  },
  form_container:{
    flexDirection: 'column',
    margin: 10
  },
  form_container_child: {
    flexDirection: 'row'
  },
  button_wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  container_button: {
    flex:1,
    margin: 10,
    padding:5, 
    paddingTop: 10,
    height:45, 
    borderRadius:4, 
    backgroundColor: '#5f9ea0'
  },
  container_button_save: {
    flex:1,
    margin: 5,
    padding:5, 
    paddingTop: 10,
    height:45, 
    borderRadius:4, 
    backgroundColor: '#6495ed'
  },
  innerContainer: {
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    height: 80,
    width: 80,
    borderWidth: 1
  },
  imageContainer: {
    backgroundColor: 'transparent',
    borderColor: '#9B9B9B',
    margin: 5,
    flex: 1,
    flexDirection:'column',
  },
  containerImage: {
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  toolbar: {
    backgroundColor: '#d2691e',
    height: 60,
  },
  profile_picture: {
    height: 160,
    borderRadius: 80,
    width: 160
  }
});