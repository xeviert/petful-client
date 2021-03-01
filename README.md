# Petful Client

## Live App: https://petful-client-hazel.vercel.app
## Server Repo: https://github.com/xeviert/petful-server

### Skills used for client:
JavaScript, React, HTML5, CSS3

## Description
Small project showcasing use of queue data structure. 


+ Home page
    + This page gives a description of the adoption process and acts as a landing page for the app.
    + The button at the bottom of the home page takes you to the adoption page.

+ Adopt Page
    + The user can view the adoption process happening in real time.
    + Pet options are displayed at the top of the page along with the pet's information such as name, sex, age, and story, along with a picture of said pet.
    + The list of a adopters are listed at the bottom of the page in FIFO order (first-in-first-out).
    + After a few seconds the next person in queue randomly picks one of the pets to adopt and both the pet and person get taken out of the list. 
    + The user has the option to enter their name in the submission box to get added to the queue of adopters. 
    + Once the user reaches the front of the line the user gets the option to adopt one of the two available pet options.
    + The list of people gets replenished by an array of random names so the list can effectively go on forever.


### Client deployed to Vercel

