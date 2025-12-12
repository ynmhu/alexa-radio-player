📻 Alexa Radio Player Skill
Simple Alexa skill to play Hungarian and Romanian radio stations using voice commands.
🎯 Features

Play radio stations by number (1, 2, 3) or name
Minimal voice responses
Support for 14+ radio stations
Easy to extend with more stations

📡 Available Stations

Play 1: Szépvíz FM
Play 2: Kossuth Radio
Play 3: Vásárhelyi Rádió
Play gaga: Radio GaGa
Play info: Info Radio
Play radio 1: Radio 1
Play petofi: Petőfi Radio
And more...

🚀 Installation
Prerequisites

Amazon Developer Account
AWS Account (for Lambda)

Step 1: Create Alexa Skill

Go to Alexa Developer Console
Click Create Skill
Name: "My Player" (or any name you want)
Choose Custom model
Choose Provision your own backend

Step 2: Configure Interaction Model

Go to Build → JSON Editor
Copy the content from skill-package/interactionModels/custom/en-US.json
Paste it into the JSON Editor
Click Save Model → Build Model

Step 3: Deploy Lambda Function

Go to AWS Lambda Console
Create new function: Node.js 18.x runtime
Copy content from lambda/index.js
Add layer: ask-sdk (from Lambda layers)
Copy the Lambda ARN

Step 4: Connect Skill to Lambda

In Alexa Developer Console → Build → Endpoint
Select AWS Lambda ARN
Paste your Lambda function ARN
Save and build

Step 5: Test

Go to Test tab
Enable testing
Try: "Alexa, open my player"
Say: "play 1" or "play gaga"
