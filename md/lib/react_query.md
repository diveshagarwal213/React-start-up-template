# React Query Notes

## Query options 

+ ### CacheTime
    + value : number = in miliSeconds 
    + default value : 5 min
    + qrStatus: stale
    + description: when fetching second time no loading shown to user (user see the cacheData) and a background fetch will happen and update the data.

+ ### staleTime
    + value : number = in miliSeconds 
    + default value : 0 seonds
    + qrStatus: fresh then stale
    + description : query is set to fresh which mean no extra background fetching until time over.(user see the cacheData)    

+ ### refetchOnMount
    + value : boolean | string (true , false | 'always') 
    + default value : true
    + description : query is set to fresh which mean no extra background fetching until time over.(user see the cacheData)    

+ ### refetchOnWindowFocus
    + value : boolean | string (true , false | 'always')  
    + default value : true
    + description : auto-refetch on window focus 

+ ### enabled
    + value : boolean 
    + default value : true
    + description : if true it will fetch as soon as page loads and if false you need to use __refetch__ function to trigger the fetch.  

+ ### onSuccess (helps to perfome sideEffects)
    + value : callBack function(data)  
    + default value : undefined
    + description : call this method on query success         

+ ### onError (helps to perfome sideEffects)
    + value : callBack function(error)  
    + default value : undefined
    + description : call this method on query error         
