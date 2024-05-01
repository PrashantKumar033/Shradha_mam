const express=require("express");  // we require package
const { v4: uuidv4 } = require('uuid');
const methodOverride=require('method-override');

const app=express();

app.use(methodOverride('_method'));   // for patch,put request and other delete requests
const path=require("path");
app.use(express.urlencoded({extended:true}));// use to get any type of request get post put etc.

app.set("view engine","ejs"); // now we send ejs file to user interface
app.set("views",path.join(__dirname,"/views")); // use for the directry file 

app.use(express.static(path.join(__dirname,"public"))); // this is used for the css file
let posts=[  // here we should not create const because we cant execute delete in const array
    {// here we genereate temp data assume this data comming from db
        id:uuidv4(),
        username:"Pradumn",
        comment:"hordwork is the key of success" 
    },
    {
        id:uuidv4(),
        username:"Prashant",
        comment:"patient is most important thing"
    },
    {   
        id:uuidv4(),
        username:"Satyam",
        comment:"Always Focus on the Goal"
    }
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;  //  process.argv; thid is used in node here we taking get request
    // console.log(id);
    let post=posts.find((p)=>id===p.id);
    // console.log(post);
    res.render("send.ejs",{post});
});


app.post("/posts",(req,res)=>{
    // console.log(req.body);//in get request we get process->query we get info or argument 
    // but in post we get info from body of the req
    let id = uuidv4(); 
    let {username ,comment}=req.body;  //taken values from request
    posts.push({id,username,comment});  //adding data in post
    // res.send("Post request is working.");
    res.redirect("/posts");
});

app.listen("8080",()=>{
    console.log("port is listining");
});

app.get("/posts/:id/edit",(req,res)=>{   // for new edit content in our post
    let {id}=req.params;  //  process.argv; thid is used in node here we taking get request
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.patch("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    if (!post) {
        return res.status(404).send("Post not found");
    }
    let newcomment = req.body.comment;
    post.comment = newcomment;
    // console.log(post);

    res.redirect("/posts");
})

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcomment=req.body.comment;
    console.log(newcomment);
    let post= posts.find((p)=>id===p.id);
    post.comment=newcomment;
    // console.log(post);
    res.send("your patch request is working");
})

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts =posts.filter((p)=>id!==p.id);
    // console.log("hello");
    res.redirect("/posts");
})




// const express=require("express");

// const path=require("path"); // this is require to specify the path of any file

// const app=express();
// app.set("views",path.join(__dirname,"/views"));// by using path and this line we can run server 
// // from any folder and server will run properly no lack of file occur

// app.set("view engine","ejs"); //through it view of user set to ejs file (ejs file show to user)

// app.listen("8080",()=>{
//     console.log("port is listining");
// })
// app.get("/",(req,res)=>{
//     // console.log(process.argv); this defalut to take agrument from user in node
//     // And Global is the defalut object for the node like window in js 

//     res.render("home.ejs");
// })