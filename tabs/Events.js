/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { Image } from 'react-native';
 import { TabNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Title, Button, Icon, Left, Body, Right, H1, H2, H3 } from 'native-base';

 export default class Jobs extends Component {
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
     return (
       <Container>
         <Header>
         </Header>
         <Content>
         <Title> <H1>Events</H1> </Title>

         </Content>
       </Container>
     );
   }
 }
