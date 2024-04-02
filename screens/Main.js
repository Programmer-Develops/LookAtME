import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	SafeAreaView,
	StatusBar,
	Platform,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as FaceDetector from 'expo-face-detector';

export default class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasCameraPermission: null,
			faces: [],
		};
	}

	componentDidMount() {
		Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission);
	}

	onCameraPermission = (status) => {
		this.setState({ hasCameraPermission: status.status === 'granted' });
	};

	onFacesDetected = (faces) => {
		this.setState({ faces: faces });
	};

	onFaceDetectionError = (error) => {
		console.log(error);
	};

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
		console.log(this.state.faces);
		return (
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.headingContainer}>
					<Text style={styles.titleText}>🦊Look At Me</Text>
				</View>
				<View style={styles.cameraStyle}>
					<Camera
						style={{ flex: 1 }}
						type={Camera.Constants.Type.front}
						faceDetectorSettings={{
							mode: FaceDetector.FaceDetectorMode.fast,
							detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
							runClassifications: FaceDetector.FaceDetectorClassifications.all,
						}}
						onFacesDetected={this.onFacesDetected}
						onFacesDetectionError={this.onFacesDetectionError}
					/>
				</View>
				<View style={styles.filterContainer}></View>
				<View style={styles.actionContainer}></View>
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
