//preloading for page
DP_STATS_DOMAIN = window.DP_STATS_DOMAIN || '';
DP_TRACKING_DOMAIN = window.DP_TRACKING_DOMAIN || '';
$(window).load(function() { // makes sure the whole site is loaded 
	var status = $('#status');
	var preloader = $('#preloader');
	var body = $('body');
	register_onload(function(){
		status.fadeOut(); // will first fade out the loading animation 
		preloader.delay(0).fadeOut('fast'); // will fade out the white DIV that covers the website. 
		body.delay(0).css({'overflow':'visible'});
	});
	
	var vidDefer = document.getElementsByTagName('iframe');
	for (var i=0; i<vidDefer.length; i++) {
		if(vidDefer[i].getAttribute('data-src')) {
			vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
		} 
	}
	
	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.2&appId=352806531987184&autoLogAppEvents=1';
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
	
	window.fbAsyncInit = function() {
    	FB.init({
	        appId      : '352806531987184',
	        xfbml      : true,
	        version    : 'v3.2'
	    });
	    var EventHandler = null;
	    // Get Embedded Video Player API Instance
	    FB.Event.subscribe('xfbml.ready', function(msg) {
		    if (msg.type === 'video') {
		    	var id = msg.id;
		    	if(window.FBEmbedVideos[id]){
		    		var url = window.FBEmbedVideos[id].url;
		    		if(!window.FBEmbedVideos[id].instance){
		    			tracking_event('fb_embed_video', window.FBEmbedVideos[id].data);
		    		}
		    		window.FBEmbedVideos[id].instance = msg.instance;
		    		
		    		var handleStartedPlaying = function(e){
		    			window.FBEmbedVideos[id].data.play = true;
		    			tracking_event('fb_embed_video', window.FBEmbedVideos[id].data);
			        	window.FBEmbedVideos[id].event.release('startedPlaying');
			        }
			        var handleFinishedPlaying = function(e){
			        	window.FBEmbedVideos[id].event = window.FBEmbedVideos[id].instance.subscribe('startedPlaying', handleStartedPlaying);
			        }
		    		
		    		window.FBEmbedVideos[id].event = window.FBEmbedVideos[id].instance.subscribe('startedPlaying', handleStartedPlaying);
		    		window.FBEmbedVideos[id].instance.subscribe('finishedPlaying', handleFinishedPlaying);
		    	}
		     }
	    });
	};
	
	$("[data-news]").each(function(){
		get_related_news($(this));
	});
	
	ADS_CONFIG.load();
	
	$('.tooltips-container').easyTooltip({
		contentFunc: function(target){
			var title = target.find(".tooltips-title").html();
			var stitle = target.find(".tooltips-stitle").html();
			var etitle = target.find(".tooltips-etitle").html();
			var des = target.find(".tooltips-des").html();
			if(!title) return '';
			return ''+
			'<div class="content">'+
			'	<p class="title">'+ title +
			(stitle?'<span> ('+stitle+')</span>':'') +
			'	</p>'+
			'	<p class="eng_title">'+ etitle +
			'	</p>'+
			'</div>'+
			'<div class="des">'+
			'	<small>'+des+'</small>'+
			'</div>';
		}
	});
	$('.shortener').shortener();
})
$(function(){
	'use strict';
	// js for dropdown menu
	var windowWidth = $(window).width();
	if(windowWidth > 1024){
		var dropdown = $( '.dropdown');
		dropdown.hover(
	        function(){
	            $(this).children('.dropdown-menu').fadeIn(100);
	        },
	        function(){
	            $(this).children('.dropdown-menu').fadeOut(100);
	        }
	    );	   
	}else{
		var dropdownClick = $('.navbar a.dropdown-toggle');
		dropdownClick.on('click', function(e) {
			var $el = $(this);
			var $parent = $(this).offsetParent(".dropdown-menu");
			var $open = $('.nav li.open');
			$(this).parent("li").toggleClass('open');

			if(!$parent.parent().hasClass('nav')) {
				$el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
			}
			$open.not($(this).parents("li")).removeClass("open");
			return false;
		});
	}
	//js for nav icon 
	var clickMenubtn = $('#nav-icon1');
	clickMenubtn.on('click', function(){
		$(this).toggleClass('open');
	});
	//==js for login and sign up
	//== scroll function for single page
	$(window).scroll(function(event) {
		/* Act on the event */
		var scrollPos = $(window).scrollTop(),
		header = $('header');
		//sticky for menu
		if(scrollPos > 300){
			header.addClass('sticky');
			$('body').addClass('header-sticky');
		}else{
			header.removeClass('sticky');
			$('body').removeClass('header-sticky');
		}
	});		
	//back to top js
	var backtotop = $('#back-to-top');
    backtotop.on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });

	//sticky sidebar
	if(windowWidth > 1200){
		var stickySidebar = $('.sticky-sb');
		var mainCt = $('.main-content');
		if (stickySidebar.length > 0) {	
			var stickyHeight = stickySidebar.height(),
			sidebarTop = stickySidebar.offset().top;
		}
		// on scroll move the sidebar
		$(window).scroll(function () {
		  if (stickySidebar.length > 0) {	
		    var scrollTop = $(window).scrollTop();
		            
		    if (sidebarTop < scrollTop) {
		      stickySidebar.css('top', scrollTop - sidebarTop+ 80);

		      // stop the sticky sidebar at the footer to avoid overlapping
		      var sidebarBottom = stickySidebar.offset().top + stickyHeight,
		        stickyStop = mainCt.offset().top + mainCt.height();
		      if (stickyStop < sidebarBottom) {
		        var stopPosition = mainCt.height() - stickyHeight + 130;
		        stickySidebar.css('top', stopPosition);
		      }
		    }
		    else {
		      stickySidebar.css('top', '0');
		    } 
		  }
		});
		$(window).resize(function () {
		  if (stickySidebar.length > 0) {	
		    stickyHeight = stickySidebar.height();
		  }
		});
	}
	
	$(".menu-icon").click(function(){
        $("body").toggleClass('nav-active');
    });
    $(".nav__search-icon").click(function(){
        $(".nav__header").toggleClass('search-active');
        $(this).find(".fa").toggleClass("fa-times");
    });
    $(window).resize(function(){
    	$(".boxed").css("padding-top", $("header.ht-header").height()+"px");
    }).resize();
    
    // filter action
    $('#filter_form').submit(function(e){
		e.preventDefault();
		var form = $(this);
		var data = form.serializeArray();
		var data_filtered = data.filter(function (el) {
		  return el['value'] != '';
		});
		var query = '?';
		for(var i = 0 ; i < data_filtered.length ; i++){
			var tmp = data_filtered[i];
			query += tmp['name'] + '=' + tmp['value'];
			if(i < data_filtered.length - 1) query += '&';
		}
		var url = form.prop('action') + query;
		window.location.href = url;
	});

});

