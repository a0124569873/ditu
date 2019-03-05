<template>
    <div>
        <van-row class="showdong_add_item">
            <van-col span="12">所在隧道</van-col>
            <van-col span="12">
                <div @click="showPop('suidao')">{{suidao}}</div>
            </van-col>
        </van-row>
        <van-row class="showdong_add_item">
            <van-col span="12">设备分类</van-col>
            <van-col span="12">
                <div @click="showPop('type')">{{type}}</div>
            </van-col>
        </van-row>
        <van-row class="showdong_add_item">
            <van-col span="12">设备</van-col>
            <van-col span="12">
                <div @click="showPop('shebei')">{{shebei}}</div>
            </van-col>
        </van-row>

        <van-popup
            v-model="show"
            position="bottom"
        >
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="popconfirm"
                @cancel="show = false"
            />
        </van-popup>

    </div>
</template>
<script>

import xunjianService from '../../services/xunjianService'

export default {

    props: [
        'typecode',
        'suidaocode'
    ],

    data(){
        return {
            show: false,
            poptype:'',
            columns: [],
            suidao: '请选择>',
            type: '请选择>',
            shebei: '请选择>',
            suidaoArr: ['请选择上级内容'],
            typeArr: ['请选择上级内容'],
            shebeiArr: ['请选择上级内容'],
            suidaolist: {},
            typelist: {},
            shebeilist: {},
            res: {},
            code: '',
            categoryCode: '',

        }
    },

    props: [

    ],

    mounted(){
        let _this = this
        this.suidaoArr = []
        xunjianService.getAllDevice().then(res =>{
            _this.res = res
            res.map(item => {
                this.suidaolist[item.sectionName] = item.sectionCode
                this.suidaoArr.push(item.sectionName)
            })
        })
    },

    watch: {
        suidao:function (n, o) {
            let _this = this
            if (n != '请选择上级内容'){
                _this.res.map(item => {
                    if (item.sectionName == n) {
                        _this.typeArr = []
                        item.treeCategory.map(typeitem => {
                            _this.typeArr.push(typeitem.categoryName)
                            _this.typelist[typeitem.categoryName] = typeitem.categoryCode
                        })
                    }
                })
            }
        },
        type: function (n, o) {
            let _this = this
            if (n != '请选择上级内容'){
                _this.res.map(item => {
                    if (item.sectionName == _this.suidao) {
                        item.treeCategory.map(typeitem => {
                            if (typeitem.categoryName == n){
                                _this.shebeiArr = []
                                _this.shebeilist = {}
                                typeitem.treeEquipment.map(shebeiitem => {
                                    _this.shebeiArr.push(shebeiitem.name)
                                    _this.shebeilist[shebeiitem.name] = shebeiitem.code
                                })  
                            }
                        })
                    }
                })
            }

        },
        
    },

    methods: {
        showPop(type){
            this.poptype = type
            this.show = true
            switch (type) {
                case 'suidao':
                    this.columns = this.suidaoArr
                    break;
                case 'type':
                    this.columns = this.typeArr
                    break;
                case 'shebei':
                    this.columns = this.shebeiArr
                    break;
            
                default:
                    break;
            }
        },

        popconfirm(value, index){
            this.show = false
            this[this.poptype] = value

            if(this.poptype == 'suidao' && this.suidao != '请选择>'){
                this.suidaocode = this.suidaolist[this.suidao]
                this.$emit('update:suidaocode',this.suidaocode)
                this.type = '请选择>'
                this.shebei = '请选择>'
                this.code = ''
                this.categoryCode = ''
                this.$emit('update:typecode','')
            }

            if(this.poptype == 'type'){
                this.categoryCode = this.typelist[this.type]
                this.$emit('update:typecode',this.categoryCode)
                // console.log(this.categoryCode);
                
                this.shebei = '请选择>'
                this.code = ''
            }

            if(this.poptype == 'shebei' && this.shebei != '请选择>'){
                this.code = this.shebeilist[this.shebei]
            }

        },
    }
}
</script>
<style lang="scss" scoped>
.showdong_add_item{
    padding: 20px;
    background-color: white;
    margin: 5px;
}
</style>
