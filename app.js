require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

//Helpers
const encode = (data) => {
  let string = "";

  for (const [key, value] of Object.entries(data)) {
    if (!value) continue;
    string += `&${encodeURIComponent(key)}=${encodeURIComponent(`${value}`)}`;
  }

  return string.substring(1);
};

//Creates a new paste in pastebin
app.post("/pastebin", async (req, res) => {
  try {
    const { paste } = req.body;
    console.log(paste);
    const html = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        api_dev_key: "S5ICLCXBm9CBajDyIDaot7p8LJzU4_nJ",
        api_option: "paste",
        api_paste_code: paste.html,
      }),
    }).then((res_) => res_.text());

    const css = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        api_dev_key: "S5ICLCXBm9CBajDyIDaot7p8LJzU4_nJ",
        api_option: "paste",
        api_paste_code: paste.css,
      }),
    }).then((res_) => res_.text());

    const js = await fetch("https://pastebin.com/api/api_post.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        api_dev_key: "S5ICLCXBm9CBajDyIDaot7p8LJzU4_nJ",
        api_option: "paste",
        api_paste_code: paste.js,
      }),
    }).then((res_) => res_.text());

    const final = `${html.substring(html.lastIndexOf("/") + 1)}-${css.substring(
      css.lastIndexOf("/") + 1
    )}-${js.substring(js.lastIndexOf("/") + 1)}`;

    console.log(final);
    res.status(200).send(final);
  } catch (err) {
    console.log(err);
    res.status(503).send("Error");
  }
});

// Gets saved paste
app.get("/pastebin/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const ids = id.split("-");

    const html = await fetch(`https://pastebin.com/raw/${ids[0]}`, {
      method: "GET",
    }).then((res) => res.text());

    const css = await fetch(`https://pastebin.com/raw/${ids[1]}`, {
      method: "GET",
    }).then((res) => res.text());

    const js = await fetch(`https://pastebin.com/raw/${ids[2]}`, {
      method: "GET",
    }).then((res) => res.text());

    res.status(200).send({
      files: [
        {
          name: "index.html",
          data: html,
        },
        {
          name: "index.css",
          data: css,
        },
        {
          name: "index.js",
          data: js,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    res.status(503).send("Error");
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
