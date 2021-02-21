<template>
<button class="btn-return" v-on:mousedown="click">Назад</button>

</template>


<script>

export default {
  name: 'btn-return',
  methods: {
    click (){
      vue.$data.screen = "main-menu"
    }
  }
}
</script>
