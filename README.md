<h1 align="center">Alacarte</h1>

 <p align="center">
    Migros Alacarte Project 
 </p>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
        <li>
          <a href="#architecture">Architecture</a>
          <ul>
            <li><a href="#folderstructure">Folder Structure</a></li>
          </ul>
        </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#codestyle">Code Style</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#usefullinks">Useful Links</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

Alacarte is an Angular Project

### Built With

- [Angular](https://angular.io/)
- [Angular Material](https://material.angular.io/)
- [TypeScript](https://www.typescriptlang.org/)


<!-- GETTING STARTED -->

## Getting Started

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/migroscomtr/alacarte.git
   ```
2. `cd` into directory   
3. Install packages
   ```sh
   npm i
   ```
4.  Start
    ```sh
    npm run start
    ``` 
5. Start Mock Server (Optional)
    ```sh
     npm run build:ssr
     npm run serve:ssr
    ```  
   
<!-- USAGE -->
   
## Usage

- Project port: 1700 
- Server port: 1701 ( In current version, you can use this server as mock server, after backend connection is done we'll use this server for server side rendering  )
- `proxy.conf.json` where you can set your API target. By default there is mock servers' endpoint. You can update it by updating target


## Architecture

Our architecture is based on lazy loading feature modules. Think them like little apps with particular jobs. For instance, AuthModule has all authentication components and pages except services because services have a better place to be : CoreModule. 

Core Module has business and structural elements like services, models, interceptors etc. If you want to create a service which fetch user data or you want to intercept request to add some logic, you are at the right module.

We have also Shared Module. Shared Module is the place where the elements to be used by the whole project will be found.

### Folder Structure
```bash
.
├── src
│   ├── app
│   │   ├── app-routing.module.ts // lazy loading module and route declarations
│   │   ├── app.component.html
│   │   ├── app.component.scss
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   │   ├── app.server.module.ts
│   │   ├── auth // MODULE : Lazy Loading Module which has its own components, pages, routing 
│   │   │   ├── auth-routing.module.ts 
│   │   │   ├── auth.module.ts
│   │   │   ├── components
│   │   │   └── pages
│   │   ├── core // Services, guards, models etc
│   │   │   ├── components
│   │   │   ├── services
│   │   │   ├── guards
│   │   │   ├── models
│   │   │   ├── index.ts
│   │   │   └── core.module.ts
│   │   ├── dashboard // MODULE Lazy Loading Module (check auth module)
│   │   ├── layout // MODULE: Has layout elements
│   │   ├── routes.ts // Define all paths here to make route maintenance easier
│   │   └── shared // MODULE : Has shared elemnents 
│   │       ├── components
│   │       ├── directives
│   │       ├── modules
│   │       └── shared.module.ts
│   ├── assets // Has assets like icons and images
│   ├── environments
│   │   ├── environment.prod.ts
│   │   └── environment.ts
│   ├── favicon.ico
│   ├── index.html
│   ├── main.server.ts
│   ├── main.ts
│   ├── polyfills.ts
│   └── styles
│       ├── base // helpers
│       ├── layout 
│       ├── themes
│       └── main.scss
├── Dockerfile
├── README.md
├── angular.json
├── dist
│   └── alacarte
│       ├── browser
│       └── server
├── package-lock.json
├── package.json
├── proxy.conf.json
├── server.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.server.json
└── tsconfig.spec.json
```
   
<!-- ROADMAP -->

## Roadmap

- [x] Create Project
  - [x] Mock Server
- [] Backend Connection
- [] SSR

There will be more


## Code Style

Coder should follow following rules in order to make our project readable.

#### Sorting function by names

Function names should be sorted in component class file in this order

- angular hooks, get, set, is, has, custom functions.

#### Naming functions

- getAlacarte
- setAlacarte
- isAlacarte
- hasAlacarte
- fetchAlacarte etc.

#### Reaching values from component class

Every value that needs to be used in template should be getting via functions EXCEPT @Input values.

For example,

```typescript
import { Component } from '@angular/core';
@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() myInput: string;

  // Using underscore before private variables makes your life easier when identify variable whether public or private
  private _myValue: number; 

  // DO since it is a private variable
  getMyValue(): number {
    return this._myValue;
  }

  // DO NOT USE like that since it is Input variable 👎
  getMyInput(): string {
    return this.myInput;
  }
}
```
DO
```html
<span>{{ getMyValue() }}</span> 👍 <span>{{ myInput }}</span> 👍
```
DO NOT
```html
<span>{{ myValue }}</span> 👎 <span>{{ getMyInput() }}</span> 👎
```


#### Return types

Every function must have return type except angular hooks.

#### Event function naming

Naming of event functions also important. Verb first.

```html
<button (click)="onClickMyButton()"></button> 👍 <input (change)="onChangeMyInput()" /> 👍

<button (click)="onMyButtonClicked()"></button> 👎 <input (change)="onMyInputChanged()" /> 👎
```

#### Using takeUntil and destroyInterceptor

To make life easier for us to handle subscriptions in component level we created a class named Subscription Abstract to destroy subscriptions after component being destroyed.

- Usage

```typescript
import { Component, OnInit } from '@angular/core';
import { SubscriptionAbstract } from './subscription.abstract';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
⚠️ // FIRST WE HAVE TO EXTEND IT. ⚠️
export class AppComponent extends SubscriptionAbstract implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
    this.initialize();
  }

  initialize(): void {
    this.myService
      .getMyObservable()
      .pipe(
        takeUntil(this.getDestroyInterceptor()), // Usage ⚠️
      )
      .subscribe((data) => {
        // code here
      });
  }
}
```

### \* Be Careful

1. Every subscription needs to be unsubscribe in order to prevent MEMORY LEAK so we have SubscriptionAbstract to avoid manual unsubcribing ! check #Using takeUntil and destroyInterceptor# section
2. When you create a component make sure you add this component to module's declarations and if this component will be used outside of the module then add this component to your exports array  
3. Make sure you dont put any business logic in components, services are better places for business logic & REST calls. 

## Contact
About Project
Uğur Artun - ugur.artun@migrosonline.com

About Angular
Elif Meriç - elifbetul.meric@migrosonline.com
  
  
## Useful Links

- [Angular University](https://blog.angular-university.io/)
