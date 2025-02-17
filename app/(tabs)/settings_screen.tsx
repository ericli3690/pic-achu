import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, Button, Alert, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient colors={['#A9A9A9', '#D3D3D3']} style={styles.background}>
    <ScrollView>
      <Text>
        {'\n'
        }
        {'\n'
        }
        {'\n'
        }
      </Text>

        <Text style={styles.titleContainer}>Settings</Text>
        <Text>
        {'\n'
        }
       
      </Text>


      {
        (currUser != null) ?
        <>

          <Text style={styles.text}>Current User: {currUser.displayName}</Text>
          <Text style={styles.text}>Current User Email: {currUser.email}</Text>
          <Text style={styles.text}>Current Joined Group: {currGroup}</Text>

          <Text>
            {'\n'}
            {'\n'}
          </Text>

          <Text style={styles.loginContainer}>Change Username:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setDisplayName}
            value={displayName}
            placeholder='Enter New Username'
          />


          <TouchableOpacity onPress={async () => {
            if (auth.currentUser) {
              updateProfile(auth.currentUser, {
                displayName: displayName,
              }).then(() => {
                setUpdate(!update);
              }).catch((error) => {
                Alert.alert("Oops: " + error);
              });
              setDisplayName("");
            }
          }} style={styles.ButtonContainer}>
            <Text style={styles.text}>
            Update Username
            </Text>
          </TouchableOpacity>
          <Text>
            {'\n'}
          </Text>



          <Text style={styles.loginContainer}>Join a Group:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setJoinGroupText}
            value={joinGroupText}
            placeholder='Enter Group ID'
          />

          <TouchableOpacity onPress={async () => {
            await setGroupID(joinGroupText);
            setCurrGroup(joinGroupText);
            setJoinGroupText("");
          }} style={styles.ButtonContainer}>
            <Text style={styles.text}>
            Join Group
            </Text>
          </TouchableOpacity>

          <Text>
            {'\n'}
          </Text>

        

          <Text style={styles.loginContainer}>Create a New Group:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewGroupText}
            value={newGroupText}
            placeholder='Enter Group ID'
          />

        <TouchableOpacity onPress={async () => {
            await setGroupID(newGroupText);
            setCurrGroup(newGroupText);
            setNewGroupText("");
          }} style={styles.ButtonContainer}>
            <Text style={styles.text}>
            Create Group
            </Text>
          </TouchableOpacity>

          <Text>
            {'\n'}
          </Text>

          <TouchableOpacity onPress={() => {
            signOut(auth).then(() => {
              setCurrUser(null);
            }).catch((error) => {
              Alert.alert("Oops: " + error);
            })
          }} style={styles.ButtonContainer}>
            <Text style={styles.text}>
            Log Out
            </Text>
          </TouchableOpacity>

          <Text>
            {'\n'}
          </Text>



        </>
        :
        <>
        
          <Text style={styles.loginContainer}>{isNewUser ? "Sign Up" : "Log In"}</Text>

          <Text>
            {'\n'}
          </Text>

          <TouchableOpacity onPress={() => {setIsNewUser(!isNewUser)}} style={styles.ButtonContainer}>
            <Text style={styles.text}>
            {(isNewUser ? "Log In" : "Sign Up") + " Instead"}
            </Text>
          </TouchableOpacity>

          

          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder='Enter Your Email'
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
            placeholder='Enter Your Password'
          />

          <TouchableOpacity onPress={() => {
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
          }} style={styles.ButtonContainer}>
            <Text style={styles.text}>
            {isNewUser ? "Sign Up" : "Log In"}
            </Text>
          </TouchableOpacity>

        </>
      }

      <Text>
        {'\n'}
        {'\n'}
        {'\n'}
        {'\n'}
      </Text>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  ButtonContainer:{
    elevation: 8,
    backgroundColor: "#6495ED",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 70,
    marginRight: 70,
  },
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
  fontSize:40,
  fontFamily: 'Chalkboard SE',
  color: '#111111',
},
loginContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  textAlign: 'center',
  fontSize:30,
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
  
},

});
