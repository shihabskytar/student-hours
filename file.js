/*! Owl carousel by Bartosz Wojciechowski/David Deutsch | v2.0.0 - http://owlcarousel2.github.io/OwlCarousel2 */
!function(a,b,c,d){function e(b,c){this.settings=null,this.options=a.extend({},e.Defaults,c),this.$element=a(b),this.drag=a.extend({},m),this.state=a.extend({},n),this.e=a.extend({},o),this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._invalidated={},this._pipe=[],a.each(e.Plugins,a.proxy(function(a,b){this._plugins[a[0].toLowerCase()+a.slice(1)]=new b(this)},this)),a.each(e.Pipe,a.proxy(function(b,c){this._pipe.push({filter:c.filter,run:a.proxy(c.run,this)})},this)),this.setup(),this.initialize()}function f(a){if(a.touches!==d)return{x:a.touches[0].pageX,y:a.touches[0].pageY};if(a.touches===d){if(a.pageX!==d)return{x:a.pageX,y:a.pageY};if(a.pageX===d)return{x:a.clientX,y:a.clientY}}}function g(a){var b,d,e=c.createElement("div"),f=a;for(b in f)if(d=f[b],"undefined"!=typeof e.style[d])return e=null,[d,b];return[!1]}function h(){return g(["transition","WebkitTransition","MozTransition","OTransition"])[1]}function i(){return g(["transform","WebkitTransform","MozTransform","OTransform","msTransform"])[0]}function j(){return g(["perspective","webkitPerspective","MozPerspective","OPerspective","MsPerspective"])[0]}function k(){return"ontouchstart"in b||!!navigator.msMaxTouchPoints}function l(){return b.navigator.msPointerEnabled}var m,n,o;m={start:0,startX:0,startY:0,current:0,currentX:0,currentY:0,offsetX:0,offsetY:0,distance:null,startTime:0,endTime:0,updatedX:0,targetEl:null},n={isTouch:!1,isScrolling:!1,isSwiping:!1,direction:!1,inMotion:!1},o={_onDragStart:null,_onDragMove:null,_onDragEnd:null,_transitionEnd:null,_resizer:null,_responsiveCall:null,_goToLoop:null,_checkVisibile:null},e.Defaults={items:3,loop:!1,center:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:b,responsiveClass:!1,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",themeClass:"owl-theme",baseClass:"owl-carousel",itemClass:"owl-item",centerClass:"center",activeClass:"active"},e.Width={Default:"default",Inner:"inner",Outer:"outer"},e.Plugins={},e.Pipe=[{filter:["width","items","settings"],run:function(a){a.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){var a=this._clones,b=this.$stage.children(".cloned");(b.length!==a.length||!this.settings.loop&&a.length>0)&&(this.$stage.children(".cloned").remove(),this._clones=[])}},{filter:["items","settings"],run:function(){var a,b,c=this._clones,d=this._items,e=this.settings.loop?c.length-Math.max(2*this.settings.items,4):0;for(a=0,b=Math.abs(e/2);b>a;a++)e>0?(this.$stage.children().eq(d.length+c.length-1).remove(),c.pop(),this.$stage.children().eq(0).remove(),c.pop()):(c.push(c.length/2),this.$stage.append(d[c[c.length-1]].clone().addClass("cloned")),c.push(d.length-1-(c.length-1)/2),this.$stage.prepend(d[c[c.length-1]].clone().addClass("cloned")))}},{filter:["width","items","settings"],run:function(){var a,b,c,d=this.settings.rtl?1:-1,e=(this.width()/this.settings.items).toFixed(3),f=0;for(this._coordinates=[],b=0,c=this._clones.length+this._items.length;c>b;b++)a=this._mergers[this.relative(b)],a=this.settings.mergeFit&&Math.min(a,this.settings.items)||a,f+=(this.settings.autoWidth?this._items[this.relative(b)].width()+this.settings.margin:e*a)*d,this._coordinates.push(f)}},{filter:["width","items","settings"],run:function(){var b,c,d=(this.width()/this.settings.items).toFixed(3),e={width:Math.abs(this._coordinates[this._coordinates.length-1])+2*this.settings.stagePadding,"padding-left":this.settings.stagePadding||"","padding-right":this.settings.stagePadding||""};if(this.$stage.css(e),e={width:this.settings.autoWidth?"auto":d-this.settings.margin},e[this.settings.rtl?"margin-left":"margin-right"]=this.settings.margin,!this.settings.autoWidth&&a.grep(this._mergers,function(a){return a>1}).length>0)for(b=0,c=this._coordinates.length;c>b;b++)e.width=Math.abs(this._coordinates[b])-Math.abs(this._coordinates[b-1]||0)-this.settings.margin,this.$stage.children().eq(b).css(e);else this.$stage.children().css(e)}},{filter:["width","items","settings"],run:function(a){a.current&&this.reset(this.$stage.children().index(a.current))}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var a,b,c,d,e=this.settings.rtl?1:-1,f=2*this.settings.stagePadding,g=this.coordinates(this.current())+f,h=g+this.width()*e,i=[];for(c=0,d=this._coordinates.length;d>c;c++)a=this._coordinates[c-1]||0,b=Math.abs(this._coordinates[c])+f*e,(this.op(a,"<=",g)&&this.op(a,">",h)||this.op(b,"<",g)&&this.op(b,">",h))&&i.push(c);this.$stage.children("."+this.settings.activeClass).removeClass(this.settings.activeClass),this.$stage.children(":eq("+i.join("), :eq(")+")").addClass(this.settings.activeClass),this.settings.center&&(this.$stage.children("."+this.settings.centerClass).removeClass(this.settings.centerClass),this.$stage.children().eq(this.current()).addClass(this.settings.centerClass))}}],e.prototype.initialize=function(){if(this.trigger("initialize"),this.$element.addClass(this.settings.baseClass).addClass(this.settings.themeClass).toggleClass("owl-rtl",this.settings.rtl),this.browserSupport(),this.settings.autoWidth&&this.state.imagesLoaded!==!0){var b,c,e;if(b=this.$element.find("img"),c=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:d,e=this.$element.children(c).width(),b.length&&0>=e)return this.preloadAutoWidthImages(b),!1}this.$element.addClass("owl-loading"),this.$stage=a("<"+this.settings.stageElement+' class="owl-stage"/>').wrap('<div class="owl-stage-outer">'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this._width=this.$element.width(),this.refresh(),this.$element.removeClass("owl-loading").addClass("owl-loaded"),this.eventsCall(),this.internalEvents(),this.addTriggerableEvents(),this.trigger("initialized")},e.prototype.setup=function(){var b=this.viewport(),c=this.options.responsive,d=-1,e=null;c?(a.each(c,function(a){b>=a&&a>d&&(d=Number(a))}),e=a.extend({},this.options,c[d]),delete e.responsive,e.responsiveClass&&this.$element.attr("class",function(a,b){return b.replace(/\b owl-responsive-\S+/g,"")}).addClass("owl-responsive-"+d)):e=a.extend({},this.options),(null===this.settings||this._breakpoint!==d)&&(this.trigger("change",{property:{name:"settings",value:e}}),this._breakpoint=d,this.settings=e,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}}))},e.prototype.optionsLogic=function(){this.$element.toggleClass("owl-center",this.settings.center),this.settings.loop&&this._items.length<this.settings.items&&(this.settings.loop=!1),this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},e.prototype.prepare=function(b){var c=this.trigger("prepare",{content:b});return c.data||(c.data=a("<"+this.settings.itemElement+"/>").addClass(this.settings.itemClass).append(b)),this.trigger("prepared",{content:c.data}),c.data},e.prototype.update=function(){for(var b=0,c=this._pipe.length,d=a.proxy(function(a){return this[a]},this._invalidated),e={};c>b;)(this._invalidated.all||a.grep(this._pipe[b].filter,d).length>0)&&this._pipe[b].run(e),b++;this._invalidated={}},e.prototype.width=function(a){switch(a=a||e.Width.Default){case e.Width.Inner:case e.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},e.prototype.refresh=function(){if(0===this._items.length)return!1;(new Date).getTime();this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$stage.addClass("owl-refresh"),this.update(),this.$stage.removeClass("owl-refresh"),this.state.orientation=b.orientation,this.watchVisibility(),this.trigger("refreshed")},e.prototype.eventsCall=function(){this.e._onDragStart=a.proxy(function(a){this.onDragStart(a)},this),this.e._onDragMove=a.proxy(function(a){this.onDragMove(a)},this),this.e._onDragEnd=a.proxy(function(a){this.onDragEnd(a)},this),this.e._onResize=a.proxy(function(a){this.onResize(a)},this),this.e._transitionEnd=a.proxy(function(a){this.transitionEnd(a)},this),this.e._preventClick=a.proxy(function(a){this.preventClick(a)},this)},e.prototype.onThrottledResize=function(){b.clearTimeout(this.resizeTimer),this.resizeTimer=b.setTimeout(this.e._onResize,this.settings.responsiveRefreshRate)},e.prototype.onResize=function(){return this._items.length?this._width===this.$element.width()?!1:this.trigger("resize").isDefaultPrevented()?!1:(this._width=this.$element.width(),this.invalidate("width"),this.refresh(),void this.trigger("resized")):!1},e.prototype.eventsRouter=function(a){var b=a.type;"mousedown"===b||"touchstart"===b?this.onDragStart(a):"mousemove"===b||"touchmove"===b?this.onDragMove(a):"mouseup"===b||"touchend"===b?this.onDragEnd(a):"touchcancel"===b&&this.onDragEnd(a)},e.prototype.internalEvents=function(){var c=(k(),l());this.settings.mouseDrag?(this.$stage.on("mousedown",a.proxy(function(a){this.eventsRouter(a)},this)),this.$stage.on("dragstart",function(){return!1}),this.$stage.get(0).onselectstart=function(){return!1}):this.$element.addClass("owl-text-select-on"),this.settings.touchDrag&&!c&&this.$stage.on("touchstart touchcancel",a.proxy(function(a){this.eventsRouter(a)},this)),this.transitionEndVendor&&this.on(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd,!1),this.settings.responsive!==!1&&this.on(b,"resize",a.proxy(this.onThrottledResize,this))},e.prototype.onDragStart=function(d){var e,g,h,i;if(e=d.originalEvent||d||b.event,3===e.which||this.state.isTouch)return!1;if("mousedown"===e.type&&this.$stage.addClass("owl-grab"),this.trigger("drag"),this.drag.startTime=(new Date).getTime(),this.speed(0),this.state.isTouch=!0,this.state.isScrolling=!1,this.state.isSwiping=!1,this.drag.distance=0,g=f(e).x,h=f(e).y,this.drag.offsetX=this.$stage.position().left,this.drag.offsetY=this.$stage.position().top,this.settings.rtl&&(this.drag.offsetX=this.$stage.position().left+this.$stage.width()-this.width()+this.settings.margin),this.state.inMotion&&this.support3d)i=this.getTransformProperty(),this.drag.offsetX=i,this.animate(i),this.state.inMotion=!0;else if(this.state.inMotion&&!this.support3d)return this.state.inMotion=!1,!1;this.drag.startX=g-this.drag.offsetX,this.drag.startY=h-this.drag.offsetY,this.drag.start=g-this.drag.startX,this.drag.targetEl=e.target||e.srcElement,this.drag.updatedX=this.drag.start,("IMG"===this.drag.targetEl.tagName||"A"===this.drag.targetEl.tagName)&&(this.drag.targetEl.draggable=!1),a(c).on("mousemove.owl.dragEvents mouseup.owl.dragEvents touchmove.owl.dragEvents touchend.owl.dragEvents",a.proxy(function(a){this.eventsRouter(a)},this))},e.prototype.onDragMove=function(a){var c,e,g,h,i,j;this.state.isTouch&&(this.state.isScrolling||(c=a.originalEvent||a||b.event,e=f(c).x,g=f(c).y,this.drag.currentX=e-this.drag.startX,this.drag.currentY=g-this.drag.startY,this.drag.distance=this.drag.currentX-this.drag.offsetX,this.drag.distance<0?this.state.direction=this.settings.rtl?"right":"left":this.drag.distance>0&&(this.state.direction=this.settings.rtl?"left":"right"),this.settings.loop?this.op(this.drag.currentX,">",this.coordinates(this.minimum()))&&"right"===this.state.direction?this.drag.currentX-=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length):this.op(this.drag.currentX,"<",this.coordinates(this.maximum()))&&"left"===this.state.direction&&(this.drag.currentX+=(this.settings.center&&this.coordinates(0))-this.coordinates(this._items.length)):(h=this.coordinates(this.settings.rtl?this.maximum():this.minimum()),i=this.coordinates(this.settings.rtl?this.minimum():this.maximum()),j=this.settings.pullDrag?this.drag.distance/5:0,this.drag.currentX=Math.max(Math.min(this.drag.currentX,h+j),i+j)),(this.drag.distance>8||this.drag.distance<-8)&&(c.preventDefault!==d?c.preventDefault():c.returnValue=!1,this.state.isSwiping=!0),this.drag.updatedX=this.drag.currentX,(this.drag.currentY>16||this.drag.currentY<-16)&&this.state.isSwiping===!1&&(this.state.isScrolling=!0,this.drag.updatedX=this.drag.start),this.animate(this.drag.updatedX)))},e.prototype.onDragEnd=function(b){var d,e,f;if(this.state.isTouch){if("mouseup"===b.type&&this.$stage.removeClass("owl-grab"),this.trigger("dragged"),this.drag.targetEl.removeAttribute("draggable"),this.state.isTouch=!1,this.state.isScrolling=!1,this.state.isSwiping=!1,0===this.drag.distance&&this.state.inMotion!==!0)return this.state.inMotion=!1,!1;this.drag.endTime=(new Date).getTime(),d=this.drag.endTime-this.drag.startTime,e=Math.abs(this.drag.distance),(e>3||d>300)&&this.removeClick(this.drag.targetEl),f=this.closest(this.drag.updatedX),this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(f),this.invalidate("position"),this.update(),this.settings.pullDrag||this.drag.updatedX!==this.coordinates(f)||this.transitionEnd(),this.drag.distance=0,a(c).off(".owl.dragEvents")}},e.prototype.removeClick=function(c){this.drag.targetEl=c,a(c).on("click.preventClick",this.e._preventClick),b.setTimeout(function(){a(c).off("click.preventClick")},300)},e.prototype.preventClick=function(b){b.preventDefault?b.preventDefault():b.returnValue=!1,b.stopPropagation&&b.stopPropagation(),a(b.target).off("click.preventClick")},e.prototype.getTransformProperty=function(){var a,c;return a=b.getComputedStyle(this.$stage.get(0),null).getPropertyValue(this.vendorName+"transform"),a=a.replace(/matrix(3d)?\(|\)/g,"").split(","),c=16===a.length,c!==!0?a[4]:a[12]},e.prototype.closest=function(b){var c=-1,d=30,e=this.width(),f=this.coordinates();return this.settings.freeDrag||a.each(f,a.proxy(function(a,g){return b>g-d&&g+d>b?c=a:this.op(b,"<",g)&&this.op(b,">",f[a+1]||g-e)&&(c="left"===this.state.direction?a+1:a),-1===c},this)),this.settings.loop||(this.op(b,">",f[this.minimum()])?c=b=this.minimum():this.op(b,"<",f[this.maximum()])&&(c=b=this.maximum())),c},e.prototype.animate=function(b){this.trigger("translate"),this.state.inMotion=this.speed()>0,this.support3d?this.$stage.css({transform:"translate3d("+b+"px,0px, 0px)",transition:this.speed()/1e3+"s"}):this.state.isTouch?this.$stage.css({left:b+"px"}):this.$stage.animate({left:b},this.speed()/1e3,this.settings.fallbackEasing,a.proxy(function(){this.state.inMotion&&this.transitionEnd()},this))},e.prototype.current=function(a){if(a===d)return this._current;if(0===this._items.length)return d;if(a=this.normalize(a),this._current!==a){var b=this.trigger("change",{property:{name:"position",value:a}});b.data!==d&&(a=this.normalize(b.data)),this._current=a,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},e.prototype.invalidate=function(a){this._invalidated[a]=!0},e.prototype.reset=function(a){a=this.normalize(a),a!==d&&(this._speed=0,this._current=a,this.suppress(["translate","translated"]),this.animate(this.coordinates(a)),this.release(["translate","translated"]))},e.prototype.normalize=function(b,c){var e=c?this._items.length:this._items.length+this._clones.length;return!a.isNumeric(b)||1>e?d:b=this._clones.length?(b%e+e)%e:Math.max(this.minimum(c),Math.min(this.maximum(c),b))},e.prototype.relative=function(a){return a=this.normalize(a),a-=this._clones.length/2,this.normalize(a,!0)},e.prototype.maximum=function(a){var b,c,d,e=0,f=this.settings;if(a)return this._items.length-1;if(!f.loop&&f.center)b=this._items.length-1;else if(f.loop||f.center)if(f.loop||f.center)b=this._items.length+f.items;else{if(!f.autoWidth&&!f.merge)throw"Can not detect maximum absolute position.";for(revert=f.rtl?1:-1,c=this.$stage.width()-this.$element.width();(d=this.coordinates(e))&&!(d*revert>=c);)b=++e}else b=this._items.length-f.items;return b},e.prototype.minimum=function(a){return a?0:this._clones.length/2},e.prototype.items=function(a){return a===d?this._items.slice():(a=this.normalize(a,!0),this._items[a])},e.prototype.mergers=function(a){return a===d?this._mergers.slice():(a=this.normalize(a,!0),this._mergers[a])},e.prototype.clones=function(b){var c=this._clones.length/2,e=c+this._items.length,f=function(a){return a%2===0?e+a/2:c-(a+1)/2};return b===d?a.map(this._clones,function(a,b){return f(b)}):a.map(this._clones,function(a,c){return a===b?f(c):null})},e.prototype.speed=function(a){return a!==d&&(this._speed=a),this._speed},e.prototype.coordinates=function(b){var c=null;return b===d?a.map(this._coordinates,a.proxy(function(a,b){return this.coordinates(b)},this)):(this.settings.center?(c=this._coordinates[b],c+=(this.width()-c+(this._coordinates[b-1]||0))/2*(this.settings.rtl?-1:1)):c=this._coordinates[b-1]||0,c)},e.prototype.duration=function(a,b,c){return Math.min(Math.max(Math.abs(b-a),1),6)*Math.abs(c||this.settings.smartSpeed)},e.prototype.to=function(c,d){if(this.settings.loop){var e=c-this.relative(this.current()),f=this.current(),g=this.current(),h=this.current()+e,i=0>g-h?!0:!1,j=this._clones.length+this._items.length;h<this.settings.items&&i===!1?(f=g+this._items.length,this.reset(f)):h>=j-this.settings.items&&i===!0&&(f=g-this._items.length,this.reset(f)),b.clearTimeout(this.e._goToLoop),this.e._goToLoop=b.setTimeout(a.proxy(function(){this.speed(this.duration(this.current(),f+e,d)),this.current(f+e),this.update()},this),30)}else this.speed(this.duration(this.current(),c,d)),this.current(c),this.update()},e.prototype.next=function(a){a=a||!1,this.to(this.relative(this.current())+1,a)},e.prototype.prev=function(a){a=a||!1,this.to(this.relative(this.current())-1,a)},e.prototype.transitionEnd=function(a){return a!==d&&(a.stopPropagation(),(a.target||a.srcElement||a.originalTarget)!==this.$stage.get(0))?!1:(this.state.inMotion=!1,void this.trigger("translated"))},e.prototype.viewport=function(){var d;if(this.options.responsiveBaseElement!==b)d=a(this.options.responsiveBaseElement).width();else if(b.innerWidth)d=b.innerWidth;else{if(!c.documentElement||!c.documentElement.clientWidth)throw"Can not detect viewport width.";d=c.documentElement.clientWidth}return d},e.prototype.replace=function(b){this.$stage.empty(),this._items=[],b&&(b=b instanceof jQuery?b:a(b)),this.settings.nestedItemSelector&&(b=b.find("."+this.settings.nestedItemSelector)),b.filter(function(){return 1===this.nodeType}).each(a.proxy(function(a,b){b=this.prepare(b),this.$stage.append(b),this._items.push(b),this._mergers.push(1*b.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)},this)),this.reset(a.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},e.prototype.add=function(a,b){b=b===d?this._items.length:this.normalize(b,!0),this.trigger("add",{content:a,position:b}),0===this._items.length||b===this._items.length?(this.$stage.append(a),this._items.push(a),this._mergers.push(1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)):(this._items[b].before(a),this._items.splice(b,0,a),this._mergers.splice(b,0,1*a.find("[data-merge]").andSelf("[data-merge]").attr("data-merge")||1)),this.invalidate("items"),this.trigger("added",{content:a,position:b})},e.prototype.remove=function(a){a=this.normalize(a,!0),a!==d&&(this.trigger("remove",{content:this._items[a],position:a}),this._items[a].remove(),this._items.splice(a,1),this._mergers.splice(a,1),this.invalidate("items"),this.trigger("removed",{content:null,position:a}))},e.prototype.addTriggerableEvents=function(){var b=a.proxy(function(b,c){return a.proxy(function(a){a.relatedTarget!==this&&(this.suppress([c]),b.apply(this,[].slice.call(arguments,1)),this.release([c]))},this)},this);a.each({next:this.next,prev:this.prev,to:this.to,destroy:this.destroy,refresh:this.refresh,replace:this.replace,add:this.add,remove:this.remove},a.proxy(function(a,c){this.$element.on(a+".owl.carousel",b(c,a+".owl.carousel"))},this))},e.prototype.watchVisibility=function(){function c(a){return a.offsetWidth>0&&a.offsetHeight>0}function d(){c(this.$element.get(0))&&(this.$element.removeClass("owl-hidden"),this.refresh(),b.clearInterval(this.e._checkVisibile))}c(this.$element.get(0))||(this.$element.addClass("owl-hidden"),b.clearInterval(this.e._checkVisibile),this.e._checkVisibile=b.setInterval(a.proxy(d,this),500))},e.prototype.preloadAutoWidthImages=function(b){var c,d,e,f;c=0,d=this,b.each(function(g,h){e=a(h),f=new Image,f.onload=function(){c++,e.attr("src",f.src),e.css("opacity",1),c>=b.length&&(d.state.imagesLoaded=!0,d.initialize())},f.src=e.attr("src")||e.attr("data-src")||e.attr("data-src-retina")})},e.prototype.destroy=function(){this.$element.hasClass(this.settings.themeClass)&&this.$element.removeClass(this.settings.themeClass),this.settings.responsive!==!1&&a(b).off("resize.owl.carousel"),this.transitionEndVendor&&this.off(this.$stage.get(0),this.transitionEndVendor,this.e._transitionEnd);for(var d in this._plugins)this._plugins[d].destroy();(this.settings.mouseDrag||this.settings.touchDrag)&&(this.$stage.off("mousedown touchstart touchcancel"),a(c).off(".owl.dragEvents"),this.$stage.get(0).onselectstart=function(){},this.$stage.off("dragstart",function(){return!1})),this.$element.off(".owl"),this.$stage.children(".cloned").remove(),this.e=null,this.$element.removeData("owlCarousel"),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$stage.unwrap()},e.prototype.op=function(a,b,c){var d=this.settings.rtl;switch(b){case"<":return d?a>c:c>a;case">":return d?c>a:a>c;case">=":return d?c>=a:a>=c;case"<=":return d?a>=c:c>=a}},e.prototype.on=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d):a.attachEvent&&a.attachEvent("on"+b,c)},e.prototype.off=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d):a.detachEvent&&a.detachEvent("on"+b,c)},e.prototype.trigger=function(b,c,d){var e={item:{count:this._items.length,index:this.current()}},f=a.camelCase(a.grep(["on",b,d],function(a){return a}).join("-").toLowerCase()),g=a.Event([b,"owl",d||"carousel"].join(".").toLowerCase(),a.extend({relatedTarget:this},e,c));return this._supress[b]||(a.each(this._plugins,function(a,b){b.onTrigger&&b.onTrigger(g)}),this.$element.trigger(g),this.settings&&"function"==typeof this.settings[f]&&this.settings[f].apply(this,g)),g},e.prototype.suppress=function(b){a.each(b,a.proxy(function(a,b){this._supress[b]=!0},this))},e.prototype.release=function(b){a.each(b,a.proxy(function(a,b){delete this._supress[b]},this))},e.prototype.browserSupport=function(){if(this.support3d=j(),this.support3d){this.transformVendor=i();var a=["transitionend","webkitTransitionEnd","transitionend","oTransitionEnd"];this.transitionEndVendor=a[h()],this.vendorName=this.transformVendor.replace(/Transform/i,""),this.vendorName=""!==this.vendorName?"-"+this.vendorName.toLowerCase()+"-":""}this.state.orientation=b.orientation},a.fn.owlCarousel=function(b){return this.each(function(){a(this).data("owlCarousel")||a(this).data("owlCarousel",new e(this,b))})},a.fn.owlCarousel.Constructor=e}(window.Zepto||window.jQuery,window,document),function(a,b){var c=function(b){this._core=b,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel":a.proxy(function(b){if(b.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(b.property&&"position"==b.property.name||"initialized"==b.type))for(var c=this._core.settings,d=c.center&&Math.ceil(c.items/2)||c.items,e=c.center&&-1*d||0,f=(b.property&&b.property.value||this._core.current())+e,g=this._core.clones().length,h=a.proxy(function(a,b){this.load(b)},this);e++<d;)this.load(g/2+this._core.relative(f)),g&&a.each(this._core.clones(this._core.relative(f++)),h)},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this._core.$element.on(this._handlers)};c.Defaults={lazyLoad:!1},c.prototype.load=function(c){var d=this._core.$stage.children().eq(c),e=d&&d.find(".owl-lazy");!e||a.inArray(d.get(0),this._loaded)>-1||(e.each(a.proxy(function(c,d){var e,f=a(d),g=b.devicePixelRatio>1&&f.attr("data-src-retina")||f.attr("data-src");this._core.trigger("load",{element:f,url:g},"lazy"),f.is("img")?f.one("load.owl.lazy",a.proxy(function(){f.css("opacity",1),this._core.trigger("loaded",{element:f,url:g},"lazy")},this)).attr("src",g):(e=new Image,e.onload=a.proxy(function(){f.css({"background-image":"url("+g+")",opacity:"1"}),this._core.trigger("loaded",{element:f,url:g},"lazy")},this),e.src=g)},this)),this._loaded.push(d.get(0)))},c.prototype.destroy=function(){var a,b;for(a in this.handlers)this._core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Lazy=c}(window.Zepto||window.jQuery,window,document),function(a){var b=function(c){this._core=c,this._handlers={"initialized.owl.carousel":a.proxy(function(){this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":a.proxy(function(a){this._core.settings.autoHeight&&"position"==a.property.name&&this.update()},this),"loaded.owl.lazy":a.proxy(function(a){this._core.settings.autoHeight&&a.element.closest("."+this._core.settings.itemClass)===this._core.$stage.children().eq(this._core.current())&&this.update()},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this._core.$element.on(this._handlers)};b.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},b.prototype.update=function(){this._core.$stage.parent().height(this._core.$stage.children().eq(this._core.current()).height()).addClass(this._core.settings.autoHeightClass)},b.prototype.destroy=function(){var a,b;for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.AutoHeight=b}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this._core=b,this._videos={},this._playing=null,this._fullscreen=!1,this._handlers={"resize.owl.carousel":a.proxy(function(a){this._core.settings.video&&!this.isInFullScreen()&&a.preventDefault()},this),"refresh.owl.carousel changed.owl.carousel":a.proxy(function(){this._playing&&this.stop()},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find(".owl-video");c.length&&(c.css("display","none"),this.fetch(c,a(b.content)))},this)},this._core.options=a.extend({},d.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",a.proxy(function(a){this.play(a)},this))};d.Defaults={video:!1,videoHeight:!1,videoWidth:!1},d.prototype.fetch=function(a,b){var c=a.attr("data-vimeo-id")?"vimeo":"youtube",d=a.attr("data-vimeo-id")||a.attr("data-youtube-id"),e=a.attr("data-width")||this._core.settings.videoWidth,f=a.attr("data-height")||this._core.settings.videoHeight,g=a.attr("href");if(!g)throw new Error("Missing video URL.");if(d=g.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),d[3].indexOf("youtu")>-1)c="youtube";else{if(!(d[3].indexOf("vimeo")>-1))throw new Error("Video URL not supported.");c="vimeo"}d=d[6],this._videos[g]={type:c,id:d,width:e,height:f},b.attr("data-video",g),this.thumbnail(a,this._videos[g])},d.prototype.thumbnail=function(b,c){var d,e,f,g=c.width&&c.height?'style="width:'+c.width+"px;height:"+c.height+'px;"':"",h=b.find("img"),i="src",j="",k=this._core.settings,l=function(a){e='<div class="owl-video-play-icon"></div>',d=k.lazyLoad?'<div class="owl-video-tn '+j+'" '+i+'="'+a+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+a+')"></div>',b.after(d),b.after(e)};return b.wrap('<div class="owl-video-wrapper"'+g+"></div>"),this._core.settings.lazyLoad&&(i="data-src",j="owl-lazy"),h.length?(l(h.attr(i)),h.remove(),!1):void("youtube"===c.type?(f="http://img.youtube.com/vi/"+c.id+"/hqdefault.jpg",l(f)):"vimeo"===c.type&&a.ajax({type:"GET",url:"http://vimeo.com/api/v2/video/"+c.id+".json",jsonp:"callback",dataType:"jsonp",success:function(a){f=a[0].thumbnail_large,l(f)}}))},d.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null},d.prototype.play=function(b){this._core.trigger("play",null,"video"),this._playing&&this.stop();var c,d,e=a(b.target||b.srcElement),f=e.closest("."+this._core.settings.itemClass),g=this._videos[f.attr("data-video")],h=g.width||"100%",i=g.height||this._core.$stage.height();"youtube"===g.type?c='<iframe width="'+h+'" height="'+i+'" src="http://www.youtube.com/embed/'+g.id+"?autoplay=1&v="+g.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===g.type&&(c='<iframe src="http://player.vimeo.com/video/'+g.id+'?autoplay=1" width="'+h+'" height="'+i+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>'),f.addClass("owl-video-playing"),this._playing=f,d=a('<div style="height:'+i+"px; width:"+h+'px" class="owl-video-frame">'+c+"</div>"),e.after(d)},d.prototype.isInFullScreen=function(){var d=c.fullscreenElement||c.mozFullScreenElement||c.webkitFullscreenElement;return d&&a(d).parent().hasClass("owl-video-frame")&&(this._core.speed(0),this._fullscreen=!0),d&&this._fullscreen&&this._playing?!1:this._fullscreen?(this._fullscreen=!1,!1):this._playing&&this._core.state.orientation!==b.orientation?(this._core.state.orientation=b.orientation,!1):!0},d.prototype.destroy=function(){var a,b;this._core.$element.off("click.owl.video");for(a in this._handlers)this._core.$element.off(a,this._handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Video=d}(window.Zepto||window.jQuery,window,document),function(a,b,c,d){var e=function(b){this.core=b,this.core.options=a.extend({},e.Defaults,this.core.options),this.swapping=!0,this.previous=d,this.next=d,this.handlers={"change.owl.carousel":a.proxy(function(a){"position"==a.property.name&&(this.previous=this.core.current(),this.next=a.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":a.proxy(function(a){this.swapping="translated"==a.type},this),"translate.owl.carousel":a.proxy(function(){this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};e.Defaults={animateOut:!1,animateIn:!1},e.prototype.swap=function(){if(1===this.core.settings.items&&this.core.support3d){this.core.speed(0);var b,c=a.proxy(this.clear,this),d=this.core.$stage.children().eq(this.previous),e=this.core.$stage.children().eq(this.next),f=this.core.settings.animateIn,g=this.core.settings.animateOut;this.core.current()!==this.previous&&(g&&(b=this.core.coordinates(this.previous)-this.core.coordinates(this.next),d.css({left:b+"px"}).addClass("animated owl-animated-out").addClass(g).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c)),f&&e.addClass("animated owl-animated-in").addClass(f).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",c))}},e.prototype.clear=function(b){a(b.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.transitionEnd()},e.prototype.destroy=function(){var a,b;for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(b in Object.getOwnPropertyNames(this))"function"!=typeof this[b]&&(this[b]=null)},a.fn.owlCarousel.Constructor.Plugins.Animate=e}(window.Zepto||window.jQuery,window,document),function(a,b,c){var d=function(b){this.core=b,this.core.options=a.extend({},d.Defaults,this.core.options),this.handlers={"translated.owl.carousel refreshed.owl.carousel":a.proxy(function(){this.autoplay()
},this),"play.owl.autoplay":a.proxy(function(a,b,c){this.play(b,c)},this),"stop.owl.autoplay":a.proxy(function(){this.stop()},this),"mouseover.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.pause()},this),"mouseleave.owl.autoplay":a.proxy(function(){this.core.settings.autoplayHoverPause&&this.autoplay()},this)},this.core.$element.on(this.handlers)};d.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},d.prototype.autoplay=function(){this.core.settings.autoplay&&!this.core.state.videoPlay?(b.clearInterval(this.interval),this.interval=b.setInterval(a.proxy(function(){this.play()},this),this.core.settings.autoplayTimeout)):b.clearInterval(this.interval)},d.prototype.play=function(){return c.hidden===!0||this.core.state.isTouch||this.core.state.isScrolling||this.core.state.isSwiping||this.core.state.inMotion?void 0:this.core.settings.autoplay===!1?void b.clearInterval(this.interval):void this.core.next(this.core.settings.autoplaySpeed)},d.prototype.stop=function(){b.clearInterval(this.interval)},d.prototype.pause=function(){b.clearInterval(this.interval)},d.prototype.destroy=function(){var a,c;b.clearInterval(this.interval);for(a in this.handlers)this.core.$element.off(a,this.handlers[a]);for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},a.fn.owlCarousel.Constructor.Plugins.autoplay=d}(window.Zepto||window.jQuery,window,document),function(a){"use strict";var b=function(c){this._core=c,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.push(a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"add.owl.carousel":a.proxy(function(b){this._core.settings.dotsData&&this._templates.splice(b.position,0,a(b.content).find("[data-dot]").andSelf("[data-dot]").attr("data-dot"))},this),"remove.owl.carousel prepared.owl.carousel":a.proxy(function(a){this._core.settings.dotsData&&this._templates.splice(a.position,1)},this),"change.owl.carousel":a.proxy(function(a){if("position"==a.property.name&&!this._core.state.revert&&!this._core.settings.loop&&this._core.settings.navRewind){var b=this._core.current(),c=this._core.maximum(),d=this._core.minimum();a.data=a.property.value>c?b>=c?d:c:a.property.value<d?c:a.property.value}},this),"changed.owl.carousel":a.proxy(function(a){"position"==a.property.name&&this.draw()},this),"refreshed.owl.carousel":a.proxy(function(){this._initialized||(this.initialize(),this._initialized=!0),this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation")},this)},this._core.options=a.extend({},b.Defaults,this._core.options),this.$element.on(this._handlers)};b.Defaults={nav:!1,navRewind:!0,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotData:!1,dotsSpeed:!1,dotsContainer:!1,controlsClass:"owl-controls"},b.prototype.initialize=function(){var b,c,d=this._core.settings;d.dotsData||(this._templates=[a("<div>").addClass(d.dotClass).append(a("<span>")).prop("outerHTML")]),d.navContainer&&d.dotsContainer||(this._controls.$container=a("<div>").addClass(d.controlsClass).appendTo(this.$element)),this._controls.$indicators=d.dotsContainer?a(d.dotsContainer):a("<div>").hide().addClass(d.dotsClass).appendTo(this._controls.$container),this._controls.$indicators.on("click","div",a.proxy(function(b){var c=a(b.target).parent().is(this._controls.$indicators)?a(b.target).index():a(b.target).parent().index();b.preventDefault(),this.to(c,d.dotsSpeed)},this)),b=d.navContainer?a(d.navContainer):a("<div>").addClass(d.navContainerClass).prependTo(this._controls.$container),this._controls.$next=a("<"+d.navElement+">"),this._controls.$previous=this._controls.$next.clone(),this._controls.$previous.addClass(d.navClass[0]).html(d.navText[0]).hide().prependTo(b).on("click",a.proxy(function(){this.prev(d.navSpeed)},this)),this._controls.$next.addClass(d.navClass[1]).html(d.navText[1]).hide().appendTo(b).on("click",a.proxy(function(){this.next(d.navSpeed)},this));for(c in this._overrides)this._core[c]=a.proxy(this[c],this)},b.prototype.destroy=function(){var a,b,c,d;for(a in this._handlers)this.$element.off(a,this._handlers[a]);for(b in this._controls)this._controls[b].remove();for(d in this.overides)this._core[d]=this._overrides[d];for(c in Object.getOwnPropertyNames(this))"function"!=typeof this[c]&&(this[c]=null)},b.prototype.update=function(){var a,b,c,d=this._core.settings,e=this._core.clones().length/2,f=e+this._core.items().length,g=d.center||d.autoWidth||d.dotData?1:d.dotsEach||d.items;if("page"!==d.slideBy&&(d.slideBy=Math.min(d.slideBy,d.items)),d.dots||"page"==d.slideBy)for(this._pages=[],a=e,b=0,c=0;f>a;a++)(b>=g||0===b)&&(this._pages.push({start:a-e,end:a-e+g-1}),b=0,++c),b+=this._core.mergers(this._core.relative(a))},b.prototype.draw=function(){var b,c,d="",e=this._core.settings,f=(this._core.$stage.children(),this._core.relative(this._core.current()));if(!e.nav||e.loop||e.navRewind||(this._controls.$previous.toggleClass("disabled",0>=f),this._controls.$next.toggleClass("disabled",f>=this._core.maximum())),this._controls.$previous.toggle(e.nav),this._controls.$next.toggle(e.nav),e.dots){if(b=this._pages.length-this._controls.$indicators.children().length,e.dotData&&0!==b){for(c=0;c<this._controls.$indicators.children().length;c++)d+=this._templates[this._core.relative(c)];this._controls.$indicators.html(d)}else b>0?(d=new Array(b+1).join(this._templates[0]),this._controls.$indicators.append(d)):0>b&&this._controls.$indicators.children().slice(b).remove();this._controls.$indicators.find(".active").removeClass("active"),this._controls.$indicators.children().eq(a.inArray(this.current(),this._pages)).addClass("active")}this._controls.$indicators.toggle(e.dots)},b.prototype.onTrigger=function(b){var c=this._core.settings;b.page={index:a.inArray(this.current(),this._pages),count:this._pages.length,size:c&&(c.center||c.autoWidth||c.dotData?1:c.dotsEach||c.items)}},b.prototype.current=function(){var b=this._core.relative(this._core.current());return a.grep(this._pages,function(a){return a.start<=b&&a.end>=b}).pop()},b.prototype.getPosition=function(b){var c,d,e=this._core.settings;return"page"==e.slideBy?(c=a.inArray(this.current(),this._pages),d=this._pages.length,b?++c:--c,c=this._pages[(c%d+d)%d].start):(c=this._core.relative(this._core.current()),d=this._core.items().length,b?c+=e.slideBy:c-=e.slideBy),c},b.prototype.next=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!0),b)},b.prototype.prev=function(b){a.proxy(this._overrides.to,this._core)(this.getPosition(!1),b)},b.prototype.to=function(b,c,d){var e;d?a.proxy(this._overrides.to,this._core)(b,c):(e=this._pages.length,a.proxy(this._overrides.to,this._core)(this._pages[(b%e+e)%e].start,c))},a.fn.owlCarousel.Constructor.Plugins.Navigation=b}(window.Zepto||window.jQuery,window,document),function(a,b){"use strict";var c=function(d){this._core=d,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":a.proxy(function(){"URLHash"==this._core.settings.startPosition&&a(b).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":a.proxy(function(b){var c=a(b.content).find("[data-hash]").andSelf("[data-hash]").attr("data-hash");this._hashes[c]=b.content},this)},this._core.options=a.extend({},c.Defaults,this._core.options),this.$element.on(this._handlers),a(b).on("hashchange.owl.navigation",a.proxy(function(){var a=b.location.hash.substring(1),c=this._core.$stage.children(),d=this._hashes[a]&&c.index(this._hashes[a])||0;return a?void this._core.to(d,!1,!0):!1},this))};c.Defaults={URLhashListener:!1},c.prototype.destroy=function(){var c,d;a(b).off("hashchange.owl.navigation");for(c in this._handlers)this._core.$element.off(c,this._handlers[c]);for(d in Object.getOwnPropertyNames(this))"function"!=typeof this[d]&&(this[d]=null)},a.fn.owlCarousel.Constructor.Plugins.Hash=c}(window.Zepto||window.jQuery,window,document);   

