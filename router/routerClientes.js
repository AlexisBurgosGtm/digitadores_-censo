const execute = require('./connection');
const express = require('express');
const router = express.Router();

// BUSCA CLIENTE POR NOMBRE
router.get("/buscarcliente", async(req,res)=>{
    const {app,empnit,filtro} = req.query;
        
    let qry ='';

    switch (app) {
        case 'ISC':
            qry = `SELECT ME_Clientes.NITCLIE AS CODCLIE, ME_Clientes.NITFACTURA AS NIT, ME_Clientes.NOMCLIE, ME_Clientes.DIRCLIE, ME_Clientes.CODMUNI AS CODMUNICIPIO, Municipios.DESMUNI AS DESMUNICIPIO, ME_Clientes.CODDEPTO, 
            Departamentos.DESDEPTO, ME_Clientes.LISTA AS PRECIO, 0 AS SALDO, ME_Clientes.LATITUDCLIE AS LAT, ME_Clientes.LONGITUDCLIE AS LONG
        FROM ME_Clientes LEFT OUTER JOIN
            Departamentos ON ME_Clientes.CODDEPTO = Departamentos.CODDEPTO AND ME_Clientes.EMP_NIT = Departamentos.EMP_NIT LEFT OUTER JOIN
            Municipios ON ME_Clientes.EMP_NIT = Municipios.EMP_NIT AND ME_Clientes.CODMUNI = Municipios.CODMUNI
        WHERE (ME_Clientes.EMP_NIT = '${empnit}') AND (ME_Clientes.NOMCLIE LIKE '%${filtro}%')`     
            break;
        case 'COMMUNITY':
            qry = `SELECT CLIENTES.CODCLIENTE AS CODCLIE, CLIENTES.NIT, CLIENTES.NOMBRECLIENTE AS NOMCLIE, CLIENTES.DIRCLIENTE AS DIRCLIE, CLIENTES.CODMUNICIPIO, MUNICIPIOS.DESMUNICIPIO, 
                    DEPARTAMENTOS.DESDEPARTAMENTO AS DESDEPTO, CLIENTES.CALIFICACION AS PRECIO, CLIENTES.SALDO, CLIENTES.LATITUDCLIENTE AS LAT, CLIENTES.LONGITUDCLIENTE AS LONG
                FROM CLIENTES LEFT OUTER JOIN
                    DEPARTAMENTOS ON CLIENTES.CODDEPARTAMENTO = DEPARTAMENTOS.CODDEPARTAMENTO LEFT OUTER JOIN
                    MUNICIPIOS ON CLIENTES.CODMUNICIPIO = MUNICIPIOS.CODMUNICIPIO
                WHERE (CLIENTES.HABILITADO = 'SI') AND (CLIENTES.NOMBRECLIENTE LIKE '%${filtro}%') AND (CLIENTES.EMPNIT = '${empnit}')`  
            break;
    
        default:
            break;
    }
    
    execute.Query(res,qry);

});

// AGREGA UN NUEVO CLIENTE
router.post("/clientenuevo", async(req,res)=>{
    const {app,fecha,codven,empnit,codclie,nitclie,nomclie,nomfac,dirclie,coddepto,codmunicipio,codpais,telclie,emailclie,codbodega,tipoprecio,lat,long} = req.body;
    
    let qry ='';

    switch (app) {
        case 'ISC':
            qry = `INSERT INTO ME_CLIENTES (
                EMP_NIT, NITCLIE, CODCLIE, NOMCLIE, DIRCLIE,
                CODDEPTO, CODMUNI, TELCLIE, EMAILCLIE, TIPOCLIE,
                ACEPTACHEQUE, FECHAINGRESO, NITFACTURA, CODVEN, LIMITECREDITO,
                DIASCREDITO, CODPAIS, NOMFAC, CODBODEGA, DESCUENTO,
                CODTIPOCLIE, COMISION, IMPUESTO1, TEMPORADACREDITO, TEMPORADADIAS,
                VENTADOLARES, VENTAEXPORTA, MONTOIVARET, PORIVARET, CODTIPOFP,
                UTILIZAPUNTOS, TIPOPUNTOS, NCUOTAS, VARIASLISTAS, DIASPRIMERCUOTA,
                DIASCUOTAS, CALCULOCUOTAS, CLIE_CARGOAUT, TIPO_CARGOAUT, LATITUDCLIE, LONGITUDCLIE,
                LATITUD, LONGITUD
            )VALUES(
                '${empnit}','${codclie}',0,'${nomclie}','${dirclie}',
                '${coddepto}','${codmunicipio}','${telclie}','${emailclie}','${tipoprecio}',
                0,'${fecha}','${nitclie}','${codven}',0,
                30,'${codpais}','${nomfac}','${codbodega}',0,
                'A',0,0,0,0,
                0,0,0,0,0,
                0,'NUNCA',0,0,0,
                0,0,0,0,0,0,
                '${lat}','${long}'
            )`         
            break;
        case 'COMMUNITY':
            qry = `INSERT INTO CLIENTES 
            (EMPNIT,DPI,NIT,NOMBRECLIENTE,DIRCLIENTE,CODMUNICIPIO,CODDEPARTAMENTO,TELEFONOCLIENTE,EMAILCLIENTE,ESTADOCIVIL,SEXO,FECHANACIMIENTOCLIENTE,LATITUDCLIENTE,LONGITUDCLIENTE,CATEGORIA,CIUDADANIA,OCUPACION,CODRUTA,CALIFICACION,SALDO,FECHAINICIO,HABILITADO,DIAVISITA,LIMITECREDITO,DIASCREDITO,PROVINCIA) 
    VALUES ('${empnit}','SN','${nitclie}','${nomclie}','${dirclie}',${codmunicipio},${coddepto},'${telclie}','${emailclie}','SOLTERO-A','OTROS','${fecha}','${lat}','${long}','${tipoprecio}','GTM','COMERCIANTE',1,'REGULAR',0,'${fecha}','SI','SN',0,0,'SN')`
            break;
    
        default:
            break;
    };
    execute.Query(res,qry);

});

//LISTADO DE MUNICIPIOS EN EL SISTEMA
router.get("/municipios", async(req,res)=>{
    const {app,empnit} = req.query;
    let qry ='';

    switch (app) {
        case 'ISC':
            qry = `SELECT CODMUNI AS CODMUNICIPIO, DESMUNI AS DESMUNICIPIO FROM ME_MUNICIPIOS WHERE EMP_NIT='${empnit}' ORDER BY PRIMERO DESC`         
            break;
        case 'COMMUNITY':
            qry = `SELECT CODMUNICIPIO, DESMUNICIPIO FROM MUNICIPIOS`;
            break;
    
        default:
            break;
    };
    execute.Query(res,qry);
});

//LISTADO DE MUNICIPIOS EN EL SISTEMA
router.get("/departamentos", async(req,res)=>{
    const {app,empnit} = req.query;
    let qry ='';

    switch (app) {
        case 'ISC':
            qry = `SELECT CODDEPTO, DESDEPTO FROM ME_DEPARTAMENTOS WHERE EMP_NIT='${empnit}' ORDER BY PRIMERO DESC`         
            break;
        case 'COMMUNITY':
            qry = `SELECT CODDEPARTAMENTO AS CODDEPTO, DESDEPARTAMENTO AS DESDEPTO FROM DEPARTAMENTOS`;
            break;
    
        default:
            break;
    };
    execute.Query(res,qry);
});


module.exports = router;
