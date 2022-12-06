import React, { useEffect, useState } from 'react';
import { StyleSheet,ActivityIndicator, FlatList, Text, View,TextInput } from 'react-native';

export default Countryfetch = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const response = await fetch(`https://app.sportdataapi.com/api/v1/soccer/countries?apikey=8c922ff0-550f-11ed-9771-d71981d9d7ae`);
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
        <Text style={{fontSize : 60, justifyContent : 'center',alignItems:'center' }}>players list</Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text style={styles.TextComponentStyle}>{item.firstname}, {item.lastname}</Text>
          )}
        />
      )}
    </View>
  );
};