import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { card, CardStorage } from '@/components/card';

export function DisplayCard({currentCard={}, cardWidth}: any) { 
  let cardHeight=cardWidth*1.39473684;
    return (
  
      <ImageBackground
      source = {require('../assets/images/gold_card.jpg')}
      style={{
        width: cardWidth,
        height: cardHeight,
      }}
      imageStyle={{ borderRadius: 10}}>
        
        
        
        
        

        <View style={{flexDirection: 'row'}}>

        <Text style={{marginLeft: cardWidth/11, marginTop: cardHeight/22, fontFamily: 'Futura', fontSize: cardWidth/13, color: 'black', fontWeight: 'bold'}}>
          {currentCard.title}
        </Text>
        <Text style={{flex: 1, marginRight: cardWidth/11, marginTop: cardHeight/20, textAlign:'right', fontFamily: 'Futura', fontSize: cardWidth/17, color: 'black'}}>
          {currentCard.health}
        </Text>

        </View>


        <Image
          source={require('../assets/images/icon.png')}
          style={{ width:cardWidth/1.2, height: cardHeight/2.27, marginLeft: cardWidth/12 }}

        />





        <Text style={{marginLeft: cardWidth/10, marginRight: cardWidth/10, marginTop: cardHeight/13, fontFamily: 'Futura', fontSize: cardWidth/25, color: '#777777'}}>
          {currentCard.description}
        </Text>



        <View style={{flexDirection: 'row'}}>
        <Text style={{marginLeft: cardWidth/10, marginTop: cardHeight/60, fontFamily: 'Futura', fontSize: cardWidth/18, color: 'black', fontWeight: 'bold'}}>
          {currentCard.move1['title']}
        </Text>
        <Text style={{marginRight: cardWidth/10,textAlign:'right',flex:1, marginTop: cardHeight/60, fontFamily: 'Futura', fontSize: cardWidth/18, color: 'black', fontWeight: 'bold'}}>
          {currentCard.move1['effect']}  {currentCard.move1['cost']}
        </Text>
        </View>
        


        <Text style={{marginLeft: cardWidth/10, marginRight: cardWidth/10, marginTop: 0, fontFamily: 'Futura', fontSize: cardWidth/25, color: '#777777'}}>
          {currentCard.move1['description']}
        </Text>
        
 
      
    
      </ImageBackground>    
    );
  }
  
