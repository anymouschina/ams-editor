<template>
  <div :style="{minWidth: '100px',minHeight: '100px',...styles}"  class="gaea-slot" data-slot-name='default' >
    <!-- {{styles}} -->
    <slot></slot>
  </div>
</template>

<script>
import { editSetting } from './property';
export default {
    editSetting,
    name: editSetting.key,
    data () {
        return {
            styles: {
                display: 'flex'
            }
        };
    },
    mounted () {
    }
};
</script>

<style lang="scss" scoped>
.gaea-slot{
  position:static;
}
.react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: 0;
    cursor: nw-resize;
    &:after{
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: "";
      position: absolute;
      right: 3px;
      bottom: 3px;
      width: 8px;
      height: 8px;
      border-right: 2px solid rgba(0,0,0,.4);
      border-bottom: 2px solid rgba(0,0,0,.4);
    }
}

</style>
