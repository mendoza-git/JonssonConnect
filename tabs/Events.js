/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, View } from 'react-native';
 import { TabNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Item, Input, Text, Title, Button, Icon, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import firebaseDbh from '../App';
 import firebaseListNews from '../App';
 import * as firebase from 'firebase';

 export default class Jobs extends Component {

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
          dataSource: ds.cloneWithRows(responseJson.news),
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

       <View style={{flex: 1, paddingTop: 0}}>
       <Header searchBar rounded>
          <Item><Input placeholder="Search" /></Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             return (
               <Card>
                 <CardItem>
                   <Left>
                     <Thumbnail source={{uri: '{rowData.articleImage}'}} />
                     <Body>
                     <Text style={styles.title} numberOfLines={1}>
                       {rowData.articleName}
                     </Text>
                     </Body>
                   </Left>
                   <Right>
                     <Button bordered>
                       <Text>View</Text>
                     </Button>
                   </Right>
                 </CardItem>
               </Card>
             )
           }}
         />
       </View>
     )
   }
 }

 const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
