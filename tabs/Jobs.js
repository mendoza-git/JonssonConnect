/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, View } from 'react-native';
 import { TabNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Text, Title, Button, Left, Body, Right, H1, H2, H3 } from 'native-base';
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
          dataSource: ds.cloneWithRows(responseJson.Jobs),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

   static navigationOptions = {
     tabBarLabel: 'Jobs',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/briefcaseicon.png')}
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
       <Header searchBar style={styles.searchbarColor}>
       <Thumbnail style={{width: 20, height: 20, margin: 10}} small source={{uri: 'https://joashpereira.com/templates/material_one_pager/img/avatar1.png'}} />
          <Item><Input placeholder="Search" /></Item>
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
                    <Thumbnail square source={{uri: rowData.companyImageURL}} />
                    <Body>
                    <Text style={styles.positionTitleStyle}>
                      {rowData.positionTitle}
                    </Text>
                    <Text style={styles.comapanyNameStyle}>
                      {rowData.companyName}
                    </Text>
                    <Text style={styles.jobLocationStyle}>
                      {rowData.jobLocation}
                    </Text>
                    </Body>
                  </Left>
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
  comapanyNameStyle: {
    fontWeight: '500',
    fontSize: 12,
    paddingTop: 3,
  },
  positionTitleStyle: {
     fontWeight: '800',
     fontSize: 14,
  },
  jobLocationStyle: {
     fontSize: 12,
     color: '#808080',
     paddingTop: 3,
  },
  buttonStyle: {
    fontSize: 12,
  },
  searchbarColor: {
    backgroundColor: '#008542',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
});
