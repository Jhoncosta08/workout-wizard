# Workout Wizard
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/logo.png)

## About the project

### App Overview

**Workout Wizard** is a mobile application focused on creating personalized workout plans for the gym. This app allows users to create and manage their own workout routines, tailoring them to their individual needs and goals. The main feature of Workout Wizard is its emphasis on individuality, giving each user complete control over their workouts.

### Key Features

#### Workout Creation
- **Total Personalization**: Users can create their own workouts by choosing from a variety of exercises available in the system.
- **Workout Groups**: Each workout can be divided into one or more groups of exercises. For example:
  - Workout 1: Chest and Shoulders
  - Workout 2: Back and Abs
  - Workout 3: Legs
- **Flexibility**: Workouts can be easily edited, allowing users to add new groups of exercises or remove exercises already added.

#### Workout Management
- **Workout Viewing**: A dedicated page allows users to see all the workouts they have created.
- **Workout Editing**: Existing workouts can be edited by adding or removing exercises and workout groups as needed.

#### User Profile
- **Profile Page**: Contains all the information added during the user's registration.
- **Information Editing**: Users can edit their personal information directly on this page.
- **Photo Upload**: Ability to upload a profile picture to further personalize the app experience.

#### Health Monitoring
- **BMI**: Based on the registration data, the app calculates and displays the user's Body Mass Index (BMI) on the dedicated BMI screen.

#### Physical Evaluation
- **Self-Assessment**: A specific screen allows users to add and monitor their own physical evaluations.
- **Evaluation Reminder**: The app shows the date for the next physical evaluation based on the last one conducted, helping users to regularly track their progress.

### Conclusion

Workout Wizard is a powerful tool for anyone looking to take control of their workout routine. With the ability to create, personalize, and manage their own workouts, monitor their physical progress, and keep their personal information up to date, the app becomes an essential companion for those seeking to achieve their fitness goals in an organized and efficient manner.


## Project Url:
[Workout Wizard](https://workout-wizard-app.web.app/)

## Project APK:
[Workout-Wizard download APK](https://raw.githubusercontent.com/Jhoncosta08/workout-wizard/master/src/assets/previews/workout-wizard.apk)

## Main technologies used in the project
>* This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.2.
>* This project has implemented [Ionic](https://ionicframework.com/docs) version 8.0.0
>* This project has implemented [Capacitor](https://capacitorjs.com/) version 6.0.0

## best practices and responsiveness
>For standardization, best practices and responsiveness, when developing new pages, think about the structure of rows and columns following the grid pattern.

**Example:**

| Grid pattern class | Description                                                                       |
|:-------------------|:----------------------------------------------------------------------------------|
| `ion-content`         | Container with spacing on the sides (width: 1200px).                           |
| `ion-grid`            | Ionic grid.                                                                    |
| `ion-row`             | Single div, must be used as a parent div that will have 1 to 12 col child divs |
| `ion-col`             | Single div, must be used as a child div that will have 1 to 12 divs            | 

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
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-1.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-2.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-3.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-4.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-5.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-6.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-7.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-8.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-9.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-10.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-11.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-12.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-13.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-14.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-15.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-16.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-17.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-18.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-19.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-20.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-21.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-22.png)
![image](https://github.com/Jhoncosta08/workout-wizard/blob/master/src/assets/previews/preview-23.png)
