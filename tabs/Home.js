/**
 * JonssonConnect Home Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, Image, ListView, ImageBackground, FlatList, RefreshControl, StyleSheet, TextInput, View, TouchableHighlight } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3, } from 'native-base';
 import * as firebase from 'firebase';
 import firebaseApp from '../App';
 import rootRef from '../App';

 export default class Home extends Component {

   constructor(props) {
     super(props);
     this.state = {
       isLoading: true,
       refreshing: false,
     }
   }

   componentDidMount() {
     return fetch('https://jonssonconnect.firebaseio.com/.json')
     //return fetch('https://jonssonconnect.firebaseio.com/Articles.json')
     //return fetch('/Users/mendoza/Downloads/articles.json')
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.Articles),
          //dataSource: ds.cloneWithRows(responseJson.filter(x => x.articleName == 'UT Dallas Team Wins Grand Prize at Texas A&M Hackathon')),
        }, function() {
          });
      })
      .catch((error) => {
        //console.error(error);
        this.setState({
          isLoading: false,
          networkFailed: true,
        })
      });
    }


    firstSearch() {
      //return fetch('https://jonssonconnect.firebaseio.com/.json')
      //return fetch('https://jonssonconnect.firebaseio.com/Articles.json')
      return fetch('/Users/mendoza/Downloads/articles.json')
       .then((response) => response.json())
       .then((responseJson) => {
         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.setState({
           isLoading: false,
           //dataSource: ds.cloneWithRows(responseJson.Articles),
           dataSource: ds.cloneWithRows(responseJson.filter(x => x.articleName == 'UT Dallas Team Wins Grand Prize at Texas A&M Hackathon')),
         }, function() {
           });
       })
       .catch((error) => {
         //console.error(error);
         this.setState({
           isLoading: false,
           networkFailed: true,
         })
       });
     }

    static navigationOptions = {
      tabBarLabel: 'Home',
       tabBarIcon: ({ tintcolor }) => (
         <Image
          source={require('../images/homeicon.png')}
          style={{width: 21, height: 21}}>
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
          <View style={styles.container2}>
            <ImageBackground
              style={styles.backdrop}
              blurRadius={1}
              source={{uri: 'https://images.unsplash.com/photo-1487235829740-e0ac5a286e1c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=310f7bfbbc76086f8259a5d197fcffb4&auto=format&fit=crop&w=2248&q=80'}}>
                <View style={styles.backdropView}>
                  <Text style={{ color: '#FFFFFF', fontSize: 24, fontWeight: '800', paddingBottom: 10}}>Search the News.</Text>
                  <TextInput rounded
                    style={{
                       fontSize: 18,
                       alignItems: 'center',
                       justifyContent: 'center',
                       paddingTop: 10,
                       paddingBottom: 10,
                       width: 300,
                       backgroundColor: '#FFFFFF',
                       opacity: .9,
                       borderRadius:10,
                     }}
                    placeholder=' Search...'
                    onChangeText={(text) => this.setState({searchText:text})}
                    onSubmitEditing={() => this.firstSearch()}
                  />
                </View>
            </ImageBackground>
          </View>
          <Content style={{ backgroundColor: '#f8f6f6'}}>
            <Text style={styles.colorHeader}>Top<Text style={styles.bigHeader}> News</Text> </Text>
            <Text style={{fontWeight: '800', color: '#C75B12', paddingLeft: 15}}>________</Text>
          </Content>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              const {uri} = rowData;
              return (
               <Content>
                 <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                 <Text style={{color: rowData.articleColor, fontSize: 10, fontWeight: '100', paddingLeft: 15, paddingRight: 5, paddingTop: 10, }}>
                   {rowData.articleType}
                 </Text>
                 <Text onPress={() => this.props.navigation.navigate("ArticleDetails", {rowData})} style={styles.nameStyle}>
                     {rowData.articleName}
                 </Text>
                 <Text style={styles.dateStyle}>
                     {rowData.postedOn}
                 </Text>
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
  container2: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: null,
    backgroundColor: '#FFFFFF'
  },
  backdrop: {
    width: null,
    height: 230
  },
  backdropView: {
    height: 230,
    width: 380,
    backgroundColor: 'rgba(0,0,0,0)',
    paddingLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hostStyle: {
    fontWeight: '800',
    fontSize: 14,
  },
  seperator: {
    fontWeight: '100',
    color: '#D3D3D3',
    paddingLeft: 10,
  },
  nameStyle: {
    fontSize: 16,
    fontWeight: '800',
    paddingTop: 5,
    paddingLeft: 15,
    paddingRight: 5,
  },
  dateStyle: {
    fontSize: 10,
    fontWeight: '100',
    paddingTop: 10,
    paddingLeft: 15,
    paddingRight: 5,
    color: '#878787',
  },
  bigHeader: {
    fontSize: 24,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 15,
  },
  colorHeader: {
    fontSize: 24,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 15,
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
    paddingLeft: 15,
    paddingRight: 5,
    color: '#0085c2',
  },
  summaryStyle: {
    fontSize: 18,
    fontWeight: '800',
    paddingTop: 10,
    paddingLeft: 15,
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
