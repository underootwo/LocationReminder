import React from 'react';
import type {Node} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Location from './components/Location';
import GetLocation from 'react-native-get-location';

import {PermissionsAndroid} from 'react-native';

const App: () => Node = () => {
  const [newTitle, setNewTitle] = React.useState('');

  const [locations, setLocations] = React.useState([]);

  const handleTitleChange = () => {};

  const askPremission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        alert('You can use the location');
      } else {
        console.log('location permission denied');
        alert('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const saveNewLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        var newLocation = {
          title: newTitle,
          time: Date.now(),
          location: {},
        };
        setLocations(locations => [...locations, newLocation]);
        setNewTitle('');
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
        if (code === 'CANCELLED') {
          Alert.alert('Location cancelled by user or by another request');
        }
        if (code === 'UNAVAILABLE') {
          Alert.alert('Location service is disabled or unavailable');
        }
        if (code === 'TIMEOUT') {
          Alert.alert('Location request timed out');
        }
        if (code === 'UNAUTHORIZED') {
          Alert.alert('Authorization denied');
        }
      });

    var newLocation = {
      title: newTitle,
      time: Date.now(),
      location: {},
    };
    setLocations(locations => [...locations, newLocation]);
    setNewTitle('');
  };
  return (
    <View style={styles.container}>
      <View style={styles.locations}>
        <Text style={styles.title}>Your Saved Locations </Text>

        <TouchableOpacity style={styles.fake} onPress={askPremission}>
          <Text>Ask for premission</Text>
        </TouchableOpacity>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            value={newTitle}
            onChangeText={value => setNewTitle(value)}></TextInput>

          <TouchableOpacity style={styles.saveButton} onPress={saveNewLocation}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.items}>
          {locations.map((location, index) => (
            <Location details={location} key={index} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fake: {
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },

  locations: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
  },

  inputBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },

  input: {
    flex: 7,
    height: 40,
    maxWidth: '100%',

    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },

  saveButton: {
    flex: 1,
    padding: 5,
  },

  items: {},
});

export default App;
