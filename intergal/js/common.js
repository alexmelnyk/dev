/**
 * Created by leha on 19.09.16.
 */
var myMenu = (function(){

    var li = {};

    return{
        init: function(elem){
            var menu = $(elem),
                li = menu.find('li'),
                activeLi = $(elem).find('.active'),
                hoverDiv = document.createElement('div');

            $(hoverDiv).addClass('js-hover-div');
            menu.append(hoverDiv);
            myMenu.setHoverDivPosition($(hoverDiv), activeLi);

            li.on('mouseenter', function(){
                myMenu.setHoverDivPosition($(hoverDiv), $(this));
            });

            menu.on('mouseleave', function(){
                var activeLi = $(elem).find('.active');
                myMenu.setHoverDivPosition($(hoverDiv), activeLi);
            });

            li.on('click', function(){
                myMenu.setActiveLi($(this));
            });

            this.li = li;
        },

        setHoverDivPosition: function(elem,activeElem){

            var activeElemWidth = activeElem.width(),
                activeElemPosition = activeElem.position().left;

            elem.stop( true, true ).animate({
                width: activeElemWidth,
                left : activeElemPosition
            }, 300);
        },

        setActiveLi: function(elem){
            this.li.removeClass('active');
            elem.addClass('active');
        }
    }

})();

var myStickyMenu = (function(){

    return {
        init: function(elem){
            var that = this;
            this.parentElem = $(elem);
            this.nav = this.parentElem.find('.js-sticky-nav');

            $(window).scroll(function(){
                var blockPos = $(window).scrollTop() - that.parentElem.offset().top,
                    headerHeight = that.parentElem.find('.menu-section').outerHeight();

                if (headerHeight - blockPos < 0){
                    that.nav.addClass('js-sticky');
                } else {
                    that.nav.removeClass('js-sticky');
                }
            });
        }
    }

})();

var myMenuScroll = (function(){

    return {
        init: function(elem){
            var that = this;
            $(elem).each(function(){
                $(this).on('click', function(){
                   that.scrollTo = $(this).data('scroll-to');
                   myMenuScroll.scrollWindow(400);
                });
            });
        },

        scrollWindow: function(time){
            var pos = $('[data-scroll="' + this.scrollTo + '"]').offset().top - $('.js-sticky-nav').outerHeight();
            $('body, html').animate({
                scrollTop: pos
            }, time);
            console.log(pos);
        }
    }

})();

