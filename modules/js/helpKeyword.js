/*
****************************************************************
*	Name    : searchByHelpKeyword
*	Author  : Kony Solutions
*	Purpose : This function is used to invoke the helpkeyword_mysql javaservice using appmiddlewareinvokerasync method  .
****************************************************************
*/

		function searchByHelpKeyword() {
			gNoOfRows = 0;
			gPageno = 0;
			gFromRow = 0;
			gVisit = 0;
		    var mysqlhelpkeyword_inputparam = {};
		    mysqlhelpkeyword_inputparam["serviceID"] = "helpkeyword_mysql";
		    mysqlhelpkeyword_inputparam["httpheaders"] = {};
		    mysqlhelpkeyword_inputparam["httpconfigs"] = {};		    
		    var mysqlhelpkeyword = appmiddlewareinvokerasync(mysqlhelpkeyword_inputparam, helpKeywordCallback);
		    kony.application.showLoadingScreen("loadskin","Loading...",constants.LOADING_SCREEN_POSITION_FULL_SCREEN, true,true,null);        
		};

/*
****************************************************************
*	Name    : helpKeywordCallback
*	Author  : Kony Solutions
*	Purpose : This function is used to get parameters status & resultTable i.e. called when appmiddlewareinvokerasync method executes.
****************************************************************
*/
		
		function helpKeywordCallback(status, mysqlHelpKeywordData){
		   if (status == 400) {
		        if (mysqlHelpKeywordData["opstatus"] == 0) {
		            if (mysqlHelpKeywordData != null && mysqlHelpKeywordData != undefined && mysqlHelpKeywordData["helpKeyword"] != null && mysqlHelpKeywordData["helpKeyword"] != undefined) {
		                ghkData = [];
		                for (var i = 0; i < mysqlHelpKeywordData["helpKeyword"].length; i++) {
		                    ghkData.push({
		                        "hk_id": mysqlHelpKeywordData["helpKeyword"][i]["hkid"],
		                        "lblHelpKeyword": mysqlHelpKeywordData["helpKeyword"][i]["hkname"]
		                    })
		                }
		                
		                //#ifdef desktopweb
		                	frmSearchOption.segHelpKeyword.setData(ghkData);
		                	kony.application.dismissLoadingScreen();
		                //#else
			                frmKeywords.lblInfo.text = "Select keyword for help topic : ";
			                hbxFooterPage.setVisibility(true);
			                gNoOfPages = Math.ceil((ghkData.length)/40);		                            
			                paginationNext();		                	
		                //#endif
		                

		            }		       
				}
				else{
					alert("Cannot find host on this network connection,Please check network & try again.");
					frmKeywords.lblInfo.text = "Cannot find host on this network connection,Please check network & try again.";
					gVisit = 1;
					hbxFooterPage.setVisibility(false);	
		           	kony.application.dismissLoadingScreen();
		           	return;
				}
			}
		
		}
		

		
	/* 
	Defined onClick of next button for pagination of keywords data object in frmKeyword form.
	*/
	
		function paginationNext(){			
			hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "arwleftd.png";
			hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "arwrightd.png";	
			gPageno = gPageno+1;	
			var absPageno = Math.abs(gPageno);			
			var absNoOfPages = Math.abs(gNoOfPages);
			if(absPageno > absNoOfPages){
				hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "trans1.png";
				gPageno = gPageno-1;
			 	return;
			 }
			gNoOfRows = gNoOfRows+40;
			var absNoofRows = Math.abs(gNoOfRows);
			if(absPageno == absNoOfPages)
				hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "trans1.png";
			if(absPageno == 1)
				hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "trans1.png";
			else
				gFromRow = gFromRow+40;				
			hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblFrom.text = gPageno.toPrecision();
			hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblTo.text = gNoOfPages.toPrecision();
			var nextHelpKeywordData = [];
			for (var i = gFromRow ; i < gNoOfRows; i++ ){
				if(ghkData[i]!= null && ghkData[i]!= undefined)
					nextHelpKeywordData.push(ghkData[i]);
			}
			frmKeywords.segHelpKeyword.setData(nextHelpKeywordData);
			frmKeywords.show();
			kony.application.dismissLoadingScreen();
		}
		
	/* Defined onClick of previous button for pagination of keywords data object in frmKeyword form.*/
		
		function paginationPrevious()
		{
			gPageno = gPageno-1;
			hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "arwleftd.png";
			hbxFooterPage.vbxRightFooter.hbxRightFooter.imgRightfooter.src = "arwrightd.png";	
			var absPageno = Math.abs(gPageno);
			if(absPageno < 1){
				hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "trans1.png";
				gPageno = gPageno+1;
			 	return;
			 }
			if(absPageno == 1)
				hbxFooterPage.vbxLeftFooter.hbxLeftFooter.imgLeftfooter.src = "trans1.png";
			hbxFooterPage.vbxIndexFooter.hbxIndexFooter.lblFrom.text = gPageno.toPrecision();
			gFromRow = gFromRow-40;
			gNoOfRows = gNoOfRows-40;		
			var preHelpKeywordData = [];
			for(var i = gFromRow ; i < gNoOfRows ; i++){
				if(ghkData[i]!= null && ghkData[i]!= undefined)
					preHelpKeywordData.push(ghkData[i]);
			}
			frmKeywords.segHelpKeyword.setData(preHelpKeywordData);
			frmKeywords.show();	
			kony.application.dismissLoadingScreen();
		}
		
	/* To navigate frmKeywords form */
	
		function navToFrmKeyword(){	
			if(gVisit == 1){ /* "Cannot find host on this network connection,Please check network & try again." */ 				
				searchByHelpKeyword()
			}
			else frmKeywords.show();
						
		}
	
