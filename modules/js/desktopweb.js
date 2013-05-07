
/**
****************************************************************
*	Name    : getProductID
*	Author  : Kony Solutions
*	Purpose : This function is get the product ID fro given product .
****************************************************************
*/
function getProductID(key)
{
	if( resulttable != null && resulttable != undefined )
	for (i=0;i<resulttable.length;i++)
	{
		if(resulttable[i]["name"]==key)
			return resulttable[i]["id"];
	}
}

/**
****************************************************************
*	Name    : getSubCatListWeb
*	Author  : Kony Solutions
*	Purpose : This function invokes BestBuy service for Desktop Web.
****************************************************************
*/
function getSubCatListWeb()
{
	var subcatList = { serviceID:"getSubCategories", subCat:scatID , apiKey: key };
	var subcategoryList = appmiddlewareinvokerasync(subcatList, subCatListCallbackWeb);
	kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
}
 
 /**
****************************************************************
*	Name    : subCatListCallbackWeb
*	Author  : Kony Solutions
*	Purpose : This function is service callback function to fetch SubCategories list.
****************************************************************
*/
function subCatListCallbackWeb(status, gcList)
{	
	
	if (status == 400){
		if (gcList["opstatus"] == 0) {
			var tmp =[];
			if ((gcList["category"] != null|| gcList["category"] != undefined ) && gcList["category"].length > 0){
				for(var i=0;i<gcList["category"].length;i++){
					tmp.push({
						"categoryName":gcList["category"][i]["name"],
						"categoryID":gcList["category"][i]["id"]
							});
					}	
					frmSubCat.segcatList.setData(tmp);
					frmSubCat.lblCat.text = scatName ;
					frmSubCat.lblShopCat.text = "Shop "+scatName;
					frmSubCat.lbltag.text = frmSubCat.lbltag.text+" "+scatName+" >";
					frmSubCat.show();  
					kony.application.dismissLoadingScreen();            
	          }
	          else
	          {
	          	var prodList = { serviceID:"getProducts", productID:scatID ,apiKey:key };
	          	var ProductList = appmiddlewareinvokerasync(prodList, prodListCallbackWeb);
	          	kony.application.dismissLoadingScreen(); 
	          				          	          
	          }
	     }
	     else{
            	alert("Please check network connection and try again.");
            	kony.application.dismissLoadingScreen();      	
   				return;	                 
	     }
	                	
	 }
}	 

/**
****************************************************************
*	Name    : prodListCallback
*	Author  : Kony Solutions
*	Purpose : This function is service callback function it returns product list for the search criteria for DesktopWeb.
****************************************************************
*/
function prodListCallbackWeb(status, gcList)
{	
	
	if (status == 400){
			if (gcList["opstatus"] == 0) {
			var tmp =[],flag,price,salePrice;
			if ((gcList["productsCollection"] != null || gcList["productsCollection"] != undefined ) && gcList["productsCollection"].length>0 ){
				for(var i=0;i<gcList["productsCollection"].length;i++){
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
						"prodImg":gcList["productsCollection"][i]["imgProductMediumImage"],
						"lblPName":gcList["productsCollection"][i]["lblProductName"],
						"lblPrice":price,
						"lblSalesPrice":salePrice,
						"lblDesc":gcList["productsCollection"][i]["lblProductDescription"],
						"lblSku":gcList["productsCollection"][i]["sku"],
						"lblReview":gcList["productsCollection"][i]["lblProductReview"]
							});
					}	
					frmProduct.segProdList.setData(tmp);
					frmProduct.lblInfo.setVisibility(false);             
	          }
	         else
	         {
	         frmProduct.lblInfo.text = "No details found for product '"+scatName+"'";
	         frmProduct.lblInfo.setVisibility(true);
	         frmProduct.segProdList.setData([]); 
	         }
	         	
	         	frmProduct.segcatList.data = frmSubCat.segcatList.data;
	         	frmProduct.lbltag.text = frmSubCat.lbltag.text+scatName;
	         	frmProduct.lblCat.text = scatName;
	         	frmProduct.lblShopCat.text= "Shop "+scatName;
	         	frmProduct.segcatList.data=frmProduct.segcatList.data;
	         	frmProduct.show(); 
	         	kony.application.dismissLoadingScreen(); 
	     }
	     else{
            	alert("Please check network connection and try again.");
            	kony.application.dismissLoadingScreen();    	
   				return;	                 
	     }
	                	
	 }
	 								            					
}	 								            					

