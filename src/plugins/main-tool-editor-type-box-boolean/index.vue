<template>
    <Container>
        <el-switch  v-model="val"></el-switch>
    </Container>
</template>

<script>
import * as components from './style';
import {PropertyMixin} from '../../service/main-tool-editor-type-mixin';
export default {
    components: {
        ...components
    },
    position: 'mainToolEditorTypeBoolean',
    mixins:[PropertyMixin],
    name: 'main-tool-editor-type-boolean',
    data () {
        return {
            val: false
        };
    },
    watch:{
         val: {
            handler (n, o) {
                 if (n === o) {
                    return;
                }
                this.setInstanceProps(n);
            }
        }
    },
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        }
    },
    methods: {
        handleChange () {

        }
    }
};
</script>

<style>

</style>
