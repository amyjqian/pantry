export const MOCK_INGREDIENTS = [
    'Eggs', 'Milk', 'Spinach', 'Tomato', 'Cheese', 'Chicken Breast'
];

export const MOCK_RECIPES = [
    {
        id: 1,
        title: 'Spinach & Chicken Salas',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 1,
        missedIngredients: [{ name: 'Feta Cheese' }],
        usedIngredients: [{ name: 'Spinach' }, { name: 'Chicken Breast' }, { name: 'Tomato' }],
        readyInMinutes: 15,
        instructions: [
            "Wash the fresh spinach leaves thoroughly and dry them.",
            "Season the chicken breast with salt, pepper, and your favorite herbs.",
            "Grill or pan-fry the chicken until cooked through (internal temp 165°F).",
            "Slice the cooked chicken into strips.",
            "Chop the tomatoes and crumble the feta cheese (if available).",
            "Toss the spinach, tomatoes, and chicken in a large bowl.",
            "Drizzle with olive oil and vinegar, then serve immediately."
        ]
    },
    {
        id: 2,
        title: 'Creamy Tomato Pasta',
        image: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=800&q=80',
        usedIngredientCount: 2,
        missedIngredientCount: 2,
        missedIngredients: [{ name: 'Pasta' }, { name: 'Heavy Cream' }],
        usedIngredients: [{ name: 'Tomato' }, { name: 'Cheese' }],
        readyInMinutes: 25,
        instructions: [
            "Boil a large pot of salted water and cook pasta according to package directions.",
            "While pasta cooks, heat olive oil in a large skillet over medium heat.",
            "Add chopped tomatoes (and garlic if you have it) to the skillet and sauté for 5 minutes.",
            "Pour in the heavy cream (or substitute) and simmer for another 5 minutes until slightly thickened.",
            "Stir in the grated cheese until melted and smooth.",
            "Drain the pasta and toss it directly into the sauce.",
            "Season with salt and pepper to taste, and garnish with fresh herbs if desired."
        ]
    },
    {
        id: 3,
        title: 'Morning Omelette',
        image: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800&q=80',
        usedIngredientCount: 3,
        missedIngredientCount: 0,
        missedIngredients: [],
        usedIngredients: [{ name: 'Eggs' }, { name: 'Milk' }, { name: 'Cheese' }],
        readyInMinutes: 10,
        instructions: [
            "Crack the eggs into a bowl and whisk them with the milk, salt, and pepper.",
            "Heat a non-stick skillet over medium heat with a little butter or oil.",
            "Pour the egg mixture into the skillet.",
            "As the eggs begin to set, gently push the edges toward the center with a spatula.",
            "Sprinkle the cheese over the eggs while they are still slightly runny on top.",
            "Fold the omelette in half and cook for another minute until the cheese melts.",
            "Slide onto a plate and serve hot."
        ]
    }
];

export const MOCK_SUBSTITUTES = {
    'Feta Cheese': 'You can use Cottage Cheese or Ricotta as a lower-fat alternative, or Goat Cheese for a similar tang.',
    'Pasta': 'Try Zucchini Noodles (Zoodles) for a low-carb option, or Rice Noodles if you are gluten-free.',
    'Heavy Cream': 'Mix Milk and Butter, or use Coconut Milk for a dairy-free version.',
    'Eggs': 'Use 1/4 cup of Applesauce per egg for baking, or a Flax Egg (1 tbsp flaxseed meal + 3 tbsp water).',
};
