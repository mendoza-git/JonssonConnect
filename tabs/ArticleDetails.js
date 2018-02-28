/**
 * JonssonConnect Article Details Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Text, Title, Button, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import firebaseDbh from '../App';
 import firebaseListNews from '../App';
 import * as firebase from 'firebase';

 export default class ArticleDetails extends Component {

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
          dataSource: ds.cloneWithRows(responseJson.Articles),
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
        source={require('../images/homeicon.png')}
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
                      {this.props.navigation.state.params.rowData.postedBy}
                    </Text>
                    <Text style={styles.nameStyle}>
                      {this.props.navigation.state.params.rowData.articleName}
                    </Text>
                    </Body>
                  </Left>
                </CardItem>
                <CardItem cardBody>
                  <Image source={{uri: rowData.articleImageURL}} style={{height: 100, width: null, flex: 1}}/>
                </CardItem>
                <CardItem>
                  <Body>
                  <Text style={{fontSize: 14, fontWeight: '800'}}>Details</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={styles.descriptionStyle}>{this.props.navigation.state.params.rowData.positionOverview}</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}>Qualifications</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={styles.descriptionStyle}>{this.props.navigation.state.params.rowData.positionQualifications}</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}>Desired Majors</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={styles.descriptionStyle}>{this.props.navigation.state.params.rowData.desiredMajors}</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}>Job-Type</Text>
                  <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                  <Text style={styles.descriptionStyle}>{this.props.navigation.state.params.rowData.jobType}</Text>
                  </Body>
                </CardItem>
              </Card>
             )
           }}
         />
         <Image source={require('../images/eventsBanner.jpg')} style={{ height: 180, width: null }}></Image>

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
    applicationStyle: {
       fontWeight: '600',
       fontSize: 12,
       color: '#104E8B',
    },
   nameStyle: {
      fontWeight: '600',
      fontSize: 16,
   },
   descriptionStyle: {
      fontWeight: '400',
      fontSize: 12,
   },
   hostStyle: {
     fontSize: 12,
     color: '#808080',
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
