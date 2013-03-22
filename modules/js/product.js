/*
****************************************************************
*	Name    : getSrchProduct
*	Author  : Kony Solutions
*	Purpose : This function invokes BestBuy service to search product.
****************************************************************
*/

function getSrchProduct()
{
	var sPrdList = { serviceID:"productSearch",keyword:srchKey, apiKey:key };
	frmProduct.hboxCat.setVisibility(false);
	frmProduct.hbxSrch.setVisibility(true); 
	frmProduct.lblSrch.text="Results for '"+srchKey+"'";
	kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	var sProductList = appmiddlewareinvokerasync(sPrdList, prodListCallback);
	scatName = srchKey;
	hbxSearch.txtbxSrch.text="";
	
}

/*
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
	         	frmProduct.prdName.text = scatName;
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

