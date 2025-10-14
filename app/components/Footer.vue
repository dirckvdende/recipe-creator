
<template>
    <footer :class="$style.footer">View more of my projects at
    <a href="https://dirck.dev/">dirck.dev</a></footer>
</template>

<style lang="scss" module>
    .footer {
        display: none;
        text-align: center;
        width: 100%;
        margin: 4em 0;
        color: #888;
        font-size: .7em;
        @media screen { display: block; }

        a {
            color: inherit;
            &:hover { opacity: .7; }
        }
    }
</style>