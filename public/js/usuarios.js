var app = angular.module('Prueba', []);
app.controller('Trabajo1', function ($scope, $http) {
    $scope.nombre1="'cero'";
    $scope.nombre="";
    $scope.apellidos="";
    $scope.id_usuario_editar="";
    $scope.id_usuario_eliminar="";
    $scope.nombreEdit= "";
    $scope.apellidosEdit= "";
    $scope.tipoEdit= "";
    $scope.correoEdit= "";
    $scope.usuarioEdit= "";
    


    $scope.consulta_usuarios=function(){
        $http({
            url: "api/buscar_usuarios",
            method: "post",
            params: {},
            //
        }).then(function successCallback(result){
            $scope.usuarios_consulta= result.data['resultado_consulta'];
            console.log($scope.usuarios_consulta);
        
        })
    }
    $scope.consulta_usuarios();



    $scope.confirma_edicion=function(){
     //validar que los campos no esten vacios
    // alert('id '+$scope.id_usuario_editar)

        if($scope.id_usuario_editar){
            $http({
                url: "api/confirmar_edicion_usuario",
                method: "put",
                params: {id_usuario:$scope.id_usuario_editar,nombre:$scope.nombreEdit,apellidos:$scope.apellidosEdit, 
                tipo: $scope.tipoEdit, correo: $scope.correoEdit, usuario: $scope.usuarioEdit},
                //
            }).then(function successCallback(result){
                console.log('confirmando actu')
                if(result.data['check']){
                   $scope.MensajeActualizado= result.data['resultado_consulta'];
                   $('#cierramodal' ).click()
                  // alert('si se actualizo')
                    $scope.id_usuario_editar="";
                    $scope.nombreEdit="";
                    $scope.apellidosEdit="";
                    $scope.tipoEdit= "";
                    $scope.correoEdit= "";
                    $scope.usuarioEdit= "";
                    $scope.consulta_usuarios()
                }else{
                //alert(result.data['message'], "Se actualizo perfectamente");

            }
            }) 
        }else{

        }
    }
    //
    $scope.mostrarEdicion=function(id_usuario){
       // alert(id_usuario)
        $http({
            url: "api/mostrar_edicion_usuario",
            method: "post",
            params: {id_usuario:id_usuario},
            //
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.nombreEdit= result.data['nombre'];
                $scope.apellidosEdit= result.data['apellidos'];
                $scope.tipoEdit= result.data['tipo'];
                $scope.correoEdit= result.data['correo'];
                $scope.usuarioEdit= result.data['usuario'];

                $scope.id_usuario_editar=result.data['id_usuario'];
               // alert($scope.correo)

            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }
    //

    $scope.mostrarEliminar=function(id_usuario_eliminar){
       // alert(id_usuario_eliminar)
        $http({
            url: "api/mostrar_edicion_usuario",
            method: "post",
            params: {id_usuario:id_usuario_eliminar}
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.nombreEdit= result.data['nombre'];
                $scope.apellidosEdit= result.data['apellidos'];
                $scope.tipoEdit= result.data['tipo'];
                $scope.correoEdit= result.data['correo'];
                $scope.usuarioEdit= result.data['usuario'];
                
                $scope.id_usuario_eliminar=result.data['id_usuario']
                //alert($scope.correoEdit)
            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }

    //eliminar lendabeybys
    $scope.confirma_delete=function(id_usuario_eliminar){
      //  alert('id:  '+$scope.id_usuario_eliminar)
        if($scope.id_usuario_eliminar){
            $http({
                url: "api/confirmar_delete_usuario",
                method: "delete",
                params: {id_usuario:$scope.id_usuario_eliminar}
            }).then(function successCallback(result){
                if(result.data['check']){
                   $scope.MensajeBorrar= result.data['resultado_consulta'];
                   $('#modal-container-221607' ).click()
                   //alert('se borro')
                    $scope.id_usuario_eliminar="";
                    $scope.consulta_usuarios()
                }else{
            //alert(result.data['message'], "Se borro perfectamente");
            }
            }) 
        }else{

        }
    }


    $scope.Regusuario=function(){
        console.log('estamos aqui')
        
        
        if($scope.nombre==""|| $scope.apellidos=="" || $scope.password=="" || $scope.tipo=="" || $scope.correo=="" || $scope.usuario==""){
            $scope.ErrorRegistrousuario=true;
        }else{
            $scope.ErrorRegistrousuario=false;
            $http({
                url: "api/registra_usuarioc",
                method: "post",
                params: {nombre:$scope.nombre, apellidos:$scope.apellidos, password: $scope.password, tipo: $scope.tipo, 
                correo: $scope.correo, usuario: $scope.usuario},
            }).then(function successCallback(result) {
                $scope.RegistroExitoso= result.data;
                $scope.consulta_usuarios()
                
            });
        }

    }
});