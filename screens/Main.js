import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

import Filter1 from "../components/filter1";
import Filter2 from "../components/filter2";
import Filter3 from "../components/filter3";
import Filter4 from "../components/filter4";
import Filter5 from "../components/filter5";
import Filter6 from "../components/filter6";
import Filter7 from "../components/filter7";
import Filter8 from "../components/filter8";
import Filter9 from "../components/filter9";
import Filter10 from "../components/filter10";

let data = [
  {
    id: '1',
    image: require('../assets/crown.png'),
  },
  {
    id: '2',
    image: require('../assets/halo.png'),
  },
  {
    id: '3',
    image: require('../assets/crown2.png'),
  },
  {
    id: '4',
    image: require('../assets/dog.png'),
  },
  {
    id: '5',
    image: require('../assets/crownf.png'),
  },
  {
    id: '6',
    image: require('../assets/unicorn.png'),
  },
  {
    id: '7',
    image: require('../assets/pirate.png'),
  },
  {
    id: '8',
    image: require('../assets/horn.png'),
  },
  {
    id: '9',
    image: require('../assets/ear.png'),
  },
  {
    id: '10',
    image: require('../assets/hair.png'),
  },
];

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: 'filter_1',
    };
    this.onCameraPermission = this.onCameraPermission.bind(this);
    this.onFacesDetected = this.onFacesDetected.bind(this);
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this);
  }

  componentDidMount() {
    Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
  }

  onCameraPermission({ status }) {
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  onFacesDetected({ faces }) {
    this.setState({ faces: faces });
  }

  onFaceDetectionError(error) {
    console.log(error);
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>No access to camera</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.headingContainer}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.titleText1}>FR</Text>
            <Text style={styles.titleText2}>APP</Text>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            <Text style={styles.subheading1}>Try Our</Text>
            <Text style={styles.subheading2}>Cool Frames</Text>
          </View>
        </View>
        <View style={styles.cameraStyle}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.FaceDetectorMode.fast,
              detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
              runClassifications: FaceDetector.FaceDetectorClassifications.none,
              minDetectionInterval: 100,
              tracking: true,
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map((face) => {
            if (this.state.current_filter === 'filter_1') {
              return <Filter1 key={face.faceID} face={face} />;
            } else if (this.state.current_filter === 'filter_2') {
              return <Filter2 key={face.faceID} face={face} />;
            } else if(this.state.current_filter === 'filter_3'){
              return <Filter3 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_4'){
              return <Filter4 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_5'){
              return <Filter5 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_6'){
              return <Filter6 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_7'){
              return <Filter7 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_8'){
              return <Filter8 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_9'){
              return <Filter9 key={face.faceID} face={face}/>
            }else if(this.state.current_filter === 'filter_10'){
              return <Filter10 key={face.faceID} face={face}/>
            }
            


          })}
        </View>
        <View style={styles.framesContainer}>
          <ScrollView
            style={{ flexDirection: 'row' }}
            horizontal
            showsHorizontalScrollIndicator={false}         
            >
            {data.map((filter_data)=>{
              return (
                <TouchableOpacity style={styles.filterImageContainer}
                onPress={()=>{
                  this.setState({
                    current_filter:`filter_${filter_data.id}`
                  })
                }}
                >
                <Image 
                source={filter_data.image}
                style={{width:80, height:30}}></Image>
                </TouchableOpacity>
              )
            })}
            </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
        backgroundColor:'black'

	},
	droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	headingContainer: {
		flex: 0.1,
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor:'black',
	},
	titleText: {
		fontSize: 30,
        color: 'white',
        fontFamily:'Roboto',
        textShadowColor: 'white',
        textShadowOffset: {width:2, height: 1},
        textShadowRadius: 100,
	},
	cameraStyle: {
		flex: 0.65,
	},
	filterContainer: {},
	actionContainer: {},
});
