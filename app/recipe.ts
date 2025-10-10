
import { reactive, type Reactive } from "vue";

/**
 * Type of a recipe
 */
export type Recipe = {
    title: string,
}

/**
 * Default initialization of recipe
 */
const defaultRecipe: Recipe = {
    title: "Recipe",
}

// Global recipe reactive proxy
export const recipe: Reactive<Recipe> = reactive(defaultRecipe)