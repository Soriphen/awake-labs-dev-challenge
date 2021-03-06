# Awake labs dev challenge

Two different visualizations linked together, one is a donut chart and the other a line graph. They represent information that tells of the person's anxiety level and heart rate along with the time they both were recorded. The colour of the graph and pie chart is supposed to change to represent the anxiety state, but hasn't been implemented yet.

## Write-up

I chose to represent the anxiety level through a percentage done with a donut chart, and having the anxiety state represented through a change in colour. The idea was so that the user can give a quick glance at the donut chart and see the percentage of anxiety level, and if it is 100% then the colour of the graph would help give that extra information of whether their anxiety state is high, low, etc. Then, underneath that graph is a BPM measure for the heart rate which gives a bit more additional information. So, if the user sees 100% anxiety level, they would look at the colour and get an idea of the anxiety state, and finally look at the BPM and see if it is higher than what should be normal. However, instead of having a number I would like to have a bar to show whether the BPM has hit a danger zone or not, along with the number.

The next idea, which I didn’t have time to implement, was to add a thin progress bar to show the baselineProgress in a drawer menu on the left, along with the participantId, organizationID and careTeamID. The progress bar would have a small-ish text on top of it displaying, “capturing new baseline”.

The next visualization is the statistics screen which would display the 10 most recent baseline updates, which the user can change the range of to display up to 30 (this hasn't been implemented yet, but is the idea). They should be able to also get extra data from a date range they can specify, however, this might overcomplicate things.

In terms of libraries I used, I wanted to use NativeBase for accessibility purposes and for ease of styling that would help when scaling the project down the road. I also wanted to use d3.js because I think it gives me extra control over making graphs as opposed to a library that has already made graph components etc.

My approach to this project was to first read what the challenge was about. Then read about what the technology measures. To be honest, when I saw that it was going to take 2-3 hours I thought that it probably wouldn't take that short of a time, so I took note of that in constructing how my project would be made. I checked how the technology is measured and the first thing I noticed was that a baseline reading would be compared to subsequent readings. So, there would be a sort of timeline of readings that would need to be displayed, and in those readings I thought that there would need to be a way to display the anxiety levels with enough information to kind of discern whether the user is experiencing something akin to positive emotions or negative emotions, so I chose anxiety level, anxiety state, and bpm to be displayed.

After that, I took a look at the two user personas and saw that Lin Campbell loves to work and see that the person she is supporting is having an enjoyable day. She is technologically literate and seems to be quick in learning. She also wants to have progress information of the person she is supporting. As for Sam, he wanted an application that was accessible and easy to use so he would feel less stressed. He also is hesitant in asking for help and needs repeated reassurance to understand how to understand "elements of a support plan".

So, this told me that I would have to build an app that has clear visual feedback on whether a person is enjoying their day or not with colour coordinated information, while also providing enough information to appease Lin's desire for information, but at the same time have it be intuitive enough to understand at a glance for someone like Sam to not be overwhelmed with. I wanted to prevent too much screen clutter, so I separated the measure and statistics screen as well. What I hoped to do also was to give additional information that can be accessed by people like Lin who wants to see it (in the statistics screen). Essentially, the idea was to have as much pertinent information as needed, with as little menu diving as possible and done through UI/UX that communicates without having to explicitly tell you what it does.

## To-Dos

- Label does not show the correct date in accordance to the anxiety level. Perhaps due to how the scaling was done. Find another way to abstract the data to exactly show the correct date with anxiety level.

- Link the statistics screen with the measure screen in that the data from the statistics screen will update the display of donut chart in real time.

- Have colour of graphs change based on anxiety state once measure and stat screens are linked.

## Usage

```sh
npm start
```
