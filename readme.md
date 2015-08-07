# WDInstagram!

<img alt="A picture of nice food taken by a distant friend." src="public/images/instagramming-food.jpg" width="700px"/>

> Here we go, guys, we're making a platform for sharing images!

## Setup

Provided here is a large amount of starter code. There is an Express app, a
view template, and assets. You will have to create a Mongoose/MongoDB 
persistence schema, write in route handlers, fill out the view templates with 
EJS and any other necessary HTML, and style it!

You may also want to write a **seed file** to have data in the website as you 
build and test it. *How would that work?*

## Completion

Work with a group, and split up the effort between you. You can break up the
work however you like, but here are some suggested features:

#### A user can see an entry.

Create a view and route handler to see a single entry. Pass to it the necessary
data in a hard-coded format. This will largely be about styling and passing
data.

#### A user can see a list of photos from the database.

Set up Mongoose, create a schema, and write the necessary code to read the 
entries from the database. Display the database's contents in the entries list.

#### A user can add (create) a new photo.

Plan and write the necessary form for creating entries. An entry has the
following:

* `author`
* `photo_url` (we aren't uploading photos, just linking to photos online for now)
* `date_taken`

Make sure you can POST the form and handle the request. Use `console.log` to
check the params. Write the necessary code, to persist the posted data.

## Next Steps - A Complete App

A complete application should have the following routes, at least:

- `GET /entries`: shows a list of all of the entries (use `entries/index.erb`)
- `GET /entries/:id`: shows a single entry (can use `entries/index.erb` or a `entries/show.erb`)
- `GET /entries/new`: shows the form for a new entry (use `entries/new.erb`)
- `POST /entries`: creates a new entry with the POSTed data, and redirects to
  `GET /entries/:id`

## Next Steps - Style

Make the site look however you want! It's already been set up with some CSS that
can help you to mock Instagram's look & feel, if you like.

We structured our index page (list of entries) to look like this:

<img src="public/images/example-index.png" width="600px" />

Finally, we structured our new page (form) to look like this:

<img src="public/images/example-new.png" width="600px" />

We structured our entries after this image, found online:

![](public/images/example-entry.png)

### Bonus

1. Add the ability to like, or upvote, the entries by clicking on the heart.
1. Add validation: `author` and `photo_url` need to be present, and the 
   `date_taken` should be today by default.
1. Add a `caption` to your entries.
hi
