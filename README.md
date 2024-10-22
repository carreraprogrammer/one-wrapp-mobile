<a name="readme-top"></a>

<div align="center">

  <img src="./src/assets/images/favicon.png" alt="logo" width="140" height="auto" />
  <br/>

</div>

# 📗 Table of Contents

- [📖 OneWrapp Offline](#onewrapp-offline)
  - [🛠 Built With](#built-with)
    - [Tech Stack](#tech-stack)
    - [Key Features](#key-features)
  - [💻 Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
    - [Usage](#usage)
    - [Run tests](#run-tests)
    - [Deployment](#deployment)
  - [🚀 TestFlight](#testflight)
  - [📝 License](#license)

# 📖 OneWrapp Offline <a name="about-project"></a>

**OneWrapp Offline** es una aplicación multiplataforma diseñada para funcionar sin conexión, utilizando **React** e **Ionic** junto con **Capacitor** y **RxDB** para la sincronización de datos locales. El backend está desarrollado en **Ruby on Rails**, y la aplicación está preparada para iOS y Android.

## 🛠 Built With <a name="built-with"></a>

### Tech Stack <a name="tech-stack"></a>

<details>
<summary>Frontend</summary>
  <ul>
    <li><a href="https://reactjs.org/">React</a></li>
    <li><a href="https://ionicframework.com/">Ionic</a></li>
    <li><a href="https://capacitorjs.com/">Capacitor</a></li>
    <li><a href="https://rxdb.info/">RxDB</a></li>
  </ul>
</details>

<details>
<summary>Backend</summary>
  <ul>
    <li><a href="https://rubyonrails.org/">Ruby on Rails</a></li>
    <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
  </ul>
</details>

### Key Features <a name="key-features"></a>

- **Sincronización de datos offline utilizando RxDB**
- **Multiplataforma: soporte para iOS y Android**
- **Backend en Ruby on Rails para la gestión de datos**

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a>

Para obtener una copia local del proyecto y ejecutarlo, sigue estos pasos.

### Prerequisites

Asegúrate de tener las siguientes herramientas instaladas en tu entorno local:

- **Node.js v22.2.0** o superior.
- **Ionic CLI**: `npm install -g @ionic/cli`
- **Capacitor 5.6**: `npm install @capacitor/core@5.6`
- **Ruby v 2.6.3**: `https://www.ruby-lang.org/en/documentation/installation/`
- **PostgreSQL**: `https://www.postgresql.org/download/`
- **Cocoapods** (para iOS): `sudo gem install cocoapods`

### Setup

1. Clona el repositorio:
    ```sh
    git clone https://github.com/tu-usuario/onewrapp-offline.git
    cd onewrapp-offline
    ```

2. Pide el archivo `.env` al desarrollador y colócalo en el directorio raíz del proyecto.

### Install

1. Instala las dependencias del frontend y backend:
    ```sh
    npm install
    bundle install
    ```

2. Configura la base de datos para el backend:
    ```sh
    rails db:create
    rails db:migrate
    ```

### Usage

Para ejecutar el proyecto localmente, sigue los siguientes pasos:

#### Para el Frontend (servidor de desarrollo)
```sh
ionic serve
```

#### Para agregar la plataforma Android:
```sh
ionic capacitor add android
ionic cap open android
```
o simplemente:
```sh
ionic capacitor run android
```

#### Para agregar la plataforma iOS:
```sh
ionic capacitor add ios
ionic cap open ios
```
o simplemente:
```sh
ionic capacitor run ios
```

#### Para correr la aplicación en Android con livereload:
```sh
ionic capacitor run android -l --external
```

#### Para correr la aplicación en iOS con livereload:
```sh
ionic capacitor run ios -l --external
```

#### Nota: Para el livereload, asegúrate de que la URL de tu servidor local esté configurada en el archivo capacitor.config.ts:

```typescript
const config = {
  server: {
    url: 'http://TU_IP_LOCAL:8100',
    cleartext: true
  }
};
export default config;
```

# 🚀 TestFlight <a name="testflight"></a>

#### Prerequisites

1. Cuenta de Desarrollador de Apple: Solicita una invitación a la Cuenta de Desarrollador de Apple y al equipo de 525.
2. Genera y configura los certificados y perfiles de aprovisionamiento necesarios en el Centro de Desarrolladores de Apple para firmar tu aplicación.
3. Recopila los Apple IDs de las personas que probarán tu aplicación.
4. Instala la última versión de Xcode, el entorno de desarrollo integrado (IDE) de Apple.

#### Deployment

1. Abre un terminal y navega hasta el directorio raíz del proyecto. Haz pull para verificar que los cambios han sido correctamente instaurados en la master:
    ```sh
    git pull
    ```
2. Ejecuta nvm use stable para asegurarte de que estás utilizando la versión estable de Node.js:
    ```sh
    nvm use stable
    ```
3. Verofica que esta versión tenga ionic instalado:
    ```sh
    ionic -v
    ```
  
4. Sincroniza la app para iOS:

Si es para producción:

    ```sh
    ionic cap sync
    ```
Si es para staging:
  
    ```sh
    npm run build:staging
    ionic cap sync --no-build
    ```
5. Abre el proyecto en Xcode:
    ```sh
    ionic cap open ios
    ```
6. Sigue paso a paso la guía de [Step-by-Step Guide to Uploading Apps to TestFlight](https://www.qed42.com/insights/a-comprehensive-guide-to-deploying-apps-to-testflight-for-seamless-testing) para subir la aplicación a TestFlight aumentando la versión para que se actualice en la App Store.

# 📝 License <a name="license"></a>

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](./LICENCE) para obtener más información.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
