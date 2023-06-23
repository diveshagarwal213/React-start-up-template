# React Query Notes

+ Query Status (Badges)
    + fresh => data is new no need to fetch again 
    + fetching => when fetching the data
    + stale
    + inactive

## Query options 

+ ### CacheTime
    + value : number = in mileSeconds 
    + default value : 5 min
    + qrStatus: stale
    + description: when fetching second time no loading shown to user (user see the cacheData) and a background fetch will happen and update the data.

+ ### staleTime
    + value : number = in mileSeconds 
    + default value : 0 seconds
    + qrStatus: fresh until staleTime over then stale
    + description : query is set to fresh which mean no extra background fetching until stale-time over.(user see the cacheData)    

+ ### refetchOnMount
    + value : boolean | string (true , false | 'always') 
    + default value : true
    + description : 
        + False & query status is stale: then no extra background fetching on component mount.    

+ ### refetchOnWindowFocus
    + value : boolean | string (true , false | 'always')  
    + default value : true
    + description : auto-refetch on window focus 

+ ### refetchInterval (polling)
    + value : boolean | number (in mileSeconds)  
    + default value : false
    + description : 
        + refetch data in time intervals
        + use case: 
            + Make this value as state.
            + Manipulate state value using __onSuccess__, __onError__

+ ### refetchIntervalInBackground  
    + value : boolean   
    + default value : false
    + description : when false refetchInterval stops when window loses focus  
+ ### enabled
    + value : boolean 
    + default value : true
    + description : if true it will fetch as soon as page loads and if false you need to use __refetch__ function to trigger the fetch.  
    + use case: 
        + Dependent query:
            + fetch the data from the first query ex id
            + the set this id in second query options  {enabled:!!id} 


+ ### onSuccess(data) 
    + value : callBack function(data)  
    + default value : undefined
    + description : call this method on query success         

+ ### onError(err)
    + value : callBack function(error)  
    + default value : undefined
    + description : 
        + call this method on query error
        + by default rq try 3 times before calling this.     

+ ### select(data)
    + value : callBack function(data)  
    + default value : undefined
    + description : 
        + call this method to transform query result data

+ ### initialData()
    + set queryInitial data

# useQuery() Hook

```tsx
const result = useQuery("uniqueKey",fn)
// fn => return Promise(get) // axios.get("url");
```

+    ### Result
        ```tsx
            const result = useQuery("uniqueKey",fn)
            const {isLoading, data, isError, error, isFetching, refetch} = result; 
        ```
+    ### Options
        ```tsx
            const result = useQuery("uniqueKey",fn, {
                cacheTime 
                staleTime
            })
             
        ```

### Custom useQuery Hook (reusing queryHooks)
```ts
const fn = () => {}; //get promise
export const useCustomQueryHook = (options) => {
    return  useQuery("uniqueKey",fn, {
        // ... here default customization
        ...options // onError onSuccess ...etc
    })
}
```
###  Query Hook (dynamic params => /:id)
Basic
```ts
const fn = (id) => {}; //get promise
export const useCustomQueryHook = (id,options) => {
    return  useQuery(["uniqueKey", id],() => fn(id), {
        ...options 
    })
}
```
auto passing query
```ts
const fn = ({queryKey}) => {
    const id = queryKey[1]
}; //get promise
export const useCustomQueryHook = (id,options) => {
    return  useQuery(["uniqueKey", id],fn,{
        ...options 
    })
}
``` 

# useQueries Hook (parallel query & Dynamic )
    + helps to fetch parallel query
    + easy to implement, but I don't want to complex this docs
    + watch video - 15,16 [codeEvolution](https://youtu.be/yOjHT-oTFww)

# useQueryClient()
## Initial detail page data. 
It means on a product detail page make use of product list page data that already has some details of that product. 

```tsx

const fn = ({queryKey}) => {
    const id = queryKey[1]
}; //get promise
export const useCustomQueryHook = (id,options) => {
    const queryClient = useQueryClient()
    return  useQuery(["uniqueKey", id],fn,{
        ...options 
        initialData: () => {
            const dataList = queryClient.getQueryData("unique-api-key")
            const singleData = dataList?.data.find(v => v.id === id) 
            if(!singleData) return undefined;
            return {
                data: singleData
            }
        }
    })
}
```

## Pagination   
Basic
```ts
const [page, setPage] = useState(1);
const fn = (id) => {}; //get promise
export const useCustomQueryHook = (id,options) => {
    return  useQuery(["uniqueKey", id],() => fn(id), {
        ...options 
        keepPreviousData:true // keeps the previous data while fetching
    })
}
```
# useInfiniteQuery()

infinite Queries video 20

# useMutation () Hook

custom useMutation hooks

```tsx

const fn = () => {} // axios.post
export const useCustomMutationHook = () => {
    return useMutation(fn);
}

const {mutate} = useCustomMutationHook()
```

### Invalidate query

```tsx
const fn = () => {} // axios.post
export const useCustomMutationHook = () => {
    const queryClient = useQueryClient()

    return useMutation(fn, {
        onSuccess: () => {
            queryClient.invalidateQueries('query-key');
        }
    });
}
const {mutate} = useCustomMutationHook()
```
### update get query

```tsx
const fn = () => {} // axios.post
export const useCustomMutationHook = () => {
    const queryClient = useQueryClient()

    return useMutation(fn, {
        onSuccess: (data) => {
            queryClient.setQueryData('query-key',(oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, data]
                }
            });
        }
    });
}
const {mutate} = useCustomMutationHook()
```

### optimistic Updates
update data before success and change if something went wrong.

```tsx

const fn = () => {} // axios.post
export const useCustomMutationHook = () => {
    const queryClient = useQueryClient()

    return useMutation(fn, {
        onMutate: async () => {
            //Cancel queries
            await queryClient.cancelQueries('unique-api-key');
            //holding old data in case of rollback
            const temp_data = queryClient.getQueryData("unique-api-key")

            //updating data
            // add random || (length + 1) id field for the data
             queryClient.setQueryData('query-key',(oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: [...oldQueryData.data, { id: "random_id",...data}]
                }
            });

            return{
                temp_data
            }
        },
        onError:(_error, _payload, context) => {
            //rolling back
            queryClient.setQueryData('query-key',(oldQueryData) => {
                return {
                    ...oldQueryData,
                    data: context.temp_data
                }
            });
        },
        onSettled:() => {
            //sync data in background
            queryClient.invalidateQueries('query-key');
        },
    });
}
const {mutate} = useCustomMutationHook()

```

# Axios Intercepter

```tsx
const client = axios.create({baseUrl:"localHost"});

export const request = ({...options}) => {
   client.default.headers.common.Authorization = `Bearer token`;
   const onSuccess = res => res
   const onError = err => {
    //custom handling
    return err;
   }

   return client(options).then(onSuccess).catch(onError);
}

//usage

const fn = () => {
    return request({url:"api/"});
}; //get promise
const fn = () => {
    return request({url:"api/", method:'post', data:data});
}; //post promise


export const useCustomQueryHook = (options) => {
    return  useQuery("uniqueKey",fn, {
        // ... here default customization
        ...options // onError onSuccess ...etc
    })
}

```
