
<script setup lang="ts">
import NavItem from './NavItem.vue';
</script>

<template>
    <header>
        <div class="left">
            {{ $config.public.siteName }}
        </div>
        <div class="right">
            <ul>
                <NavItem :onClick="() => console.log('hello')">Click me</NavItem>
                <NavItem>Click me</NavItem>
            </ul>
        </div>
    </header>
</template>

<style lang="scss" scoped>
</style>