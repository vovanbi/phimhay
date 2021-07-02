window.dataLayer = window.dataLayer || [];

function gtag() {
    dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-145398206-1');
$(window).load(function() {
    var script = document.createElement('script');
    script.async = 1;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=UA-145398206-1';
    document.head.appendChild(script);
    var noscript = document.createElement('noscript');
    noscript.style.display = 'none';
    noscript.width = 1;
    noscript.height = 1;
    noscript.src = 'https://www.facebook.com/tr?id=376260079941731&ev=PageView&noscript=1';
    document.head.appendChild(noscript);
    ! function(f, b, e, v, n, t, s) {
        if (f.fbq) return;
        n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '376260079941731');
    fbq('track', 'PageView');
});

$(function() {
    var ctn = $("#apreload-popup60d5578399941ds-elem");
    var stt = SMARTSTORAGE.get("preload-popup-loaded");
    if (!stt) {
        IMG_ADS[isMobile.any() ? 'M_PreloadPopup_320x150' : 'PC_PreloadPopup_600x400'] = {
            load: function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                var w = !isMobile.any() ? 600 : 320;
                var h = !isMobile.any() ? 400 : 150;
                var sda = $('<div class="sda-wrapper sda-preload-popup" style="left: 50%;top:50%;transform: translate(-50%, -50%);position: fixed; border: 8px solid rgba(0,0,0,0.5); border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; z-index: 999998;">' + '	<div style="position: relative; width: ' + w + 'px; height:' + h + 'px; background: #666;">' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '" width="' + w + '" height="' + h + '">' + '		<a class="sda-close" rel="nofollow" href="javascript:void(0)" style="font-size: 12px;display: inline-block; padding: 4px 6px; position: absolute; top: -15px; right: 2px; color: #FFF; background-color: rgba(0,0,0,0.7);border: 1px solid #FFF;">' + '			Đóng [x]' + '		</a>' + '	</div>' + '	</a>' + '</div>' + '<div class="sda-preload-popup-overlay" style="position: fixed; z-index: 999997; background-color: rgba(0,0,0,0.7); width: 100%; height: 100%; border: 0; padding: 0; top: 0; left: 0;"></div>');
                ctn.html(sda);
                sda.find(".sda-close").click(function() {
                    ctn.empty();
                    SMARTSTORAGE.set("preload-popup-loaded", 1, 0);
                });
            }
        };
    }
});

$(function() {
    ADS_CONFIG.add({
        ads_provider: 'gl',
        id: 'gl-60d5578399a32',
        src: '//gangsstowapps.com/gk6dk4JIY8blKs/35006',
        type: 'galak-float',
        custom_ads: [],
        ads_id: 'agalak-float60d55783999a6ds',
        rate: 1,
    });
    if (isMobile.any()) {
        $('.btn-error-report').css("bottom", parseInt($('.btn-error-report').css("bottom")) + 140);
        var flag = false;
        var recalculate = function() {
            if (flag) return;
            if ($("iframe[data-glx]").length > 0) {
                $("iframe[data-glx]").css("inset", "auto 0 0 auto");
                flag = true;
            } else {
                setTimeout(recalculate, 169);
            }
        };
        recalculate();
    }
});

