# **Brief Description**
This website was developed by ID: 00009575 (WIUT) for Web-technology module.
It includes back-end and front-end parts. For developing back-end
express node js framework was used. For front-end Materialize CSS framework was also used.

This application was developed to allow multiple users to create and manage their blogs about any topic.
It allows creating, deleting, and viewing all blogs posted on the website

## How to run it
1. Install Node JS if it is not installed
2. Download the files and place into a folder.
3. Open the terminal and navigate to the folder of project.
4. Type `npm install` to install all dependencies.
5. Type `npm run start` to run the application. 

## Dependencies
express, multer, pug

## Development Dependencies
@types/express, nodemon

## How users can use it
When users enters the website, main page is opened. There is a welcoming message and two buttons for creating new blog and viewing all blogs.
In creating-blog page there is a form for creating a new blog. After filling in the form user can either submit it or firstly preview his blog and then submit.
Then he will be redirected to "thank you" page, and new blog will be added to the database.
List of blogs can be found in "all blogs" page. User can view each blog in details too. On details page user can delete the blog, and the blog will be added to the list of deleted blogs.
This list can be accessed on a separate page. From details of deleted blogs, user can permanently delete the blog. 
## GitHub and Glitch links:
https://github.com/ID00009575/WebTech.CW2.9575
https://9575-blog.glitch.me/