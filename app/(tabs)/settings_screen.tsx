import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Button, Alert, TextInput, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { app, db } from '@/scripts/firebase';
import { initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getGroupID, setGroupID } from '@/scripts/group';
import { doc, setDoc } from 'firebase/firestore';

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export default function SettingsScreen() {

  const [isNewUser, setIsNewUser] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [joinGroupText, setJoinGroupText] = useState("");
  const [newGroupText, setNewGroupText] = useState("");

  const [currGroup, setCurrGroup] = useState("");
  const [currUser, setCurrUser] = useState(auth.currentUser);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    (async () => {
      const id = await getGroupID();
      setDisplayName((auth.currentUser && auth.currentUser.displayName) ? auth.currentUser.displayName : "");
      setJoinGroupText(id || "");
      setCurrGroup(id || "");
    })();
  }, [update]);

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

          <Text>Current User: {currUser.displayName}</Text>
          <Text>Current User Email: {currUser.email}</Text>
          <Text>Current Joined Group: {currGroup}</Text>

          <ThemedText type="title">Change Username:</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={setDisplayName}
            value={displayName}
            placeholder='Enter New Username'
          />
          <Button title="Update Username" onPress={async () => {
            if (auth.currentUser) {
              updateProfile(auth.currentUser, {
                displayName: displayName,
              }).then(() => {
                setUpdate(!update);
              }).catch((error) => {
                Alert.alert("Oops: " + error);
              });
            }
          }} />

          <ThemedText type="title">Join a Group:</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={setJoinGroupText}
            value={joinGroupText}
            placeholder='Enter Group ID'
          />
          <Button title="Join Group" onPress={async () => {
            await setGroupID(joinGroupText);
            setCurrGroup(joinGroupText);
          }} />

          <ThemedText type="title">Create a New Group:</ThemedText>
          <TextInput
            style={styles.input}
            onChangeText={setNewGroupText}
            value={newGroupText}
            placeholder='Enter Group ID'
          />
          <Button title="Create Group" onPress={async () => {
            await setGroupID(newGroupText);
            setCurrGroup(newGroupText);
          }} />

          <Button title="Log Out" onPress={() => {
            signOut(auth).then(() => {
              setCurrUser(null);
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
                  setCurrUser(userCredential.user);
                }).catch((error) => {
                    Alert.alert("Oops: " + error);
                });
            } else {
              signInWithEmailAndPassword(auth, username, password)
                .then((userCredential) => {
                  setCurrUser(userCredential.user);
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
