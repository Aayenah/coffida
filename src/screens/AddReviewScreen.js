/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import {
  Rating,
  Divider,
  Button,
  Icon,
  Input,
  AirbnbRating,
} from 'react-native-elements';
import PropTypes from 'prop-types';
import colors from '../config/colors';
import AspectRatingColumn from '../components/AspectRatingColumn';
import * as RootNavigation from '../utility/RootNavigation';
import SubmitReviewButton from '../components/SubmitReviewButton';
import { isReviewBodyValid } from '../utility/InputValidator';
import { addNewReview } from '../utility/ReviewHelpers';
import { fetchCafeInfo } from '../utility/CafeHelpers';

export default function AddReviewScreen({ route, navigation }) {
  const [cafe, setCafe] = useState(route.params.cafe);
  const [overall, setOverall] = useState(3);
  const [quality, setQuality] = useState(3);
  const [price, setPrice] = useState(3);
  const [cleanliness, setCleanliness] = useState(3);
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setOverall(3);
    setQuality(3);
    setPrice(3);
    setCleanliness(3);
    setBody('');
    setError('');
    setMessage('');
  }, []);

  // eslint-disable-next-line consistent-return
  async function onSubmitReview() {
    setError('');
    setMessage('');
    if (!isReviewBodyValid(body).valid) {
      return setError(isReviewBodyValid(body).message);
    }

    const reviewObj = {
      overall_rating: overall,
      price_rating: price,
      quality_rating: quality,
      clenliness_rating: cleanliness,
      review_body: body,
    };

    const res = await addNewReview(cafe.location_id, reviewObj);
    console.log(res);
    if (res.ok) {
      // console.log('updating cafe ', cafe.location_id);
      // await updateCafeInfo();
      navigation.navigate('Cafe Screen');
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Overall</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={3}
          size={20}
          showRating={false}
          selectedColor={colors.primary}
          onFinishRating={(value) => setOverall(value)}
        />
      </View>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Quality</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={3}
          size={20}
          showRating={false}
          onFinishRating={(value) => setQuality(value)}
        />
      </View>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Price</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={3}
          size={20}
          showRating={false}
          onFinishRating={(value) => setPrice(value)}
        />
      </View>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Cleanliness</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={3}
          size={20}
          showRating={false}
          onFinishRating={(value) => setCleanliness(value)}
        />
      </View>
      <Text style={styles.error}>{error}</Text>
      <View style={styles.body}>
        <Input
          placeholder="Review"
          value={body}
          multiline
          onChangeText={(value) => setBody(value)}
        />
      </View>
      <View style={styles.submit_row}>
        <SubmitReviewButton onSubmit={onSubmitReview} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  avg_number: {
    fontSize: 24,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    color: colors.bodyText,
    // marginBottom: 10,
  },
  stars: {
    marginRight: 10,
  },
  stars_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 0,
  },
  body: {
    marginVertical: 0,
  },
  submit_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'crimson',
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  msg: {
    color: 'darkgreen',
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
