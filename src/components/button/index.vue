<template>
  <ElButton :type="type" :style="{...styles}">{{text}}{{loading}}</ElButton>
</template>

<script>
import {editSetting} from './property';
export default {
    // props: {
    //     text: {
    //         type: String,
    //         default: 'Button Text'
    //     },
    //     type: String,
    //     styles: Object
    // },
    data () {
        return {
            text: 'Button Text',
            styles: {},
            type: 'default',
            loading:false,
            transparent:false
        };
    },
    editSetting,
    name: editSetting.key
};
</script>

<style>

</style>
