<template>
    <div id="main-banner">
        <h1>Fancy Burger LP</h1>
    </div>
</template>

<script>
    export default {
        name: "Banner"
    }
</script>

<style scoped>
    #main-banner {
        background-image: url('C:\Users\laura\OneDrive\Documentos\sites\vue\curso2-vue3\fancy_burger_lp\public\img\burger.jpg');
        background-position: 0 -300px;
        background-size: cover;
        height: 560px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    #main-banner h1 {
        color: #FFF;
        text-align: center;
        font-size: 60px;
        background-color: #222;
        padding: 20px 40px;
    }
</style>