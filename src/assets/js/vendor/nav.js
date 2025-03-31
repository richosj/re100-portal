// ==========================================
// 1. 유틸리티 함수
// ==========================================
$.exists = function(selector) {
    return ($(selector).length > 0);
};

// ==========================================
// 2. PC GNB 관련 코드
// ==========================================

// GNB 관련 요소 선택
var $gnb       = $("#gnb");
var $gnbList   = $gnb.children("ul");
var $gnbItem   = $gnbList.children("li");
var $gnb_dep2  = $gnbItem.children(".gnb--dep02");
var $gnbBg     = $('.gnb-overlay-bg');
var gnbLength  = $gnbItem.length;

// 문서 로드 시 초기화
$(document).ready(function() {
    if ($gnb.is(".total-menu")) {
        openTotalMenu();
    } else if ($gnb.is(".each-menu")) {
        openEachMenu();
    }
    
    $gnb_dep2.hover(
        function() {
            $(this).parent("li").addClass("on");
        },
        function() {
            $gnbItem.removeClass("on");
        }
    );
    if ($.exists(".sub-prev-page-btn") || $.exists(".sub-next-page-btn")) {
        checkPrevNextLink();
    }
});

// 전체 GNB 메뉴 함수 (total-menu)
function openTotalMenu() {
    $gnbItem.children("a").on("mouseenter focus", function() {
        $gnbItem.removeClass("on");
        $("#header").addClass("gnb-open");
        $(this).parent("li").addClass("on");
        if (!$gnb.is(".open")) {
            $gnb.addClass("open");
            $gnbBg.addClass("open");
        }
    });
    
    $gnbList.on("mouseleave", gnb_return);
    $gnbList.find("a").last().on("focusout", gnb_return);
    
    function gnb_return() {
        $("#header").removeClass("gnb-open");
        $gnb.removeClass("open");
        $gnbItem.removeClass("on");
        $gnbBg.removeClass("open");
    }
}

// ==========================================
// 3. 모바일 메뉴 
// ==========================================

// 모바일 버튼 클릭 이벤트
$(".mobile-button").on('click', function() {
    if ($('.header--top').is('.schActive')) {
        $('.header--top').removeClass('schActive');
        return false;
    }
    
    if ($body.is('.mm-open')) {
        $body.removeClass('mm-open');
    } else {
        $body.addClass('mm-open');
    }
});

// 모바일 GNB
let $body = $('body'),
    $window = $(window),
    $windowWidth = $window.width();

$('.lv1-li > a').on('click', function() {
    let $li = $(this).parent('li');
    if ($li.hasClass('active')) {
        $li.removeClass('active');
    } else {
        $li.siblings('li').removeClass('active');
        $li.addClass('active');
    }
    return false;
});

// ==========================================
// 4. LNB (Breadcrumb) 
// ==========================================

$('#breadcrumb .toggle').on('click', function() {
    let $li = $(this).parent('li');
    if (!$li.hasClass('active')) {
        $li.addClass('active').siblings('li').removeClass('active');
    } else {
        $li.removeClass('active');
    }
    return false;
});