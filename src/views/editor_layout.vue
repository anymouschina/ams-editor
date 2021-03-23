<template>
  <div class="editor-layout" ref="editor">
    <div class="engine-pane editor-actionpane"></div>
    <div class="engine-pane editor-dockpane">
      <div class="engine-dock">
        <el-tooltip
          class="item"
          effect="dark"
          content="组件库"
          placement="right"
        >
          <svg-icon
            icon-class="component"
            style="
              fill: var(--color-icon-normal, rgba(31, 56, 88, 0.4));
              transition: fill 0.3s cubic-bezier(0.23, 1, 0.32, 1);
            "
          ></svg-icon>
        </el-tooltip>
        <div class="engine-slate" style="width: 300px">
          <div class="engine-slate-header">
            <div class="engine-slate-tabs">
              <div class="engine-slate-title">
                <div class="engine-slate-tiltle-wrap">
                  <div>组件</div>
                </div>
              </div>
            </div>
          </div>
          <div class="engine-slate-container">
            <div class="engine-prototype-group">
              <div class="engine-group-title">布局</div>
              <div class="engine-group-body" ref="drag-menu">
                <div v-for="item in 4" :key="item" >
                  <div class="engine-prototype-additive">
                    <div class="engine-additive-wrapper">容器{{item}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="engine-pane engine-workspacepane" ref="drag-background">

    </div>
    <div class="engine-pane engine-tabpane"></div>
  </div>
</template>

<script>
export default {
  name: 'editor-layout',
  components: {},
  data(){
    return {
      events:[],
      status:'deactive',
      activeObj:{
        x:0,
        y:0
      }
    }
  },
  mounted(){
    this.$editor.registerOuterDrag(this.$refs['drag-menu'])
    this.$editor.registerInnerDrag(null,this.$refs['drag-background'],{})
    // this.events.push(addEvent(this.$refs['editor'],'mousedown',(e)=>{
    //   // debugger
    //   console.info(e,'当前点击的')
    //   // this.status = 'active'
    // }))
    // this.events.push(addEvent(this.$refs['editor'],'mouseup',(e)=>{
    //   // debugger
    //   this.status = ''
    // }))
    // this.events.push(
    //   throttle(
    //     addEvent(this.$refs['editor'],'mousemove',(e)=>{
    //     if(this.status !== ''){
    //       const {pageX:x,pageY:y} = e;
    //       this.$refs['fixed-item'].style.left = x + 'px';
    //       this.$refs['fixed-item'].style.top = y + 'px'; 
    //     }
    //  })
    //  ,200)
    // )
  },
  beforeDestroy(){
    if (this.events && this.events.length) {
            this.events.forEach(e => e.remove());
        }
  },
  methods:{
    drop(ev){
      var data=ev.dataTransfer.getData("Text");
      ev.target.appendChild(document.getElementById(data));
      // ev.preventDefault();
    },
    allowDrop(ev){
      // ev.preventDefault();
    }
  }
};
</script>
<style lang="scss" scoped>
.hidden-item{
  display: none;

}
.fixed-item{
  position:fixed;
  z-index:1001;
}
.engine-slate-container {
  height: calc(100% - 90px);
  overflow: auto;
  .engine-prototype-group {
    overflow: hidden;
    margin-top: 2px;
    margin-bottom: 3px;
    background: transparent;
    border-radius: 2px;
    .engine-group-title {
      padding: 3px 10px;
      user-select: none;
      text-align: left;
      font-size: 14px;
      line-height: 30px;
      font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
        Helvetica, Arial, sans-serif;
      color: rgba(0, 0, 0, 0.6);
      display: block;
      text-transform: capitalize;
    }
    .engine-group-body {
      background: transparent;
      div {
        .engine-prototype-additive {
          cursor: grab;
          display: block;
          position: relative;
          text-align: center;
          background-color: transparent;
          opacity: 0.8;
          float: left;
          width: 80px;
          height: 88px;
          margin: 0 5px;
          margin-bottom: 10px;
          display: flex;
          flex-direction: column;
          background-color: rgba(31, 56, 88, 0.04);
          border-radius: 3px;
          align-items: center;
          justify-content: center;
          transition: background-color 0.3s cubic-bezier(0.23, 1, 0.32, 1);
          .engine-additive-wrapper {
            position: absolute;
            width: 100%;
            margin-top: 14px;
          }
        }
      }
    }
  }
}
.engine-slate-header {
  box-sizing: border-box;
  height: 39px;
  position: relative;
  background: var(--color-block-background-light, rgba(31, 56, 88, 0.04));
}
.engine-slate-tabs {
  display: flex;
  height: 39px;
  align-items: stretch;
}
.engine-slate-title-wrap {
  display: flex;
  align-items: center;
  padding-left: 12px;
  justify-content: center;
  color: var(--color-title, rgba(0, 0, 0, 0.8));
}
.engine-slate-title {
  flex: 1;
  font-size: 14px;
  line-height: 39px;
  font-family: PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica, Arial,
    sans-serif;
  font-weight: 400;
  color: var(--color-text, rgba(0, 0, 0, 0.6));
  text-align: center;
  border-bottom: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
}
.editor-layout > .engine-pane {
  position: absolute;
  box-sizing: border-box;
}
.engine-slate {
  position: fixed;
  left: 48px;
  top: 48px;
  bottom: 0;
  box-sizing: border-box;
  background: var(--color-pane-background, #fff);
  z-index: 3;
  // display: none;
  border-right: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
}
.engine-dock {
  font-size: 20px;
}
.editor-layout {
  user-select: none;
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  transition: top 0.2s;
  background: var(--color-block-background-shallow, rgba(31, 56, 88, 0.06));
  .engine-tabpane {
    font: 12px/1 PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica,
      Arial, sans-serif;
    font-size: 12px !important;
    color: var(--color-text, rgba(0, 0, 0, 0.6));
    width: 280px;
    bottom: 0;
    right: 0;
    top: 48px;
    background: var(--color-pane-background, #fff);
    z-index: 3;
    transition: transform 0.2s;
  }
  .engine-workspacepane {
    top: 48px;
    left: 48px;
    right: 280px;
    bottom: 0;
    z-index: 1;
    background: var(--color-pane-background, #fff);
    margin: 16px;
  }
  .editor-actionpane {
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: var(--color-pane-background, #fff);
    font: 12px/1 PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica,
      Arial, sans-serif;
    font-size: 14px !important;
    color: var(--color-text, rgba(0, 0, 0, 0.6));
    z-index: 4;
    display: flex;
    border: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
    transition: transform 0.2s, right 0.2s;
  }
  .editor-dockpane {
    font-size: 14px !important;
    left: 0;
    bottom: 0;
    top: 48px;
    padding-top: 15px;
    font: 12px/1 PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica,
      Arial, sans-serif;
    color: var(--color-text, rgba(0, 0, 0, 0.6));
    border-right: 1px solid var(--color-line-normal, rgba(31, 56, 88, 0.1));
    z-index: 4;
    background: var(--color-pane-background, #fff);
    transition: transform 0.2s;
    width: 48px;
  }
}
</style>