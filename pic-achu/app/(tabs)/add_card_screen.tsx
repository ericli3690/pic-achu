import { Image, StyleSheet, Platform, Alert, Button, TextInput, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { card, CardStorage } from '@/components/card';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from "expo-image-picker";





export default function AddCardScreen() {
    const [CardName, onChangeCardName] = React.useState("");
    const [CardHealth, onChangeCardHealth] = React.useState("");
    const [CardDesc, onChangeCardDesc] = React.useState("");
    const [CardCost, onChangeCardCost] = React.useState("");
    const [MoveName1, onChangeMoveName1] = React.useState("");
    const [MoveName2, onChangeMoveName2] = React.useState("");
    const [MoveDesc1, onChangeMoveDesc1] = React.useState("");
    const [MoveDesc2, onChangeMoveDesc2] = React.useState("");
    const [MoveType1, onChangeMoveType1] = React.useState("");
    const [MoveType2, onChangeMoveType2] = React.useState("");
    const [MovePower1, onChangeMovePower1] = React.useState("");
    const [MovePower2, onChangeMovePower2] = React.useState("");
    const [MoveCost1, onChangeMoveCost1] = React.useState(0);
    const [MoveCost2, onChangeMoveCost2] = React.useState(0);

    const [Card, SetCardData] = React.useState<card[]>([]);

    const [file, setFile] = useState("");

    const [error, setError] = useState(null);
    
    useEffect(() => {onChangeMoveCost1((+MovePower1)/2);}, [MovePower1]);
    useEffect(() => {onChangeMoveCost2((+MovePower2)/2);}, [MovePower2]);

    const pickImage = async () => {
        const { status } = await ImagePicker.
            requestMediaLibraryPermissionsAsync();

        if (status !== "granted") {

            // If permission is denied, show an alert
            Alert.alert(
                "Permission Denied",
                `Sorry, we need camera 
                 roll permission to upload images.`
            );
        } else {

            // Launch the image library and get
            // the selected image
            const result =
                await ImagePicker.launchImageLibraryAsync();

            if (!result.canceled) {

                // If an image is selected (not cancelled), 
                // update the file state variable
                setFile(result.assets[0].uri);

                // Clear any previous errors
                setError(null);
            }
        }
    };


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Add Card</ThemedText>
    </ThemedView>
    
    <TextInput
          style={styles.input}
          onChangeText={onChangeCardName}
          value={CardName}
          placeholder='Enter Card Name'
        />
    <Button
          title="Add Image"
          onPress={pickImage}
        />
    <Image source={{uri: file !=="" ? file : undefined }}
                        style={styles.image} />
    <TextInput
          style={styles.input}
          onChangeText={onChangeCardDesc}
          value={CardDesc}
          placeholder='Enter Card Description'
        />
    <TextInput
          style={styles.input}
          onChangeText={onChangeCardHealth}
          keyboardType='numeric'
          value={CardHealth}
          placeholder='Health'
        />
    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveName1}
          value={MoveName1}
          placeholder='Move 1 Name'
        />
    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveDesc1}
          value={MoveDesc1}
          placeholder='Move 1 Description'
        />
    <TextInput
          style={styles.input}
          onChangeText={onChangeMovePower1}
          keyboardType='numeric'
          value={MovePower1}
          placeholder='Move 1 Power'
        />
    <Text>
        Move 1 Cost: {MoveCost1}
    </Text>

    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveName2}
          value={MoveName2}
          placeholder='Move 2 Name'
        />
    
    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveDesc2}
          value={MoveDesc2}
          placeholder='Move 2 Description'
        />
    <TextInput
          style={styles.input}
          onChangeText={onChangeMovePower2}
          keyboardType='numeric'
          value={MovePower2}
          placeholder='Move 2 Power'
        />

    <Text>
        Move 2 Cost: {MoveCost2}
    </Text>

    <Button
        title='Clear Fields'
        onPress={() => {
            onChangeCardName("");
            setFile("");
            onChangeCardDesc("");
            onChangeCardHealth("");
            onChangeMoveName1("");
            onChangeMoveDesc1("");
            onChangeMovePower1("");
            onChangeMoveName2("");
            onChangeMoveDesc2("");
            onChangeMovePower2("");
        }}

    />

    <Button
        title='Make Card'
        onPress={() => 
            {if (CardName != "" && CardDesc != "" && file != "" && CardHealth != "" && MoveName1 != "" && MoveDesc1 != "" && MovePower1 != "" && MoveName2 != "" && MoveDesc2 != "" && MovePower2 != "") {
                SetCardData([{ title: CardName, 
                    description: CardDesc, 
                    health: +CardHealth, 
                    imgString: file, 
                    cost: CardCost, 
                    move1: { cost: +MoveCost1, description: MoveDesc1, effect: +MovePower1, title: MoveName1, type: MoveType1 }, 
                    move2: { cost: +MoveCost2, description: MoveDesc2, effect: +MovePower2, title: MoveName2, type: MoveType2 }, 
                    owner: 'owner', 
                    position: 'n/a' }]);

                Alert.alert('Card Created');
                onChangeCardName("");
                onChangeCardDesc("");
                setFile("");
                onChangeCardHealth("");
                onChangeMoveName1("");
                onChangeMoveDesc1("");
                onChangeMovePower1("");
                onChangeMoveName2("");
                onChangeMoveDesc2("");
                onChangeMovePower2("");
            } 
            else {
                Alert.alert('Please fill out all fields');
            }

        }}/>


        
      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
    gap: 8,
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
  }
});
