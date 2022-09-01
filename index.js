const express = require('express');
const { restart } = require('nodemon');
const app = express();
app.use(express.json())

const data = {
    users: [
        {
            Username: "juliomp",
            Nombre: "julio perez",
            id: "7"

        },
        {
            Username: "jriaño",
            Nombre: "jorge riaño",
            id: "8"

        }
    ],
    productos: [
        {
            Precio: "2.000",
            Nombre: "pudin",
            id: "7"

        },
        {
            Precio: "5.000",
            Nombre: "gaseosa",
            id: "8"

        }
    ],
    compras: [
        {
            idUsuario: "7",
            idProducto: "7",
            id: "5"

        },
        {
            idUsuario: "8",
            idProducto: "7",
            id: "5"

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
app.post('/personas/crear', async (req, res, next) => {
    try {
        const usuario = req.body
        const index = data.users.findIndex((item) => {
            if (item.id === usuario.id) {
                return item.id
            }
        })
        if (index != -1) {
            res.status(400).json("El id de usuario ya existe")
        } else {
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
        }
    } catch (error) {
        next(error)
    }
})
//crear producto
app.post('/productos/crear', async (req, res, next) => {
    try {
        const productos = req.body
        const index = data.productos.findIndex((item) => {
            if (item.id === productos.id) {

                return item.id
            }

        })
        if (index != -1) {
            res.status(400).json("El id del producto ya existe")
        } else {
            const product = {
                Precio: productos.Precio,
                Nombre: productos.Nombre,
                id: productos.id
            }
            if (Object.values(product).some((val) => val === undefined)) {
                res.status(400).json("debe ingresar todos los campos")
            }

            data.productos.push(product)
            res.json("producto creado")
        }
    } catch (error) {
        next(error)
    }
})
//crear compra
app.post('/compras/crear', async (req, res, next) => {
    try {
        const compras = req.body

        const comp = {

            idUsuario: compras.idUsuario,
            idProducto: compras.idProducto,
            id: compras.id
        }
        if (Object.values(comp).some((val) => val === undefined)) {
            res.status(400).json("debe ingresar todos los campos")
        }

        data.compras.push(comp)
        res.json("producto creado")

    } catch (error) {
        next(error)
    }
})
//actualizar usuario
app.put('/personas/actualizar/:id', async (req, res, next) => {
    try {
        const usuario = req.body
        const ID = req.params.id

        const index = data.users.findIndex((item) => {
            if (item.id === ID) {

                return item.id
            }

        })
        console.log(index)
        if (index == -1) {
            res.status(400).json("Usuario no encontrado")
        } else {

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
        }
    } catch (error) {
        next(error)
    }
})
//actualizar producto
app.put('/productos/actualizar/:id', async (req, res, next) => {
    try {
        const producto = req.body
        const ID = req.params.id

        const index = data.productos.findIndex((item) => {
            if (item.id === ID) {

                return item.id
            }

        })
        console.log(index)
        if (index == -1) {
            res.status(400).json("producto no encontrado")
        } else {

            const product = {

                Precio: producto.Precio,
                Nombre: producto.Nombre

            }
            console.log(data.productos[index])
            console.log(index)
            data.productos[index] = {
                ...data.productos[index],
                ...product
            };
            res.json("actualizacion exitosa")
        }
    } catch (error) {
        next(error)
    }
})
//eliminar usuario
app.delete('/personas/eliminar/:id', async (req, res, next) => {
    try {
        const ID = req.params.id
        const index = data.users.findIndex((item) => {
            if (item.id === ID) {

                return item.id
            }

        })
        if (index == -1) {
            res.status(400).json("Usuario no encontrado")
        } else {
            data.users.splice(index)
            res.json("usuario eliminado exitosamente")
        }
    } catch (error) {
        next(error)
    }

})
//eliminar producto
app.delete('/productos/eliminar/:id', async (req, res, next) => {
    try {
        const ID = req.params.id
        const index = data.productos.findIndex((item) => {
            if (item.id === ID) {

                return item.id
            }

        })
        if (index == -1) {
            res.status(400).json("producto no encontrado")
        } else {
            data.productos.splice(index)
            res.json("producto eliminado exitosamente")
        }
    } catch (error) {
        next(error)
    }

})
//eliminar compra
app.delete('/compras/eliminar/;id', async (req, res, next) => {

    try {
        const ID = req.params.id
        const IDuser = req.params.user
        console.log(ID)
        console.log(IDuser)
        const index = data.compras.findIndex((item) => {
            if (item.id === ID && item.idUsuario === IDuser) {

                return item.id
            }
 
        })
        console.log(index)
        if (index == -1) {
            res.status(400).json("compra no encontrada")
        } else {
            console.log(data.compras[index])
            data.compras.splice(index)
            res.json("compra eliminada exitosamente")
        }
    } catch (error) {
        next(error)
    }
})



app.listen(app.get(`port`), () => {
    console.log(`corriendo en puerto ${app.get(`port`)}`)
});