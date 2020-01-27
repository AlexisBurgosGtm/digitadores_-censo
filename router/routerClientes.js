const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post("/listavendedor", async(req,res)=>{

    const {app,sucursal,codven,dia}  = req.body;

    let qry = '';
    qry = `SELECT ME_Clientes.NITCLIE AS CODIGO, ME_Clientes.NITFACTURA AS NIT, ME_Clientes.NOMCLIE, ME_Clientes.DIRCLIE, ME_Municipios.DESMUNI, ME_Clientes.TELCLIE AS TELEFONO, ME_Clientes.LATITUD AS LAT, 
            ME_Clientes.LONGITUD AS LONG
            FROM ME_Clientes LEFT OUTER JOIN
            ME_Municipios ON ME_Clientes.CODSUCURSAL = ME_Municipios.CODSUCURSAL AND ME_Clientes.EMP_NIT = ME_Municipios.EMP_NIT AND ME_Clientes.CODMUNI = ME_Municipios.CODMUNI
            WHERE (ME_Clientes.CODSUCURSAL = '${sucursal}') AND (ME_Clientes.VISITA = '${dia}') AND (ME_Clientes.CODVEN = ${codven})`
    
    execute.Query(res,qry);

})


// BUSCA CLIENTE POR NOMBRE
router.get("/buscarcliente", async(req,res)=>{
    const {app,empnit,filtro} = req.query;
        
    let qry ='';

            qry = `SELECT ME_Clientes.NITCLIE AS CODCLIE, ME_Clientes.NITFACTURA AS NIT, ME_Clientes.NOMCLIE, ME_Clientes.DIRCLIE, ME_Clientes.CODMUNI AS CODMUNICIPIO, ME_Municipios.DESMUNI AS DESMUNICIPIO, ME_Clientes.CODDEPTO, 
            ME_Departamentos.DESDEPTO, ME_Clientes.LISTA AS PRECIO, 0 AS SALDO, ME_Clientes.LATITUDCLIE AS LAT, ME_Clientes.LONGITUDCLIE AS LONG
        FROM ME_Clientes LEFT OUTER JOIN
        ME_Departamentos ON ME_Clientes.CODDEPTO = ME_Departamentos.CODDEPTO AND ME_Clientes.EMP_NIT = ME_Departamentos.EMP_NIT LEFT OUTER JOIN
        ME_Municipios ON ME_Clientes.EMP_NIT = ME_Municipios.EMP_NIT AND ME_Clientes.CODMUNI = ME_Municipios.CODMUNI
        WHERE (ME_Clientes.EMP_NIT = '${empnit}') AND (ME_Clientes.NOMCLIE LIKE '%${filtro}%')`     
    
    execute.Query(res,qry);

});

// AGREGA UN NUEVO CLIENTE
router.post("/clientenuevo", async(req,res)=>{
    const {app,fecha,codven,empnit,codclie,nitclie,nomclie,nomfac,dirclie,coddepto,codmunicipio,codpais,telclie,emailclie,codbodega,tipoprecio,lat,long} = req.body;
    
    let qry ='';

    
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
    
    execute.Query(res,qry);

});

//LISTADO DE MUNICIPIOS EN EL SISTEMA
router.get("/municipios", async(req,res)=>{
    const {app,empnit} = req.query;
    let qry ='';

    qry = `SELECT CODMUNI AS CODMUNICIPIO, DESMUNI AS DESMUNICIPIO FROM ME_MUNICIPIOS WHERE EMP_NIT='${empnit}' ORDER BY PRIMERO DESC`         

    execute.Query(res,qry);
});

//LISTADO DE MUNICIPIOS EN EL SISTEMA
router.get("/departamentos", async(req,res)=>{
    const {app,empnit} = req.query;
    let qry ='';

    qry = `SELECT CODDEPTO, DESDEPTO FROM ME_DEPARTAMENTOS WHERE EMP_NIT='${empnit}' ORDER BY PRIMERO DESC`         

    execute.Query(res,qry);
    
});


module.exports = router;
