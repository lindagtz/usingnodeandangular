var app = angular.module('Prov', []);
app.controller('Trabajo1', function ($scope, $http) {
    $scope.nombre1="'cero'";
    $scope.nombre="";
    $scope.apellidos="";
    $scope.empresa="";
    $scope.id_proveedor_editar="";
    $scope.id_proveedor_eliminar="";
    $scope.nombreEdit= "";
    $scope.apellidosEdit= "";
    $scope.empresaEdit= "";
 
    


    $scope.consulta_proveedor=function(){
        $http({
            url: "api/buscar_proveedor",
            method: "post",
            params: {},
            //
        }).then(function successCallback(result){
            $scope.proveedor_consulta= result.data['resultado_consulta'];
            console.log($scope.proveedor_consulta);
        
        })
    }
    $scope.consulta_proveedor();



    $scope.confirma_edicion=function(){
     //validar que los campos no esten vacios
     //alert('id '+$scope.id_proveedor_editar)

        if($scope.id_proveedor_editar){
            $http({
                url: "api/confirmar_edicion_proveedor",
                method: "put",
                params: {id_proveedor:$scope.id_proveedor_editar,nombre:$scope.nombreEdit,apellidos:$scope.apellidosEdit, empresa: $scope.empresaEdit},
                //
            }).then(function successCallback(result){
                console.log('confirmando actu')
                if(result.data['check']){
                   // alert('sget')
                   $scope.MensajeActualizado= result.data['resultado_consulta'];
                   $('#cierramodal' ).click()
                  // alert('si se actualizo')
                    $scope.id_proveedor_editar="";
                    $scope.nombreEdit="";
                    $scope.apellidosEdit="";
                    $scope.empresaEdit= "";
               
                    $scope.consulta_proveedor()
                }else{
                alert(result.data['message'], "Se actualizo perfectamente");

            }
            }) 
        }else{

        }
    }
    //
    $scope.mostrarEdicion=function(id_proveedor){
       // alert(id_proveedor)
        $http({
            url: "api/mostrar_edicion_proveedor",
            method: "post",
            params: {id_proveedor:id_proveedor},
            //
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.nombreEdit= result.data['nombre'];
                $scope.apellidosEdit= result.data['apellidos'];
                $scope.empresaEdit= result.data['empresa'];
        

                $scope.id_proveedor_editar=result.data['id_proveedor'];
                //alert($scope.id_proveedor_editar)
            }else{
                $scope.errorEdicion=result.data['message']
               // alert($scope.id_proveedor_editar)

            }
        })
    }
    //

    $scope.mostrarEliminar=function(id_proveedor_eliminar){
       //alert(id_proveedor_eliminar)
        $http({
            url: "api/mostrar_edicion_proveedor",
            method: "post",
            params: {id_proveedor:id_proveedor_eliminar}
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.nombreEdit= result.data['nombre'];
                $scope.apellidosEdit= result.data['apellidos'];
                $scope.empresaEdit= result.data['empresa'];
              
                
                $scope.id_proveedor_eliminar=result.data['id_proveedor'];
               // alert(id_proveedor_eliminar);
            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }

    //eliminar lendabeybys
    $scope.confirma_delete=function(id_proveedor_eliminar){
       //alert('id:  '+$scope.id_proveedor_eliminar)
        if($scope.id_proveedor_eliminar){
            $http({
                
                url: "api/confirmar_delete_proveedor",
                method: "delete",
                params: {id_proveedor:$scope.id_proveedor_eliminar}
               
            }).then(function successCallback(result){
              //  alert('aqui')
                if(result.data['check']){
                   $scope.MensajeBorrar= result.data['resultado_consulta'];
                   $('#modal-container-221607' ).click()
                  // alert('se borro')
                    $scope.id_proveedor_eliminar="";
                    $scope.consulta_proveedor()
                }else{
                //alert(result.data['message'], "Se borro perfectamente");
            }
            }) 
        }else{

        }
    }


    $scope.Regproveedor=function(){
        console.log('estamos aqui')
        
        
        if($scope.nombre==""|| $scope.apellidos=="" || $scope.empresa==""){
            $scope.ErrorRegistroproveedor=true;
        }else{
            $scope.ErrorRegistroproveedor=false;
            $http({
                url: "api/registra_proveedor",
                method: "post",
                params: {nombre:$scope.nombre, apellidos:$scope.apellidos, empresa: $scope.empresa},
            }).then(function successCallback(result) {
                $scope.RegistroExitoso= result.data;
                $scope.consulta_proveedor();
                
            });
        }

    }
});