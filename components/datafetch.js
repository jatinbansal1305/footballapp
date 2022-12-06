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
  ImageBackground,
} from 'react-native';
import {Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DropdownComponent from './dropdown';
import CountryFlag from 'react-native-country-flag';
export default Datafetch = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [api, setapi] = useState(null);
  const [pressed, setpressed] = useState(false);
  const vale = country_id => {
    setapi(country_id);
  };
  const playerList = async () => {
    try {
      const response = await fetch(
        `https://app.sportdataapi.com/api/v1/soccer/players?apikey=dcdff020-58d5-11ed-8fcb-93fb5a44495d&country_id=${api}`,
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
    playerList();
  }, [api]);

  return (
    <View style={styles.wrapper}>
      <DropdownComponent vale={vale}></DropdownComponent>

      <View style={styles.wrapper1}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.player_id}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  navigation.navigate('Details', {
                    name: item.player_id,
                    countryflag: item.country.country_code,
                  });
                }}>
                <Image
                  source={require('../assests/images/athlete.png')}
                  resizeMode="contain"
                  style={styles.playerImage}
                />
                <View>
                  <Text style={styles.playerName}>
                    {item.firstname} {item.lastname}
                  </Text>
                  <Text style={styles.playerBirthday}>{item.birthday}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  playerBirthday: {
    fontSize: 12,
    color: '#2E2E2E',
    marginTop: 8,
  },
  wrapper1: {
    backgroundColor: '#f3f5f7',
  },
  photo: {
    flex: 1,
  },
  playerImage: {
    borderRadius: 25,
    height: 50,
    width: 50,
    marginRight: 16,
  },
  playerName: {
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  buttonStyle: {
    flex: 1,
    shadowOpacity: 0.2,
    shadowRadius: 3.8,
    shadowOffset: {
      height: 0.4,
      width: 0.4,
    },
    shadowColor: '#2E2E2E',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'white',
    padding: 16,
    marginTop: 16,
    marginHorizontal: 24,
  },
});
