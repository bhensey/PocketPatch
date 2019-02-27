#!/bin/bash

if [ -d "PocketPatch" ]; then
	cd PocketPatch/PocketPatch
	git pull origin master
	npm install
	npm start
else
	git clone https://github.com/cs394-w19/PocketPatch
	cd PocketPatch/PocketPatch
	npm install
	npm install expo-cli
	npm start

fi