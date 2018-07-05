$(document).ready(

  $(function() {
        
    var $input = $('input.nmoney')

    $input.on( "keyup", function( event ) {
        
        
        // When user select text in the document, also abort.
        var selection = window.getSelection().toString();
        if ( selection !== '' ) {
            return;
        }
        
        // When the arrow keys are pressed, abort.
        if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
            return;
        }
        
        
        var $this = $( this );
        
        // Get the value.
        var input = $this.val();
        
        var input = input.replace(/[\D\s\._\-]+/g, "");
                input = input ? parseInt( input, 10 ) : 0;

                $this.val( function() {
                    return ( input === 0 ) ? "" : input.toLocaleString( "en-US" );
                } );
    } );
    
  







//autocomplete de la bd


 
    
  }));

  function formulas() {
    var valor=parseFloat($("#monto_est").val());
    var amort=parseFloat(valor*.20);
    var subt=parseFloat(valor-amort);
    var ret=parseFloat(valor*.10);
    var subt2=subt-ret;
    var iva=parseFloat(subt2*.16);
    var total=subt2+iva;
    subt2.toFixed(2);
    iva.toFixed(2);
    total.toFixed(2);
    $("#subtotal").val(subt2);
    $("#iva").val(iva);
    $("#totalg").val(total);







  }
  function suma() {

  var valor=parseFloat($("#monto_est").val());
  var extra=parseFloat($("#mextra").val());
  var suma=valor+extra;
  var amort=parseFloat(valor*.20);
  var subt=parseFloat(suma-amort);
  var ret=parseFloat(suma*.10);
  var subt2=subt-ret;
  var iva=parseFloat(subt2*.16);
  var total=subt2+iva;
  subt2.toFixed(2);
    iva.toFixed(2);
    total.toFixed(2);
  $("#subtotal").val(subt2);
  $("#iva").val(iva);
  $("#totalg").val(total);

  }
