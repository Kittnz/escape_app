// Escape

$(document).ready(function(){

	// Set up
	var theStage = $("#stage");
    var theImg = $("#stage img.scene-background");

	var windowWidth = $(window).width(); 
	var windowHeight = $(window).height();  
	var imgWidth = 732;    
	var imgHeight = 412;  
 	var imgRatio = imgWidth / imgHeight;



	// Scale main scene to fit
	var scaleScene = function(){
	    var winRatio= windowWidth / windowHeight;
	    if (imgRatio<winRatio) {
	    	theImg.css({width:'auto', height:windowHeight});

	    }else{ 
	    	theImg.css({width:windowWidth, height:'auto'});	

		}
	}

	// Function to get Percentage of scaled scene
	var thePercentage = function(newNumber, originalNumber){
		if(newNumber>originalNumber){
			whatPercent = newNumber - originalNumber;
			whatPercent = (whatPercent/originalNumber)*100;
			whatPercent += 100;
		}else{
			whatPercent = originalNumber - newNumber;
			whatPercent = (whatPercent/originalNumber)*100;
			whatPercent = 100-whatPercent;
		}
		return whatPercent;
	}


   	var baseScale = thePercentage(windowWidth, imgWidth);

	var scaleObjectImages = function(theObjectImage,imageID,xPos,yPos){
		$("#"+imageID).remove();
		var img = new Image();
	    img.src = "images/"+theObjectImage;
	    img.id = imageID;
	    img.className = "gameObject";

	    thisWidth = 0;
	    thisHeight = 0;
	    img.onload = function() {
	    	thisWidth = this.naturalWidth;
	    	img.width = (thisWidth/100)*baseScale;
	    	theStage.append(img);
	    	//$("#"+imageID).removeAttr("style"); 
	    	$("#"+imageID).css({"top" : yPos+"%", "left" : xPos+"%"});
	    	$("#"+imageID).on('click', function(){
		    	$("#"+imageID).remove();
			});
   		}
   	}

   	var gameObject = function(originalX, originalY, fileName, imageID){
   		xPos = thePercentage(originalX,imgWidth);
   		yPos = thePercentage(originalY,imgHeight);
   		scaleObjectImages(fileName,imageID,xPos,yPos);
   	}

   	// init
   	scaleScene();
   	gameObject(433,313,"knife_buried.png", "theKnife");


    var eventTimeout; 
    var actualEventHandler = function () {
		windowWidth = $(window).width(); 
		windowHeight = $(window).height();  
   		scaleScene();
   		baseScale = thePercentage(windowWidth, imgWidth);
   		gameObject(433,313,"knife_buried.png", "theKnife");
    };

    var eventThrottler = function () {
      if ( !eventTimeout ) {
        eventTimeout = setTimeout(function() {
          eventTimeout = null;
          actualEventHandler();
         }, 250);
      }
    };

    window.addEventListener( 'resize', eventThrottler, false );



    $("#restart").on('click', function(){
    	actualEventHandler();
	});

});