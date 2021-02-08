import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

export default function ReviewPlaceholder() {
  return (
    <Card containerStyle={styles.placeholder_card}>
      <Placeholder Animation={Fade} style={{ marginBottom: 30 }}>
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
      <Placeholder Animation={Fade}>
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine />
        <PlaceholderLine width={30} />
      </Placeholder>
    </Card>
  );
}

const styles = StyleSheet.create({
  placeholder_card: {
    width: '100%',
    height: 200,
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 20,
    paddingTop: 2,
  },
});
