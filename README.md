# Planet Express API 

-   Descripción
-   Clonación del repositiorio
-   Despliegue del proyecto
-   Funcionalidad

## Descripción del proyecto

El Proyecto Planet Express, es una API (Interfaz de Programación de Aplicaciones) del tipo REST (Transferencia de Estado Representacional), mismo que es desarrollado para una paquetería y que opera de forma local. De acode al tipo de API, permite administrar un CRUD (arónimo de Leer, Crear, Actualizar y Eliminar), permitiendo que las consultas, actualizaciones y eliminaciones se puedan llevar a cabo haciendo uso de datos como nombre, ID, o guía de seguimiento; agregando una mayor funcionalidad y fácil gestión de los paquetes. Además de ofrecer una automatización en generación de ID's y guías de seguimiento, así mismo se ofrecen validaciones que hacen más integra la información. 

Dicho proyecto, es pensado y creado en facilitar que las empresas de paqueterías nacientes o crecientes faciliten sus procesos de manera sencilla, sin necesidad de tanto papel o procesos de captura en hojas de cálculo. De forma inicial se han propuesto una serie de campos que describen al objeto, aunque ellos pueden ser adaptados para las necesidades de cada cliente.

De forma futura se podrá integrar con alguna Base de Datos y frontend para complementarla y ofrecer más posiblidades a las paqueterías.

## Clonación del repositorio

Dentro de la terminal de Ubuntu (previamente configurada para cada tipo de sistema operativo), es necesario correr el siguiente comando para realizar la clonación del repositorio.

```bash
git clone https://github.com/EdgeSlayer1997/PlanetExpress.git
```
Nota: Se debe contar con conexión a internet para realizar esta acción y las siguientes.

## Despliegue del proyecto

El despliegue del proyecto ayuda a poder hacer uso de las rutas del CRUD y sus respectivas funcionalidades. Para ello es necesario seguir las instrucciones que a continuación se presentan.


En la misma terminal en donde fue clonado el proyecto, se debe accdeder a este.

```bash
cd PlanetExpress
```

En seguida se debe iniciar el entorno de ejecución local en segundo plano, de esta forma no hay necesidad de abrir otra terminal.
```bash
dfx start --background
```

Posteriormente se deben crear los canister para el proyecto, mismos que serán usados para hacer uso de las rutas. El comando presentado, hace que no sea necesario tener que hacer uso del dfx deploy cada que el código sea actualizado, ello en el caso del desarrollo.
```bash
AZLE_AUTORELOAD= dfx deploy
```

## Funcionalidad
A continuación se presenta la forma en que funciona Planet Express API, describiendo de forma concisa cada una de las diversas rutas del CRUD, conformado por altas, bajas, cambios y consultas de información, siendo lo mismo que su acrónimo indica en español. 

Cabe destacar que esta API almacena datos de manera local, dentro de un arreglo que, cada vez que se deje de usar o sean gerados los canister, se eliminará la información generada, debido a que no es almacenada en algún lugar o Base de Datos (BD).

Las rutas se construyen por el primer canister arrojado con el último comando que fue corrido, mismo que tiene la siguiente estructura.
```bash
http://canisterID.localhost:4943
```
Nota: Es recomendable que se use Postman para hacer uso de la API.

### Altas de información
Las altas de información ayudan a crear la información correspondiente a un nuevo paquete, para ello se han contemplado los siguientes campos o característias:
- ID: número de identificación del paquete, dentro de la API se compone de 5 números aleatorios entre 0 y 9.
- Nombre: nombre/s de quien envía el paquete.
- Apellidos: apellido/s de quien envía el paquete.
- Partida, lugar de donde parte el paquete.
- Tipo: el tipo de envío puede ser nacional o internacional.
- Peso: es el peso en kilos del paquete.
- Precio: corresponde al costo del envío; mismo que se calcula al multiplicar el peso por una constante de 25, correspondiente al peso por kilo.
- Nombre del receptor: el nombre/s de quien recibirá el paquete.
- Apellidos del receptor: el/los apellidos de quién recibirá el paquete.
- Destino: dirección completa de la persona receptora del paquete.
- Guía de seguimiento: conjunto de números y letras que ayudan a realizar el seguimiento del paquete en su proceso de envío; dentro de la API se compone por 10 caracteres aleatorios, conformados por letras mayúsculas y minúsculas de la "a" a la "z" y números entre 0 y 9.
- Estado: corresponde a si el paquete está siendo procesado, en camino o entregado.
- Ubicación: es la ubicación donde se encuentre el paquete durante el proceso de envio; por ejemplo: la paquetería, una ciudad o la dirección del receptor.

Las altas de información son realizadas mediante el metódo POST, con la siguiente ruta:
```bash
http://canisterID.localhost:4943/paquetes
```
Para que estas sean llevadas correctamente es necesario enviar los datos atráves del body, en un raw con formato JSON (parámetros configurables en el entorno de postman). Dicha información deberá seguir el siguiente formato:

