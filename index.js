const express = require('express');
const { restart } = require('nodemon');
const app = express();
app.use(express.json())

const data = {
    users: [
        {
            Username: "juliomp",
            Nombre: "julio perez",
            id: "1"

        },
        {
            Username: "jriaño",
            Nombre: "jorge riaño",
            id: "2"

        }
    ],
    productos: [
        {
            Precio: "2.000",
            Nombre: "pudin",
            id: "1"

        },
        {
            Precio: "5.000",
            Nombre: "gaseosa",
            id: "2"

        }
    ],
    compras: [
        {
            idUsuario: "1",
            idProducto: "2",
            id: "1"

        },
        {
            idUsuario: "2",
            idProducto: "1",
            id: "2"

        }
    ]
}


app.set(`port`, process.env.PORT || 8080)

//mostrar todos los usuarios
app.get('/personas', async (req, res) => {
    res.json(data.users)
});
//mostrar todos los productos
app.get('/productos', async (req, res) => {
    res.json(data.productos)

});
//mostrar todas las compras
app.get('/compras', async (req, res) => {
    res.json(data.compras)

});
//mostrar usuario por id
app.get('/personas/:id', async (req, res) => {
    const r = req.params.id
    var persona = "no existe este id"
    data.users.findIndex((item) => {
        if (item.id === r) {
            persona = item
            console.log(item)
        }
    })
    res.json(persona)
});
//mostrar producto por id
app.get('/productos/:id', async (req, res) => {
    const r = req.params.id
    var producto = "no existe este id"
    data.productos.findIndex((item) => {
        if (item.id === r) {
            producto = item
            console.log(item)
        }
    })
    res.json(producto)
});
//crear usuario
app.post('/persona/crear', async (req, res,next) => {
    try {
        const usuario = req.body

        const user = {
            Username: usuario.Username,
            Nombre: usuario.Nombre,
            id: usuario.id
        }
        if (Object.values(user).some((val) => val === undefined)) {
            res.status(400).json("debe ingresar todos los campos")
        }
        data.users.push(user)
        res.json("usuario creado")
    } catch (error) {
        next(error)
    }
})
//crear producto

//crear compra

//actualizar usuario
app.put('/persona/actualizar/:id', async (req, res,next) => {
    try {
        const usuario = req.body
        const ID = req.params.id
        
        const index = data.productos.findIndex((item) => {
            if (item.id === ID) {
                 
                 return item.id
            }
            
        })
        console.log(index)
        if(index == -1){
            res.status(400).json("Usuario no encontrado")
        }
        
        const user = {
            Username: usuario.Username,
            Nombre: usuario.Nombre
            
        }
        console.log(data.users[index])
        console.log(index)
        data.users[index] = {
            ...data.users[index],
            ...user
        };
        res.json("actualizacion exitosa")

    } catch (error) {
        next(error)
    }
})
//actualizar producto

//eliminar usuario
app.delete('/persona/eliminar/:id', async (req, res,next) => {
    try {
        const ID = req.params.id
        const index = data.productos.findIndex((item) => {
            if (item.id === ID) {
                 
                 return item.id
            }
            
        })
        if(index == -1){
            res.status(400).json("Usuario no encontrado")
        }
        data.users.splice(index)
        res.json("usuario eliminado exitosamente")
    } catch (error) {
        next(error)
    }

})
//eliminar producto

//eliminar compra




app.listen(app.get(`port`), () => {
    console.log(`corriendo en puerto ${app.get(`port`)}`)
});