<template>
<transition name="fade">  
<div class="screen screen__main-menu">
  <div class="main-menu__wrapper">
  <div class="main-menu"  v-on:mousedown="clickHandler">
    <div data-id="newgame" class="main-menu__item">Новая игра</div>
  <!-- <div v-if="isStream" data-id="game-return" class="main-menu__item">Вернуться в игру</div>
    -->
    <div data-id="m-card" class="main-menu__item">Карта памяти</div>
   
    <div data-id="settings" class="main-menu__item">Настройки</div>
    <div data-id="about" class="main-menu__item">О проекте</div>
 
  </div>
  </div>
</div>
</transition>
</template>


<script>
export default {

  name: 'main-menu',
  data (){
    return {
     // isStream: true// vue.$data.isStream
    }
  },
  mounted (){
    vnjs.emit('clear', 'show');
    vnjs.emit('clear', 'scene');
    vnjs.emit('audio', 'stop');
    //this.$root.$on('clickMenu', (isStream)=>{
      //this.$data.isStream = isStream
        //console.log(this.$data.isStream)
       //this.isStream = isStream;
     //});

  },
  methods: {
    clickHandler (e){
      var { id } = e.target.dataset;
      
      if(id==='newgame'){

       
        new AudioContext().resume();
        if(vnjs.sceneLoader.mode==='all'){
            vue.$data.screen = 'main-menu';
        }
        this.$nextTick(function () {  
           vnjs.exec({jump: vnjs.sceneLoader.entry});
        })
        
      }
      else if(id==='game-return'){
        vue.$data.screen  = 'stream';
      }
      else{
        vue.$data.screen = id;
      }
    }
  }
}
</script>
