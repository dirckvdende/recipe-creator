
<template>
    <div class="container">
        <div>
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
        @media screen {
            padding: 0 1cm;
            margin-top: 6em;
        }

        & > div {
            width: 100%;
            @media screen { max-width: 17cm; }
        }
    }
</style>