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
  SafeAreaView,
} from 'react-native';
import {YellowBox} from 'react-native';
import { whileStatement } from '@babel/types';
YellowBox.ignoreWarnings([ 'VirtualizedLists should never be nested' ]);

export default (props: any) => {
  useEffect(() => {

  }, [])

  const [blurbModalVisible, setBlurbModalVisible] = useState(false)
  const [blurb, setBlurb] = useState('')

  const clickEventListener = (item: any) => {
    // Alert.alert(item.blurb)
    setBlurb(item.blurb)
    setBlurbModalVisible(true)
  }

  const renderBubble = (item: any) => {
    return (
      <View style={{marginTop: 10}}>
        <View style={styles.cardHeader}>
          <View style={{alignItems:"center", justifyContent:"center", width: 80}}>
            <Text style={[styles.title]}>{item.title}</Text>
            <TouchableOpacity
                style={[styles.card, {backgroundColor: item.color}]}
                onPress={() => {clickEventListener(item)}}>
              {/* <Image style={styles.cardImage} source={{uri:item.image}}/> */}
              <Text> {item.score} </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={blurbModalVisible}
          presentationStyle='pageSheet'
          onRequestClose={() => {
            setBlurbModalVisible(false)
          }}>
          <View style={styles.blurbContainer}>
            <View>
              <Text style={{fontSize: 25, fontWeight: 'bold'}}>{blurb}</Text>
              <TouchableHighlight
                onPress={() => {
                  setBlurbModalVisible(!blurbModalVisible);
                }}>
                <View style={{flexDirection: 'row-reverse'}}>
                  <Text style={{marginTop: 15}}>Okay</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={{backgroundColor: '#3e3935', flex: 0.5}}>
          <Image source={require('../../media/company-logo.png')} style={{marginLeft: 20, height: 80, width: 150}} resizeMode='contain' />
        </View>
        <View style={{flex: 1, flexDirection: 'row', marginTop: 30}}>
          <View style={{flex: 0.5, marginRight: 15, marginTop: 10, height: 15, backgroundColor: '#3e3935', justifyContent: 'center'}} />
        </View>
        <Text style={{flex: 1, fontSize: 20, fontWeight: 'bold' }}> Personal Profile </Text>

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 25}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Work Areas </Text>
            <View style={{flex: 2, marginLeft: 5, marginRight: 15, marginTop: 10, height: 5, backgroundColor: '#3e3935', justifyContent: 'center'}} />
          </View>
          <FlatList style={styles.list}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item: any, index: number) => item.title}
            data={props.navigation.getParam('profile', 0).workAreas}
            horizontal={false}
            numColumns={3}
            renderItem={({item}) => renderBubble(item)}/>
        </View>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', marginTop: 30, marginLeft: 25}}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}> Personal Areas </Text>
            <View style={{flex: 2, marginLeft: 5, marginRight: 15, marginTop: 10, height: 5, backgroundColor: '#3e3935', justifyContent: 'center'}} />
          </View>
          <FlatList style={styles.list}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item: any, index: number) => item.title}
            data={props.navigation.getParam('profile', 0).personalAreas}
            horizontal={false}
            numColumns={3}
            renderItem={({item}) => renderBubble(item)}/>
        </View>
        {/* <View style={{flex: 1, backgroundColor: '#3e3935', flexDirection: 'row-reverse'}}>
          <Image source={require('../../media/colored-stripes.png')} style={{height: 40, width: 150}} resizeMode='contain' />
        </View> */}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor:'#fff'
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
  blurbContainer: {
    // backgroundColor: '#3e3935',
    margin: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});