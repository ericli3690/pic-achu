import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Button, Alert, TextInput, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { app } from '@/scripts/firebase';
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import userInfo from '@/scripts/user-info.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getGroupID, setGroupID } from '@/scripts/group';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function SettingsScreen() {

  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [groupText, setGroupText] = useState("");
  const [currUser, setCurrentUser] = useState(auth.currentUser);

  useEffect(() => {
    (async () => {
      const id = await getGroupID();
      setGroupText(id || "");
    })();
  }, []);

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
        <ThemedText type="title">Settings</ThemedText>
      </ThemedView>
      {
        (currUser != null) ?
        <>
          <Text>Current User: {currUser.email}</Text>
          <ThemedText type="title">Join a Group:</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={setGroupText}
            value={groupText}
            placeholder='Enter Group ID'
          />
          <Button title="Join Group" onPress={async () => {await setGroupID(groupText)}} />
          <Button title="Log Out" onPress={() => {
            signOut(auth).then(() => {
              setCurrentUser(null);
            }).catch((error) => {
              Alert.alert("Oops: " + error);
            })
          }} />
        </>
        :
        <>
          <ThemedText type="title">{isNewUser ? "Sign Up" : "Log In"}</ThemedText>
          <Button title={(isNewUser ? "Log In" : "Sign Up") + " Instead"} onPress={() => {setIsNewUser(!isNewUser)}} />
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder='Enter Your Username'
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder='Enter Your Password'
          />
          <Button title={isNewUser ? "Sign Up" : "Log In"} onPress={() => {
            if (isNewUser) {
              createUserWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                  setCurrentUser(userCredential.user);
                }).catch((error) => {
                    Alert.alert("Oops: " + error);
                });
            } else {
              signInWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                  setCurrentUser(userCredential.user);
                }).catch((error) => {
                    Alert.alert("Oops: " + error);
                });
            }
          }} />
        </>
      }
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
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
