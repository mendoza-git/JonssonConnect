/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, AsyncStorage, Image, ListView, FlatList, StyleSheet, TouchableHighlight, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tabs, Tab, Text, Title, Button, Left, Body, Right, H1, H2, H3} from 'native-base';
 import * as firebase from 'firebase';

 import firebaseApp from './EventDetails';
 import config from './EventDetails';

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
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async filterEvents() {

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
        </Content>
        {/*
        <Tabs onchangeTab={this.filterEvents} style={{}} tabBarUnderlineStyle={{ backgroundColor: '#C75B12'}} tabBarPosition="bottom" >
          <Tab
            tabstyle={{ }}
            textStyle={{fontSize: 13, fontWeight: '100'}}
            activeTextStyle={{fontSize: 13, fontWeight: '100', color: '#C75B12'}}
            heading='All Events'
          >

          </Tab>
          <Tab
            tabstyle={{ }}
            textStyle={{fontSize: 13, fontWeight: '100'}}
            activeTextStyle={{fontSize: 13, fontWeight: '100', color: '#C75B12'}}
            heading='Most Popular'
          >

          </Tab>
          <Tab
            tabstyle={{ }}
            textStyle={{fontSize: 13, fontWeight: '100'}}
            activeTextStyle={{fontSize: 13, fontWeight: '100', color: '#C75B12'}}
            heading='Newest'
          >

          </Tab>
         </Tabs>
         */}
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             const {uri} = rowData;
             return (
               <Content>
                <List style={{ backgroundColor: '#FFFFFF'}}>
                  <ListItem>
                    <Body>
                      <Text style={{fontWeight: '800', fontSize: 16}}>{rowData.eventTitle}</Text>
                      <Text style={{fontWeight: '200', fontSize: 12, paddingTop: 5}}>{rowData.eventDate}</Text>
                      <Text style={{fontWeight: '100', fontSize: 12, color: '#757575', paddingTop: 5}}>{rowData.eventLocation}</Text>
                      <Text style={{fontWeight: '800', fontSize: 22}}></Text>
                      <TouchableHighlight
                        onPress={
                        () => this.props.navigation.navigate("EventDetails", {rowData})}
                        >
                        <Image
                          style={{ height: 220, width: null, borderRadius: 10}}
                          source={{ uri: rowData.eventImageURL}}
                        />
                      </TouchableHighlight>
                    </Body>
                  </ListItem>
                </List>
               </Content>

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
