import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Colors } from '../../utils/Constants';
import { DiamondPlus, LogOut, NotebookPen } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyOrders = [
  {
    orderId: 'ORD123456',
    date: '2025-06-28',
    status: 'Pending',
    totalAmount: '₹450',
    items: 3,
    userMobile: '9876543210',
  },
  {
    orderId: 'ORD123457',
    date: '2025-06-28',
    status: 'Pending',
    totalAmount: '₹320',
    items: 2,
    userMobile: '9123456780',
  },
];

export default function DeliveryPortalScreen() {
  const navigation = useNavigation();
  const handleAccept = orderId => {
    console.log(`Accepted order ${orderId}`);
    // Here you would update the order status or navigate
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('deliveryPartner');
          console.log('Delivery partner logged out');
          navigation.reset({
            index: 0,
            routes: [{ name: 'CustomerLoginScreen' }],
          });
        },
      },
    ]);
  };
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.rowBetween}>
        <Text style={styles.orderId}>{item.orderId}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
      <Text style={styles.info}>Date: {item.date}</Text>
      <Text style={styles.info}>Mobile: {item.userMobile}</Text>
      <Text style={styles.info}>Items: {item.items}</Text>
      <Text style={styles.info}>Total: {item.totalAmount}</Text>

      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.acceptButton}
        onPress={() => handleAccept(item.orderId)}
      >
        <Text style={styles.acceptText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          paddingHorizontal: 16,
          justifyContent: 'space-around',
          flexDirection: 'row',
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('AddProductScreen')}
          style={{ alignItems: 'center' }}
        >
          <DiamondPlus />
          <Text>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <NotebookPen />
          <Text>My Delivery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={{ alignItems: 'center' }}
        >
          <LogOut />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dummyOrders}
        keyExtractor={item => item.orderId}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    padding: 16,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderId: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
  },
  status: {
    color: Colors.primary,
    fontWeight: '600',
  },
  info: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  acceptButton: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  acceptText: {
    color: '#fff',
    fontWeight: '600',
  },
});
