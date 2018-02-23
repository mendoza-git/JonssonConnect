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
       <Container>
       <Header searchBar rounded style={styles.searchbarColor}>
       <Thumbnail style={{width: 30, height: 30, margin: 10}} small source={{uri: 'https://joashpereira.com/templates/material_one_pager/img/avatar1.png'}} />
          <Item><Input placeholder="Search" /></Item>
          <Button transparent>
            <Text style={styles.searchButton}>Search</Text>
          </Button>
        </Header>
        <Content>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             const {uri} = rowData;
             return (
               <Card>
                <CardItem>
                  <Left>
                    <Thumbnail source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmfBRR5T0D2xN1IBPDFLC-c36Q04Rq-gc4sO-n7R5nsujLyASp7Q'}} />
                    <Body>
                    <Text style={styles.hostStyle}>
                      {rowData.hostedBy} :
                    </Text>
                    <Text style={styles.nameStyle}>
                      {rowData.eventName}
                    </Text>
                    <Text style={styles.eventNameStyle}>
                      {rowData.eventDate} | {rowData.eventLocation}
                    </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{uri: rowData.eventImageURL}} style={{height: 100, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Left>
                    <Button transparent info>
                    <Text style={styles.buttonStyle}>
                      Attending
                    </Text>
                    </Button>
                  </Left>
                  <Body>
                    <Button transparent primary>
                    <Text style={styles.buttonStyle}>
                      Interested
                    </Text>
                    </Button>
                  </Body>
                  <Right>
                  <Button transparent success>
                  <Text style={styles.buttonStyle}>
                    Details
                  </Text>
                  </Button>
                  </Right>
                </CardItem>
              </Card>
             )
           }}
         />
         </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
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
  searchbarColor: {
    backgroundColor: '#104E8B',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
});
