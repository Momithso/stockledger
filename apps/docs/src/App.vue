<script setup lang="ts"></script>

<template>
  <rapi-doc
      spec-url = "https://petstore.swagger.io/v2/swagger.json"
      render-style = "read"
      style = "height:100vh; width:100%;"
  > </rapi-doc>
</template>

<script>
import 'rapidoc';
</script>

<style>
  *, ::before, ::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
</style>
