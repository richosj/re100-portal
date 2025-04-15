window.addEventListener("load", () => {
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const sections = document.querySelectorAll(".section");
    const observer = new IntersectionObserver(
        (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add("active");
            } else {
            entry.target.classList.remove("active");
            }
        });
        },
        {
        threshold: 0.3
        }
    );
    sections.forEach(section => observer.observe(section));
// 미디어 쿼리에 따른 동작 설정
ScrollTrigger.matchMedia({
    // 데스크탑 애니메이션 (769px 이상)
    "(min-width: 769px)": function() {
    // const visualTimeline = gsap.timeline();
    
    // // 섹션 1 애니메이션
    // visualTimeline
    //     .to(".section-1 .image", {
    //     scale: 1.2,
    //     duration: 1
    //     }, "-=0.5")
    //     .to(".section-1 .text span", {
    //     opacity: 0,
    //     y: -50,
    //     filter: "blur(10px)",
    //     duration: 0.6
    //     })
        
    //     // 섹션 2 애니메이션
    //     .to(".section-2 .image", {
    //     opacity: 1,
    //     scale: 1,
    //     duration: 1.2
    //     }, "-=0.2")
    //     .to(".section-2 .text span", {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     scale: 1,
    //     duration: 1.2
    //     }, "-=1")
    //     .to([".section-2 .text span", ".section-2 .image", ".section-1 .image"], {
    //     opacity: 0,
    //     y: -30,
    //     filter: "blur(10px)",
    //     duration: 0.8
    //     }, "+=0.6")
        
    //     // 섹션 3 애니메이션
    //     .to(".section-3 .image", {
    //     opacity: 1,
    //     scale: 1,
    //     duration: 1.2
    //     }, ">")
    //     .to(".section-3 .text-1", {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 0.3
    //     }, "+=0.1")
    //     .to(".section-3 .text-2", {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 0.3
    //     }, "+=0.1")
    //     .to(".section-3 .text-3", {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 0.3
    //     }, "+=0.1")
    //     .to(".section-3 .text-4", {
    //     opacity: 1,
    //     y: 0,
    //     filter: "blur(0px)",
    //     duration: 0.3
    //     }, "+=0.1");

    // // 스크롤 트리거 설정
    // ScrollTrigger.create({
    //     animation: visualTimeline,
    //     trigger: ".section-wrap",
    //     start: "top top",
    //     end: "+=1000%",
    //     scrub: 0.3,
    //     pin: true
    // });
    },
    
    // 모바일 애니메이션 (768px 이하)
    "(max-width: 768px)": function() {
    
    }
});

// 비즈니스 섹션 애니메이션 (1024px 이상)
ScrollTrigger.matchMedia({
    "(min-width: 1024px)": () => {
    const ani1 = gsap.timeline();

    ani1.from('.busi-contents-wrap .busi02', {x: '100%'}, 'fir')
        .from('.busi-contents-wrap .busi03', {x: '100%'}, 'sec')
        .from('.busi-contents-wrap .busi04', {x: '100%'}, 'thi');

    let st = ScrollTrigger.create({
        animation: ani1,
        trigger: '.main-busi .busi-motion',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
    });

    // 비즈니스 메뉴 클릭 이벤트
    $('.busi-menu-wrap button').on('click', function() {
        var i = $(this).index();

        $(this).attr('aria-selected', true)
            .siblings('button')
            .attr('aria-selected', false);

        if (i == 0) {
        $('html, body').stop().animate({scrollTop: $('.busi-motion').offset().top}, 1000);
        } else if (i == 1) {
        gsap.to(window, {duration: 1, scrollTo: ani1.scrollTrigger.labelToScroll('sec')});
        } else if (i == 2) {
        gsap.to(window, {duration: 1, scrollTo: ani1.scrollTrigger.labelToScroll('thi')});
        } else if (i == 3) {
        gsap.to(window, {duration: 1, scrollTo: st.end});
        }
    });
    }
});

// Swiper 슬라이더 초기화
const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 15,
    centeredSlides: true,
    autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    grabCursor: true
    },
    breakpoints: {
    769: {
        spaceBetween: 30
    }
    },
    pagination: {
    el: '.custom-pagination',
    clickable: true,
    renderBullet: function(index, className) {
        return `<span class="${className}"></span>`;
    }
    }
});

// 비즈니스 슬라이드 함수 실행
busiSlide();

// 비즈니스 슬라이드 함수 정의
function busiSlide() {
    var busiOptions = {
        swipeToSlide: true,
        draggable: true,
        pauseOnHover: false,
        pauseOnFocus: false,
        touchThreshold: 5000,
        infinite: false,
        arrows: false,
        dots: true,
        appendDots: $('.busi-con .slide-dot-wrap')
    };
    
    if ($(document).width() > 1024) {
    if ($('.busi-contents-wrap').hasClass('slick-initialized')) {
        $('.busi-contents-wrap').slick('unslick');
    }
    } else {
    if (!$('.busi-contents-wrap').hasClass('slick-initialized')) {
        console.log('~?')
        $('.busi-contents-wrap').slick(busiOptions);
    }
    }
}

