This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# RiveScript Tester
RiveScript Tester is a client-side, ReactJS powered RiveScript editor and tester.
  - Type some RiveScript on the left
  - Interact with the RiveScript using a chat bot on the right

## Motivation
[RiveScript](https://www.rivescript.com/) is a scripting language that allows you to write code for chatbots. This tester was created to allow you to write and test RiveScript on-the-fly against a chatbot on the web, and download the script once you are happy with it.

## Screenshots
![image](https://user-images.githubusercontent.com/36954990/44026712-532173de-9f37-11e8-9fc2-40c3594626d4.png)

## Tech Stack
- Javascript ES6
- [ReactJS](https://reactjs.org)
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Material-UI](https://material-ui.com)
- [Styled Components](https://styled-components.com)
- [CodeMirror](https://github.com/codemirror/codemirror)
- [RiveScript-JS](https://github.com/aichaos/rivescript-js)

## Features
  - Upload and Download RiveScript .rs or .rive files
  - Instant testing of script with bot interface
  - Code editor experience

## How to use?
The easiest way is to visit the official website [RiveScript Tester](https://rivescript-tester.herokuapp.com) and have a play around.  
A default script will load in the editor which can be run by clicking RUN and then typing a message to the bot in the ChatBot window. This will load the script into the Intepreter and compile it. You can see a detailed breakdown (debug) by viewing the console log. If the bot doesn't have a programmed response, it will respond with "ERR: No Reply Matched".  

You can also upload your own scripts, and download the script in the editor. The editor also has a few sublime-style shortcuts which makes it easier to code, the most useful of which will be **Ctrl + ]**, which indents two spaces.

For resources on how to write your own RiveScript check out the [Offical Docs](https://www.rivescript.com/docs/tutorial).

## Roadmap
  - Debug mode
  - Syntax Highlighter
  - Syntax Suggestion Engine