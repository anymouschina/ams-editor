<template>
        <div
            v-if="ready"
            :class="'ams-block-' + type" style="position:absolute;" :style="block.style">

            <ams-blocks :blocks="block.slotBlocks.top" />

            <div ref="chart" class="ams-block-chart-canvas"></div>

            <ams-blocks :blocks="block.blocks" />
        </div>
</template>

<script>
/* eslint-disable max-depth,no-undefined */
import mixins from '../../../ams/ams/mixins';
import * as utils from '../../../ams/utils';
import * as echarts from 'echarts';
import 'echarts/theme/macarons.js';

// window暴露echarts
window.echarts = echarts;
const ams = {
    mixins,
    utils
}
export default {
    data() {
        return {
            type: 'chart',
            data: {},       // 数据记录
            chartDom: null  // echart节点存储
        };
    },
    watch: {
        data(val) {
            // 每当data改变时 重新计算option
            if (val && this.chartDom) {
                this.setChartOption();
            }
        }
    },
    mixins: [ams.mixins.blockMixin],
    mounted(){
        console.info(ams,'ams??')
    },
    updated() {
        // 节点上绑定有v-if/v-show时，只能在update阶段获得到refs
        this.$nextTick(async () => {
            // Code that will run only after the
            // entire view has been re-rendered
            if (this.$refs.chart && !this.chartDom) {
                // 初始化
                console.info(echarts,'???echarts')
                this.chartDom = echarts.init(this.$refs.chart, 'macarons');
                this.chartDom.showLoading();
                this.setChartOption();
            }
        });
    },
    methods: {
        setBlockData(data) {
            // console.log('---setBlockData---', data);
            // 深拷贝，接口返回数据，避免覆盖
            let dataTmp = this.deepExtend(this.data, data);

            // 重置data对象数据指引，触发watch-data调用
            this.data = JSON.parse(JSON.stringify(dataTmp));
        },
        deepExtend(destination, source) {
            const type = ams.utils.getType(source);
            if (type === 'object' || type === 'array') {
                for (let property in source) {
                    if (source.hasOwnProperty(property)) {
                        let old = destination[property];
                        let obj = source[property];
                        let oldType = ams.utils.getType(old);
                        let objType = ams.utils.getType(obj);
                        if (objType === 'object') {
                            const target = oldType === 'object' ? old : {};
                            destination[property] = this.deepExtend(target, obj);
                        } else if (objType === 'array') {
                            // const target = oldType === 'array' ? old : [];
                            destination[property] = obj;
                        } else {
                            destination[property] = source[property];
                        }
                    }
                }
            }
            return destination;
        },
        async setChartOption() {
            if (this.block.options) {
                let options = this.deepExtendAndHandle({}, this.block.options);
                let series = options.series;
                let chartType = options.type;

                // yAxis为空报错处理
                if (options.type === 'line' || options.type === 'bar') {
                    options.yAxis = options.yAxis || {};
                }

                // 遍历series 添加默认type
                if (series) {
                    series.forEach(item => {
                        item.type = item.type ? item.type : chartType;
                        // todo action
                        // item.data = typeof item.data === 'function' ? item.data.call(this) : this.block.data[item.data];
                        // if (typeof item.data === 'function') {
                        //     item.data = item.data.call(this);
                        // } else if (typeof item.data === 'string'){
                        //     item.data = this.data[item.data];
                        // }
                    });
                }
                // console.log('---options---', options);
                this.chartDom.setOption(options);
                this.chartDom.hideLoading();
            }
        },
        // 深度拷贝options各个值, 并处理'data.xxx'这类数据
        deepExtendAndHandle(destination, source) {
            const type = ams.utils.getType(source);
            if (type === 'object' || type === 'array') {
                for (let property in source) {
                    if (!/^\$/.test(property) && source.hasOwnProperty(property)) {
                        let old = destination[property];
                        let obj = source[property];
                        let oldType = ams.utils.getType(old);
                        let objType = ams.utils.getType(obj);
                        // console.log('objType----', objType, obj);
                        if (objType === 'object') {
                            const target = oldType === 'object' ? old : {};
                            destination[property] = this.deepExtendAndHandle(target, obj);
                        } else if (objType === 'array') {
                            const target = oldType === 'array' ? old : [];
                            destination[property] = this.deepExtendAndHandle(target, obj);
                        } else {
                            if (objType === 'string') {
                                const value = this.setData(obj);
                                if (!value) {
                                    destination[property] = source[property];
                                } else {
                                    destination[property] = value;
                                }
                            } else {
                                destination[property] = source[property];
                            }
                        }
                    }
                }
            }
            return destination;
        },
        setData(stringVal) {
            let path = stringVal.split(/\.|\[/);
            let object = this;

            if (path.length > 0 && path[0] === 'data') {
                // 循环处理，data.test[2]这种字符串数据
                for (let i = 0; i < path.length; i++) {
                    if (path[i].charAt(path[i].length - 1) === ']') {
                        // 数组
                        object = object[path[i].slice(0, -1)];
                    } else {
                        // 对象
                        object = object[path[i]];
                    }
                    if (object === null || object === undefined) {
                        console.warn(`get "${stringVal}" fail`);
                        return false;
                    }
                }
                return object;
            } else {
                return stringVal;
            }
        }
    }
};
</script>

<style lang="scss">
.ams-block-chart-canvas {
    width: 100%;
    height: 100%;
}
</style>