// 비즈니스 스크롤 함수 정의
function busiSc() {
    if ($(document).width() > 1024) {
    $('.busi-contents-wrap .busi-content').each(function(i) {
        if ($(window).scrollTop() + $(window).height() > $('.busi-contents-wrap .busi-content').eq(i).offset().left + $(window).scrollTop()) {
        $('.busi-menu-wrap button').attr('aria-selected', false);
        $('.busi-menu-wrap button').eq(i).attr('aria-selected', true);
        }
    });
    }
}

// 스크롤 이벤트
$(window).on('scroll', function() {
    busiSc();
});

// 재생/일시정지 토글 버튼
const toggleBtn = document.querySelector('.play-toggle');
let isPaused = false;

toggleBtn.addEventListener('click', () => {
    if (isPaused) {
    swiper.autoplay.start();
    toggleBtn.classList.remove('play');
    } else {
    swiper.autoplay.stop();
    toggleBtn.classList.add('play');
    }
    isPaused = !isPaused;
});

// SC3 섹션 애니메이션
ScrollTrigger.matchMedia({
"(min-width: 769px)": function () {
    // // 섹션 전체 pin + 내부 요소 등장 타임라인
    // const sc3Timeline = gsap.timeline({
    // scrollTrigger: {
    //     trigger: ".sc3",
    //     start: "top top",
    //     end: "+=300%",
    //     scrub: true,
    //     pin: true,
    //     //markers: true
    // }
    // });

    // sc3Timeline
    // .to(".sc3 .image", {
    //     scale: 1,
    //     duration: 1.2
    // }, "-=0.2")
    // .from(".sc3 h2", {
    //     opacity: 0,
    //     y: 50,
    //     filter: "blur(10px)",
    //     duration: 1
    // })
    // .from(".sc3 h3", {
    //     opacity: 0,
    //     y: 50,
    //     filter: "blur(10px)",
    //     duration: 1
    // }, "-=0.6")
    // .from(".sc3 .link-list", {
    //     opacity: 0,
    //     y: 30,
    //     filter: "blur(10px)",
    //     stagger: 0.3, // 조금 여유롭게
    //     duration: 1
    // }, "-=0.2");
}
});


// SC4 섹션 애니메이션
ScrollTrigger.matchMedia({
"(min-width: 769px)": function () {
    // const sc4Timeline = gsap.timeline({
    // scrollTrigger: {
    //     trigger: ".sc4",
    //     start: "top top",
    //     end: "+=200%",
    //     scrub: true,
    //     pin: true,
    //     // markers: true
    // }
    // });

    // sc4Timeline
    // .to(".sc4 .image", {
    //     scale: 1,
    //     duration: 1.2
    // }, "-=0.2")
    // .from(".sc4 h2", {
    //     opacity: 0,
    //     y: 50,
    //     filter: "blur(10px)",
    //     duration: 1
    // })
    // .from(".sc4 .text-group .text", {
    //     opacity: 0,
    //     y: 30,
    //     filter: "blur(10px)",
    //     duration: 0.8
    // }, "-=0.5")
    // .from(".sc4 .text-group .link", {
    //     opacity: 0,
    //     y: 20,
    //     filter: "blur(10px)",
    //     stagger: 0.2,
    //     duration: 0.6
    // }, "-=0.4")
    // .from(".sc4 .sc4-slide", {
    //     opacity: 0,
    //     scale: 1,
    //     filter: "blur(10px)",
    //     duration: 1
    // }, "-=0.3");
}
});
// SC5 섹션 애니메이션
ScrollTrigger.matchMedia({
    // "(min-width: 769px)": function () {
    //   const sc5Timeline = gsap.timeline({
    //     scrollTrigger: {
    //       trigger: ".sc5",
    //       start: "top top",
    //       end: "+=200%",
    //       scrub: true,
    //       pin: true,
    //       // markers: true,
    //     }
    //   });
  
    //   sc5Timeline
    //     .from(".sc5 .hgroup", {
    //       opacity: 0,
    //       y: -50,
    //       filter: "blur(10px)",
    //       duration: 1
    //     })
    //     .from(".sc5 .link-container .lg", {
    //       opacity: 0,
    //       x: -50,
    //       filter: "blur(10px)",
    //       duration: 0.8
    //     }, "-=0.5")
    //     .from(".sc5 .link-container .sm", {
    //       opacity: 0,
    //       x: 50,
    //       filter: "blur(10px)",
    //       duration: 0.8
    //     }, ">");
    // }
  });
  


