
import { recipe, type IngredientsSection, type Recipe, type TextSection,
type ImageSection } from "./recipe";
import { Uint8Decoder, Uint8Encoder } from "./uint8encoding.js";

// Bytes that should be at the start of every recipe data file. Similar to PNG
// files (see https://en.wikipedia.org/wiki/PNG#File_format)
const ID_BYTES = new Uint8Array([0x89, 0x66, 0x61, 0x6d, 0x69, 0x6c, 0x79, 0x2d,
0x74, 0x72, 0x65, 0x65, 0x0d, 0x0a, 0x1a, 0x0a]);
// Version number of encoding (stored as unsigned 64-bit)
const ENCODING_VERSION = 1n;

/**
 * Opens up the dialog for exporting/downloading the current recipe to a binary
 * data file
 */
export function exportDialog() {
    const blob = new Blob([serializeRecipe(recipe)], {
        type: "application/octet-stream",
    })
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement("a")
    downloadLink.href = url
    downloadLink.download = "recipe.dat"
    downloadLink.click()
    URL.revokeObjectURL(url)
}

/**
 * Opens up the dialog for importing a recipe from a binary file
 */
export function importDialog() {
    // TODO
}

/**
 * Serialize a recipe so it can be stored as a file
 * @param recipe The recipe to serialize
 * @returns The serialized version of the recipe, as a Uint8Array
 */
function serializeRecipe(recipe: Recipe): Uint8Array<ArrayBuffer> {
    const encoder = new Uint8Encoder()
    encoder.writeBytes(ID_BYTES)
    encoder.writeInt(ENCODING_VERSION, 8, false)
    encoder.writeString(recipe.title)
    for (const section of recipe.sections) {
        switch (section.type) {
            case "text":
                serializeTextSection(encoder, section)
                break
            case "image":
                serializeImageSection(encoder, section)
                break
            case "ingredients":
                serializeIngredientsSection(encoder, section)
                break
        }
    }
    return encoder.data
}

/**
 * Serialize a text section in a recipe
 * @param encoder The encoder to write the serialized version to
 * @param section The section to serialize
 */
function serializeTextSection(encoder: Uint8Encoder, section: TextSection) {
    encoder.writeInt(0)
    encoder.writeString(section.title)
    encoder.writeString(section.content)
}

/**
 * Deserialize a text section in a recipe. Section type encoding has already
 * been read
 * @param decoder The decoder to get the serialized data from
 * @returns The deserialized section
 */
function deserializeTextSection(decoder: Uint8Decoder): TextSection {
    return {
        type: "text",
        title: decoder.readString(),
        content: decoder.readString(),
    }
}

/**
 * Serialize an image section in a recipe
 * @param encoder The encoder to write the serialized version to
 * @param section The section to serialize
 */
function serializeImageSection(encoder: Uint8Encoder, section: ImageSection) {
    encoder.writeInt(1)
    // TODO
}

/**
 * Deserialize an image section in a recipe. Section type encoding has already
 * been read
 * @param decoder The decoder to get the serialized data from
 * @returns The deserialized section
 */
function deserializeImageSection(decoder: Uint8Decoder): ImageSection {
    // TODO
    return {
        type: "image",
        url: "error",
    }
}

/**
 * Serialize an ingredients section in a recipe
 * @param encoder The encoder to write the serialized version to
 * @param section The section to serialize
 */
function serializeIngredientsSection(encoder: Uint8Encoder, section:
IngredientsSection) {
    encoder.writeInt(2)
    // TODO
}

/**
 * Deserialize an ingredients section in a recipe. Section type encoding has
 * already been read
 * @param decoder The decoder to get the serialized data from
 * @returns The deserialized section
 */
function deserializeIngredientsSection(decoder: Uint8Decoder):
IngredientsSection {
    // TODO
    return {
        type: "ingredients",
        title: "Ingredients"
    }
}