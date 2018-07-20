/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { auth } from 'firebase';


export default class Details extends Component {

  static navigationOptions = {
    title: "Details",
    headerStyle: {
      backgroundColor: '#336699',
      textAlign: 'center'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { item } = this.props.navigation.state.params
    return (
      <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.text}>Ad Soyad : {item.adSoyad}</Text>
      <Text style={styles.text}>Kitap Adı : {item.message}</Text>
      <Text style={styles.text}>Kitap Kimde : {item.kitapKimde}</Text>
      <Text style={styles.text}>Yayin Evi : {item.yayinEvi}</Text>
      <Text style={styles.text}>Yazarın Adı : {item.yazarAdi}</Text>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto'

  },
  text: {
    textAlign: 'center',
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 20
  },
  image: {
   marginTop:5,
    width: 200,
    height: 200,
    marginLeft: 'auto',
    marginRight: 'auto'

  },
});
