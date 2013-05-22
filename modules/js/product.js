/**
****************************************************************
*	Name    : getSrchProduct
*	Author  : Kony Solutions
*	Purpose : This function invokes BestBuy service to search product.
****************************************************************
*/
function getSrchProduct()
{
	
	var tmpkey = kony.string.replace(kony.string.trim(srchKey)," ","%20");
	var sPrdList = { serviceID:"productSearch",keyword:tmpkey, apiKey:key };
	frmProduct.hboxCat.setVisibility(false);
	frmProduct.hbxSrch.setVisibility(true); 
	frmProduct.lblSrch.text="Results for '"+srchKey+"'";
	kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	var sProductList = appmiddlewareinvokerasync(sPrdList, prodListCallback);
	scatName = srchKey;
		
}

/**
****************************************************************
*	Name    : prodListCallback
*	Author  : Kony Solutions
*	Purpose : This function is service callback function it returns product list for the search criteria.
****************************************************************
*/
function prodListCallback(status, gcList)
{	
	
	if (status == 400){
			if (gcList["opstatus"] == 0) {
			var tmp =[],img,price,salePrice,flag;
			if ((gcList["productsCollection"] != null || gcList["productsCollection"] != undefined ) && gcList["productsCollection"].length>0 ){
				for(var i=0;i<gcList["productsCollection"].length;i++ ){
					//#ifdef windows8
						img = gcList["productsCollection"][i]["imgProductImage"];
					//#else
						img = gcList["productsCollection"][i]["imgProductMediumImage"];
					//#endif
					flag=gcList["productsCollection"][i]["lblOnSale"];
					if(flag=="true")
					{
						price = "";
						salePrice = "On Sale: $" + gcList["productsCollection"][i]["lblProductSalePrice"]+ "!";
					 } 
					 else {
						price = "$" + gcList["productsCollection"][i]["lblProductPrice"];
						salePrice = "";
					}
					tmp.push({
						"prodImg":img,
						"lblPName":gcList["productsCollection"][i]["lblProductName"],
						"lblPrice":price,
						"lblSalesPrice":salePrice,
						"lblDesc":gcList["productsCollection"][i]["lblProductDescription"],
						"lblSku":gcList["productsCollection"][i]["sku"],
						"lblReview":gcList["productsCollection"][i]["lblProductReview"]
							});
					}	
					frmProduct.segProdList.setData(tmp);
					frmProduct.segProdList.setVisibility(true);
					frmProduct.lblInfo.setVisibility(false);             
	          }
	         else
	         {
		         frmProduct.lblInfo.text = "No details found for product '"+scatName+"'";
		         frmProduct.lblInfo.setVisibility(true);
		         frmProduct.segProdList.setData([]); 
		         frmProduct.segProdList.setVisibility(false);
	         }
	         	frmProduct.lblcate.text = "Category: "+scatName
	         	frmProduct.show(); 
	         	kony.application.dismissLoadingScreen(); 
	     }
	     else{
            	alert("Please check network connection and try again.");
            	frmProduct.segProdList.setVisibility(false);
            	kony.application.dismissLoadingScreen();    	
   				return;	                 
	     }           	
	 }								            					
}

/**
****************************************************************
*	Name    : showProductDetails
*	Author  : Kony Solutions
*	Purpose : This function is to show product details of the selected product.
****************************************************************
*/
function showProductDetails(){			
	frmProdDetails.lblPrice.text = frmProduct.segProdList.selectedItems[0].lblPrice;
	frmProdDetails.lblSalesPrice.text = frmProduct.segProdList.selectedItems[0].lblSalesPrice;
	frmProdDetails.lblDesc.text = frmProduct.segProdList.selectedItems[0].lblDesc;
	frmProdDetails.prdName.text = frmProduct.segProdList.selectedItems[0].lblPName;
	frmProdDetails.prdImg.src = frmProduct.segProdList.selectedItems[0].prodImg;
	
	var flag = frmProduct.segProdList.selectedItems[0].lblReview;
	frmProdDetails.lblReview.text =flag;
	if(flag!=null ||flag!="")
	 flag1 = kony.math.toInteger(kony.os.toNumber(flag));
	 frmProdDetails.imgReview.setVisibility(true);
	switch(flag1)
	{
		case 1:frmProdDetails.imgReview.src="stars1.png";
				break;
		case 2:frmProdDetails.imgReview.src="stars2.png";
				break;
		case 3:frmProdDetails.imgReview.src="stars3.png";
				break;
		case 4:frmProdDetails.imgReview.src="stars4.png";
				break;	
		case 5:frmProdDetails.imgReview.src="stars5.png";
				break;						
	}
	//kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	
	frmProdDetails.totalReviews.text = "Loading...";
	frmProdDetails.segReviews.removeAll();
	frmProdDetails.show();
	//frmProdDetails.menucontainer.data = frmProduct.menucontainer.data ;	
	showReviews();
}

