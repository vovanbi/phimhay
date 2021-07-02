/*
 * storage plugin
 */

function SmartStorage(){
	function inIframe () {
	    try {
	        return window.self !== window.top;
	    } catch (e) {
	        return true;
	    }
	}
	function Cookie(){
		this.set = function(name, value, expire, opts){
			opts = opts || {};
			var path = opts.path || '/';
			var domain = opts.domain;
			
			var expires = "expires=0";
			if(expire!=0){
				var d = new Date();
			    d.setTime(d.getTime() + (expire * 24 * 60 * 60 * 1000));
			    expires = "expires="+d.toUTCString();
			}
			
		    document.cookie = name + "=" + value + ";" + expires + (path?";path="+path:"") + (domain?";domain="+domain:"");
		};
		this.get = function(name){
			name = name + "=";
		    var ca = document.cookie.split(';');
		    for(var i = 0; i < ca.length; i++) {
		        var c = ca[i];
		        while (c.charAt(0) == ' ') {
		            c = c.substring(1);
		        }
		        if (c.indexOf(name) == 0) {
		            return c.substring(name.length, c.length);
		        }
		    }
		    return "";
		};
		this.remove = function(name){
			this.set(name, '', -1);
		};
	};
	
	this.cookie = new Cookie();
	
	function SStorage(){
		this.set = function(name, value, expire){
			var handler = expire===0? sessionStorage:localStorage;
			handler.setItem(name, value);
		};
		this.get = function(name){
			return localStorage.getItem(name) || sessionStorage.getItem(name);
		};
		this.remove = function(name){
			localStorage.removeItem(name);
			sessionStorage.removeItem(name);
		};
		
	};
	this.storage = new SStorage();
	
	this.handler = this.cookie;
	if (typeof(Storage) !== "undefined" && !inIframe()) {
		this.handler = this.storage;
	}
	
	this.set = function(name, value, expire){
		this.handler.set(name, value, expire);
	};
	this.get = function(name){
		return this.handler.get(name);
	};
	this.remove = function(name){
		this.handler.remove(name);
	};
};
window.SMARTSTORAGE = new SmartStorage();