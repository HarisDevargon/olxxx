import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
async function onFacebookButtonPress() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  nn
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential);
  }
GoogleSignin.configure({
  webClientId: '972118557441-0pttn9p714s9rvla73ug0pqeapbmmf2b.apps.googleusercontent.com',
});
const signInGoogle = async ()=>{
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = await auth.GoogleAuthProvider.credential(idToken);
  const res = await auth().signInWithCredential(googleCredential);
   console.log(res)
}

const LoginScreen = () => {
    return (
        <>
            <View style={styles.container}>
                <Image source={{ uri: "https://bhartiyanaukri.in/wp-content/uploads/2021/08/Olx-Job-Requirement.png" }} style={styles.logo} />
                <Text style={{ fontSize: 20, fontWeight: "bold",marginBottom:5 }}>WELLCOME TO OLX</Text>
                <Text style={{ fontSize: 20 , color:"gray"}}>The trusted community of </Text>
                <Text style={{ fontSize: 20, color:"gray" ,textAlign:"center"}}> buyers and sellers</Text>
            </View>
            <TouchableOpacity onPress={()=>signInGoogle()}>
                <View style={styles.logins}>
                    <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" }} />
                    <Text style={{ marginLeft: 20 }}>Continue with Google</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}>
                <View style={styles.logins}>
                    <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/1200px-2021_Facebook_icon.svg.png" }} />
                    <Text style={{ marginLeft: 20 }}>Continue with Facebook</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.logins}>
                    <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTceyULVCRXuvmH-K_jWCshOuHaIPy5gmYyXJyJo5sYWoD92Sl3LUqSqggLGNgtyau-LAo&usqp=CAU" }} />
                    <Text style={{ marginLeft: 20 }}>Continue with Email</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style={styles.logins}>
                    <Image style={{ width: 20, height: 20, marginLeft: 20 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/0/191.png" }} />
                    <Text style={{ marginLeft: 20 }}>Continue with Phone</Text>
                </View>
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginTop: 20 }}>
                <Text>if you continue, You are accepting</Text>
                <Text style={{ textDecorationLine: "underline" }}>OLX Term and Conditions and Privacy Policy</Text>
            </View>
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    logo: {
        height: 200,
        width: 200,
        resizeMode: 'contain'
    },
    container: {
        alignItems: "center",
        marginBottom: 50,
        marginTop:50
    },
    logins: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        paddingVertical: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    }
})