var app = angular.module('Obra-detalle', []);

app.controller('Trabajo1', function ($scope, $http) {

 
  
    $scope.consulta_estimacion_detalle=function(){
        
        $http({
            url: "../../api/consulta_estimacion_detalle/",
            method: "post",
            params: {id:$scope.parametro},
            //
        }).then(function successCallback(result){
            $scope.estimacions_consulta_detalle= result.data['resultado_consulta'];
            console.log($scope.estimacions_consulta_detalle);
        
        })
    }
   // $scope.consulta_estimacion_detalle();

//info de proveedores
$scope.consulta_provById=function(){
    $http({
        url: "../../api/getProvById/",
        method: "post",
        params: { id:$scope.idProveedor },
        //
    }).then(function successCallback(result){
        $scope.consulta_prov= result.data['resultado_consulta'];
        console.log($scope.consulta_prov);
    
    })
}



    //consulta de datos de gastos por obra
    $scope.consulta_gasto_obra=function(){
        $http({
            url: "../../api/consultaGastosbyIdObra/",
            method: "post",
            params: { id:$scope.parametro },
            //
        }).then(function successCallback(result){
            $scope.consulta_gastoObra= result.data['resultado_consulta'];
            console.log($scope.consulta_gasto_obra);
        
        })
    }
    $scope.consulta_gasto_obra();

  //consulta de datos de gastos por obra




 //registrando agstos

     $scope.regGasto=function(){
     //alert(parseInt(($scope.monto).replace(/,/g, ''), 10));
     var montof=parseInt(($scope.monto).replace(/,/g, ''), 10);
     if($scope.descripcion==""|| $scope.fecha_gasto=="" || montof=="" || $scope.idProveedor=="" || $scope.idCuentabancaria ==""){
         $scope.ErrorRegistrogasto=true;
     }else{
         $scope.ErrorRegistrogasto=false;
         $http({
             url: "../../api/registra_gasto",
             method: "post",
             params: {descripcion:$scope.descripcion, fecha_gasto:$scope.fecha_gasto, monto: montof, idProveedor: $scope.idProveedor, 
             idCuentabancaria: $scope.idCuentabancaria,
             idObra: $scope.parametro},

         }).then(function successCallback(result) {
             $scope.RegistroExitoso= result.data;
             $scope.consulta_gasto_obra();


             
         });
     }

 }

//jquery para autocomplete
$(function () {

    $("#search-query").autocomplete({
        source: function (request, response) {
           $.ajax({
              url: "../../api/getProvs",
              type: "GET",
              data: request,  // request is the value of search input
              success: function (data) {
                // Map response values to fiedl label and value
                 response($.map(data, function (el) {
                    return {
                       label: el.nombre,
                       value: el._id
                    };
                    }));
                 }
              });
           },
           
           // The minimum number of characters a user must type before a search is performed.
           minLength: 3, 
           
           // set an onFocus event to show the result on input field when result is focused
           focus: function (event, ui) { 
              this.value = ui.item.label; 
              // Prevent other event from not being execute
              event.preventDefault();
           },
           select: function (event, ui) {
              // Prevent value from being put in the input:
             this.value = ui.item.label;
              // Set the id to the next input hidden field
              $scope.idProveedor=ui.item.value; 
              // Prevent other event from not being execute            
              event.preventDefault();
              // optionnal: submit the form after field has been filled up
          
           }
    });
  
  });

//para el autocomplete de cuentas bancarias yupii
//jquery para autocomplete
$(function () {

    $("#search-cb").autocomplete({
        source: function (request, response) {
           $.ajax({
              url: "../../api/getcbs",
              type: "GET",
              data: request,  // request is the value of search input
              success: function (data) {
                // Map response values to fiedl label and value
                 response($.map(data, function (el) {
                    return {
                       label: el.noCuenta,
                       value: el._id
                    };
                    }));
                 }
              });
           },
           
           // The minimum number of characters a user must type before a search is performed.
           minLength: 3, 
           
           // set an onFocus event to show the result on input field when result is focused
           focus: function (event, ui) { 
              this.value = ui.item.label; 
              // Prevent other event from not being execute
              event.preventDefault();
           },
           select: function (event, ui) {
              // Prevent value from being put in the input:
             this.value = ui.item.label;
              // Set the id to the next input hidden field
              $scope.idCuentabancaria=ui.item.value; 
              // Prevent other event from not being execute            
              event.preventDefault();
              // optionnal: submit the form after field has been filled up
          
           }
    });
  
  });


//misma funcion dos veces
$(function () {

    $("#search-cbs").autocomplete({
        source: function (request, response) {
           $.ajax({
              url: "../../api/getcbs",
              type: "GET",
              data: request,  // request is the value of search input
              success: function (data) {
                // Map response values to fiedl label and value
                 response($.map(data, function (el) {
                    return {
                       label: el.noCuenta,
                       value: el._id
                    };
                    }));
                 }
              });
           },
           
           // The minimum number of characters a user must type before a search is performed.
           minLength: 3, 
           
           // set an onFocus event to show the result on input field when result is focused
           focus: function (event, ui) { 
              this.value = ui.item.label; 
              // Prevent other event from not being execute
              event.preventDefault();
           },
           select: function (event, ui) {
              // Prevent value from being put in the input:
             this.value = ui.item.label;
              // Set the id to the next input hidden field
              $scope.idCuentabancaria=ui.item.value; 
              // Prevent other event from not being execute            
              event.preventDefault();
              // optionnal: submit the form after field has been filled up
          
           }
    });
  
  });













    $scope.confirma_edicion=function(){
     //validar que los campos no esten vacios
  // alert('id '+$scope.id_estimacion_editar)

        if($scope.id_estimacion_editar){
            $http({
                url: "api/confirmar_edicion_estimacion",
                method: "put",
                params: {id_estimacion:$scope.id_estimacion_editar,nombre:$scope.nombreEdit,precio_contrato:$scope.precio_contratoEdit, 
                    fecha_inicio: $scope.fecha_inicioEdit, fecha_limite: $scope.fecha_limiteEdit, porcentaje_anticipo: $scope.porcentaje_anticipoEdit,
                    direccion: $scope.direccionEdit, idUsuario: $scope.idUsuarioEdit, anticipoPagado: $scope.anticipoPagadoEdit,
                    estimaciones: $scope.estimacionesEdit, idProveedor: $scope.idProveedorEdit
                },
                //
            }).then(function successCallback(result){
                console.log('confirmando actu')
                if(result.data['check']){
                   $scope.MensajeActualizado= result.data['resultado_consulta'];
                   $('#cierramodal' ).click()
                  // alert('si se actualizo')
                    $scope.id_estimacion_editar="";
                    $scope.nombreEdit="";
                    $scope.precio_contratoEdit="";
                    $scope.fecha_inicioEdit= "";
                    $scope.fecha_limiteEdit= "";
                    $scope.porcentaje_anticipoEdit= "";
                    $scope.direccionEdit= "";
                    $scope.idUsuarioEdit= "";
                    $scope.anticipoPagadoEdit= "";
                    $scope.estimacionesEdit= "";
                    $scope.idProveedorEdit= "";


                    
                    $scope.consulta_estimacions()
                }else{
                //$.alert(result.data['message'], "Se actualizo perfectamente");

            }
            }) 
        }else{

        }
    }

    
    //
    $scope.mostrarEdicion=function(id_estimacion){
       //alert(id_estimacion)
        $http({
            url: "api/mostrar_edicion_estimacion",
            method: "post",
            params: {id_estimacion:id_estimacion},
            //
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.nombreEdit= result.data['nombre'];
                $scope.precio_contratoEdit= result.data['precio_contrato'];
                $scope.fecha_inicioEdit= result.data['fecha_inicio'];
                $scope.fecha_limiteEdit= result.data['fecha_limite'];
                $scope.porcentaje_anticipoEdit= result.data['porcentaje_anticipo'];
                $scope.direccionEdit= result.data['direccion'];
                $scope.idUsuarioEdit= result.data['idUsuario'];
                $scope.anticipoPagadoEdit= result.data['anticipoPagado'];
                $scope.estimacionesEdit= result.data['estimaciones'];
                $scope.idProveedorEdit= result.data['idProveedor'];



                $scope.id_estimacion_editar=result.data['id_estimacion'];

            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }
    //

    $scope.mostrarEliminar=function(id_estimacion_eliminar){
       // alert(id_estimacion_eliminar)
        $http({
            url: "api/mostrar_edicion_estimacion",
            method: "post",
            params: {id_estimacion:$scope.parametro}
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.nombreEdit= result.data['nombre'];
                $scope.precio_contratoEdit= result.data['precio_contrato'];
                $scope.fecha_inicioEdit= result.data['fecha_inicio'];
                $scope.fecha_limiteEdit= result.data['fecha_limite'];
                $scope.porcentaje_anticipoEdit= result.data['porcentaje_anticipo'];
                $scope.direccionEdit= result.data['direccion'];
                $scope.idUsuarioEdit= result.data['idUsuario'];
                $scope.anticipoPagadoEdit= result.data['anticipoPagado'];
                $scope.estimacionesEdit= result.data['estimaciones'];
                $scope.idProveedorEdit= result.data['idProveedor'];
                
                $scope.id_estimacion_eliminar=result.data['id_estimacion']
            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }

    //eliminar lendabeybys
    $scope.confirma_delete=function(id_estimacion_eliminar){
      //  alert('id:  '+$scope.id_estimacion_eliminar)
        if($scope.id_estimacion_eliminar){
            $http({
                url: "api/confirmar_delete_estimacion",
                method: "delete",
                params: {id_estimacion:$scope.id_estimacion_eliminar}
            }).then(function successCallback(result){
                if(result.data['check']){
                   $scope.MensajeBorrar= result.data['resultado_consulta'];
                   $('#modal-container-221607' ).click()
                   //alert('se borro')
                    $scope.id_estimacion_eliminar="";
                    $scope.consulta_estimacions();
                }else{
               // $.alert(result.data['message'], "Se borro perfectamente");
            }
            }) 
        }else{

        }
    }


    $scope.regEstimacion=function(){
       // alert('estamos aqui');
        
        
        if($scope.nombre==""|| $scope.monto_est=="" || $scope.extras==""
        || $scope.fecha_inicio=="" || $scope.fecha_limite=="" || $scope.idCuentabancaria){
            $scope.ErrorRegistroestimacion=true;
        }else{
            $scope.ErrorRegistroestimacion=false;
            $http({
                url: "../../api/registra_estimacion",
                method: "post",
                params: {nombre:$scope.nombre, monto_est:$scope.monto_est, extras: $scope.extras, subtotal: $scope.subtotal, 
                iva: $scope.iva, total: $scope.total, fecha_inicio: $scope.fecha_inicio, fecha_limite: $scope.fecha_limite, idCuentabancaria: 
                $scope.idCuentabancaria, idObra: $scope.parametro},

            }).then(function successCallback(result) {
                $scope.RegEstimacionExitoso= result.data;
               // $scope.consulta_estimaciones()
                
            });
        }

    }

   
});