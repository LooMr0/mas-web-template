var template =`
       <div id="cropper-popup" v-if="canCrop">
        <div id="cropper_container">
            <div class="mas-img-item" v-for="(item,index) in imgPreviewList"><img :src="item.src" alt=""/>
            <div class="mas-delete" @click="deleteImgFun(index)"><svg t="1569230129734" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5198" width="32" height="32"><path d="M519.68 0C414.72 0 329.728 82.944 326.144 186.88H81.92c-27.136 0-49.152 22.016-49.152 49.152s22.016 49.152 49.152 49.152h54.272v550.912c0 103.424 70.144 187.904 157.184 187.904h442.368c86.528 0 157.184-83.968 157.184-187.904V285.696h49.152c27.136 0 49.152-22.016 49.152-49.152s-22.016-49.152-49.152-49.152h-229.376C709.12 82.944 624.128 0 519.68 0zM418.304 186.88C421.888 133.632 465.92 92.16 519.68 92.16s97.28 41.472 100.352 94.72H418.304zM293.376 931.84c-30.72 0-64.512-39.424-64.512-95.744V285.696h571.904v550.912c0 56.32-33.792 95.744-64.512 95.744H293.376v-0.512z" fill="#DF5B4D" p-id="5199"></path><path d="M369.664 784.896c20.992 0 38.4-20.992 38.4-47.104V470.016c0-26.112-17.408-47.104-38.4-47.104s-38.4 20.992-38.4 47.104v267.776c0.512 26.112 16.896 47.104 38.4 47.104z m138.752 0c20.992 0 38.4-20.992 38.4-47.104V470.016c0-26.112-17.408-47.104-38.4-47.104s-38.4 20.992-38.4 47.104v267.776c0 26.112 17.408 47.104 38.4 47.104z m145.408 0c20.992 0 38.4-20.992 38.4-47.104V470.016c0-26.112-17.408-47.104-38.4-47.104s-38.4 20.992-38.4 47.104v267.776c0 26.112 16.896 47.104 38.4 47.104z" fill="#DF5B4D" p-id="5200"></path></svg></div></div>
            <div class="mas-img-item" v-show="imgPreviewList.length<8" @click="lbInputChange"><svg t="1569229380337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2595" width="48" height="48"><path d="M853.333333 533.333333C865.115407 533.333333 874.666667 523.782074 874.666667 512 874.666667 500.217926 865.115407 490.666667 853.333333 490.666667L170.666667 490.666667C158.884592 490.666667 149.333333 500.217926 149.333333 512 149.333333 523.782074 158.884592 533.333333 170.666667 533.333333L853.333333 533.333333Z" p-id="2596" fill="#33bbff"></path><path d="M490.666667 853.333333C490.666667 865.115407 500.217926 874.666667 512 874.666667 523.782074 874.666667 533.333333 865.115407 533.333333 853.333333L533.333333 170.666667C533.333333 158.884592 523.782074 149.333333 512 149.333333 500.217926 149.333333 490.666667 158.884592 490.666667 170.666667L490.666667 853.333333Z" p-id="2597" fill="#33bbff"></path></svg></div>
        </div>
        <input type="file" name="image" id="imgInput" accept="image/*" multiple @change="fileChange" style="display: none"/>
        <div @click="divClickFun">
         <slot></slot>
        </div> 
    </div>
    `;

var css = `
#cropper-popup{width:calc(100% - 8px);height:auto;margin-left:8px;}
#cropper_container{width:100%;display:flex;justify-content:flex-start;flex-wrap:wrap;vertical-align:middle;align-items:flex-start}
.mas-img-item{--w:calc(100vw / 10 - 10px); width:var(--w);height:var(--w);background:rgba(237,237,237,1);margin-right:8px;margin-top:8px;position:relative}
.mas-img-item img{width:100%;height:100%;object-fit:cover}
.mas-img-item svg{width:100%;height:100%;}
.mas-delete{--w:calc(100% / 5);position:absolute;width:var(--w);height:var(--w);z-index:9;background:#fff;border-radius:50%;padding:5px;right:0;top:-5px;line-height:var(--w);text-align:center;}
.mas-delete svg{width:80%;height:80%;}

    `;
var styleNode = document.createElement('style');
styleNode.type = 'text/css';
if (styleNode.styleSheet) {
    styleNode.styleSheet.cssText = css;
} else {
    styleNode.innerHTML = css;
}
document.getElementsByTagName('head')[0].appendChild(styleNode);

var masImgup =  Vue.component('mas-imgup',{
    // 接收来自父组件的数据流
    props: {
        info:Object
    },
    data: function(){
        return {
            canCrop:true,
            imgVe: ['gif', 'jpg', 'jpeg', 'bmp', 'png'],
            imageSrc:'APP_登录.png',
            cropper: null,
            isRequest: false,
            imgPreviewList:[]
        }
    },
    mounted: function() {

    },
    methods: {
        lbInputChange:function () {
            imgInput.click()
        },
        fileChange:function (event) {
            var that = this;
            var files = event.target.files,filesLength = event.target.files.length;
            if(filesLength===0){
                alert('请至少选择一个图片文件！')
                return;
            }
            if(filesLength>8){
                alert('一次至多上传8张图！');
                return;
            }
            for(let i = 0; i < filesLength; i++){
                if(that.imgVe.indexOf(files[i].type.split("/").pop())<0){
                    alert('所选文件格式错误！')
                    break;
                }
                that.getBase64(files[i]).then(function (res) {
                    that.imgPreviewList.push({
                        name:files[i].name,
                        src:res
                    });
                })
            }
        },
        getBase64: function getBase64(file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                var imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        deleteImgFun:function (index) {
            this.imgPreviewList.splice(index,1)
        },
        divClickFun:function () {
            this.$emit('div-click',this.imgPreviewList);
        }
    },
    // 模板div结构 slot标签处标记插槽位置
    template: template
});
export default masImgup;
