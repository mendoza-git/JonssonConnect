/**
 * JonssonConnect Jobs Dertails Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, View } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, Col, CardItem, Grid, Thumbnail, List, ListItem, Icon, Item, Input, Text, Title, Button, Left, Body, Right, Row, H1, H2, H3 } from 'native-base';
 import firebaseDbh from '../App';
 import firebaseListNews from '../App';
 import * as firebase from 'firebase';

 export default class JobsDetails extends Component {

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
        <Content>
        <Image source={{uri: 'https://www.matrixc.com/wp-content/uploads/2017/10/ea-promotion-banner.jpg'}} style={{ height: 100, width: null }}>
        </Image>
        <Card style={{flex: 0}}>
            <CardItem>
              <Body>
                <Text style={styles.nameStyle}>{this.props.navigation.state.params.rowData.companyName}</Text>
                <Text style={styles.hostStyle}>{this.props.navigation.state.params.rowData.positionTitle}</Text>
                <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                <Text style={{fontSize: 14, fontWeight: '800'}}>Apply today at</Text>
                <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                <Text style={styles.applicationStyle}>{this.props.navigation.state.params.rowData.applicationURL}</Text>
              </Body>
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
        </Content>
       </Container>
     )
   }
 }

 const styles = StyleSheet.create({
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
