<template>
<transition name="fade">
<div class="screen screen__stream">
<div class="top-menu">
 <!-- <span class="return-to-main-menu" v-on:click="clickMenu">Меню</span>
 -->
  <top-bar-menu></top-bar-menu>
</div>  
<div class="screen">
  <div  class="dialog-box" v-on:mousedown="clickHandler">
    <div ref="name" class="dialog-box__name"></div>
    <span ref="reply" class="dialog-box__reply"></span>
    <div ref="signal" class="dialog-box__signal"></div>
  </div>
</div>
</div>
</transition>

</template>


<script>
export default {
  name: 'stream',
  mounted (){
    vnjs.$.name = this.$refs.name;
    vnjs.$.reply = this.$refs.reply;
    vnjs.$.signal = this.$refs.signal;
  },
  methods: {
  	 clickHandler(){
        
  	 		vnjs.next();
  	 },
     clickMenu(){
     // this.$root.$emit('clickMenu', true);
       vue.$data.screen = 'main-menu';
     }
  }
}
</script>