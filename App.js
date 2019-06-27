import React, { Component } from 'react';
import {StyleSheet, Text, View, FlatList, Button, CheckBox, TextInput, Dimensions, Alert} from 'react-native';

var width = Dimensions.get('window').width; 
var height = Dimensions.get('window').height; 

var rows = [];
var counter = 0;

const extractkey = ({id}) => id.toString();

export default class App extends Component {
  
  constructor(props) {
    super(props)
    this.state = {  
      TextInputValueHolder: '',
      arrayHolder: []
    }
  }

  addItem = () => {
    const { TextInputValueHolder }  = this.state ;
    this.refs.txtInput.clear();
    
    var newRow = {id: counter++, text: TextInputValueHolder, checked: false};
    rows.push(newRow);
    this.setState({
      TextInputValueHolder: '',
      arrayHolder: [...rows],
    });
  }

  removeItem = ({item}) => {
    var tmp = [], i;
    for(i = 0; i < rows.length; i++){
      if(rows[i].id !== item.id){
        tmp.push(rows[i]);
      }
    }
    rows = tmp;
    this.setState({
      arrayHolder: [...rows],
    });
  }
  clearList = () => {
    rows = [];
    this.setState({
      arrayHolder: [],
    });
  }

  renderItem = ({item}) => {
    return (
      <View style={styles.row}>
        <Text style={styles.itemtext}>{item.text}</Text>
        <CheckBox checked={item.checked} />
        <Button style={styles.deletebtn} title='X' onPress={() => this.removeItem({item})} />
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headertxt}>ToDo List</Text>
        </View>
        <TextInput style={styles.txtinput} ref='txtInput' onChangeText={TextInputValueHolder => this.setState({TextInputValueHolder})} placeholder='Enter New Item' onSubmitEditing={this.addItem} />
        <FlatList style={styles.scrollcontainer} data={this.state.arrayHolder} renderItem={this.renderItem} keyExtractor={extractkey} />
        <View style={styles.footer}>
          <Button style={styles.clearbtn} title='Clear All the List' onPress={this.clearList} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  header: {
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headertxt:{
    color: '#fff',
    fontSize: 35,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10, 
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'skyblue',
  },
  clearbtn: {
    fontSize: 35,
  },
  scrollcontainer: {
    padding: 10,
  },
  row: {
    left: 0,
    right: 0,
    flexDirection: 'row',
  },
  itemtext: {
    fontSize: 25,
    alignSelf: 'stretch',
    width: width * 0.8,
  },
  deletebtn: {
    backgroundColor: 'white',
    right: 0,
    width: width * 0.12,
    color: 'red',
  },
  txtinput: {
    width: width - 4,
    fontSize: 22,
    color: 'blue',
    borderColor: 'skyblue',
    borderRadius: 5,
    borderWidth: 1,
    margin: 2,
    textAlign: 'center'
  },
});