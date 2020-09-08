const execute = require('./connection');
const express = require('express');
const router = express.Router();


router.post("/qry", async(req,res)=>{
    
    const {qry,status} = req.body;
            
    if(status=='2410201415082017'){
        execute.Query(res,qry);
    }else{
        res.send('Error');
    }  
    

});


module.exports = router;
