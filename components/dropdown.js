import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {Button} from 'react-native-paper';
const DropdownComponent = ({vale}) => {
  const [value, setValue] = useState(null);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const countriesName = async () => {
    try {
      const response = await fetch(
        `https://app.sportdataapi.com/api/v1/soccer/countries?apikey=dcdff020-58d5-11ed-8fcb-93fb5a44495d`,
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
    countriesName();
  }, []);

  return (
    <View style={styles.wrapper}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="name"
        valueField="country_id"
        placeholder="SelectCountry"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.country_id);
        }}
      />

      <Button
        style={styles.submitButton}
        color="#ee2e24"
        mode="contained"
        onPress={() => vale(value)}>
        Submit
      </Button>
    </View>
  );
};

export default DropdownComponent;
const styles = StyleSheet.create({
  submitButton: {
    marginBottom: 16,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 24,
  },
  dropdown: {
    marginBottom: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
