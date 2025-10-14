
import { reactive } from "vue";

/**
 * Recipe section with text
 */
export type TextSection = {
    type: "text",
    title: string,
    content: string,
}

/**
 * Recipe section with just an image (no title)
 */
export type ImageSection = {
    type: "image",
    url: string,
}

/**
 * Ingredients in an ingredients section
 */
export type Ingredient = {
    // An mount of an ingredient, e.g. "100 g"
    amount: string,
    // The name of the ingredient
    name: string,
    // Whether the checkbox next to the ingredient is checked
    checked: boolean,
}

/**
 * Recipe section with ingredients
 */
export type IngredientsSection = {
    type: "ingredients",
    title: string,
    ingredients: Ingredient[],
}

/**
 * Recipe section with a list of tags
 */
export type TagsSection = {
    type: "tags",
    tags: string[],
}

/**
 * A single step in a list of steps
 */
export type RecipeStep = {
    type: "normal",
    content: string,
}

/**
 * Recipe section with a list of steps
 */
export type StepsSection = {
    type: "steps",
    title: string,
    steps: RecipeStep[],
}

/**
 * Generic type of any recipe section
 */
export type RecipeSection = (TextSection | ImageSection | IngredientsSection |
TagsSection | StepsSection)

/**
 * Type of a recipe
 */
export type Recipe = {
    title: string,
    sections: RecipeSection[],
}

// Global recipe reactive proxy
export const recipe = reactive(defaultRecipe())

/**
 * Reset the recipe to its default value
 */
export function resetRecipe() {
    Object.assign(recipe, defaultRecipe())
}

/**
 * Create an object that stores the default recipe
 * @returns A unique object with the default recipe
 */
function defaultRecipe(): Recipe {
    return {
        title: "Recipe",
        sections: [{
            type: "tags",
            tags: ["kcal:750", "portions:4", "vegan:vegan"],
        }, {
            type: "text",
            title: "Description",
            content: "Lorem ipsum dolor sit, amet consectetur adipisicing " +
            "elit. Consequatur mollitia accusantium aut magnam saepe illo " +
            "tempore nulla voluptatum! Ex, culpa pariatur in tenetur nam " +
            "corporis nulla. Est animi maxime expedita?",
        }, {
            type: "image",
            url: "https://nutrenaworld.com/wp-content/uploads/2024/01/poultry_blog_why-keep-ducks_820x525.jpg",
        }, {
            type: "steps",
            title: "Instructions",
            steps: [{
                type: "normal",
                content: "Start chopping",
            }, {
                type: "normal",
                content: "Put it in a pan",
            }, {
                type: "normal",
                content: "Eat",
            }]
        }],
    }
}