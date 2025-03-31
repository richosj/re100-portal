$(function() {
    var ui = {};
    /**
     * UI 토글 함수
     * @param {String} toggleID - 토글될 요소의 data-toggle-id
     * @param {String} action - 'open' 또는 'close'
     * @param {HTMLElement} btn - 토글 버튼 요소
     * @param {Object} opt - 옵션 (ani: 애니메이션 여부)
     */
    ui.toggle = function(toggleID, action, btn, opt) {
        var elm = $('[data-toggle-id=' + toggleID + ']');
        var $btn = $(btn);
        
        if (action) {
            if (action === 'open') {
                $btn.addClass('active');
                elm.removeClass('toggle-hidden');
            } else if (action === 'close') {
                $btn.removeClass('active');
                elm.addClass('toggle-hidden');
            }
        } else {
            // 토글 상태에 따라 처리
            if (!elm.hasClass('toggle-hidden')) {
                if (opt && opt.ani) elm.stop().slideUp(250);
                $btn.removeClass('active');
                elm.addClass('toggle-hidden');
            } else {
                if (opt && opt.ani) elm.stop().slideDown(250);
                $btn.addClass('active');
                elm.removeClass('toggle-hidden');
            }
        }
    };

    /**
     * 탭 네비게이션 초기화 함수
     * @param {jQuery} tabNav - 탭 네비게이션 요소
    */
    var tabNav = function(tabNav) {
        var tabIds = [];

        // 모든 탭 콘텐츠를 닫는 함수
        var toggleAllHidden = function() {
            $.each(tabIds, function(_, id) {
                ui.toggle(id, 'close');
            });
        };

        tabNav.find('button').each(function() {
            var $btn = $(this);
            tabIds.push($btn.data('id'));

            $btn.on('click', function() {
                tabNav.find(' > li').removeClass('active');
                $btn.parent().addClass('active');
                toggleAllHidden();
                ui.toggle($btn.data('id'), 'open');
            });
        });
    };

    var uiSetTabNav = function() {
        $('[data-js=tabNav]').each(function() {
            var $this = $(this);
            if (!$this.hasClass('hastabnav')) {
                $this.addClass('hastabnav');
                tabNav($this);
            }
        });
    };
    uiSetTabNav();

    // 토글 이벤트 핸들러
    $('.single_toggle').click(function() {
        $(this).toggleClass('active');
    });
    
    $('.plural_toggle').click(function() {
        $(this).toggleClass('active').siblings().removeClass('active');
    });
    
    $('.plural_on').click(function() {
        $(this).addClass('active').siblings().removeClass('active');
    });
    
    $('.parents_toggle').click(function() {
        $(this).parent().toggleClass('active').siblings().removeClass('active');
    });
    
    // 상세검색 토글
    $('.detail-search-btn').click(function() {
        $(this).toggleClass('on');
        $('.detail--search, .detail-search-dimmed').toggleClass('on');
    });
    
    // 로그인 모달 관련
    $('.position-btn').click(function() {
        $('.login-wrap').addClass('on');
    });
    $('#modal-login .modal--close').click(function() {
        $('.login-wrap').removeClass('on');
    });
});

// jQuery UI Datepicker 기본 설정 (한국어)
$.datepicker.setDefaults({
    closeText: "닫기",
    prevText: "이전달",
    nextText: "다음달",
    currentText: "오늘",
    monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
    dayNames: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    weekHeader: "주",
    dateFormat: "yy.m.d",
    firstDay: 0,
    isRTL: false,
    showMonthAfterYear: true,
    yearSuffix: "년"
});

// Datepicker 초기화 (오늘 이후 날짜만 선택)
$(".datepicker").datepicker({
    minDate: 0
});

// 모달 처리 객체 (ModalHandler)
const ModalHandler = {
    open: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
            modal.classList.add('active');
        }
    },
    
    close: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
            modal.classList.remove('active');
        }
    },
    
    initializeCloseButtons: function() {
        document.querySelectorAll('.close-btn').forEach(button => {
            button.addEventListener('click', function() {
                const modal = this.closest('.modal-wrap');
                if (modal) {
                    modal.style.display = 'none';
                    modal.classList.remove('active');
                }
            });
        });
    },
};

// 모달 닫기 버튼 초기화
ModalHandler.initializeCloseButtons();

// Snb Menu: 사이드 네비게이션 드롭다운 메뉴 처리
document.addEventListener("DOMContentLoaded", function () {
    const menuButtons = document.querySelectorAll(".snb-button");

    menuButtons.forEach(button => {
        // 버튼 바로 다음 요소(드롭다운 메뉴)를 선택
        const dropdown = button.nextElementSibling;

        button.addEventListener("click", function () {
            const isActive = button.classList.contains("active");

            // 모든 메뉴 버튼과 드롭다운 초기화
            menuButtons.forEach(btn => btn.classList.remove("active"));
            document.querySelectorAll(".snb-depth").forEach(menu => {
                menu.classList.remove("visible");
                menu.classList.add("hidden");
            });

            // 현재 버튼이 비활성 상태라면 활성화 후 드롭다운 표시
            if (!isActive) {
                button.classList.add("active");
                dropdown.classList.remove("hidden");
                dropdown.classList.add("visible");
            }
        });
    });
});