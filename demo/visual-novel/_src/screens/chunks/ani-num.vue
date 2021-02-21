<template>
<span>{{ animated }}</span>
</template>

<script>

export default {
	name: 'ani-num',
  props: {
    volume: {
      type: Number,
      required: true
    }
  },
	data() {
    return {
      tweeningValue: 0
    }
  },
  computed: {
    animated: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {

    volume: function (newValue) {
     gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    }
  }
}	
</script>