// 헤더 함수 정의 및 실행
function headers() {
    var header = document.querySelector('.main-header');
    var breadcrumb = document.querySelector('.breadcrumb');
    var breadcrumbTop = header.offsetHeight;
    var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;

    // 스크롤 방향에 따라 헤더 상태 업데이트
    function updateScrollDirection() {
    var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
    var isScrollingDown = currentScrollY > lastScrollY;
    
    // body에 mm-open 클래스가 있으면 항상 header에 'up' 클래스 추가
    if (document.body.classList.contains('mm-open')) {
        header.classList.add('up');
        lastScrollY = currentScrollY;
        return;
    }
    
    if (header.classList.contains('_sub') && breadcrumb) {
        if (currentScrollY >= breadcrumbTop) {
        if (isScrollingDown) {
            header.classList.add('hide');
            header.classList.remove('up');
        } else {
            header.classList.remove('hide');
            if (currentScrollY > 0) {
            header.classList.add('up');
            } else {
            header.classList.remove('up');
            }
        }
        } else {
        header.classList.remove('hide', 'up');
        }
    } else {
        if (isScrollingDown) {
        header.classList.add('hide');
        header.classList.remove('up');
        } else {
        header.classList.remove('hide');
        if (currentScrollY > 0) {
            header.classList.add('up');
        } else {
            header.classList.remove('up');
        }
        }
    }
    lastScrollY = currentScrollY;
    }

    // 초기 스크롤 상태 반영
    document.addEventListener('DOMContentLoaded', function() {
    lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    if (document.body.classList.contains('mm-open')) {
        header.classList.add('up');
    } else if (header.classList.contains('_sub') && breadcrumb) {
        var _breadcrumbTop = breadcrumb.getBoundingClientRect().top + window.scrollY;
        if (lastScrollY >= _breadcrumbTop) {
        header.classList.add('up', 'hide');
        } else {
        header.classList.remove('up', 'hide');
        }
    } else {
        if (lastScrollY > 50) { 
        header.classList.add('up', 'hide');
        } else {
        header.classList.remove('up', 'hide');
        }
    }
    });

    // 스크롤 이벤트 리스너 추가
    window.addEventListener('scroll', updateScrollDirection);
}

headers();

// 부드러운 스크롤 객체 정의
var smoothscroll = {
    passive: function() {
    var supportsPassive = false;
    try {
        document.addEventListener('test', null, {
        get passive() {
            supportsPassive = true;
        }
        });
    } catch (e) {}
    return supportsPassive;
    },
    
    init: function() {
    var userAgent = navigator.userAgent.toLowerCase();
    var isMobile = /iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent);
    var isMac = /macintosh|mac os x/i.test(userAgent);
    
    if (isMobile || isMac) return;

    if (this.passive()) {
        window.addEventListener('wheel', this.scrolling, {
        passive: false
        });
    } else {
        window.addEventListener('mousewheel', this.scrolling);
        window.addEventListener('DOMMouseScroll', this.scrolling);
    }
    },
    
    destroy: function() {
    if (this.passive()) {
        window.removeEventListener('wheel', this.scrolling);
    } else {
        window.removeEventListener('mousewheel', this.scrolling);
        window.removeEventListener('DOMMouseScroll', this.scrolling);
    }
    gsap.killTweensOf(window, {
        scrollTo: true
    });
    },
    
    scrolling: function(event) {
    event.preventDefault();
    var scrollTime = 1;
    var distanceOffset = 2.5;
    var scrollDistance = window.innerHeight / distanceOffset;
    var delta = 0;
    
    if (smoothscroll.passive()) {
        delta = event.wheelDelta / 120 || -event.deltaY / 3;
    } else {
        if (typeof event.originalEvent.deltaY != 'undefined') {
        delta = -event.originalEvent.deltaY / 120;
        } else {
        delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
        }
    }
    
    var scrollTop = document.documentElement.scrollTop;
    var finalScroll = scrollTop - parseInt(delta * scrollDistance);
    
    gsap.to(window, {
        duration: scrollTime,
        scrollTo: {
        y: finalScroll,
        autoKill: true
        },
        ease: 'power3.out',
        overwrite: 2
    });
    }
};

smoothscroll.init();

// 맨 위로 스크롤 버튼 애니메이션
gsap.fromTo("#btnTop",
    { autoAlpha: 0, y: 50 },
    {
    autoAlpha: 1,
    y: 0,
    duration: 0.5,
    ease: "power2.out",
    scrollTrigger: {
        trigger: "body",
        start: "top -100",
        toggleActions: "play none none reverse"
    }
    }
);

// 맨 위로 스크롤 버튼 클릭 이벤트
document.querySelector("#btnTop").addEventListener("click", (e) => {
    e.preventDefault();
    gsap.to(window, { scrollTo: 0, duration: 0.8, ease: "power2.out" });
});

// ScrollTrigger 새로고침
//ScrollTrigger.refresh();
window.addEventListener("resize", () => {
    let resizeTimer;

    clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {

        busiSlide();
        $('.busi-menu-wrap button').attr('aria-selected', false);
        $('.busi-menu-wrap button').eq(0).attr('aria-selected', true);
        if($window.width <= 769){
            ScrollTrigger.update();
        }
    }, 200);
});
});