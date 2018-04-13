import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Linking,
  View,
  Dimensions,
  Clipboard,
  Image,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  TouchableHighlight,
} from 'react-native'

import { Container, Header, Content, Card, CardItem, Thumbnail, List, ListItem, Icon, Item, Input, Tab, Tabs, Text, Title, Button, Left, Body, Right, H1, H2, H3, } from 'native-base';


//import { CLIENT_ID, CLIENT_SECRET } from './config'

import LinkedInModal from 'react-native-linkedin'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#011f4b',
  },
  backdrop: {
    height: 475,
    paddingTop: 60,
    width: null,
  },
  backdropView: {
    height: 230,
    width: 380,
    backgroundColor: 'rgba(0,0,0,0)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  userContainer: {
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  item: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  label: {
    marginRight: 10,
  },
  value: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  linkedInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    flex: 0.7,
    alignItems: 'flex-end',
  },
  valueContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})

export default class Login extends React.Component {

  state = {
    access_token: undefined,
    expires_in: undefined,
    refreshing: false,
  }

  constructor(props) {
    super(props)
    StatusBar.setHidden(true)
    this.state = { isLoggedIn: false };
  }

  componentDidMount() {

  }

  componentWillMount() {

  }

  async getUser({ access_token }) {
    this.setState({ refreshing: true })
    const baseApi = 'https://api.linkedin.com/v1/people/'
    const qs = { format: 'json' }
    const params = [
      'first-name',
      'last-name',
      'email-address',
      'summary',
      'picture-url',
      'id',
    ]

    const response = await fetch(`${baseApi}~:(${params.join(',')})?format=json`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + access_token,
      },
    })
    const payload = await response.json()
    this.setState({
       ...payload,
        refreshing: false,
    })
    AsyncStorage.setItem('lastName', this.state.lastName),
    AsyncStorage.setItem('firstName', this.state.firstName),
    AsyncStorage.setItem('email', this.state.emailAddress),
    AsyncStorage.setItem('summary', this.state.summary),
    AsyncStorage.setItem('userPhoto', this.state.pictureUrl),
    AsyncStorage.setItem('userID', this.state.id),
    AsyncStorage.getItem('loggedInStatus',
    (value) => {
      this.setState({ loggedInStatus: 'loggedIn' });
    });
    this.props.navigation.navigate("HomeFeedStack")
  }

  renderItem(label, value) {
    return (
      <View style={styles.item}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    )
  }

  render() {
    const { emailAddress, pictureUrl, refreshing, firstName, lastName, summary, id, } = this.state;
    if (this.state.loggedInStatus === 'loggedIn') {
      this.props.navigation.navigate("HomeFeedStack")
    }
    return (
      <View style={styles.container}>
        <ImageBackground
         source={{ uri: 'https://images.unsplash.com/photo-1442876906995-6761040d1f0b?ixlib=rb-0.3.5&s=7c1e9f505b3facad6b70295fb4fe3dbe&auto=format&fit=crop&w=2100&q=80'}}
         style={{ height: 475, width: 500}}
         style={styles.backdrop}
         blurRadius={1}>
         <View style={styles.backdropView}>
          <Image source={{ uri: 'https://www.utdallas.edu/brand/files/Temoc_Secondary_Blue.png'}} style={{ height: 110, width: 150, paddingTop: 100}}></Image>
          <Text style={{ fontSize: 32, color: '#FFFFFF', fontWeight: '300'}}>Jonsson Connect </Text>
          <Text style={{ fontSize: 22, color: '#FFFFFF', fontWeight: '200', paddingTop: 20}}>Begin exploring oppotunities only offered by the Jonsson School. </Text>
          <Text style={{ fontSize: 8, position: "absolute", bottom: -150, color: '#FFFFFF'}}>Photo by Levi Price</Text>
         </View>
        </ImageBackground>
        {!emailAddress &&
          !refreshing && (
            <View style={styles.linkedInContainer}>
              <LinkedInModal
                ref={ref => {
                  this.modal = ref
                }}
                linkText=""
                clientID="86c3k9s35z8di0"
                clientSecret="ptaW1pqjV26iefkz"
                redirectUri="https://github.com/mendoza-git/JonssonConnect"
                onSuccess= {
                  data => this.getUser(data)
                }
              />
            </View>
          )}

          <View style={styles.container}>
              <TouchableHighlight onPress={() => this.modal.open()}>
                <Button onPress={() => this.modal.open()} style={{ width: 500}} rounded full primary>
                  <Text style={{ fontWeight: '100', fontSize: 16}}> <Image source={require('../images/linkedin-logo.png')} style={{width: 25, height: 25}}></Image>Sign in with LinkedIn</Text>
                </Button>
              </TouchableHighlight>
              <Text style={{ fontSize: 10, fontWeight: '100'}}></Text>
              <TouchableHighlight onPress={() => this.modal.open()}>
                <Button style={{ width: 500}} full light><Text style={{ color: '#011f4b', fontWeight: '100', fontSize: 16}}>Download LinkedIn to Continue</Text></Button>
              </TouchableHighlight>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 8, fontWeight: '100', position: "absolute", bottom: 0}}>Copyright © 2018, The Univerity of Texas at Dallas, all rights reserved.</Text>
      </View>
    )
  }
}
