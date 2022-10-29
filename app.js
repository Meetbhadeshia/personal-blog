//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash")

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');
//storing all the post objects into this posts array here
let posts = []

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {

  //sending all the posts here
  res.render('home', {
    StartingContent: homeStartingContent,
    posts: posts
  })
})

app.get("/about", (req, res) => {
  res.render('about', {
    aboutCon: aboutContent,
  })
})

app.get("/contact", (req, res) => {
  res.render('contact', {
    contactCon: contactContent,
  })
})

app.get("/compose", (req, res) => {
  res.render('compose')
})

//here anything is user specified. This shows dynamic urls in express. for example
// '/users/:userId/attachments/:attachment'
// '/posts/:father.:son'
// '/posts/:from-:to'
// you can check what user wrote is in req.params
app.get("/posts/:postContent", (req, res) => {
  //using lodash to lower case the user's requested url
  const requestedContent = _.lowerCase(req.params.postContent)
  posts.forEach((post) => {
    const postTitle = _.lowerCase(post.title)
    const postContent = post.content
    //checking if requested url is same with the title
    if (requestedContent === postTitle) {
      res.render('post', { postTitle: postTitle, postContent: postContent })
    }
  })

})

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  }
  posts.push(post)
  res.redirect('/')
})

app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
