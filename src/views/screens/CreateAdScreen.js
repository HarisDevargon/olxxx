import { StyleSheet, Text, View,Alert, Image, TextInput,Modal, TouchableOpacity, ScrollView, Button } from 'react-native'
import React, { useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const CreateAdScreen = () => {
    const [price, setPrice] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [modal, setModal] = useState(false)
    const [image,setImage] = useState("")

    const postData = async (e)=>{
        if(!price||!title||!desc||!image){
          Alert.alert("All the field should be filled")
          return
        }
        try {
            await firestore().collection('ads')
        .add({
            price,
            title,
            desc, 
            image,
            uid:auth().currentUser.uid,
            name:auth().currentUser.displayName,
            email:auth().currentUser.email,   
            photo:auth().currentUser.photoURL         
        })
        Alert.alert("Your ad has been posted 🙂")
        } 
        catch (error) {
            Alert.alert("Somthing went wrong")
        }
        finally{
            e.preventDefault();
        }
    }
    const openCamera =  ()=>{
        launchCamera({mediaType:'photo',cameraType:'front'},(res)=>
        { console.log('my result is',res) }
     )}
    const pickFromGallery = ()=>{
        launchImageLibrary({quality:0.5},(res)=>{
            //    console.log(res)
            const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(res.assets[0].uri)
            uploadTask.on('state_changed', 
            (snapshot) => {
               
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                 if(progress==100){alert("uploaded")}
            }, 
            (error) => {
               alert("something went wrong")
            }, 
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                   
                    setImage(downloadURL)
                });
            }
            );
           })
    }
    // const pickFromGallery = ()=>{
    //     launchImageLibrary({mediaType:'photo',cameraType:'front'},(res)=>
    //     { console.log('my result is',res) })
    // }
    return (
        <>
            <ScrollView>
                <TouchableOpacity onPress={() => setModal(true)}>
                    {/* <Image style={styles.uploadimg} source={{ uri: image }} /> */}
                    <Text style={{fontSize:20, textAlign:"center",padding:30,margin:20,borderColor:"gray",borderWidth:2}}>Upload Images ➕</Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modal}
                    onRequestClose={() => {
                        setModal(false);
                    }}
                >
                <View style={styles.modals}>
                <TouchableOpacity onPress={()=>openCamera()}  ><Text style={{marginLeft:20, fontWeight:"800",marginTop:20}}>Take a photo</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>pickFromGallery()}><Text style={{marginLeft:20, fontWeight:"800",marginTop:20}}>Pick from gallery</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>setModal(false)}><Text style={{marginLeft:20, fontWeight:"800",marginTop:20}}>Close</Text></TouchableOpacity>
                </View>
                </Modal>
                <Text style={{ marginLeft: 10, color: "gray", fontWeight: "bold" }}>Price*</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
                    onChangeText={text => setPrice(text)}
                    value={price}
                />
                <Text style={{ marginLeft: 10, fontWeight: "bold", marginTop: 5 }}>Type*</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>APPLE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>DANNY TABS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>Q TABS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>SAMSUNG</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>OTHER TABLETS</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: 10, fontWeight: "bold", marginTop: 5 }}>Condition*</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>NEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tabs}>
                        <Text>USED</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{ marginLeft: 10, color: "gray", fontWeight: "bold", marginTop: 20 }}>Ad title*</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
                    onChangeText={text => setTitle(text)}
                    value={title}
                />
                <Text style={{ marginLeft: 10, color: "gray", fontWeight: "bold", marginTop: 20 }}>Describe what you are selling*</Text>
                <TextInput
                    style={{ height: 50, borderColor: 'gray', borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 5 }}
                    onChangeText={text => setDesc(text)}
                    value={desc}
                />
                <View style={{ flexDirection: "row", height: 50, borderColor: 'gray', borderWidth: 1, marginLeft: 10, marginRight: 10, marginTop: 20, marginBottom: 5, alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ marginLeft: 10, paddingVertical: 10 }}>
                        <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Location</Text>
                        <Text>Choose</Text>
                    </View>
                    <Entypo name='chevron-right' size={24} color="black" style={{ marginRight: 20 }} />
                </View>
            </ScrollView>
            <TouchableOpacity disabled={image?false:true} onPress={()=>postData()} style={{ backgroundColor: "#03fcf8", padding: 10, marginTop: 10 }}><Text style={{ textAlign: "center", fontSize: 20, fontWeight: "bold", color: "#fff" }}>Next</Text></TouchableOpacity>
        </>
    )
}

export default CreateAdScreen

const styles = StyleSheet.create({
    uploadimg: {
        width: 320,
        height: 150,
        margin: 30,
        borderRadius: 10
    },
    tabs: {
        backgroundColor: "#dedcdc",
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5
    },
    modals:{
        position: "absolute",
        bottom: 2,
        backgroundColor:"#d9f3fa",
        width:"100%",
        borderTopEndRadius:30,
        borderTopLeftRadius:30,
        height: 150
    }
})