import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { PrimaryButton } from '../components/PrimaryButton';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function IngredientsScreen({ navigation, route }) {
    const { ingredients, imageUri } = route.params || {};
    const [currentIngredients, setCurrentIngredients] = useState(ingredients || []);

    const removeIngredient = (index) => {
        const newIngredients = [...currentIngredients];
        newIngredients.splice(index, 1);
        setCurrentIngredients(newIngredients);
    };

    return (
        <ScreenWrapper>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>Pantry Check</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {imageUri && (
                    <Image source={{ uri: imageUri }} style={styles.previewImage} />
                )}

                <Text style={styles.sectionTitle}>We found {currentIngredients.length} items:</Text>

                <View style={styles.chipContainer}>
                    {currentIngredients.map((ing, index) => (
                        <View key={index} style={styles.chip}>
                            <Text style={styles.chipText}>{ing}</Text>
                            <TouchableOpacity onPress={() => removeIngredient(index)}>
                                <Ionicons name="close-circle" size={20} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        </View>
                    ))}
                    <TouchableOpacity style={[styles.chip, styles.addChip]}>
                        <Ionicons name="add" size={20} color={theme.colors.primary} />
                        <Text style={[styles.chipText, { color: theme.colors.primary }]}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <PrimaryButton
                    title="Find Recipes"
                    onPress={() => navigation.navigate('Recipes', { ingredients: currentIngredients })}
                />
            </View>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: theme.spacing.m,
        paddingTop: theme.spacing.m,
        paddingBottom: theme.spacing.l,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        ...theme.typography.h2,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.m,
        paddingBottom: 100,
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: theme.borderRadius.m,
        marginBottom: theme.spacing.l,
    },
    sectionTitle: {
        ...theme.typography.body,
        fontWeight: 'bold',
        marginBottom: theme.spacing.m,
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    chip: {
        backgroundColor: theme.colors.surface,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
    },
    addChip: {
        borderColor: theme.colors.primary,
        borderStyle: 'dashed',
        backgroundColor: 'transparent',
    },
    chipText: {
        color: theme.colors.text,
        marginRight: 8,
        fontSize: 14,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: theme.spacing.l,
        background: 'transparent', // Gradient handles bg
    }
});
