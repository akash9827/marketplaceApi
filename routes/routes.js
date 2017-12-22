
module.exports=function(app,token,baseURL,request){
	
app.get('/',function(req,res){
	res.send("Marketplace API");
})

app.get('/offers',function(req,res){
	//var url= baseURL+"/offers?apiKey="+token
	var url= baseURL+'/offers'
	var headers={
		"X-SmartToken":token
	}
//	var url= "https://api.smartrecruiters.com/v1/offers?apiKey="+token;
	
	request({headers:headers, uri:url, method:"GET"},function(err,response,body){
		console.log("error "+err)
		console.log("Offers-> "+response);

		res.json(response)

	})
})

app.post('/screeningQuestions',function(req,res){

	var uuid= req.body.uuid;
	var url= baseURL+"/postings/"+uuid+"/configuration";
	var headers={
		"X-SmartToken":token
	};
	request({headers:headers, uri: url, method:'GET'} ,function(err,response,body){
		
		if(err)
			console.log(err);
		
		console.log("screeningQuestions for uuid: "+uuid+" are -> \n"+response)
		res.json({"screeningQuestions: ":screeningQuestions});
	})


})


app.post('/postApplication',function(req,res){
	var uuid= req.body.uuid;
	var firstName= req.body.firstName;
	var lastName= req.body.lastName;
	var email= req.body.email;
	var answerArray=req.body.answerArray;


	//only required fields
	var formBody= {
		"firstName":firstName,
		"lastName":lastName,
		"email":email,
		"answers": answerArray
		}

	var url= baseURL+"/postings/"+uuid+"/candidates";
	var headers= {
		"X-SmartToken":token
	};


	request({headers:headers,uri:url,method:"POST",body:formBody},function(err,response,body){
		if(err)
			console.log(err);

		console.log(response);
		res.send('application posted');
	});
})

app.post('/candidateStatus',function(req,res){
	var uuid= req.body.uuid;
	var candidateId= req.body.candidateId;

	var url= baseURL+'/postings/'+uuid+"/candidates/"+candidateId+"/status";
	var headers={
		"X-SmartToken":token
	}
	request({headers:headers,uri:url,method:"GET"},function(err,response,body){
		if(err)
			console.log(err);
		console.log(response);
		res.json(response);
	})
})



}
/*
// required to post application
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "answers": [
    {
      "id": "string",
      "records": [
        {
          "fields": {}
        }
      ]
    }
  ]
}

*/