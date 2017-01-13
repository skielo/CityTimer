                                                LOCATIONS CURRENT TIME

This is a small application to get the current day time in different places around the world. The application has been
done using the following technologies:

    * Angular 1.5.10
    * Firebase 3.2.1
      - Realtime database.
      - Authentication.
      - Hosting.
    * Google Places API
    * Google Maps TimeZone API
    * Azure Functions
    * Azure Store Tables
    
Functionality:

There is a live version of this code hosted using Firebase hosting is available here: https://citytimer-90920.firebaseapp.com. 
Your can either login using your email or create a new account. Once you have your account you will be able to search for your favorite
place to know which hour is there. Every request is logged in the Firebase database and also stored in an Azure store table using Azure
functions.

RoadMap:

    * Build a DotNet Core API to connect this app with Azure tools.
    * Add bot chat using Microsoft Bot Framework.
    * Use Power BI to show collected data.
    * Add adming Portal.
    * Display the location in google maps.

Disclaimer:

The idea behind this app is to proof profency in different technologies. The code is not meant to be use in a production
environment. It doesn't have any warranty and it's provided as "it is".
