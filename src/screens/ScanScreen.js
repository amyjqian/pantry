import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { identifyIngredients } from '../services/visionService';

export default function ScanScreen({ navigation }) {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const cameraRef = useRef(null);
    const [isProcessing, setIsProcessing] = useState(false);

    if (!permission) {
        // Camera permissions are still loading
        return <View />;
    }

    if (!permission.granted) {
        return (
            <ScreenWrapper style={styles.permissionContainer}>
                <Text style={styles.permissionText}>We need your permission to show the camera</Text>
                <TouchableOpacity style={styles.permButton} onPress={requestPermission}>
                    <Text style={styles.permButtonText}>Grant Permission</Text>
                </TouchableOpacity>
            </ScreenWrapper>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current && !isProcessing) {
            setIsProcessing(true);
            try {
                const photo = await cameraRef.current.takePictureAsync({
                    quality: 0.5,
                    base64: true,
                });

                // Analyze image
                // In a real app we'd pass photo.base64 or photo.uri
                const ingredients = await identifyIngredients(photo.uri);

                navigation.navigate('Ingredients', { ingredients, imageUri: photo.uri });
            } catch (error) {
                Alert.alert('Error', 'Failed to take picture or analyze.');
            } finally {
                setIsProcessing(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                style={styles.camera}
                facing="back"
                ref={cameraRef}
            >
                <View style={styles.overlay}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={28} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Point at your fridge</Text>
                    </View>

                    <View style={styles.footer}>
                        <TouchableOpacity
                            style={styles.captureButton}
                            onPress={takePicture}
                            disabled={isProcessing}
                        >
                            <View style={styles.innerCapture}>
                                {isProcessing && <View style={styles.processingDot} />}
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.tipText}>
                            {isProcessing ? 'Analyzing...' : 'Tap safely to scan'}
                        </Text>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    permissionText: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20
    },
    permButton: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 10
    },
    permButtonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'space-between',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    backButton: {
        padding: 8,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
        textShadowColor: 'rgba(0,0,0,0.5)',
        textShadowRadius: 4,
    },
    footer: {
        paddingBottom: 50,
        alignItems: 'center',
    },
    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'white',
    },
    innerCapture: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    processingDot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
    },
    tipText: {
        color: 'white',
        marginTop: 10,
        fontSize: 14,
        opacity: 0.8,
    },
});
