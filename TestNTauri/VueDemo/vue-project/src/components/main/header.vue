<script setup lang="ts">

</script>

<template>
    <div class="header">
        <img class="logo" src="@/assets/logo.svg" alt="logo" />
        <h1 class="title AwesomeFont">Xioa.Admin</h1>
    </div>
</template>

<style scoped>
.title { 
    margin-left: 10px;
  font-size: 20px;
  font-weight: 600;
  background: linear-gradient(315deg, #18A058 25%, #2080F0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.header{
    height: 48px;
    display: flex;
    align-items: center;
}
.logo{
    margin-left: 10px;
    width: 30px;
    height: 30px;
}
</style>
