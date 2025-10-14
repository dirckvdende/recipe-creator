
<script lang="ts" setup>
    import { displayedErrors, ErrorLevel, type Error } from '~/errors';
</script>

<template>
    <ul :class="$style.container">
        <template v-for="error in displayedErrors">
            <li v-if="error.level == ErrorLevel.Error" :class="$style.error">
                <span :class="$style.icon" class="material-symbols-outlined">
                error</span>
                <span :class="$style.text">{{ error.content }}</span>
            </li>
            <li v-if="error.level == ErrorLevel.Warning"
            :class="$style.warning">
                <span :class="$style.icon" class="material-symbols-outlined">
                warning</span>
                <span :class="$style.text">{{ error.content }}</span>
            </li>
            <li v-if="error.level == ErrorLevel.Note">
                <span :class="$style.icon" class="material-symbols-outlined">
                info</span>
                <span :class="$style.text">{{ error.content }}</span>
            </li>
        </template>
    </ul>
</template>

<style lang="scss" module>
    .container {
        position: fixed;
        bottom: 0;
        right: 0;
        list-style: none;
        padding: 0 0 5pt 0;
        margin: 0;
        display: none;
        @media screen { display: flex; }
        flex-direction: column;
        align-items: stretch;
        width: 400px;
        max-width: 100%;
        font-size: .9em;
        user-select: none;

        li {
            background-color: #c9def5;
            border: 1.5pt solid #a5c6e8;
            border-radius: 3pt;
            color: #215767;
            margin: 3pt 5pt;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            padding: 5pt 8pt;

            &.error {
                border-color: #e68c8c;
                background-color: #f2c4c4;
                color: #942f2f;
            }

            &.warning {
                border-color: #dbbc79;
                background-color: #eddcb7;
                color: #7a5c18;
            }

            .icon {
                margin-right: 10pt;
            }
        }
    }
</style>