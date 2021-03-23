<template>
    <Container  :theme="{active:leftTool}" >
        <ElTooltip content="选择控件" placement="right-start">
            <IconContainer @click.native="triggerClick">
                <ElIcon class="el-icon-s-grid"></ElIcon>
            </IconContainer>
        </ElTooltip>
    </Container>
</template>

<script>
import * as components from './style';
export default {
    components,
    position: 'leftBarTop',
    name: 'drage-menu-button',
    data () {
        return {
            isActive: false
        };
    },
    computed: {
        leftTool () {
            return this.$store.state.application.leftTool;
        }
    },
    methods: {
        triggerClick () {
            if (!this.leftTool) {
                this.$store.commit('application/setLeftTool', 'DragMenu');
            } else {
                this.$store.commit('application/setLeftTool', null);
            }
            this.$store.commit('application/setRightTool', null);
        }
    }
};
</script>

<style>

</style>
