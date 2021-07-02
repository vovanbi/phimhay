var ResourceManager = function(fetchUrl){
	this.fetchUrl = fetchUrl;
	this.body = document.getElementsByTagName('body')[0];
	this.events = {};
};

ResourceManager.prototype.initEvt = function(evt){
	if(!this.events[evt]){
		this.events[evt] = {
			stt: false,
			func: []		
		};
	}
};

ResourceManager.prototype.on = function(evt, cb){
	this.initEvt(evt);
	this.events[evt].push({
		once: false,
		func: cb
	});
	
	if(this.events[evt].stt){
		cb();
	}
};

ResourceManager.prototype.once = function(evt, cb){
	this.initEvt(evt);
	
	if(this.events[evt].stt){
		cb();
	}else{
		this.events[evt].push({
			once: true,
			func: cb
		});
	}
};

ResourceManager.prototype.off = function(evt, cb){
	if(this.events[evt]){
		if(!cb){
			this.events[evt].func = [];
		}else{
			for(var i in this.events[evt].func){
				if(this.events[evt].func[i].func == cb){
					this.events[evt].func.splice(i, 1);
				}
			}
		}
				
	}
};

ResourceManager.prototype.trigger = function(evt, data){
	if(this.events[evt]){
		for(var i in this.events[evt].func){
			this.events[evt].func[i].func(data);
			if(this.events[evt].func[i].once){
				this.events[evt].func.splice(i, 1);
			}
		}
	}
};

ResourceManager.prototype.toArray = function(obj){
	return Object.prototype.toString.call( obj ) === '[object Array]'?obj: [obj];
}

ResourceManager.prototype.loadScripts = function(urls, cb, isText){
	urls = this.toArray(urls);
	var inside_loaded = 0;
	var inside_cb = function(id, push){
		inside_loaded ++;
		if(inside_loaded == urls.length){
			cb();
		}
	};
	var thys = this;
	
	function process(url){
		isText?thys.loadScriptText(url, inside_cb):thys.loadScript(url, inside_cb);
	}
	
	for(var i=0; i< urls.length; i++){
    	process(urls[i]);
	}
}

ResourceManager.prototype.loadScript = function(cb){
	var s = document.createElement('script');
    s.type = "text/javascript";
    s.src = src;
    if(s.addEventListener) {
		s.addEventListener('load', function (e) { cb() }, false);
		s.addEventListener('error', function (e) { cb() }, false);
	} else if(s.attachEvent) {
		s.attachEvent('load', function (e) { cb() });
		s.attachEvent('error', function (e) { cb() });
	}
    this.body.appendChild(s);
};

ResourceManager.prototype.loadScriptText = function(text, cb){
	text = text.replace('<script>', "").replace('</script>', "");
    var script = document.createElement("script");

    script.type = "text/javascript";
    try {
    	// doesn't work on ie...
    	script.appendChild(document.createTextNode(text));      
    } catch(e) {
    	// IE has funky script nodes
    	script.text = text;
    }

    this.body.appendChild(script);
    //this.body.removeChild(script);
	cb();
};

ResourceManager.prototype.run = function(cb){
	var thys = this;
	$.ajax({
		url: this.fetchUrl,
		dataType: 'json',
		timeout: 30000,
		success: function(msg){
			if(msg.error == 0){
				for(var event in msg.scripts){
					thys.loadScript(msg.scripts[event], function(){
						thys.trigger(event);
					});
				}
				
				for(var event in msg.texts){
					thys.loadScriptText(msg.texts[event], function(){
						thys.trigger(event);
					});
				}
			}else{
				console.error('ResourceManager failed: ' + msg.error_msg);
			}
		},
		error: function(){
			console.warn('ResourceManager failed: network error');
		}
	});
};

