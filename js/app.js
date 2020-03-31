// {
//     "image_url": "http://3.bp.blogspot.com/_DBYF1AdFaHw/TE-f0cDQ24I/AAAAAAAACZg/l-FdTZ6M7z8/s1600/Unicorn_and_Narwhal_by_dinglehopper.jpg",
//     "title": "UniWhal",
//     "description": "A unicorn and a narwhal nuzzling their horns",
//     "keyword": "narwhal",
//     "horns": 1
//   },
'use strict';
let keywordAll = [];
let hornAll = [];
$(document).ready(function () {
    function Horn(info) {
        this.image_url = info.image_url;
        this.title = info.title;
        this.description = info.description;
        this.keyword = info.keyword;
        this.horns = info.horns;
        hornAll.push(this);
    }
    Horn.prototype.render = function () {
        let $hornClone = $("#photo-template").clone();
        $hornClone.find("h2").text(this.title);
        $hornClone.find("img").attr("src", this.image_url);
        $hornClone.find("p").text(this.description);
        $hornClone.removeAttr("id");
        $hornClone.attr("class", this.keyword);
        $("main").append($hornClone);
    };
    Horn.prototype.selectt = function () {
        let imageSelect = $('.selectOption');
        if (!(keywordAll.includes(this.keyword))) {
            keywordAll.push(this.keyword);
            imageSelect.append(`<option>${this.keyword}</option>`);
        }
    };
    const readJson = () => {
        $.ajax("../data/page-1.json", { method: "get", dataType: "JSON" }).then(data => {
            data.forEach(hornItem => {
                let hhorn = new Horn(hornItem);
                hhorn.selectt();
                hhorn.render();
            });
        });
    };
    readJson();
});
$('.selectOption').change(function(){
    var selectedKey = $(this).children('option:selected').val();
    keywordAll.forEach(function(val){
        if(selectedKey === val){
            $('div').hide();
            $(`.${val}`).show();
        }
    })
})