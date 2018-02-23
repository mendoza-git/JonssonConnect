/**
 * JonssonConnect Jobs Feed
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { Image, ListView, Text, StyleSheet } from 'react-native';
 import { TabNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, Input, Item, Title, Button, Icon, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import firebaseDbh from '../App';
 import * as firebase from 'firebase';

 export default class Jobs extends Component {
   static navigationOptions = {
     tabBarLabel: 'Jobs',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/briefcaseicon.png')}s
        style={{width: 22, height: 22}}>
       </Image>
     )
   }


   render() {
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
           <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'https://cms.algoafm.co.za/img/or_201751575558.png'}} />
                <Body>
                  <Text>Software Developer</Text>
                  <Text note>Microsoft Corporation</Text>
                </Body>
              </Left>
              <Right>
                <Button bordered>
                  <Text>View</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>
          <Card>
           <CardItem>
             <Left>
               <Thumbnail source={{uri: 'https://4vector.com/i/free-vector-johnson-johnson-1_082483_johnson-johnson-1.png'}} />
               <Body>
                 <Text>iOS Engineer</Text>
                 <Text note>Johnson & Johnson</Text>
               </Body>
             </Left>
             <Right>
               <Button bordered>
                 <Text>View</Text>
               </Button>
             </Right>
           </CardItem>
         </Card>
         <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: 'https://4vector.com/i/free-vector-texas-instruments-0_076601_texas-instruments-0.png'}} />
              <Body>
                <Text>Javascript Developer </Text>
                <Text note>Texas Instruments</Text>
              </Body>
            </Left>
            <Right>
              <Button bordered>
                <Text>View</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>

        </Content>
       </Container>
     );
   }
 }
 const styles = StyleSheet.create({
  searchbarColor: {
    backgroundColor: '#104E8B',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
});
