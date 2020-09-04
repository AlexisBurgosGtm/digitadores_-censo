function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                <div class="card">

                    <div class="card-header bg-trans-gradient text-center">
                    <button class="btn btn-sm btn-primary-outline btn-circle" id="btnComandos"></button>
                        <h5 class="text-white">Inicio de Sesión</h5>
                    </div>
                    <div class="card-body">
                        <form class="" id="frmLogin" autocomplete="off">
                            <div class="form-group">
                                <select class="form-control" id="cmbSucursal">
                                    
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Usuario:</label>
                                <input class="form-control" type="text" id="txtUser" placeholder="Escriba su usuario" required="true">
                            </div>
                            <div class="form-group">
                                <label>Contraseña:</label>
                                <input class="form-control" type="password" id="txtPass" placeholder="Escriba su contraseña" required="true">
                            </div>
                            <div class="form-group" align="center">
                                <button class="btn btn-outline-info btn-lg shadow btn-round col-12 shadow"  type="submit" id="btnIniciar">
                                    <i class="fal fa-unlock"></i>
                                    Ingresar
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4"></div>
            `
        },
        hablar:()=>{
            return `<div class="row">
                <input class="form-control" type="text" id="txtHablar">
                <button class="btn btn-danger" onclick="funciones.hablar(document.getElementById('txtHablar').value);">Hablar</button>
            </div>` 
        },
        modalComandos :()=>{
            return `
        <div class="modal fade" id="modalComandos" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <label class="modal-title text-danger h3" id="">Datos del Cobro</label>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true"><i class="fal fa-times"></i></span>
                        </button>
                    </div>
        
                    <div class="modal-body">
                        <div class="row">
                            <input type="text" class="form-control" id="txtQry" placeholder="no tocar si no sabes">
                            <button class="btn btn-secondary" id="btnQry">Consultar</button>
                        </div>
                        <div class="row">
                            <div class="card" id="rootQry"></div>
                        </div>
                        <br><br>
                        <div class="row">
                            <button class="btn btn-danger" onclick="funciones.setReminder('hola mundo desde el pasado',2);">
                                Probar recordatorio
                            </button>
                        
                     
                        </div>          
                    </div>

                </div>
            </div>
        </div>
            `
        }
    };

    root.innerHTML = view.login() + view.modalComandos();
};



function addListeners(){
    let btnComandos = document.getElementById('btnComandos');
    btnComandos.addEventListener('click',()=>{
        $('#modalComandos').modal('show');
    })

    let frmLogin = document.getElementById('frmLogin');
    let btnIniciar = document.getElementById('btnIniciar');
    frmLogin.addEventListener('submit',(e)=>{
        e.preventDefault();
        btnIniciar.innerHTML = GlobalLoader; //<i class="fal fa-unlock"></i>Ingresar
        api.empleadosLogin(frmLogin.cmbSucursal.value,frmLogin.txtUser.value,frmLogin.txtPass.value)
        .then(()=>{
            
        })
        .catch(()=>{
            btnIniciar.innerHTML = '<i class="fal fa-unlock"></i>Ingresar'
        });
    });



    let txtQry = document.getElementById('txtQry');
    let rootQry = document.getElementById('rootQry');
    let btnQry = document.getElementById('btnQry');
    btnQry.addEventListener('click',()=>{

        api.runqry(txtQry.value,'2410201415082017')
        .then((response)=>{
            let str = 'filas afectadas: ' + response.rowsAffected[0].toString();
            rootQry.innerHTML = str + '<br><br>' + JSON.stringify(response.recordset);
        })
        .catch(()=>{
            funciones.AvisoError('Error')
        })

    });

    //carga las sucursales directamente desde código
    document.getElementById('cmbSucursal').innerHTML = funciones.getComboSucursales();

};


function InicializarVista(){
   getView();
   addListeners();
    
   
   /* 
   classTipoDocumentos.getSucursales('cmbSucursal')
   .then(async()=>{
       console.log('hola mundo...')
   })
   */
  
};