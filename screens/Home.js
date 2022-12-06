import { StyleSheet, Text, View ,Button} from 'react-native'
import React from 'react'

const Home = ({navigation}) => {
  return (
    <View style={{flex : 1, justifyContent : 'center',alignItems : 'center'}}>
      <Text>Home</Text>
      <Button onPress={()=> navigation.navigate('Details')} title='Next screen'></Button>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})