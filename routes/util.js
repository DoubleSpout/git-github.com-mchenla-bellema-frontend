exports.getPageObj = function(curPage, perPage, totalCount,link){
	var maxPage = Math.ceil(totalCount/perPage);
	var dots = false;

	if(maxPage<=1){

		return {
			Prev:false,
			Next:false,
			PageList:[],
			LastPage:false,
			curPage:1,
			link:link,
			dots:false,
		}

	}


	if(maxPage<=5){


		var list = [];
		for(var i=1;i<=maxPage;i++){
			list.push(i);
		}

		return {
			Prev:false,
			Next:false,
			PageList:list,
			LastPage:false,
			curPage:curPage,
			link:link,
			dots:false,
		}
	}

	if(curPage<=3){
		return {
			Prev:false,
			Next:true,
			PageList:[1,2,3,4,5],
			LastPage:maxPage,
			curPage:curPage,
			link:link,
			dots:true,
		}
	}


	if(maxPage-curPage<=2){
		return {
			Prev:true,
			Next:false,
			PageList:[maxPage-4,maxPage-3,maxPage-2,maxPage-1,maxPage],
			LastPage:false,
			curPage:curPage,
			link:link,
			dots:false,
		}
	}


	return {
			Prev:true,
			Next:true,
			PageList:[curPage-2,curPage-1,curPage,curPage+1,curPage+2],
			LastPage:maxPage,
			curPage:curPage,
			link:link,
			dots:true,
		}

}