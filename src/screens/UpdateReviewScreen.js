/* eslint-disable import/named */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Input, AirbnbRating } from 'react-native-elements';
import colors from '../config/colors';
import SubmitReviewButton from '../components/SubmitReviewButton';
import { isReviewBodyValid } from '../utility/InputValidator';
import { updateReview } from '../utility/ReviewHelpers';

export default function UpdateReviewScreen({ route, navigation }) {
  const [review, setReview] = useState(route.params.review);
  const [overall, setOverall] = useState(review.review_overallrating);
  const [quality, setQuality] = useState(review.review_qualityrating);
  const [price, setPrice] = useState(review.review_pricerating);
  const [cleanliness, setCleanliness] = useState(
    review.review_clenlinessrating,
  );
  const [body, setBody] = useState(review.review_body);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setOverall(review.review_overallrating);
    setQuality(review.review_qualityrating);
    setPrice(review.review_pricerating);
    setCleanliness(review.review_clenlinessrating);
    setBody(review.review_body);
    setError('');
    setMessage('');
  }, []);

  // eslint-disable-next-line consistent-return
  async function onSubmitUpdate() {
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

    const res = await updateReview(
      review.review_location_id,
      review.review_id,
      reviewObj,
    );

    if (res.ok) {
      navigation.navigate('Cafe Screen');
    } else {
      setError(`Failed to update review - ${res?.status}`);
      Alert.alert('Error', `Failed to update review - ${res?.status}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.stars_row}>
        <Text style={styles.subtitle}>Overall</Text>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'OK', 'Good', 'Excellent']}
          defaultRating={overall}
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
          defaultRating={quality}
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
          defaultRating={price}
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
          defaultRating={cleanliness}
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
        <SubmitReviewButton onSubmit={onSubmitUpdate} />
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
