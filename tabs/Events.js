/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, TouchableHighlight, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Text, Title, Button, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import firebaseDbh from '../App';
 import firebaseListNews from '../App';
 import * as firebase from 'firebase';

 export default class Events extends Component {

   constructor(props) {
     super(props);
     this.state = {
       isLoading: true
     }
   }

   componentDidMount() {
    return fetch('https://jonssonconnect.firebaseio.com/.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.Events),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

   static navigationOptions = {
     tabBarLabel: 'Events',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/eventsicon.png')}
        style={{width: 22, height: 22}}>
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
        <Image source={require('../images/jceventsbanner.png')} style={{ height: 180, width: null }}></Image>
        <Content style={{ backgroundColor: '#f8f6f6'}}>
          <Text style={styles.colorHeader}>Upcoming<Text style={styles.bigHeader}> Events</Text> </Text>
          <Text style={{fontWeight: '800', color: '#0039A6', paddingLeft: 15}}>________</Text>
        </Content>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             const {uri} = rowData;
             return (
               <TouchableHighlight onPress={() => this.props.navigation.navigate("EventDetails", {rowData})}>
                <Image source={{uri: rowData.eventImageURL}} style={{height: 150, width: null, flex: 1}}/>
               </TouchableHighlight>
             )
           }}
         />
         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
  bigHeader: {
     fontSize: 18,
     fontWeight: '800',
     paddingTop: 10,
     paddingLeft: 15,
  },
  colorHeader: {
     fontSize: 18,
     fontWeight: '800',
     paddingTop: 10,
     paddingLeft: 15,
     color: '#0039A6',
  },
  containerStyle: {
     backgroundColor: '#F6F6F6',
  },
  hostStyle: {
    fontWeight: '800',
    fontSize: 14,
   },
   nameStyle: {
     fontWeight: '600',
     fontSize: 14,
    },
  eventNameStyle: {
    fontSize: 12,
  },
  eventDescriptionStyle: {
    fontSize: 10,
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
    backgroundColor: '#0039A6',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
});
