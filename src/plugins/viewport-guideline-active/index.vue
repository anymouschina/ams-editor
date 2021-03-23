<template>
   <div class="container" :style="{...dymStyle}" v-show="isShow" ></div>
</template>

<script>
export default {
    position: 'viewport',
    name: 'viewport-guideline-active',
    computed:{
        currentEditInstanceKey () {
            let currentEditInstanceKey = this.$store.state.viewport.currentEditInstanceKey;
            return currentEditInstanceKey;
        }
    },
    watch:{
        currentEditInstanceKey(){
            this.calc()
        }
    },
    methods: {
        calc () {
            // 正在拖拽中不显示
            if (this.$store.state.viewport.currentDragInfo !== null) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
            // 没有 hover 元素不显示
            if (this.$store.state.viewport.currentHoverInstanceKey === null) {
                this.isShow = false;
                return;
            }
            // 设置  style
            const targetBoundingClientRect = this.$store.state.viewport.instanceDoms.get(this.$store.state.viewport.currentHoverInstanceKey).getBoundingClientRect();
            const viewportBoundingClientRect = this.$store.state.viewport.viewportDOM.getBoundingClientRect();
            this.dymStyle = {
                width: `${targetBoundingClientRect.width - 1}px`,
                height: `${targetBoundingClientRect.height - 1}px`,
                top: `${targetBoundingClientRect.top - viewportBoundingClientRect.top}px`,
                left: `${targetBoundingClientRect.left - viewportBoundingClientRect.left}px`
            };
        }
    },
    data () {
        return {
            timeOut: null,
            dymStyle: null,
            isShow: false
        };
    },
    mounted () {
        // this.calc();
    },
};
</script>

<style lang="scss" scoped>
 .container{
    position: absolute;
    z-index: 10;
    border: 1px solid #2357e5;
    transition: all .07s;
    pointer-events: none;
 }
</style>
