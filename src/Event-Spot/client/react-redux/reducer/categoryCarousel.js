const categoryCarouselInitialState = 
    {
        categoryCarousel:[],
        infiniteScroll:{

        }
    }

const categoryCarouselReducer = (state = categoryCarouselInitialState, action) => {
    switch(action.type) {

        case "GET_CATEGORY_CAROUSEL": 
           
            return {...state,categoryCarousel:action.payload}
            
        case "ADD_NEW_DATA" :
            return {...state,infiniteScroll:{...state.infiniteScroll,data:{...state.infiniteScroll.data,...action.payload},total:action.payload.total,page:action.payload.page,totalPages:action.payload.totalPages,}}//check if extra field needed
        default: {
            return {...state}
        }
            
    }

}


export default categoryCarouselReducer