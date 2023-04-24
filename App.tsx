/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useRef, useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { RNCamera, } from 'react-native-camera';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const [isRecording, setIsRecording] = useState(false);
  const [path, setPath] = useState('');
  const camera = useRef();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const stopVideo = async () => {
    await camera.current.stopRecording();
    setIsRecording(false);
  }

  const takeVideo = async () => {
    if (camera.current && !isRecording) {
      try {
        const promise = camera.current.recordAsync({
          recordOptions: {
            mute: false,
            maxDuration: 5,
            quality: RNCamera.Constants.VideoQuality['1080p'],
          }
        });

        if (promise) {
          //this.setState({ isRecording: true });
          setIsRecording(true);
          const data = await promise;
          console.log('takeVideo --> ', data);
          setPath(data.uri);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <SafeAreaView>
      <View style={{ display: 'flex', alignItems: 'center' }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />

        <RNCamera ref={camera} style={{ height: 320, width: 480 }} />

        <View style={{ height: 10 }}></View>
        {
          isRecording ?
          <Button title='Stop' onPress={() => stopVideo()} />
          :
          <Button title='Capture' onPress={() => takeVideo()} />
        }

        <TextInput value={path} style={{margin: 10, width: 400}} multiline></TextInput>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
