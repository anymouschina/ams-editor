
export const editSetting = {
    key: 'gaea-container',
    name: 'Container',
    isContainer: true,
    slots: {
        default: []
    },
    editors: [
        'Layout',
        {
            type: 'display'
        },
        {
            type: 'box-editor'
        },
        'Style',
        {
            field: 'styles.position',
            text: '流式布局',
            type: 'boolean',
            afterHandler (v) {
                this.$store.commit('viewport/setInstanceProps', {
                    vm: this.instanceInfo.vm,
                    key: 'styles.display',
                    value: 'block'
                });
                return v ? 'relative' : 'static'
            }
        },
        {
            field: 'styles.backgroundColor',
            text: 'BackgroundColor',
            type: 'color'
        },
        {
            field: 'styles.opacity',
            text: 'Opacity',
            type: 'number',
            data: {
                useSlider: true,
                step: 1,
                inputRange: [0, 100],
                outputRange: [0, 1]
            }
        }
    ]
};
