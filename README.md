# Témalaboratórium

## Elindítás

Az alkalmazásnak 2 változata van: backend nélküli és backend-del rendelkező. Az előzőt a `demo` tag alatt, míg utóbbi az `app` tag alatt találjuk.
Mindkettőhöz szükséges azonban [Node.js](https://nodejs.org/en/).

### Demo

A fájlok letöltése és kicsomagolása után nyissunk egy parancssort és navigáljunk a gyökérmappába.
A következő parancsokat szükséges kiadni az itt feltüntetett sorrendben:

`npm i all`

`npm start`

Ezek után már használhatjuk is az alkalmazást a [http://localhost:3000](http://localhost:3000) megnyitásával.

### App

A fenti lépések megtétele előtt meg kell szereznünk a [backend](https://github.com/nudleee/todo-api) forráskódját is.

## Az alkalmazásról

### Funkcionalitás

Az alkamazás egy [Kanban board](https://en.wikipedia.org/wiki/Kanban_board) megvalósítása.
Teendőinket tudjuk megtekinteni, módosítani, törölni vagy újat vehetünk fel.

### Felépítés

Az alkalmazásban található fontosabb React komponensek a következők:

`Kanbanboard`, ami az egész böngésző felületét magába foglalja

`Column`, melyből összesen 4 van Todo, In progress, Testing, Done fejlécekkel, ez tartalmazza a Teendőinket

`Todo`, a Teendőket reprezentáló komponens

`ModalAdd` és `ModalEdit`, melyeken keresztül Teendőket tudunk létrehozni vagy szerkeszteni

A hálózati kommunikációhoz [axios-t](https://github.com/axios/axios) használtam, mely segítségével egyszerűen és átláthatóantudtam dolgozni.

Az alkalmazásban kezdetleges Routing is szerepel.

## Linkek

A [React tutorial](https://hu.reactjs.org/docs/getting-started.html)

React [Codeacademy gyakorlás](https://www.codecademy.com/learn/react-101)
