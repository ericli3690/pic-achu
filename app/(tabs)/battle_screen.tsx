import { StyleSheet, Image, Platform, View, Text, Dimensions, Button, Alert, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';
import { DisplayCard } from '@/components/displayCard';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function BattleScreen() {
  const [Trophies, onChangeTrophies] = React.useState(0);

  const [IsButtonPressed, SetButtonPressed] = React.useState(false);

  const [AttackButton, SetAttackButton] = React.useState(false);

  const [PassButton, SetPassButton] = React.useState(false);

  const [OppButton, SetOppButton] = React.useState(false);

  const [GiveUp, SetGiveUp] = React.useState(false);

  const [PressedCard, SetCardPressed] = React.useState(false);

  const [cardData, setCardData] = React.useState({});

  const oppHand = [
    {id: 1,
    name: 'yay',
    data: { 
      title: 'BIG CHUNKY', 
      description: 'When he walks, gods tremble (good thing he does not walk)', 
      health: 69, 
      imgString: "placeholder", 
      cost: '4', 
      move1: { cost: 3, description: 'OUCH', effect: 100, title:  'SMACK', type: 'damage' }, 
      move2: { cost: 4, description: 'move2', effect: 8, title: 'move2name', type: 'damage' }, 
      owner: 'owner',
      position: 'n/a' }
    }

  ]
    useEffect(() => {
  
    setCardData(
      { 
      title: 'HEHEHEH', 
      description: 'descasdaisgfaigfuaysgdyuasgdiuasdgsayudfauysfdiuafsd', 
      health: 5, 
      imgString: "placeholder", 
      cost: '4', 
      move1: { cost: 3, description: 'move1arrsdasdabdsjhasdhavsjdhvasjdvajdshvajhsdvajhvsdajvdsaj', effect: 6, title: 'move1name', type: 'damage' }, 
      move2: { cost: 4, description: 'move2', effect: 8, title: 'move2name', type: 'damage' }, 
      owner: 'owner',
      position: 'n/a' });
    }, []);
  
    


  const Hand = [
    {id: 1,
    card: "Mathboy",
    data: { title: 'NERD', description: 'likes math too much', health: 5, imgString: "placeholder", 
      cost: '69', 
      move1: { cost: 3, description: 'Talks about his love of fourier transformations', effect: 12, title: 'Math', type: 'damage' }, 
      move2: { cost: 4, description: 'move2', effect: 8, title: 'move2name', type: 'damage' }, 
      owner: 'owner',
      position: 'n/a' },
  
    },

    {id: 2,
      card: "LeChonk",
      data: { title: 'LOLNO', description: 'descasdaisgfaigfuaysgdyuasgdiuasdgsayudfauysfdiuafsd', health: 5, imgString: "placeholder", 
        cost: '4', 
        move1: { cost: 3, description: 'move1arrsdasdabdsjhasdhavsjdhvasjdvajdshvajhsdvajhvsdajvdsaj', effect: 6, title: 'move1name', type: 'damage' }, 
        move2: { cost: 4, description: 'move2', effect: 8, title: 'move2name', type: 'damage' }, 
        owner: 'owner',
        position: 'n/a' },
    
      }
  ];



  return (
    <LinearGradient colors={['#FFFDD0', '#0000FF']} style={styles.background}>

    <ScrollView
        style={styles.screen}
      >
     <Text>
    {'\n'}
    {'\n'}
    </Text>

    {IsButtonPressed ? 
         <View>  
          <Text style={styles.text}>
         It's time to d-d-d-d-duel
      </Text> 


      

      {PressedCard ?  
      <View>
        <ScrollView style={styles.screen}
        horizontal> 
        {oppHand.map((oppcard, index) => {
        return( 
        <View key={index}> 
          
      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={oppcard.data} cardWidth={0.4*screenWidth} leftLocation={0.3*screenWidth}/>}

              
        </View>)} ) }
      </ScrollView>

        <Text style={styles.text}>

        </Text>
      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={cardData} cardWidth={0.4*screenWidth} leftLocation={0.3*screenWidth}/>}
      <TouchableOpacity style={styles.Button}
      onPress = {() => {SetAttackButton(!AttackButton);}}>
          <Text style={styles.buttonText}>
          Attack!
          </Text>
          </TouchableOpacity>
      
      <TouchableOpacity style={styles.Button}
      onPress = {() => {SetPassButton(!PassButton);}}>
          <Text style={styles.buttonText}>
          Do nothing!
          </Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.Button}
          onPress = {() => {SetCardPressed(false);}}>
              <Text style={styles.buttonText}>
              Switch Card
              </Text>
              </TouchableOpacity>

          {AttackButton ? <View>
            <Text style={styles.text}>
         YOU SPANKED YOUR OPPONENT 
         {'\n'}
         +50 DAMAGE
         {'\n'}
         Waiting on opponent!

      </Text> 
          </View> : <View></View>}
          {PassButton ? <View>
            <Text style={styles.text}> YOU GOT SPANKED 
            {'\n'}
            -50 HP
            </Text>
          </View> : <View></View>}
          </View>
          :

          <View>





<Text style={styles.text}>
  Opponent's Hand 
</Text> 

<ScrollView style= {styles.screen}
          horizontal>

{oppHand.map((oppcard, index) => {
        return( 
        <View key={index}> 
          
      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={oppcard.data} cardWidth={0.4*screenWidth} leftLocation={0.3*screenWidth}/>}

              
        </View>)} ) }
      </ScrollView>

        <Text style={styles.text}>
  Your Hand 
</Text> 

<ScrollView style= {styles.screen}
          horizontal>
{Hand.map((handcard, index) => {
        return( 
        <View key={index}> 
          
          <TouchableOpacity style={styles.CardButton}
          onPress = {() => {
            SetCardPressed(true);
            setCardData(handcard.data);
          }}>
              
              {Object.keys(cardData).length != 0 && <DisplayCard currentCard={handcard.data} cardWidth={0.4*screenWidth}/>}
              </TouchableOpacity>
              
        </View>)} ) }

  </ScrollView>


          </View>
          }
         
     </View>
       : 
       <View>
     <ThemedText type="title" style={styles.titleContainer}>READY TO DDDDUEL?</ThemedText>

     <Text>
    {'\n'}
    {'\n'}
    </Text>
    

    <Text>
    {'\n'}
    {'\n'}
    </Text>
        
    <TouchableOpacity style={styles.Button}
      onPress = {() => {SetButtonPressed(true);}}>
          <Text style={styles.buttonText}>
          Battle!
          </Text>
          </TouchableOpacity>

      <Text style={styles.text}>
              Trophies: {Trophies} 
          </Text>
          </View> }

 
          <TouchableOpacity style={styles.Button}
      onPress = {() => {
        Alert.alert("only nerds give up")
        SetButtonPressed(false);
        onChangeTrophies(Trophies - 1) ;
      }}> 
      <Text style={styles.buttonText}>
          Give Up
          </Text>
          </TouchableOpacity>

</ScrollView>
</LinearGradient>

    
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#FFFDD0',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
    fontFamily: "Times New Roman",
    color: "pink",
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    flex: 1,
    height: screenHeight, 
  },

  Button: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFC0CB",
    padding: 8,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    width: 0.6*screenWidth,
    justifyContent:"center",
    marginLeft: 0.2*screenWidth,

  },
  CardButton: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#FFC0CB",
    padding: 8,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    width: 0.4*screenWidth,
    justifyContent:"center",
    marginLeft: 0.3*screenWidth,
    height: 1.39473684*screenWidth*0.4,


  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 30,
    color: '#022ef0',
    textAlign: 'center',

  },
  screen: {
    flex: 1,

    marginBottom: 80,

},
  sidescreen: {
    flex: 1,

    marginBottom: 80,


},
buttonText: {
  flex: 1,
  flexDirection: "row",
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: 'center',
  alignItems: 'center',
    justifyContent:'center'
},
RTLContainer: {
  flexDirection: 'row-reverse'
},

LTRContainer: {
  flexDirection: 'row'
}

});


