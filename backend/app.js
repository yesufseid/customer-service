const experss=require("express");
const http = require("http");

const bodyparser=require("body-parser");
require("dotenv").config()
const router=require("./routes/router")
const errorHendlerFunction=require("./middleware/error-hendler")
const notFound=require("./middleware/not-found")
const prompt=require("./utils/gamini")
var cors = require('cors')
const path = require("path");
//////
const app = experss();

// Serve static files from /public
app.use('/widget', experss.static(path.join(__dirname, 'public')));


//middlware
app.use(experss.json({limit: '25mb'}));
// app.use(bodyparser.urlencoded({extended:true}))
app.use(cors())
//routes
app.use("/",router);
app.post("/api/message", async (req, res) => {
  const { chatbot_id, message } = req.body;
   const data=await prompt(message)
  res.json({
    reply:data
  });
});
app.use(notFound)



// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0" ,() => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});