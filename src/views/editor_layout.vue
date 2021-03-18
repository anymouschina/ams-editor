<template>
  <div class="editor-layout">
    <div class="editor-actionpane">
    </div>
    <div class="editor-dockpane">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'editor-layout',
  components: {},
};
</script>
<style lang="scss" scoped>
.editor-layout {
  height:100%;
  width:100%;
  position:relative;
}
.editor-actionpane{
  position:absolute;
  left:0;
  right:0;
  top:0;
  background:yellowgreen;
  height:48px;
}
</style>