/**
 * JonssonConnect Home Page
 * https://github.com/facebook/react-native
 * @flow
 */
 import React, { Component } from 'react';
 import { ActivityIndicator, AsyncStorage, Image, ListView, ImageBackground, FlatList, RefreshControl, StyleSheet, TextInput, View, TouchableHighlight } from 'react-native';
 import { TabNavigator, StackNavigator } from "react-navigation";
 import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Item, Icon, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3, } from 'native-base';
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

   async componentDidMount() {
     this.setState({
       firstName: await AsyncStorage.getItem('firstName'),
       lastName: await AsyncStorage.getItem('lastName'),
       userPhoto: await AsyncStorage.getItem('userPhoto'),
     });
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

   static navigationOptions = ({ navigation }) => ({
     headerRight: <Button transparent onPress={() =>
       navigation.navigate('Login')
     }><Icon name='ios-log-out' /></Button>,
     tabBarLabel: 'Home',
     tabBarIcon: ({ tintcolor }) => (
       <Image
        source={require('../images/temocicon.png')}
        style={{width: 32, height: 32}}>
       </Image>
     )
   });

   render() {
     if (this.state.isLoading) {
       return (
         <View style={{flex: 1, paddingTop: 20}}>
           <ActivityIndicator />
         </View>
       );
     }
     const monthNames = ["January", "February", "March", "April", "May", "June",
       "July", "August", "September", "October", "November", "December"
     ]

     const date = new Date()
     var month = monthNames[date.getMonth()]
     var year = date.getFullYear()
     var day = date.getDate()

     return (
       <Container style={styles.containerStyle}>
        <Content>
          <View style={styles.container2}>
            <ImageBackground
              style={styles.backdrop}
              blurRadius={0}
              source={require('../images/homebanner.png')}>
                <View style={styles.backdropView}>
                <Thumbnail style={{ paddingTop: 30, borderColor: 'black'}} source={{uri: this.state.userPhoto.toString() }} />
                  <Text style={{ fontSize: 25, fontWeight: '200', paddingBottom: 5, paddingTop: 5}}>Hello, {this.state.firstName.toString()}.</Text>
                  <Text style={{ fontSize: 20, fontWeight: '200', paddingBottom: 5}}>Explore the news</Text>
                  <Text style={{ fontSize: 20, fontWeight: '100', paddingBottom: 5}}>{month} {day}, {year}</Text>

                  {/*
                  <TextInput rounded
                    style={{
                       fontSize: 18,
                       alignItems: 'center',
                       justifyContent: 'center',
                       paddingTop: 10,
                       paddingBottom: 10,
                       width: 300,
                       backgroundColor: '#FFFFFF',
                       opacity: .3,
                       borderRadius:10,
                     }}
                    placeholderTextColor='black'
                    placeholder='   Search...'
                    onChangeText={(text) => this.setState({searchText:text})}
                    onSubmitEditing={() => this.firstSearch()}
                  />
                  */}
                </View>
            </ImageBackground>
          </View>
          <Content style={{ backgroundColor: '#f8f6f6'}}>
          <Card>
            <CardItem style={{ borderLeftColor: '#398564', borderLeftWidth: 4, borderRightColor: '#398564', borderRightWidth: 4}}>
              <Body>
                <Text style={{ fontSize: 22, fontWeight: '800'}}>Jonsson News</Text>
              </Body>
            </CardItem>
          </Card>
          </Content>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => {
              const {uri} = rowData;
              return (
               <Content style={{ borderLeftColor: rowData.articleColor, borderLeftWidth: 4}}>
                 <Text style={{fontSize: 14, fontWeight: '800'}}></Text>
                 <Text style={{color: rowData.articleColor, fontSize: 10, fontWeight: '100', paddingLeft: 15, paddingRight: 5, paddingTop: 10, }}>
                  <Icon name='ios-pricetag' style={{ fontSize: 10, color: rowData.articleColor}}/>  {rowData.articleType}
                 </Text>
                 <Text onPress={() => this.props.navigation.navigate("ArticleDetails", {rowData})} style={styles.nameStyle}>
                  {rowData.articleName}
                 </Text>
                 <Text style={styles.dateStyle}>
                  <Icon name='ios-clock-outline' style={{ fontSize: 10, color: '#878787'}}/> {rowData.postedOn}</Text>
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
    height: 175
  },
  backdropView: {
    height: 175,
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
