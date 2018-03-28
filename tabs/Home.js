/**
 * JonssonConnect Events Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, FlatList, StyleSheet, TextInput, View, TouchableHighlight } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3, } from 'native-base';

 import * as firebase from 'firebase';

 export default class Home extends Component {
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
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

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
          <Text style={styles.colorHeader}>Top<Text style={styles.bigHeader}> News</Text> </Text>
          <Image source={require('../images/jchomebanner.png')} style={{ height: 180, width: null }}></Image>
         <ListView
           dataSource={this.state.dataSource}
           renderRow={(rowData) => {
             const {uri} = rowData;
             return (
              <Content>
                <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                <Text style={{color: rowData.articleColor,fontSize: 10, fontWeight: '100', paddingLeft: 10, paddingRight: 5, }}>
                  {rowData.articleType}
                </Text>
                <Text onPress={() => this.props.navigation.navigate("ArticleDetails", {rowData})} style={styles.nameStyle}>
                    {rowData.articleName}
                </Text>
                <Text style={styles.dateStyle}>
                    {rowData.postedOn}
                </Text>
                <Text style={{fontSize: 12, fontWeight: '600'}}></Text>

                <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
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
  containerStyle: {
    backgroundColor: '#FFFFFF',
  },
  hostStyle: {
    fontWeight: '800',
    fontSize: 14,
  },

  cardStyle: {
    paddingLeft: 10,
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: '800',
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
  dateStyle: {
    fontSize: 10,
    fontWeight: '100',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: '#878787',
  },
  bigHeader: {
    fontSize: 28,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  colorHeader: {
    fontSize: 28,
    fontWeight: '800',
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 10,
    color: '#C75B12',
  },
  jonssonHeader: {
    fontSize: 24,
    fontWeight: '800',
    paddingBottom: 20,
    paddingLeft: 10,
  },
  eventDescriptionStyle: {
    fontSize: 10,
  },
  typeStyle: {
    fontSize: 14,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
    color: '#0085c2',
  },
  summaryStyle: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 5,
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
    backgroundColor: '#00A1DE',
  },
  searchButton: {
    fontSize: 12,
    color: '#ffffff',
  },
  textInput: {
    height: 30,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    marginBottom: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
});
