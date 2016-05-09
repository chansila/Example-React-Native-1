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
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    height: 300
  },
  imageContainer: {
    backgroundColor: 'transparent',
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    margin: 5,
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