import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { ScreenWrapper } from '../components/ScreenWrapper';
import { theme } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { getSubstitute } from '../services/recipeService';

export default function RecipeDetailScreen({ navigation, route }) {
    const { recipe } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIngredient, setSelectedIngredient] = useState(null);
    const [substitute, setSubstitute] = useState(null);
    const [loadingSub, setLoadingSub] = useState(false);

    const handleIngredientPress = async (ingredient) => {
        setSelectedIngredient(ingredient);
        setModalVisible(true);
        setLoadingSub(true);
        try {
            const result = await getSubstitute(ingredient.name);
            setSubstitute(result);
        } catch (e) {
            setSubstitute("Sorry, couldn't find a substitute.");
        } finally {
            setLoadingSub(false);
        }
    };

    return (
        <ScreenWrapper>
            <ScrollView>
                <Image source={{ uri: recipe.image }} style={styles.heroImage} />
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.content}>
                    <Text style={styles.title}>{recipe.title}</Text>
                    <View style={styles.metaRow}>
                        <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
                        <Text style={styles.metaText}>{recipe.readyInMinutes} mins</Text>
                    </View>

                    <Text style={styles.sectionHeader}>Missing Ingredients (Tap for Substitute)</Text>
                    <View style={styles.list}>
                        {recipe.missedIngredients.map((ing, i) => (
                            <TouchableOpacity key={i} style={styles.missingItem} onPress={() => handleIngredientPress(ing)}>
                                <View style={styles.row}>
                                    <Ionicons name="alert-circle" size={20} color={theme.colors.danger} />
                                    <Text style={styles.missingText}>{ing.name}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color={theme.colors.textSecondary} />
                            </TouchableOpacity>
                        ))}
                    </View>

                    <Text style={styles.sectionHeader}>Your Ingredients</Text>
                    <View style={styles.list}>
                        {recipe.usedIngredients.map((ing, i) => (
                            <View key={i} style={styles.item}>
                                <Ionicons name="checkmark-circle" size={20} color={theme.colors.success} />
                                <Text style={styles.itemText}>{ing.name}</Text>
                            </View>
                        ))}
                    </View>

                    <Text style={styles.sectionHeader}>Instructions</Text>
                    {recipe.instructions ? (
                        recipe.instructions.map((step, index) => (
                            <View key={index} style={styles.instructionRow}>
                                <Text style={styles.stepNumber}>{index + 1}.</Text>
                                <Text style={styles.instructionText}>{step}</Text>
                            </View>
                        ))
                    ) : (
                        <Text style={styles.instructionText}>
                            Instructions not available for this recipe.
                        </Text>
                    )}

                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Substitute for {selectedIngredient?.name}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color={theme.colors.text} />
                            </TouchableOpacity>
                        </View>

                        {loadingSub ? (
                            <ActivityIndicator size="large" color={theme.colors.primary} style={{ margin: 20 }} />
                        ) : (
                            <View style={styles.aiResponse}>
                                <Ionicons name="sparkles" size={24} color={theme.colors.secondary} style={{ marginBottom: 10 }} />
                                <Text style={styles.aiText}>{substitute}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    heroImage: {
        width: '100%',
        height: 300,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 8,
        borderRadius: 20,
    },
    content: {
        padding: theme.spacing.l,
        minHeight: 500,
    },
    title: {
        ...theme.typography.h1,
        fontSize: 28,
        marginBottom: theme.spacing.s,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    metaText: {
        color: theme.colors.textSecondary,
        marginLeft: 6,
    },
    sectionHeader: {
        ...theme.typography.h2,
        fontSize: 18,
        marginTop: theme.spacing.l,
        marginBottom: theme.spacing.m,
    },
    list: {
        marginBottom: theme.spacing.m,
    },
    missingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(239, 68, 68, 0.1)', // Red tint
        padding: 12,
        borderRadius: theme.borderRadius.m,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        marginBottom: 8,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    missingText: {
        color: theme.colors.text,
        marginLeft: 10,
        fontWeight: '600',
    },
    itemText: {
        color: theme.colors.textSecondary,
        marginLeft: 10,
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 12,
        alignItems: 'flex-start', // so numbers stay at top of multi-line text
    },
    stepNumber: {
        ...theme.typography.h3,
        color: theme.colors.primary,
        width: 30, // Fixed width for alignment
        fontWeight: 'bold',
    },
    instructionText: {
        ...theme.typography.body,
        lineHeight: 24,
        color: theme.colors.textSecondary,
        flex: 1, // Take remaining width
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: theme.colors.surface,
        borderTopLeftRadius: theme.borderRadius.xl,
        borderTopRightRadius: theme.borderRadius.xl,
        padding: theme.spacing.l,
        minHeight: 300,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    modalTitle: {
        ...theme.typography.h2,
        fontSize: 20,
    },
    aiResponse: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: theme.spacing.l,
        borderRadius: theme.borderRadius.m,
        alignItems: 'center',
    },
    aiText: {
        ...theme.typography.body,
        textAlign: 'center',
        lineHeight: 24,
    }
});
