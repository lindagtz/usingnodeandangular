var app = angular.module('Cuentabancaria', []);
app.controller('Trabajo1', function ($scope, $http) {
    $scope.noCuentaEdit= "";
    $scope.bancoEdit= "";
    $scope.id_cuentabancaria_editar="";
 

    $scope.consulta_cuentabancaria=function(){
        $http({
            url: "api/buscar_cb",
            method: "post",
            params: {},
            //
        }).then(function successCallback(result){
            $scope.cb_consulta= result.data['resultado_consulta'];
            console.log($scope.cb_consulta);
        
        })
    }
    $scope.consulta_cuentabancaria();


    $scope.Regcuentabancaria=function(){
       

        
        
        if($scope.noCuenta==""|| $scope.banco=="" ){
            $scope.ErrorRegistrocuentabancaria=true;
        }else{
            $scope.ErrorRegistrocuentabancaria=false;
            $http({
                url: "api/registra_cuentabancaria",
                method: "post",
                params: {noCuenta:$scope.noCuenta, banco:$scope.banco},
            }).then(function successCallback(result) {
                $scope.RegistroExitoso= result.data;
                $scope.consulta_cuentabancaria();
                
            });
        }

    }



    $scope.confirma_edicioncb=function(){
     //validar que los campos no esten vacios
    alert('id '+$scope.id_cuentabancaria_editar)

        if($scope.id_cuentabancaria_editar){
            $http({
                url: "api/confirmar_edicion_cb",
                method: "put",
                params: {idCuentabancaria:$scope.id_cuentabancaria_editar,noCuenta:$scope.noCuentaEdit,banco:$scope.bancoEdit
                },
                //
            }).then(function successCallback(result){
                console.log('confirmando actu')
                if(result.data['check']){
                   $scope.MensajeActualizado= result.data['resultado_consulta'];
                   $('#cierramodal' ).click()
                   alert('si se actualizo')
                    $scope.id_cuentabancaria_editar="";
                    $scope.noCuentaEdit="";
                    $scope.bancoEdit="";
                   


                    
                    $scope.consulta_cuentabancaria()
                }else{
                //$.alert(result.data['message'], "Se actualizo perfectamente");

            }
            }) 
        }else{

        }
    }
    //
    $scope.mostrarEdicion=function(id_cuentabancaria){
       //alert(id_cuentabancaria)
        $http({
            url: "api/mostrar_edicion_cuentabancaria",
            method: "post",
            params: {id_cuentabancaria:id_cuentabancaria},
            //
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.noCuentaEdit= result.data['noCuenta'];
                $scope.bancoEdit= result.data['banco'];
                $scope.id_cuentabancaria_editar=result.data['id_cuentabancaria'];

            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }
    //

    $scope.mostrarEliminar=function(id_cuentabancaria_eliminar){
       // alert(id_cuentabancaria_eliminar)
        $http({
            url: "api/mostrar_edicion_cuentabancaria",
            method: "post",
            params: {id_cuentabancaria:id_cuentabancaria_eliminar}
        }).then(function successCallback(result){
            if(result.data['message']==true){
                $scope.noCuentaEdit= result.data['noCuenta'];
                $scope.bancoEdit= result.data['banco'];
                
                $scope.id_cuentabancaria_eliminar=result.data['id_cuentabancaria']
            }else{
                $scope.errorEdicion=result.data['message']
            }
        })
    }

    //eliminar lendabeybys
    $scope.confirma_delete=function(id_cuentabancaria_eliminar){
      //  alert('id:  '+$scope.id_cuentabancaria_eliminar)
        if($scope.id_cuentabancaria_eliminar){
            $http({
                url: "api/confirmar_delete_cuentabancaria",
                method: "delete",
                params: {id_cuentabancaria:$scope.id_cuentabancaria_eliminar}
            }).then(function successCallback(result){
                if(result.data['check']){
                   $scope.MensajeBorrar= result.data['resultado_consulta'];
                   $('#modal-container-221607' ).click()
                   //alert('se borro')
                    $scope.id_cuentabancaria_eliminar="";
                    $scope.consulta_cuentabancaria();
                }else{
               // $.alert(result.data['message'], "Se borro perfectamente");
            }
            }) 
        }else{

        }
    }



});