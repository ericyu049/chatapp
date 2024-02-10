# Chatapp

This is a Chat Application written in with Angular version 15.2.4 and Node.js version 16.20.2 (npm v8.19.4)

## How to run the application

- Run `npm install`. 
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Background

This is a basic chat application with functionalities such as send, receive, and delete messages. There is no backend attached to this project. All REST API calls are mocked using HTTP interceptors. Data will be cleaned on page refresh. There is also no login functionality, so you are default to the user "Oreo"


## User Flow

### Send a Message

To send a message, click on the send icon button next to your profile picture at the top left.


A modal will popup, here you can select the recipient, and click send message. As of now, only 1 user is supported.


The chat section will show up on the main portion of the homepage, you can now enter your message at the bottom textarea, as well as adding emojis, and send the message by pressing the 'Enter' button on your keyboard.

Once 'Enter' is clicked, your message will be sent, and your message will show up on the chat log.

You will also be able to see your latest messages on the left of the page.

### Receive a Message

To receive a message, you can click on the "Receive Test Message" button under your profile picture. Since there is no backend or any socket technology to watch for incoming messages, this button is a temporary solution to receive random messages from random users in the "friend list".

Once the "Receive Test Message" button is clicked, you will see the recent message on the left. You can then click on one of them to open up the chat section, and send message to that user.


### Delete a Message

When you hover on the message in the chat section, you will see a little overlay on the right side of the page

You can then click on the "Delete Message" button to delete the current message you are hovering on.

### Technology Implementation

This appliction is written in Angular, but it does not have a built-in state-management feature like React.js has. If we want good state management system in the project we would have to use NgRx. However, setting up NgRx can take a lot of time, so we are using just basic Observables to manage states through different components.

For example, receiving a message requires a state update to let the recent message panel and the current chat window know so that it can refresh. This would be hard to achieve if we are just passing data around through @Input and @Output.



### Next Step

Since there is only a very limited time to build this application, there are many functionalities that this chat application does not support and I would like to work on in the future.

1. Authentication - Authenticating user so that they can have their own profile and connect with other friends, instead of using fake data

2. Nudge Function - Next to the emoji icon at the bottom, there is a nudge emoji, however, this button doesn't do anythin right now. I would definitely like to add this feature so that you can send nudges to the other person to alert them that you would like to connect.

3. Seach Function - There is a searchbar under the profile, but it does not do anything right now. The search function can allow you to search for previous messages or find a user to send message to.



