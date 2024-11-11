import {Text, View} from 'react-native';
import React, {useRef} from 'react';
import {Button} from 'react-native-paper';
import dgram from 'react-native-udp';
import UdpSocket from 'react-native-udp/lib/types/UdpSocket';

const RecieveScreen = () => {
  const socketRef = useRef<UdpSocket | null>(null);

  const startListening = () => {
    console.log('start listening');

    //udp socket to do the listening
    const socket = dgram.createSocket({
      type: 'udp4',
      reusePort: true,
      debug: true,
    });
    socketRef.current = socket;

    //bind the socket to the port
    socket.bind(3000, () => {
      console.log('binded');

      //listen for messages
      socket.setBroadcast(true);
    });

    //handle incoming messages
    socket.on('message', (msg, rinfo) => {
      console.log(`Message: ${msg} from ${rinfo.address}:${rinfo.port}`);
    });

    // Error handling
    socket.on('error', err => {
      console.error(`Error: ${err.message}`);
      socket.close();
    });
  };

  const stopListening = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };
  return (
    <View>
      <Text style={{}}>RecieveScreen</Text>
      <Button onPress={startListening}>Start Listening</Button>
      <Button onPress={stopListening}>Stop Listening</Button>
    </View>
  );
};

export default RecieveScreen;

// const styles = StyleSheet.create({});
