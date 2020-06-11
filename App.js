/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {  
  Header,
  Colors
} from 'react-native/Libraries/NewAppScreen';
import papa from 'papaparse';

const App: () => React$Node = () => {
   
  let [infos, setInfos] = useState([]);
  
  useEffect(()=>{
    let url = 'https://data.tainan.gov.tw/dataset/94f9c34f-e658-4c84-ab9c-1889c46c69ca/resource/17d35835-8a02-4ea2-aa39-539452bc956d/download/historicalmonument2016.csv';
    let data = fetch(url)
                .then( (response) => response.text() )
                .then((text) => {      
                  let json = papa.parse(text);
                  setInfos(json.data);             
                })
                .catch((error)=>{
                  console.error(error);
                });
  }, []);

  function card(info, index){    

    if(info.length > 1) {
      let [num, type, name, rank, pos, time] = info;    
    
      return <View key={index} elevation={5} style={styles.card}>
        <Text>{`${num} ${type}`}</Text>
        <Text>{`${rank} : ${name}`}</Text>
        <Text numberOfLines={1}l>{`${pos}`}</Text>
      </View>      
    }    
    
  }

  function cards(){
    let content = [];

    if(infos.length > 0) {
      for(let i in infos){
        if(i != 0){          
          content.push(card(infos[i], i));
        }                
      }
    }       

    return <View>
        {content}
    </View>
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>          
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
              {
                cards()                
              }              
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 2
    }
  }  
});

export default App;
