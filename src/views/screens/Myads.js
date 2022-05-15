import React,{useState,useEffect} from 'react'
import { View, Text,FlatList,StyleSheet } from 'react-native'
import auth from '@react-native-firebase/auth'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'


const Myads = () => {
    const [items,setItems] = useState([])
    const [loading,setLoading] = useState(false) 
    const getDetails = async ()=>{
      const querySnap = await firestore().collection('ads')
      .where('uid','==',auth().currentUser.uid)
      .get()
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
            <Card style={styles.card}>
          <Card.Title title={item.title} style={{fontSize:30}} />
          <Card.Content>
            <Paragraph style={{fontSize:16,marginBottom:10}}>{item.desc}</Paragraph>
          </Card.Content>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Actions>
            <Button >Rs :{item.price}/-</Button>
          </Card.Actions>
        </Card>  
        )
      }
  
    return (
        <View style={{flex:1}}>
            <View style={{height:'10%',justifyContent:"space-evenly",alignItems:"center"}}>
              <Text style={{fontSize:10}}>Userid :{auth().currentUser.uid}</Text>
             <Text style={{fontSize:22}}>Your ads!</Text>  
            </View>
            
             <FlatList 
            data={items}
            keyExtractor={(item)=>item.phone}
            renderItem={({item})=>renderItem(item)}
            onRefresh={()=>{
                setLoading(true)
                getDetails()
                setLoading(false)
            }}
            refreshing={loading}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        margin:10,
        elevation:2
    }
     });
export default Myads