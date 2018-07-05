var app = angular.module('Obras', []);
app.controller('Trabajo1', function ($scope, $http) {
 
    $scope.nombreEdit= "";
    $scope.apellidosEdit= "";
    $scope.tipoEdit= "";
    $scope.correoEdit= "";
    $scope.usuarioEdit= "";
   
   


    $scope.consulta_obras=function(){
        $http({
            url: "api/buscar_obras",
            method: "post",
            params: {},
            //
        }).then(function successCallback(result){
            $scope.obras_consulta= result.data['resultado_consulta'];
            console.log($scope.obras_consulta);
        
        })
    }
    $scope.consulta_obras();

 //primera prueba de obras para importaaar
 $scope.importExcel=function(){
   // alert('entra')

    $http({
        url: "api/import",
        method: "get",
        params: {},
        //
    }).then(function successCallback(result){
        console.log('se importo');
       // alert('se importo');
        $scope.consulta_obras();

    
    });
}


    $scope.confirma_edicion=function(){
     //validar que los campos no esten vacios
  // alert('id '+$scope.id_obra_editar)

        if($scope.id_obra_editar){
            $http({
                url: "api/confirmar_edicion_obra",
                method: "put",
                params: {id_obra:$scope.id_obra_editar,nombre:$scope.nombreEdit,precio_contrato:$scope.precio_contratoEdit, 
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
                    $scope.id_obra_editar="";
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


                    
                    $scope.consulta_obras()
                }else{
                //$.alert(result.data['message'], "Se actualizo perfectamente");

            }
            }) 
        }else{

        }
    }
    //
    $scope.mostrarEdicion=function(id_obra){
       //alert(id_obra)
        $http({
            url: "api/mostrar_edicion_obra",
            method: "post",
            params: {id_obra:id_obra},
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



                $scope.id_obra_editar=result.data['id_obra'];

            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }
    //

    $scope.mostrarEliminar=function(id_obra_eliminar){
       // alert(id_obra_eliminar)
        $http({
            url: "api/mostrar_edicion_obra",
            method: "post",
            params: {id_obra:id_obra_eliminar}
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
                
                $scope.id_obra_eliminar=result.data['id_obra']
            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }

    //eliminar lendabeybys
    $scope.confirma_delete=function(id_obra_eliminar){
      //  alert('id:  '+$scope.id_obra_eliminar)
        if($scope.id_obra_eliminar){
            $http({
                url: "api/confirmar_delete_obra",
                method: "delete",
                params: {id_obra:$scope.id_obra_eliminar}
            }).then(function successCallback(result){
                if(result.data['check']){
                   $scope.MensajeBorrar= result.data['resultado_consulta'];
                   $('#modal-container-221607' ).click()
                   //alert('se borro')
                    $scope.id_obra_eliminar="";
                    $scope.consulta_obras();
                }else{
               // $.alert(result.data['message'], "Se borro perfectamente");
            }
            }) 
        }else{

        }
    }


    $scope.Regobra=function(){
        console.log('estamos aqui');
        
        
        if($scope.nombre==""|| $scope.precio_contrato=="" || $scope.fecha_inicio=="" || $scope.fecha_limite=="" || $scope.porcentaje_anticipo=="" || $scope.direccion==""
        || $scope.idUsuario=="" || $scope.anticipoPagado==""){
            $scope.ErrorRegistroobra=true;
        }else{
            $scope.ErrorRegistroobra=false;
            $http({
                url: "api/registra_obra",
                method: "post",
                params: {nombre:$scope.nombre, precio_contrato:$scope.precio_contrato, fecha_inicio: $scope.fecha_inicio, fecha_limite: $scope.fecha_limite, 
                porcentaje_anticipo: $scope.porcentaje_anticipo, direccion: $scope.direccion, idUsuario: $scope.idUsuario, anticipoPagado: $scope.anticipoPagado},
            }).then(function successCallback(result) {
                $scope.RegistroExitoso= result.data;
                $scope.consulta_obras()
                
            });
        }

    }
});