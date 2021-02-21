/* eslint-disable import/named */
import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Card } from 'react-native-elements';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PropTypes from 'prop-types';
import { getDistanceInMiles } from '../utility/GeolocationHelpers';
import AverageStars from './AverageStars';
import Distance from './Distance';
import AspectRating from './AspectRating';
import * as RootNavigation from '../utility/RootNavigation';

const windowWidth = Dimensions.get('window').width;
export default function CafeCard({ cafe, parentFocused }) {
  const [distance, setDistance] = useState(-1);

  function goToCafeScreen() {
    RootNavigation.navigate('Cafe Screen', {
      cafe,
    });
  }

  useEffect(() => {
    async function prepareComponent() {
      if (parentFocused) {
        const cafeCoords = {
          latitude: cafe.latitude,
          longitude: cafe.longitude,
        };
        const mi = await getDistanceInMiles(cafeCoords);
        setDistance(mi);
      }
    }
    prepareComponent();
  }, [parentFocused]);

  return (
    <TouchableWithoutFeedback
      accessible
      accessibilityLabel="Cafe card"
      accessibilityHint="Navigate to cafe screen"
      accessibilityRole="imagebutton"
      onPress={goToCafeScreen}
    >
      <Card containerStyle={styles.card}>
        <ImageBackground source={{ uri: cafe.photo_path }} style={styles.img}>
          {/* <FavouritesButton /> */}
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.title_row}>
            <Text style={styles.cafeName}>{cafe.location_name}</Text>
            <Text> - </Text>
            <Text style={styles.town}>{cafe.location_town}</Text>
            <View style={styles.distance}>
              {distance > -1 ? <Distance miles={distance} /> : <Text>-</Text>}
            </View>
            {/* <Text style={styles.cafeName}>{cafeId}</Text> */}
            {/* <Distance miles={0} /> */}
          </View>
          <AverageStars
            avg={cafe.avg_overall_rating}
            total={cafe.location_reviews.length}
          />
          <View style={styles.aspectRow}>
            <AspectRating aspect="Quality" rating={cafe.avg_quality_rating} />
            <AspectRating aspect="Price" rating={cafe.avg_price_rating} />
            <AspectRating
              aspect="Cleanliness"
              rating={cafe.avg_clenliness_rating}
            />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
}

CafeCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  cafe: PropTypes.object.isRequired,
  parentFocused: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: windowWidth * 0.8,
    height: 250,
    padding: 0,
    margin: 0,
    marginRight: 5,
  },
  img: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    height: 150,
  },
  favIcon: {
    margin: 10,
  },
  cafeName: {
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: 'bold',
  },
  distance: {
    marginLeft: 'auto',
  },
  body: {
    height: '100%',
    paddingHorizontal: 10,
    paddingVertical: 2,
  },
  title_row: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  aspectRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 8,
  },
});