```bash
{
    "nombre": "Flor",
    "apellidos": "Zamorano",
    "partida": "Calle Fracisco I Madreo No. 100, Ciudad de Aguascalientes, Aguascalientes, Aguascalientes",
    "destino": "Calle Juárez No. 15, La Labor, Calvillo, Aguascalientes",
    "tipo": "Nacional",
    "peso": 55,
    "receptorNombre": "Luis",
    "receptorApellidos": "Delgado",
    "estado": "En proceso",
    "ubicacion": "Paquetería"
}
```
Como parte de la funcionalidad de la API, el ID, el precio y la guía de seguimiento son generados y calculados de forma automatica, por lo que si son ingresados no se podrá realizar el registro y se arrojará una notificación de ello. Además de que si algún campo de los restantes se encuentra vacío o es omitido se generará una alerta indicando los faltantes, hasta que todos se encuentren completos se llevará a cabo el alta y se recibirá un mensaje de confirmación.

### Consultas de información
La API permite realizar cuatro tipos de consultas de información, las cuales son:
- Consultas generales
- Consultas por ID
- Consultas por guía de seguimiento
- Consultas por nombre

Si alguna de las consultas no encuentra coincidencias con los datos disponibles, se recibirá un mensaje especificándolo.

Nota: En nunguna de ellas es necesario hacer envío de información atráves del body, además de ser realizadas por el método GET.

#### Consultas generales

Las consultas generales arrojan como resultado toda la información almacenada al estar haciendo uso de la API, su ruta es la siguiente:
```bash
http://canisterID.localhost:4943/paquetes
```

#### Consultas por ID

Las consultas por ID arrojan como resultado la información del paquete que coincida con el ID especificado en la ruta correspondiente, mostrandose a continuación:
```bash
http://canisterID.localhost:4943/paquetes/:id
```

#### Consultas por guía de seguimiento

Las consultas por guia de segumiento devuelven la información del paquete que tenga la guía indicada en la ruta.
```bash
http://canisterID.localhost:4943/paquetesg/:guiaSefuimiento
```

#### Consultas por nombre

Las consultas por nombre devuelven los datos de todos aquellos paquetes que coincidan con el nombre indicado en la ruta correspondiente, misma que es la siguiente:
```bash
http://canisterID.localhost:4943/paquetesn/:nombre
```

### Cambios de información

Planet Express API permite realizar cambios de información a los campos que no son generados automáticamente, mismos que deben estar completos y contener información, de lo contrario no podrá llevarse a cabo y se recibirá una notificación. De igual forma, si alguno de los campos generados de forma automática se ingresa no se realizará la acción y será recibida una alerta de ello.

Las actualizaciones se llevan a cabo con el método PUT, además de que la información debe ser enviada en el body, por un raw en formato JSON (parámetros configurables en Postman).

La información del body deberá seguir el siguiente formato:

```bash
{
    "nombre": "Flor",
    "apellidos": "Zamorano",
    "partida": "Calle Fracisco I Madreo No. 100, Ciudad de Aguascalientes, Aguascalientes, Aguascalientes",
    "destino": "Calle Juárez No. 15, La Labor, Calvillo, Aguascalientes",
    "tipo": "Nacional",
    "peso": 55,
    "receptorNombre": "Luis",
    "receptorApellidos": "Delgado",
    "estado": "En proceso",
    "ubicacion": "Paquetería"
}
```

Las modificaciones pueden ser realizadas especificando en su ruta el ID o guia de seguimiento, para llevar a cabo la búsqueda del paquete y la actualización sea llevada a cabo, en ambas los datos deberán ser enviados tomando en cuenta las condiciones mencionadas anteriormente.

- Ruta para actualización por id:

```bash
http://avqkn-guaaa-aaaaa-qaaea-cai.localhost:4943/paquetes/:id
```
- Ruta para actualización por guía de seguimiento:

```bash
http://avqkn-guaaa-aaaaa-qaaea-cai.localhost:4943/paquetesg/:guiaSeguimiento
```

### Bajas de información

Con la API es posible realizar bajas de información sobre los paquetes. Esta acción es realizada por el método DELETE, para ser completada no es necesario hacer algun envío de datos mediante el body. 
Al poder hacer eliminaciones mediante el ID, guía de seguimiento o nombre, es necesario indicarlos en la ruta correspondiente, para que se realice la búsqueda y posteriormente sean eliminados los datos. Una vez completada la acción se recibirá una notificación de éxito, en caso de no encontrar coincidencias se recibe un aviso de ello.

- Ruta para eliminación por id:

```bash

http://canisterID.localhost:4943/paquetes/:id
```
- Ruta para eliminación por guía de seguimiento:

```bash
http://canisterID.localhost:4943/paquetesg/:guiaSeguimiento
```
- Ruta para eliminación por nombre:

```bash
http://canisterID.localhost:4943/paquetesn/:nombre
```


Nota: La eliminación por nombre borra todos aquellos paquetes que coincidan con dicho parámetro, por lo que si hay varios registros con el mismo nombre todos serán destruidos. Es recomendable en casos donde se requiera hacer una depuración de información más rápida. 
