import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../utils/Constants';

const Products = ({ products }) => {
  const navigation = useNavigation();

  const addToCart = async (product) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      const index = cart.findIndex((item) => item._id === product._id);

      if (index !== -1) {
        // Already exists - prompt to increase quantity
        Alert.alert(
          'Already in Cart',
          'This item is already in your cart. Do you want to increase the quantity?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Yes',
              onPress: async () => {
                cart[index].quantity += 1;
                await AsyncStorage.setItem('cart', JSON.stringify(cart));
              },
            },
          ],
        );
      } else {
        // Not in cart - add with quantity 1
        const productToAdd = {
          ...product,
          quantity: 1,
        };
        cart.push(productToAdd);
        await AsyncStorage.setItem('cart', JSON.stringify(cart));
      }
    } catch (error) {
      console.log('Error adding to cart:', error);
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Pressable
        onPress={() =>
          navigation.push('ProductDetailScreen', { product: item })
        }
      >
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </Pressable>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDesc}>{item.description}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => addToCart(item)}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item._id || item.id}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        paddingHorizontal: 10,
      }}
    />
  );
};

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 8,
    color: '#333',
  },
  productDesc: {
    fontSize: 12,
    height: 25,
    color: '#666',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  addButton: {
    marginTop: 8,
    backgroundColor: Colors.primary,
    paddingVertical: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Products;
