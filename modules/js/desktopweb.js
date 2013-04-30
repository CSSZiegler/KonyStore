
/*
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

/*
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
 
 /*
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

/*
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
			var tmp =[];
			if ((gcList["productsCollection"] != null || gcList["productsCollection"] != undefined ) && gcList["productsCollection"].length>0 ){
				for(var i=0;i<gcList["productsCollection"].length;i++){
					tmp.push({
						"prodImg":gcList["productsCollection"][i]["imgProductMediumImage"],
						"lblPName":gcList["productsCollection"][i]["lblProductName"],
						"lblPrice":"$"+gcList["productsCollection"][i]["lblProductPrice"],
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
/*
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
/*
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
			var tmp =[];
			if ((gcList["productsCollection"] != null || gcList["productsCollection"] != undefined ) && gcList["productsCollection"].length>0 ){
				for(var i=0;i<gcList["productsCollection"].length;i++){
					tmp.push({
						"prodImg":gcList["productsCollection"][i]["imgProductMediumImage"],
						"lblPName":gcList["productsCollection"][i]["lblProductName"],
						"lblPrice":"$"+gcList["productsCollection"][i]["lblProductPrice"],
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


 