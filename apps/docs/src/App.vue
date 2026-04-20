<script setup lang="ts"></script>

<template>
  <rapi-doc
      spec-url = "http://localhost:3000/api/docs/json"
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