function carouselNormalization(carousel) {
	var items = carousel.find('.item'), //grab all slides
	    heights = [], //create empty array to store height values
	    tallest; //create variable to make note of the tallest slide

	if (items.length) {
	    function normalizeHeights() {
	        items.each(function() { //add heights to array
	            heights.push($(this).height()); 
	        });
	        tallest = Math.max.apply(null, heights); //cache largest value
	        items.each(function() {
	            $(this).css('min-height',tallest + 'px');
	        });
	    };
	    normalizeHeights();

	    $(window).on('resize orientationchange', function () {
	        tallest = 0, heights.length = 0; //reset vars
	        items.each(function() {
	            $(this).css('min-height','0'); //reset min-height
	        }); 
	        normalizeHeights(); //run it again 
	    });
	}
}

function player_scroll(player_elem){
	var item = $(player_elem).parent();
	var anchor = item.parent();
	
	var status = 'nf';
	var clone;
	$(window).on('scroll',function(){
		var cpoint = anchor.offset().top;
		var cur = $(window).scrollTop();
		if(cur>cpoint){
			if (status != 'f'){
				status = 'f';
				var height = item.height();
				clone = $("<div/>").height(height).addClass("clone-fix");
				anchor.addClass('anchor-fix');
				item.addClass('player-fix');
				clone.insertAfter(item);
			}
			
		}else{
			if (status != 'nf'){
				status = 'nf';
				anchor.removeClass('anchor-fix');
				item.removeClass('player-fix');
				clone && clone.remove();
			}
		}
	});
}

function get_loader(){
	return '<h3="text-center"><i class="fa fa-circle-o-notch"></i></h3>';
}

