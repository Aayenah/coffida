import React from 'react';
import { View } from 'react-native';
import Carousel from '../components/Carousel';

export default function HomeScreen() {
  const myList = [
    {
      name: 'Cafe North',
      imgUri: 'https://picsum.photos/1000/500',
      avgRating: 3.5,
      totalReviews: 3204,
    },
    {
      name: 'Takk',
      imgUri: 'https://picsum.photos/1100/500',
      avgRating: 4.8,
      totalReviews: 1434,
    },
    {
      name: 'Tim Hurtons',
      imgUri: 'https://picsum.photos/900/500',
      avgRating: 1.0,
      totalReviews: 204,
    },
    {
      name: "Murad's Coffee",
      imgUri: 'https://picsum.photos/950/500',
      avgRating: 2.4,
      totalReviews: 4,
    },
  ];

  return (
    <View>
      <Carousel items={myList} />
    </View>
  );
}
