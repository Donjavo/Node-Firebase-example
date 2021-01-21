const {Router}=require('express');
const router=Router();

const admin=require('firebase-admin');

var serviceAccount=require("../../node-firebase-example-91117-firebase-adminsdk-mgkey-3c37c1b3c9.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL:'https://node-firebase-example-91117-default-rtdb.firebaseio.com/'
});


const db=admin.database();




router.get('/',(req,res)=> {
    db.ref('contacts').once('value',(snapshot)=>{ //consulta firebase
    const data=snapshot.val();   //regresa datos
    res.render('index',{contacts: data}); //le paso los datos a index
    });  
});

router.post('/new-contact',(req,res) =>{
    

    const newContact={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email:req.body.email,
        phone: req.body.phone
    };

    db.ref('contacts').push(newContact);
    res.redirect('/');
}); 

router.get('/delete-contact/:id',(req,res)=>{
    db.ref('contacts/'+ req.params.id).remove(); //elimina valor
    res.redirect('/');
});

module.exports=router;