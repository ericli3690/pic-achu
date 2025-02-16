import { Image, StyleSheet, Platform, ScrollView, Text, Alert, Button } from 'react-native';
import React, {useEffect} from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from "expo-linear-gradient";
import { DisplayCard } from '@/components/displayCard';

export default function HomeScreen() {
  const [cardData, setCardData] = React.useState({});
  useEffect(() => {

  setCardData({ title: 'hi', 
    description: 'descasdaisgfaigfuaysgdyuasgdiuasdgsayudfauysfdiuafsd', 
    health: 5, 
    imgString: "placeholder", 
    cost: '4', 
    move1: { cost: 3, description: 'move1arrsdasdabdsjhasdhavsjdhvasjdvajdshvajhsdvajhvsdajvdsaj', effect: 6, title: 'move1name', type: 'damage' }, 
    move2: { cost: 4, description: 'move2', effect: 8, title: 'move2name', type: 'damage' }, 
    owner: 'owner',
    position: 'n/a' });
  }, []);
    
  return (
    <LinearGradient colors={['#90ee90', '#e6ffe6']} style={styles.background}>
    <ScrollView style={styles.screen}>
      
          <Text>
          {'\n'}
          {'\n'}
          </Text>
 
        <Text style={styles.titleContainer}>My Deck</Text>


        
        {Object.keys(cardData).length != 0 && <DisplayCard currentCard={cardData} cardWidth={200}/>}
        

        <Button title="Change Deck" onPress= {() => {Alert.alert('hi')}} />
      
      <Text style={styles.titleContainer}>Group Cards</Text>
      
    </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  
  home_card: {
    width: 71.698,
    height: 100,
    borderRadius: 10,
  },
  
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Chalkboard SE',
color: '#636363',
},
background: {
    flex: 1,

},
screen: {
    flex: 1,

    marginBottom: 80,

},
container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
},
header: {
    fontSize: 20,
    marginBottom: 16,
},
button: {
    backgroundColor: "#2D923C",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
},
buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    
},
imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
},
image: {
    width: 158,
    height: 117,
    borderRadius: 8,
},
errorText: {
    color: "red",
    marginTop: 16,
},
titleContainer: {
flexDirection: 'row',
alignItems: 'center',
textAlign: 'center',
gap: 8,
fontFamily: 'Chalkboard SE',
color: '#',
},
stepContainer: {
gap: 8,
marginBottom: 8,
},
reactLogo: {
height: 178,
width: 290,
bottom: 0,
left: 0,
position: 'absolute',
},
input: {
height: 40,
margin: 12,
borderWidth: 1,
borderRadius: 8,
fontFamily: 'Chalkboard SE',

}
});
