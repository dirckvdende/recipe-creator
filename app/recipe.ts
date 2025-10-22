
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
 * A normal step in a list of steps
 */
export type NormalRecipeStep = {
    type: "normal",
    content: string,
}

/**
 * A wait step in a list of steps
 */
export type WaitRecipeStep = {
    type: "wait",
    content: string,
}

/**
 * A single step in a list of steps
 */
export type RecipeStep =
    | NormalRecipeStep
    | WaitRecipeStep

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
export type RecipeSection =
    | TextSection
    | ImageSection
    | IngredientsSection
    | TagsSection
    | StepsSection

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
        title: "Recipe Creator",
        sections: [{
            type: "tags",
            tags: ["kcal:350", "portions:4", "vegan:vegan"],
        }, {
            type: "text",
            title: "How to create a recipe",
            content: "This is a simple web-app for creating printable " +
            "cooking recipes. You can add sections by pressing the buttons " +
            "below. Deleting/reordering sections can be done by hoving over " +
            "a section and pressing the buttons on the side.\n\nWhen you " +
            "create your recipe, don't forget to change the title and tags " +
            "above! When you're done, press the 'print' button in the " +
            "top-right corner.\n\nYour progress is not saved when you leave " +
            "this webpage. To continue editing your recipe later, press the " +
            "'export' button at the top and save the downloaded file. If you " +
            "want to continue editing the recipe later you can press the " +
            "'import' button and select the file you downloaded.",
        }, {
            type: "steps",
            title: "Quick start",
            steps: [{
                type: "normal",
                content: "Change the title and tags at the top.",
            }, {
                type: "normal",
                content: "Add text, ingredients, steps and images.",
            }, {
                type: "normal",
                content: "Download/print your recipe by pressing 'print' in " +
                "the top-right.",
            }, {
                type: "normal",
                content: "Enjoy your recipe!",
            }],
        }],
    }
}