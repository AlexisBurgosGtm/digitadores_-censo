const execute = require('./connection');
const express = require('express');
const router = express.Router();


//LISTADO MARCAS
router.post('/marcas', async(req,res)=>{
    
    let qry = `SELECT CODMARCA, DESMARCA FROM ME_MARCAS ORDER BY DESMARCA`;

    execute.Query(res,qry);
});

//LISTADO CLASE UNO
router.post('/claseuno', async(req,res)=>{
    
    let qry = `SELECT CODCLAUNO AS COD, DESCLAUNO AS DES FROM ME_CLASEUNO ORDER BY DESCLAUNO`;

    execute.Query(res,qry);
});

//LISTADO CLASE DOS
router.post('/clasedos', async(req,res)=>{
    
    let qry = `SELECT CODCLADOS AS COD, DESCLADOS AS DES FROM ME_CLASEDOS ORDER BY DESCLADOS`;

    execute.Query(res,qry);
});

//LISTADO CLASE TRES
router.post('/clasetres', async(req,res)=>{
    
    let qry = `SELECT CODCLATRES AS COD, DESCLATRES AS DES FROM ME_CLASETRES ORDER BY DESCLATRES`;

    execute.Query(res,qry);
});

//LISTADO PRODUCTOS
router.post('/listado', async(req,res)=>{
    
    const filtro = req.body.filtro;

    let qry = `SELECT ME_Productos.CODPROD, ME_Productos.DESPROD, ME_Productos.EQUIVALEINV, isnull(ME_Productos.PRECIOMONEDA,0) AS COSTO, ME_Productos.NOHABILITADO, ME_Marcas.DESMARCA, ME_Productos.LASTUPDATE
                FROM ME_Productos LEFT OUTER JOIN ME_Marcas ON ME_Productos.CODSUCURSAL = ME_Marcas.CODSUCURSAL AND ME_Productos.CODMARCA = ME_Marcas.CODMARCA AND ME_Productos.EMP_NIT = ME_Marcas.EMP_NIT
                WHERE (ME_Productos.DESPROD LIKE '%${filtro}%')`;

    console.log(qry);
    
    execute.Query(res,qry);
});

// ACTUALIZA DETALLE DEL PRODUCTO
router.put('/detalles',async(req,res)=>{
    const {codprod,desprod,uxc,codmarca,codclaseuno,codclasedos,codclasetres,lastupdate} = req.body;
    
    let qry = `
    UPDATE ME_PRODUCTOS SET 
    DESPROD='${desprod}', EQUIVALEINV=${uxc},CODCLAUNO='${codclaseuno}',CODCLADOS='${codclasedos}',CODCLATRES='${codclasetres}',CODMARCA='${codmarca}',LASTUPDATE='${lastupdate}' 
    WHERE CODPROD='${codprod}'`;

    execute.Query(res,qry);
    
}); 

// OBTIENE EL DETALLE DEL PRODUCTO
router.post('/detalles',async(req,res)=>{
    const {codprod} = req.body;
    
    let qry = `
    SELECT DESPROD, EQUIVALEINV,CODMARCA,CODCLAUNO,CODCLADOS,CODCLATRES FROM ME_PRODUCTOS
    WHERE CODPROD='${codprod}'`;

    execute.Query(res,qry);
    
}); 

router.put('/status',async(req,res)=>{
    const {codprod,status} = req.body;
    let st;
    if(status==0){
        st =1;
    }else{
        st=0;
    }

    let qry = `UPDATE ME_PRODUCTOS SET NOHABILITADO=${st} WHERE CODPROD='${codprod}'`;
    execute.Query(res,qry);
    
}); 

module.exports = router;
