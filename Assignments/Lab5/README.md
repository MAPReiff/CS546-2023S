CS-546 Lab 5
============

JSON Routes
-----------

For this lab, you will create a simple server that will provide data from a server.

**For this lab, you will not need to use a database. You can store your data right in your routes, as local variables.**

**You can download the starter template here: [lab5\_stub.zip](https://sit.instructure.com/courses/64643/files/11251270?wrap=1 "lab5_stub.zip") [Download lab5\_stub.zip](https://sit.instructure.com/courses/64643/files/11251270/download?download_frd=1) PLEASE NOTE: THE STUB DOES NOT INCLUDE THE PACKAGE.JSON FILE. YOU WILL NEED TO CREATE IT! DO NOT FORGET TO ADD THE START COMMAND AND "type": "module". DO NOT ADD ANY OTHER FILE OR FOLDER APART FROM PACKAGE.JSON FILE.**

General Notes
-------------

Lecture videos and demos tend to show JSON as "pretty", but your browser may not natively do that -- that's fine!

There are extensions for most major browsers that add that functionality, such as:

1.  [JSONView for FirefoxLinks to an external site.](https://addons.mozilla.org/en-US/firefox/addon/jsonview/)
2.  [JSONView for ChromeLinks to an external site.](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)

In addition to that, you probably won't see the actual line breaks, and will see the `\n` character in your JSON -- this is normal, and expected.

Your routes
-----------

### `/aboutme`

When making a GET request to `http://localhost:3000/aboutme`, this route will return JSON in the following structure (with your own information):

```
{
  "firstName": "Your First Name",
  "lastName": "Your Last Name",      
  "biography": "2 biography paragraphs separated by a new line character (\n).",
  "favoriteMovies": ["array", "of", "favorite", "movies"],
  "hobbies": ["array", "of", "hobbies"],
  "fondestMemory": "One of your fondest memories from your life as far"
}
```

### `/mystory`

When making a GET request to `http://localhost:3000/mystory`, this route will return the following JSON:

```
{
  "storyTitle": "Story Title",
  "storyGenre": "Story Genre i.e. Horror, Fiction, Non-Fiction, biographical",
  "story": "Your creative story.\nSimply use line breaks for paragraphs.\nLike this."
}
```

### `/educationhistory`

When making a GET request to `http://localhost:3000/educationhistory`, this route will will return JSON in the following structure (with your own information):

```
[
    {
      "schoolName": "First School Name",
      "degreeEarned": "First School Degree",
      "numberOfYearsAttended": number,
      "favoriteClasses": ["array", "of", "favorite", "classes"],
      "favoriteSchoolMemory": "A memorable memory from your time in that school"
    }
]
```

**Make sure to include at least 3 schools**. For your degreeEarned, If you list your High School, then for the degreeEarned field just use `H.S. Diploma` as the value.

Packages you will use:
----------------------

You will use the **express** package as your server.

You can read up on [expressLinks to an external site.](http://expressjs.com/) on its home page. Specifically, you may find the [API Guide section on requestsLinks to an external site.](http://expressjs.com/en/4x/api.html#req) useful.

You may use the [lecture 5 codeLinks to an external site.](https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05) as a guide.

**You must save all dependencies to your package.json file**

Requirements
------------

1.  You **must not submit** your node\_modules folder
2.  You **must remember** to save your dependencies to your package.json folder
3.  You **must remember** to update your package.json file to set `app.js` as your starting script!
4.  You **must** submit a zip, or you will lose points, named in the following format: `LastName_FirstName_CS546_SECTION.zip.`