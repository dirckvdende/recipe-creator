
<script lang="ts" setup>
    import { recipe } from '~/recipe';

    function addTextSection() {
        recipe.sections.push({
            type: "text",
            title: "Description",
            content: "A great recipe!",
        })
    }

    function addIngredientsSection() {
        recipe.sections.push({
            type: "ingredients",
            title: "Ingredients",
            ingredients: [{
                amount: "1",
                name: "onion",
            }, {
                amount: "1 clove",
                name: "garlic",
            }, {
                amount: "150 g",
                name: "white rice",
            }]
        })
    }

    function addStepsSection() {
        // TODO
    }

    function addImageSection() {
        const inputElement = document.createElement("input")
        inputElement.type = "file"
        inputElement.accept = "image/*"
        inputElement.addEventListener("change", () => {
            if (inputElement.files == null || inputElement.files.length == 0)
                return
            const file = inputElement.files[0]
            if (file == undefined)
                return
            recipe.sections.push({
                type: "image",
                url: URL.createObjectURL(file),
            })
        })
        inputElement.click()
    }
</script>

<template>
    <ButtonRow :buttons='[{
        icon: "text_fields",
        text: "Add text",
        action: addTextSection,
    }, {
        icon: "grocery",
        text: "Add ingredients",
        action: addIngredientsSection,
    }, {
        icon: "format_list_numbered",
        text: "Add steps",
    }, {
        icon: "image",
        text: "Add image",
        action: addImageSection,
    }]' />
</template>