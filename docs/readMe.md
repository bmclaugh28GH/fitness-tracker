## Fitness Tracker

# Purpose

Fitness Tracker allows a user to enter (very) basic data about a workout, namely a workout name/type and a number of calories burned. The data is stored in a mongoDB database collection. A create date is added by default. 

When a workout is submitted by the user, it's not only added to the DB. It's added to a text list on the page, and a bar chart listing calories burned. 

The user can also delete a workout, which will remove its data from the DB, the list, and the chart. 

# Notes

The purpose of the homework, I believe, is to demonstrate some famliarity with mongoDB and its models. It was also a fun introduction to npm package chart.js. 

I struggled with converting the example Ranjan recommended, which used webpack and was therefore able to 'require' chart.js, to using a .js file on the client side. Thanks to Ranjan for pointing me toward the chart.js CDN. 

