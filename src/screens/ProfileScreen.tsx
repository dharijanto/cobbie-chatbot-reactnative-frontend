import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class Home extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      blurbVisible: false
    }
    /* this.state = {
      workAreas: [
        {id:1,  title: "Workload", score: 80, color:"#51d69f"},
        {id:2,  title: "Control", score: 80, color:"#ff527f"},
        {id:3,  title: "Rewards", score: 80, color:"#51d69f"},
        {id:4,  title: "Community", score: 80, color:"#ff527f"},
        {id:5,  title: "Justice", score: 80, color:"#fdb83f"},
        {id:6,  title: "Values", score: 80, color:"#51d69f"}
      ],
      personalAreas: [
        {id:4,  title: "Exhaustion", score: 80, color:"#fdb83f"} ,
        {id:5,  title: "Depersonalization", score: 80, color:"#ff527f"} ,
        {id:6,  title: "Personal Accomplishment", score: 80, color:"#51d69f"}
      ]
    }; */
  }

  componentDidMount () {
    console.log('userId=' + this.props.navigation.getParam('userId', 0))
  }

  clickEventListener(item) {
    Alert.alert(item.blurb)
  }
  renderBubble (item: any) {
    return (
      <View style={{marginTop: 10}}>
        <View style={styles.cardHeader}>
          <View style={{alignItems:"center", justifyContent:"center", width: 80}}>
            <Text style={[styles.title]}>{item.title}</Text>
            <TouchableOpacity
                style={[styles.card, {backgroundColor: item.color}]}
                onPress={() => {this.clickEventListener(item)}}>
              {/* <Image style={styles.cardImage} source={{uri:item.image}}/> */}
              <Text> {item.score} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.blurbVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}> Personal Profile </Text>
        <View style={{flex: 1}}>
          <Text style={{ fontSize: 16, marginTop: 30, marginLeft: 25, fontWeight: 'bold' }}> Work Areas </Text>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item: any, index: number) => item.title}
            data={this.props.navigation.getParam('profile', 0).workAreas}
            horizontal={false}
            numColumns={3}
            renderItem={({item}) => this.renderBubble(item)}/>
        </View>
        <View style={{flex: 1}}>
          <Text style={{ fontSize: 16, marginTop: 0, marginLeft: 25, fontWeight: 'bold' }}> Personal Areas </Text>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item: any, index: number) => item.title}
            data={this.props.navigation.getParam('profile', 0).personalAreas}
            horizontal={false}
            numColumns={3}
            renderItem={({item}) => this.renderBubble(item)}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop:40,
    backgroundColor:'#fff',
  },
  list: {
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 5,
    backgroundColor:"#fff",
  },
  listContainer:{
    alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#474747',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor:"#e2e2e2",
    // flexBasis: '42%',
    width: 50,
    height: 50,
    borderRadius:60,
    alignItems:'center',
    justifyContent:'center'
  },
  cardHeader: {
    paddingVertical: 0,
    paddingHorizontal: 15,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center",
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardFooter:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  cardImage:{
    height: 50,
    width: 50,
    alignSelf:'center'
  },
  title:{
    textAlign: 'center',
    fontSize:10,
    flex:1,
    alignSelf:'center'
  },
});