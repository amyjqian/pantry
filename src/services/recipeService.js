import { MOCK_RECIPES, MOCK_SUBSTITUTES } from './mockData';

export const getRecipes = async (ingredients) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return MOCK_RECIPES;
};

export const getSubstitute = async (ingredientName) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return MOCK_SUBSTITUTES[ingredientName] || `No specific substitute found for ${ingredientName}, but you might try omitting it or searching online.`;
};
