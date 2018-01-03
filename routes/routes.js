
module.exports=function(app,token,baseURL,request,FormData,fs){
	
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
		if(response.statusCode==200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}

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

		if(response.statusCode==200){
			console.log("response"+response);
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
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

		if(response.statusCode==200){
			console.log("response: "+response);
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
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

		if(response.statusCode==200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})

app.post('/assessmentOrderById',function(req,res){

	var assessmentOrderId= req.body.assessmentOrderId;
	var url= baseURL+"/assessments/"+assessmentOrderId;
	var headers={
		"X-SmartToken":token
	}
	request({headers:headers, uri:url,method:'GET'},function(err,response,body){
		if(err)
			console.log(err);
		if(response.statusCode==200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}


	})


})

app.post('/assessments',function(req,res){
	var limit = req.body.limit||10;
	var offset= req.body.offset||0;
	var status= req.body.status||"NEW";
	var fromDate= req.body.fromDate; /// 
	var toDate= req.body.toDate||Date.now();
	var url= baseURL+"/assessments?limit="+ limit+ "&offset="+ offset+"&status="+ status +"&fromDate="+fromDate+ "&toDate="+toDate ;
	var headers={
		"X-SmartToken":token
	}
	request({headers:headers, uri:url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err);
		if(response.statusCode==200)
			res.json({"response":response}); //response.content = array of assessment orders
		else
			res.json({"error":response});
	})

})

app.post('/acceptAssessmentOrder',function(req,res){
	var assessmentOrderId= req.body.assessmentOrderId;
	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/accept";
	var body={
		"message":req.body.message,
		"assessmentURL":req.body.assessmentURL,
		"author":{
			"firstName":req.body.firstName,
			"lastName":req.body.lastName,
			"email":req.body.email,
			"phone":req.body.phone
		}
	}

	request({headers:headers, uri:url, method:"POST", body:body},function(err,response,body){
		if(err)
			console.log(err);
		if(response.statusCode==200){
			res.json({"response":response});
		}
		else{
			res.json({"error":response});
		}
	})

})

app.post('/rejectAssessmentOrder',function(req,res){
	var assessmentOrderId= req.body.assessmentOrderId;
	var headers={
		"X-SmartToken":token
	}
	var body={
		"message":req.body.message,
		"author":{
			"firstName":req.body.firstName,
			"lastName":req.body.lastName,
			"email":req.body.email,
			"phone":req.body.phone
		}
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/reject";

	request({headers:headers, uri:url, method:"POST", body:body},function(err,response,body){
		if(err)
			console.log(err)
		if(req.body.statusCode==200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})

app.post('/addCommentToAssessmentOrder',function(req,res){
	var assessmentOrderId= req.body.assessmentOrderId;
	var body={
		"message":req.body.message,
		"author":{
			"firstName":req.body.firstName,
			"lastName":req.body.lastName,
			"email":req.body.email,
			"phone":req.body.phone
		}
	}
	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments/"+ assessmentOrderId+ "/comments"
	request({headers:headers, uri:url, method:"POST", body:body},function(err,response,body){
		if(err)
			console.log(err)
		if(response.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})

app.post('/checkCommentOnAssessmentOrder',function(req,res){
	var assessmentOrderId= req.body.assessmentOrderId;
	var headers= {
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/comments";
	request({headers:headers, uri:url, method:"GET" },function(err,response,body){
		if(err)
			console.log(err)
		if(response.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})
// register a notification url - left

// add body to request 
app.post('/submitAssessmentResult',function(req,res){
	
	

	var body={
	 assessmentOrderId: req.body.assessmentOrderId,
	 createDate: req.body.createDate,
	 title: req.body.title,
	 description :req.body.description,
	 passed:req.body.passed,
	 score:req.body.score,
	 resultType:req.body.resultType,// video_url, document , video_stream, generated_url
	 result: req.body.result,
	 author:{
		"firstName": req.body.firstName,
		"lastName":req.body.lastName,
		"email":req.body.email,
		"phone":req.body.phone
	}
	}

	var headers= {
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/results";
	request({headers:headers,uri:url,method:"POST",body:body},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})


})

app.post('/checkResultOnAssessmentOrder',function(req,res){
	var assessmentOrderId= req.body.assessmentOrderId;
	var headers= {
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/results"
	request({headers:headers, uri:url, method:"GET"},function(err,response,body){
		if(err)
			console.log(err)
		if(response.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})

//

app.post('/attachFileToAssessmentResult',function(req,res){
	
	var assessmentOrderId= req.body.assessmentOrderId;
	var resultId= req.body.resultId;
	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/results/"+resultId+"/attachments"

	// attachmentFile is the name of the file field in HTML
	formData={
		"attachment":fs.createReadStream(attachmentFile.path) 
	}
	request({headers:headers, uri:url, method:"POST",formData:formData},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode==200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})
})

app.post("/checkAttachedFileToAssessmentResult",function(req,res){
	var headers={
		"X-SmartToken":token
	}
	var assessmentOrderId= req.body.assessmentOrderId;
	var resultId= req.body.resultId;
	var url= baseURL+"/assessments/"+assessmentOrderId+"/results/"+resultId+"/attachments"
	request({headers:headers, uri:url, method:"GET"},function(err, response, body){
		if(err)
			console.log(err)
		if(res.statusCode==200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})

app.post("/completeAssessmentOrder",function(req,res){
	var assessmentOrderId= req.body.assessmentOrderId;
	var headers={
		"X-SmartToken":token
	}
	var body= {
		"message":req.body.message,
		"author":{
			"firstName":req.body.firstName,
			"lastName":req.body.lastName,
			"email":req.body.email,
			"phone":req.body.phone
		}
	}
	var url= baseURL+"/assessments/"+assessmentOrderId+"/complete";
	request({headers:headers, uri: url,method:"POST", body:body},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":response})
		}
	})
})

app.post("createTestAssessmentOrder",function(req,res){

	var body={
		"status":req.body.status,
		"requestor":{
			"firstName":req.body.requestorFirstName,
			"lastName":req.body.requestorLastName,
			"email":req.body.requestorEmail,
			"phone":req.body.requestorPhone
		},
		"candidate":{
			"id":req.body.candidateId,
			"firstName":req.body.candidateFirstName,
			"lastName":req.body.candidateLastName,
			"email":req.body.candidateEmail,
			"phone":req.body.candidatePhone,
			"addressLine":req.body.addressLine
		},
		"job":{
			"id":req.body.jobId,
			"name":req.body.jobName,
			 "industry": {
             	"id": req.body.industryId,
             	"label": req.body.industryLabel
       		 	},
        	"function": {
            	"id": req.body.functionId,
            	"label": req.body.functionLabel
        	},
        	"experienceLevel": {
            	"id": req.body.experienceLevelId,
            	"label": req.body.experienceLevelLabel
        	},
        	"location": {
            	"country": req.body.jobCountry,
            	"region": req.body.jonRegion,
            	"city": req.body.jobCity
        	}
		},
		"company":{
			"id":req.body.companyId,
			"name":req.body.companyName
		},
		"offer":{
			"catalogId":req.body.catalogId,
			"name":req.body.offerName
		}
	}
	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/assessments";
	request({headers:headers, uri:url, method:"POST", body:body},function(err, response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})

})

//job board api 

app.post("/jobBoard",function(req,res){

	var updatedAfter= req.body.updatedAfter // date object
	var status= req.body.status;
	var offset= req.body.offset;
	var limit= req.body.limit;

	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/publications?updatedAfter="+updatedAfter+"&status="+status+"&offset="+offset+"&limit="+limit;

	request({headers:headers, uri:url, method:'GET'},function(err, response, body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})

});

app.post('/jobPostingById',function(req,res){
	var postingId= req.body.postingId;
	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/publications/"+postingId;

	request({headers:headers, uri: url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})
})

app.post("updateJobPosting",function(req,res){
	var postingId= req.body.postingId;
	var status= req.body.status;
	var comment= req.body.comment;
	var liveURL= req.body.liveURL;
	//LiveUrl - it's a direct URL to the job you have published in your job board; will be surfaced to SmartRecruiters users 
	//  liveURL= '/jobPostingById'
	var url= baseURL+ "/publications/"+postingId;
	var headers={
		"X-SmartToken":token
	}
	request({headers:headers, uri: url, method:'PUT'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})

})

//offers for an existing job posting 
app.post('getExistingContract',function(){
	var postingId= req.body.postingId;
	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/offers?postingId="+postingId;
	request({headers:headers, uri: url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})
})


// offer API

app.post('/createOffer',function(req,res){
	
	var locations=[]; 
	var industries= [];
	var experienceLevels=[];
	var functions=[];
	req.body.locations.forEach(function(item){
		locations.push({
			"country":item.country,
			"region":item.region,
			"city":item.city
		})
		
	});
	req.body.industries.forEach(function(item){
		industries.push({
			"id":item.id
		})
	})
	req.body.locations.forEach(function(item){
		locations.push({
			"id":item.id
		})
	})
	req.body.experienceLevels.forEach(function(item){
		experienceLevels.push({
			"id":item.id
		})
	})

	if((req.body.experienceLevels.length==experienceLevels.length)&&(req.body.locations.length==locations.length)&& (req.body.industries.length==industries.length)&&(req.body.functions.length==functions.length) ){

		var body= {
    	"catalogId": req.body.catalogId,
    	"name": req.body.name,
    	"description": req.body.description,
    	"category":req.body.category,
    	"terms": {
        	"type": req.body.type,
        	"price": {
            	"amount": req.body.amount,
           	    "currencyCode": req.body.currencyCode
       			 }
    		},
    	"availability":{
    		"expirationDate":req.body.expirationDate,
    		"specialOffer":req.body.specialOffer
    	},
    	"targetMarket":{
    		"industries":industries,
    		"functions":functions,
    		"experienceLevels":experienceLevels,
    		"locations":locations
    	}

	}


	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/offers";
	
		request({headers:headers, uri: url, method:'POST', body:body},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	
	})	
	

	}

})

app.post('/getOfferById',function(req,res){
	var offerId= req.body.offerId;
	var url= baseURL+"/offers/"+offerId;
	var headers={
		"X-SmartToken":token
	}
	request({headers:headers, uri: url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})
})

app.post('submitOffer',function(req,res){
	var offerId= req.body.offerId;
	var url= baseURL+"/offers/"+offerId+"/submit";
	var headers={
		"X-SmartToken":token
	}
	request({headers:headers, uri: url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})
})

app.post('/withdrawOffer',function(req,res){
	var offerId= req.body.offerId;
	var headers= {
		"X-SmartToken":token
	}
	var url= baseURL+"/offers/"+offerId+"/withdraw";
	request({headers:headers, uri: url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
	})
})


app.post('/listOffers',function(req,res){
	var offset= req.body.offers;
	var limit= req.body.limit;

	var headers={
		"X-SmartToken":token
	}
	var url= baseURL+"/offers?limit="+limit+"&offset="+offset;
	request({headers:headers, uri: url, method:'GET'},function(err,response,body){
		if(err)
			console.log(err)
		if(res.statusCode=200){
			res.json({"response":response})
		}
		else{
			res.json({"error":err})
		}
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