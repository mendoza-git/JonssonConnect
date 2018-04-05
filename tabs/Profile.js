/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, AsyncStorage, Image, ListView, FlatList, StyleSheet, TextInput, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3, } from 'native-base';
 import * as firebase from 'firebase';

 export default class Profile extends Component {
  constructor(props) {
     super(props);
     this.state = {
       isLoading: true
     }
   }

   async componentDidMount() {
     this.setState({
       firstName: await AsyncStorage.getItem('firstName'),
       lastName: await AsyncStorage.getItem('lastName'),
       email: await AsyncStorage.getItem('email'),
       isLoading: false
     });
   }

   static navigationOptions = {
     tabBarLabel: 'Profile',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/temocicon.png')}
        style={{width: 32, height: 32}}>
       </Image>
     )
   }

   render() {
     if (this.state.isLoading) {
       return (
         <View style={{flex: 1, paddingTop: 20}}>
           <ActivityIndicator />
         </View>
       );
     }
     return (
       <Container style={styles.containerStyle}>
        <Content>
           <Text style={styles.colorHeader}>{ this.state.firstName.toString() }</Text>
           <Text style={styles.colorHeader}>{ this.state.lastName.toString() }</Text>
           <Text style={styles.colorHeader}>{ this.state.email.toString() }</Text>
         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#F6F6F6',
  },
  hostStyle: {
    fontWeight: '800',
    fontSize: 14,
  },

  cardStyle: {
    paddingLeft: 10,
  },
  nameStyle: {
   fontWeight: '600',
   fontSize: 14,
  },
  eventNameStyle: {
    fontSize: 12,
  },
  bigHeader: {
    fontSize: 28,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  colorHeader: {
    fontSize: 28,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    color: '#C75B12',
  },
  jonssonHeader: {
    fontSize: 24,
    fontWeight: '800',
    paddingBottom: 20,
    paddingLeft: 10,
  },
  eventDescriptionStyle: {
    fontSize: 10,
  },
  typeStyle: {
    fontSize: 10,
    fontWeight: '100',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: '#0085c2',
  },
  summaryStyle: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
  },
  buttonStyle: {
    fontSize: 12,
  },
  search: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  searchbarColor: {
    backgroundColor: '#00A1DE',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
  textInput: {
    height: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
