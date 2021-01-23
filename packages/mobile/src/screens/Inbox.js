import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Untitled23({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.inbox}>Inbox</Text>
      <TouchableOpacity
        style={styles.rect}
        onPress={() => {
          navigation.navigate('ChatScreen');
        }}>
        <View style={styles.iconRow}>
          <FontAwesomeIcon name="user-circle" style={styles.icon}></FontAwesomeIcon>
          <View style={styles.rect2}>
            <View style={styles.gabrielaPepeRow}>
              <Text style={styles.gabrielaPepe}>Gabriela &amp; Pepe</Text>
              <Text style={styles.loremIpsum}>5 min ago</Text>
            </View>
            <Text style={styles.loremIpsum2}>906 Peg Shop St. Franklyn, NY 11209</Text>
            <Text style={styles.loremIpsum3}>
              Lorem ipsum amet sit dolor bipsum consectur aet lorem dolor
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect}
        onPress={() => {
          navigation.navigate('ChatScreen');
        }}>
        <View style={styles.iconRow}>
          <FontAwesomeIcon name="user-circle" style={styles.icon}></FontAwesomeIcon>
          <View style={styles.rect2}>
            <View style={styles.gabrielaPepeRow}>
              <Text style={styles.gabrielaPepe}>Gabriela &amp; Pepe</Text>
              <Text style={styles.loremIpsum}>5 min ago</Text>
            </View>
            <Text style={styles.loremIpsum2}>906 Peg Shop St. Franklyn, NY 11209</Text>
            <Text style={styles.loremIpsum3}>
              Lorem ipsum amet sit dolor bipsum consectur aet lorem dolor
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rect}
        onPress={() => {
          navigation.navigate('ChatScreen');
        }}>
        <View style={styles.iconRow}>
          <FontAwesomeIcon name="user-circle" style={styles.icon}></FontAwesomeIcon>
          <View style={styles.rect2}>
            <View style={styles.gabrielaPepeRow}>
              <Text style={styles.gabrielaPepe}>Gabriela &amp; Pepe</Text>
              <Text style={styles.loremIpsum}>5 min ago</Text>
            </View>
            <Text style={styles.loremIpsum2}>906 Peg Shop St. Franklyn, NY 11209</Text>
            <Text style={styles.loremIpsum3}>
              Lorem ipsum amet sit dolor bipsum consectur aet lorem dolor
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  inbox: {
    // fontFamily: 'roboto-500',
    color: 'rgba(11,64,148,1)',
    fontSize: 24
  },
  rect: {
    width: '100%',
    height: 124,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 15,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    flexDirection: 'row',
    marginTop: 21,
    backgroundColor: '#fff'
    // marginLeft: 21,
  },
  icon: {
    color: 'rgba(128,128,128,1)',
    fontSize: 58,
    height: 58,
    width: 58,
    marginTop: 15
  },
  rect2: {
    width: 264,
    height: 124,
    marginLeft: 2
  },
  gabrielaPepe: {
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18
  },
  loremIpsum: {
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginLeft: 55,
    marginTop: 4
  },
  gabrielaPepeRow: {
    height: 22,
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 11,
    marginRight: 13
  },
  loremIpsum2: {
    // fontFamily: 'roboto-300',
    color: 'rgba(39,170,225,1)',
    fontSize: 13,
    marginTop: 11,
    marginLeft: 12
  },
  loremIpsum3: {
    // fontFamily: 'roboto-regular',
    color: '#121212',
    marginTop: 8,
    marginLeft: 14
  },
  iconRow: {
    height: 124,
    flexDirection: 'row',
    flex: 1,
    marginLeft: 14
  },
  loremIpsum4: {
    top: 72,
    left: 88,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: '#121212'
  },
  rect3: {
    top: 0,
    left: 74,
    width: 264,
    height: 124,
    position: 'absolute'
  },
  rect4: {
    top: 0,
    left: 0,
    width: 338,
    height: 124,
    position: 'absolute',
    shadowColor: 'rgba(0,0,0,1)',
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 60,
    shadowOpacity: 0.1,
    shadowRadius: 20
  },
  loremIpsum4Stack: {
    top: 0,
    left: 0,
    width: 338,
    height: 124,
    position: 'absolute'
  },
  loremIpsum5: {
    top: 48,
    left: 86,
    position: 'absolute',
    // fontFamily: 'roboto-300',
    color: 'rgba(39,170,225,1)',
    fontSize: 13
  },
  loremIpsum6: {
    top: 19,
    left: 268,
    position: 'absolute',
    // fontFamily: 'roboto-regular',
    color: 'rgba(39,170,225,1)',
    fontSize: 13
  },
  gabrielaPepe1: {
    top: 15,
    left: 85,
    position: 'absolute',
    // fontFamily: 'roboto-500',
    color: '#121212',
    fontSize: 18
  },
  icon1: {
    top: 15,
    left: 14,
    position: 'absolute',
    color: 'rgba(128,128,128,1)',
    fontSize: 58
  },
  loremIpsum4StackStack: {
    width: 338,
    height: 124,
    marginTop: 17,
    marginLeft: 21
  }
});

export default Untitled23;
