# Planet Express API 

-   [Descripción](#Descripción)
-   [Clonación del repositiorio](#Clonación)
-   [Despliegue del proyecto](#despliegue)
-   [Funcionalidad](#funcionalidad)

## Descripción del proyecto

El Proyecto Planet Express, es una API (Interfaz de Programación de Aplicaciones) del tipo REST (transferencia de estado representacional), mismo que es desarrollado para una paquetería. De acode al tipo de API, permite administrar un CRUD, permitiendo que las consultas, actualizaciones y eliminaciones se puedan llevar a cabo haciendo uso de datos como nombre, ID, o guía de seguimiento; agregando una mayor funcionalidad y fácil gestión de los paquetes. Además de ofrecer una automatización en generación de ID's y guías de seguimiento, así mismo se ofrecen validaciones que hacen más integra la información. 
Dicho proyecto, es pensado y creado en facilitar que las empresas de paqueterías nacientes o crecientes faciliten sus procesos de manera sencilla, sin necesidad de tanto papel o procesos de captura en hojas de cálculo. De forma inicial se han propuesto una serie de campos que discriminan al objeto, aunque ellos pueden ser adaptados para las necesidades de cada cliente.

## Clonación del positorio

Dentro de la terminal de Ubuntu (previamente configurada), es necesario correr el siguiente comando para realizar la clonación del repositorio.

```bash
git clone 
```

On Mac:

```bash
brew install podman
```

It's recommended to use nvm and Node.js 20:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

Restart your terminal and then run:

```bash
nvm install 20
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
node --version
```

Install the dfx command line tools for managing ICP applications:

```bash
DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
```

Check that the installation went smoothly by looking for clean output from the following command:

```bash
dfx --version
```

If after trying to run `dfx --version` you encounter an error such as `dfx: command not found`, you might need to add `$HOME/bin` to your path. Here's an example of doing this in your `.bashrc`:

```bash
echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
```

## Deployment

```bash
npx azle new hello_world
cd hello_world

npm install

dfx start --clean --host 127.0.0.1:8000
```

In a separate terminal in the `hello_world` directory:

```bash
dfx deploy
```

If you are building an HTTP-based canister and would like your canister to autoreload on file changes (DO NOT deploy to mainnet with autoreload enabled):

```bash
AZLE_AUTORELOAD=true dfx deploy
```

If you have problems deploying see [Common deployment issues](https://demergent-labs.github.io/azle/deployment.html#common-deployment-issues).

View your frontend in a web browser at `http://[canisterId].localhost:8000`.

To obtain your application's [canisterId]:

```bash
dfx canister id backend
```

Communicate with your canister using any HTTP client library, for example using `curl`:

```bash
curl http://[canisterId].localhost:8000/db
curl -X POST -H "Content-Type: application/json" -d "{ \"hello\": \"world\" }" http://[canisterId].localhost:8000/db/update
```

## Examples

There are many Azle examples in the [examples directory](https://github.com/demergent-labs/azle/tree/main/examples). We recommend starting with the following:

-   [apollo_server](https://github.com/demergent-labs/azle/tree/main/examples/apollo_server)
-   [ethers](https://github.com/demergent-labs/azle/tree/main/examples/ethers)
-   [express](https://github.com/demergent-labs/azle/tree/main/examples/express)
-   [fs](https://github.com/demergent-labs/azle/tree/main/examples/fs)
-   [hello_world](https://github.com/demergent-labs/azle/tree/main/examples/hello_world)
-   [ic_evm_rpc](https://github.com/demergent-labs/azle/tree/main/examples/ic_evm_rpc)
-   [sqlite](https://github.com/demergent-labs/azle/tree/main/examples/sqlite)
-   [web_assembly](https://github.com/demergent-labs/azle/tree/main/examples/web_assembly)
