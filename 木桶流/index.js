/**
 * Created by Administrator on 2017/8/25 0025.
 */
function Barrels($ct) {
    this.$ct = $ct;
    this.imgNum = 40;
    this.baseHeight = 100;
    this.rowList = [];
    this.loadImg();
}

Barrels.prototype = {

    loadImg: function() {
        var _this = this;
        var imgUrls = this.getImgUrls(100);
        $.each(imgUrls,function(idx, url){
            console.log(url);
            var img = new Image();
            img.src = url;
            img.onload = function(){
                var originWidth = img.width,
                    originHeight = img.height,
                    ratio = originWidth/originHeight;
                var imgInfo = {
                    target: $(img),
                    width: _this.baseHeight*ratio,
                    height: _this.baseHeight,
                    ratio: ratio
                };
                _this.render(imgInfo);
            }
        });
    },

    render: function(imgInfo){
        var _this = this;
        var rowList = this.rowList,
            rowWidth = 0,
            rowHeight = 0,
            clientWidth = this.$ct.width(),
            lastImgInfo = imgInfo;
        this.rowList.push(imgInfo);
        $.each(rowList,function(idx, imgInfo){
            rowWidth += imgInfo.width;
            if(rowWidth  > clientWidth ){
                rowList.pop();
                rowWidth = rowWidth - lastImgInfo.width;
                rowHeight = clientWidth * _this.baseHeight / rowWidth;
                _this.createRow(rowHeight);
                _this.rowList = [];
                _this.rowList.push(lastImgInfo);
            }
        });
    },

    createRow: function(rowHeight){
        console.log('createRow');
        var $rowCt = $('<div class="img-row"></div>');
        $.each(this.rowList, function(idx, imgInfo){
            var $imgCt = $('<div class="img-box"></div>'),
                $img = imgInfo.target;
            $img.height(rowHeight);
            $imgCt.append($img);
            $rowCt.append($imgCt);
        });
        console.log(this.$ct)
        this.$ct.append($rowCt);

    },
    getImgUrls: function(num) {
        var color, width, height, urls = [];
        for (var i = 0; i < num; i++) {
            color = Math.random().toString(16).substring(2, 8);
            width = Math.floor(Math.random() * 100 + 50);
            height = Math.floor(Math.random() * 30 + 50);
            urls.push("http://placehold.it/" + width + "x" + height + "/" + color + "/fff");
        }
        return urls;
    }
}

var barrels = new Barrels($('.img-preview'));
