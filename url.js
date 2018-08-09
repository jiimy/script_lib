$(document).ready(function () {
  var article_width = $('.area2').width();
  var $domain_check = null;
  var $headerWrap = $('header .contentWrap');

  function toggleClass(a, b) {
    $(a).toggleClass(b);
  }

  // 도메인확인하여 헤더에 main, sub 클래스 부여 - 도메인체크
  var domain_url = window.location.href;
  function domain_check() {
    if (domain_url === 'http://joongang.humanpivot.co.kr/') {
      // 메인일땐 main클래스
      $('header .contentWrap>div:nth-child(1)').addClass('main');
      // 메인일경우 변수 0
      $domain_check = 0;
    }
    else {
      $('header').addClass('sub');
      $('header .contentWrap').removeClass('main').addClass('sub');
      // 메인을 제외한 경우 변수 1
      $domain_check = 1;
      console.log('서브');
    }
  }; domain_check();
  // 현재 보고있는 서브 bold 주기
  // function bold(){
  //  var cut1 = domain_url.split('/');
  //  var reverse = cut1.reverse();
  //  var url = reverse[0];
  //  var cut2 = url.split('_');
  //  console.log(cut2[2]);
  // //  find_li(middle_url,)
  // }; bold();

  // function find_li(a,b){
  //   a
  // };
  var middle_url = '';
  // 현재 보고있는 1차메뉴의 서브메뉴들 보이게하기
  function on() {
    var cut = domain_url.split('/');
    var reverse = cut.reverse();
    middle_url = reverse[1];
    domain_match(middle_url);
  }; on();
  function domain_match(a) {
    if (url = a) {
      $('.' + a + '').addClass('on');
    }
  };

  // 메뉴 이동 - 임시
  $('header .contentWrap a').click(function () {
    var a = $(this).attr('href');
    window.location.href = a;
  });
  // 메뉴 - 메인,서브 공통
  $('.menuBtn').click(function () {
    // e.stopPropagation();
    console.log('버튼 클릭');
    $(this).toggleClass('show');
    $('.headerWrap').toggleClass('fullMenu');
    toggleClass('.main ul', 'block');
    $('header .sub ul').removeClass('block');
    toggleClass('.coverdim', 'none');
    toggleClass('.main h1 p', 'hidden');
    toggleClass('.sub .bar', 'none');

    // 서브일경우
    if ($domain_check == 1) {
      $('.headerWrap .contentWrap h1').toggleClass('absolute');
      $('.headerWrap').toggleClass('heightauto');
      if ($headerWrap.hasClass('sub')) {
        $headerWrap.removeClass('sub');
        $headerWrap.addClass('main');
        $('header .main ul').toggleClass('block');
      } else {
        $headerWrap.addClass('sub')
        $headerWrap.removeClass('main');
      }
    }
    // 메인일경우
    else {
      // console.log('메뉴에서 버튼 클릭');
    }
  });
  // 딤 클릭시
  $('.coverdim').click(function () {
    $('.main .menuBtn').trigger('click');
  });

  // 서브 - 메뉴
  $('header .sub>ul>li').click(function (e) {
    e.preventDefault();
    console.log('클릭');
    $(this).closest('li').siblings('li').removeClass('on');
    $(this).addClass('on');
  });
  $('header .sub>ul>li').mouseover(function () {
    $(this).siblings('li').removeClass('on');
    $(this).addClass('on');
    li_index = $(this).index();
  });
  //현재 보고있는 페이지li에 on을 계속 넣는 function 입니다.
  var $li_index = '';
  var a = $('ul').find('.on').index();
  $li_index = a;
  $('header .sub>ul').mouseleave(function () {
    console.log($li_index);
    $(this).children('li').siblings('li').removeClass('on');
    $('header .sub>ul>li').eq($li_index).addClass('on');
  })

  
  $('.list_itemWrap a').on('click',function(e){
    find_img_index =$(this).parents('.list_itemWrap').find('.on').index();
    e.preventDefault();
    var el = $(this).attr('href');
    var elOffset = $(el).offset().top;
    var offset = elOffset - 250
    $(window).scrollTop(offset);
  })

  // 메인 영상
  $('.area2').click(function (e) {
    e.preventDefault();
    $('#player02').triggerHandler('click');
    $('.main .dim').css('opacity', '0.6');
    // $(this).css('display','none');
    var contentWidth = $('.area2').width();
    // console.log('contents높이 : '+ contentHeight)
    var youtubeHeight = contentWidth * 9 / 16;
    // console.log('유튜브 넓이 '+youtubeWidth);
    $('.youtube1').css({
      'width': contentWidth,
      'height': youtubeHeight
    });
    // $('.hi_video').fadeOut(50);
    $('.youtube1').css('z-index', '10');
    player02.playVideo();
  });

  //기욤 영상
  $('.area6__youtube .contents').click(function (e) {
    e.preventDefault();
    $('#player01').triggerHandler('click');
    // alert('adsf');
    $(this).css('display', 'none');
    // var contentWidth = $('.area6__youtube').width()
    // console.log('contents넓이 : '+ contentWidth)
    var youtubeHeight = $(".area6__youtube").width() * 9 / 16;
    $('.youtube2').css({
      'height': youtubeHeight
    });
    // console.log('유튜브 높이 '+youtubeHeight);
    // $('.hi_video').fadeOut(50);
    $('.youtube2').css('z-index', '10');
    player01.playVideo();
  });

  // sub0202 - 대회안내 - 코스안내 탭
  $('.tabNav li').click(function (e) {
    e.preventDefault();
    var idx = $(this).index();
    $('.tabNav li').removeClass('tabNav_active').eq(idx).addClass('tabNav_active');
    $('.tab').removeClass('tab_show').eq(idx).addClass('tab_show');
  });
});


// 유튜브 선언?
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 유툽 셋팅
var player01;
var player02;
function onYouTubeIframeAPIReady() {
  // 기욤영상
  player01 = new YT.Player('player01', {
    width: '100%',
    height: '100%',
    videoId: 'KTm6ME2BSvI', //유투브 영상 아이디
    playerVars: {
      'rel': 0, // 추천 영상 없애기
      'showinfo': 0, // 타이틀 없애기
    },
  });
  // 뛰는 영상
  player02 = new YT.Player('player02', {
    width: '100%',
    height: '100%',
    videoId: 'KTm6ME2BSvI', //유투브 영상 아이디
    playerVars: {
      'rel': 0, // 추천 영상 없애기
      'showinfo': 0, // 타이틀 없애기
    },
  });
}
