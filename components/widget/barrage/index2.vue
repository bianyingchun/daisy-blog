<template>
  <div class="barrage" :class="{active:onBarrage}" v-on:click.stop>
    <div class="barrage-box" v-if="onBarrage">
        <div class="barrage-list-box">
            <template v-for="(doms, channel) in domPoll" >
                <span v-for="(dom, index) in doms" :key="dom.id" :class="dom.class" :style="dom.style" @transitionend="handleTransitionEnd(dom, channel, index)">{{dom.text}}</span>
            </template>
        </div>
        <div class="input-box">
            <input type="text" v-model="barrage">
            <button>发送</button>
        </div>
    </div>
  </div>
</template>

<script>
const MAX_DM_COUNT = 6;
const CHANNEL_COUNT = 10;
export default {
    data() {
        return {
            onBarrage:true,
            barrage:'',
            domPoll:[]
        }
    },
    created() {
        this.timer = null;
        this.minitimers = [];
        this.hasPosition = [];
        this.messagePoll = [
                '前方大量弹幕来袭，请做好准备！', '2333333', '2333333', '2333333', '2333333', '2333333', 
                '浔阳江头夜送客， 枫叶荻花秋瑟瑟',  '2333333', '2333333', '2333333', '2333333', '2333333', '2333333',
                '主人下马客在船， 举酒欲饮无管弦。', '醉不成欢惨将别， 别时茫茫江浸月', '忽闻水上琵琶声， 主人忘归客不发。', 
                '寻声暗问弹者谁？ 琵琶声停欲语迟。', '移船相近邀相见， 添酒回灯重开宴。', '千呼万唤始出来， 犹抱琵琶半遮面。',
                '转轴拨弦三两声， 未成曲调先有情。', '弦弦掩抑声声思， 似诉平生不得志。', '低眉信手续续弹， 说尽心中无限事。', 
                '轻拢慢捻抹复挑， 初为霓裳后六幺。', '大弦嘈嘈如急雨， 小弦切切如私语。', '嘈嘈切切错杂弹， 大珠小珠落玉盘。', 
                '间关莺语花底滑， 幽咽泉流冰下难。', '冰泉冷涩弦凝绝， 凝绝不通声暂歇。', '别有幽愁暗恨生， 此时无声胜有声。', 
                '银瓶乍破水浆迸， 铁骑突出刀枪鸣。', '曲终收拨当心画， 四弦一声如裂帛。', '东船西舫悄无言， 唯见江心秋月白。', 
                '沉吟放拨插弦中， 整顿衣裳起敛容。', '自言本是京城女， 家在虾蟆陵下住。', '十三学得琵琶成， 名属教坊第一部。', 
                '曲罢曾教善才服， 妆成每被秋娘妒。', '五陵年少争缠头， 一曲红绡不知数。', '钿头银篦击节碎， 血色罗裙翻酒污。', 
                '今年欢笑复明年， 秋月春风等闲度。', '弟走从军阿姨死， 暮去朝来颜色故。', '门前冷落鞍马稀， 老大嫁作商人妇。', 
                '商人重利轻别离， 前月浮梁买茶去。', '去来江口守空船， 绕船月明江水寒。', '夜深忽梦少年事， 梦啼妆泪红阑干。',
                '我闻琵琶已叹息， 又闻此语重唧唧。', '同是天涯沦落人， 相逢何必曾相识！', '我从去年辞帝京， 谪居卧病浔阳城。',
                '浔阳地僻无音乐， 终岁不闻丝竹声。', '住近湓江地低湿， 黄芦苦竹绕宅生。', '其间旦暮闻何物？ 杜鹃啼血猿哀鸣。',
                '春江花朝秋月夜， 往往取酒还独倾。', '岂无山歌与村笛？ 呕哑嘲哳难为听。', '今夜闻君琵琶语， 如听仙乐耳暂明。',
                '莫辞更坐弹一曲， 为君翻作《琵琶行》。', '感我此言良久立， 却坐促弦弦转急。', '凄凄不似向前声， 满座重闻皆掩泣。',
                '座中泣下谁最多？ 江州司马青衫湿。'
            ];
        this.initBarragePool();
    },
    methods:{
        initBarragePool() {
            let id = 0;
            for(let j = 0; j < CHANNEL_COUNT;j++) {
                let doms = []
                for(let i = 0; i < MAX_DM_COUNT; i++) {
                    let dom = {
                        class:'right',
                        style:{
                            top:j * 20 + 'px'
                        },
                        id:id++,
                        text:''
                    }
                    doms.push(dom)
                }
                this.domPoll.push(doms);
                this.hasPosition[j] = true;
            }
        },
        getChannel() {
            for(let i = 0; i < CHANNEL_COUNT; i++) {
                if(this.hasPosition[i] && this.domPoll[i].length) return i;
            }
            return -1;
        },
        handleTransitionEnd(dom, channel, index) {
            dom.class="right";
            dom.style='null';
            dom.text = '';
            // console.log('end')
            this.domPoll[channel][index] = dom;
            this.domPoll = Object.assign({},this.domPoll)
        },
        shootBarrage(dom, text, channel) {
            dom.text = text;
            // console.log(text)
            let width = 16 * text.length;
            dom.style.transform=`translateX(${width}px)`;
            dom.class='left';
            
            this.hasPosition[channel] = false;
            let timer = setTimeout(() => {
                this.hasPosition[channel] = true;
            }, width * 10 + 1000)
            this.minitimers.push(timer)
        },
        playBarrage() {
            this.$nextTick(()=>{
                this.timer = setInterval(() => {
                    let channel;
                    if(this.messagePoll.length && (channel =this.getChannel()) != -1) {
                        let dom = this.domPoll[channel].shift();
                        let barrage = this.messagePoll.shift();
                        this.shootBarrage(dom, barrage, channel)
                    }
                },1)
            })
        }
    },
    mounted() {
        this.playBarrage();
    },
    beforeDestroy() {
        if(this.timer) {
            clearInterval(this.timer)
            this.timer = null;
            clearInterval(timer)
        }
        for(let i = 0; i < minitimers; i++) {
            let timer = minitimers[i];
            clearTimeout(timer)
        }
    }
}
</script>

<style lang="scss" scoped>
.barrage{
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    z-index:$z-index-toolbox - 1;
    background:$module-hover-bg-darken-20;
    @include backdrop-blur();
    @include hidden();
    &.active {
      @include visible();
    }
    .barrage-box{
        width:100%;
        height:100%;
        position:relative;
        padding-top:$header-height;
        box-sizing: border-box;
        .input-box{
            position: absolute;
            left:50%;
            bottom:30px;
            transform:translateX(-50%);
        }
        .barrage-list-box{
            position: relative;
            width:100%;
            height: 100%;
            user-select:none;
            overflow: hidden;
            .right {
                position: absolute;
                visibility: hidden;
                white-space: nowrap;
                transform: translateX(700px);
            }
            .left {
                position: absolute;
                white-space: nowrap;
                user-select: none;
                transition: transform 7s linear;
            }
        }
    }
}
</style>