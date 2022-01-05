# tsiraM-6502
tsiraM is a virtual 6502 processor written in TypeScript and running on Node.js.  This project is the practical component of Prof. Gormanly's Computer Organization and Architecture class.  This project strives to accomplish the following goals:
- A deep understanding of how the machine works. There is no better way to learn how computers actually work than to build one!
- You become a high level master of code by using OOP to create a virtual machine
- You become a low level ninja, creating programs in machine instructions to run on your creation! Enriching your understanding of the world below your compiler.
- Your design and debugging skills are pushed to solve problems that will melt your brain.  You will debug machine level code you write on a machine you built!

## What does tsiraM mean?
It needed a name and I liked WebOS since it built on web technologies and the long term is to use this VM as the basis for a Operating Systems project where you build an OS that runs on your VM.  So while WebOS makes sense for these reasons, I do not like talking to Lawyers.  tsiraM is something I bought the .dot com for a while ago and have not gotten around to using it for anything. If it makes no sense, keep trying, I left a clue.  The 'M' might stand for Microarchitecture, or maybe not.  I wonder if the lawyers will come anyway?  Regardless this is a good name until something better comes along.  Maybe SObeW instead?

## Credits
This software is an adaptation of a project created by [Dr. Alan Labouseur's](http://labouseur.com/courses/os/) for his Operating Systems (CMPT 424) course project.  That project builds a very cool operating system on top of a rudimentary virtual 6502 CPU.  This project focuses on building a robust and complete 6502 architecture and instruction set.  You will be creating a 6502 emulator programmed using TypeScript that will run on server side JavaScript in Node.js.  Here are references to Dr. Labouseur's original projects:
- 2019 version: https://github.com/AlanClasses/TSOS-2019
- 2015-2018 version: https://github.com/AlanClasses/TSOS

There are plans to possibly expand this project in a way that would allow you to continue to use it to bulid an adapted version of Dr. Labouseur's OS project on top of.  Here is an architecture diagram showing how this is planned currently.
![tsiram-6502](./resources/images/architecture/projectArchitecture-v1.jpeg)

## Getting Started

If you already have Node.js and TypeScript installed you can clone this repository, you will likely also have to install the type definitions for node to make TypeScript happy.  Once you do that, see the 'How to run' section of this doc.

If you do not have Node.js and TypeScript installed see the 'How to run' section below.

## Installation
### Node:
**Mac**
1. Recommend installation with homebrew: `brew install node`
2. You can use the following to download and run a pkg file:

`curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"`

**Windows:** There is a installer to download from Node.js website

Node getting started: https://nodejs.org/en/docs/guides/getting-started-guide/

I particularly like this resource as well: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/development_environment

### TypeScript:
Documentation: https://www.typescriptlang.org/docs/home.html

Installing TypeScript: https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
`npm install -g typescript`

## How to run
First run `npm install` to install node dependencies

Next, TypeScript must be compiled before you can run and after you make changes to TypeScript (.ts) files.  There is a provided bash script called 'c' in the project root.  You may need to add execute permission to the file before you can run.  

Once you run it, you should see that a dist/ folder is created in your project home and it contains the JavaScript that your Node.js server will run.

To start the node server run `npm start` that's it!

Once you have your project going, you should be able to recompile using the 'c' bash script and then 'npm start' to run node.

### @types/node
Type definitions to be used for Node.js. This should be installed when you run `npm install` to install dependencies. 
See : https://www.npmjs.com/package/@types/node
If they are not installed you can manually do so this way:
`npm install @types/node --save-dev`
