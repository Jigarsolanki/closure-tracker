(function( $ ){
  var methods = {
    init : function( options ) {

        return this.each(function(){
            var gauge = new Gauge( $(this)[0], options );
            $(this).data('gauge', gauge);
        });

    },
    setValue : function( value ) {
        return this.each(function(){
            var gauge = $(this).data('gauge');
            if (gauge != null) {
                gauge.setValue( value );
            }
        });
    },
    draw : function( ) {
        return this.each(function(){
            var gauge = $(this).data('gauge');
            if (gauge != null) {
                gauge.draw();
            }
        });
    }

  };

  $.fn.gauge = function( method ) {

    // Method calling logic
    if ( methods[method] ) {
      return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.gauge' );
    }

  };
})( jQuery );