function build_url(base, queries){
//	return base + "/encprs/" + encodeURIComponent(btoa(JSON.stringify(queries)));
	for (var key in queries){
		if(!queries[key]){
			delete queries[key];
		}
	}
//	var query_string = $.param(queries);
	return base + (base.match(/\?/)?"&":"?") + $.param(queries);
//	return base + "/" + query_string.replace(/\&|\=/g, "/");
}

var onload_func = [];
var onload_flag = true;
function delay_onload(){
	onload_flag = false;
}
function register_onload(func){
	if(!onload_flag){
		onload_func.push(func);
	}else{
		func();
	}
}

function kick_onload(){
	onload_flag = true;
	for(var i in onload_func){
		onload_func[i]();
	}
}

function isEmpty( el ){
    return !$.trim(el.html())
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    },
    mgid: function(){
    	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.Opera() || isMobile.Windows() || navigator.userAgent.match(/iPhone/i));
    }
};

function initSidebar(id){
	var container = $('#'+id);
	var sidebar = container.find('.sidebar-container');
	
	function calculate_sidebar_width(){
		if(sidebar.hasClass("affix")){
			sidebar.css("width", sidebar.parent().outerWidth() + "px");
		}
	}
	sidebar.affix({
	      offset: {
	        top: function(){return container.offset().top},
	        bottom : function(){return $("footer").height() + 50}
	      }
	})
	.on("affixed.bs.affix", function(){
		calculate_sidebar_width();
		$(document).trigger("affix.sidebar.in");
		$('.mgid-sidebar').addClass('hidden-lg');
		if(window.FBEmbedVideos['fb-video-player']){
			$("#fb-embed-video-bg").addClass("hidden-lg");
			window.FBEmbedVideos['fb-video-player'].instance && window.FBEmbedVideos['fb-video-player'].instance.pause();
		}
		
	})
	.on("affixed-top.bs.affix", function(){
		sidebar.css("width", "auto");
		if(window.FBEmbedVideos['fb-video-player']){
			$("#fb-embed-video-bg").removeClass("hidden-lg");
		}
		$('.mgid-sidebar').removeClass('hidden-lg');
	});

	$(window).on("resize", function(){
		calculate_sidebar_width();
	});
}

function getSessionID() {
	var name = "_uuid=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for(var i = 0; i <ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function tracking_event(event, data){
	new Image().src = DP_TRACKING_DOMAIN + '/detail/tracking?' + $.param({
		type : event,
		data : data
	});
}

window.FBEmbedVideos = [];
function initFBVideoEvent(id, url){
	window.FBEmbedVideos[id] = {
		url: url,						// embed video's url
		data : {						// data used for tracking
			videoID : url,				// url Video
			sessionID : getSessionID(),	// sessionID
			id : Math.random().toString(36).substr(2, 9),   // request id
			play : false									// video play
		}
	};
}

function AdsLoader(){
	this.data = [];
	this.run = [];
	this.manual_ads = [];
	this.inject = {};
	this.ads_w_rate = {};
	
	this.ads_w_rate_total = {};
} 

AdsLoader.prototype.add = function(data){
//	console.log(data);
	
	if(data.mobile_only && !isMobile.any()) return;
	if(data.desktop_only && isMobile.any()) return;
	
	var id = data.ads_id;
	if(!this.ads_w_rate[id]){
		this.ads_w_rate[id] = [];
		this.ads_w_rate_total[id] = 0;
	}
	if (data.rate == null){
		data.rate = 1;
	}
	
	this.ads_w_rate[id].push(data);
	this.ads_w_rate_total[id] += data.rate;
	
//	this.data.push(data);
};

AdsLoader.prototype.load = function(){
	var self = this;
	for(var id in this.ads_w_rate){
		var total = this.ads_w_rate_total[id];
		if(total == 0){
			continue;
		}
		var ads_arr = this.ads_w_rate[id];
		
		var anchor = 0;
		while (anchor == 0){
			anchor = Math.random();
		}
		var flag = 0;
		for(var i in ads_arr){
			var data = ads_arr[i];
			var weight = data.rate/total;
			if(weight+flag >= anchor){
				if(self.run.indexOf(data.ads_id) == -1){
//					console.log("load ads", data)
					self.run.push(data.ads_id);
					self.load_ads(data);
				}
			}else{
				flag += weight;
			}
		}
	}
};

