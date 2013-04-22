/*
****************************************************************
*	Name    : preShowHome
*	Author  : Kony Solutions
*	Purpose : This function is preshow for Home to handle the form pre show logic.
****************************************************************
*/
function preShowHome(){
	hbxImg.setVisibility(true);
	hbxHeaderBack.setVisibility(false);
	hbxSearch.setVisibility(true);
	hbxSearch.txtbxSrch.text="";
}

/*
****************************************************************
*	Name    : preShowProduct
*	Author  : Kony Solutions
*	Purpose : This function is Product preshow to handle the form pre show logic.
****************************************************************
*/
function preShowProduct(){
	hbxImg.setVisibility(false);
	hbxHeaderBack.setVisibility(true);
	hbxSearch.setVisibility(false);
}

/*
****************************************************************
*	Name    : preShowSubcat
*	Author  : Kony Solutions
*	Purpose : This function is subcategory preshow to handle the form pre show logic.
****************************************************************
*/
function preShowSubCat(){
	hbxImg.setVisibility(false);
	hbxHeaderBack.setVisibility(true);
	hbxSearch.setVisibility(true);
	hbxSearch.txtbxSrch.text="";
}


/*
****************************************************************
*	Name    : preShowProdDetails
*	Author  : Kony Solutions
*	Purpose : This function is preshow for product details to handle the form pre show logic.
****************************************************************
*/

function preShowProdDetails(){
	hbxSearch.setVisibility(false); //setting the search hbox in the form header to false
	hbxHeaderBack.btnHeaderBack.setVisibility(true);
	if(frmProdDetails.lblReview.text=="")
	{
		frmProdDetails.lblReview.text="No Reviews";	
		frmProdDetails.imgReview.setVisibility(false);
	}	
	if( frmProdDetails.lblDesc.text == undefined)
	frmProdDetails.lblDesc.text = "";
}

