                                                LOCATIONS CURRENT TIME

This is a small application to get the current day time in different places around the world. The application has been
done using the following technologies:

    * Angular 1.5.10
    * Firebase 3.2.1
      - Realtime database.
      - Authentication.
      - Hosting.
	  - Storage.
    * AngularFire 3.2.0
	* FirebaseUI
    * Google Places API
    * Google Maps TimeZone API
	* Google Maps markers
    * Azure Functions
    	- C# Function
	- NodeJs Function
    * Azure Store Tables
    * Azure Service Bus
    * Microsoft Bot Framework
	* Microsoft Power BI
    
Functionality:

There is a live version of this code hosted using Firebase hosting is available here: https://citytimer-90920.firebaseapp.com. 
Your can either login using your email or create a new account. Once you have your account you will be able to search for your favorite
place to know which hour is there. Every request is logged in the Firebase database and also stored in an Azure store table using Azure
functions.

*New features:
	- Allow user to select a place in the world and upload an image using Firebase Storage.
	- Show the image in a Google Maps.
	- Bot that receives a place name and response with the current date time at this location.
	- Azure Service Bus (every time the bot receives a location puts a message in the service bus to trigger a NodeJs Azure Functions
	- NodeJs Azure function to store the request received by the bot in Firebase.
	- Use the new implementation of AngularFire 3.2.0 - Storage
	- Microsoft Power BI to display data.
	- FirebaseUI in order to improve the authentication flow.

RoadMap:

    * Add admin Portal.

Disclaimer:

The idea behind this app is to proof profency in different technologies. The code is not meant to be use in a production
environment. It doesn't have any warranty and it's provided as "it is".
