

/* global Data */
 gVisit = 0;
	
	
/*
****************************************************************
*	Name    : searchByHelpCategory
*	Author  : Kony Solutions
*	Purpose : This function is used to invoke the helpcategory_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/
	
	function searchByHelpCategory() {
		gVisit = 0;
	    var mysqlhelpcategory_inputparam = {};
	    mysqlhelpcategory_inputparam["serviceID"] = "helpcategory_mysql";
	    mysqlhelpcategory_inputparam["httpheaders"] = {};
	    mysqlhelpcategory_inputparam["httpconfigs"] = {};	    
	    var mysqlhelpcategory = appmiddlewareinvokerasync(mysqlhelpcategory_inputparam, helpCategoryCallback);
	    kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);
	}

/*
****************************************************************
*	Name    : helpCategoryCallback
*	Author  : Kony Solutions
*	Purpose : This function is used to get parameters status & resultTable i.e. called when appmiddlewareinvokerasync method executes.
****************************************************************
*/
	
	function helpCategoryCallback(status, mysqlHelpCategoryData){
	    if (status == 400) {        
	        if (mysqlHelpCategoryData["opstatus"] == 0) {
	            if (mysqlHelpCategoryData != null && mysqlHelpCategoryData != undefined && mysqlHelpCategoryData["helpCategory"] != null && mysqlHelpCategoryData["helpCategory"] != undefined) {
	                var hcArray = [];
	                for (var i = 0; i < mysqlHelpCategoryData["helpCategory"].length; i++) {
	                    hcArray.push({
	                        "hc_id": mysqlHelpCategoryData["helpCategory"][i]["hcid"],
	                        "lblHelpCategory": mysqlHelpCategoryData["helpCategory"][i]["hcname"]
	                    })
	                }
	                
	                //#ifdef desktopweb
	                	frmSearchOption.segHelpCategory.setData(hcArray);
	                	kony.application.dismissLoadingScreen();
	                	//frmSearchOption.lblInfo.text = "Select a category for respective HelpTopics: ";
	                	frmSearchOption.show();
	                //#else
		                frmCategory.segHelpCategory.setData(hcArray);
		                hbxFooterPage.setVisibility(true);
		                frmCategory.lblInfo.text = "Select a category for respective HelpTopics: ";
		                frmCategory.show();	                	
	                //#endif             

	           		kony.application.dismissLoadingScreen();
	            }
	        }
			else{
					alert("Cannot find host on this network connection,Please check network & try again.");
					frmCategory.lblInfo.text = "Cannot find host on this network connection,Please check network & try again.";
					gVisit = 1;
					hbxFooterPage.setVisibility(false);	
		           	kony.application.dismissLoadingScreen();
		           	return;
				}
	    }
	}
	
	/* To navigate frmCategory form */
	
		function navToFrmCategory(){			
				
			if(gVisit == 1)
			{
				searchByHelpCategory();
			}
			else frmCategory.show();
						
		}

	