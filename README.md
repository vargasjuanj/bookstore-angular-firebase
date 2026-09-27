# Bookstore SPA: Angular & Firebase

[![Angular](https://img.shields.io/badge/Angular-8.2-dd0031.svg?style=flat&logo=angular)](https://angular.io/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28.svg?style=flat&logo=firebase)](https://firebase.google.com/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-4.4-7952B3.svg?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3.5-3178c6.svg?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![RxJS](https://img.shields.io/badge/RxJS-6.4-B7178C.svg?style=flat&logo=reactivex)](https://rxjs.dev/)

Single Page Application (SPA) para catálogo y administración de tienda de libros online, desarrollada con **Angular 8** e integrada con servicios en la nube de **Google Firebase** (Cloud Firestore para persistencia reactiva en tiempo real y Firebase Authentication para gestión de sesiones).

---

## 🏛️ Arquitectura del Proyecto

```text
src/app/
├── components/
│   ├── admin/list-books/     # Panel de gestión y tabla de inventario de libros
│   ├── details-book/         # Ficha técnica y detalle del libro
│   ├── hero/                 # Sección de cabecera visual
│   ├── home/                 # Portada principal con carrusel y listado general
│   ├── modal/                # Diálogo modal para alta y edición de libros
│   ├── navbar/               # Barra de navegación con estado de autenticación
│   ├── offers/               # Filtrado de libros con ofertas activas
│   └── users/                # Módulo de autenticación (Login, Registro, Perfil)
├── guards/                   # AuthGuard para control de acceso a rutas protegidas
├── models/                   # Interfaces TypeScript (BookInterface, UserInterface)
├── services/                 # Servicios AngularFire (AuthService, DataApiService)
└── app-routing.module.ts     # Definición de rutas y protecciones de navegación
```

---

## 🚀 Capacidades y Funcionalidades

* **Autenticación con Firebase:** Soporte para registro e inicio de sesión tradicional (Email/Password) y proveedores OAuth (Google / Facebook).
* **Persistencia Reactiva en Tiempo Real:** Integración con Cloud Firestore mediante colecciones tipadas (`AngularFirestoreCollection`) y flujos observables con `valueChanges` y `snapshotChanges`.
* **Protección de Rutas (`AuthGuard`):** Control de acceso a la consola de administración y al perfil de usuario mediante operadores reactivos de RxJS (`take`, `map`, `tap`).
* **Operaciones CRUD:** Creación, edición, consulta y eliminación de libros con sincronización en tiempo real en la base de datos.
* **Interfaz Responsive:** Maquetado con Bootstrap 4, navegación dinámica y modales interactivos para carga de información.

---

## ⚙️ Puesta en Marcha Local

### 1. Prerrequisitos
* Node.js (versión 10 a 14 recomendada para Angular 8).
* npm instalado.
* Proyecto configurado en [Firebase Console](https://console.firebase.google.com/).

### 2. Configuración de Firebase
Actualizar las credenciales en `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://TU_PROJECT_ID.firebaseio.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
  }
};
```

### 3. Instalación y Ejecución
```bash
npm install
ng serve
```
Disponible en `http://localhost:4200/`.
