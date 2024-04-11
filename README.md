# idoven-ecgrender

This app renders Encelogram data in a chart. To do that, select your text file with the data and wait for it to be displayed.
Currently, the loading text is not being displayed and it is hard to guess what is happening after selecting the file. But once the file is selected, we start to parse the data and render it. While this is not fixed, you might rather check the console for some minor feedback.

Libraries used:
- chart.js and chartjs-plugin-zoom to render the data in a chart while being able to zoom in/out and move along the chart.
- MaterialUI to render some of the components

Missing pieces:
- browser performance when loading the data and playing with the chart was not the best (at least on my old machine)
- the chart is quite ugly, would be nice to play around with the coloring options
- due to lack of time, there are no useful unit tests to verify the app behaves as expected

# How to run the app

Clone the repo and run `npm start`

