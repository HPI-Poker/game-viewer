# Official Poker Viewer for HPI Showdown

View a poker match generated from the HPI Showdown engine. Upload  

## Requirements
You only require `node.js`.

## Setup
To setup simply run: `npm install`.

## Starting the viewer
Run `npm start`.

## Usage
After starting the viewer you have two options:

### Uploading a summary.json
In the `logs/summary/` directory of your poker engine repository you will find summary json files. You can upload them here to view that match.

### Viewing an example match
You can select one of the example matches if you do not have a summary json available.

## Deploying
We deploy to github pages by running:
`npm run deploy`
The updated website will be available under https://hpi-poker.github.io/game-viewer.

## Credits
For the Playing Cards we are using:
Vectorized Playing Cards 3.2
https://totalnonsense.com/open-source-vector-playing-cards/
Copyright 2011,2021 – Chris Aguilar – conjurenation@gmail.com
Licensed under: LGPL 3.0 - https://www.gnu.org/licenses/lgpl-3.0.html

And for the Poker Chips:
https://www.svgrepo.com/svg/4886/poker-chip