var myTest = (function(){


    this.scope = '';

    return{
        init: function(url, scope){
            myTest.getJSON(url);
            this.scope = scope;
        },
        getJSON: function(url){
            var that = this;
            $.ajax({
                url: url,
                method: 'GET',
                success: function(data){
                    that.results = data;
                    myTest.makeMarkUp(that.results, that.scope);
                    myTest.makeLogic(that.scope);
                    //myTest.setDefaultArrays(that.results, '.js-buildings', '.js-result-buildings');
                },
                error: function(){
                    console.log('can"t find json in ' + url);
                }
            });
        },
        makeMarkUp: function(array, scope){
            var itemWidth = 100/this.results.length + '%',
                parentHead = $('.js-test-head',scope),
                parentBody = $('.js-test-body' ,scope);
            array.forEach(function(item, index){
                myTest.makeHeadItem(item, itemWidth, index, parentHead);
                myTest.makeBodyItem(item, parentBody);
            });
        },
        makeHeadItem: function(item, itemWidth, index, parent){
            var headItem = document.createElement('div'),
                indexItem = document.createElement('div'),
                itemIcon = document.createElement('p'),
                bg = document.createElement('div');

            $(bg).addClass('js-head-item--bg');
            $(bg).css('backgroundImage', 'url("'+item.bgUrl+'")');

            $(itemIcon).addClass('icon-' + item.iconName);
            $(itemIcon).addClass('js-head-item--icon');

            $(indexItem).addClass('js-head-item--index')
                        .text(index+1);

            $(headItem).addClass('js-head-item')
                       .css('width', itemWidth);

            parent.append(headItem);
            headItem.append(bg);
            headItem.append(indexItem);
            headItem.append(itemIcon);
        },
        makeBodyItem: function(item, parent){
            var bodyItem = document.createElement('div'),
                questionItem = document.createElement('p'),
                trueItemWrap = document.createElement('div'),
                falseItemWrap = document.createElement('div'),
                inputTrueItem = document.createElement('input'),
                inputFalseItem = document.createElement('input'),
                labelTrueItem = document.createElement('label'),
                labelFalseItem = document.createElement('label');

            $(questionItem).addClass('js-body-item--question')
                           .text(item.question);

            $(inputTrueItem).attr({
                type: 'radio',
                name: item.id,
                id: item.id+'1',
                value: 1
            });

            $(inputFalseItem).attr({
                type: 'radio',
                name: item.id,
                id: item.id+'0',
                value: 0
            });

            $(labelTrueItem).attr('for',item.id+'1')
                .text(item.answers[1]);

            $(labelFalseItem).attr('for',item.id+'0')
                .text(item.answers[0]);


            $(trueItemWrap).addClass('js-input-item-wrap')
                            .append(inputTrueItem)
                            .append(labelTrueItem);

            $(falseItemWrap).addClass('js-input-item-wrap')
                            .append(inputFalseItem)
                            .append(labelFalseItem);

            $(bodyItem).addClass('js-body-item');
            parent.append(bodyItem);
            bodyItem.append(questionItem);
            bodyItem.append(falseItemWrap);
            bodyItem.append(trueItemWrap);
        },
        makeLogic: function(scope){
            var parentHead = $('.js-test-head', scope),
                parentBody = $('.js-test-body', scope),
                headItem = parentHead.find('.js-head-item'),
                bodyItem = parentBody.find('.js-body-item'),
                nextButton = $('.next-button', scope),
                prevButton = $('.prev-button', scope);

            var setActiveElems = function(){
                headItem.removeClass('next').removeClass('prev');
                bodyItem.removeClass('next').removeClass('prev');

                parentHead.find('.active').prev().addClass('prev');
                parentBody.find('.active').prev().addClass('prev');

                if (parentHead.find('.active').next().length == 0){
                    headItem.not('.complete').first().addClass('next');
                } else {
                    parentHead.find('.active').next().addClass('next');
                }

                if (parentBody.find('.active').next().length == 0){
                    bodyItem.not('.complete').first().addClass('next');
                } else {
                    parentBody.find('.active').next().addClass('next');
                }

            };

            headItem.eq(0).addClass('active');
            bodyItem.eq(0).addClass('active');

            headItem.eq(1).addClass('next');
            bodyItem.eq(1).addClass('next');

            prevButton.on('click', function(e){
                e.preventDefault();

                if (parentBody.find('.active').prev().length == 0 && parentHead.find('.active').prev().length == 0) {
                    $.each(bodyItem, function(){
                        if ($(this).hasClass('active')){
                            myTest.checkItemVal($(this), headItem);
                        }
                    });
                    return;
                } else {
                    $.each(bodyItem, function(){
                        if ($(this).hasClass('active')){
                            myTest.checkItemVal($(this), headItem);
                        }
                    });
                    headItem.removeClass('next').removeClass('prev');
                    bodyItem.removeClass('next').removeClass('prev');

                    parentBody.find('.active').prev().addClass('active').next().removeClass('active');
                    parentHead.find('.active').prev().addClass('active').next().removeClass('active');

                    parentBody.find('.active').prev().addClass('prev');
                    parentHead.find('.active').prev().addClass('prev');

                    parentBody.find('.active').next().addClass('next');
                    parentHead.find('.active').next().addClass('next');
                }
            });

            nextButton.on('click', function(e){
                e.preventDefault();

                var activeBodyItem = parentBody.find('.active').find('input:checked'),
                    activeBodyItemVal = activeBodyItem.val();

                if (activeBodyItemVal){
                    $.each(bodyItem, function(){
                        if ($(this).hasClass('active')){
                            myTest.checkItemVal($(this), headItem);
                        }
                    });
                    headItem.removeClass('active');
                    bodyItem.removeClass('active');

                    parentHead.find('.next').addClass('active');
                    parentBody.find('.next').addClass('active');

                    setActiveElems();
                } else {
                    return;
                }
            });



            $.each(headItem, function(){
                $(this).on('click', function(){
                    headItem.removeClass('active');

                    $.each(bodyItem, function(){
                        if ($(this).hasClass('active')){
                            myTest.checkItemVal($(this), headItem);
                        }
                    });

                    bodyItem.removeClass('active');
                    $(this).addClass('active');
                    bodyItem.eq($(this).index()).addClass('active');
                    setActiveElems();

                });
            });


        },
        checkItemVal: function (item, headItem) {
            if (item.find('input:checked').val() == 0 || item.find('input:checked').val() == 1){
                headItem.eq(item.index()).addClass('complete');
                myTest.setFinish(this.scope);
            }
            building.setCurrentResults(item.index(), item.find('input:checked').val());
        },
        getResults: function(){
            return this.results;
        },
        setFinish: function(scope){

            var headItem = $('.js-head-item', scope),
                finish = true;

            headItem.each(function(){
                if (!$(this).hasClass('complete')) {
                    finish = false;
                }
            });

            if (finish){
                $(scope).slideToggle();
                $('.js-repeat').show();

                $('.test').addClass('complete');
                $('.flip-container').addClass('hover');

                building.setBestObject('.js-buildings', '.js-test');
            }
        }
    }

})();

