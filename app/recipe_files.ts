
import { recipe, type IngredientsSection, type Recipe, type TextSection,
type ImageSection, 
type RecipeSection} from "./recipe";
import { Uint8Decoder, Uint8Encoder } from "./uint8encoding.js";

// Bytes that should be at the start of every recipe data file. Similar to PNG
// files (see https://en.wikipedia.org/wiki/PNG#File_format)
const ID_BYTES = new Uint8Array([0x89, 0x66, 0x61, 0x6d, 0x69, 0x6c, 0x79, 0x2d,
0x74, 0x72, 0x65, 0x65, 0x0d, 0x0a, 0x1a, 0x0a]);
// Version number of encoding (stored as unsigned 64-bit)
const ENCODING_VERSION = 3n;

// Names of section types
const sectionTypes: RecipeSection["type"][] = ["text", "image", "ingredients"]
// Inverse mapping from section types to indices
const sectionMapping: Map<string, number> = new Map()
sectionTypes.forEach((value, index) => sectionMapping.set(value, index))

/**
 * Opens up the dialog for exporting/downloading the current recipe to a binary
 * data file
 */
export function exportDialog() {
    serializeRecipe(recipe).then((data) => {
        const blob = new Blob([data], {
            type: "application/octet-stream",
        })
        const url = URL.createObjectURL(blob)
        const downloadLink = document.createElement("a")
        downloadLink.href = url
        downloadLink.download = `${toValidFilename(recipe.title)}.recipe`
        downloadLink.click()
        URL.revokeObjectURL(url)
    })
}

/**
 * Remove special characters from a string to make it a valid filename
 * @param str The string to convert
 * @returns The string with special characters removed
 */
function toValidFilename(str: string): string {
    return str.replace(/[^a-zA-Z0-9 _-]/g, "")
}

/**
 * Opens up the dialog for importing a recipe from a binary file
 */
export function importDialog() {
    const inputElement = document.createElement("input")
    inputElement.type = "file"
    inputElement.accept = "*.recipe"
    inputElement.addEventListener("change", () => {
        if (inputElement.files == null || inputElement.files.length == 0)
            return
        const file = inputElement.files[0]
        if (file == undefined)
            return
        file.arrayBuffer().then((buffer) =>
            deserializeRecipe(new Uint8Array(buffer)).then((loadedRecipe) =>
                Object.assign(recipe, loadedRecipe)
            )
        )
    })
    inputElement.click()
}

/**
 * Serialize a recipe so it can be stored as a file
 * @param recipe The recipe to serialize
 * @returns The serialized version of the recipe, as a Uint8Array
 */
async function serializeRecipe(recipe: Recipe): Promise<Uint8Array<ArrayBuffer>>
{
    const encoder = new Uint8Encoder()
    encoder.writeBytes(ID_BYTES)
    encoder.writeInt(ENCODING_VERSION, 8, false)
    encoder.writeString(recipe.title)
    encoder.writeInt(recipe.sections.length, 4, false)
    for (const section of recipe.sections) {
        const index = sectionMapping.get(section.type)
        if (index == undefined)
            throw new Error(`Not inverse mapping for section type ` +
            `${section.type}`)
        encoder.writeInt(index, 4, false)
        switch (section.type) {
            case "text": serializeTextSection(encoder, section); break
            case "image": await serializeImageSection(encoder, section); break
            case "ingredients": serializeIngredientsSection(encoder, section);
                break
        }
    }
    return encoder.data
}

/**
 * Deserialize a recipe from raw data
 * @param data The data to deserialize
 * @returns The deserialized recipe
 */
async function deserializeRecipe(data: Uint8Array<ArrayBuffer>): Promise<Recipe>
{
    const decoder = new Uint8Decoder(data)
    decoder.checkBytes(ID_BYTES)
    const version = decoder.readInt(8, false)
    if (version != ENCODING_VERSION)
        throw new Error(`Incompatible format version, found ${version} while ` +
        `only ${ENCODING_VERSION} is supported`)
    const recipe: Recipe = {
        title: decoder.readString(),
        sections: [],
    }
    const sectionCount = decoder.readInt(4, false)
    for (let i = 0; i < sectionCount; i++) {
        const index = decoder.readInt(4, false)
        const sectionType = sectionTypes[Number(index)]
        if (sectionType == undefined)
            throw new Error(`Unrecognized section type with index ${index}`)
        switch (sectionType) {
            case "text": recipe.sections.push(deserializeTextSection(decoder));
                break
            case "image": recipe.sections.push(await deserializeImageSection(
                decoder)); break
            case "ingredients": recipe.sections.push(
                deserializeIngredientsSection(decoder)); break
        }
    }
    return recipe
}

/**
 * Serialize a text section in a recipe. Section type has already been encoded
 * @param encoder The encoder to write the serialized version to
 * @param section The section to serialize
 */
function serializeTextSection(encoder: Uint8Encoder, section: TextSection) {
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
 * Serialize an image section in a recipe. Section type has already been encoded
 * @param encoder The encoder to write the serialized version to
 * @param section The section to serialize
 */
async function serializeImageSection(encoder: Uint8Encoder, section:
ImageSection) {
    const response = await fetch(section.url)
    const blob = await response.blob()
    encoder.writeString(blob.type)
    encoder.writeInt(blob.size, 4, false)
    encoder.writeBytes(new Uint8Array(await blob.arrayBuffer()))
}

/**
 * Deserialize an image section in a recipe. Section type encoding has already
 * been read
 * @param decoder The decoder to get the serialized data from
 * @returns The deserialized section
 */
async function deserializeImageSection(decoder: Uint8Decoder):
Promise<ImageSection> {
    const mimeType = decoder.readString()
    const length = decoder.readInt(4, false)
    const blob = new Blob([decoder.readBytes(length)], { type: mimeType })
    return {
        type: "image",
        url: URL.createObjectURL(blob)
    }
}

/**
 * Serialize an ingredients section in a recipe. Section type has already been
 * encoded
 * @param encoder The encoder to write the serialized version to
 * @param section The section to serialize
 */
function serializeIngredientsSection(encoder: Uint8Encoder, section:
IngredientsSection) {
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