function search_item() {
    var result_container = $('#nav_search_result');
    var xhr = null;
    var inputTimer = null;
    var input = '';
    var search_item = function(str) {
        if (xhr) xhr.abort();
        xhr = $.ajax({
            type: 'GET',
            url: '/content/search',
            dataType: 'json',
            data: {
                t: 'nav_search',
                q: str,
                num: 3
            },
            beforeSend: function() {
                result_container.empty();
            },
            success: function(msg) {
                if (msg.error == 0) {
                    result_container.html(msg.result).show();
                } else {
                    renderError(msg.error_msg, str);
                }
            },
            error: function() {
                renderError('timeout', str);
            }
        });
    };
    var renderError = function(str, keyword) {
        if (str == 'no item found' || str == 'timeout') {
            var _str = '';
            _str += '<p class="nav_search_notif">Không tìm thấy kết quả trả về cho từ khóa <b>\'' + keyword + '\'</b></p>';
            result_container.html(_str).show();
        }
    };
    $('.nav__search').find('input[name=q]').on('keyup', function() {
        clearTimeout(inputTimer);
        var input = $(this).val();
        if (input.length > 2) {
            inputTimer = setTimeout(function() {
                search_item(input);
            }, 200);
        } else {
            result_container.hide();
        }
    });
}
$(function() {
    if (!isMobile.any()) {
        $(document).mouseup(function(e) {
            var container = $(".nav__search");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.find('#nav_search_result').hide();
            }
        });
        search_item();
    }
});
$(window).load(function() {
    $('.top-search').find('.fa-search').click(function() {
        var btn = $(this);
        var value = btn.prev().val();
        var medium = isMobile.mgid() ? 'mobile' : 'desktop';
        window.location.href = "/content/search?t=kw&q=" + value + '&utm_source=search_icon&utm_medium=' + medium + '&utm_campaign=dpnet';
    });
});

$(function() {
    var ctn = $("#abanner-header60d5578399216ds-elem");
    ctn.css({
        "margin": "0 auto",
        "text-align": "center"
    });
    if (!isMobile.any()) {
        var sda = $('<div class="sda-wrapper sda-banner-header" style="max-width: 980px;display: inline-block;text-align:center;background-color:#777">' + '</div>');
        ctn.html(sda);
        sda.hide();
        var ih = 90;
        var listAds = ["PC_Header_980x90", "PC_Header2_980x90"];
        for (var i in listAds) {
            IMG_ADS[listAds[i]] = {
                load: function(datas) {
                    if (datas.length == 0) return;
                    var data = IMG_ADS.random(datas);
                    sda.append('	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img class="img-responsive" src="' + data.img + '">' + '	</a>').css("max-height", sda.find(".sda-link").length * 90 + "px");
                    sda.show();
                }
            };
        }
    } else {
        var sda = $('<div class="sda-wrapper sda-banner-header" style="width: 320px;display: inline-block;text-align:center;background-color:#777">' + '</div>');
        ctn.html(sda);
        sda.hide();
        var ih = 40;
        var listAds = ["M_TopFloat1_320X50", "M_TopFloat2_320x50", "M_TopFloat3_320x50"];
        for (var i in listAds) {
            var key = listAds[i];
            IMG_ADS[listAds[i]] = {
                load: function(datas) {
                    if (datas.length == 0) return;
                    var data = IMG_ADS.random(datas);
                    sda.append('	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '" width="320" height="' + ih + '">' + '	</a>').height(sda.find(".sda-link").length * ih)
                    sda.show();
                }
            };
        }
    }
});
$(function() {
    if (!isMobile.any()) {
        var ctn = $("#afixed-side60d55783992c7ds-elem");
        var s_elem;
        var inject_css = function() {
            var c_id = 'fixed_aelem';
            s_elem = $("#" + c_id);
            if (s_elem.length == 0) {
                s_elem = $("<style id='" + c_id + "'></style>");
                $("head").append(s_elem);
            }
        };
        var hide = function() {
            if (initFlag) {
                ctn.find(".fx-sda").addClass("hidden");
            }
        };
        var show = function() {
            recalculateCss();
            ctn.find(".fx-sda").removeClass("hidden");
        };
        var initFlag = false;
        var affix = function(fx) {
            fx.affix({
                offset: {
                    top: function() {
                        var t = $("section.content").offset().top;
                        if ($('.banner-wrapper').length > 0) {
                            t = $('.banner-wrapper').offset().top + $('.banner-wrapper').height();
                        }
                        t -= $(".ht-header").height();
                        return t
                    },
                    bottom: function() {
                        return $("footer").height() + 50
                    }
                }
            }).on("affixed.bs.affix", function() {
                fx.css("top", $(".ht-header").height() + "px")
            }).on("affixed-top.bs.affix", function() {
                fx.css("top", '');
                fx.css("position", 'absolute');
            }).on("affixed-bottom.bs.affix", function() {
                fx.css("position", 'absolute');
            });
        };
        var recalculateCss = function() {
            var css = '.sda-fx{width: 160px; height: 600px; background-color: #777;}.fx-sda{position: absolute;z-index: 234;}.fx-left{left: -165px}.fx-right{right: -165px}';
            css += '.fx-sda.affix{position: fixed;}.fx-left.affix{left: 30px}.fx-right.affix{right: 30px}.fx-sda.affix-bottom{position: absolute!important;}';
            css += ".container{max-width: " + ($("body").width() - 330) + "px}";
            if ($('.banner-wrapper').length > 0) {
                var t = $('.banner-wrapper').offset().top + $('.banner-wrapper').height() - $("section.content").offset().top;
                css += ".fx-left, .fx-right{top: " + t + "px}";
            }
            s_elem.html(css);
        };
        var resize = function() {
            if (!initFlag) {
                initFlag = true;
                $(window).resize(function() {
                    if ($(window).width() < 1330) {
                        hide();
                    } else {
                        show();
                    }
                });
                $(".flickity-viewport").parent().flickity('resize');
            }
            $(window).resize();
        };
        IMG_ADS['PC_FoatLeft_160X600'] = {
            load: function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                inject_css();
                ctn.append('<div class="fx-left fx-sda">' + '	<div class="sda-wrapper sda-fx">' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '">' + '	</a>' + '	</div>' + '</div>');
                affix(ctn.find(".fx-left"));
                resize();
            }
        };
        IMG_ADS['PC_FoatRight_160X600'] = {
            load: function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                inject_css();
                ctn.append('<div class="fx-right fx-sda">' + '	<div class="sda-wrapper sda-fx">' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '">' + '	</a>' + '	</div>' + '</div>');
                affix(ctn.find(".fx-right"));
                resize();
            }
        };
    }
});
$(window).load(function() {
    new ResourceManager('/content/rest?t=scripts').run();
    lazyload();
    WebFont.load({
        google: {
            families: ['Cuprum|Nunito&subset=vietnamese&display=swap']
        },
        custom: {
            families: ['FontAwesome'],
            urls: ['https://static.voocdn.com/bower_components/font-awesome/css/font-awesome.min.css?v=0.0.1']
        }
    });
});

