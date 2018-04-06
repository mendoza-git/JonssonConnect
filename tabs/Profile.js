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
       summary: await AsyncStorage.getItem('summary'),
       userPhoto: await AsyncStorage.getItem('userPhoto'),
       token: await AsyncStorage.getItem('token'),
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
          <Card style={styles.cardStyle}>
          <Thumbnail large style={{ paddingTop: 30 }} source={{uri: this.state.userPhoto.toString() }} />
           <Text style={{ paddingTop: 30, fontWeight:'100' }}>{ this.state.firstName.toString() } { this.state.lastName.toString() }</Text>
           <Text style={{ paddingTop: 20, fontSize: 12, paddingLeft: 15, paddingRight: 15, fontWeight:'100' }}>{ this.state.summary.toString() }</Text>
           <Text style={{ paddingTop: 20, fontSize: 12, paddingLeft: 15, paddingRight: 15, fontWeight:'100' }}> LOGIN STATUS: { this.state.token }</Text>
          </Card>
         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#F6F6F6',
  },
  cardStyle: {
    paddingTop: 30,
    alignItems: 'center',
  }
});
