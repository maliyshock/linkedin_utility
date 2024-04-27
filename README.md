### The Problem
Linkedin adds a hash to every link. This hash is randomly generated every time, which leads to a situation, when links that you visited already, do not change their color. On page refresh new hash will be generated and all of the links will look just the same.
Why it is bad? Because  during the intensive search you need to understand which of the jobs are new to you and which are not, and you should not waste your time by looking at something that you already looked at yesterday or weeks ago.

The second problem. Even if you have links without random hashes you are not able to mark them as visited just by clicking on them. You have to open job description in a separate tab and for some reason cmd+click does not do the job, so you have to manually make right click and select "open in the new tab" and close it. Which is very annoying especially when you have to repeat these hundreds of times per every day.

The third problem. Optiional one. If you have a spreadsheet where you trying to track and manage all of the necessary things for yourself, you need to copy paste things manualy (link to the job description, application date, company name e.t.c) jumping between the tabs back and forward again and agin

### How does it work
You need tempermonkey extension https://www.tampermonkey.net/ (or any similar) for your browser to put the script and execute it for LinkedIn domain and subpaths `https://www.linkedin.com/*` - with a star at the end (you can do it in the settings of tempermonkey).
![image](https://github.com/maliyshock/linkedin_utility/assets/7099817/701e3792-e5bc-46e0-bda3-d72b00a5634f)


This script will run itself and iteratively check for jobs list existence in the dom `#main .jobs-search-results-list ul`. As it is defined it will create an observer which gonna:
* cut the randomly generated hash from the links
* add a click event listener to every link to be able to push this link address to browser history, making them visit on click
* adds copy button in the job description which generates a template with some job information to be able to just paste it with `cmd + v` in your spreadsheet
By default it has this structure
```
const string = generateString({
    company, status: "Отправил заявку", version: "3.1", salary:"", applicationDate: formattedDate, lastContact: "", coverLetter:"", rating: "", phase: "", comment:"", link
})
```
You can see that some of the categories like `lastContact: "", coverLetter:"", rating: "", phase: "", comment:""` are empty, it is just because i have them in my spreadsheet and i just have this structure.
You can rearrange it for your needs, by writing your selectors to get the data and changing amount of things or their order inside of `generateString` function - it takes an object with any amount of `key: string` values and generates output string in convinient for a google spreadsheet usage format and copies it to the clipboard on click.

### Known issues
Sometimes observer does not observe on `ul` being loaded :) And it happens if you change something in the search field and click on the search button again.
But... I kinda do not care and do not want to waste my time debugging this. It has not beeing made for production or else, but for myself, as a helper and timesaver. 
If you noticed that try to refresh the page or click on the job list, it should make a thing.
