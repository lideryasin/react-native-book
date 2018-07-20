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
  ScrollView,
  Image,
  TouchableOpacity,
  CameraRoll,
  TextInput,
  PixelRatio,
  AppRegistry,
  ActivityIndicator,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import { Fumi } from 'react-native-textinput-effects';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import firebaseClient from '../components/firebaseClient';
import firebase from 'firebase';



export default class BookCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adSoyad: '',
      message: '',
      yazarAdi: '',
      yayinEvi: '',
      kitapKimde: '',
      image: '',
      avatarSource: null,
      loading: false,
    }
  }

  selectPhotoTapped(mime = 'image/jpeg') {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
      }
      else if (response.error) {
      }
      else if (response.customButton) {
      }
      else {
        let { uri } = response
        this.setState({ avatarSource: response, selectedImageUri: uri })
      }
    });
  }

  uploadData = () => {
    this.setState({ loading: true, })
    const image = this.state.selectedImageUri

    const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob


    let uploadBlob = null
    let imageName = new Date().getTime().toString()
    const imageRef = firebase.storage().ref().child(imageName)
    let mime = 'image/jpg'
    fs.readFile(image, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {

        const { adSoyad, message, yazarAdi, yayinEvi, kitapKimde } = this.state
        firebase.database().ref('messages').push({
          adSoyad,
          message,
          yazarAdi,
          yayinEvi,
          kitapKimde,
          image: url
        })
      })
      .catch((error) => {
      })

    this.setState({
      loading: false,
    })
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >

        <View style={[styles.card2, { backgroundColor: '#a9ceca' }]}>
          <Text style={styles.title}>Kitap Ekle</Text>
          <Fumi
            label={'Ad Soyad'}
            // yazı labelStyle={{ color: '#a3a3a3' }}
            // inputStyle={{ color: '#f95a25' }}
            iconClass={FontAwesomeIcon}
            iconName={'user'}
            iconColor={'#77116a'}
            iconSize={15}
            onChangeText={adSoyad => this.setState({ adSoyad })}
          />
          <Fumi
            style={styles.input}
            label={'Kitap Adı'}
            iconClass={FontAwesomeIcon}
            iconName={'book'}
            iconColor={'#77116a'}
            onChangeText={message => this.setState({ message })}
          />
          <Fumi
            style={styles.input}
            label={'Yazarın Adı'}
            //  yazı//labelStyle={{ color: '#a3a3a3' }}
            // inputStyle={{ color: '#f95a25' }}
            iconClass={Entypo}
            iconName={'man'}
            iconColor={'#77116a'}
            iconSize={15}
            onChangeText={yazarAdi => this.setState({ yazarAdi })}
          />
          <Fumi
            style={styles.input}
            label={'Yayın Evi'}
            // yazı//labelStyle={{ color: '#a3a3a3' }}
            //  inputStyle={{ color: '#f95a25' }}
            iconClass={FontAwesomeIcon}
            iconName={'home'}
            iconColor={'#77116a'}
            iconSize={15}
            onChangeText={yayinEvi => this.setState({ yayinEvi })}
          />
          <Fumi
            style={styles.input}
            label={'Kitap Kimde'}
            //   yazı//labelStyle={{ color: '#a3a3a3' }}
            //  inputStyle={{ color: '#f95a25' }}
            iconClass={FontAwesomeIcon}
            iconName={'users'}
            iconColor={'#77116a'}
            iconSize={15}
            onChangeText={kitapKimde => this.setState({ kitapKimde })}
          />
        </View>

        <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)} callback={this.getSelectedImages}>
            <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 20 }]}>
              {this.state.avatarSource === null ? <Text>Select a Photo</Text> :
                <Image style={styles.avatar} source={this.state.avatarSource} />
              }
            </View>
          </TouchableOpacity>
        </View>

        {this.state.loading ? <ActivityIndicator /> :
          <TouchableOpacity style={styles.buttonStyle} onPress={this.uploadData}>
            <Text style={styles.textStyle}> SAVE </Text>
          </TouchableOpacity>
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: 'white',
  },
  content: {
    // not cool but good enough to make all inputs visible when keyboard is active
    paddingBottom: 300,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
    marginTop: 4,
  },
  title: {
    paddingBottom: 16,
    textAlign: 'center',
    color: '#404d5b',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    borderRadius: 75,
    width: 200,
    height: 200
  },
});
