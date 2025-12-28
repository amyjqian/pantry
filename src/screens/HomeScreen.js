import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PrimaryButton } from '../components/PrimaryButton';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <ScreenWrapper style={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Ionicons name="fast-food-outline" size={80} color={theme.colors.primary} />
                    <Text style={styles.title}>Pantry Pilot</Text>
                    <Text style={styles.subtitle}>
                        Turn your random ingredients into delicious meals.
                    </Text>
                </View>

                <View style={styles.actionContainer}>
                    <PrimaryButton
                        title="Scan Your Fridge"
                        icon={<Ionicons name="camera" size={24} color="white" />}
                        onPress={() => navigation.navigate('Scan')}
                    />
                </View>
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        padding: theme.spacing.l,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: theme.spacing.xxl,
    },
    title: {
        ...theme.typography.h1,
        marginTop: theme.spacing.m,
        textAlign: 'center',
    },
    subtitle: {
        ...theme.typography.body,
        color: theme.colors.textSecondary,
        textAlign: 'center',
        marginTop: theme.spacing.s,
        maxWidth: '80%',
    },
    actionContainer: {
        width: '100%',
        paddingHorizontal: theme.spacing.l,
    },
});
