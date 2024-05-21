const express = require('express');


// working on authcheck

module.exports.authCheck= (req,res,next)=>{
    console.log(req.session.loggedin);
    next();
}

