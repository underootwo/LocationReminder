import React from 'react';
import type {Node} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function Location({details}) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View style={styles.square}></View>

        <Text style={styles.title}>{details.title}</Text>
      </View>

      <View>
        <TouchableOpacity style={styles.row}>
          <Text>Hit me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
  },

  itemLeft: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  title: {
    paddingHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },

  square: {
    width: 20,
    height: 20,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
  },
});

export default Location;