AdsLoader.prototype.load_ads = function(data_config){
	switch (data_config.ads_provider){
		case 'fb':
			this.load_fb_ads(data_config);
			break;
		case 'mg':
			this.load_mg_ads(data_config);
			break;
		case 'gl':
			this.load_gl_ads(data_config);
			break;
		case 'img_list':
			this.load_img_list_ads(data_config);
			break;
		case 'img':
			this.load_img_ads(data_config);
			break;
		case 'article':
			this.load_article_ads(data_config);
			break;
	}
};

AdsLoader.prototype.load_fb_ads = function(data_config){
	var flag = data_config.type == 'footer'?IS_MOVIE_EPS:false;
	var remove_ads = function(){
//		console.log('remove');
		$(data_config.container).remove();
		if(data_config.error_handle){
			data_config.error_handle();
		}
	};
    if(isMobile.any() && !flag){
//    	console.log('abxc');
    	var data = {
    		placementid: data_config.placement_id,
    		format: data_config.format,
    		testmode: false,
    		onAdLoaded: function(element) {
    			console.log('Audience Network [' +data_config.placement_id+ '] ad loaded');
    			element.style.display = 'block';
    		},
    		onAdError: function(errorCode, errorMessage) {
    			console.log('Audience Network [' +data_config.placement_id+ '] error (' + errorCode + ') ' + errorMessage);
    			remove_ads();
    		}
    	};
    	(function(a,b,c){var d="https://www.facebook.com",e="https://connect.facebook.net/en_US/fbadnw55.js",f={iframeLoaded:true,xhrLoaded:true},g=data,h=function(){if(Date.now){return Date.now();}else return +new Date();},i=function(aa){var ba=d+"/audience_network/client_event",ca={cb:h(),event_name:"ADNW_ADERROR",ad_pivot_type:"audience_network_mobile_web",sdk_version:"5.5.web",app_id:g.placementid.split("_")[0],publisher_id:g.placementid.split("_")[1],error_message:aa},da=[];for(var ea in ca)da.push(encodeURIComponent(ea)+"="+encodeURIComponent(ca[ea]));var fa=ba+"?"+da.join("&"),ga=new XMLHttpRequest();ga.open("GET",fa,true);ga.send();if(g.onAdError)g.onAdError("1000","Internal error.");},j=function(){if(b.currentScript){return b.currentScript;}else{var aa=b.getElementsByTagName("script");return aa[aa.length-1];}},k=function(aa){try{return aa.document.referrer;}catch(ba){}return "";},l=function(){var aa=a,ba=[aa];try{while(aa!==aa.parent&&aa.parent.document)ba.push(aa=aa.parent);}catch(ca){}return ba.reverse();},m=function(){var aa=l();for(var ba=0;ba<aa.length;ba++){var ca=aa[ba],da=ca.ADNW||{};ca.ADNW=da;if(!ca.ADNW)continue;return da.v55=da.v55||{ads:[],window:ca};}throw new Error("no_writable_global");},n=function(aa){var ba=aa.indexOf("/",aa.indexOf("://")+3);if(ba===-1)return aa;return aa.substring(0,ba);},o=function(aa){return aa.location.href||k(aa);},p=function(aa){if(aa.sdkLoaded)return;var ba=aa.window.document,ca=ba.createElement("iframe");ca.name="fbadnw";ca.style.display="none";ba.body.appendChild(ca);var da=ca.contentDocument.createElement("script");da.src=e;da.async=true;ca.contentDocument.body.appendChild(da);aa.sdkLoaded=true;},q=function(aa){var ba=/^https?:\/\/www\.google(\.com?)?.\w{2,3}$/;return !!aa.match(ba);},r=function(aa){return !!aa.match(/cdn\.ampproject\.org$/);},s=function(){var aa=c.ancestorOrigins||[],ba=aa[aa.length-1]||c.origin,ca=aa[aa.length-2]||c.origin;if(q(ba)&&r(ca)){return n(ca);}else return n(ba);},t=function(aa){try{return JSON.parse(aa);}catch(ba){i(ba.message);throw ba;}},u=function(aa,ba,ca){if(!aa.iframe){var da=ca.createElement("iframe");da.src=d+"/audiencenetwork/iframe/";da.style.display="none";ca.body.appendChild(da);aa.iframe=da;aa.iframeAppendedTime=h();aa.iframeData={};}ba.iframe=aa.iframe;ba.iframeData=aa.iframeData;ba.tagJsIframeAppendedTime=aa.iframeAppendedTime||0;},v=function(aa){var ba=d+"/audiencenetwork/xhr/?sdk=5.5.web";for(var ca in aa)if(typeof aa[ca]!=="function")ba+="&"+ca+"="+encodeURIComponent(aa[ca]);var da=new XMLHttpRequest();da.open("GET",ba,true);da.withCredentials=true;da.onreadystatechange=function(){if(da.readyState===4){var ea=t(da.response);aa.events.push({name:"xhrLoaded",source:aa.iframe.contentWindow,data:ea,postMessageTimestamp:h(),receivedTimestamp:h()});}};da.send();},w=function(aa,ba){var ca=d+"/audiencenetwork/xhrifr ame/?sdk=5.5.web";for(var da in ba)if(typeof ba[da]!=="function")ca+="&"+da+"="+encodeURIComponent(ba[da]);var ea=b.createElement("iframe");ea.src=ca;ea.style.display="none";b.body.appendChild(ea);ba.iframe=ea;ba.iframeData={};ba.tagJsIframeAppendedTime=h();},x=function(aa){var ba=function(event){try{var da=event.data;if(da.name in f)aa.events.push({name:da.name,source:event.source,data:da.data});}catch(ea){}},ca=aa.iframe.contentWindow.parent;ca.addEventListener("message",ba,false);},y=function(aa){if(aa.context&&aa.context.sourceUrl)return true;try{return !!JSON.parse(decodeURI(aa.name)).ampcontextVersion;}catch(ba){return false;}},z=function(aa){var ba=h(),ca=l()[0],da=j().parentElement,ea=ca!=a.top,fa=ca.$sf&&ca.$sf.ext,ga=o(ca),ha=m();p(ha);var ia={amp:y(ca),events:[],tagJsInitTime:ba,rootElement:document.getElementById(data_config.id),iframe:null,tagJsIframeAppendedTime:ha.iframeAppendedTime||0,url:ga,domain:s(),channel:n(o(ca)),width:screen.width,height:screen.height,pixelratio:a.devicePixelRatio,placementindex:ha.ads.length,crossdomain:ea,safeframe:!!fa,placementid:g.placementid,format:g.format||"300x250",testmode:!!g.testmode,onAdLoaded:g.onAdLoaded,onAdError:g.onAdError};if(g.bidid)ia.bidid=g.bidid;if(ea){w(ha,ia);}else{u(ha,ia,ca.document);v(ia);}x(ia);ia.rootElement.dataset.placementid=ia.placementid;ha.ads.push(ia);};try{z();}catch(aa){i(aa.message||aa);throw aa;}})(window,document,location);
    }else{
    	remove_ads();
	}
};

