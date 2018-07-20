/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BookList from './bookList';
import Details from './details';
//import BookList2 from './bookList2';



export default class BookYon extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
      </View>
    );
  }
}

const AppNavigation = StackNavigator({
  booklist: { screen: BookList },
  details: { screen: Details },
});
