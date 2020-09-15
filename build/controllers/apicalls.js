let api = {
    runqry: (qry,st)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/noticias/qry',{qry:qry,status:st})
            .then((response) => {
                //console.log(response.data.recordset);
               resolve(response.data);             
            }, (error) => {
                reject();
            });


        })
        
    },
    empleadosLogin : (sucursal,user,pass)=>{
        return new Promise((resolve,reject)=>{
            axios.get('/empleados/login', {
                params: {
                    app:GlobalSistema,
                    codsucursal: sucursal,
                    user:user,
                    pass:pass     
                }  
            })
            .then((response) => {
                const data = response.data.recordset;
                if(response.data.rowsAffected[0]==1){
                    data.map((rows)=>{
                        if(rows.USUARIO==user){
                            GlobalCodUsuario = rows.CODIGO;
                            GlobalUsuario = rows.USUARIO;
                            GlobalTipoUsuario = rows.TIPO;
                            GlobalCoddoc= rows.CODDOC;
                            GlobalCodSucursal = sucursal;
                            GlobalSistema = sucursal;
                            
                            classNavegar.inicio(GlobalTipoUsuario);        
                        }        
                    })
                    resolve();
                }else{
                    GlobalCodUsuario = 9999
                    GlobalUsuario = '';
                    GlobalTipoUsuario = '';
                    GlobalCoddoc= '';
                    funciones.AvisoError('Usuario o Contraseña incorrectos, intente seleccionando la sucursal a la que pertenece');
                    reject();
                }
            }, (error) => {
                funciones.AvisoError('Error en la solicitud');
                reject();
            });

        })
        

    },
    noticiaslistado : (sucursal,user,idContenedor)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;

        let str = '';

        axios.get('/noticias/listado', {
            sucursal: sucursal,
            user:user
        })
        .then((response) => {
            const data = response.data.recordset;
            data.map((rows)=>{
                let classprioridad ='';
                switch (rows.PRIORIDAD) {
                    case 'ALTA':
                        classprioridad = 'bg-danger';
                        break;
                    case 'MEDIA':
                        classprioridad = 'bg-warning';
                        break;
                    case 'BAJA':
                        classprioridad = 'bg-info';
                         break;               
                    default:
                        break;
                }
                str = str + `
                        <div class="card">
                            <div class="card-header ${classprioridad}">
                                <label class="text-white">${rows.FECHA.toString().replace('T00:00:00.000Z','')}</label>
                            </div>
                            <div class="card-body">
                                <label>${rows.NOTICIA}</label>
                            </div>
                            <div class="card-footer text-right">
                                <label><i>${rows.USUARIO}</i></label>
                            </div>
                        </div>`        
            })
            container.innerHTML = str;

        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = 'No se pudo cargar la lista';
        });

    },
    comboVendedores : (sucursal,idContainer)=>{
        let container = document.getElementById(idContainer);
        let str = '';

        return new Promise((resolve,reject)=>{
            axios.get('/empleados/vendedores',  {
                params: {
                    sucursal: sucursal,
                    user:GlobalUsuario
                }
            })
            .then((response) => {
                const data = response.data.recordset;
                data.map((rows)=>{
                    str = str + `<option value='${rows.CODIGO}'>
                                    ${rows.NOMBRE}
                                   Tel:<b class="text-danger">${rows.TELEFONO}</b>
                                 </option>
                                `        
                })
                container.innerHTML = str;
                resolve();
            }, (error) => {
                funciones.AvisoError('Error en la solicitud');
                container.innerHTML = '';
                reject();
            });
        })
    }
}
