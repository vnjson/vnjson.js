<template>
<transition name="fade">

<div class="screen screen__game-menu">
<div class="game-menu">
		<div ref="menu_quetion" id="quetion"></div>
		<div ref="menu_items" id="menu-items" v-on:click="clickHandler"></div>
</div>	
</div>
</transition>
</template>


<script>
export default {
  name: 'gamemenu',
  mounted (){

    vnjs.$.menu_quetion = this.$refs.menu_quetion;
    vnjs.$.menu_items = this.$refs.menu_items;

  },
  methods: {
  	 clickHandler(e){
      var { label } = e.target.dataset;
      this.$nextTick(function () {  
        vnjs.exec({jump: label});
      })
  	 }
  }

}
</script>
