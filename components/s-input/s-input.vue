<template>
    <view class="container">
        <!-- <view class="label-title">{{label}}</view> -->
        <input class="s-input" :type="type" @input="inputChange" :id="id" :placeholder-class="placeholderClass" :placeholder="placeholder" :value="value">
        <view v-if="value" class="clear-icon" @click="restInput">x</view>
    </view>
</template>

<script>
export default {
    name: 'UniSInput',
    props: {
        placeholder: { // 输入框空时占位符
            type: String,
            default: '请输入'
        },
        placeholderClass: { // placeholder的class，方便自定义placeholder样式
            type: String,
            default: 'input-placeholder'
        },
        id: { // 唯一标识符，当多个输入框时获取对应输入框的值
            type: String,
            default: 'inputValue'
        },
        type: { // 输入框类型
            type: String,
            default: 'text'
        },
        label: {
            type: String,
            default: '名称'
        },
        initValue: {
            type: String,
            default: ''
        },
		pvalue:{
			type: String,
			default: ''
		}
    },
    data () {
        return {
            value:this.pvalue
        }
    },
    methods: {
        restInput () {
            this.value = ''
            this.$emit('inputValue',this.value)
        },
        inputChange (e) {
            this.value = e.detail.value
            this.$emit('inputValue',e.detail.value)
        },
				setValue(value){
					this.value=value;
				}
    },
    created () {
        this.value = this.initValue
        this.$emit('inputValue',this.initValue)
    }
}
</script>

<style lang="scss" scoped>
    .container {
        // width: 60vh;
        display: flex;
        flex-direction: row;
        display: flex;
        align-items: center;
    }
    .label-title {
        font-size: 32upx;
    }
    .s-input {
        // padding-left: 20upx;
        width: 100%;
    }
    .clear-icon {
        width: 22px;
        height: 20px;
		line-height: 20px;
        border-radius: 50%;
        background: #CECFDA;
        color: #ffffff;
        font-size: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .input-placeholder {
        font-size: 32upx;
        color: #CECFDA;
    }
</style>
