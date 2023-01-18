
const express=require("express");

const bodyParser=require("body-parser");

const https=require("https");

const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html");
});

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "97e3e01a1385d26c9d2da40671772d97-us13",
  server: "us13",
});



app.post("/",(req,res)=>{
    const firstName=req.body.fname;
    const lasttName=req.body.lname;
    const email=req.body.email;

    // const data={
    //     members:[
    //         {
    //             email_address:email,
    //             status:"subscribed",
    //             merge_fields:{
    //                 FNAME:firstName,
    //                 LNAME:lasttName
    //             }
    //         }
            
    //     ]
    // }

    // const jsonData=JSON.stringify(data);
    // const url="https://us13.api.mailchimp.com/3.0/lists/7901f92d55";     //<dc> to the last us__ of the apikey
    // const options={
    //     method:"POST",
    //     auth:"sachin:e4953e358a87ecbd44f2f955a3b8f1cc-us13"
    // }

    // const request= https.request(url, options,(response)=>{
    const run = async () => {
        const response = await client.lists.batchListMembers("7901f92d55", {
          members: [
            {
                "email_address":email,
                 "status":"subscribed",
                 "merge_fields":{
                     "FNAME":firstName,
                     "LNAME":lasttName
                            },
                
            }],
        });

        if(response.total_created!==0){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
        // console.log(response);
        console.log(response.total_created);
       
      };
      
      run();


});

app.post("/failure",(req,res)=>{
    res.redirect("/");

});











app.listen(process.env.PORT ||3000,()=>{
    console.log(`server up and running on port 3000`);
});

// myApiKey
// 97e3e01a1385d26c9d2da40671772d97-us13
// list_id
// 7901f92d55
// 'https://<dc>.api.mailchimp.com/3.0/' 



// const url="https://us13.api.mailchimp.com/3.0/lists/7901f92d55";     //<dc> to the last us__ of the apikey
// const options={
//     method:"POST",
//     auth:"sachin:e4953e358a87ecbd44f2f955a3b8f1cc-us13"
// }


// const request= https.request(url, options,(response)=>{
//     response.on("info",(info)=>{
//         console.log(JSON.parse(info));
//     });

// });

// request.write(jsonData);
// request.end();
