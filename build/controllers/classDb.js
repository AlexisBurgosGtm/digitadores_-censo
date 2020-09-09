// inicializa indexDb
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    if (!window.indexedDB) {window.alert("Lo siento pero su Teléfono no soporta el guardado de Datos");}

    if (navigator.storage && navigator.storage.persist)
        navigator.storage.persist()
        .then(function(persistent){
            if (persistent){
                console.log("Almacenamiento Persistente");
            }else{
              console.log("Almacenamiento NO Persistente");
          }});
              
var DbConnection;
window.onload = function () {
    console.log('inicializando db local...')
    initiateDb();
};
//nombre de la base de datos
const DbName = "mercadosefectivoscenso";

function initiateDb() {
    
    JsStore.isDbExist(DbName, function (isExist) {
        if (isExist) {
            DbConnection = new JsStore.Instance(DbName);
            console.log('se ha inicializado la db')
        } else {

            var tbl = getTbl();
            DbConnection = new JsStore.Instance().createDb(tbl);
            console.log('db local instalada exitosamente...')
        }
    });
};

// define las tablas de la base de datos
function getTbl() {
    //TABLA VENTAS TEMPORAL
    var tempcenso = {
        Name: "tempcenso",
        Columns: [
            { Name: "ID", PrimaryKey: true, AutoIncrement: true},
            { Name: "CODSUCURSAL", DataType: "string" },
            { Name: "CODVEN", DataType: "number" },
            { Name: "FECHA", DataType: "string" },
            { Name: "CODCLIE", DataType: "number" },
            { Name: "NITCLIE", DataType: "string" },
            { Name: "TIPONEGOCIO", DataType: "string"},
            { Name: "NEGOCIO", DataType: "string"},
            { Name: "NOMCLIE", DataType: "string"},
            { Name: "REFERENCIA", DataType: "string"},
            { Name: "CODMUNI", DataType: "string"},
            { Name: "CODDEPTO", DataType: "string"},
            { Name: "OBS", DataType: "string"},
            { Name: "TELEFONO", DataType: "string"},
            { Name: "VISITA", DataType: "string"},
            { Name: "LAT", DataType: "number" },
            { Name: "LONG", DataType: "number" }
        ]
    };
  
    var DataBase = {
        Name: DbName,
        Tables: [tempcenso]
    }

    return DataBase;
};

let classDb = {
    SelectCenso: (dia,codven,idContainer)=>{
        let contenedor = document.getElementById(idContainer);
        console.log('lectura de tabla tempcenso');

        let tbl = `<div class="table-responsive col-12">
        <table class="table table-responsive table-hover table-striped">
            <thead class="bg-trans-gradient text-white">
                <tr>
                    <td>Código/NIT</td>
                    <td>Cliente/Dirección</td>
                    <td>Teléfono</td>
                    <td></td>
                    <td></td>
                </tr>
            </thead>
            <tbody id="tblListado">`;

        let tblfoot = `</tbody></table></div>`;

        let str = '';
        DbConnection.select({
            From: "tempcenso",
            Where: {
                VISITA: dia,
                CODVEN: Number(codven)
            }
        }, function (clientes) {
            //console.log(clientes);
            clientes.map((rows)=>{
                str +=  `
                <tr class="cursormano border-bottom">
                    <td>${rows.NITCLIE}
                        <br>
                        <small>Código: <b>${rows.ID}</b> </small>
                    </td>

                    <td>${rows.NOMCLIE}
                            <br>
                        <small><b>${rows.TIPONEGOCIO}-${rows.NEGOCIO}</b></small>
                            <br class="border-bottom">
                        <small>${rows.DIRCLIE},${rows.MUNICIPIO}</small>
                    </td>
                        <td>${rows.TELEFONO}
                    </td>
                    <td>
                        <button class="btn btn-warning btn-sm btn-rounded" 
                        onclick="getDataCliente('${rows.ID}','${rows.NITCLIE}','${rows.TIPONEGOCIO}','${rows.NEGOCIO}','${rows.NOMCLIE}','${rows.DIRCLIE}','${rows.REFERENCIA}','${rows.CODMUNI}','${rows.CODDEPTO}','${rows.OBS}','${rows.CODVEN}','${rows.VISITA}','${rows.LAT}','${rows.LONG}','${rows.TELEFONO}')">
                            <i class="fal fa-edit"></i>Edit
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-success btn-sm btn-rounded" onclick="classDb.sendCliente(${rows[0]});">
                            <i class="fal fa-updload"></i>Enviar
                        </button>
                    </td>
                </tr>`
            }, function (error) {
                console.log(error);
                contenedor.innerHTML = error.toString();    
            })
            contenedor.innerHTML = tbl + str + tblfoot;
        });
        
    },
    InsertCliente: (data)=>{  
        console.log(data);

        return new Promise(async(resolve, reject)=>{
            DbConnection = new JsStore.Instance(DbName);
            await DbConnection.insert({Into: "tempcenso",Values: [data]},
            function (rowsAdded) {
                funciones.Aviso('Cliente registrado exitosamente');
                    resolve();        
                }, 
                function (err) {
                        console.log(err);
                        funciones.AvisoError('No se puedo Guardar este Cliente, error de base de datos');
                        reject();
                })
        })
        
        
    },
    EditCliente: (data,id)=>{  
        //console.log(data);

        return new Promise(async(resolve, reject)=>{
          
            DbConnection.update({
                In: "tempcenso",
                Set: data,
                Where: {
                    ID: Number(id)
                }
            }, function (rowsAffected) {
                //alert(rowsAffected + " rows Updated");
                if (rowsAffected > 0) {
                    funciones.Aviso('Cliente Actualizado Exitosamente');
                    resolve();
                }else{
                    reject();
                }
            }, function (error) {
                //alert(error.Message);
                console.log(error.Message)
                reject();
            })


        })
        
        
    },
    DeleteCliente: (id)=>{
        funciones.Confirmacion('¿Está seguro que desea ELIMINAR este cliente?')
            .then((value)=>{
                if(value==true){
                    DbConnection.delete({
                        From: 'censo',
                        Where: {
                            Id: Number(id)
                        }
                    }, function (rowsDeleted) {
                        console.log(rowsDeleted + ' rows deleted');
                        if (rowsDeleted > 0) {
                            document.getElementById(id).remove();
                            classCenso.SelectCensoAll(GlobalEmpnit,GlobalCodven,document.getElementById('tblCenso'));
                            funciones.Aviso("Cliente eliminado con éxito");
                        }
                    }, function (error) {
                        alert(error.Message);
                    })
                }
            })
    },
    DeleteClienteSilent: (id)=>{
        
        DbConnection.delete({
            From: 'tempcenso',
            Where: {
                ID: Number(id)
            }
        }, function (rowsDeleted) {
            console.log(rowsDeleted + ' rows deleted');
            if (rowsDeleted > 0) {
                document.getElementById(id).remove();
                classCenso.SelectCensoAll(GlobalEmpnit,GlobalCodven,document.getElementById('tblCenso'));
                funciones.Aviso("Cliente eliminado con éxito");
            }
        }, function (error) {
            alert(error.Message);
        })
    
    },
    sendCliente: (data)=>{



        /* 
        DbConnection.select({
            From: "tempcenso",
            Where: {
                VISITA: dia,
                CODVEN: Number(codven)
            }
        }, function (clientes) {
            //console.log(clientes);
            clientes.map((rows)=>{
                str +=  ``
            }, function (error) {
                console.log(error);
                contenedor.innerHTML = error.toString();    
            })
            contenedor.innerHTML = tbl + str + tblfoot;
        });
        */
    }
}