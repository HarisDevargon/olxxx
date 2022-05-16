import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Divider,
} from 'react-native-paper';
import React from 'react';
import Catagories from '../../Components/Catagories';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import ListItemScreen from './ListItemScreen';

// const myData = [
//     {
//         image: "https://www.pakmobizone.pk/wp-content/uploads/2021/08/Tecno-Pova-2-Dazzle-Black-2.png",
//         price: "2000",
//         title: "Techno pova",
//         location: "Green Town Lahore",
//     },
//     {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzc3cDawexJCJxBKdOiIn6O5ImMdxseomyuQ&usqp=CAU",
//         price: "25 lac",
//         title: "Hyoundai car",
//         location: "Model Town Lahore",
//     },
//     {
//         image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/A_popular_model_of_ELLIOT_FRANZ%C3%89N.jpg",
//         price: "58000",
//         title: "Gucci Watch",
//         location: "Gucci Store"
//     },
//     {
//         image: "https://5.imimg.com/data5/SELLER/Default/2020/11/QA/PF/BV/89951944/img-20201101-wa0005-500x500.jpg",
//         price: "6000",
//         title: "Phonex Bicycle",
//         location: "Anarkali Bazar"
//     },
//     {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqNvFR863gPrTbji0182SFdty7v4T0BMez-i2tLu9kDlId_Rm5LISp737C-K19AOqF0Cc&usqp=CAU",
//         price: "600",
//         title: "Airpods",
//         location: "Apple Store"
//     },
//     {
//         image: "https://asia.canon/media/image/2020/07/08/f2dd7cc3f2a84967a9815672213d42a9_R6_FrontSlantLeft_RF24-105mmF4LISUSM.png",
//         price: "25000",
//         title: "Camera",
//         location: "Camera Store"
//     },
//     {
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSjrnObGnRgNiexHjp5vPL3GgK0-9fiVxXvVphgM3FpJtkOPlBuIXDgjxCCNzyQYOVffc&usqp=CAU",
//         price: "200",
//         title: "Cap",
//         location: "Anarakli Lahore",
//     },
//     {
//         image: "https://images.91wheels.com/assets/b_images/main/models/profile/profile1640244368.jpg",
//         price: "10 lac",
//         title: "Suziki Bike",
//         location: "Bike station Islamabad",
//     },

// ]
// const renderItem = (item) => {

//     return (
//         <>
//             <Card style={{ width: "45%", alignItems: "center", borderWidth: 0.75, marginHorizontal: 10, marginVertical: 10 }}>
//                 <Card.Cover source={{ uri: item.image }} style={{ height: 140, width: 160, resizeMode: "cover" }} />
//                 <Card.Cover source={require('../../assets/heartbg.png')} style={{ height: 35, width: 35, position: "absolute", top: 8, right: 6, resizeMode: "contain", backgroundColor: "lightgrayt" }} />
//                 <Card.Content >
//                     <Title>Rs {item.price}</Title>
//                     <Title style={{ fontSize: 16 }}>{item.title}</Title>
//                     <Paragraph>{item.location}</Paragraph>
//                 </Card.Content>
//             </Card>
//         </>
//     )
// }

const HomeScreen = ({navigation}) => {
  const [location, setLocation] = React.useState('Green Town Lahore');
  const [search, setSearch] = React.useState(
    'Find Cars,Mobile Phones and more',
  );
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#F5F5F5',
          margin: 5,
        }}>
        <EvilIcons name="location" size={24} color="black" />
        <TextInput
          style={{
            height: 40,
            width: '70%',
          }}
          onChangeText={text => setLocation(text)}
          value={location}
        />
        <MaterialIcons name="expand-more" size={24} color="black" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: '#F5F5F5',
          margin: 5,
        }}>
        <EvilIcons name="search" size={24} color="black" />
        <TextInput
          style={{
            height: 40,
            width: '70%',
          }}
          onChangeText={text => setSearch(text)}
          value={search}
        />
        <AntDesign name="bells" size={24} color="black" />
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 5,
          }}>
          <Text style={{fontWeight: 'bold', color: 'gray'}}>
            Browse Catagories
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SeeAllScreen')}>
            <Text
              style={{
                fontWeight: 'bold',
                textDecorationLine: 'underline',
                color: 'gray',
              }}>
              See all
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Catagories
            img="https://cdn-icons-png.flaticon.com/512/0/191.png"
            color="#fcba03"
            title="Mobile"
          />
          <Catagories
            img="https://cdn3.iconfinder.com/data/icons/car-icons-front-views/451/Compact_Car_Front_View-512.png"
            color="#cbff0f"
            title="Vechicles"
          />
          <Catagories
            img="https://cdn-icons-png.flaticon.com/512/25/25694.png"
            color="#f7ec4a"
            title="Property"
          />
          <Catagories
            img="https://uxwing.com/wp-content/themes/uxwing/download/14-transportation-automotive/bike-motorcycle.png"
            color="#fa52ca"
            title="Bikes"
          />
          <Catagories
            img="https://static.thenounproject.com/png/61386-200.png"
            color="#b156fc"
            title="Animals"
          />
          <Catagories
            img="https://img.favpng.com/12/18/5/job-hunting-computer-icons-icon-design-png-favpng-6fS6cHkESV1BM4ybbm03e0MTK.jpg"
            color="#55faf7"
            title="Jobs"
          />
        </ScrollView>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            borderColor: 'black',
            borderWidth: 1,
            margin: 10,
            justifyContent: 'space-between',
            padding: 10,
            alignItems: 'center',
          }}>
          <AntDesign name="clockcircleo" size={24} color="black" />
          <View>
            <Text>Continue Searching in portion for car</Text>
            <Text>All in Green Town</Text>
          </View>
          <Entypo name="chevron-right" size={24} color="black" />
        </View>
        <Text style={{fontSize: 14, marginLeft: 10, fontWeight: 'bold'}}>
          Our Fresh Recommendation
        </Text>
        {/* <FlatList
                    data={myData}
                    keyExtractor={(item) => item.image}
                    renderItem={({ item }) => renderItem(item)}
                    numColumns={2}
                /> */}
        <ListItemScreen />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
