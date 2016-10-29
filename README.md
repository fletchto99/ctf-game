# CTF Game

CTF game is a mini-CTF challenge I made for the University of Ottawa. It was made for people to learn/have a go at CTFs. This repository contains the solutions along with the challenges.

## How to Run

Challenges 1-3 required you to build a postgres database using the build script found in the database directory.

Challenge 4 required a flag.txt owned and read only by root file in a lower privileged user's home directory. The server needed to be out of date and vulnerable to dirtycow. The idea was to exploit dirty cow to read the flag.txt file.

Challenge 5 is app.c which would be compiled and running, listening for incoming connections on a server. If the input is something specific the it will read a flag.txt file

Challenges 6-9 can all be done locally w/ internet access for research.

Challenge 10 was lock picking done at the event.

## Solutions

See the individual challenge folders