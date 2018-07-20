/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
  Alert
} from 'react-native';
import SearchBar from 'react-native-material-design-searchbar';
import firebaseClient from '../components/firebaseClient';


const searchingFor = (term) => {
  String.prototype.turkishToLower = function () {
    var string = this;
    var items = { "İ": "i", "I": "ı", "Ş": "ş", "Ğ": "ğ", "Ü": "ü", "Ö": "ö", "Ç": "ç" };
    string = string.replace(/(([İIŞĞÜÇÖ]))/g, (item) => items[item])
    return string.toLowerCase();
  }
  return (x) => {
    return x.message.turkishToLower().includes(term.turkishToLower()) || !term;
  }
}

export default class BookList extends Component {

  static navigationOptions = {
    title: "Kitap Listele",
    headerStyle: {
      backgroundColor: '#336699',
      textAlign: 'center'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      list: [],
      searchTerm: '',
      activeRowKey: null
    }

    this.itemsRef = this.getRef().child('messages');
  }

  setItemsFromFirebase(itemsRef) {
    itemsRef.on('value', (snap) => {

      var items = [];
      snap.forEach((child) => {
        items.push({
          adSoyad: child.val().adSoyad,
          message: child.val().message,
          kitapKimde: child.val().kitapKimde,
          image: child.val().image,
          yayinEvi: child.val().yayinEvi,
          yazarAdi: child.val().yazarAdi,
          _key: child.key
        });
      });

      // burada sırala
      // items = items.reverse().sort((a, b) => Intl.Collator("tr").compare(b.title, a.title));

      this.setState({
        loading: false,
        list: items.reverse()
      });
    });
  }
  componentDidMount() {
    this.setItemsFromFirebase(this.itemsRef);
  }
  getRef() {
    return firebaseClient.database().ref();
  }

  detailsPress = (item) => {
    this.props.navigation.navigate('details', { item });
  }

  componentWillUnmount() {
    firebaseClient.database().ref('messages').off('value');
  }

  renderItem = ({ item }) => {
    return (
      <TouchableHighlight delayLongPress={900} key={item._key} onPress={() => this.detailsPress(item)}>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flexDirection: 'row', flex: 1, backgroundColor: this.props.index % 2 == 0 ? 'mediumseagreen' : 'tomato' }}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 100, height: 100, margin: 5 }}
            ></Image>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.flatListItem} key={item._key}>{item.message}</Text>
            </View>
          </View>
          <View style={{ height: 5, backgroundColor: 'white' }}>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const filteredList = this.state.list.filter(searchingFor(this.state.searchTerm))
    return (
      <View>
        <SearchBar
          onSearchChange={(searchTerm => this.setState({ searchTerm }))}
          height={50}
          placeholder={'Search...'}
          autoCorrect={false}
          padding={5}
          returnKeyType={'search'}
        />

        {this.state.loading ? <ActivityIndicator /> : <FlatList data={filteredList} renderItem={this.renderItem} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flatListItem: {
    color: 'white',
    padding: 5,
    fontSize: 16
  },
});
