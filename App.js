/**
 * JonssonConnect Application
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { Image } from 'react-native';
 import { TabNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Title, Button, Icon, Left, Body, Right, H1, H2, H3 } from 'native-base';
 import Home from './tabs/Home'
 import Jobs from './tabs/Jobs'
 import Events from './tabs/Events'

 var AppScreenNavigator = TabNavigator({
   Home: {screen: Home},
   JobsTab: {screen: Jobs},
   EventsTab: {screen: Events},
 }, {
   tabBarPosition : 'bottom',
   tabBarOptions : {
     activeTintColor: '#104E8B',
     activeBackgroundColor: '#ffffff',
     inactiveBackgroundColor: '#ffffff',
     inactiveTintColor: '#B7C3D0',
     swipingEnbled: 'false',
   }
 });

 AppScreenNavigator.navigationOptions = {
   title: "App"
 };

 export default AppScreenNavigator;
