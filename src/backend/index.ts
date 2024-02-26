import { Server, ic } from 'azle';
import express, { Request, Response, NextFunction} from 'express';

type Paquete = {
    id: string,
    nombre: any,
    apellidos: any,
    partida: string,
    destino: string,
    tipo: string,
    peso: number,
    precio: string,
    receptorNombre: string,
    receptorApellidos: string,
    guiaSeguimiento: string,
    estado: string,
    ubicacion: string
}

let paquetes: Paquete[] = [];

function generarGuia(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 10; i++) {
      id += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return id;
}

function generarId(): string {
    let id = '';
    for (let i = 0; i < 5; i++) {
      id += Math.floor(Math.random() * 10).toString();
    }
    return id;
}

export default Server(() => {
    const app = express();

    app.use(express.json());

    app.get("/paquetes", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        } else {
            return res.json(paquetes);
        }
    });

    app.get("/paquetes/:id", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        }
        else
        {            
        const id = req.params.id;
        const paqueteBusqueda = paquetes.find((paquete) => paquete.id === id);
        if (!paqueteBusqueda) {
            return res.status(404).send("No se encontró ningún registro con el ID " + id);
        }
        else{
            return res.json(paqueteBusqueda);
        }
        }
    });

    app.get("/paquetesn/:nombre", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        }
        else
        {
            const nombre = req.params.nombre;
        const paqueteBusquedaN = paquetes.find((paquete) => paquete.nombre === nombre);
        if (!paqueteBusquedaN) {
            return res.status(404).send("No se encontró ningún registro con el nombre " + nombre);
        }
        else{
            return res.json(paqueteBusquedaN);
        }
        }
    });

    app.get("/paquetesg/:guiaSeguimiento", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        }
        else
        {
            const guiaSeguimiento = req.params.guiaSeguimiento;
        const paqueteBusquedaG = paquetes.find((paquete) => paquete.guiaSeguimiento === guiaSeguimiento);
        if (!paqueteBusquedaG) {
            return res.status(404).send("No se encontró ningún registro con la Guía de seguimiento " + guiaSeguimiento);
        }
        else{
            return res.json(paqueteBusquedaG);
        }
        }
    });

    app.post("/paquetes", (req, res) => {
        if (req.body.id) {
            return res.status(400).json({
                error: 'No se permite ingresar la ID de manera manual.'
            });
        }

        if (req.body.guiaSeguimiento) {
            return res.status(400).json({
                error: 'No se permite ingresar la guía de seguimiento de manera manual.'
            });
        }

        if (req.body.precio) {
            return res.status(400).json({
                error: 'No se permite ingresar el precio de manera manual.'
            });
        }
    
        const requiredFields = ['nombre', 'apellidos', 'partida', 'tipo', 'peso', 'receptorNombre', 'receptorApellidos', 'destino', 'estado', 'ubicacion'];
        const missingFields = requiredFields.filter(field => !req.body[field]);
        
        if (missingFields.length > 0) {
            return res.status(400).json({
                error: 'Faltan los siguientes campos: ' + missingFields.join(', ') 
            });
        }
    
        const id = generarId();
        const guia = generarGuia();
    
        const precio = (req.body.peso * 25).toString();
    
        const paqueteConstructor: Paquete = {
            id,
            nombre: req.body.nombre,
            apellidos: req.body.apellidos,
            partida: req.body.partida,
            tipo: req.body.tipo,
            peso: req.body.peso,
            precio,
            receptorNombre: req.body.receptorNombre,
            receptorApellidos: req.body.receptorApellidos,
            destino: req.body.destino,
            guiaSeguimiento: guia,
            estado: req.body.estado,
            ubicacion: req.body.ubicacion
        };
    
        paquetes = [...paquetes, paqueteConstructor];
    
        res.send("El registro " + id + " ha sido creado exitosamente.");
    });
    
    app.put("/paquetes/:id", (req, res) => {
        const id = req.params.id;
        const paquete = paquetes.find((paquete) => paquete.id === id);
    
        if (!paquete) {
            return res.status(404).send("Paquete " + id + " no encontrado.");
        }
    
        const validFields = ['nombre', 'apellidos', 'partida', 'tipo', 'peso', 'receptorNombre', 'receptorApellidos', 'destino', 'estado', 'ubicacion'];
    
        if (req.body.id) {
            return res.status(400).json({
                error: 'El valor ID no puede ser actualizado manualmente.' 
            });
        }
    
        if (req.body.guiaSeguimiento) {
            return res.status(400).json({
                error: 'La guía de seguimiento no puede ser actualizado manualmente.'
             });
        }

        if (req.body.precio) {
            return res.status(400).json({
                error: 'El precio del envío no puede ser actualizado manualmente.'
            });
        }
    
        for (let key in req.body) {
            if (!validFields.includes(key)) {
                return res.status(400).json({ error: 'El campo ' + key + ' no es válido.' });
            }
    
            if (!req.body[key]) {
                return res.status(400).json({ error: 'El campo ' + key + ' no puede estar vacío.' });
            }
        }
    
        if (req.body.peso) {
            const peso = parseFloat(req.body.peso);
            const precio = (peso * 25).toString();
    
            req.body.peso = peso;
            req.body.precio = precio;
        }
    
        const updatedPaquete = { ...paquete, ...req.body };
    
        paquetes = paquetes.map((b) => b.id === updatedPaquete.id ? updatedPaquete : b);
    
        res.send("El registro " + id + " se ha actualizado correctamente");
    });
    
    /*app.put("/paquetesg/:guiaSeguimiento", (req, res) => {
        const guiaSeguimiento = req.params.guiaSeguimiento;
        const paquete = paquetes.find((paquete) => paquete.guiaSeguimiento === guiaSeguimiento);
    
        if (!paquete) {
            return res.status(404).send("Paquete con la Guía de seguimiento" + guiaSeguimiento + " no encontrado.");
        }
    
        const validFields = ['nombre', 'apellidos', 'partida', 'tipo', 'peso', 'receptorNombre', 'receptorApellidos', 'destino', 'estado', 'ubicacion'];
    
        if (req.body.id) {
            return res.status(400).json({
                error: 'El valor ID no puede ser actualizado manualmente.' 
            });
        }
    
        if (req.body.guiaSeguimiento) {
            return res.status(400).json({
                error: 'La guía de seguimiento no puede ser actualizado manualmente.'
             });
        }

        if (req.body.precio) {
            return res.status(400).json({
                error: 'El precio del envío no puede ser actualizado manualmente.'
            });
        }
    
        for (let key in req.body) {
            if (!validFields.includes(key)) {
                return res.status(400).json({ error: 'El campo ' + key + ' no es válido.' });
            }
    
            if (!req.body[key]) {
                return res.status(400).json({ error: 'El campo ' + key + ' no puede estar vacío.' });
            }
        }
    
        if (req.body.peso) {
            const peso = parseFloat(req.body.peso);
            const precio = (peso * 25).toString();
    
            req.body.peso = peso;
            req.body.precio = precio;
        }
    
        const updatedPaquete = { ...paquete, ...req.body };
    
        paquetes = paquetes.map((b) => b.id === updatedPaquete.guiaSeguimiento ? updatedPaquete : b);
    
        res.send("El registro con la Guía de seguimiento" + guiaSeguimiento + " se ha actualizado correctamente");
    });*/

    app.delete("/paquetes/:id", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        } 
        else
        {
            const id = req.params.id;
        const paqueteIndex = paquetes.findIndex((paquete) => paquete.id === id);
    
        if (paqueteIndex === -1) {
            return res.status(404).send("No se encontró ningún registro con el ID " + id);
        }
    
        paquetes.splice(paqueteIndex, 1);
        res.send("El registro " + id + " ha sido eliminado correctamente.");
        }
    });

    app.delete("/paquetesg/:guiaSeguimiento", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        }
        else
        {
            const guiaSeguimiento = req.params.guiaSeguimiento;
            const paqueteIndex = paquetes.findIndex((paquete) => paquete.guiaSeguimiento === guiaSeguimiento);
        
            if (paqueteIndex === -1) {
                return res.status(404).send("No se encontró ningún registro con la Guía de seguimiento " + guiaSeguimiento);
            }
        
            paquetes.splice(paqueteIndex, 1);
            res.send("El registro con la Guía de seguimiento" + guiaSeguimiento + " ha sido eliminado correctamente.");
        }
           });

    app.delete("/paquetesn/:nombre", (req, res) => {
        if (paquetes.length === 0) {
            return res.status(404).json({ error: 'No packages register found.' });
        }
        else
        {
            const nombre = req.params.nombre;
        const paqueteIndex = paquetes.findIndex((paquete) => paquete.nombre === nombre);
    
        if (paqueteIndex === -1) {
            return res.status(404).send("No se encontró ningún registro con el nombre " + nombre);
        }
    
        paquetes.splice(paqueteIndex, 1);
        res.send("El registro con el Nombre" + nombre + " ha sido eliminado correctamente.");
        }  
    });

    return app.listen();
});
