



<script>
import { Container, DisplayContainer, FlexContainer, FlexRow } from './style';
import {
    icon_block,
    icon_inline_block,
    icon_inline,
    icon_flex,
    icon_none,
    iconflex_direction_end,
    iconflex_direction_center,
    iconflex_space_between,
    iconflex_space_around,
    iconflex_align_start,
    iconflex_align_center,
    iconflex_align_stretch,
    iconflex_baseline
} from './icon';
export default {
    props: {
        instanceInfo: Object,
        editor: Object
    },
    position: 'mainToolEditorTypeDisplay',
    name: 'main-tool-editor-type-display',
    computed: {
        applicationState () {
            return this.$store.state.application;
        },
        viewportState () {
            return this.$store.state.viewport;
        }
    },
    render (h) {
        return (
            <Container>
                {this.renderDisplay(h)}
                {this.crrtDisplay.display === 'flex' && this.renderFlex(h)}
            </Container>
        );
    },
    methods: {
        renderDisplay (h) {
            return (
                <DisplayContainer>
                    <ElButtonGroup>
                        {this.ActiveButton({
                            active: this.crrtDisplay.display === 'block',
                            children: icon_block(h),
                            title: 'Block',
                            field: 'display',
                            value: 'block'
                        })}
                        {this.ActiveButton({
                            active: this.crrtDisplay.display === 'inline-block',
                            children: icon_inline_block(h),
                            title: 'InlineBlock',
                            field: 'display',
                            value: 'inline-block'
                        })}
                        {this.ActiveButton({
                            active: this.crrtDisplay.display === 'inline',
                            children: icon_inline(h),
                            title: 'Inline',
                            field: 'display',
                            value: 'inline'
                        })}
                    </ElButtonGroup>
                    {this.ActiveButton({
                        active: this.crrtDisplay.display === 'flex',
                        children: icon_flex(h),
                        title: 'Flex',
                        field: 'display',
                        value: 'flex'
                    })}
                    {this.ActiveButton({
                        active: this.crrtDisplay.display === 'none',
                        children: icon_none(h),
                        title: 'None',
                        field: 'display',
                        value: 'none'
                    })}
                </DisplayContainer>
            );
        },
        renderFlex (h) {
            // 判断是否逆序
            let isReverse = false;
            let flexDirection = this.crrtDisplay.flexDirection;
            switch (flexDirection) {
                case 'row':
                    isReverse = false;
                    break;
                case 'row-reverse':
                    isReverse = true;
                    break;
                case 'column':
                    isReverse = false;
                    break;
                case 'column-reverse':
                    isReverse = true;
                    break;
            }
            const isRow = flexDirection === 'row' || flexDirection === 'row-reverse';

            const rowStart = !isReverse ? 'left' : 'right';
            const columnStart = !isReverse ? 'top' : 'bottom';
            const rowEnd = !isReverse ? 'right' : 'left';
            const columnEnd = !isReverse ? 'bottom' : 'top';
            const firstLineDirection = isRow ? 'horizontal' : 'vertical';
            const secondLineDirection = isRow ? 'vertical' : 'horizontal';

            const rowFlexStart = `${firstLineDirection} ${
                isRow ? rowStart : columnStart
            }`;
            const rowFlexCenter = `${firstLineDirection} center`;
            const rowFlexEnd = `${firstLineDirection} ${isRow ? rowEnd : columnEnd}`;
            const rowFlexSpaceBetween = `${firstLineDirection} space between`;
            const rowFlexSpaceAround = `${firstLineDirection} space around`;

            const columnFlexStart = `${secondLineDirection} ${
                isRow ? 'top' : 'left'
            }`;
            const columnFlexCenter = `${secondLineDirection} center`;
            const columnFlexEnd = `${secondLineDirection} ${
                isRow ? 'bottom' : 'right'
            }`;
            const columnFlexStrech = `${secondLineDirection} strech`;
            const columnFlexBaseline = `${secondLineDirection} baseline`;
            return (
                <FlexContainer>
                    <FlexRow style={{ marginTop: 5 + 'px' }}>
                        <ElButtonGroup>
                            {this.ActiveButton({
                                active: this.crrtDisplay.justifyContent === 'flex-start',
                                children: iconflex_direction_end(h, isRow ? 'rotate-180' : 'rotate-270'),
                                title: rowFlexStart,
                                field: 'justifyContent',
                                value: 'flex-start'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.justifyContent === 'center',
                                children: iconflex_direction_center(h, isRow ? null : 'rotate-90'),
                                title: rowFlexCenter,
                                field: 'justifyContent',
                                value: 'center'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.justifyContent === 'flex-end',
                                children: iconflex_direction_end(h, isRow ? null : 'rotate-90'),
                                title: rowFlexEnd,
                                field: 'justifyContent',
                                value: 'flex-end'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.justifyContent === 'space-between',
                                children: iconflex_space_between(h, isRow ? null : 'rotate-90'),
                                title: rowFlexSpaceBetween,
                                field: 'justifyContent',
                                value: 'space-between'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.justifyContent === 'space-around',
                                children: iconflex_space_around(h, isRow ? null : 'rotate-90'),
                                title: rowFlexSpaceAround,
                                field: 'justifyContent',
                                value: 'space-around'
                            })}
                        </ElButtonGroup>
                    </FlexRow>
                    <FlexRow style={{ marginTop: 5 + 'px' }}>
                        <ElButtonGroup>
                            {this.ActiveButton({
                                active: this.crrtDisplay.alignItems === 'flex-start',
                                children: iconflex_align_start(h, isRow ? null : 'rotate-270'),
                                title: columnFlexStart,
                                field: 'alignItems',
                                value: 'flex-start'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.alignItems === 'center',
                                children: iconflex_align_center(h, isRow ? null : 'rotate-270'),
                                title: columnFlexCenter,
                                field: 'alignItems',
                                value: 'center'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.alignItems === 'flex-end',
                                children: iconflex_align_start(h, isRow ? 'rotate-180' : 'rotate-90'),
                                title: columnFlexEnd,
                                field: 'alignItems',
                                value: 'flex-end'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.alignItems === 'stretch',
                                children: iconflex_align_stretch(h, isRow ? null : 'rotate-270'),
                                title: columnFlexStrech,
                                field: 'alignItems',
                                value: 'stretch'
                            })}
                            {this.ActiveButton({
                                active: this.crrtDisplay.alignItems === 'baseline',
                                children: iconflex_baseline(h, isRow ? null : 'rotate-90'),
                                title: columnFlexBaseline,
                                field: 'alignItems',
                                value: 'baseline'
                            })}
                        </ElButtonGroup>
                    </FlexRow>
                    <FlexRow style={{ marginTop: 5 + 'px' }}>
                        <ElSwitch
                            on-change={this.handleChangeDirection}
                            size="large"
                            active-text="从上往下"
                            inactive-text="从左往右"
                            value={
                                ['column', 'column-reverse'].indexOf(flexDirection) >= 0
                            }
                        >
                            <span slot="open">vertical</span>
                            <span slot="close">horizontal</span>
                        </ElSwitch>
                        <ElInput
                            style={{ width: 130 + 'px' }}
                            size="small"
                            number
                            value={this.crrtDisplay.flexGrow}
                            on-input={this.handleFlexGrowChange}
                        >
                            <span slot="prepend">Grow</span>
                        </ElInput>
                    </FlexRow>
                </FlexContainer>
            );
        },
        ActiveButton (props) {
            const { active, title, field, value } = props;
            return (
                <ElButton
                    style={{ height: '24px', padding: '0 7px' }}
                    size="small"
                    type={active ? 'primary' : null}
                    onClick={this.handleUpdateValue.bind(this, field, value)}
                >
                    <ElTooltip content={title} placement="top">
                        {props.children}
                    </ElTooltip>
                </ElButton>
            );
        },
        handleUpdateValue (field, value) {
            this.crrtDisplay[field] = value;
        },
        handleChangeDirection (val) {
            this.crrtDisplay.flexDirection = val ? 'column' : 'row';
        },
        handleFlexGrowChange (value) {
            this.crrtDisplay.flexGrow = parseInt(value);
        },
        _initPerStyle (field) {
            this.crrtDisplay[field] = this.instanceInfo.vm.$data.styles[field];
        },
        refresStyles () {
            this._initPerStyle('display');
            this._initPerStyle('flexDirection');
            this._initPerStyle('flexGrow');
            this._initPerStyle('alignItems');
            this._initPerStyle('justifyContent');
        }
    },
    data () {
        return {
            crrtDisplay: {
                display: 'block',
                flexDirection: 'row',
                flexGrow: 0,
                alignItems: 'stretch',
                justifyContent: 'flex-start'
            }
        };
    },
    watch: {
        crrtDisplay: {
            handler (n, o) {
                this.$store.commit('viewport/setInstanceProps', {
                    vm: this.instanceInfo.vm,
                    key: 'styles',
                    value: {
                        ...n,
                        position:'static'
                    }
                });
            },
            deep: true
        },
        instanceInfo (n, o) {
            this.refresStyles();
        }
    },
    created () {
        this.refresStyles();
    }

};
</script>

<style>

</style>
