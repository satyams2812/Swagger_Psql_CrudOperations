const express = require('express');

const router = express.Router();
const db = require('../config/databases')
const Student = require('../models/student')


/**
 * @swagger
 * /student:
 *   get:
 *     description: Get all students
 *     responses:
 *       200:
 *         description: Success
 * 
 */
 router.get('/student', (req, res) => {
    Student.findAll().then(student => {
        console.log(student);
        res.send([student])
    }).catch(err => console.log(err))
  });
  



 
   router.get('/student/:id',(req,res)=>{
    let id = req.params.id
     Student.findByPk(id).then(student =>{
          if(student==null)
          res.json({"data" : "No Data Found"})
          else
          res.json(student)
     })
})


   


router.put('/student/:id',(req,res)=>{
     let id = req.params.id
     let data = {
         name : req.body.name , address : req.body.address      }
     Student.update(data,{
         where : {
             id : id 
         }
     }).then(student =>{
          Student.findByPk(id).then(student =>{
              res.json(student)
          })
     })
    })


router.post('/add', (req, res) => {

    Student.create({
        name: req.body.name,
        address: req.body.address
    }).then(res.json({"status" : "okay"})).catch(err => {
        console.log(err)
    })
})


 router.delete('/delete/:id',(req,res)=>{
let id = req.params.id;
    Student.findByPk(id).then((student)=>{
        student.destroy().then(()=>{
            res.json({"deleted" : "okay"})
        })
    })

 })  

 

 

module.exports = router