$(function() {
    return;
    var show_news = function() {
        if (news == "1") {
            window.location = '/news/';
        }
    };
    var news = SMARTSTORAGE.cookie.get("news2");
    if (!news) {
        delay_onload();
        $.getJSON("https://dp.voocdn.com/content/detectCountry/" + new Date().getTime(), function(data) {
            if (data.error == 0) {
                news = data.news ? "1" : "0";
                SMARTSTORAGE.cookie.set("news2", news, 1 / 24, {
                    domain: null
                });
                show_news();
            }
            if (news != "1") {
                kick_onload();
            }
        }).fail(function() {
            kick_onload();
        });
    } else {
        show_news();
    }
});

$(function() {
    var ctn = $("#abanner-footer60d5578399767ds-elem");
    if (!isMobile.any()) {
        var sda = $('<div class="sda-wrapper sda-banner-footer" style="width: calc(100% - 510px);max-width:980px;max-height: 180px;position: fixed;bottom: 0;left: 50%;transform: translateX(-50%);z-index: 236;background-color: #777; overflow: visible;text-align:center;">' + '	<div style="position: relative">' + '		<div class="sda-content"></div>' + '		<a class="sda-close" rel="nofollow" href="javascript:void(0)" style="font-size: 15px;display: inline-block; padding: 4px 6px; position: absolute; bottom: 100%; right: 0; color: #FFF; background-color: rgba(0,0,0,0.7);border: 1px solid #FFF;">' + '			[x]' + '		</a>' + '	</div>' + '</div>');
        sda.find(".sda-close").click(function() {
            ctn.empty();
        });
        sda.hide();
        ctn.html(sda);
        $(window).resize(function() {
            if ($(window).width() < 1024 && $(".sda-ballon").length > 0) {
                ctn.addClass("hidden");
            } else {
                ctn.removeClass("hidden");
            }
        }).resize();
        IMG_ADS["PC_Catfish_980x90"] = {
            'load': function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                sda.find(".sda-content").append('<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '	<img class="img-responsive" src="' + data.img + '">' + '</a>');
                sda.show();
            },
        };
        IMG_ADS["PC_Catfish2_980x90"] = {
            'load': function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                sda.find(".sda-content").append('<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '	<img class="img-responsive" src="' + data.img + '">' + '</a>');
                sda.show();
            },
        };
    }
    if (isMobile.any()) {
        var sda = $('<div class="sda-wrapper sda-catfísh" style="width: 100%;height: auto;max-height: 100px;position: fixed;top: auto;bottom: 0;left: 0;right: 0;z-index: 233;background-color: rgba(0,0,0,1); overflow: visible;margin: 0 auto; text-align: center;">' + '	<div style="position: relative;">' + '		<div class="sda-content"></div>' + '		<a class="sda-close" rel="nofollow" href="javascript:void(0)" style="font-size: 12px;display: inline-block; padding: 4px 6px; position: absolute; top: -15px; right: 2px; color: #FFF; background-color: rgba(0,0,0,0.7);border: 1px solid #FFF;">' + '			Đóng [x]' + '		</a>' + '	</div>' + '</div>');
        ctn.html(sda);
        sda.find(".sda-close").click(function() {
            ctn.empty();
        });
        sda.hide();
        IMG_ADS['M_BottomFloat1_320x50'] = {
            'collection': 'bottomfloat',
            'mode': 'append',
            'load': function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                var s = '' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '" width="320" height="50">' + '	</a>';
                sda.find(".sda-content").prepend(s);
                sda.show();
            }
        };
        IMG_ADS['M_BottomFloat2_320x50'] = {
            'collection': 'bottomfloat',
            'mode': 'append',
            'load': function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                var s = '' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '" width="320" height="50">' + '	</a>';
                sda.find(".sda-content").append(s);
                sda.show();
            }
        };
        IMG_ADS['M_BottomFloat_320x100'] = {
            'collection': 'bottomfloat',
            'mode': 'replace',
            'load': function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                var s = '' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img src="' + data.img + '" width="320" height="100">' + '	</a>';
                sda.find(".sda-content").append(s);
                sda.show();
            }
        };
    }
});

$(function() {
    if (!isMobile.any()) {
        var ctn = $("#aballon-left60d557839980eds-elem");
        IMG_ADS['PC_BalloonLeft_300x250'] = {
            load: function(datas) {
                if (datas.length == 0) return;
                var data = IMG_ADS.random(datas);
                var sda = $('<div class="sda-wrapper sda-ballon" style="width: 250px;height: 208.333px;position: fixed;top: auto;bottom: 0;left: 0;z-index: 235;background-color: #777; overflow: visible;margin: 0 auto; text-align: center;">' + '	<div style="position: relative">' + '	<a class="sda-link" rel="nofollow" target="_blank" href="' + data.url + '">' + '		<img class="img-responsive" src="' + data.img + '">' + '		<a class="sda-close" rel="nofollow" href="javascript:void(0)" style="font-size: 15px;display: inline-block; padding: 4px 6px; position: absolute; top: -15px; left: 2px; color: #FFF; background-color: rgba(0,0,0,0.7);border: 1px solid #FFF;">' + '			[x]' + '		</a>' + '	</div>' + '	</a>' + '</div>');
                ctn.html(sda);
                sda.find(".sda-close").click(function() {
                    ctn.empty();
                });
            }
        };
    }
});