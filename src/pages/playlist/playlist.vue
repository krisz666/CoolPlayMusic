<template>
  <List :newList="tracks"></List>
</template>
<script>
import songService from '../../api/songService'
export default {
  data () {
    return {
      tracks: [],
    }
  },
  methods: {
  },
}
</script>
<style lang="less" scoped>
</style>
