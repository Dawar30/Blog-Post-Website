import express from 'express';
import bodyParser from 'body-parser'
import slugify from 'slugify';




const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get('/', (req, res) => {
  res.render("index.ejs", { 
    posts: posts,
  });
});

app.get("/compose", (req, res) => {
  res.render("partials/form.ejs");

})

app.post("/compose", (req, res) => {
  const { title, content } = req.body;
  const blog = {
    title: title,
    content: content,
    slug : slugify(title, { lower: true, strict: true }),
  }
  posts.push(blog);

  res.redirect("/");

})
app.get("/post/:slug", (req, res) => {
  const requestedSlug = req.params.slug;
  const foundPost = posts.find(post => post.slug === requestedSlug);
  if (foundPost) {
    res.render("partials/posts.ejs",{
      title: foundPost.title,
      content: foundPost.content,
    });
  }
  else {
    res.status(404).send("<h1>Post not found</h1>");
  }
})

app.get('/edit/:slug', (req, res) => {
  const slug = req.params.slug;
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return res.status(404).send("Post not found");
  }

  res.render('partials/edit.ejs', { post: post });
});

app.post("/edit/:slug", (req , res ) => {
  const requestedSlug = req.params.slug;
  const foundPost = posts.find(post => post.slug === requestedSlug);
  if (foundPost) {
    foundPost.title =  req.body.title;
    foundPost.content = req.body.content;
    res.redirect("/");
  }
  else {
    res.status(404).send("<h1>Post not found</h1>");
  }

})

app.get("/delete/:slug", (req , res ) => {
  const requestedSlug = req.params.slug;
  const PostIndex = posts.findIndex(post => post.slug === requestedSlug);
  if (PostIndex !== -1) {
    posts.splice(PostIndex, 1);
    res.redirect("/");

  }
  else {
    res.status(404).send("Post not found");
  }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})


