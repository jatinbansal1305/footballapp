import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';


import CountryFlag from 'react-native-country-flag';

const Playerdetails = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  const route = useRoute();
  const playerDetails = async () => {
    try {
      const response = await fetch(
        `https://app.sportdataapi.com/api/v1/soccer/players/${route.params.name}?apikey=dcdff020-58d5-11ed-8fcb-93fb5a44495d`,
      );
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    playerDetails();
  }, []);

  
  return (
    <SafeAreaView style={{flex: 1, padding: 24}}>
      
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView style={{flex: 1, paddingTop: 0}}>
          <ScrollView>
          <CountryFlag isoCode={route.params.countryflag} size={250} />
          <View style= {styles.wrapper}>
            <View style={{backgroundColor: 'white'}}>
              <View style={styles.container}>
                <View>
                  <Image
                    style={styles.profileImg}
                    source={require('../assests/images/athlete.png')}
                  />
                </View>
              </View>
              <Text
                style={{
                  
                  flexDirection  : 'row',
                  color: '#ee2e24',
                  paddingTop: 55,
                  fontSize: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign : 'center'
                }}>
                {data.firstname} {data.lastname}{' '}
              </Text>
              <View
                style={{
                  paddingTop: 0,
                  borderBottomColor: '#2E2E2E',
                  borderBottomWidth: 1,
                  alignItems: 'stretch',
                }}
              />
            </View>
            <Text style={{fontSize: 30, paddingTop: 10}}>
              Age         Height       Weight
            </Text>
            <Text style={{fontSize: 24, color: '#2E2E2E',}}>  {data.age}               {data.height / 100}m               {data.weight === null ? 50 : data.weight}Kg
            </Text>
            <Text style={{fontSize: 24, paddingTop: 20, color: '#ee2e24'}}>
              Player Stats
            </Text>
            <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={{fontSize: 40, paddingLeft: 22, paddingTop: 12}}>
                  41
                </Text>
                <Text style={{fontSize: 20, paddingLeft: 17}}>Points</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={{fontSize: 40, paddingLeft: 35, paddingTop: 12}}>
                  8
                </Text>
                <Text style={{fontSize: 20, paddingLeft: 20}}>Goals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle}>
                <Text style={{fontSize: 40, paddingLeft: 18, paddingTop: 12}}>
                  3.3
                </Text>
                <Text style={{fontSize: 20, paddingLeft: 8}}>Average</Text>
              </TouchableOpacity>
            </TouchableOpacity>
            </View>
          </ScrollView>
          
        </SafeAreaView>
      )}
    </SafeAreaView>
  );
};

export default Playerdetails;

const styles = StyleSheet.create({
  wrapper : {
padding :24,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 160,
    paddingTop: 10,
    marginLeft: 8,
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  buttonStyle: {
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    shadowOffset: {
      height: 0.4,
      width: 0.4
    },
    shadowColor :'#2E2E2E',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'white',
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 15,
    paddingLeft: 2,
    marginTop: 10,
    width: 100,
    marginRight: 20,
    height: 100,
  },

  profileImg: {
    backgroundColor: 'white',
    alignItems: 'center',
    borderWidth: 0.5,
    height: 120,
    width: 120,
    borderRadius: 100,
  },
});
