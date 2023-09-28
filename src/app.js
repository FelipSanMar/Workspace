

const express = require("express");

const ProductManager = require("./ProductManager");

const app = express();

const productos = new ProductManager();
 

app.get("/products",(req,res)=>{

    //leer el archivo de productos y devolverlos como un objeto 
    const products = productos.getProducts(); 

    //Verifica si se proporciono un limite
    const limit = req.query.limit;
    
    if(limit){
        //Devuelve solo el numero de productos solicitados
        res.send(products.slice(0,limit));
    }else{
        //Devuelve todos los productos
        res.send(products);
        
    }


});

app.get("/products/:pid",(req,res)=> {

    const productId = parseInt(req.params.pid); //Convierte a entero para compatibilizar con el parametro de la funcion getProductById(id)
    const product = productos.getProductById(productId);

    if(product){
        res.send(product);
    }else{
        res.status(404).send({error: "Producto no existe"});
    }

});

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Servidor escuchando en el puerto ${PORT}`));
