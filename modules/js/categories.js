
/*
****************************************************************
*	Name    : getCatList
*	Author  : Kony Solutions
*	Purpose : This function invokes BestBuy service.
****************************************************************
*/

function getCatList()
{
	var catList = { serviceID:"getCategories", apiKey:key };
	var categoryList = appmiddlewareinvokerasync(catList, catListCallback);
}

/*
****************************************************************
*	Name    : catListCallback
*	Author  : Kony Solutions
*	Purpose : This function is service callback function to fetch Categories list.
****************************************************************
*/
function catListCallback(status, gcList)
{	
	if (status == 400){
		kony.print("GClist ..."+gcList);
		if (gcList["opstatus"] == 0) {
			var tmp =[];
			if (gcList["category"] != null || gcList["category"] != undefined ){
				for(var i=0;i<gcList["category"].length;i++){
					tmp.push({
						"categoryName":gcList["category"][i]["name"],
						"categoryID":gcList["category"][i]["id"]
							});
					}	
					frmHome.segcatList.setData(tmp);
					frmHome.show();
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
*	Name    : getSubCatList
*	Author  : Kony Solutions
*	Purpose : This function invokes BestBuy service.
****************************************************************
*/

function getSubCatList()
{
	var subcatList = { serviceID:"getSubCategories", subCat:scatID , apiKey: key };
	var subcategoryList = appmiddlewareinvokerasync(subcatList, subCatListCallback);
	kony.application.showLoadingScreen("loadingSkin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
}

/*
****************************************************************
*	Name    : subCatListCallback
*	Author  : Kony Solutions
*	Purpose : This function is service callback function to fetch SubCategories list.
****************************************************************
*/
function subCatListCallback(status, gcList)
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
					if(frmSubCat.lblSubCat.text == "" || frmSubCat.lblSubCat.text == null || frmSubCat.lblSubCat.text == undefined)
					{
						frmSubCat.lblSubCat.text = scatName;
						frmSubCat.lblSubCat.setVisibility(true);
					}
					else if(frmSubCat.lblSubCat2.text == "" || frmSubCat.lblSubCat2.text == null || frmSubCat.lblSubCat2.text == undefined)
					{
						frmSubCat.lblSubCat2.text = scatName;
						frmSubCat.lblSubCat.skin = "lblFoc";
						frmSubCat.lblSubCat2.skin = "lblBlue";
						frmSubCat.lblSubCat2.setVisibility(true);
					}
					frmSubCat.lblState.setFocus(true);
					frmSubCat.show();  
					kony.application.dismissLoadingScreen();            
	          }
	          else
	          {
	          	var prodList = { serviceID:"getProducts", productID:scatID ,apiKey:key };
	          	frmProduct.hboxCat.setVisibility(true);
	          	hbxSearch.setVisibility(true);
				frmProduct.hbxSrch.setVisibility(false); 
				var ProductList = appmiddlewareinvokerasync(prodList, prodListCallback);
				          	          
	          }
	     }
	     else{
            	alert("Please check network connection and try again.");
            	kony.application.dismissLoadingScreen();      	
   				return;	                 
	     }
	                	
	 }
	 								            					
}	      
                