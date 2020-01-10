import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';

export default class Home extends Component {

  constructor(props: any) {
    super(props);
    this.state = {
      workAreas: [
        {id:1,  title: "Task Volume", color:"#51d69f", image:"https://img.icons8.com/color/70/000000/name.png"},
        {id:2,  title: "Control", color:"#ff527f", image:"https://img.icons8.com/office/70/000000/home-page.png"},
        {id:3,  title: "Pay & Incentives", color:"#51d69f", image:"https://img.icons8.com/color/70/000000/two-hearts.png"},
        {id:4,  title: "Community", color:"#ff527f", image:"https://img.icons8.com/color/70/000000/name.png"},
        {id:5,  title: "Justice", color:"#fdb83f", image:"https://img.icons8.com/office/70/000000/home-page.png"},
        {id:6,  title: "Standards", color:"#51d69f", image:"https://img.icons8.com/color/70/000000/two-hearts.png"}
      ],
      personalAreas: [
        {id:4,  title: "Exhaustion",   color:"#fdb83f", image:"https://img.icons8.com/color/70/000000/family.png"} ,
        {id:5,  title: "Depersonalization",  color:"#ff527f", image:"https://img.icons8.com/color/70/000000/groups.png"} ,
        {id:6,  title: "Personal Accomplishment",   color:"#51d69f", image:"https://img.icons8.com/color/70/000000/classroom.png"}
      ]
    };
  }

  componentDidMount () {
    console.log('userId=' + this.props.navigation.getParam('userId', 0))
  }

  clickEventListener(item) {
    Alert.alert(item.title)
  }
  renderBubble (item: any) {
    return (
      <View style={{marginTop: 10}}>
        <View style={styles.cardHeader}>
          <View style={{alignItems:"center", justifyContent:"center", width: 80}}>
            <Text style={[styles.title]}>{item.title}</Text>
            <TouchableOpacity
                style={[styles.card, {backgroundColor:item.color}]}
                onPress={() => {this.clickEventListener(item)}}>
              {/* <Image style={styles.cardImage} source={{uri:item.image}}/> */}
              <Text> 80 </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, marginLeft: 10, fontWeight: 'bold' }}> Personal Profile </Text>
        <View style={{flex: 1}}>
          <Text style={{ fontSize: 16, marginTop: 30, marginLeft: 25, fontWeight: 'bold' }}> Work Areas </Text>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.workAreas}
            horizontal={false}
            numColumns={3}
            keyExtractor= {(item) => {
              return item.id;
            }}
            renderItem={({item}) => this.renderBubble(item)}/>
        </View>
        <View style={{flex: 1}}>
          <Text style={{ fontSize: 16, marginTop: 0, marginLeft: 25, fontWeight: 'bold' }}> Personal Areas </Text>
          <FlatList style={styles.list}
            contentContainerStyle={styles.listContainer}
            data={this.state.personalAreas}
            horizontal={false}
            numColumns={3}
            keyExtractor= {(item) => {
              return item.id;
            }}
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