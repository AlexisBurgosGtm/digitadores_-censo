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
    coronavirus :(idContenedor)=>{
        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let strdata = '';
        let tblheader = `<div class="row">
                            <div class="form-group">
                                <input type="text" class="form-control" id="txtFiltrarCoronavirus" placeholder="Escriba para buscar su país...">
                            </div>
                            
                        </div>
                    <table class="table table-responsive table-hover table-striped table-bordered" id="tblCovid">
                        <thead class="bg-trans-gradient text-white">
                            <tr>
                                <td>País</td>
                                <td>Infectados</td>
                                <td>Muertes</td>
                                <td>Recuperados</td>
                                <td>Críticos</td>
                            </tr>
                        </thead><tbody>`;
        let tblfooter = `</tbody></table>`

        axios.get('https://coronavirus-19-api.herokuapp.com/countries')
        .then((response) => {
            console.log(response)
            const data = response.data;
            
            data.map((rows)=>{
                
                    strdata = strdata + `<tr>
                                <td>${rows.country}</td>
                                <td>${rows.cases}</td>
                                <td>${rows.deaths}</td>
                                <td>${rows.recovered}</td>
                                <td>${rows.critical}</td>
                            </tr>`
            })
            
                  
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            strdata = '';
        })
        .then(()=>{
            container.innerHTML = tblheader + strdata + tblfooter;

            let txtFiltrarCoronavirus = document.getElementById('txtFiltrarCoronavirus');
            txtFiltrarCoronavirus.addEventListener('keyup',()=>{
                funciones.crearBusquedaTabla('tblCovid','txtFiltrarCoronavirus');
            });
        })

        
        
        
    },
    empleadosLogin : (sucursal,user,pass)=>{
        return new Promise((resolve,reject)=>{
            axios.post('/empleados/login', {
                app:GlobalSistema,
                codsucursal: sucursal,
                user:user,
                pass:pass       
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
    repartidorMapaEmbarque: async(embarque,idContenedor,idLbTotal)=>{

        let container = document.getElementById(idContenedor);
        container.innerHTML = GlobalLoader;
        
        let lbTotal = document.getElementById(idLbTotal);
        lbTotal.innerText = '---';

        let tbl = `<div class="mapcontainer" id="mapcontainer"></div>`;        
        
        container.innerHTML = tbl;
        
        let mapcargado = 0;

        axios.post('/repartidor/mapaembarque', {
            sucursal: GlobalCodSucursal,
            embarque:embarque
        })
        .then((response) => {
            const data = response.data.recordset;
            let total =0;
            data.map((rows)=>{
                total = total + Number(rows.IMPORTE);
                    if(mapcargado==0){
                        map = Lmap(rows.LAT, rows.LONG, rows.CLIENTE, rows.IMPORTE);
                        mapcargado = 1;
                    }else{
                        L.marker([rows.LAT, rows.LONG])
                        .addTo(map)
                        .bindPopup(`${rows.CLIENTE} - ${funciones.setMoneda(rows.IMPORTE,'Q ')}<br><small>${rows.DIRECCION},${rows.MUNICIPIO}</small><br><small>${rows.VENDEDOR}</small>` )   
                    }
            })
            //container.innerHTML = tbl;
            lbTotal.innerText = funciones.setMoneda(total,'Q ');
        }, (error) => {
            funciones.AvisoError('Error en la solicitud');
            container.innerHTML = '';
            lbTotal.innerText = 'Q 0.00';
        });
           
    }
}
