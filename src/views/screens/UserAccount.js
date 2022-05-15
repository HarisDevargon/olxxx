import { StyleSheet, Text, View, TouchableOpacity,Image } from 'react-native'
import React from 'react'
import auth from '@react-native-firebase/auth';
import { Avatar } from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

const UserAccount = () => {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }
  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Avatar.Image size={100} source={{ uri: "https://scontent.flhe2-3.fna.fbcdn.net/v/t1.6435-9/144398947_930493467778868_4604790683936936730_n.jpg?_nc_cat=105&ccb=1-6&_nc_sid=e3f864&_nc_eui2=AeFE0Gt67JdoYK_r1bzv1R1gpjJTjtit8F-mMlOO2K3wX0y4LCqDhAnOi3AAMogh822ytwihraLSzIJKWdovXLtJ&_nc_ohc=o27nJvOsEhIAX9jMnho&_nc_ht=scontent.flhe2-3.fna&oh=00_AT-LBJIgBJbAl1W_Cj80Vtd9RxIXzxuM2qREBbywAoBGMg&oe=62A3B7B4" }} style={{ marginTop: 10 }} />
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold", color: "#363232" }}>Shams Karamat </Text>
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#363232", textDecorationLine: "underline" }}>View and edit profile</Text>
        </View>
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomColor:"gray",borderBottomWidth:0.5,padding:20}}>
        <MaterialIcons name='payment' size={25} color="black" style={{marginRight:20}} />
        <View>
          <Text style={{fontSize:20,fontWeight:"700"}}>Buy Packages & My Order</Text>
          <Text style={{fontSize:14,fontWeight:"700", color:"gray"}}>Packages,order,billing and invoice</Text>
        </View>
        <Entypo name='chevron-right' size={25} color="black" style={{marginLeft:10}} />
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomColor:"gray",borderBottomWidth:0.5,padding:20}}>
        <Feather name='settings' size={25} color="black" />
        <View style={{marginLeft:-100}}>
          <Text style={{fontSize:20,fontWeight:"700"}}>Settings</Text>
          <Text style={{fontSize:14,fontWeight:"700", color:"gray"}}>Privacy and logout</Text>
        </View>
        <Entypo name='chevron-right' size={25} color="black" style={{marginLeft:10}} />
      </View>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderBottomColor:"gray",borderBottomWidth:0.5,padding:20}}>
      <Image source={{uri:"https://upload.wikimedia.org/wikipedia/commons/9/91/Logotyp_OLX_.png"}} style={styles.logos}/>
        <View style={{marginLeft:-60}}>
          <Text style={{fontSize:20,fontWeight:"700"}}>Help & Support</Text>
          <Text style={{fontSize:14,fontWeight:"700", color:"gray"}}>Help center and legal term</Text>
        </View>
        <Entypo name='chevron-right' size={25} color="black" style={{marginLeft:10}} />
      </View>
      <TouchableOpacity onPress={() => logout()} style={{padding:50}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>

  )
}

export default UserAccount

const styles = StyleSheet.create({
  logos:{
    height: 30,
    width: 30,
    borderRadius:50,
    resizeMode:"center"
  }
})