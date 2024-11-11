import {StyleSheet, View} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {NetworkInfo} from 'react-native-network-info';
import dgram from 'react-native-udp';
import {Button} from 'react-native-paper';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';

// Broadcast every 2 seconds
const BROADCAST_INTERVAL = 2000;
const BROADCAST_PORT = 3000;
const BROADCAST_MESSAGE = JSON.stringify({id: 'device123', name: 'MyDevice'});

const SendScreen = () => {
  const socketRef = useRef<UdpSocket | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startListening = async () => {
    console.log('listenting');

    const ipAddress = await NetworkInfo.getIPAddress();
    console.log('IP Address: ', ipAddress);
    if (!ipAddress) {
      return;
    }

    // broadcast IP (usually ending in 255)
    const broadcastAddress = `${ipAddress
      .split('.')
      .slice(0, 3)
      .join('.')}.255`;
    console.log('Broadcasting to: ', broadcastAddress);

    // initialising udp socket
    const socket = dgram.createSocket({
      type: 'udp4',
      reusePort: true,
      debug: true,
    });
    socketRef.current = socket;

    socket.bind(BROADCAST_PORT, () => {
      console.log('binded');
      intervalRef.current = setInterval(() => {
        socket.send(
          BROADCAST_MESSAGE,
          0,
          BROADCAST_MESSAGE.length,
          BROADCAST_PORT,
          broadcastAddress,
          err => {
            if (err) {
              console.log('Broadcast Error: ', err);
            } else {
              console.log('Broadcasted: ', BROADCAST_MESSAGE);
            }
          },
        );
      }, BROADCAST_INTERVAL);
    });
  };

  const stopListening = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Button onPress={startListening}>Start broadcasting</Button>
      <Button onPress={stopListening} mode="outlined">
        Stop braodcasting
      </Button>
    </View>
  );
};

export default SendScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
