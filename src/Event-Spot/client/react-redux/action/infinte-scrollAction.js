

export const startGetNewEvents = async(search,sortBy,order,page,limit) => {
    
    console.log(search,sortBy,order,page,limit)
      try {
        const response = await axios.get(`/api/ssp
                                            ?search=${search}
                                            &sortBy=${sortBy}
                                            &order=${order}
                                            &page=${page}
                                            &limit=${limit}
        `)
        console.log(response.data)
        const { total,page,totalPages,data} = response.data
        dispatch(retrun({
            type:"ADD_NEW_DATA",
            payload:{
                data,
                total,
                page,
                totalPages,
            }
        }))
      } catch (e) {
        console.log(e)
      }
    
  }