AdsLoader.prototype.load_mg_ads = function(data_config){
	var type = data_config.type;
	var mobile_ads = ['airtime', 'movie-eps'];
	var is_mobile_ads = mobile_ads.indexOf(type) != -1;
	var flag = ( is_mobile_ads && isMobile.mgid() ) || type == 'sidebar';
	var ads_container = $('#' + data_config.container_id);

	if(flag){
		var key = 'mgid_c_' + type;

//		var custom_ads_data = this.get_custom_ads_data(data_config, is_mobile_ads, key);
//		
//		if(custom_ads_data){
//			this.load_custom_ads(ads_container, custom_ads_data.custom, custom_ads_data.url, custom_ads_data.thumb);
//		}else{
			if(data_config.version == 1){
				var _str = '<!-- Composite Start --><div id="'+data_config.scriptroot_id+'"><div id="'+data_config.preload_id+'">Loading...</div></div><!-- Composite End -->';
				ads_container.append(_str);
				(function(){
					var D=new Date(),d=document,b='body',ce='createElement',ac='appendChild',st='style',ds='display',n='none',gi='getElementById',lp=d.location.protocol,wp=lp.indexOf('http')==0?lp:'https:';
					var i=d[ce]('iframe');i[st][ds]=n;d[gi](data_config.scriptroot_id+'')[ac](i);try{var iw=i.contentWindow.document;iw.open();iw.writeln("<ht"+"ml><bo"+"dy></bo"+"dy></ht"+"ml>");iw.close();var c=iw[b];}
					catch(e){var iw=d;var c=d[gi](data_config.scriptroot_id+'');}var dv=iw[ce]('div');dv.id="MG_ID";dv[st][ds]=n;dv.innerHTML=data_config.innerHTML;c[ac](dv);
					var s=iw[ce]('script');s.async='async';s.defer='defer';s.charset='utf-8';s.src=wp+data_config.src+D.getYear()+D.getMonth()+D.getUTCDate()+D.getUTCHours();c[ac](s);})();
			}else if(data_config.version == 2){
				if(!this.inject['mgv2']){
					$("header").append('<style>@media(min-width:480px){.mgiframe{width:100% !important;height:370px!important;max-width:360px;margin:auto;display: table;}} @media(max-width:480px){.mgiframe{width:100% !important;height:370px!important;}}</style>');
					this.inject['mgv2'] = true;
				}
				var _str = '<iframe class="mgiframe" src="'+data_config.src+'" width="100%" height="500" frameborder="0"></iframe>';
				ads_container.append(_str);
			}
			ads_container.addClass('mgid-container');
//		}
	}else{
		ads_container.hide();
	}
};


