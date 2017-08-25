/**
 * Created by Administrator on 2017/8/25 0025.
 */
var WaterFall = (function() {
    var $ct;
    var $item;
    function render(arg){
        $ct = arg;
        $item = $ct.children();
        var $itemWidth = $item.outerWidth(true),
            $ctLen = parseInt($(window).width() / $itemWidth),
            cascadeArray = [];

        for(var i = 0; i < $ctLen ; i++){
            cascadeArray[i] = 0;
        }

        $item.each(function(){
            var minDiv = Math.min.apply(Math,cascadeArray)
            var minDivDix = cascadeArray.indexOf(minDiv)
            $(this).css({
                top: cascadeArray[minDivDix],
                left: $(this).outerWidth(true) * minDivDix,
            })
            cascadeArray[minDivDix] += $(this).outerHeight(true)
        })
    }

    $(window).resize(function(){
        render($ct)
    })

    return {
        init : render
    }
})()

WaterFall.init($('.content'))


// encBox($('.content'))




// var packBox = (function() {
//   function init() {
//     encBox()		//����������
//     $(window).resize(function(){
//       encBox()	//���ڴ�������
//     })
//   }

//   var encBox = (function(){

//     var $ct = $('.content'),									//����
//       $item = $('.content .item'),							//item
//       $ctWidth = $ct.width(),									//�������
//       $itemWidth = $item.outerWidth(true),					//itemԪ�ؿ��
//       $ctLen =  parseInt($ctWidth / $itemWidth),				//ÿ�м���[2�Ρ��ӵ㣺������ȡ�����ᵼ����Ļ��Ȼ�ſ�0.0]
//       cascadeArray = [];										//��������

//     for(var i=0; i<$ctLen ;i++){
//       cascadeArray[i] = 0;								//��ʼ��
//     }

//     $.each($item,function(){
//       console.log(arguments)
//       var minDiv = Math.min.apply(Math,cascadeArray)		//��ȡ��������С��Ԫ�ء�-��-
//       var minDivDix = cascadeArray.indexOf(minDiv)		//��ȡ���±�
//       console.log(minDivDix)
//       $(this).css({										//ѭ������Ԫ�ؽ�һһ�ŵ�ÿ�ε���Сֵ�ĺ���.
//         top: cascadeArray[minDivDix],					//��Сֵ���±�	���ӵ�:����Χ�����飬���޷�����0.0,��
//         left: $(this).outerWidth(true) * minDivDix,		//��� * �±���ھ�����߶�Զ��
//         // opacity: 0
//       })
//       cascadeArray[minDivDix] += $(this).outerHeight(true)

//     })

//   })

//   return {			//���������󷵻س�����
//     ����ֵ : init	  //init�������init����..�ɵ���
//   }
// })()

// packBox.����ֵ()	//���������װ�õĺ�������ķ���0.0
