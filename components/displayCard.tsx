import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
import { CardStorage } from '@/components/card';
import { doc, getDoc } from 'firebase/firestore';
import { getGroupID } from '@/scripts/group';
import { db } from '@/scripts/firebase';

export function DisplayCard({currentCard={}, cardWidth, leftLocation, topLocation}: any) { 
  const cardHeight=cardWidth*1.39473684;
  const [base64, setBase64] = useState("");

  useEffect(() => {
    async function reassembleImage() {
      const id = await getGroupID();
      let output = "";
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          output += docSnap.data()['val'];
        } else {
          Alert.alert("Error: Could not find image reference.")
        }
      }
      return output;
    }
    (async () => {
      setBase64(await reassembleImage());
    })();
  }, []);

  return (

    <ImageBackground
    source = {require('../assets/images/gold_card.jpg')}
    style={{
      width: cardWidth,
      height: cardHeight,
      marginLeft: leftLocation,
      marginTop: topLocation
    }}
    imageStyle={{ borderRadius: 10}}>
      
      
      
      
      

      <View style={{flexDirection: 'row'}}>

        <Text style={{marginLeft: cardWidth/11, marginTop: cardHeight/22, fontFamily: 'Futura', fontSize: cardWidth/13, color: 'black', fontWeight: 'bold'}}>
          {currentCard.name}
        </Text>
        <Text style={{flex: 1, marginRight: cardWidth/11, marginTop: cardHeight/20, textAlign:'right', fontFamily: 'Futura', fontSize: cardWidth/17, color: 'black'}}>
          {currentCard.health}
        </Text>

      </View>


      <Image
        source={base64 ? {uri: `data:image/jpg;base64,${base64}`} : require('../assets/images/icon.png')}
        style={{ width:cardWidth/1.2, height: cardHeight/2.27, marginLeft: cardWidth/12 }}

      />





      <Text style={{marginLeft: cardWidth/10, marginRight: cardWidth/10, marginTop: cardHeight/13, fontFamily: 'Futura', fontSize: cardWidth/25, color: '#777777'}}>
        {currentCard.description}
      </Text>



      <View style={{flexDirection: 'row'}}>
      <Text style={{marginLeft: cardWidth/10, marginTop: cardHeight/60, fontFamily: 'Futura', fontSize: cardWidth/18, color: 'black', fontWeight: 'bold'}}>
        {currentCard.move['title']}
      </Text>
      <Text style={{marginRight: cardWidth/10,textAlign:'right',flex:1, marginTop: cardHeight/60, fontFamily: 'Futura', fontSize: cardWidth/18, color: 'black', fontWeight: 'bold'}}>
        {currentCard.move['effect']}  {currentCard.move['cost']}
      </Text>
      </View>
      


      <Text style={{marginLeft: cardWidth/10, marginRight: cardWidth/10, marginTop: 0, fontFamily: 'Futura', fontSize: cardWidth/25, color: '#777777'}}>
        {currentCard.move['description']}
      </Text>
      

    
  
    </ImageBackground>    
  );
}