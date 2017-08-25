/**
 * Created by Administrator on 2017/8/25 0025.
 */
var Dialog = (function(){

    function Modal(){
        this.createDialog();
        this.bindEvent();
    }

    Modal.prototype = {
        defaultOpts:{
            title:'',
            message:'',
            isShowCloseBtn:true,
            isShowConfirmBtn:false,
            onClose:function(){},
            onConfirm:function(){}
        },
        open:function(opts){
            this.setOpts(opts);
            console.log(this.opts);
            this.setDialog();
            this.showDialog();
        },
        // close:function(){
        // 	this.hideDialog();
        // },
        setOpts:function(opts){
            if(typeof opts === 'string'){
                this.opts = $.extend({},this.defaultOpts,{message:opts});
            }else if (typeof opts === 'object') {
                this.opts = $.extend({},this.defaultOpts,opts);
            }
        },
        bindEvent:function(){
            var _this = this;
            _this.$dialog.find('.btn-close').on('click',function(e){
                e.preventDefault();
                _this.opts.onClose();
                _this.hideDialog()
            });
            _this.$dialog.find('.btn-confirm').on('click',function(e){
                e.preventDefault();
                _this.opts.onConfirm();
                _this.hideDialog()
            });
        },

        createDialog:function(){
            var tpl = '<div class="dialog" style="display:none">'
                +   '<div class="dialog-overlay"></div>'
                +   '<div class="dialog-box">'
                +     '<div class="dialog-header"><h3></h3><span class="btn-close">x</span></div>'
                +     '<div class="dialog-content">'
                +     '</div>'
                +     '<div class="dialog-footer">'
                +        '<a href="#" class="btn btn-close">取消</a>'
                +        '<a href="#" class="btn btn-confirm">确定</a>'
                +     '</div>'
                +   '</div>'
                +'</div>';
            this.$dialog = $(tpl);
            $('body').append(this.$dialog);
        },


        setDialog:function(){
            var $dialog = this.$dialog;
            if(!this.opts.title){
                $dialog.find('.dialog-header').hide();
            }else{
                $dialog.find('.dialog-header').show();
            }
            if (!this.opts.isShowCloseBtn) {
                $dialog.find('.dialog-footer .btn-close').hide();
            }else{
                $dialog.find('.dialog-footer .btn-close').show();
            }
            if (!this.opts.isShowConfirmBtn) {
                $dialog.find('.dialog-footer .btn-confirm').hide();
            }else{
                $dialog.find('.dialog-footer .btn-confirm').show();
            }
            $dialog.find('.dialog-header h3').text(this.opts.title);
            $dialog.find('.dialog-content').html(this.opts.message)
        },
        showDialog:function(){
            this.$dialog.show();
        },
        hideDialog:function(){
            this.$dialog.hide();
        }
    };
    return new Modal();
})();

$('#open1').on('click',function(){
    Dialog.open('hello,xxx')
});
$('#open2').on('click',function(){
    Dialog.open('<a href="http://home.jscode.me/c/tasks">xxx</a>');
});
$('#open3').on('click',function(){
    Dialog.open({
        title:'欢迎',
        message:'welcome to the world of IT!',
        isShowCloseBtn:true,
        isShowConfirmBtn:true,
        onClose:function(){
            alert('close')
        },
        onConfirm:function(){
            alert('confirm')
        }
    });
});

var tpl = '<ul><li>1</li><li>2</li><li>3</li><li>4</li></ul>';
$('#open4').on('click',function(){
    Dialog.open({
        title:'xxxx',
        message:tpl,
        isShowCloseBtn:true,
        isShowConfirmBtn:true,
        onClose:function(){
            alert('close')
        },
        onConfirm:function(){
            alert('confirm')
        }
    });
});
$('#open5').on('click',function(){
    Dialog.open({
        title:'xxx',
        message:'hello',
        isShowCloseBtn:false,
        isShowConfirmBtn:false,
        onClose:function(){
            alert('close')
        }
    });
});
$('#close').on('click',function(){
    Dialog.hideDialog();
})