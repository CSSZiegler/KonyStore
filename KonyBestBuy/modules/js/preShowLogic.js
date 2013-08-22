/**
****************************************************************
*	Name    : preShowHome
*	Author  : Kony Solutions
*	Purpose : This function is preshow for Home to handle the form pre show logic.
****************************************************************
*/
function preShowHome(){
	
	//#ifdef iphone
		hbxHeaderBack.setVisibility(false);
		hbxImg.setVisibility(true);
	//#endif
	hbxSearch.setVisibility(true);
	hbxSearch.txtbxSrch.text="";
}

/**
****************************************************************
*	Name    : preShowProduct
*	Author  : Kony Solutions
*	Purpose : This function is Product preshow to handle the form pre show logic.
****************************************************************
*/
function preShowProduct(){
	
	//#ifdef iphone
		hbxHeaderBack.setVisibility(true);
		hbxImg.setVisibility(false);
	//#endif
	hbxSearch.setVisibility(false);
}

/**
****************************************************************
*	Name    : preShowSubcat
*	Author  : Kony Solutions
*	Purpose : This function is subcategory preshow to handle the form pre show logic.
****************************************************************
*/
function preShowSubCat(){
	
	//#ifdef iphone
		hbxHeaderBack.setVisibility(true);
		hbxImg.setVisibility(false);
	//#endif
	hbxSearch.setVisibility(true);
	hbxSearch.txtbxSrch.text="";
}

/**
****************************************************************
*	Name    : preShowProdDetails
*	Author  : Kony Solutions
*	Purpose : This function is preshow for product details to handle the form pre show logic.
****************************************************************
*/
function preShowProdDetails(){
	
	//#ifdef iphone
		hbxHeaderBack.setVisibility(true);
		hbxSearch.setVisibility(false); //setting the search hbox in the form header to false
	//#endif
	if(frmProdDetails.lblReview.text=="")
	{
		frmProdDetails.lblReview.text="No Reviews";	
		frmProdDetails.imgReview.setVisibility(false);
	}	
	if( frmProdDetails.lblDesc.text == undefined)
	frmProdDetails.lblDesc.text = "";
}

/**
****************************************************************
*	Name    : preShowProdDetailsIpad
*	Author  : Kony Solutions
*	Purpose : This function is preshow for product details to handle the form pre show logic for Ipad.
****************************************************************
*/
function preShowProdDetailsIpad(){
	//#ifdef windows8
	frmProdDetails.title="Kony BestBuy";
	//#else
		hbxSearch.setVisibility(false);
	//#endif
	
	if(frmProdDetails.lblReview.text=="")
	{
		frmProdDetails.lblReview.text="No Reviews";	
		frmProdDetails.imgReview.setVisibility(false);
	}
	if( frmProdDetails.lblDesc.text == undefined)
	frmProdDetails.lblDesc.text = "";	
}


