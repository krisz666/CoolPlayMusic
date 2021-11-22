<template>
  <List :newList="track"></List>
</template>
<script>
import songService from '../../api/songService'
import { mapState } from "vuex";
export default {
  data () {
    return {
      tracks: [],
    }
  },
  // onInit () {
  //   this.tracks = this.$store.state.track;
  // },

  computed: {
    ...mapState(['track'])
  },

  methods: {
  },
}
</script>
<style lang="less" scoped>
</style>