/**
****************************************************************
*	Name    : getSrchProductweb
*	Author  : Kony Solutions
*	Purpose : This function invokes BestBuy service.
****************************************************************
*/
function getSrchProductweb()
{
	var tmpkey = kony.string.replace(kony.string.trim(srchKey)," ","%20");
	var sPrdList = { serviceID:"productSearch",keyword:tmpkey, apiKey:key };
	frmProductSrch.lblSrch.text="Results for '"+srchKey+"'";
	kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	var sProductList = appmiddlewareinvokerasync(sPrdList, srchProdListCallback);
	scatName = srchKey;
	
}	
      
/**
****************************************************************
*	Name    : srchProdListCallback
*	Author  : Kony Solutions
*	Purpose : This function is service callback function it returns product list for the search criteria.
****************************************************************
*/
function srchProdListCallback(status, gcList)
{	
	
	if (status == 400){
			if (gcList["opstatus"] == 0) {
			var tmp =[],flag,price,salePrice;
			if ((gcList["productsCollection"] != null || gcList["productsCollection"] != undefined ) && gcList["productsCollection"].length>0 ){
				for(var i=0;i<gcList["productsCollection"].length;i++){
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
						"prodImg":gcList["productsCollection"][i]["imgProductMediumImage"],
						"lblPName":gcList["productsCollection"][i]["lblProductName"],
						"lblPrice":price,
						"lblSalesPrice":salePrice,
						"lblDesc":gcList["productsCollection"][i]["lblProductDescription"],
						"lblSku":gcList["productsCollection"][i]["sku"],
						"lblReview":gcList["productsCollection"][i]["lblProductReview"]
							});
					}	
					frmProductSrch.segProdList.setData(tmp);
					frmProductSrch.lblInfo.setVisibility(false);             
	          }
	         else
	         {
	         frmProductSrch.lblInfo.text = "No details found for product '"+scatName+"'";
	         frmProductSrch.lblInfo.setVisibility(true);
	         frmProductSrch.segProdList.setData([]); 
	         }
	         	
	         	frmProductSrch.show(); 
	         	kony.application.dismissLoadingScreen(); 
	     }
	     else{
            	alert("Please check network connection and try again.");
            	kony.application.dismissLoadingScreen();    	
   				return;	                 
	     }       	
	 } 								            					
} 

/**
****************************************************************
*	Name    : showProductDetailsWeb
*	Author  : Kony Solutions
*	Purpose : This function is to show product details of the selected product.
****************************************************************
*/
function showProductDetailsWeb(){			
	frmProdDetails.lblPrice.text = frmProductSrch.segProdList.selectedItems[0].lblPrice;
	frmProdDetails.lblSalesPrice.text = frmProductSrch.segProdList.selectedItems[0].lblSalesPrice;
	frmProdDetails.lblDesc.text = frmProductSrch.segProdList.selectedItems[0].lblDesc;
	frmProdDetails.prdName.text = frmProductSrch.segProdList.selectedItems[0].lblPName;
	frmProdDetails.prdImg.src = frmProductSrch.segProdList.selectedItems[0].prodImg;
	
	var flag = frmProductSrch.segProdList.selectedItems[0].lblReview;
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
	frmProdDetails.menucontainer.data = frmProductSrch.menucontainer.data 
	frmProdDetails.show();
	showReviewsWeb();
}
/**
****************************************************************
*	Name    : showReviewsWeb
*	Author  : Kony Solutions
*	Purpose : This function is to invoke getProductReviews service.
****************************************************************
*/
function showReviewsWeb() {
	
	var focusedItem1 = frmProductSrch.segProdList.selectedItems;
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
*	Name    : getProductSrch
*	Author  : Kony Solutions
*	Purpose : This function is to show product list for the given product keyword.
****************************************************************
*/
function getProductSrch()
{
	var curForm = kony.application.getCurrentForm();
	srchKey = curForm.txtbxSrch1.text;
	curForm.txtbxSrch1.text="";
	if(srchKey==""||srchKey==null||srchKey==undefined)
		alert("Enter product name to search !!")
	else
		getSrchProductweb()
	
}