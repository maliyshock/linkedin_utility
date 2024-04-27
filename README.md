### The Problem
Linkedin adds hash to every link. This hash is randomly generated every time, which leads to situation, when links that you visited already, do not change their color. On page refresh new hash will be generated and all of the links will look just the same.
Why it is bad? Because  during the intensice search you need to understand which of the jobs are new to you and which are not, and you should not waste your time by looking at something that you already looked yesterday or weeks ago.

The second problem. Even if you have links without random hashes you are not able to mark them as visited just by clicking on them. You have to open job description in separate tab and for some reason cmd+click does not do the job, so you have to manualy make right click and select "open in the new tab" and close it. Which is very annoying espetially when you have to repeat this hundreds of time per every day.

The third problem. Optiional one. If you have a spreadsheet where you trying to track and manage all of the necessary things for your self, you need to copy paste things manualy (link to the job description, application date, company name e.t.c) jumping between the tabs back and forward again and agin

### How does it work
You need tempermonkey extension https://www.tampermonkey.net/ (or any similar) for your browser to put the script and execute it for linkedind domain and subpaths https://www.tampermonkey.net/* (youo can do it in the settings of tempermonkey).

This script will run itself and iteratively chek for jobs list existance in the dom `#main .jobs-search-results-list ul`. As it is defined it will create observer which gonna:
* cut the random generated hash from the links
* add click event listener to every link to be able to push this link adress to browser history, making them visited on click
* adds copy button in the job description which generates a template with some job information to be able to just paste it with `cmd + v` in your spreadsheet
By default it has this structure
```
const string = generateString({
    company, status: "Отправил заявку", version: "3.1", salary:"", applicationDate: formattedDate, lastContact: "", coverLetter:"", rating: "", phase: "", comment:"", link
})
```
You can see that some of the categories like `lastContact: "", coverLetter:"", rating: "", phase: "", comment:""` are empty, it is just because i have them in my spreadsheet and i just have this structure.
You can rearange it for your needs, by writing your selectors to get the data and changing amount of things or their order inside of `generateString` function - it takes an object with any amount of `key: string` values and generates output string in convinient for a google spreadsheet usage format and copies it to the clipboard on click.
