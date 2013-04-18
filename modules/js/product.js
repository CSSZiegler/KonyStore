/*
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
			var tmp =[],img,price,salePrice,flag;
			if ((gcList["productsCollection"] != null || gcList["productsCollection"] != undefined ) && gcList["productsCollection"].length>0 ){
				for(var i=0;i<gcList["productsCollection"].length;i++ ){
					//#ifdef windows8
						img = gcList["productsCollection"][i]["imgProductImage"];
					//#else
						img = gcList["productsCollection"][i]["imgProductMediumImage"];
					//#endif
					flag=gcList["productsCollection"][i]["lblOnSale"];
					kony.print("!! boolen: "+flag);	
					if(flag=="true")
					{
						price = "";
						salePrice = "Sale Price: $" + gcList["productsCollection"][i]["lblProductSalePrice"]+ "!";
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
	         	frmProduct.prdName.text = scatName;
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

