export async function setGroupID(val) {
    try {
      await AsyncStorage.setItem('group', val);
    } catch (error) {
      Alert.alert("Oops: " + error);
    }
  }
  
export async function getGroupID() {
try {
    const val = await AsyncStorage.getItem('group') || "";
    if (val == "") {
        throw new Error("You are not in a group yet. Join a group in Settings.")
    }
    return val;
} catch (error) {
    Alert.alert("Oops: " + error);
}
}