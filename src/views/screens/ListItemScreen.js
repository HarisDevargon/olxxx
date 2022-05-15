import React,{useEffect,useState} from 'react'
import { View,FlatList,StyleSheet} from 'react-native'
import { Card, Title, Paragraph } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const ListItemScreen = () => {
    const [items,setItems] = useState([])
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
        <Card style={{ width: "45%", alignItems: "center", borderWidth: 0.75, marginHorizontal: 10, marginVertical: 10 }}>
        <Card.Cover source={{ uri: item.image }} style={{ height: 140, width: 160, resizeMode: "cover" }} />
        <Card.Cover source={require('../../assets/heartbg.png')} style={{ height: 35, width: 35, position: "absolute", top: 8, right: 6, resizeMode: "contain", backgroundColor: "lightgrayr" }} />
        <Card.Content >
            <Title>Rs {item.price}</Title>
            <Title style={{ fontSize: 16 }}>{item.title}</Title>
            {/* <Paragraph>{item.location}</Paragraph> */}
        </Card.Content>
    </Card> 
      )
    }
    return (
        <View style={{flex:1}}>
            <FlatList 
            data={items}
            keyExtractor={(item)=>item.image}
            renderItem={({item})=>renderItem(item)}
            numColumns={2}
            inverted={true}
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
    
    

export default ListItemScreen