var building = (function(){

    var that = this;
    this.results = [];
    this.objects = '';
    this.scope = '';

    return{
        init: function(objects, scope){
            that.objects = objects;
            that.scope = scope;
            building.setDefaultResults(that.objects, that.scope);
        },
        setDefaultResults: function(objects, scope){
            $(objects, scope).each(function(){
                that.results.push({
                    id: $(this).data('id'),
                    result: true
                })
            });
        },
        setCurrentResults: function(index, value){
            myTest.getResults()[index].ansKey.forEach(function (answer) {
                that.results.forEach(function(object){
                    if (object.id == answer.id){
                        object.result = answer.key[value];
                    }
                })
            });
            building.setCurrentObjects(that.objects, that.scope);
        },
        setCurrentObjects: function(objects, scope){
            $(objects, scope).each(function(){
                var self = $(this);
                that.results.forEach(function(object){
                    if(object.id == self.data('id') && object.result == false){
                        self.addClass('js-false').attr('data-best-id', '0');
                    }
                })
            });
            building.setBestObject(objects, scope);
        },
        setBestObject: function(objects, scope){
            var max = 0;
            $(objects, scope).each(function(){
                if ($(this).attr('data-best-id') > max){
                    max = $(this).attr('data-best-id');
                    $(objects, scope).removeClass('best');
                    $(this).addClass('best');
                }
            });
        }
    }

})();

$(document).ready(function(){
    if ($('.js-sticky-menu')){
        myStickyMenu.init('.js-sticky-menu');
    }

    if ($('.js-scroll')){
        myMenuScroll.init('.js-scroll');
    }

    if ($('.js-test')){
        myTest.init('/intergal/package.json', '.js-test');
    }

    if($('.js-buildings, .js-result-buildings')){
        building.init('.js-buildings', '.js-result-buildings');
    }

    if ($('.bx-slider')){
        $('.bx-slider').bxSlider({
            minSlides: 1,
            maxSlides: 1,
            pagerCustom: '#bx-pager',
        });
    }
});


$(window).load(function () {
    if ($('.js-menu').length > 0){
        myMenu.init('.js-menu');
    }
});

/*var questions = [
    {
        title: 'q1',
        answers: [
            {
                title: 'a1',
                value: 1
            },
            {
                title: 'a2',
                value: 1
            }
        ]
    }
];

var jks = [
    {
        title: 'jk1',
        questions: [],
        result: 1
    },
    {
        title: 'jk2',
        questions: []
    }
];

function mergeAnswers (orQuestions, jkQuestions) {
    orQuestions.forEach(function (question, i) {
        question.answers.forEach(function (answer, x) {
            answer.value = jkQuestions[i][x];
        });
    });

    return orQuestions;
}

jks[0].questions = mergeAnswers(questions, [
    [1, 0], [1, 1], [0, 0]
]);
jks[1].questions = mergeAnswers(questions, [
    [1, 0], [1, 1], [0, 0]
]);

console.log(jks);*/