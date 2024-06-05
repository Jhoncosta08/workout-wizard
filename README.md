# Lol Guide

## About the project
>The application is an interactive platform based on the game League of Legends, designed to provide a rich and detailed experience for fans of the game. Users can create accounts and log in to access an extensive list of champions. Upon selecting a champion, detailed information is presented, including the lane where the champion plays, their abilities with illustrative videos, the character's lore, and available skins. This functionality allows players to deepen their knowledge of their favorite champions and explore new characters in an engaging and informative way.

>Additionally, the application features a dedicated page for the game's runes. In this section, users can explore a comprehensive list of runes, and by clicking on one, they can access explanatory videos, information about associated minor runes, and detailed descriptions of each. For administrators, the system offers advanced features such as creating and editing champions, managing runes, and assigning specific runes to champions. These administrative tools ensure that the app's content is always up-to-date and aligned with the latest changes in the game, providing a consistently relevant experience for users.

## Project Url:
[Lol Guide](https://lol-guide-web.web.app)

## Main technologies used in the project
>* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.2.
>* This project has implemented [Ionic](https://ionicframework.com/docs) version 8.0.0
>* This project has implemented [Capacitor](https://capacitorjs.com/) version 6.0.0

## About bootstrap
>For standardization, best practices and responsiveness, when developing new pages, think about the structure of rows and columns following the grid pattern.

**Example:**

| Grid pattern class | Description                                                                       |
|:-------------------|:----------------------------------------------------------------------------------|
| `ion-content`         | Container with spacing on the sides (width: 1200px).                           |
| `ion-grid`            | Ionic grid.                                                                    |
| `ion-row`             | Single div, must be used as a parent div that will have 1 to 12 col child divs |
| `ion-col`             | Single div, must be used as a parent div that will have 1 to 12 child divs     | 

>***The pattern shown above in the table shows the structure of the project's html pages, new pages must follow the pattern.***

**Page grid example**

~~~html
<ion-content>
  <ion-grid>
    <ion-row>
      <ion-col>
        <h1>Page title</h1>
      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
~~~

## Modularization
>The whole project is modularized, each component has its own module, in the `app.module.ts`
> folder and only called when needed, this avoids extra initial loading and endless module imports in the main system file.

## File name pattern
| Name rule      | Name pattern                                                    |
|:---------------|:----------------------------------------------------------------|
| Simple name    | `name.ts` / `name.html` / `name.css`                            |
| Compound name  | `compound-name.ts` / `compound-name.html` / `compound-name.css` |
| Directive name | `name.directive.ts` / `compound-name.directive.ts`              |
| Service name   | `name.service.ts` / `compound-name.service.ts`                  | 
| Model name     | `name.model.ts` / `compound-name.model.ts`                      | 
| Guard name     | `name.guard.ts` / `compound-name.guard.ts`                      | 
| Page name      | `name.page.ts` / `compound-name.page.ts`                        | 

## How to clone and setup up the project
> - [x] Clone the project, use de code: `git clone <project-url>` to clone the project.
> - [x] Install npm packages, use de code: `npm i` to install the packages.
> - [x] Run the project, use de code: `npm start` to run the project.

## Development server
> Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Preview app
