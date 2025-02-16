import { StyleSheet, Image, Platform, View, Text, Dimensions, Button, Alert, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { LinearGradient } from 'expo-linear-gradient';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


export default function BattleScreen() {
  const [Trophies, onChangeTrophies] = React.useState(0);

  const [IsButtonPressed, SetButtonPressed] = React.useState(false);

  const [AttackButton, SetAttackButton] = React.useState(false);

  const [PassButton, SetPassButton] = React.useState(false);

  const [GiveUp, SetGiveUp] = React.useState(false);

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
      onPress = {() => {SetGiveUp(true);}}>
          <Text style={styles.buttonText}>
          Give Up
          </Text>
          </TouchableOpacity>


          {AttackButton ? <View>
            <Text style={styles.text}>
         YOU SPANKED YOUR OPPONENT 
         {'\n'}
         +50 DAMAGE

      </Text> 
          </View> : <View></View>}
          {PassButton ? <View>
            <Text style={styles.text}> YOU GOT SPANKED 
            {'\n'}
            -50 HP
            </Text>
          </View> : <View></View>}
          {GiveUp ? <View>

          SetGiveUp{(false)}
          
          </View> : <View></View>}
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
    flexDirection: 'row',
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
    backgroundColor: "#007AFF",
        padding: 8,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 5,

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
buttonText: {
  color: "#FFFFFF",
  fontSize: 16,
  fontWeight: "bold",
  textAlign: 'center',
},

});


