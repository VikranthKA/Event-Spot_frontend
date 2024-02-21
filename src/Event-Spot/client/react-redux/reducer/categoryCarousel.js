const categoryCarouselInitialState = 
    {
        categoryCarousel:[]
    }

const categoryCarouselReducer = (state = categoryCarouselInitialState, action) => {
    switch(action.type) {

        case "GET_CATEGORY_CAROUSEL": 
           
            return {...state,categoryCarousel:action.payload}
        
        default: {
            return {...state}
        }
            
    }

}

export default categoryCarouselReducer