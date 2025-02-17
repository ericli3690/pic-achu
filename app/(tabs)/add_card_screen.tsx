import { Image, StyleSheet, Platform, Alert, Button, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { updateCardData } from '@/components/card';
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import * as ImagePicker from "expo-image-picker";

import * as FileSystem from 'expo-file-system';
import { getCardsFromGroup } from '@/components/card';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '@/scripts/firebase';
import { getGroupID } from '@/scripts/group';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


export default function AddCardScreen() {
    const [CardName, onChangeCardName] = React.useState("");
    const [CardHealth, onChangeCardHealth] = React.useState(0);
    const [CardDesc, onChangeCardDesc] = React.useState("");
    const [MoveName, onChangeMoveName] = React.useState("");
    const [MoveDesc, onChangeMoveDesc] = React.useState("");
    const [MoveType, onChangeMoveType] = React.useState("");
    const [MovePower, onChangeMovePower] = React.useState(0);
    const [MoveCost, onChangeMoveCost] = React.useState(0);

    useEffect(() => {onChangeMoveCost((+MovePower)/2 + +CardHealth/4);}, [MovePower, CardHealth]);

    const [CurrentCard, SetCurrentCard] = React.useState<{}>({});
    const [displayFile, setDisplayFile] = React.useState("");
    const [file, setFile] = useState("");
    const [error, setError] = useState(null);

    const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

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
                const base64 = (await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })).toString();
                setFile(base64);
                setDisplayFile(result.assets[0].uri);

                // Clear any previous errors
                setError(null);
            }
        }
    };

  return (
    <LinearGradient colors={[ '#fff2d8','#F2D2BD']} style={styles.background}>

    <ScrollView
        style={styles.screen}
      >

    <Text>
    {'\n\n\n'}
    </Text>

      
    <ThemedText type="title" style={styles.titleContainer}>Make Card</ThemedText>
    
    <Text>
    {'\n'}
    </Text>

    <Text style={styles.text}>
        Card Name:
    </Text>
    
    <TextInput
          style={styles.input}
          onChangeText={onChangeCardName}
          value={CardName}
          placeholder=''
          placeholderTextColor='#999999'
        />
    <Button
          title="Add Image"
          onPress={pickImage}
        />
        
        
    
        { file  !== "" && <Image source={{uri: displayFile}}
        style={styles.image} />}

    <Text style={styles.text}>
    {'\n'}
    {"Description:"}
    </Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeCardDesc}
          value={CardDesc}
          placeholder=''
          placeholderTextColor='#999999'
        />

    <Text style={styles.text}>
    {'\n'}
    {"Health:"}
    </Text>
    <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeCardHealth(Number(text))}
          keyboardType='numeric'
          value={CardHealth.toString()}
          placeholder=''
          placeholderTextColor='#999999'
        />
    
    <Text style={styles.text}>
    {'\n'}
    {"Move Name:"}
    </Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveName}
          value={MoveName}
          placeholder=''
          placeholderTextColor='#999999'
        />

    <Text style={styles.text}>
    {'\n'}
    {"Move Description:"}
    </Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveDesc}
          value={MoveDesc}
          placeholder=''
          placeholderTextColor='#999999'
        />

    <Text style={styles.text}>
    {'\n'}
    {"Move Power:"}
    </Text>
    <TextInput
          style={styles.input}
          onChangeText={(text) => onChangeMovePower(Number(text))}
          keyboardType='numeric'
          value={MovePower.toString()}
          placeholder='Move Power'
          placeholderTextColor='#999999'
        />
    
    <Text style={styles.text}>
    {'\n'}
    {"Move Type:"}
    </Text>
    <TextInput
          style={styles.input}
          onChangeText={onChangeMoveType}
          value={MoveType}
          placeholder=''
          placeholderTextColor='#999999'
        />

    <Text style={styles.text}>
        Move Cost: {MoveCost}
    </Text>

    <Button
        title='Clear Fields'
        onPress={() => {
            onChangeCardName("");
            setFile("");
            setDisplayFile("");
            onChangeCardDesc("");
            onChangeCardHealth(0);
            onChangeMoveName("");
            onChangeMoveDesc("");
            onChangeMovePower(0);
            onChangeMoveCost(0);
            onChangeMoveType("");
        }}

    />

    <Button
        title='Make Card'
        onPress={async () => 
            {if (CardName != "" && CardHealth != 0 && MoveName != "" && MovePower != 0 && MoveCost != 0 && file != "") {
                console.log("meow");

                let referenceArray = [];
                try {
                    for (let i = 0; i < file.length; i+=1000000) {
                        const docRef = await addDoc(collection(db, "allGroups", await getGroupID(), "images"), {
                            'val': file.substring(i,i+1000000)
                        });
                        referenceArray.push(docRef.id);
                    }
                } catch (error) {
                    Alert.alert("Oops: " + error);
                }

                const newCard = {
                    name: CardName,
                    description: CardDesc,
                    health: +CardHealth,
                    imgRefs: referenceArray,
                    move: { cost: +MoveCost, description: MoveDesc, power: +MovePower, title: MoveName, type: MoveType },
                };

                SetCurrentCard(newCard);
                await updateCardData(uuidv4().toString(), newCard); // generate new unique id

                Alert.alert('Card Created');
                onChangeCardName("");
                onChangeCardDesc("");
                setFile("");
                setDisplayFile("");
                onChangeCardHealth(0);
                onChangeMoveName("");
                onChangeMoveDesc("");
                onChangeMoveType("");
                onChangeMovePower(0);
                onChangeMoveCost(0);
            } 
            else {
                Alert.alert('Please fill out all fields!');
            }

        }}/>

    <AnimatedLinearGradient
    colors={["rgba(255,255,255, 0)", "rgba(255,255,255, 1)"]}
    />

        
      
    </ScrollView>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
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
    color: '#636363',
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
