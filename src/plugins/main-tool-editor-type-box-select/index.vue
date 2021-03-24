<template>
    <Container>
        <ElSelect v-model="val" style="width:150px" size="small" >
            <ElOption v-for="item in optionsData" :value="item.value||''" :label="item.text" :key="item.value">{{ item.text }}</ElOption>
        </ElSelect>
    </Container>
</template>

<script>
import * as components from './style';
import {PropertyMixin} from '../../service/main-tool-editor-type-mixin';
export default {
    components: {
        ...components
    },
    mixins:[PropertyMixin],
    position: 'mainToolEditorTypeSelect',
    name: 'main-tool-editor-type-select',
    data () {
        return {
            val: ''
        };
    },
    props: {
        instanceInfo: Object,
        editor: Object
    },
    watch:{
           val: {
            handler (n, o) {
                 if (n === o) {
                    return;
                }
                this.setInstanceProps(n);
            }
        },
    },
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        },
        optionsData () {
            let _data = this.editor.data || [];
            return _data;
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
