$(function () {
	var colors = new Array(
	  ['#ff3232','#7db9e8'],
	  ['#28CC28','#4D8E72'],
	  ['#1E7C96','#32545B'],  
	  ['#F77D31','#DDD37A']);

	var step = 0;

	$(window).on('load resize',setupFullPage);  
	

	$('#navigation a').on('click', function(){
  		setTimeout(function(){
	    	$('body').removeClass('open-menu');
	    },500); 
  	});

  	$('.page').not('#blog-page,#contact-page').find('.btn,.scrolldown').on('click',function(e){
  		e.preventDefault();
  		$.fn.fullpage.moveSectionDown();
  	});

  	$('span.show-menu').on('click',function(){
  		$('body').toggleClass('open-menu'); 
  	});

  	$('.details .open-link').on('click', function(){
  		showDetails(this);
  	});

  	$(document).on('click', '.details .open-link.close', function(){
  		closeDetails(this); 
  	});

  	$('.mobile-more').on('click',showDetailsMobile);

  	$('.mobile-details .close').on('click',closeDetailsMobile);

  	$('.play-video').on('click',playVideo);

  	$('.close-video').on('click',closeVideo);

  	var queue = new createjs.LoadQueue();
    queue.on("complete", function(){ 
        setTimeout(function(){
            $('.loading').fadeOut(1000,function(){
            	$('#wrapper,#header').show();
           	}); 
             
            
        },500);
        //Hide Awwwards.com tooltip
        setTimeout(function(){
	    	$('.awwwards-tooltip').fadeIn();
	    },3500); 
	    setTimeout(function(){
	    	$('.awwwards-tooltip').fadeOut();
	    },10000); 
        
   	}, this);
   	queue.on("progress", function(progress){
		$('.loading .progress').text(Math.floor((progress.progress*100))+'%'); 
 	}, this); 
    queue.loadManifest([ 
        {id: "image_1", src:"/img/displaying.png"},   
        {id: "image_2", src:"/img/camera-img.png"},   
        {id: "image_3", src:"/img/content.png"},  
        {id: "image_4", src:"/img/design-img.png"},  
        {id: "image_5", src:"/img/details-hover.png"},  
        {id: "image_6", src:"/img/details.png"},  
        {id: "image_7", src:"/img/laptop-img.png"},   
        {id: "image_8", src:"/img/logo.png"},  
        {id: "image_9", src:"/img/mobile-img.png"},  
        {id: "image_10", src:"/img/plus.png"},  
        {id: "image_11", src:"/img/sprite.png"},  
        {id: "image_12", src:"/img/symodd-logo.png"} 
    ]);
    //Refresh Body Background
    refreshBg();
    
    //Afficher les details d'un services en appuyant sur le bouton "S" du clavier
    openDetailsOnKeypress();

});
function openDetailsOnKeypress(){
	$(document).on('keypress',function(e){
    	if(e.which == 115 && $('.page.active').hasClass('whatwedo')){
    		$('.page.active .open-link').trigger('click');  
    	}
    });
}

function goTo(n){	
	$.fn.fullpage.moveTo(n);
}

function setupFullPage(colors,step){
	//console.log(typeof $.fn.fullpage.destroy);
	if(typeof $.fn.fullpage.destroy  != 'undefined')
		$.fn.fullpage.destroy('all'); 

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	var autosc;
	autosc = ($(window).width() > 600) ? true : false;

	$('#wrapper').fullpage({
		sectionSelector: '.page',
		easing: 'swing',
		navigation: true, 
		css3: isMobile, 
		autoScrolling: autosc,
		onLeave: function(index, nextIndex, direction){
			var $next 	  	= $('.page').eq(nextIndex - 1);
			var $animated 	= $('.animated.img,.whatwedo h2.animated',$next);

			if (direction == 'down') {
				$animated.each(function(){
					$(this).removeClass($(this).data('animation-out')).addClass($(this).data('animation-in'));
				});	
			}else{
				$animated.each(function(){
					$(this).removeClass($(this).data('animation-in')).addClass($(this).data('animation-out'));
				});	
			};
			

			$('.gradient').remove();
			$('body').prepend('<div id="gradient-'+index+'" class="gradient animated fadeOut"></div><div id="gradient-'+nextIndex+'" class="gradient animated fadeIn"></div>');
		},
		//anchors: ['home', 'team', 'audiovisual', 'web', 'design', 'mobile', 'content', 'advertising', 'blog', 'contact'],
    	
		//navigationTooltips: ['Home','Team','Audiovisual','Web','Design','Mobile','Content','Advertising','Contact','Blog']
	});
	

	
	
}
function closeVideo(){
	$('body').removeClass('open-video');
	$('body').addClass('closing');
	setTimeout(function(){  
     	$('body').removeClass('closing');
    },300);
}
function playVideo(){
	$('body').toggleClass('open-video');
}
function showDetailsMobile(){
	var $this = $(this);
	var $mobDetails = 	$this.prev(); 
	$mobDetails.removeClass('closing').addClass('open');     	
}
function closeDetailsMobile(){
	var $this = $(this);
	var $parent = 	$this.parent(); 
	$parent.addClass('closing');
	setTimeout(function(){
     	$parent.removeClass('open');
  	},1800);
}
function showDetails(el){
	var $this = $(el);
	var $parent = 	$this.parent(); 
	$parent.removeClass('closing').addClass('open');
	setTimeout(function(){
		$this.addClass('close'); 
	},250);
}
function closeDetails(el){
	var $this = $(el);
	var $parent = 	$this.parent(); 
	$parent.addClass('closing');
	setTimeout(function(){
     	$parent.removeClass('open');
		$this.removeClass('close');
    },250);
}
function refreshBg() {
  	var bodyBgClasses = Array('orange','green','violet'); 
    var index = Math.floor((Math.random() * 3) + 1); // Return 1,2 or 3.
    $('body').addClass(bodyBgClasses[index - 1]);
}
  