/*! Shortcode.js by @nicinabox | v1.1.0 - https://github.com/nicinabox/shortcode.js */
var Shortcode=function(el,tags){if(!el){return}this.el=el;this.tags=tags;this.matches=[];this.regex='\\[{name}(\\s[\\s\\S]*?)?\\]'+'(?:((?!\\s*?(?:\\[{name}|\\[\\/(?!{name})))[\\s\\S]*?)'+'(\\[\/{name}\\]))?';if(this.el.jquery){this.el=this.el[0]}this.matchTags();this.convertMatchesToNodes();this.replaceNodes()};Shortcode.prototype.matchTags=function(){var html=this.el.outerHTML,instances,match,re,contents,regex,tag,options;for(var key in this.tags){if(!this.tags.hasOwnProperty(key)){return}re=this.template(this.regex,{name:key});instances=html.match(new RegExp(re,'g'))||[];for(var i=0,len=instances.length;i<len;i++){match=instances[i].match(new RegExp(re));contents=match[3]?'':undefined;tag=match[0];regex=this.escapeTagRegExp(tag);options=this.parseOptions(match[1]);if(match[2]){contents=match[2].trim();tag=tag.replace(contents,'').replace(/\n\s*/g,'');regex=this.escapeTagRegExp(tag).replace('\\]\\[','\\]([\\s\\S]*?)\\[')}this.matches.push({name:key,tag:tag,regex:regex,options:options,contents:contents})}}};Shortcode.prototype.convertMatchesToNodes=function(){var html=this.el.innerHTML,excludes,re,replacer;replacer=function(match,p1,p2,p3,p4,offset,string){if(p1){return match}else{var node=document.createElement('span');node.setAttribute('data-sc-tag',this.tag);node.className='sc-node sc-node-'+this.name;return node.outerHTML}};for(var i=0,len=this.matches.length;i<len;i++){excludes='((data-sc-tag=")|(<pre.*)|(<code.*))?';re=new RegExp(excludes+this.matches[i].regex,'g');html=html.replace(re,replacer.bind(this.matches[i]))}this.el.innerHTML=html};Shortcode.prototype.replaceNodes=function(){var self=this,html,match,result,done,node,fn,replacer,nodes=this.el.querySelectorAll('.sc-node');replacer=function(result){if(result.jquery){result=result[0]}result=self.parseCallbackResult(result);node.parentNode.replaceChild(result,node)};for(var i=0,len=this.matches.length;i<len;i++){match=this.matches[i];node=this.el.querySelector('.sc-node-'+match.name);if(node&&node.dataset.scTag===match.tag){fn=this.tags[match.name].bind(match);done=replacer.bind(match);result=fn(done);if(result!==undefined){done(result)}}}};Shortcode.prototype.parseCallbackResult=function(result){var container,fragment,children;switch(typeof result){case'function':result=document.createTextNode(result());break;case'string':container=document.createElement('div');fragment=document.createDocumentFragment();container.innerHTML=result;children=container.childNodes;if(children.length){for(var i=0,len=children.length;i<len;i++){fragment.appendChild(children[i].cloneNode(true))}result=fragment}else{result=document.createTextNode(result)}break;case'object':if(!result.nodeType){result=JSON.stringify(result);result=document.createTextNode(result)}break;case'default':break}return result};Shortcode.prototype.parseOptions=function(stringOptions){var options={},set;if(!stringOptions){return}set=stringOptions.replace(/(\w+=)/g,'\n$1').split('\n');set.shift();for(var i=0;i<set.length;i++){var kv=set[i].split('=');options[kv[0]]=kv[1].replace(/\'|\"/g,'').trim()}return options};Shortcode.prototype.escapeTagRegExp=function(regex){return regex.replace(/[\[\]\/]/g,'\\$&')};Shortcode.prototype.template=function(s,d){for(var p in d){s=s.replace(new RegExp('{'+p+'}','g'),d[p])}return s};String.prototype.trim=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,'')};if(window.jQuery){var pluginName='shortcode';$.fn[pluginName]=function(tags){this.each(function(){if(!$.data(this,pluginName)){$.data(this,pluginName,new Shortcode(this,tags))}});return this}}

/*! Tabify by feed.studenthours | v1.0.0 - https://feed.studenthours.xyz */
!function(a){a.fn.tabify=function(b){b=jQuery.extend({onHover:false,animated:true,transition:'fadeInUp'},b);return this.each(function(){var e=a(this),c=e.children('[tab-ify]'),d=0,n='tab-animated',k='tab-active';if(b.onHover==true){var event='mouseenter'}else{var event='click'}e.prepend('<ul class="select-tab"></ul>');c.each(function(){if(b.animated==true){a(this).addClass(n)}e.find('.select-tab').append('<li><a href="#">'+a(this).attr('tab-ify')+'</a></li>')}).eq(d).addClass(k).addClass('tab-'+b.transition);e.find('.select-tab a').on(event,function(){var f=a(this).parent().index();a(this).closest('.select-tab').find('.active').removeClass('active');a(this).parent().addClass('active');c.removeClass(k).removeClass('tab-'+b.transition).eq(f).addClass(k).addClass('tab-'+b.transition);return false}).eq(d).parent().addClass('active')})}}(jQuery);

/*! Lazify by feed.studenthours | v1.0.0 - https://feed.studenthours.xyz */
!function(a){a.fn.lazyify=function(){return this.each(function(){var t=a(this),src=t.attr('data-src');t.attr('src',src);t.on('load',function(){t.addClass('lazy-ify')})})}}(jQuery);

/*! Mobile View Parameter */
var uri = window.location.toString();if (uri.indexOf("?m=1","?m=1") > 0) {var clean_uri = uri.substring(0, uri.indexOf("?m=1"));window.history.replaceState({}, document.title, clean_uri);}

/*! Anti Ad Bomber */
	var disableAds = "disabled" ; //Replace with hidden to hide all ads, disabled to disable click
	var maxClick =3; //The maximum number of clicks when exceeded will hide or block ad clicks
	var adsCookieEx =first; //Set from 1-24, time the user is clicked back
	function  setCookie ( a, b, c ) {
	    if (c) {
	        var d = new  Date ();
	        d.setTime(d.getTime() + adsCookieEx * 3600 * 1000 );
	        var e = ";expires=" + d.toGMTString()
	    } else {
	        var e = ""
	    }
	    document .cookie = a + "=" + b + e + ";path=/"
	}
	function  getCookie ( a ) {
	    var b, c, d, e = document .cookie.split( ";" );
	    for (b = 0 ; b < e.length; b++)
	        if (c = e[b].substr( 0 , e[b].indexOf( "=" )), d = e[b].substr(e[b].indexOf( "=" ) + 1 ), c = c.replace( /^\s+|\s+$/g , "" ), c ​​== a) return  unescape (d)
	}
	function  setCookieAds ( a, b ) {
	    var c = getCookie(a);
	    void  0 != c && "" != c ? (ASTheCookieInt = parseInt (c) + 1 , setCookie(a, ASTheCookieInt.toString(), 0 )) : setCookie(a, "1" , b)
	}
	function  maxClick ( a, b ) {
	    var c = getCookie(a);
	    return  void  0 != c && parseInt (c) >= b ? ! 0 : ! first
	}
	jQuery( document .ready( function ( a ) {
	    var b = "adsbygoogle" ,
	        c = 7 ,
	        d = maxClick,
	        e = ".adsbygoogle" ,
	        f = ! 1 ;
	    maxClick(b, d) && a(e).addClass(disableAds).click( false ), a(e).bind( "mouseover" , function () {
	        f = ! 0
	    }).bind( "mouseout" , function () {
	        f = ! first
	    }), a( window .on( "beforeunload" , function () {
	        f && (ASmaxClick(b, d) ? a(e).addClass(disableAds).click( false ) : setCookieAds(b, c))
	    })
	});

/*! Script License */
 'use strict';
 var _$_obify3 = ["a", "children", ".LinkList ul > li", "find", "length", "eq", "text", "charAt", "_", "parent", '<ul class="sub-menu m-sub"/>', "append", "", "replace", ".sub-menu", "appendTo", '<ul class="sub-menu2 m-sub"/>', ".sub-menu2", "has-sub", "addClass", "li", "#main-menu ul li ul", "trim", "toLowerCase", "-", "split", "-text", "match", "data-title", "attr", "> a", "li-home", "-icon", '<i class="fas fa-home"/>', "html", "li-home li-home-icon", "each", "#main-menu ul > li a", "show-menu",
 "#main-menu .widget", "#main-menu", ".mobile-menu", "clone", "#main-menu-nav", '<div class="submenu-toggle"/>', ".mobile-menu .has-sub", "click", "nav-active", "toggleClass", "body", "fadeToggle", ".overlay", "on", ".slide-menu-toggle", "href", "title", "data", "li.li-home", "getmega", '<div class="getMega">', "</div>", "label", "options", "type", "msimple", "recent", "/search/?&max-results=", "random", "/search/label/", "?&max-results=", "mcarousel", "#", "/", '<ul class="sub-menu m-sub">', '<li><a href="/search/label/',
 '">', "</a></li>", "</ul>", "mtabs", "shortcode", ".getMega", ".mobile-menu ul li a", ".slide-menu", "social-mobile social", "#top-bar-social .widget-content > ul", "hasClass", "preventDefault", "show", "slideToggle", ".m-sub", "> .m-sub", "removeClass", ".mobile-menu ul li .submenu-toggle", "scrollTop", "top", "offset", "height", "#footer-wrapper", "fixed-menu", "show-fixed-menu", "scroll", ".header-menu,.mobile-header", "focus", "input", "fadeIn", "#nav-search, .mobile-search-form", ".show-search, .show-mobile-search",
 "blur", "fadeOut", ".hide-search, .hide-mobile-search", ".follow-by-email-text", ".follow-by-email-span", ".home-posts-headline > h3", ".home-posts-headline > a.more", ".post-prev .post-nav-inner > span", ".post-next .post-nav-inner > span", ".about-author .author-name > span", "#related-wrap .title-wrap > h3", ".comments-title > h3", ".Label a,.index-post-wrap .title-wrap a", "src", "/s35-c/", "/s45-c/", "//img1.blogblog.com/img/blank.gif", "//4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s45-r/avatar.png",
 ".avatar-image-container img", "data-src", "https://4.bp.blogspot.com/-eALXtf-Ljts/WrQYAbzcPUI/AAAAAAAABjY/vptx-N2H46oFbiCqbSe2JgVSlHhyl0MwQCK4BGAYYCw/s680/nth-ify.png", ".index-post .featured-image img, .PopularPosts .featured-image img, .FeaturedPost .featured-image img", "lazyify", ".index-post .featured-image img, .PopularPosts .featured-image img, .FeaturedPost .featured-image img, .about-author img, .avatar-image-container img, .Image .customImage .custom-image-object", ".widget-title > h3",
 "tab-ify", "#sidebar-tabs .widget", "tabify", "#sidebar-tabs", "tabs-", "a.prev-post-link", "a.next-post-link", "get", ".blog-post h1.post-title", ".post-prev a .post-nav-inner p", "ajax", ".post-next a .post-nav-inner p", ".post-nav", "url", "width", "screen", "round", "_blank", "scrollbars=yes,resizable=yes,toolbar=no,location=yes,width=", ",height=", ",left=", ",top=", "open", ".share-links .window-ify", "pop", "button", "css", "colored-button", ".post-body a", "contact-form", '<div class="contact-form"/>',
"replaceWith", "#ContactForm1", ".contact-form", "alert-success", '<div class="alert-message alert-success short-b">', "alert-info", '<div class="alert-message alert-info short-b">', "alert-warning", '<div class="alert-message alert-warning short-b">', "alert-error", '<div class="alert-message alert-error short-b">', "left-sidebar", "<style>.item #main-wrapper{float:right;padding:0 0 0 25px}.item #sidebar-wrapper{float:left}</style>", "right-sidebar", "<style>.item #main-wrapper{float:left;padding:0 25px 0 0}.item #sidebar-wrapper{float:right}</style>",
"full-width", "<style>.item #main-wrapper{width:100%;padding:0}.item #sidebar-wrapper{display:none}</style>", "code-box", '<pre class="code-box short-b">', "</pre>", "b", ".post-body .short-b", ".post-body strike", "facebook.com", '<li class="facebook"><a href="', '" title="Facebook" target="_blank"/></li>', "twitter.com", '<li class="twitter"><a href="', '" title="Twitter" target="_blank"/></li>', "google.com", '<li class="gplus"><a href="', '" title="Google Plus" target="_blank"/></li>', "pinterest.com",
 '<li class="pinterest"><a href="', '" title="Pinterest" target="_blank"/></li>', "instagram.com", '<li class="instagram"><a href="', '" title="Instagram" target="_blank"/></li>', "linkedin.com", '<li class="linkedin"><a href="', '" title="Linkedin" target="_blank"/></li>', "youtube.com", '<li class="youtube"><a href="', '" title="YouTube" target="_blank"/></li>', '<li class="external-link"><a href="', '" title="Site" target="_blank"/></li>', ".author-description span li", ".author-description", "show-icons",
 ".about-author .author-description span a", "theiaStickySidebar", "#main-wrapper, #sidebar-wrapper", "getsocial", "link", "show-ify", ".widget-content", "social-links social social-color-hover", "ul", '<li class="', '"><a href="', '" title="', '" target="_blank"/></li>', "remove", ".TextList .widget-content ul li", "animate", "html, body", ".back-top", '<span class="no-posts">Error <b>[check the shortcode]</b></span>', '<div class="loader"><i/></div>', "results", "#main-menu li", '<ul class="complex-tabs">',
 '<div class="mega-tab" tab-ify="', '"/>', "has-sub mega-menu mega-tabs", "a:first", "megatabs", ".mega-tab", "ul.complex-tabs", '<ul class="mega-widget">', "#ticker-sec .HTML .widget-content", "featured1", "featured3", "#featured-sec .HTML .widget-content", ".block-posts .HTML .widget-content", ".ready-widget .HTML .widget-content", "data-label", ".related-tag", "related", "getrelated", ".related-ready", "/feeds/posts/default?alt=json-in-script&max-results=", "floor", "/feeds/posts/default?max-results=",
 "&start-index=", "&alt=json-in-script", "list", "/feeds/comments/default?alt=json-in-script&max-results=", "/feeds/posts/default/-/", "?alt=json-in-script&max-results=", "comments", "rel", "alternate", "$t", '<a href="', "</a>", "name", "author", '<span class="item-author">', "</span>", "published", "substring", " ", ", ", '<span class="item-date published" datetime="', "content", "<div>", "media$thumbnail", "/s72-c", "/s680", "/w440-h290-p-k-no-nu", "/w100-h80-p-k-no-nu", "youtube.com/embed", "indexOf",
 "/default.", "/hqdefault.", "/mqdefault.", "<img", "img:first", '<img class="image-object" alt="', '" data-src="', "category", "term", '<span class="post-tag">', "gd$image", "https://4.bp.blogspot.com/-uCjYgVFIh70/VuOLn-mL7PI/AAAAAAAADUs/Kcu9wJbv790hIo83rI_s7lLW3zkLY01EA/s55-r/avatar.png", "http://img2.blogblog.com/img/b16-rounded.gif", '<li><a class="cmm-avatar featured-image" href="', '"><img class="image-object" data-src="', '" alt="', '"/></a><a href="', '</a><span class="cmm-text">', "</span></li>",
 "ticker", "featured2", "featured4", "featured5", "block1", "col-left", "col-right", "grid1", "carousel", "videos", "geterror", "GET", "jsonp", "show-ify show-featured-3", "show-ify show-featured-4", "show-ify show-featured-5", '<ul class="mega-widget"><div class="mega-carousel-start">', '<ul class="ticker-posts">', '<ul class="featured-grid featured-1">', '<ul class="featured-grid featured-2">', '<ul class="featured-grid featured-3">', '<ul class="featured-grid featured-4">', '<ul class="featured-grid featured-5">',
 '<ul class="block-posts-1">', "block-column", '<ul class="column-posts">', '<ul class="grid-posts-1">', '<ul class="block-carousel">', '<ul class="block-videos">', '<ul class="cmm-widget">', '<ul class="custom-widget">', '<ul class="related-posts">', "entry", "feed", '<div class="mega-item"><div class="mega-content"><a class="featured-image" href="', '</a><h2 class="post-title">', '</h2><div class="post-meta">', "</div></div></div>", '<li class="ticker-item"><h2 class="post-title">', "</h2></li>",
 '<li class="featured-item item-', '"><div class="featured-item-inner"><a class="featured-image before-mask" href="', '</a><div class="post-info">', '<h2 class="post-title">', "</div></div></div></li>", '<li class="block-item item-', '"><div class="block-inner"><a class="featured-image before-mask" href="', '<div class="post-info"><h2 class="post-title">', '"><a class="featured-image" href="', "</div></li>", '<li class="column-item item-1"><div class="column-inner"><a class="featured-image before-mask" href="',
 '<li class="column-item"><a class="featured-image" href="', '<li class="grid-item"><div class="featured-image-wrap"><a class="featured-image" href="', '</div><h2 class="post-title">', '<li class="carousel-item"><div class="carousel-inner"><a class="featured-image before-mask" href="', '<li class="videos-item item-', '"><div class="videos-inner"><a class="featured-image before-mask" href="', '<span class="video-icon"/></a>', '<span class="video-icon"/></a><div class="post-info"><h2 class="post-title">',
 "</h2></div></div></li>", '<li><a class="featured-image" href="', "</div></div></li>", '<li class="related-item"><div class="featured-image-wrap"><a class="featured-image" href="', "</div></ul>", "has-sub mega-menu mega-carousel", ".mega-carousel-start", "owlCarousel", "has-sub mega-menu", ".ticker-posts", "fadeInRight", "fadeOutRight", "column-left show-ify", "column-right show-ify", ".block-carousel", "img.image-object", "getticker", "getfeatured", "getblock", '<a class="more" href="/search/label/',
 ".widget-title", "getwidget", "style", "visibility:visible!important;opacity:1!important;position:relative!important;z-index:1!important;font-size:12px!important;", "The Insider Feed", "A Venture by Student Hours", "https://feed.studenthours.xyz/", "a#copyright", "a#copyright:visible", "location", '<div id="disqus_thread"/>', '<div class="disqus_thread" data-width="100%" data-href="', '" data-numposts="5"></div>', "comments-system-", "blogger", "script", "createElement", "text/javascript", "async", "//",
 ".disqus.com/embed.js", "appendChild", "head", "getElementsByTagName", "#comments, #gpluscomments", "disqus", "facebook", "hide", "comments-system-default", ".blog-post-comments"
 ];
 var _$_obify2 = [_$_obify3[0], _$_obify3[1], _$_obify3[2], _$_obify3[3], _$_obify3[4], _$_obify3[5], _$_obify3[6], _$_obify3[7], _$_obify3[8], _$_obify3[9], _$_obify3[10], _$_obify3[11], _$_obify3[12], _$_obify3[13], _$_obify3[14], _$_obify3[15], _$_obify3[16], _$_obify3[17], _$_obify3[18], _$_obify3[19], _$_obify3[20], _$_obify3[21], _$_obify3[22], _$_obify3[23], _$_obify3[24], _$_obify3[25], _$_obify3[26], _$_obify3[27], _$_obify3[28], _$_obify3[29], _$_obify3[30], _$_obify3[31], _$_obify3[32], _$_obify3[33], _$_obify3[34], _$_obify3[35], _$_obify3[36], _$_obify3[37], _$_obify3[38], _$_obify3[39], _$_obify3[40], _$_obify3[41], _$_obify3[42], _$_obify3[43], _$_obify3[44], _$_obify3[45], _$_obify3[46], _$_obify3[47], _$_obify3[48], _$_obify3[49], _$_obify3[50], _$_obify3[51], _$_obify3[52], _$_obify3[53], _$_obify3[54], _$_obify3[55], _$_obify3[56], _$_obify3[57], _$_obify3[58], _$_obify3[59], _$_obify3[60], _$_obify3[61], _$_obify3[62], _$_obify3[63], _$_obify3[64], _$_obify3[65], _$_obify3[66], _$_obify3[67], _$_obify3[68], _$_obify3[69], _$_obify3[70], _$_obify3[71], _$_obify3[72], _$_obify3[73], _$_obify3[74], _$_obify3[75], _$_obify3[76], _$_obify3[77], _$_obify3[78], _$_obify3[79], _$_obify3[80], _$_obify3[81], _$_obify3[82], _$_obify3[83], _$_obify3[84], _$_obify3[85], _$_obify3[86], _$_obify3[87], _$_obify3[88], _$_obify3[89], _$_obify3[90], _$_obify3[91], _$_obify3[92], _$_obify3[93], _$_obify3[94], _$_obify3[95], _$_obify3[96], _$_obify3[97], _$_obify3[98], _$_obify3[99], _$_obify3[100], _$_obify3[101], _$_obify3[102], _$_obify3[103], _$_obify3[104], _$_obify3[105], _$_obify3[106], _$_obify3[107], _$_obify3[108], _$_obify3[109], _$_obify3[110], _$_obify3[111], _$_obify3[112], _$_obify3[113], _$_obify3[114], _$_obify3[115], _$_obify3[116], _$_obify3[117], _$_obify3[118], _$_obify3[119], _$_obify3[120], _$_obify3[121], _$_obify3[122], _$_obify3[123], _$_obify3[124], _$_obify3[125], _$_obify3[126], _$_obify3[127], _$_obify3[128], _$_obify3[129], _$_obify3[130], _$_obify3[131], _$_obify3[132], _$_obify3[133], _$_obify3[134], _$_obify3[135], _$_obify3[136], _$_obify3[137], _$_obify3[138], _$_obify3[139], _$_obify3[140], _$_obify3[141], _$_obify3[142], _$_obify3[143], _$_obify3[144], _$_obify3[145], _$_obify3[146], _$_obify3[147], _$_obify3[148], _$_obify3[149], _$_obify3[150], _$_obify3[151], _$_obify3[152], _$_obify3[153], _$_obify3[154], _$_obify3[155], _$_obify3[156], _$_obify3[157], _$_obify3[158], _$_obify3[159], _$_obify3[160], _$_obify3[161], _$_obify3[162], _$_obify3[163], _$_obify3[164], _$_obify3[165], _$_obify3[166], _$_obify3[167], _$_obify3[168], _$_obify3[169], _$_obify3[170], _$_obify3[171], _$_obify3[172], _$_obify3[173], _$_obify3[174], _$_obify3[175], _$_obify3[176], _$_obify3[177], _$_obify3[178], _$_obify3[179], _$_obify3[180], _$_obify3[181], _$_obify3[182], _$_obify3[183], _$_obify3[184], _$_obify3[185], _$_obify3[186], _$_obify3[187], _$_obify3[188], _$_obify3[189], _$_obify3[190], _$_obify3[191], _$_obify3[192], _$_obify3[193], _$_obify3[194], _$_obify3[195], _$_obify3[196], _$_obify3[197], _$_obify3[198], _$_obify3[199], _$_obify3[200], _$_obify3[201], _$_obify3[202], _$_obify3[203], _$_obify3[204], _$_obify3[205], _$_obify3[206], _$_obify3[207], _$_obify3[208], _$_obify3[209], _$_obify3[210], _$_obify3[211], _$_obify3[212], _$_obify3[213], _$_obify3[214], _$_obify3[215], _$_obify3[216], _$_obify3[217], _$_obify3[218], _$_obify3[219], _$_obify3[220], _$_obify3[221], _$_obify3[222], _$_obify3[223], _$_obify3[224], _$_obify3[225], _$_obify3[226], _$_obify3[227], _$_obify3[228], _$_obify3[229], _$_obify3[230], _$_obify3[231], _$_obify3[232], _$_obify3[233], _$_obify3[234], _$_obify3[235], _$_obify3[236], _$_obify3[237], _$_obify3[238], _$_obify3[239], _$_obify3[240], _$_obify3[241], _$_obify3[242], _$_obify3[243], _$_obify3[244], _$_obify3[245], _$_obify3[246], _$_obify3[247], _$_obify3[248], _$_obify3[249], _$_obify3[250], _$_obify3[251], _$_obify3[252], _$_obify3[253], _$_obify3[254], _$_obify3[255], _$_obify3[256], _$_obify3[257], _$_obify3[258], _$_obify3[259], _$_obify3[260], _$_obify3[261], _$_obify3[262], _$_obify3[263], _$_obify3[264], _$_obify3[265], _$_obify3[266], _$_obify3[267], _$_obify3[268], _$_obify3[269], _$_obify3[270], _$_obify3[271], _$_obify3[272], _$_obify3[273], _$_obify3[274], _$_obify3[275], _$_obify3[276], _$_obify3[277], _$_obify3[278], _$_obify3[279], _$_obify3[280], _$_obify3[281], _$_obify3[282], _$_obify3[283], _$_obify3[284], _$_obify3[285], _$_obify3[286], _$_obify3[287], _$_obify3[288], _$_obify3[289], _$_obify3[290], _$_obify3[291], _$_obify3[292], _$_obify3[293], _$_obify3[294], _$_obify3[295], _$_obify3[296], _$_obify3[297], _$_obify3[298], _$_obify3[299], _$_obify3[300], _$_obify3[301], _$_obify3[302], _$_obify3[303], _$_obify3[304], _$_obify3[305], _$_obify3[306], _$_obify3[307], _$_obify3[308], _$_obify3[309], _$_obify3[310], _$_obify3[311], _$_obify3[312], _$_obify3[313], _$_obify3[314], _$_obify3[315], _$_obify3[316], _$_obify3[317], _$_obify3[318], _$_obify3[319], _$_obify3[320], _$_obify3[321], _$_obify3[322], _$_obify3[323], _$_obify3[324], _$_obify3[325], _$_obify3[326], _$_obify3[327], _$_obify3[328], _$_obify3[329], _$_obify3[330], _$_obify3[331], _$_obify3[332], _$_obify3[333], _$_obify3[334], _$_obify3[335], _$_obify3[336], _$_obify3[337], _$_obify3[338], _$_obify3[339], _$_obify3[340], _$_obify3[341], _$_obify3[342], _$_obify3[343], _$_obify3[344], _$_obify3[345], _$_obify3[346], _$_obify3[347], _$_obify3[348], _$_obify3[349], _$_obify3[350], _$_obify3[351], _$_obify3[352], _$_obify3[353], _$_obify3[354], _$_obify3[355], _$_obify3[356], _$_obify3[357], _$_obify3[358], _$_obify3[359], _$_obify3[360], _$_obify3[361], _$_obify3[362], _$_obify3[363], _$_obify3[364], _$_obify3[365], _$_obify3[366], _$_obify3[367], _$_obify3[368], _$_obify3[369], _$_obify3[370], _$_obify3[371], _$_obify3[372], _$_obify3[373], _$_obify3[374], _$_obify3[375], _$_obify3[376], _$_obify3[377], _$_obify3[378], _$_obify3[379], _$_obify3[380], _$_obify3[381], _$_obify3[382], _$_obify3[383], _$_obify3[384], _$_obify3[385], _$_obify3[386], _$_obify3[387], _$_obify3[388], _$_obify3[389], _$_obify3[390], _$_obify3[391], _$_obify3[392], _$_obify3[393], _$_obify3[394], _$_obify3[395], _$_obify3[396], _$_obify3[397], _$_obify3[398], _$_obify3[399], _$_obify3[400], _$_obify3[401], _$_obify3[402], _$_obify3[403], _$_obify3[404], _$_obify3[405], _$_obify3[406], _$_obify3[407], _$_obify3[408], _$_obify3[409], _$_obify3[410], _$_obify3[411], _$_obify3[412], _$_obify3[413], _$_obify3[414]];
 var _$_obify1 = [_$_obify2[0], _$_obify2[1], _$_obify2[2], _$_obify2[3], _$_obify2[4], _$_obify2[5], _$_obify2[6], _$_obify2[7], _$_obify2[8], _$_obify2[9], _$_obify2[10], _$_obify2[11], _$_obify2[12], _$_obify2[13], _$_obify2[14], _$_obify2[15], _$_obify2[16], _$_obify2[17], _$_obify2[18], _$_obify2[19], _$_obify2[20], _$_obify2[21], _$_obify2[22], _$_obify2[23], _$_obify2[24], _$_obify2[25], _$_obify2[26], _$_obify2[27], _$_obify2[28], _$_obify2[29], _$_obify2[30], _$_obify2[31], _$_obify2[32], _$_obify2[33], _$_obify2[34], _$_obify2[35], _$_obify2[36], _$_obify2[37], _$_obify2[38], _$_obify2[39], _$_obify2[40], _$_obify2[41], _$_obify2[42], _$_obify2[43], _$_obify2[44], _$_obify2[45], _$_obify2[46], _$_obify2[47], _$_obify2[48], _$_obify2[49], _$_obify2[50], _$_obify2[51], _$_obify2[52], _$_obify2[53], _$_obify2[54], _$_obify2[55], _$_obify2[56], _$_obify2[57], _$_obify2[58], _$_obify2[59], _$_obify2[60], _$_obify2[61], _$_obify2[62], _$_obify2[63], _$_obify2[64], _$_obify2[65], _$_obify2[66], _$_obify2[67], _$_obify2[68], _$_obify2[69], _$_obify2[70], _$_obify2[71], _$_obify2[72], _$_obify2[73], _$_obify2[74], _$_obify2[75], _$_obify2[76], _$_obify2[77], _$_obify2[78], _$_obify2[79], _$_obify2[80], _$_obify2[81], _$_obify2[82], _$_obify2[83], _$_obify2[84], _$_obify2[85], _$_obify2[86], _$_obify2[87], _$_obify2[88], _$_obify2[89], _$_obify2[90], _$_obify2[91], _$_obify2[92], _$_obify2[93], _$_obify2[94], _$_obify2[95], _$_obify2[96], _$_obify2[97], _$_obify2[98], _$_obify2[99], _$_obify2[100], _$_obify2[101], _$_obify2[102], _$_obify2[103], _$_obify2[104], _$_obify2[105], _$_obify2[106], _$_obify2[107], _$_obify2[108], _$_obify2[109], _$_obify2[110], _$_obify2[111], _$_obify2[112], _$_obify2[113], _$_obify2[114], _$_obify2[115], _$_obify2[116], _$_obify2[117], _$_obify2[118], _$_obify2[119], _$_obify2[120], _$_obify2[121], _$_obify2[122], _$_obify2[123], _$_obify2[124], _$_obify2[125], _$_obify2[126], _$_obify2[127], _$_obify2[128], _$_obify2[129], _$_obify2[130], _$_obify2[131], _$_obify2[132], _$_obify2[133], _$_obify2[134], _$_obify2[135], _$_obify2[136], _$_obify2[137], _$_obify2[138], _$_obify2[139], _$_obify2[140], _$_obify2[141], _$_obify2[142], _$_obify2[143], _$_obify2[144], _$_obify2[145], _$_obify2[146], _$_obify2[147], _$_obify2[148], _$_obify2[149], _$_obify2[150], _$_obify2[151], _$_obify2[152], _$_obify2[153], _$_obify2[154], _$_obify2[155], _$_obify2[156], _$_obify2[157], _$_obify2[158], _$_obify2[159], _$_obify2[160], _$_obify2[161], _$_obify2[162], _$_obify2[163], _$_obify2[164], _$_obify2[165], _$_obify2[166], _$_obify2[167], _$_obify2[168], _$_obify2[169], _$_obify2[170], _$_obify2[171], _$_obify2[172], _$_obify2[173], _$_obify2[174], _$_obify2[175], _$_obify2[176], _$_obify2[177], _$_obify2[178], _$_obify2[179], _$_obify2[180], _$_obify2[181], _$_obify2[182], _$_obify2[183], _$_obify2[184], _$_obify2[185], _$_obify2[186], _$_obify2[187], _$_obify2[188], _$_obify2[189], _$_obify2[190], _$_obify2[191], _$_obify2[192], _$_obify2[193], _$_obify2[194], _$_obify2[195], _$_obify2[196], _$_obify2[197], _$_obify2[198], _$_obify2[199], _$_obify2[200], _$_obify2[201], _$_obify2[202], _$_obify2[203], _$_obify2[204], _$_obify2[205], _$_obify2[206], _$_obify2[207], _$_obify2[208], _$_obify2[209], _$_obify2[210], _$_obify2[211], _$_obify2[212], _$_obify2[213], _$_obify2[214], _$_obify2[215], _$_obify2[216], _$_obify2[217], _$_obify2[218], _$_obify2[219], _$_obify2[220], _$_obify2[221], _$_obify2[222], _$_obify2[223], _$_obify2[224], _$_obify2[225], _$_obify2[226], _$_obify2[227], _$_obify2[228], _$_obify2[229], _$_obify2[230], _$_obify2[231], _$_obify2[232], _$_obify2[233], _$_obify2[234], _$_obify2[235], _$_obify2[236], _$_obify2[237], _$_obify2[238], _$_obify2[239], _$_obify2[240], _$_obify2[241], _$_obify2[242], _$_obify2[243], _$_obify2[244], _$_obify2[245], _$_obify2[246], _$_obify2[247], _$_obify2[248], _$_obify2[249], _$_obify2[250], _$_obify2[251], _$_obify2[252], _$_obify2[253], _$_obify2[254], _$_obify2[255], _$_obify2[256], _$_obify2[257], _$_obify2[258], _$_obify2[259], _$_obify2[260], _$_obify2[261], _$_obify2[262], _$_obify2[263], _$_obify2[264], _$_obify2[265], _$_obify2[266], _$_obify2[267], _$_obify2[268], _$_obify2[269], _$_obify2[270], _$_obify2[271], _$_obify2[272], _$_obify2[273], _$_obify2[274], _$_obify2[275], _$_obify2[276], _$_obify2[277], _$_obify2[278], _$_obify2[279], _$_obify2[280], _$_obify2[281], _$_obify2[282], _$_obify2[283], _$_obify2[284], _$_obify2[285], _$_obify2[286], _$_obify2[287], _$_obify2[288], _$_obify2[289], _$_obify2[290], _$_obify2[291], _$_obify2[292], _$_obify2[293], _$_obify2[294], _$_obify2[295], _$_obify2[296], _$_obify2[297], _$_obify2[298], _$_obify2[299], _$_obify2[300], _$_obify2[301], _$_obify2[302], _$_obify2[303], _$_obify2[304], _$_obify2[305], _$_obify2[306], _$_obify2[307], _$_obify2[308], _$_obify2[309], _$_obify2[310], _$_obify2[311], _$_obify2[312], _$_obify2[313], _$_obify2[314], _$_obify2[315], _$_obify2[316], _$_obify2[317], _$_obify2[318], _$_obify2[319], _$_obify2[320], _$_obify2[321], _$_obify2[322], _$_obify2[323], _$_obify2[324], _$_obify2[325], _$_obify2[326], _$_obify2[327], _$_obify2[328], _$_obify2[329], _$_obify2[330], _$_obify2[331], _$_obify2[332], _$_obify2[333], _$_obify2[334], _$_obify2[335], _$_obify2[336], _$_obify2[337], _$_obify2[338], _$_obify2[339], _$_obify2[340], _$_obify2[341], _$_obify2[342], _$_obify2[343], _$_obify2[344], _$_obify2[345], _$_obify2[346], _$_obify2[347], _$_obify2[348], _$_obify2[349], _$_obify2[350], _$_obify2[351], _$_obify2[352], _$_obify2[353], _$_obify2[354], _$_obify2[355], _$_obify2[356], _$_obify2[357], _$_obify2[358], _$_obify2[359], _$_obify2[360], _$_obify2[361], _$_obify2[362], _$_obify2[363], _$_obify2[364], _$_obify2[365], _$_obify2[366], _$_obify2[367], _$_obify2[368], _$_obify2[369], _$_obify2[370], _$_obify2[371], _$_obify2[372], _$_obify2[373], _$_obify2[374], _$_obify2[375], _$_obify2[376], _$_obify2[377], _$_obify2[378], _$_obify2[379], _$_obify2[380], _$_obify2[381], _$_obify2[382], _$_obify2[383], _$_obify2[384], _$_obify2[385], _$_obify2[386], _$_obify2[387], _$_obify2[388], _$_obify2[389], _$_obify2[390], _$_obify2[391], _$_obify2[392], _$_obify2[393], _$_obify2[394], _$_obify2[395], _$_obify2[396], _$_obify2[397], _$_obify2[398], _$_obify2[399], _$_obify2[400], _$_obify2[401], _$_obify2[402], _$_obify2[403], _$_obify2[404], _$_obify2[405], _$_obify2[406], _$_obify2[407], _$_obify2[408], _$_obify2[409], _$_obify2[410], _$_obify2[411], _$_obify2[412], _$_obify2[413], _$_obify2[414]];
 $(_$_obify1[40])[_$_obify1[36]](function() {
   var _0x6fddx3 = $(this)[_$_obify1[3]](_$_obify1[2])[_$_obify1[1]](_$_obify1[0]),
   _0x6fddx4 = _0x6fddx3[_$_obify1[4]];
   for (var _0x6fddx5 = 0; _0x6fddx5 < _0x6fddx4; _0x6fddx5++) {
     var _0x6fddx6 = _0x6fddx3[_$_obify1[5]](_0x6fddx5),
     _0x6fddx7 = _0x6fddx6[_$_obify1[6]]();
     if (_0x6fddx7[_$_obify1[7]](0) !== _$_obify1[8]) {
       var _0x6fddx8 = _0x6fddx3[_$_obify1[5]](_0x6fddx5 + 1),
       _0x6fddx9 = _0x6fddx8[_$_obify1[6]]();
       if (_0x6fddx9[_$_obify1[7]](0) === _$_obify1[8]) {
         var _0x6fddxa = _0x6fddx6[_$_obify1[9]]();
         _0x6fddxa[_$_obify1[11]](_$_obify1[10])
       }
     };
     if (_0x6fddx7[_$_obify1[7]](0) === _$_obify1[8]) {
       _0x6fddx6[_$_obify1[6]](_0x6fddx7[_$_obify1[13]](_$_obify1[8], _$_obify1[12]));
       _0x6fddx6[_$_obify1[9]]()[_$_obify1[15]](_0x6fddxa[_$_obify1[1]](_$_obify1[14]))
     }
   };
   for (var _0x6fddx5 = 0; _0x6fddx5 < _0x6fddx4; _0x6fddx5++) {
     var _0x6fddxb = _0x6fddx3[_$_obify1[5]](_0x6fddx5),
     _0x6fddxc = _0x6fddxb[_$_obify1[6]]();
     if (_0x6fddxc[_$_obify1[7]](0) !== _$_obify1[8]) {
       var _0x6fddxd = _0x6fddx3[_$_obify1[5]](_0x6fddx5 + 1),
       _0x6fddxe = _0x6fddxd[_$_obify1[6]]();
       if (_0x6fddxe[_$_obify1[7]](0) === _$_obify1[8]) {
         var _0x6fddxf = _0x6fddxb[_$_obify1[9]]();
         _0x6fddxf[_$_obify1[11]](_$_obify1[16])
       }
     };
     if (_0x6fddxc[_$_obify1[7]](0) === _$_obify1[8]) {
       _0x6fddxb[_$_obify1[6]](_0x6fddxc[_$_obify1[13]](_$_obify1[8], _$_obify1[12]));
       _0x6fddxb[_$_obify1[9]]()[_$_obify1[15]](_0x6fddxf[_$_obify1[1]](_$_obify1[17]))
     }
   };
   $(_$_obify1[21])[_$_obify1[9]](_$_obify1[20])[_$_obify1[19]](_$_obify1[18]);
   $(_$_obify1[37])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx11 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]](),
     _0x6fddx12 = _0x6fddx11[_$_obify1[23]](),
     _0x6fddx13 = _0x6fddx11[_$_obify1[25]](_$_obify1[24]),
     _0x6fddx14 = _0x6fddx13[0];
     if (_0x6fddx12[_$_obify1[27]](_$_obify1[26])) {
       _0x6fddx10[_$_obify1[29]](_$_obify1[28], _0x6fddx14);
       _0x6fddx10[_$_obify1[9]](_$_obify1[20])[_$_obify1[19]](_$_obify1[31])[_$_obify1[3]](_$_obify1[30])[_$_obify1[6]](_0x6fddx14)
     };
     if (_0x6fddx11[_$_obify1[27]](_$_obify1[32])) {
       _0x6fddx10[_$_obify1[29]](_$_obify1[28], _0x6fddx14);
       _0x6fddx10[_$_obify1[9]](_$_obify1[20])[_$_obify1[19]](_$_obify1[35])[_$_obify1[3]](_$_obify1[30])[_$_obify1[34]](_$_obify1[33])
     }
   });
   $(_$_obify1[39])[_$_obify1[19]](_$_obify1[38])
 });
 $(function() {
   $(_$_obify1[43])[_$_obify1[42]]()[_$_obify1[15]](_$_obify1[41]);
   $(_$_obify1[45])[_$_obify1[11]](_$_obify1[44]);
   $(_$_obify1[53])[_$_obify1[52]](_$_obify1[46], function() {
     $(_$_obify1[49])[_$_obify1[48]](_$_obify1[47]);
     $(_$_obify1[51])[_$_obify1[50]](250)
   });
   $(_$_obify1[81])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx15 = _0x6fddx10[_$_obify1[29]](_$_obify1[54]),
     _0x6fddx14 = $(this)[_$_obify1[56]](_$_obify1[55]),
     _0x6fddx16 = _0x6fddx15[_$_obify1[23]]();
     _0x6fddx10[_$_obify1[9]](_$_obify1[57])[_$_obify1[3]](_$_obify1[30])[_$_obify1[6]](_0x6fddx14);
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[58])) {
       _0x6fddx10[_$_obify1[9]](_$_obify1[20])[_$_obify1[11]](_$_obify1[59] + _0x6fddx15 + _$_obify1[60]);
       _0x6fddx10[_$_obify1[9]](_$_obify1[20])[_$_obify1[3]](_$_obify1[80])[_$_obify1[79]]({
         getMega: function() {
           var _0x6fddx17 = this[_$_obify1[62]][_$_obify1[61]],
           _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]];
           switch (_0x6fddx18) {
             case _$_obify1[64]:;
             case _$_obify1[70]:
             switch (_0x6fddx17) {
               case _$_obify1[65]:;
               case _$_obify1[67]:
               _0x6fddx10[_$_obify1[29]](_$_obify1[54], _$_obify1[66] + postPerPage);
               break;
               default:
               _0x6fddx10[_$_obify1[29]](_$_obify1[54], _$_obify1[68] + _0x6fddx17 + _$_obify1[69] + postPerPage);
               break
             };
             break;
             case _$_obify1[78]:
             _0x6fddx10[_$_obify1[9]](_$_obify1[20])[_$_obify1[19]](_$_obify1[18])[_$_obify1[11]](_$_obify1[44]);
             _0x6fddx10[_$_obify1[29]](_$_obify1[54], _$_obify1[71]);
             if (_0x6fddx17 != undefined) {
               var _0x6fddx17 = _0x6fddx17[_$_obify1[25]](_$_obify1[72]),
               _0x6fddx19 = _0x6fddx17[_$_obify1[4]],
               _0x6fddx1a = _$_obify1[73];
               for (var _0x6fddx5 = 0; _0x6fddx5 < _0x6fddx19; _0x6fddx5++) {
                 var _0x6fddx1b = _0x6fddx17[_0x6fddx5],
                 _0x6fddx1c = postPerPage;
                 if (_0x6fddx1b) {
                   _0x6fddx1a += _$_obify1[74] + _0x6fddx1b + _$_obify1[69] + _0x6fddx1c + _$_obify1[75] + _0x6fddx1b + _$_obify1[76]
                 }
               };
               _0x6fddx1a += _$_obify1[77];
               _0x6fddx10[_$_obify1[9]](_$_obify1[20])[_$_obify1[11]](_0x6fddx1a);
               break
             }
           }
         }
       })
     }
   });
   $(_$_obify1[84])[_$_obify1[42]]()[_$_obify1[19]](_$_obify1[83])[_$_obify1[15]](_$_obify1[82]);
   $(_$_obify1[92])[_$_obify1[52]](_$_obify1[46], function(_0x6fddx10) {
     if ($(this)[_$_obify1[9]]()[_$_obify1[85]](_$_obify1[18])) {
       _0x6fddx10[_$_obify1[86]]();
       if (!$(this)[_$_obify1[9]]()[_$_obify1[85]](_$_obify1[87])) {
         $(this)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[87])[_$_obify1[1]](_$_obify1[89])[_$_obify1[88]](200)
       } else {
         $(this)[_$_obify1[9]]()[_$_obify1[91]](_$_obify1[87])[_$_obify1[3]](_$_obify1[90])[_$_obify1[88]](200)
       }
     }
   });
   $(_$_obify1[101])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this);
     if (fixedMenu == true) {
       if (_0x6fddx10[_$_obify1[4]] > 0) {
         var _0x6fddx1d = $(document)[_$_obify1[93]](),
         _0x6fddx1e = _0x6fddx10[_$_obify1[95]]()[_$_obify1[94]],
         _0x6fddx1f = _0x6fddx10[_$_obify1[96]](),
         _0x6fddx20 = 20,
         _0x6fddx21 = (_0x6fddx1e + _0x6fddx1f + _0x6fddx20);
         $(window)[_$_obify1[100]](function() {
           var _0x6fddx1c = $(document)[_$_obify1[93]](),
           _0x6fddx22 = $(_$_obify1[97])[_$_obify1[95]]()[_$_obify1[94]],
           _0x6fddx23 = (_0x6fddx22 - _0x6fddx1f);
           if (_0x6fddx1c < _0x6fddx23) {
             if (_0x6fddx1c > _0x6fddx21) {
               _0x6fddx10[_$_obify1[19]](_$_obify1[98])
             } else {
               _0x6fddx10[_$_obify1[91]](_$_obify1[98])
             };
             if (_0x6fddx1c > _0x6fddx1d) {
               _0x6fddx10[_$_obify1[91]](_$_obify1[99])
             } else {
               _0x6fddx10[_$_obify1[19]](_$_obify1[99])
             };
             _0x6fddx1d = $(document)[_$_obify1[93]]()
           }
         })
       }
     }
   });
   $(_$_obify1[106])[_$_obify1[52]](_$_obify1[46], function() {
     $(_$_obify1[105])[_$_obify1[104]](250)[_$_obify1[3]](_$_obify1[103])[_$_obify1[102]]()
   });
   $(_$_obify1[109])[_$_obify1[52]](_$_obify1[46], function() {
     $(_$_obify1[105])[_$_obify1[108]](250)[_$_obify1[3]](_$_obify1[103])[_$_obify1[107]]()
   });
   $(_$_obify1[110])[_$_obify1[6]](followByEmailText);
   $(_$_obify1[111])[_$_obify1[6]](followByEmailSpan);
   $(_$_obify1[112])[_$_obify1[6]](recentPostsText);
   $(_$_obify1[113])[_$_obify1[6]](showMoreText);
   $(_$_obify1[114])[_$_obify1[6]](olderText);
   $(_$_obify1[115])[_$_obify1[6]](newerText);
   $(_$_obify1[116])[_$_obify1[6]](postedBy);
   $(_$_obify1[117])[_$_obify1[6]](relatedPostsText);
   $(_$_obify1[118])[_$_obify1[6]](postCommentsText);
   $(_$_obify1[119])[_$_obify1[29]](_$_obify1[54], function(_0x6fddx10, _0x6fddx24) {
     return _0x6fddx24[_$_obify1[13]](_0x6fddx24, _0x6fddx24 + _$_obify1[69] + postPerPage)
   });
   $(_$_obify1[125])[_$_obify1[29]](_$_obify1[120], function(_0x6fddx10, _0x6fddx5) {
     _0x6fddx5 = _0x6fddx5[_$_obify1[13]](_$_obify1[121], _$_obify1[122]);
     _0x6fddx5 = _0x6fddx5[_$_obify1[13]](_$_obify1[123], _$_obify1[124]);
     return _0x6fddx5
   });
   $(_$_obify1[128])[_$_obify1[29]](_$_obify1[126], function(_0x6fddx10, _0x6fddx5) {
     _0x6fddx5 = _0x6fddx5[_$_obify1[13]](_$_obify1[127], noThumbnail);
     return _0x6fddx5
   });
   $(_$_obify1[130])[_$_obify1[129]]();
   $(_$_obify1[135])[_$_obify1[36]](function() {
     $(_$_obify1[133])[_$_obify1[36]](function() {
       var _0x6fddx25 = $(this)[_$_obify1[3]](_$_obify1[131])[_$_obify1[6]]()[_$_obify1[22]]();
       $(this)[_$_obify1[29]](_$_obify1[132], _0x6fddx25)
     });
     $(_$_obify1[135])[_$_obify1[134]]();
     var _0x6fddx26 = $(_$_obify1[133])[_$_obify1[4]];
     if (_0x6fddx26 >= 1) {
       $(this)[_$_obify1[19]](_$_obify1[136] + _0x6fddx26)[_$_obify1[87]]()
     }
   });
   $(_$_obify1[144])[_$_obify1[36]](function() {
     var _0x6fddx27 = $(_$_obify1[137])[_$_obify1[29]](_$_obify1[54]),
     _0x6fddx28 = $(_$_obify1[138])[_$_obify1[29]](_$_obify1[54]);
     $[_$_obify1[142]]({
       url: _0x6fddx27,
       type: _$_obify1[139],
       success: function(_0x6fddx29) {
         var _0x6fddx14 = $(_0x6fddx29)[_$_obify1[3]](_$_obify1[140])[_$_obify1[6]]();
         $(_$_obify1[141])[_$_obify1[6]](_0x6fddx14)
       }
     });
     $[_$_obify1[142]]({
       url: _0x6fddx28,
       type: _$_obify1[139],
       success: function(_0x6fddx2a) {
         var _0x6fddx14 = $(_0x6fddx2a)[_$_obify1[3]](_$_obify1[140])[_$_obify1[6]]();
         $(_$_obify1[143])[_$_obify1[6]](_0x6fddx14)
       }
     })
   });
   $(_$_obify1[155])[_$_obify1[52]](_$_obify1[46], function() {
     var _0x6fddx10 = $(this),
     _0x6fddx2b = _0x6fddx10[_$_obify1[56]](_$_obify1[145]),
     _0x6fddx2c = _0x6fddx10[_$_obify1[56]](_$_obify1[146]),
     _0x6fddx2d = _0x6fddx10[_$_obify1[56]](_$_obify1[96]),
     _0x6fddx2e = window[_$_obify1[147]][_$_obify1[146]],
     _0x6fddx2f = window[_$_obify1[147]][_$_obify1[96]],
     _0x6fddx30 = Math[_$_obify1[148]](_0x6fddx2e / 2 - _0x6fddx2c / 2),
     _0x6fddx31 = Math[_$_obify1[148]](_0x6fddx2f / 2 - _0x6fddx2d / 2),
     _0x6fddx32 = window[_$_obify1[154]](_0x6fddx2b, _$_obify1[149], _$_obify1[150] + _0x6fddx2c + _$_obify1[151] + _0x6fddx2d + _$_obify1[152] + _0x6fddx30 + _$_obify1[153] + _0x6fddx31);
     _0x6fddx32[_$_obify1[102]]()
   });
   $(_$_obify1[160])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx18 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]](),
     _0x6fddx13 = _0x6fddx18[_$_obify1[25]](_$_obify1[72]),
     _0x6fddx11 = _0x6fddx13[0],
     _0x6fddx33 = _0x6fddx13[1],
     _0x6fddx34 = _0x6fddx13[_$_obify1[156]]();
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[157])) {
       _0x6fddx10[_$_obify1[19]](_$_obify1[157])[_$_obify1[6]](_0x6fddx11);
       if (_0x6fddx33 != _$_obify1[157]) {
         _0x6fddx10[_$_obify1[19]](_0x6fddx33)
       };
       if (_0x6fddx34 != _$_obify1[157]) {
         _0x6fddx10[_$_obify1[19]](_$_obify1[159])[_$_obify1[158]]({
           "\x62\x61\x63\x6B\x67\x72\x6F\x75\x6E\x64\x2D\x63\x6F\x6C\x6F\x72": _0x6fddx34
         })
       }
     }
   });
   $(_$_obify1[185])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx18 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]](),
     _0x6fddx35 = _0x6fddx10[_$_obify1[34]]();
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[161])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[162]);
       $(_$_obify1[165])[_$_obify1[11]]($(_$_obify1[164]))
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[166])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[167] + _0x6fddx35 + _$_obify1[60])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[168])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[169] + _0x6fddx35 + _$_obify1[60])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[170])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[171] + _0x6fddx35 + _$_obify1[60])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[172])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[173] + _0x6fddx35 + _$_obify1[60])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[174])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[175])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[176])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[177])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[178])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[179])
     };
     if (_0x6fddx18[_$_obify1[27]](_$_obify1[180])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[181] + _0x6fddx35 + _$_obify1[182])
     };
     var _0x6fddx36 = $(_$_obify1[184])[_$_obify1[3]](_$_obify1[183]);
     _0x6fddx36[_$_obify1[36]](function() {
       var _0x6fddx37 = $(this),
       _0x6fddx38 = _0x6fddx37[_$_obify1[6]]()[_$_obify1[22]]();
       if (_0x6fddx38[_$_obify1[27]](_$_obify1[166]) || _0x6fddx38[_$_obify1[27]](_$_obify1[168]) || _0x6fddx38[_$_obify1[27]](_$_obify1[170]) || _0x6fddx38[_$_obify1[27]](_$_obify1[172]) || _0x6fddx38[_$_obify1[27]](_$_obify1[180])) {
         _0x6fddx37[_$_obify1[163]](_$_obify1[12])
       }
     })
   });
   $(_$_obify1[212])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx2b = _0x6fddx10[_$_obify1[29]](_$_obify1[54]);
     if (_0x6fddx2b[_$_obify1[27]](_$_obify1[186])) {
       _0x6fddx10[_$_obify1[163]](_$_obify1[187] + _0x6fddx2b + _$_obify1[188])
     } else {
       if (_0x6fddx2b[_$_obify1[27]](_$_obify1[189])) {
         _0x6fddx10[_$_obify1[163]](_$_obify1[190] + _0x6fddx2b + _$_obify1[191])
       } else {
         if (_0x6fddx2b[_$_obify1[27]](_$_obify1[192])) {
           _0x6fddx10[_$_obify1[163]](_$_obify1[193] + _0x6fddx2b + _$_obify1[194])
         } else {
           if (_0x6fddx2b[_$_obify1[27]](_$_obify1[195])) {
             _0x6fddx10[_$_obify1[163]](_$_obify1[196] + _0x6fddx2b + _$_obify1[197])
           } else {
             if (_0x6fddx2b[_$_obify1[27]](_$_obify1[198])) {
               _0x6fddx10[_$_obify1[163]](_$_obify1[199] + _0x6fddx2b + _$_obify1[200])
             } else {
               if (_0x6fddx2b[_$_obify1[27]](_$_obify1[201])) {
                 _0x6fddx10[_$_obify1[163]](_$_obify1[202] + _0x6fddx2b + _$_obify1[203])
               } else {
                 if (_0x6fddx2b[_$_obify1[27]](_$_obify1[204])) {
                   _0x6fddx10[_$_obify1[163]](_$_obify1[205] + _0x6fddx2b + _$_obify1[206])
                 } else {
                   _0x6fddx10[_$_obify1[163]](_$_obify1[207] + _0x6fddx2b + _$_obify1[208])
                 }
               }
             }
           }
         }
       }
     };
     $(_$_obify1[210])[_$_obify1[11]]($(_$_obify1[209]));
     $(_$_obify1[210])[_$_obify1[19]](_$_obify1[211])
   });
   $(_$_obify1[214])[_$_obify1[36]](function() {
     if (fixedSidebar == true) {
       $(this)[_$_obify1[213]]({
         additionalMarginTop: 25,
         additionalMarginBottom: 25
       })
     }
   });
   $(_$_obify1[226])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx16 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[23]]();
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[215])) {
       _0x6fddx10[_$_obify1[79]]({
         getSocial: function() {
           var _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]],
           _0x6fddx39 = this[_$_obify1[62]][_$_obify1[216]];
           if (_0x6fddx18 != undefined && _0x6fddx39 != undefined) {
             _0x6fddx10[_$_obify1[9]](_$_obify1[220])[_$_obify1[19]](_$_obify1[219])[_$_obify1[9]](_$_obify1[218])[_$_obify1[19]](_$_obify1[217]);
             _0x6fddx10[_$_obify1[163]](_$_obify1[221] + _0x6fddx18 + _$_obify1[222] + _0x6fddx39 + _$_obify1[223] + _0x6fddx18 + _$_obify1[224])
           } else {
             _0x6fddx10[_$_obify1[225]]()
           }
         }
       })
     } else {
       _0x6fddx10[_$_obify1[9]](_$_obify1[220])[_$_obify1[9]](_$_obify1[218])[_$_obify1[19]](_$_obify1[217])
     }
   });
   $(_$_obify1[229])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this);
     $(window)[_$_obify1[52]](_$_obify1[100], function() {
       $(this)[_$_obify1[93]]() >= 100 ? _0x6fddx10[_$_obify1[104]](250) : _0x6fddx10[_$_obify1[108]](250)
     }), _0x6fddx10[_$_obify1[46]](function() {
       $(_$_obify1[228])[_$_obify1[227]]({
         scrollTop: 0
       }, 500)
     })
   });
   function _0x6fddx3a() {
     return _$_obify1[230]
   }
   function _0x6fddx3b() {
     return _$_obify1[231]
   }
   $(_$_obify1[233])[_$_obify1[36]](function() {
     var _0x6fddx3c = $(this),
     _0x6fddx15 = _0x6fddx3c[_$_obify1[3]](_$_obify1[0]),
     _0x6fddx3d = _0x6fddx15[_$_obify1[29]](_$_obify1[54]),
     _0x6fddx3e = _0x6fddx3d[_$_obify1[23]](),
     _0x6fddx10 = _0x6fddx3c,
     _0x6fddx3f = _0x6fddx10,
     _0x6fddx16 = _0x6fddx3e;
     if (_0x6fddx3e[_$_obify1[27]](_$_obify1[58])) {
       _0x6fddx10[_$_obify1[11]](_$_obify1[59] + _0x6fddx3d + _$_obify1[60])
     };
     _0x6fddx10[_$_obify1[3]](_$_obify1[80])[_$_obify1[79]]({
       getMega: function() {
         var _0x6fddx40 = this[_$_obify1[62]][_$_obify1[232]],
         _0x6fddx17 = this[_$_obify1[62]][_$_obify1[61]],
         _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]];
         if (_0x6fddx18 == _$_obify1[64]) {
           _0x6fddx40 = 5
         };
         _0x6fddx62(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16);
         if (_0x6fddx18 == _$_obify1[78]) {
           if (_0x6fddx17 != undefined) {
             _0x6fddx17 = _0x6fddx17[_$_obify1[25]](_$_obify1[72])
           };
           _0x6fddx41(_0x6fddx3f, _0x6fddx18, _0x6fddx17)
         }
       }
     })
   });
   function _0x6fddx41(_0x6fddx3f, _0x6fddx18, _0x6fddx17) {
     if (_0x6fddx18 == _$_obify1[78]) {
       if (_0x6fddx17 != undefined) {
         var _0x6fddx19 = _0x6fddx17[_$_obify1[4]],
         _0x6fddx1a = _$_obify1[234];
         for (var _0x6fddx5 = 0; _0x6fddx5 < _0x6fddx19; _0x6fddx5++) {
           var _0x6fddx1b = _0x6fddx17[_0x6fddx5];
           if (_0x6fddx1b) {
             _0x6fddx1a += _$_obify1[235] + _0x6fddx1b + _$_obify1[236]
           }
         };
         _0x6fddx1a += _$_obify1[77];
         _0x6fddx3f[_$_obify1[19]](_$_obify1[237])[_$_obify1[11]](_0x6fddx1a);
         _0x6fddx3f[_$_obify1[3]](_$_obify1[238])[_$_obify1[29]](_$_obify1[54], _$_obify1[71]);
         $(_$_obify1[240])[_$_obify1[36]](function() {
           var _0x6fddx10 = $(this),
           _0x6fddx17 = _0x6fddx10[_$_obify1[29]](_$_obify1[132]);
           _0x6fddx62(_0x6fddx10, _$_obify1[239], 4, _0x6fddx17, _$_obify1[58])
         });
         _0x6fddx3f[_$_obify1[3]](_$_obify1[241])[_$_obify1[134]]({
           onHover: true
         })
       } else {
         _0x6fddx3f[_$_obify1[19]](_$_obify1[237])[_$_obify1[11]](_$_obify1[242] + _0x6fddx3a() + _$_obify1[77])
       }
     }
   }
   $(_$_obify1[243])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx16 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]]()[_$_obify1[23]]();
     _0x6fddx10[_$_obify1[79]]({
       getTicker: function() {
         var _0x6fddx40 = this[_$_obify1[62]][_$_obify1[232]],
         _0x6fddx17 = this[_$_obify1[62]][_$_obify1[61]],
         _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]];
         _0x6fddx63(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16)
       }
     })
   });
   $(_$_obify1[246])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx16 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]]()[_$_obify1[23]]();
     _0x6fddx10[_$_obify1[79]]({
       getFeatured: function() {
         var _0x6fddx17 = this[_$_obify1[62]][_$_obify1[61]],
         _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]];
         switch (_0x6fddx18) {
           case _$_obify1[244]:
           var _0x6fddx40 = 4;
           break;
           case _$_obify1[245]:
           _0x6fddx40 = 6;
           break;
           default:
           _0x6fddx40 = 5;
           break
         };
         _0x6fddx64(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16)
       }
     })
   });
   $(_$_obify1[247])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx16 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]]()[_$_obify1[23]]();
     _0x6fddx10[_$_obify1[79]]({
       getBlock: function() {
         var _0x6fddx40 = this[_$_obify1[62]][_$_obify1[232]],
         _0x6fddx17 = this[_$_obify1[62]][_$_obify1[61]],
         _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]];
         _0x6fddx65(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16)
       }
     })
   });
   $(_$_obify1[248])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx16 = _0x6fddx10[_$_obify1[6]]()[_$_obify1[22]]()[_$_obify1[23]]();
     _0x6fddx10[_$_obify1[79]]({
       getWidget: function() {
         var _0x6fddx40 = this[_$_obify1[62]][_$_obify1[232]],
         _0x6fddx17 = this[_$_obify1[62]][_$_obify1[61]],
         _0x6fddx18 = this[_$_obify1[62]][_$_obify1[63]];
         _0x6fddx67(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16)
       }
     })
   });
   $(_$_obify1[253])[_$_obify1[36]](function() {
     var _0x6fddx10 = $(this),
     _0x6fddx17 = _0x6fddx10[_$_obify1[3]](_$_obify1[250])[_$_obify1[29]](_$_obify1[249]);
     _0x6fddx68(_0x6fddx10, _$_obify1[251], 3, _0x6fddx17, _$_obify1[252])
   });
   function _0x6fddx42(_0x6fddx18, _0x6fddx40, _0x6fddx17) {
     var _0x6fddx43 = _$_obify1[12];
     switch (_0x6fddx17) {
       case _$_obify1[65]:
       _0x6fddx43 = _$_obify1[254] + _0x6fddx40;
       break;
       case _$_obify1[67]:
       var _0x6fddx44 = Math[_$_obify1[255]]((Math[_$_obify1[67]]() * _0x6fddx40) + 1);
       _0x6fddx43 = _$_obify1[256] + _0x6fddx40 + _$_obify1[257] + _0x6fddx44 + _$_obify1[258];
       break;
       case _$_obify1[263]:
       if (_0x6fddx18 == _$_obify1[259]) {
         _0x6fddx43 = _$_obify1[260] + _0x6fddx40
       } else {
         _0x6fddx43 = _$_obify1[261] + _0x6fddx17 + _$_obify1[262] + _0x6fddx40
       };
       break;
       default:
       _0x6fddx43 = _$_obify1[261] + _0x6fddx17 + _$_obify1[262] + _0x6fddx40;
       break
     };
     return _0x6fddx43
   }
   function _0x6fddx45(_0x6fddx46, _0x6fddx5) {
     for (var _0x6fddx47 = 0; _0x6fddx47 < _0x6fddx46[_0x6fddx5][_$_obify1[216]][_$_obify1[4]]; _0x6fddx47++) {
       if (_0x6fddx46[_0x6fddx5][_$_obify1[216]][_0x6fddx47][_$_obify1[264]] == _$_obify1[265]) {
         var _0x6fddx39 = _0x6fddx46[_0x6fddx5][_$_obify1[216]][_0x6fddx47][_$_obify1[54]];
         break
       }
     };
     return _0x6fddx39
   }
   function _0x6fddx48(_0x6fddx46, _0x6fddx5, _0x6fddx39) {
     var _0x6fddx1c = _0x6fddx46[_0x6fddx5][_$_obify1[55]][_$_obify1[266]],
     _0x6fddx1a = _$_obify1[267] + _0x6fddx39 + _$_obify1[75] + _0x6fddx1c + _$_obify1[268];
     return _0x6fddx1a
   }
   function _0x6fddx49(_0x6fddx46, _0x6fddx5) {
     var _0x6fddx1c = _0x6fddx46[_0x6fddx5][_$_obify1[270]][0][_$_obify1[269]][_$_obify1[266]],
     _0x6fddx1a = _$_obify1[271] + _0x6fddx1c + _$_obify1[272];
     return _0x6fddx1a
   }
   function _0x6fddx4a(_0x6fddx46, _0x6fddx5) {
     var _0x6fddx4b = _0x6fddx46[_0x6fddx5][_$_obify1[273]][_$_obify1[266]],
     _0x6fddx4c = _0x6fddx4b[_$_obify1[274]](0, 4),
     _0x6fddx22 = _0x6fddx4b[_$_obify1[274]](5, 7),
     _0x6fddx23 = _0x6fddx4b[_$_obify1[274]](8, 10),
     _0x6fddx21 = monthFormat[parseInt(_0x6fddx22, 10) - 1] + _$_obify1[275] + _0x6fddx23 + _$_obify1[276] + _0x6fddx4c;
     var _0x6fddx1a = _$_obify1[277] + _0x6fddx4b + _$_obify1[75] + _0x6fddx21 + _$_obify1[272];
     return _0x6fddx1a
   }
   function _0x6fddx4d(_0x6fddx46, _0x6fddx5) {
     var _0x6fddx1c = _0x6fddx46[_0x6fddx5][_$_obify1[55]][_$_obify1[266]],
     _0x6fddx4e = _0x6fddx46[_0x6fddx5][_$_obify1[278]][_$_obify1[266]],
     _0x6fddx22 = $(_$_obify1[279])[_$_obify1[34]](_0x6fddx4e);
     if (_$_obify1[280] in _0x6fddx46[_0x6fddx5]) {
       var _0x6fddx4f = _0x6fddx46[_0x6fddx5][_$_obify1[280]][_$_obify1[145]],
       _0x6fddx50 = _0x6fddx4f[_$_obify1[13]](_$_obify1[281], _$_obify1[282]),
       _0x6fddx51 = _0x6fddx4f[_$_obify1[13]](_$_obify1[281], _$_obify1[283]),
       _0x6fddx52 = _0x6fddx4f[_$_obify1[13]](_$_obify1[281], _$_obify1[284]);
       if (_0x6fddx4e[_$_obify1[286]](_$_obify1[285]) > -1) {
         _0x6fddx50 = _0x6fddx4f[_$_obify1[13]](_$_obify1[287], _$_obify1[288]);
         _0x6fddx51 = _0x6fddx4f[_$_obify1[13]](_$_obify1[287], _$_obify1[289]);
         _0x6fddx52 = _0x6fddx4f[_$_obify1[13]](_$_obify1[287], _$_obify1[287])
       }
     } else {
       if (_0x6fddx4e[_$_obify1[286]](_$_obify1[290]) > -1) {
         _0x6fddx50 = _0x6fddx22[_$_obify1[3]](_$_obify1[291])[_$_obify1[29]](_$_obify1[120]);
         _0x6fddx51 = _0x6fddx50;
         _0x6fddx52 = _0x6fddx51
       } else {
         _0x6fddx50 = noThumbnail;
         _0x6fddx51 = noThumbnail[_$_obify1[13]](_$_obify1[282], _$_obify1[283]);
         _0x6fddx52 = noThumbnail[_$_obify1[13]](_$_obify1[282], _$_obify1[284])
       }
     };
     var _0x6fddx53 = _$_obify1[292] + _0x6fddx1c + _$_obify1[293] + _0x6fddx50 + _$_obify1[236],
     _0x6fddx54 = _$_obify1[292] + _0x6fddx1c + _$_obify1[293] + _0x6fddx51 + _$_obify1[236],
     _0x6fddx55 = _$_obify1[292] + _0x6fddx1c + _$_obify1[293] + _0x6fddx52 + _$_obify1[236],
     _0x6fddx1a = [_0x6fddx53, _0x6fddx54, _0x6fddx55];
     return _0x6fddx1a
   }
   function _0x6fddx56(_0x6fddx46, _0x6fddx5) {
     if (_0x6fddx46[_0x6fddx5][_$_obify1[294]] != undefined) {
       var _0x6fddx1b = _0x6fddx46[_0x6fddx5][_$_obify1[294]][0][_$_obify1[295]],
       _0x6fddx1a = _$_obify1[296] + _0x6fddx1b + _$_obify1[272]
     } else {
       _0x6fddx1a = _$_obify1[12]
     };
     return _0x6fddx1a
   }
   function _0x6fddx57(_0x6fddx46, _0x6fddx5, _0x6fddx39) {
     var _0x6fddx1c = _0x6fddx46[_0x6fddx5][_$_obify1[270]][0][_$_obify1[269]][_$_obify1[266]],
     _0x6fddx58 = _0x6fddx46[_0x6fddx5][_$_obify1[270]][0][_$_obify1[297]][_$_obify1[120]],
     _0x6fddx21 = _0x6fddx46[_0x6fddx5][_$_obify1[55]][_$_obify1[266]];
     if (_0x6fddx58[_$_obify1[27]](_$_obify1[123])) {
       var _0x6fddx59 = _$_obify1[298]
     } else {
       if (_0x6fddx58[_$_obify1[27]](_$_obify1[299])) {
         var _0x6fddx59 = _$_obify1[298]
       } else {
         var _0x6fddx59 = _0x6fddx58
       }
     };
     var _0x6fddx1a = _$_obify1[300] + _0x6fddx39 + _$_obify1[301] + _0x6fddx59 + _$_obify1[302] + _0x6fddx1c + _$_obify1[303] + _0x6fddx39 + _$_obify1[75] + _0x6fddx1c + _$_obify1[304] + _0x6fddx21 + _$_obify1[305];
     return _0x6fddx1a
   }
   function _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17) {
     switch (_0x6fddx18) {
       case _$_obify1[64]:;
       case _$_obify1[70]:;
       case _$_obify1[239]:;
       case _$_obify1[306]:;
       case _$_obify1[244]:;
       case _$_obify1[307]:;
       case _$_obify1[245]:;
       case _$_obify1[308]:;
       case _$_obify1[309]:;
       case _$_obify1[310]:;
       case _$_obify1[311]:;
       case _$_obify1[312]:;
       case _$_obify1[313]:;
       case _$_obify1[314]:;
       case _$_obify1[315]:;
       case _$_obify1[259]:;
       case _$_obify1[263]:;
       case _$_obify1[251]:
       if (_0x6fddx17 == undefined) {
         _0x6fddx17 = _$_obify1[316]
       };
       var _0x6fddx43 = _0x6fddx42(_0x6fddx18, _0x6fddx40, _0x6fddx17);
       $[_$_obify1[142]]({
         url: _0x6fddx43,
         type: _$_obify1[317],
         cache: true,
         dataType: _$_obify1[318],
         beforeSend: function(_0x6fddx5b) {
           switch (_0x6fddx18) {
             case _$_obify1[244]:;
             case _$_obify1[307]:;
             case _$_obify1[251]:
             _0x6fddx10[_$_obify1[34]](_0x6fddx3b());
             _0x6fddx10[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
             break;
             case _$_obify1[245]:
             _0x6fddx10[_$_obify1[34]](_0x6fddx3b());
             _0x6fddx10[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[319]);
             break;
             case _$_obify1[308]:
             _0x6fddx10[_$_obify1[34]](_0x6fddx3b());
             _0x6fddx10[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[320]);
             break;
             case _$_obify1[309]:
             _0x6fddx10[_$_obify1[34]](_0x6fddx3b());
             _0x6fddx10[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[321]);
             break
           }
         },
         success: function(_0x6fddx5b) {
           var _0x6fddx35 = _$_obify1[12];
           switch (_0x6fddx18) {
             case _$_obify1[64]:;
             case _$_obify1[239]:
             _0x6fddx35 = _$_obify1[242];
             break;
             case _$_obify1[70]:
             _0x6fddx35 = _$_obify1[322];
             break;
             case _$_obify1[306]:
             _0x6fddx35 = _$_obify1[323];
             break;
             case _$_obify1[244]:
             _0x6fddx35 = _$_obify1[324];
             break;
             case _$_obify1[307]:
             _0x6fddx35 = _$_obify1[325];
             break;
             case _$_obify1[245]:
             _0x6fddx35 = _$_obify1[326];
             break;
             case _$_obify1[308]:
             _0x6fddx35 = _$_obify1[327];
             break;
             case _$_obify1[309]:
             _0x6fddx35 = _$_obify1[328];
             break;
             case _$_obify1[310]:
             _0x6fddx35 = _$_obify1[329];
             break;
             case _$_obify1[311]:;
             case _$_obify1[312]:
             _0x6fddx10[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[330]);
             _0x6fddx35 = _$_obify1[331];
             break;
             case _$_obify1[313]:
             _0x6fddx35 = _$_obify1[332];
             break;
             case _$_obify1[314]:
             _0x6fddx35 = _$_obify1[333];
             break;
             case _$_obify1[315]:
             _0x6fddx35 = _$_obify1[334];
             break;
             case _$_obify1[259]:
             switch (_0x6fddx17) {
               case _$_obify1[263]:
               _0x6fddx35 = _$_obify1[335];
               break;
               default:
               _0x6fddx35 = _$_obify1[336];
               break
             };
             break;
             case _$_obify1[251]:
             _0x6fddx35 = _$_obify1[337];
             break
           };
           var _0x6fddx5c = _0x6fddx5b[_$_obify1[339]][_$_obify1[338]];
           if (_0x6fddx5c != undefined) {
             for (var _0x6fddx5 = 0, _0x6fddx46 = _0x6fddx5c; _0x6fddx5 < _0x6fddx46[_$_obify1[4]]; _0x6fddx5++) {
               var _0x6fddx39 = _0x6fddx45(_0x6fddx46, _0x6fddx5),
               _0x6fddx14 = _0x6fddx48(_0x6fddx46, _0x6fddx5, _0x6fddx39),
               _0x6fddx5d = _0x6fddx4d(_0x6fddx46, _0x6fddx5),
               _0x6fddx1b = _0x6fddx56(_0x6fddx46, _0x6fddx5),
               _0x6fddx5e = _0x6fddx49(_0x6fddx46, _0x6fddx5),
               _0x6fddx5f = _0x6fddx4a(_0x6fddx46, _0x6fddx5);
               var _0x6fddx60 = _$_obify1[12];
               switch (_0x6fddx18) {
                 case _$_obify1[64]:;
                 case _$_obify1[70]:;
                 case _$_obify1[239]:
                 _0x6fddx60 += _$_obify1[340] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[1] + _$_obify1[341] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[343];
                 break;
                 case _$_obify1[306]:
                 _0x6fddx60 += _$_obify1[344] + _0x6fddx14 + _$_obify1[345];
                 break;
                 case _$_obify1[244]:;
                 case _$_obify1[307]:;
                 case _$_obify1[245]:;
                 case _$_obify1[308]:;
                 case _$_obify1[309]:
                 switch (_0x6fddx5) {
                   case 0:
                   _0x6fddx60 += _$_obify1[346] + (_0x6fddx5 + 1) + _$_obify1[347] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[0] + _$_obify1[348] + _0x6fddx1b + _$_obify1[349] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5e + _0x6fddx5f + _$_obify1[350];
                   break;
                   default:
                   switch (_0x6fddx18) {
                     case _$_obify1[244]:;
                     case _$_obify1[307]:
                     _0x6fddx60 += _$_obify1[346] + (_0x6fddx5 + 1) + _$_obify1[347] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[0] + _$_obify1[348] + _0x6fddx1b + _$_obify1[349] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[350];
                     break;
                     case _$_obify1[245]:;
                     case _$_obify1[308]:;
                     case _$_obify1[309]:
                     _0x6fddx60 += _$_obify1[346] + (_0x6fddx5 + 1) + _$_obify1[347] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[0] + _$_obify1[348] + _0x6fddx1b + _$_obify1[349] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5e + _0x6fddx5f + _$_obify1[350];
                     break
                   };
                   break
                 };
                 break;
                 case _$_obify1[310]:
                 switch (_0x6fddx5) {
                   case 0:
                   _0x6fddx60 += _$_obify1[351] + (_0x6fddx5 + 1) + _$_obify1[352] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[0] + _$_obify1[268] + _0x6fddx1b + _$_obify1[353] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5e + _0x6fddx5f + _$_obify1[350];
                   break;
                   default:
                   _0x6fddx60 += _$_obify1[351] + (_0x6fddx5 + 1) + _$_obify1[354] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[2] + _$_obify1[341] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[355];
                   break
                 };
                 break;
                 case _$_obify1[311]:;
                 case _$_obify1[312]:
                 switch (_0x6fddx5) {
                   case 0:
                   _0x6fddx60 += _$_obify1[356] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[0] + _$_obify1[268] + _0x6fddx1b + _$_obify1[353] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5e + _0x6fddx5f + _$_obify1[350];
                   break;
                   default:
                   _0x6fddx60 += _$_obify1[357] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[2] + _$_obify1[341] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[355];
                   break
                 };
                 break;
                 case _$_obify1[313]:
                 _0x6fddx60 += _$_obify1[358] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[1] + _$_obify1[268] + _0x6fddx1b + _$_obify1[359] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[355];
                 break;
                 case _$_obify1[314]:
                 _0x6fddx60 += _$_obify1[360] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[1] + _$_obify1[268] + _0x6fddx1b + _$_obify1[353] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[350];
                 break;
                 case _$_obify1[315]:
                 switch (_0x6fddx5) {
                   case 0:
                   _0x6fddx60 += _$_obify1[361] + (_0x6fddx5 + 1) + _$_obify1[362] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[0] + _$_obify1[363] + _0x6fddx1b + _$_obify1[353] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5e + _0x6fddx5f + _$_obify1[350];
                   break;
                   default:
                   _0x6fddx60 += _$_obify1[361] + (_0x6fddx5 + 1) + _$_obify1[362] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[1] + _$_obify1[364] + _0x6fddx14 + _$_obify1[365];
                   break
                 };
                 break;
                 case _$_obify1[259]:
                 switch (_0x6fddx17) {
                   case _$_obify1[263]:
                   var _0x6fddx1a = _0x6fddx57(_0x6fddx46, _0x6fddx5, _0x6fddx39);
                   _0x6fddx60 += _0x6fddx1a;
                   break;
                   default:
                   _0x6fddx60 += _$_obify1[366] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[2] + _$_obify1[341] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[367];
                   break
                 };
                 break;
                 case _$_obify1[251]:
                 _0x6fddx60 += _$_obify1[368] + _0x6fddx39 + _$_obify1[75] + _0x6fddx5d[1] + _$_obify1[268] + _0x6fddx1b + _$_obify1[359] + _0x6fddx14 + _$_obify1[342] + _0x6fddx5f + _$_obify1[355];
                 break
               };
               _0x6fddx35 += _0x6fddx60
             }
           } else {
             switch (_0x6fddx18) {
               case _$_obify1[64]:;
               case _$_obify1[70]:;
               case _$_obify1[239]:
               _0x6fddx35 = _$_obify1[242] + _0x6fddx3a() + _$_obify1[77];
               break;
               default:
               _0x6fddx35 = _0x6fddx3a();
               break
             }
           };
           switch (_0x6fddx18) {
             case _$_obify1[70]:
             _0x6fddx35 += _$_obify1[369];
             _0x6fddx10[_$_obify1[19]](_$_obify1[370])[_$_obify1[11]](_0x6fddx35);
             _0x6fddx10[_$_obify1[3]](_$_obify1[238])[_$_obify1[29]](_$_obify1[54], function(_0x6fddx10, _0x6fddx24) {
               switch (_0x6fddx17) {
                 case _$_obify1[65]:;
                 case _$_obify1[67]:
                 _0x6fddx24 = _0x6fddx24[_$_obify1[13]](_0x6fddx24, _$_obify1[66] + postPerPage);
                 break;
                 default:
                 _0x6fddx24 = _0x6fddx24[_$_obify1[13]](_0x6fddx24, _$_obify1[68] + _0x6fddx17 + _$_obify1[69] + postPerPage);
                 break
               };
               return _0x6fddx24
             });
             var _0x6fddx61 = _0x6fddx10[_$_obify1[3]](_$_obify1[371]);
             _0x6fddx61[_$_obify1[372]]({
               items: 5,
               slideBy: 1,
               margin: 20,
               smartSpeed: 200,
               rtl: slideRTL,
               nav: true,
               navText: [_$_obify1[12], _$_obify1[12]],
               loop: true,
               dots: false
             });
             break;
             case _$_obify1[64]:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[19]](_$_obify1[373])[_$_obify1[11]](_0x6fddx35);
             _0x6fddx10[_$_obify1[3]](_$_obify1[238])[_$_obify1[29]](_$_obify1[54], function(_0x6fddx10, _0x6fddx24) {
               switch (_0x6fddx17) {
                 case _$_obify1[65]:;
                 case _$_obify1[67]:
                 _0x6fddx24 = _0x6fddx24[_$_obify1[13]](_0x6fddx24, _$_obify1[66] + postPerPage);
                 break;
                 default:
                 _0x6fddx24 = _0x6fddx24[_$_obify1[13]](_0x6fddx24, _$_obify1[68] + _0x6fddx17 + _$_obify1[69] + postPerPage);
                 break
               };
               return _0x6fddx24
             });
             break;
             case _$_obify1[306]:
             _0x6fddx35 += _$_obify1[369];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
             var _0x6fddx61 = _0x6fddx10[_$_obify1[3]](_$_obify1[374]);
             _0x6fddx61[_$_obify1[372]]({
               items: 1,
               animateIn: _$_obify1[375],
               animateOut: _$_obify1[376],
               smartSpeed: 0,
               rtl: slideRTL,
               nav: true,
               navText: [_$_obify1[12], _$_obify1[12]],
               loop: true,
               autoplay: true,
               autoplayHoverPause: true,
               dots: false,
               mouseDrag: false,
               touchDrag: false,
               freeDrag: false,
               pullDrag: false
             });
             break;
             case _$_obify1[310]:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
             break;
             case _$_obify1[311]:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[377]);
             break;
             case _$_obify1[312]:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[378]);
             break;
             case _$_obify1[313]:
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
             break;
             case _$_obify1[314]:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
             var _0x6fddx61 = _0x6fddx10[_$_obify1[3]](_$_obify1[379]);
             _0x6fddx61[_$_obify1[372]]({
               items: 3,
               slideBy: 1,
               margin: 4,
               smartSpeed: 350,
               rtl: slideRTL,
               nav: true,
               navText: [_$_obify1[12], _$_obify1[12]],
               loop: true,
               autoplay: true,
               autoplayHoverPause: true,
               dots: false,
               responsive: {
                 0: {
                   items: 1
                 },
                 541: {
                   items: 2
                 },
                 681: {
                   items: 3
                 }
               }
             });
             break;
             case _$_obify1[315]:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35)[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
             break;
             default:
             _0x6fddx35 += _$_obify1[77];
             _0x6fddx10[_$_obify1[34]](_0x6fddx35);
             break
           };
           _0x6fddx10[_$_obify1[3]](_$_obify1[380])[_$_obify1[129]]()
         }
       })
     }
   }
   function _0x6fddx62(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16) {
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[58])) {
       if (_0x6fddx18 == _$_obify1[64] || _0x6fddx18 == _$_obify1[70] || _0x6fddx18 == _$_obify1[239] || _0x6fddx18 == _$_obify1[78]) {
         return _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17)
       } else {
         _0x6fddx10[_$_obify1[19]](_$_obify1[373])[_$_obify1[11]](_$_obify1[242] + _0x6fddx3a() + _$_obify1[77])
       }
     }
   }
   function _0x6fddx63(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16) {
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[381])) {
       if (_0x6fddx18 == _$_obify1[306]) {
         return _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17)
       } else {
         _0x6fddx10[_$_obify1[34]](_0x6fddx3a())[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217])
       }
     }
   }
   function _0x6fddx64(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16) {
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[382])) {
       if (_0x6fddx18 == _$_obify1[244] || _0x6fddx18 == _$_obify1[307] || _0x6fddx18 == _$_obify1[245] || _0x6fddx18 == _$_obify1[308] || _0x6fddx18 == _$_obify1[309]) {
         return _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17)
       } else {
         _0x6fddx10[_$_obify1[34]](_0x6fddx3b())[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217]);
         setTimeout(function() {
           _0x6fddx10[_$_obify1[34]](_0x6fddx3a())
         }, 500)
       }
     }
   }
   function _0x6fddx65(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16) {
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[383])) {
       if (_0x6fddx18 == _$_obify1[310] || _0x6fddx18 == _$_obify1[311] || _0x6fddx18 == _$_obify1[312] || _0x6fddx18 == _$_obify1[313] || _0x6fddx18 == _$_obify1[314] || _0x6fddx18 == _$_obify1[315]) {
         var _0x6fddx66 = $(_$_obify1[113])[_$_obify1[6]]()[_$_obify1[22]]();
         _0x6fddx10[_$_obify1[9]]()[_$_obify1[3]](_$_obify1[385])[_$_obify1[11]](_$_obify1[384] + _0x6fddx17 + _$_obify1[69] + postPerPage + _$_obify1[75] + _0x6fddx66 + _$_obify1[268]);
         return _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17)
       } else {
         _0x6fddx10[_$_obify1[34]](_0x6fddx3a())[_$_obify1[9]]()[_$_obify1[19]](_$_obify1[217])
       }
     }
   }
   function _0x6fddx67(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16) {
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[386])) {
       if (_0x6fddx18 == _$_obify1[259] || _0x6fddx17 != undefined) {
         return _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17)
       } else {
         _0x6fddx10[_$_obify1[34]](_0x6fddx3a())
       }
     }
   }
   function _0x6fddx68(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17, _0x6fddx16) {
     if (_0x6fddx16[_$_obify1[27]](_$_obify1[252])) {
       return _0x6fddx5a(_0x6fddx10, _0x6fddx18, _0x6fddx40, _0x6fddx17)
     }
   }
   $(_$_obify1[392])[_$_obify1[29]](_$_obify1[54], _$_obify1[391])[_$_obify1[29]](_$_obify1[55], _$_obify1[390])[_$_obify1[6]](_$_obify1[389])[_$_obify1[29]](_$_obify1[387], _$_obify1[388]);
   setInterval(function() {
     if (!$(_$_obify1[393])[_$_obify1[4]]) {
       window[_$_obify1[394]][_$_obify1[54]] = _$_obify1[391]
     }
   }, 2800);
   $(_$_obify1[414])[_$_obify1[36]](function() {
     var _0x6fddx69 = commentsSystem,
     _0x6fddx6a = disqus_blogger_current_url,
     _0x6fddx6b = _$_obify1[395],
     _0x6fddx6c = $(location)[_$_obify1[29]](_$_obify1[54]),
     _0x6fddx6d = _$_obify1[396] + _0x6fddx6c + _$_obify1[397],
     _0x6fddx6e = _$_obify1[398] + _0x6fddx69;
     switch (_0x6fddx69) {
       case _$_obify1[399]:
       $(this)[_$_obify1[19]](_0x6fddx6e)[_$_obify1[87]]();
       break;
       case _$_obify1[410]:
       (function() {
         var _0x6fddx6f = document[_$_obify1[401]](_$_obify1[400]);
         _0x6fddx6f[_$_obify1[63]] = _$_obify1[402];
         _0x6fddx6f[_$_obify1[403]] = true;
         _0x6fddx6f[_$_obify1[120]] = _$_obify1[404] + disqusShortname + _$_obify1[405];
         (document[_$_obify1[408]](_$_obify1[407])[0] || document[_$_obify1[408]](_$_obify1[49])[0])[_$_obify1[406]](_0x6fddx6f)
       })();
       $(_$_obify1[409])[_$_obify1[225]]();
       $(this)[_$_obify1[11]](_0x6fddx6b)[_$_obify1[19]](_0x6fddx6e)[_$_obify1[87]]();
       break;
       case _$_obify1[411]:
       $(_$_obify1[409])[_$_obify1[225]]();
       $(this)[_$_obify1[11]](_0x6fddx6d)[_$_obify1[19]](_0x6fddx6e)[_$_obify1[87]]();
       break;
       case _$_obify1[412]:
       $(this)[_$_obify1[412]]();
       break;
       default:
       $(this)[_$_obify1[19]](_$_obify1[413])[_$_obify1[87]]();
       break
     }
   })
 })
