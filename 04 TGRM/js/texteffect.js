(function($) { // Begin jQuery extension
    
  var timer;
  
    Number.prototype.range = function( min, max ) {
       return this > min && this < max; 
    }; 
  
    var rd = function randomAlphaNum() {
        var rand = Math.floor(Math.random()*( 122 - 33 + 1 ) + 33 );
        
      // Filter out char codes that are not required
        if ( rand.range( 38, 48 ) ) rand = rand + 10;
        else if ( rand.range( 57, 63 ) ) rand = rand + 10;
        else if ( rand.range( 90, 97 ) ) rand = rand + 10;
        
        return String.fromCharCode( rand ); 
    };
      
    $.fn.cipherStart = function( begin ) {
        this.each( function() {
                   
            var $ele = $(this), 
                str = $ele.text(), 
                i = 0, 
                replace = /[^\s]/g;     
          
           $ele.text(''); // Clears the text
          
            timer = setInterval( function() {
                $ele.text(
                  str.substring( 0, i ) + // Returns a subset of the initial string, on the first call 0 0 returns nothing, next is 0 1 etc
                  str.substring( i, str.length ) // Returns a subset of progress to the full length of the string
                  
                  .replace( replace, rd ) // replace all characters with a random char code
                );
              
                if ( begin ) { // Reveal text
                  i++;
                  
                  if ( i > str.length )
                      clearInterval(timer);                  
                }
          
            }, 30); // Timing  
        });
        return this;
    };

    $.fn.cipherStop = function() {
      clearInterval( timer );
      
      return this;
    };
    
  
	$.fn.cipherCenter = function () {
	    this.css( 'position', 'absolute' );
	     this.css( 'top', Math.max( 0, ( ($( window ).height() - $( this ).outerHeight()) / 2.3 ) + $( window ).scrollTop() ) + 'px' );
			 this.css( 'left', Math.max( 0, ( ($( window ).width() - $( this ).outerWidth()) / 2 ) + $( window ).scrollLeft() ) + 'px' );
	    
      return this;
	}

    
})(jQuery); // End jQuery Extension


$( 'document' ).ready(function() {
  
  // Hide header
  $( '.header' ).hide();
  // Transition background
  $( '.london' ).ready(function() {
    $( '.london' ).fadeIn( 1200 );

  // Timeout for crypto text
  setTimeout( function() { 
    $( '.header' ).fadeIn( 'slow' );
      $( '.cipher' ).cipherStart( true );
  }, 1400);    
    
    
  });
   
});
