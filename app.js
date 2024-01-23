import express from "express";
import lodash from "lodash";
import morgan from "morgan";
import path from "path";
import url from "url";
import nunjucks from "nunjucks";

const app = express();

// The project root directory
const rootDir = url.fileURLToPath(new URL(".", import.meta.url));

// Configure the Express app
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

nunjucks.configure("views", {
    autoescape: true,
    express: app,
  });

// Endpoints
app.get('/', (req, res) => {
    res.render("home.html");
});

app.get('/hello', (req, res) => {
    res.send('Wassup!');
});

app.get('/form', (req, res) => {
    res.render("form.html")
})

app.get('/welcome', (req, res) => {
    const name = req.query.person
    res.send (`Welcome, ${name}!`)
})

app.post('/fav-number', (req, res) => {
    const favNum = req.body.favNum
    res.send (`Your favorite number, ${favNum}, has been saved to the database.`);
})

app.post('/user/:username', (req, res) => {
   const favColor = req.body.color;
   
   res.send(`Thanks, ${req.params.username}, your favorite color is ${favColor}.`);
})

app.get('/template-demo', (req, res) => {
    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
    
    res.render("template-demo.html", { date: formattedDate});
});

app.get('/bridge', (req, res) => {
    res.render("bridge.html");
})

app.post('/other-side', (req, res) => {
    //destructuring
    // const {name, quest, color} = req.body;
    const name = req.body.name;
    const quest = req.body.quest;
    const {color} = req.body;
    const arr = [1, 2, 3];
    res.render("other-side.html", {
        user: name,
        quest: quest,
        color: color,
        nums: arr

    });
});


app.listen('8000', () => {
    console.log(`mo money mo problems on http://localhost:8000`);
});


