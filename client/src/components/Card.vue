<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                {{title}}
            </p>
        </header>
        <div class="card-content">
            <div class="content">
                <slot name="body"></slot>
            </div>
        </div>
        <footer class="card-footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props:{
            title: {type: String, default: 'Test Title'},
            body: {type: HTMLElement},
            footer: {type: HTMLElement}
        }
    }
</script>

<style scoped>

</style>