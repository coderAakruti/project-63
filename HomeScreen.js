import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
       isSearchedPressed: false,
              word: '',
              examples: "",
              definition: '',
              };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        var definition = response[0].meanings[0].definitions[0].definition;
        var lexicalCategory = response[0].meanings[0].partOfSpeech
        var example = response[0].meanings[0].definitions[0].example
      
        this.setState({
          word: word.trim(),
          definition: definition.trim(),
          lexicalCategory:lexicalCategory,
          examples:example
        });
      });
  };

  render() {
    return (
      <View>
        <Header
          backgroundColor={'maroon'}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: 'pink', fontSize:35, fontFamily: 'French Script MT'},
          }}
        />

        <TextInput
          style={styles.inputBox}
          placeholder=""
          onChangeText={(text) => {
            this.setState({
              text: text
            });
          }}
        />

        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.textIn}> Search </Text>{' '}
        </TouchableOpacity>

        <Text style={{ fontSize: 25, fontWeight:"bold", color:"black",marginTop:20}}>Word :{this.state.word}</Text>

        <Text style={{ fontSize: 25, fontWeight:"bold", color:"black",marginTop:20}}>Definition:{this.state.definition}</Text>
         <Text style={{ fontSize: 25 , fontWeight:"bold", marginTop:20,color:"black"}}>Type :{this.state.lexicalCategory}</Text>
         <Text style={{ fontSize: 25 , fontWeight:"bold", marginTop:20,color:"black"}}>Example :{this.state.examples}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    marginTop: 50,
    width: '100%',
    alignSelf: 'center',
    height: 80,
    textAlign: 'center',
    borderWidth: 8,
    borderColor: 'red',
    outline: 'none',
  },
  searchButton: {
    width: '40%',
    height: 55,
    alignSelf: 'center',
    padding: 5,
    margin: 10,
    borderWidth: 4,
    borderRadius: 20,
    borderColor: 'red',
    backgroundColor: 'white'
  },
  textIn: {
    textAlign: 'center',
    fontFamily: 'French Script MT',
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
  },
});
