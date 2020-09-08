let classNavegar = {
    login : async()=>{
        divUsuario.innerText = 'DESCONECTADO';
        lbTipo.innerText = "Inicie sesión";
        rootMenu.innerHTML = '';
        GlobalCoddoc = '';
        GlobalCodUsuario=99999;
        GlobalUsuario = '';
        GlobalTipoUsuario ='';
            funciones.loadScript('../views/login/index.js','root')
            .then(()=>{
                GlobalSelectedForm='LOGIN';
                InicializarVista();
            })
        
    },
    inicio : async(tipousuario)=>{
        divUsuario.innerText = GlobalUsuario;
        lbTipo.innerText = GlobalTipoUsuario;

        switch (tipousuario) {
            case 'VENDEDOR':
                classNavegar.inicioVendedor();
                break;

            case 'SUPERVISOR':
                classNavegar.inicioSupervisor();
                break;
            
            case 'DIGITADOR':
                classNavegar.inicioDigitador();
                break;
            
            case 'REPARTIDOR':
                classNavegar.inicioRepartidor();
                break;
            case 'GERENTE':
                classNavegar.inicioGerente();                        
                break;
            default:
                break;
        };
    },
    inicioVendedor : async ()=>{
        let strMenu =   `
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorClientes">
                                <span>VENDER</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorReparto">
                                <span>REPARTO</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorCenso">
                                <span>CENSO</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorPedidos">
                                <span>LOGRO DIA</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorLogro">
                                <span>LOGRO MES</span>
                            </a>
                            <a class="dropdown-item" data-toggle="dropdown" id="btnMenuVendedorNoticias">
                                <span>NOTICIAS</span>
                            </a>
                            `
                rootMenu.innerHTML = strMenu;

                funciones.loadScript('../views/vendedor/vendedor.js','root')
                .then(async()=>{
                    GlobalSelectedForm='INICIO';
                    InicializarVista();
                    
                      // handlers del menu
                    let btnMenuVendedorClientes = document.getElementById('btnMenuVendedorClientes');
                    btnMenuVendedorClientes.addEventListener('click',()=>{
                        classNavegar.inicio('VENDEDOR');
                    });
                    let btnMenuVendedorReparto = document.getElementById('btnMenuVendedorReparto');
                    btnMenuVendedorReparto.addEventListener('click',()=>{
                        classNavegar.vendedorReparto();
                    });
                    let btnMenuVendedorCenso = document.getElementById('btnMenuVendedorCenso');
                    btnMenuVendedorCenso.addEventListener('click',()=>{
                        classNavegar.vendedorCenso();
                    });
                    let btnMenuVendedorPedidos = document.getElementById('btnMenuVendedorPedidos');
                    btnMenuVendedorPedidos.addEventListener('click',()=>{
                        classNavegar.pedidos();
                    });
                    let btnMenuVendedorLogro = document.getElementById('btnMenuVendedorLogro');
                    btnMenuVendedorLogro.addEventListener('click',()=>{
                        classNavegar.logrovendedor();
                    });
                    let btnMenuVendedorNoticias = document.getElementById('btnMenuVendedorNoticias');
                    btnMenuVendedorNoticias.addEventListener('click',()=>{
                        classNavegar.noticias();
                    });
                    //actualiza la ubicación del empleado
                    await classEmpleados.updateMyLocation();
                })          
    },
    vendedorCenso: async()=>{
        
        funciones.loadScript('./views/vendedor/censo.js','root')
        .then(()=>{
            GlobalSelectedForm ='VENDEDORCENSO';
            iniciarVistaVendedorCenso();
        })
      
    },
    noticias: ()=>{
        funciones.loadScript('../views/noticias/index.js','root')
        .then(()=>{
            GlobalSelectedForm='NOTICIAS';
            inicializarVistaNoticias();
        })
    }
}