<template>
  <view class="list">
    <view
      class="item"
      v-for="item in list"
      :key="item.al.id"
    >
      <image :src="item.al.picUrl" />
      <view class="desc">
        <view class="item-name">{{item.name}}</view>
        <view class="item-info">{{item.ar[0].name + "-" + item.al.name}}</view>
      </view>

    </view>
  </view>
</template>
<script>
export default {
  props: {
    newList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      list: [],
    }
  },
  watch: {
    newList: function (newVal, oldVal) {
      this.list = newVal;
    }
  },
  methods: {
  },
}
</script>
<style lang="less" scoped>
</style>
