import React, {useState} from 'react';
import {StyleSheet, Text, ScrollView} from 'react-native';
import ReviewItem from '../components/ReviewItem';

function Reviews(props) {
  const [data, setData] = useState([
    {
      username: 'Andrew',
      text: 'Very close to Campden market.',
      date: 'May 30, 2019',
    },
    {
      username: 'Paul',
      text: 'Convenient parking, had no issues.',
      date: 'May 27, 2019',
    },
    {
      username: 'Alan',
      text:
        'Great space and bang in the middle of Camden. With the extreme lack of parking in Camden this is fantastic find.',
      date: 'May 22, 2019',
    },
    {
      username: 'Sean',
      text: 'Will definitely be parking here again.',
      date: 'Apr 24, 2019',
    },
  ]);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.reviews}>Reviews</Text>
      <Text style={styles.loremIpsum}>906 Peg Shop St. Franklyn, NY 11209</Text>
      {data.map((d) => (
        <ReviewItem
          key={d.username}
          username={d.username}
          text={d.text}
          date={d.date}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  reviews: {
    // fontFamily: 'roboto-700',
    color: 'rgba(11,64,148,1)',
    fontSize: 28,
    marginTop: 30,
    // marginLeft: 20,
    paddingHorizontal: 20,
  },
  loremIpsum: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 19,
    opacity: 0.75,
    marginTop: 13,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
});

export default Reviews;
