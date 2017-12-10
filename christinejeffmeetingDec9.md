# Notes from Christine and Jeff's meeting on December 9th
Both of us agreed that this project has three distinct parts 
* The model, which is responsible for receiving JSON objects from the backend and returning predictions
* The backend server, which will act as an intermediary by transmitting user input to the backend, then returning the backend's predictions
* The frontend, which will display our results, request data from the server, and send user inputs to our backend 

Christine and I thought we could keep each of these parts separate until we need to join them together. We can probably just have a standard 'Frontend' folder for our react frontend, then include our bundle.js in the root html our server sends back
Our model will need to be incorporated into our backend eventually, but for now we will be keeping it separate. 

I (Jeff) will try to set the backend up as soon as possible, as it seems that this piece is the most essential for everyone else to begin working.
