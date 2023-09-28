class ProductManager {
    constructor() {
        this.products = [];
        this.fs = require('fs');
        this.path = './usuarios.json'; // Ruta del archivo JSON
        if (!this.fs.existsSync(this.path)) {
            this.fs.writeFileSync(this.path, JSON.stringify([])); // Crea el archivo si no existe
        } else {
            this.products = JSON.parse(this.fs.readFileSync(this.path, 'utf-8')); //Cuando se crea la instancia los productos se cargan desde el archivo en "products"
        }
    }

    static id = 0;

    addProduct(title, description, price, thumbnail, code, stock) {
      
        if (arguments.length === 6) {

            if (!this.products.find((product) => product.code === code)) {

                ProductManager.id++;
                const productData = {
                    title,
                    description,
                    price,
                    thumbnail,
                    code,
                    stock,
                    id: ProductManager.id
                };

                const productsArray = JSON.parse(this.fs.readFileSync(this.path, 'utf-8'));
                productsArray.push(productData);
                this.fs.writeFileSync(this.path, JSON.stringify(productsArray));
                this.products = productsArray; // Actualiza el arreglo de productos
            } else {
                console.log("PARAM: \"CODE\" REPEAT!! \n");
            }
        } else {
            console.log("DEBE INGRESAR TODOS LOS PARAMETROS \n\n");
        }
    }

    updateProduct(id,updateProduct){

        const index = this.products.findIndex((product) => product.id == id);

        if(index !== -1){
/*...this.products Crea una copia superficial del objeto de "producto existente" conservando las propiedades
  ...updateProduct Se sobre escribe el objeto producto con las nuevas propiedades */

            this.products[index] = {...this.products[index], ...updateProduct}; 
            this.fs.writeFileSync(this.path, JSON.stringify(this.products));
            return console.log("Producto actualizado");
        }else console.log("ID no encontrado ");

    }

    getProductById(id) {
        let productId = this.products.find((product) => product.id === id);

        if (productId) {
            console.log("PRODUCTO ENCONTRADO: \n");
            console.log(productId);
            return productId;
        } else {
            console.log("Not Found \n");
            return null;
        }
    }

    getProducts() {
   
        return this.products;
       
    }
    deleteProduct(id){

        const index = this.products.findIndex((product) => product.id == id);

        if(index !== -1){
            this.products.splice(index,1);
            this.fs.writeFileSync(this.path, JSON.stringify(this.products));
            return console.log("Producto eliminado");
        }else console.log("ERROR al eliminar: ID no encontrado ");

    }
}

module.exports = ProductManager;

const productos = new ProductManager();

// Arreglo vacio
console.log(productos.getProducts());

// Adición de un producto
productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen1", "abc123", 25);
productos.addProduct("producto2", "Este es un producto2", 40, "Imagen", "Perico", 90);
productos.addProduct("producto3", "Este es un producto prueba3", 30, "Imagen 3", "a", 26);
productos.addProduct("producto4", "Este es un producto prueba4", 40, "Imagen 4", "b", 27);
productos.addProduct("producto5", "Este es un producto prueba5", 50, "Imagen 5", "c", 28);
productos.addProduct("producto6", "Este es un producto prueba6", 60, "Imagen 6", "d", 29);
productos.addProduct("producto7", "Este es un producto prueba7", 70, "Imagen 7", "e", 30);
productos.addProduct("producto8", "Este es un producto prueba8", 80, "Imagen 8", "f", 31);
productos.addProduct("producto8", "Este es un producto prueba9", 90, "Imagen 9", "g", 32);
productos.addProduct("producto8", "Este es un producto prueba10", 100, "Imagen 10", "h", 33);

// Impresion del producto
//console.log(productos.getProducts());

// Se intenta agregar el mismo producto
//productos.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

// Se evalua getProductByld con un id no agregado
//productos.getProductById(3);

//Actualizacion de producto 
//productos.updateProduct(1,{title : "PRODUCTO NUEVO"});
//console.log(productos.getProducts());

//Eliminar Producto
//productos.deleteProduct(1);
//console.log(productos.getProducts());
