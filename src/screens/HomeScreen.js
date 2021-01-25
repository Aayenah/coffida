import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel from '../components/Carousel';
import colors from '../config/colors';

const headerImg = require('../images/nero.jpg');

export default function HomeScreen() {
  const [locations, setLocations] = useState([]);

  function fetchLocations() {
    const options = {
      headers: {
        'X-Authorization': '24a9fb8b83552ec344937deb4c3e4ced',
      },
    };

    fetch('http://10.0.2.2:3333/api/1.0.0/find', options)
      .then((res) => res.json())
      .then((data) => {
        setLocations(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchLocations();
  }, []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={headerImg} style={styles.img} />
      </View>
      {/* <Divider style={{ marginVertical: 20 }} /> */}
      <View style={styles.container}>
        <Carousel title="Nearby Cafes" items={locations} />
        <Carousel title="Top Rated" items={locations} />
        <Carousel title="High Quality" items={locations} />
        <Carousel title="Best Prices" items={locations} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingLeft: 10,
    // paddingTop: 50,
  },
  header: {
    height: 230,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    marginBottom: 20,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
