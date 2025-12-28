import { MOCK_INGREDIENTS } from './mockData';

export const identifyIngredients = async (imageUri) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const shuffled = [...MOCK_INGREDIENTS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
};
