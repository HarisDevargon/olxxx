import React,{useEffect,useState} from 'react'
import { View,FlatList,StyleSheet,Image,TouchableOpacity,Text,Modal} from 'react-native'
import firestore from '@react-native-firebase/firestore';
import {FAB} from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather';

const ChatListScreen = ({navigation}) => {
    const [items,setItems] = useState([])
    const [modal, setModal] = useState(false)
    const [loading,setLoading] = useState(false)  

    const getDetails = async ()=>{
      const querySnap = await firestore().collection('ads').get()
      const result =  querySnap.docs.map(docSnap=>docSnap.data())
      // console.log(result)
      setItems(result)
    }
    useEffect(()=>{
      getDetails()
      return ()=>{
        console.log("cleanup")
      }
    },[])

    const renderItem = (item)=>{
      return(
        <TouchableOpacity >
          <View style={styles.mycard}>
          <View style={{flexDirection:"row", justifyContent:"space-between",flex:1}}>
              <Image source={{uri:item.image}} style={styles.img}/>
              <Image source={{uri:item.photo}} style={styles.photo}/>
              <View style={{paddingHorizontal:45}}>
              <Text style={styles.name}>
                      {item.name}
                  </Text>
                  <Text style={styles.text}>
                      {item.title}
                  </Text>
                  <Text style={styles.text}>
                      {item.price}
                  </Text>
              </View>
          </View>
         <TouchableOpacity onPress={() => setModal(true)}>
         <Feather name="more-vertical" size={30} color="gray"/>
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
                <TouchableOpacity  ><Text style={{marginLeft:20, fontWeight:"800",marginTop:20,color:"red"}}>Delete Chat</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={{marginLeft:20, fontWeight:"800",marginTop:20}}>Mark as important</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>setModal(false)}><Text style={{marginLeft:20, fontWeight:"800",marginTop:20}}>Cancle</Text></TouchableOpacity>
                </View>
                </Modal>
          </View>
          </TouchableOpacity>
      )
    }
    return (
        <View style={{flex:1}}>
            <FlatList 
            data={items}
            keyExtractor={(item)=>item.price}
            renderItem={({item})=>renderItem(item)}
            inverted={true}
            onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
            }}
            refreshing={loading}
            />
            <FAB
                style={styles.fab}
                icon="face-profile"
                color="blue"
                onPress={() => navigation.navigate("ACCOUNT")}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    img:{width:60,height:60,borderRadius:5,backgroundColor:"green"},
    mycard:{
        flexDirection:"row",
        margin:3,
        padding:4,
        backgroundColor:"white",
        borderBottomWidth:1,
        borderBottomColor:'grey'
    },
    fab: {
     position: 'absolute',
     margin: 16,
     right: 0,
     bottom: 0,
     backgroundColor:"white"
   },
   photo:{
       position: "absolute",
       height: 25,
       width: 25,
       borderRadius:50,
       bottom: 15,
       left: 40,
       borderColor:"#ffff",
       borderWidth:0.5
   },
   name:{
       fontSize:18,
   },
   text:{
    fontSize:18,
},
   modals:{
    position: "absolute",
    bottom: 2,
    backgroundColor:"#f5f5f5",
    width:"100%",
    borderTopEndRadius:30,
    borderTopLeftRadius:30,
    height: 150
}
  });
    
    

export default ChatListScreen