AdsLoader.prototype.load_img_list_ads = function(data_config){
	var ads_list = data_config.ads_list;
	if(ads_list.length == 0) return;
	var idx = Math.floor(Math.random()*ads_list.length);
	var data = ads_list[idx];
	$(data_config.container).append(
		this.create_img_ads(data.url, data.thumb, data_config.cssClass)
	);
};

AdsLoader.prototype.load_img_ads = function(data_config){
	$(data_config.container).append(
		this.create_img_ads(data_config.url, data_config.img, data_config.cssClass)
	);
};

AdsLoader.prototype.create_img_ads = function(url, img, cls){
	return '<a class="'+cls+'" href="'+url+'" rel="nofollow"><img src="" class="lazy ads_banner_img img-responsive" data-original="'+img+'"></a>'
};

AdsLoader.prototype.load_gl_ads = function(data_config){
	var resolveAds = function(type){
		if(type == 'search_banner'){
			$('.banner_img_mb').hide();
		}
	};
	
	var ads_container = $('#' + data_config.id);
	
	var script = document.createElement('script');
	script.setAttribute('src', data_config.src);
	script.setAttribute('type', 'text/javascript');
	document.getElementById(data_config.id).appendChild(script);
	resolveAds(data_config.type);
};

AdsLoader.prototype.load_article_ads = function(data_config){
	
	var ads_container = $('#' + data_config.id);
	
	if(isMobile.any()){
		var script = document.createElement('script');
		script.setAttribute('src', data_config.src);
		script.setAttribute('type', 'text/javascript');
		document.getElementById(data_config.id).appendChild(script);
	}
};

ADS_CONFIG = new AdsLoader();
IS_MOVIE_EPS = window.IS_MOVIE_EPS || false;

function lazyload(){
	$(".lazy").lazyload().removeClass("lazy");
}

function playlistByMovie(id){
	var container = $('.playlist-btn-container');
	$.ajax({
		url : DP_STATS_DOMAIN + '/content/playlistContain',
		type : 'GET',
		dataType : 'json',
		data : {
			id : id,
			l : 1
		},
		success : function(msg){
			if(msg.error == 0){
				container.html(msg.html);
				var _str = '';
				for(var i = 0 ; i < msg.data.length; i++){
					var data = msg.data[i];
					_str += '<a href="'+data.url+'"><span class="playlist-view-all movie-eps-item active">Xem trọn bộ <span>'+data.title+'</span></span>';
				}
				container.html(_str).show();
			}
		}
	});
}

$(document).ajaxStop(function(){
    setTimeout(lazyload, 500);
});

function getIDFromUrl(url){
	var reg = '_(.*).html';
	var match = url.match(reg);
	if(match.length > 0) return match[1];
	return null;
}

var recommend_movie_tracking = null;
function init_recommmend_movie_tracking(title, type){
	recommend_movie_tracking = {
		from : {
			url : window.location.href,
			id : getIDFromUrl(window.location.href),
			title : title
		},
		sessionID : getSessionID(),
		id : Math.random().toString(36).substr(2, 9),
		click : false,
		type : type
	}
}

