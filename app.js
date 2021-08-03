const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();


app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(request,response){
  response.sendFile(__dirname+"/signup.html");
})


app.post("/",function(request,response){
  const fName=request.body.firstName;
  const lName=request.body.lastName;
  const email=request.body.emailAddress;
  const data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fName,
          LNAME:lName

        }
      }

    ]
  };

  const jsonData=JSON.stringify(data);

  const url="https://us6.api.mailchimp.com/3.0/lists/ffa6f47b8a";
  const options={
    method:"POST",
    auth:"vansh:a88b04ce28049232e1a697e2184af9ee6-us6"
  }


  const req=https.request(url,options,function(res){
    if (res.statusCode===200){
      response.sendFile(__dirname+"/success.html");
    }else{
      response.sendFile(__dirname+"/failure.html");
    }
    res.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
  req.write(jsonData);
  req.end();
});


app.post("/failure",function(request,response){
  response.redirect("/");
})





app.listen(process.env.PORT || 3000,function(){
  console.log("Server running on 3000");
})