/**
****************************************************************
*	Name    : showReviews
*	Author  : Kony Solutions
*	Purpose : This function is to invoke getProductReviews service.
****************************************************************
*/
function showReviews() {
	
	var focusedItem1 = frmProduct.segProdList.selectedItems;
	var sku = focusedItem1[0].lblSku;
	
	//var criteria = "(sku=" + sku + ")"; 
	
	//kony.print ("Value of currentCategoryId: " + criteria);
	try
	{
		var serviceInputParameters = { serviceID:"getProductReviews", sku:sku, apiKey:key };
		appmiddlewareinvokerasync(serviceInputParameters, processResponseFromGetBestBuyReviews);
	}
	catch (err)
	{
		alert("Error"+err);
	}
	
}

/**
****************************************************************
*	Name    : processResponseFromGetBestBuyReviews
*	Author  : Kony Solutions
*	Purpose : This function is to  populate reviews in the product details page.
****************************************************************
*/
function processResponseFromGetBestBuyReviews(status, responseFromGetBestBuyReviews)
{
	kony.print ("status: " + status);
	if(null != status && status == 400)
 	{
		kony.print ("$$$$$$$$$$$$$$$$$$$$$$$$$responseFromGetBestBuyReviews: " + responseFromGetBestBuyReviews.toString());
		if(null != responseFromGetBestBuyReviews && null != responseFromGetBestBuyReviews["opstatus"] && 0 == responseFromGetBestBuyReviews["opstatus"])
	  	{
			kony.print ("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$responseFromGetBestBuyReviews[opstatus]: " + responseFromGetBestBuyReviews["opstatus"]);
			var reviews = responseFromGetBestBuyReviews.reviews;
			kony.print ("$$$$$$$$$$$$$$$$$$$$$$$$$$$products: " + reviews);
			if (null != reviews && reviews.length > 0) 
			{
				kony.print ("reviews.length: " + reviews.length);
				var reviewsList = [];
				frmProdDetails.totalReviews.text = "Number of Reviews: " + reviews.length;
				for(var i =0;i<reviews.length;i++){
	 				if (reviews[i]["title"] != "" && reviews[i]["title"] != null){
	 					var image;
		 				var rating = reviews[i]["rating"];
		 				if (kony.os.toNumber(rating) < 2.0) {
							image = "stars1.png";
						} else if (kony.os.toNumber(rating) < 3.0) {
							image = "stars2.png";
						} else if (kony.os.toNumber(rating) < 4.0) {
							image = "stars3.png";
						} else if (kony.os.toNumber(rating) < 5.0) {
							image = "stars4.png";
						} else {
							image = "stars5.png";
						}
		 				
		 				var reviewer = "Submmitted by: " + reviews[i]["submittedBy"];
						var catData = {title:reviews[i]["title"], comment:reviews[i]["comment"],
							rating:image, reviewer:reviewer}
						reviewsList.push(catData);
	 				}
				}
				kony.print ("reviewsList: " + reviewsList);
				frmProdDetails.segReviews.setData(reviewsList);
			}
			else
			{
				frmProdDetails.totalReviews.text = "This product have no reviews.";
				return;

			}
	  	}
		else
		{
			var basicConf = {message:"Error occured during the service call", alertType:constants.ALERT_TYPE_INFO, alertTitle:"", yesLabel:"OK", noLabel:"", alertHandler:null};
			var pspConf = {};
			var infoAlert = kony.ui.Alert(basicConf,pspConf);
			frmProdDetails.totalReviews.text = "";
			return;
		}
  	}
}