function tracking_recommend_movie(btn = null){
	if(btn) {
		recommend_movie_tracking.des = {
				title : btn.attr('title'),
				url : btn.attr('href'),
				id : getIDFromUrl(btn.attr('href'))
		};
		recommend_movie_tracking.click = true;
	}
	tracking_event('recommend_movie', recommend_movie_tracking);
}

/*
 * 	Easy Tooltip 1.0 - jQuery plugin
 *	written by Alen Grakalic	
 *	http://cssglobe.com/post/4380/easy-tooltip--jquery-plugin
 *
 *	Copyright (c) 2009 Alen Grakalic (http://cssglobe.com)
 *	Dual licensed under the MIT (MIT-LICENSE.txt)
 *	and GPL (GPL-LICENSE.txt) licenses.
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */
 
(function($) {

	$.fn.easyTooltip = function(options){
	  
		// default configuration properties
		var defaults = {	
			xOffset: 10,		
			yOffset: 25,
			tooltipId: "easyTooltip",
			clickRemove: false,
			content: "",
			contentFunc: function(){return ""},
			useElement: ""
		}; 
			
		var options = $.extend(defaults, options);  
		var content;
				
		this.each(function() {  				
			var title = $(this).attr("title");				
			$(this).hover(function(e){									 							   
				content = (options.content != "") ? options.content : title;
				content = (options.useElement != "") ? $("#" + options.useElement).html() : content;
				var content_from_func = options.contentFunc($(this));
				content = content_from_func != "" ? content_from_func:content;
				$(this).attr("title","");									  				
				if (content != "" && content != undefined){			
					$("body").append("<div id='"+ options.tooltipId +"'>"+ content +"</div>");		
					$("#" + options.tooltipId)
						.css("position","absolute")
						.css("top",(e.pageY - options.yOffset) + "px")
						.css("left",(e.pageX + options.xOffset) + "px")						
						.css("display","none")
						.fadeIn("fast")
				}
			},
			function(){	
				$("#" + options.tooltipId).remove();
				$(this).attr("title",title);
			});	
			$(this).mousemove(function(e){
				$("#" + options.tooltipId)
					.css("top",(e.pageY - options.yOffset) + "px")
					.css("left",(e.pageX + options.xOffset) + "px")					
			});	
			if(options.clickRemove){
				$(this).mousedown(function(e){
					$("#" + options.tooltipId).remove();
					$(this).attr("title",title);
				});				
			}
		});
	  
	};

})(jQuery);

(function($) {

	$.fn.shortener = function(options){
	  
		// default configuration properties
		var defaults = {
			type: 'chars',
			length: 200,		
			height: 300,
		}; 
			
		var options = $.extend(defaults, options);  
		var content;
		var get_opts = function(target, key){
			return target.data(key) || options[key];
		};
				
		this.each(function() {  				
			var target = $(this);
			var type = get_opts(target, 'type');
			var length = get_opts(target, 'length');
			var height = get_opts(target, 'height');
			var nav = $('<div class="shortener-nav"></div>');
			
			if(type=='height'){
				if(target.height() < height) return;
				var pass_position;
				target.append(nav);
				var cl = function(){
					target.addClass("shortener-height")
						.append(nav)
						.css("max-height", height + "px");
					nav.html("Xem toàn bộ").off("click.shortener").on("click.shortener", function(){
						pass_position = $(window).scrollTop();
						ex();
					});
				};
				var ex = function(){
					target.removeClass("shortener-height")
						.append(nav)
						.css("max-height", "none");
					nav.html("Rút gọn").off("click.shortener").on("click.shortener", function(){
						cl();
						$(window).scrollTop(pass_position);
					});
				};
				cl();
			}
		});
	  
	};

})(jQuery);

function isChromeCC() { // Coc Coc Browser
	var ua = navigator.userAgent.toLowerCase(); 
	if (ua.indexOf('safari') != -1) { 
		if (ua.indexOf('chrome') > -1) {
			for (var i=0; i<navigator.plugins.length; i++)
				if (navigator.plugins[i].name == 'Chrome PDF Viewer') return false;
			return true;
		}
		return false;
	}
	return false;
}