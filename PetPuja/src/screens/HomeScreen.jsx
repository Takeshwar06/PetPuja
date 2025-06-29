import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Bell, Search } from 'lucide-react-native';
import { Colors } from '../utils/Constants';
import axios from 'axios';
import { host } from '../services/api';
import Products from '../components/Products';
import BannerSlider from '../components/BannerSlider';

const dummyCategories = [
  { id: '3', name: 'Thali', image: require('../assets/images/logo.png') },
  { id: '4', name: 'Sweets', image: require('../assets/images/logo.png') },
  { id: '5', name: 'South Indian', image: require('../assets/images/logo.png') },
  { id: '6', name: 'Drinks', image: require('../assets/images/logo.png') },
  { id: '7', name: 'Water', image: require('../assets/images/logo.png') },
  { id: '8', name: 'Cocacola', image: require('../assets/images/logo.png') },
  { id: '9', name: 'Chinese', image: require('../assets/images/logo.png') },
  { id: '10', name: 'Ice Creams', image: require('../assets/images/logo.png') },
  { id: '11', name: 'Snacks', image: require('../assets/images/logo.png') },
  { id: '12', name: 'Combo Meals', image: require('../assets/images/logo.png') },
]


export default function HomeScreen() {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${host}/api/v1/products`);
      console.log("getting product from backend--> ",response)
      setProducts(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const renderCategory = ({ item }) => (
    <Pressable onPress={()=>{
      Alert.alert("🔥 Coming Soon", "This feature is under development. Stay tuned! 😎");
    }} style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.name}</Text>
    </Pressable>
  );

  return (
    <>
      <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} />
      <View style={styles.navbar}>
        <Pressable
          style={styles.searchBox}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Text style={{ color: '#888' }}>Search for food...</Text>
          <Search size={18} color={'#888'} />
        </Pressable>
        <TouchableOpacity onPress={()=>navigation.navigate("NotificationScreen")} activeOpacity={0.7}>
          <Bell color={'#fff'} size={25} />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <BannerSlider />
        <Text style={styles.sectionTitle}>Categories</Text>
        <FlatList
          data={dummyCategories}
          renderItem={renderCategory}
          keyExtractor={item => item.id}
          numColumns={5}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={styles.categoryList}
          scrollEnabled={false}
        />

        <Text style={styles.sectionTitle}>Popular Dishes</Text>
        <Products products={products} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 80,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.primary,
  },
  searchBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
    color: Colors.primary,
  },
  categoryList: {
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginBottom: 12,
    width: '18%',
  },
  categoryImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
});
