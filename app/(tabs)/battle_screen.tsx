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

  const [attackName, changeAttackName] = React.useState("");

  const [targetedCard, changeTarget] = React.useState({})

  const [Turn, changeTurn] = React.useState(0);

  const [ExistTarget, SetTarget] = React.useState(false);

  const oppHand = [
    {id: 1, //this is a placeholder Id
    name: 'yay',
    data: { 
      name: 'BIG CHUNKY', 
      description: 'When he walks, gods tremble (good thing he does not walk)', 
      health: 69, 
      imgString: "placeholder", 
      cost: '4', 
      move: { cost: 3, description: 'OUCH', effect: 100, title:  'SMACK', type: 'damage' },
      owner: 'owner',
      position: 'n/a' }
    }

  ]
    useEffect(() => {
  
    setCardData(
      { 
      name: 'HEHEHEH', 
      description: 'descasdaisgfaigfuaysgdyuasgdiuasdgsayudfauysfdiuafsd', 
      health: 5, 
      imgString: "placeholder", 
      cost: '4', 
      move: { cost: 3, description: 'move1arrsdasdabdsjhasdhavsjdhvasjdvajdshvajhsdvajhvsdajvdsaj', effect: 6, title: 'move1name', type: 'damage' }, 
      owner: 'owner',
      position: 'n/a' });
    }, []);
  
    
// Hand.data.move1.cost
// Hand['data']['move1']['cost']

  const Hand = [
    {id: 2,
    card: "Mathboy",
    data: { name: 'NERD', description: 'likes math too much', health: 5, imgString: "placeholder", 
      cost: '69', 
      move: { cost: 3, description: 'Talks about his love of fourier transformations', effect: 12, title: 'Math', type: 'damage' }, 
      owner: 'owner',
      position: 'n/a' },
  
    },

    {id: 3,
      card: "LeChonk",
      data: { name: 'LOLNO', description: 'descasdaisgfaigfuaysgdyuasgdiuasdgsayudfauysfdiuafsd', health: 5, imgString: "placeholder", 
        cost: '4', 
        move: { cost: 3, description: 'move1arrsdasdabdsjhasdhavsjdhvasjdvajdshvajhsdvajhvsdajvdsaj', effect: 6, title: 'move1name', type: 'damage' },
        owner: 'owner',
        position: 'n/a' },
    
      }
  ];



  return (
    <LinearGradient colors={[ '#0000FF', '#FFFDD0']} style={styles.background}>

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

{OppButton ?<View>

  <TouchableOpacity style={styles.Button}
          onPress = {() => {
            SetOppButton(false);
          }}>
            <Text style = {styles.text}>
              Back to Field
            </Text>
            </TouchableOpacity>
        
  {Object.keys(cardData).length != 0 && <DisplayCard currentCard={cardData} cardWidth={0.8*screenWidth} leftLocation={0.1*screenWidth}/>}



          

</View> 
: 

<View>

{PressedCard ?  
      <View>

        

        {AttackButton ? 
          <View>
            <ScrollView style={styles.screen} horizontal> 
        {oppHand.map((oppcard, index) => {
        return( 
        <View key={index}> 
          
          <TouchableOpacity style={styles.CardButton}
          onPress = {() => {
            SetTarget(true);
            changeTarget(oppcard.data);
          }}>

      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={oppcard.data} cardWidth={0.4*screenWidth}/>}

      </TouchableOpacity>
              
          
          


        </View>)} ) }
      </ScrollView>

    {Object.keys(cardData).length != 0 && <DisplayCard currentCard={cardData} cardWidth={0.4*screenWidth} leftLocation={0.3*screenWidth}/>}


      {ExistTarget ? <View>
                <Text style={styles.text}>
                  You attacked {targetedCard.name} with {cardData.move.title}

                </Text>
                <TouchableOpacity style={styles.Button}
          onPress = {() => {
            SetPassButton(true);
            SetAttackButton(false);
            SetTarget(false);
          }}>
            
          <Text style={styles.buttonText}>
          Pass
          </Text>

          </TouchableOpacity>
              </View>
              
              :
              
              <View>
              <TouchableOpacity style={styles.Button}
              onPress = {() =>
            {SetAttackButton(false);
            SetTarget(false);}}>

          <Text style={styles.buttonText}>
          Change Targets
          </Text>
          </TouchableOpacity>



                </View>}
         

          </View> : 

          <View>
            
          <ScrollView style={styles.screen}
        horizontal> 
        {oppHand.map((oppcard, index) => {
        return( 
        <View key={index}> 
          
          <TouchableOpacity style={styles.CardButton}
          onPress = {() => {
            SetOppButton(true);
            changeTarget(oppcard.id);
          }}>
      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={oppcard.data} cardWidth={0.4*screenWidth}/>}
      </TouchableOpacity>
              
        </View>)} ) }
      </ScrollView>


      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={cardData} cardWidth={0.4*screenWidth} leftLocation={0.3*screenWidth}/>}
      <TouchableOpacity style={styles.Button}
      
      onPress = {() => {SetAttackButton(true);}}>
          <Text style={styles.buttonText}>
          {attackName}
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
              
            
            
            </View>}
          {PassButton ? <View>
            <Text style={styles.text}> YOU GOT Destroyed
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
          <TouchableOpacity style={styles.CardButton}
          onPress = {() => {
            SetOppButton(true);
            setCardData(oppcard.data);
          }}>
      {Object.keys(cardData).length != 0 && <DisplayCard currentCard={oppcard.data} cardWidth={0.4*screenWidth}/>}
      </TouchableOpacity>
              
              
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
            changeAttackName(handcard.data.move.title);
          }}>
              
              {Object.keys(cardData).length != 0 && <DisplayCard currentCard={handcard.data} cardWidth={0.4*screenWidth}/>}
              </TouchableOpacity>
              
        </View>)} ) }

  </ScrollView>
          </View>
        }
          </View>
          }
         
      <TouchableOpacity style={styles.Button}
      onPress = {() => {
        Alert.alert("only nerds give up")
        SetButtonPressed(false);
        onChangeTrophies(Trophies - 1) ;
        SetAttackButton(false);
        SetOppButton(false);
        SetCardPressed(false);

      }}> 
      <Text style={styles.buttonText}>
          Give Up
          </Text>
          </TouchableOpacity>
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
    color: '#000000',
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


