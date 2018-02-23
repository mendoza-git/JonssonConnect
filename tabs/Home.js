/**
 * JonssonConnect Application
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { Image , StyleSheet, Text } from 'react-native';
 import { TabNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, Input, Item, Title, Button, Icon, Left, Body, Right, H1, H2, H3 } from 'native-base';

 export default class CardImageExample extends Component {
   static navigationOptions = {
     tabBarLabel: 'Home',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/homeicon.png')}
        style={{width: 22, height: 22}}>
       </Image>
     )
   }
   render() {
     return (
       <Container>
       <Header searchBar style={styles.searchbarColor}>
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
                 <Thumbnail source={{uri: 'https://joashpereira.com/templates/material_one_pager/img/avatar1.png'}} />
                 <Body>
                   <Text>John Doe</Text>
                   <Text note>CTO at Microsoft</Text>
                 </Body>
               </Left>
             </CardItem>
             <CardItem cardBody>
               <Image source={{uri: 'https://static1.squarespace.com/static/53f9e1c8e4b0586eb80c75e8/t/57e932d09f7456dca3d81828/1474900711585/MIT-Tech-Review.gif'}} style={{height: 200, width: null, flex: 1}}/>
             </CardItem>
             <CardItem>
               <Right>
                 <Button transparent>
                   <Text>Read Article</Text>
                 </Button>
               </Right>
             </CardItem>
           </Card>
           <Card>
             <CardItem>
               <Left>
                 <Thumbnail source={{uri: 'https://joashpereira.com/templates/material_one_pager/img/avatar1.png'}} />
                 <Body>
                   <Text>NativeBase</Text>
                   <Text note>GeekyAnts</Text>
                 </Body>
               </Left>
             </CardItem>
             <CardItem cardBody>
              <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
             </CardItem>
           </Card>
           <Card>
             <CardItem>
               <Left>
                 <Thumbnail source={{uri: 'https://joashpereira.com/templates/material_one_pager/img/avatar1.png'}} />
                 <Body>
                   <Text>NativeBase</Text>
                   <Text note>GeekyAnts</Text>
                 </Body>
               </Left>
             </CardItem>
             <CardItem cardBody>
               <Image source={{uri: 'https://static1.squarespace.com/static/5314da90e4b0e36de29a1b94/546d594fe4b02458d33b5ffa/546d5967e4b090b7b5f449f2/1416452457063/mit4.jpg?format=1000w'}} style={{height: 200, width: null, flex: 1}}/>
             </CardItem>
             <CardItem>
               <Right>
                 <Button transparent>
                   <Text>Read Article</Text>
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
  title: {
    color: '#104E8B',
    fontSize: 30
  },
  searchbarColor: {
    backgroundColor: '#008542',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
});
