

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppRegistry
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Tabbar from 'react-native-tabbar-bottom';
import BookCreate from './src/container/bookCreate';
import BookYon from './src/container/bookYon';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      page: "bookyon",
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.page === "bookyon" && <View style={styles.wrapper} ><BookYon /></View>}
        {this.state.page === "bookcreate" && <View style={styles.wrapper} ><BookCreate /></View>}

        <Tabbar
          stateFunc={(tab) => {
            this.setState({ page: tab.page })
          }}
          activePage={this.state.page}
          tabs={[
            {
              page: "bookyon",
              title: "Book Yon",
              icon: "book",
            },
            {
              page: "bookcreate",
              title: "Book Create",
              icon : "bookmark"
            }
          ]}

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  }
});
