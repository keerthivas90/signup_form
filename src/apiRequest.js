const apiRequest = async (url= '' , optionsObj= null,errMsg=null) =>{
    try{
        const response = await fetch(url, optionsObj)
        
        console.log(response)
    } catch(err) {
            errMsg=err.Message
    }
    finally {
        return errMsg
    }
}

export default apiRequest