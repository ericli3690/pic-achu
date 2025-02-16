import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { card, CardStorage } from '@/components/card';

export function DisplayCard({currentCard={}, cardWidth}: any) { 
  let cardHeight=cardWidth*1.48528012
    return (
      
      <ImageBackground
      source = {require('../assets/images/card_template.jpg')}
      style={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: 10
      }}>
        
        
        
        

        <View style={{flexDirection: 'row'}}>

        <Text style={{marginLeft: cardWidth/21, marginTop: cardHeight/60, fontFamily: 'Arial', fontSize: cardWidth/12, color: 'black'}}>
          {currentCard.title}
        </Text>
        <Text style={{flex: 1, marginRight: cardWidth/21, marginTop: cardHeight/35, textAlign:'right', fontFamily: 'Arial', fontSize: cardWidth/17, color: 'black'}}>
          Health: {currentCard.health}
        </Text>

        </View>

        <Text style={{marginLeft: cardWidth/20, marginRight: cardWidth/20, marginTop: cardHeight/1.78, fontFamily: 'Arial', fontSize: cardWidth/20, color: 'black'}}>
          {currentCard.description}
        </Text>



        <View style={{flexDirection: 'row'}}>
        <Text style={{marginLeft: cardWidth/20, marginTop: cardHeight/60, fontFamily: 'Arial', fontSize: cardWidth/15, color: 'black'}}>
          {currentCard.move1['title']}
        </Text>
        <Text style={{marginRight: cardWidth/20,textAlign:'right',flex:1, marginTop: cardHeight/60, fontFamily: 'Arial', fontSize: cardWidth/15, color: 'black'}}>
          {currentCard.move1['effect']}  {currentCard.move1['cost']}
        </Text>
        </View>
        


        <Text style={{marginLeft: cardWidth/20, marginRight: cardWidth/20, marginTop: 0, fontFamily: 'Arial', fontSize: cardWidth/20, color: 'black'}}>
          {currentCard.move1['description']}
        </Text>
        
      
      
    
      </ImageBackground>
    );
  }
  
