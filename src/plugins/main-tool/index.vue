


<template>
    <Container>
        <ElTabs :stretch="true" value="property" style="width: 100%;">
            <ElTabPane label="属性" name="property" >
                <component   :is="item" v-for="(item,index) in applicationState.pluginsBelongKeys['mainToolEditor']" :key="index"></component>
            </ElTabPane>
            <ElTabPane label="组件树" name="componentTree">
                <component  :is="item" v-for="(item,index) in applicationState.pluginsBelongKeys['mainToolTree']" :key="index"></component>
            </ElTabPane>
        </ElTabs>
    </Container>
</template>

<script>
import * as components from './style';
export default {
    components: {
        ...components
    },
    position: 'mainTool',
    name: 'main-tool',
    computed: {
        applicationState () {
            return this.$store.state.application;
        }
    },
    mounted () {}
};
</script>

<style>
#gaea-editor-vue .ivu-tabs {
  width: 100%;
  overflow-y: auto;
}
#gaea-editor-vue .ivu-tabs-nav .ivu-tabs-tab {
  padding: 10px 16px;
}
</style>
