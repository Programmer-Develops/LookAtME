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

let data = {
  Crown: [
    {
      id: '1',
      image: require('../assets/crown.png'),
    },

    {
      id: '3',
      image: require('../assets/crown2.png'),
    },

    {
      id: '5',
      image: require('../assets/crownf.png'),
    },
  ],

  Fancy: [
    {
      id: '2',
      image: require('../assets/halo.png'),
    },

    {
      id: '4',
      image: require('../assets/dog.png'),
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
  ],
}

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      faces: [],
      current_filter: 'filter_1',
      selected: "Crown"

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
        <View style={styles.upperContainer}>
          <Image
            source={require("../assets/appIcon.png")}
            style={styles.appIcon}
          />
          <Text style={styles.appName}>Look Me....</Text>
        </View>
        <View style={styles.middleContainer}>
          <Camera
            style={{ flex: 1 }}
            type={Camera.Constants.Type.front}
            faceDetectorSettings={{
              mode: FaceDetector.Constants.Mode.fast,
              detectLandmarks: FaceDetector.Constants.Landmarks.all,
              runClassifications: FaceDetector.Constants.Classifications.all
            }}
            onFacesDetected={this.onFacesDetected}
            onFacesDetectionError={this.onFacesDetectionError}
          />
          {this.state.faces.map(face => (
            <Filter
              key={`face-id-${face.faceID}`}
              face={face}
              source={filters[this.state.current_filter].src}
              width={filters[this.state.current_filter].width}
              height={filters[this.state.current_filter].height}
              left={filters[this.state.current_filter].left}
              right={filters[this.state.current_filter].right}
              top={filters[this.state.current_filter].top}
            />
          ))}
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.lowerTopContainer}>
            <ScrollView
              contentContainerStyle={styles.categories}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {Object.keys(data).map(category => (
                <TouchableOpacity
                  key={`category-button-${category}`}
                  style={[
                    styles.category,
                    {
                      backgroundColor:
                        this.state.selected === category ? "#FFA384" : "#E7F2F8"
                    }
                  ]}
                  onPress={() =>
                    this.setState({
                      selected: category,
                      current_filter: data[category][0].id
                    })
                  }
                >
                  <Text>{category}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={styles.lowerBottomContainer}>
            <ScrollView
              contentContainerStyle={styles.filters}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {data[this.state.selected].map(filter_data => {
                return (
                  <TouchableOpacity
                    key={`filter-button-${filter_data.id}`}
                    style={[
                      styles.filterButton,
                      {
                        borderColor:
                          this.state.current_filter === filter_data.id
                            ? "#FFA384"
                            : "#FFFF"
                      }
                    ]}
                    onPress={() =>
                      this.setState({
                        current_filter: `${filter_data.id}`
                      })
                    }
                  >
                    <Image
                      source={filter_data.src}
                      style={styles.filterImage}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
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

  categories: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  },
  category: {
    width: RFValue(80),
    height: "70%",
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: RFValue(5),
    borderWidth: 2
  },
  
	filterContainer: {},
	actionContainer: {},
});
