<template>
<transition name="fade">
  
<div class="screen screen__settings">
  <h3>Settings</h3>
<br>
<br>
 <p>Mode</p>
<p>
<input type="radio" id="once" value="once" v-model="mode">
<label for="one">Load resources as you progress</label> 
<br>
<input type="radio" id="all" value="all" v-model="mode">
<label for="all">Load all resources before starting the game</label>  

</p>  
<br>
<p>Text speed</p>
<input  v-model.typespeed="typespeed" type="range" min="0" max="100" value="30" name="range" step="1"/>
{{typespeed}}

<br><br>
<p>Volume</p>
<p>
<input v-model.volume="volume" type="range" min="0" max="500" value="100" name="range" step="1"/>
{{volume}}
</p>
<br>
<p>Zoom</p>
<p>
<input  v-model.scale="scale" type="range" min="50" max="400" value="100" name="range" step="1"/>
{{ scale }}
</p>

 


<btn-return></btn-return>
</div>
</transition>
</template>


<script>
var gameEl = document.getElementsByClassName('game')[0];	
export default {
  name: 'settings',
  data (){
    return {
			scale: vnjs.conf.zoom,
    	typespeed: vnjs.conf.typespeed,
    	volume: vnjs.conf.volume,
      mode: vnjs.sceneLoader.mode
    }
  },
  computed: {

  },
  watch: {
    scale: function(newValue) {
      vnjs.conf.zoom = (newValue*0.01).toFixed();
      gameEl.style.transform = `scale(${newValue*0.01})`;
    },
    typespeed (){
      vnjs.conf.typespeed = this.$data.typespeed;
      //vue.$data.typespeed = this.$data.typespeed;
    },
    volume (){
      vnjs.conf.volume = this.$data.volume;
    },
    mode (){
      vnjs.sceneLoader.mode = this.$data.mode;
    }
  }
}
</script>
