
<script setup lang="ts">
    import { resetRecipe } from '~/recipe';
    import NavItem from './NavItem.vue';

    function printAction(): void {
        window.print()
    }
</script>

<template>
    <header>
        <div class="left">
            <h1>{{ $config.public.siteName }}</h1>
        </div>
        <div class="right">
            <ul>
                <NavItem icon="print" :onClick="printAction">
                    Print
                </NavItem>
                <NavItem icon="delete" :onClick="resetRecipe">
                    Reset
                </NavItem>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>

    @use "~/assets/scss/constants.scss";

    header {
        font-weight: bold;
        height: 3.5em;
        background-color: white;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        display: none;
        @media screen { display: flex; }
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 0 1cm;
        user-select: none;
        border-bottom: 2px solid #ddd;

        .left {
            h1 {
                margin: 0;
                font-size: 1.5em;
                font-weight: normal;
            }
        }

        .right {
            height: 100%;
            ul {
                height: 100%;
                padding: 0;
                list-style: none;
                display: flex;
                flex-direction: row;
                align-items: stretch;
                margin: 0;
            }
        }

        @media screen and (max-width: constants.$mobile-width) {
            flex-direction: column;
            align-items: center;
            padding: 1em 0;
            height: auto;

            .left { margin-bottom: .5em; }
        }
    }

</style>