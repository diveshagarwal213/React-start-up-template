# React Hook Form Notes

1. React hook form don't render component when fields are Updates

## useForm() Hook 

```tsx
const from = useForm();
```
+ ### Register
    Basic
    ```tsx
    const {register} = from;
    // always define 'type' (not sure about the id) 
    const JSX = <input type="text" id="fieldName" {...register("fieldName",options)}  />
    ```
    Register Options 

    ```tsx
    const registerOptions = {
        required:"Required Error Message",
        required:{
            value=true,
            message:"error display message"
        },
        //-----------------------------------
        pattern:{
            value: "", //Regx format,
            message:"error display message"
        }
        //----------------------------------
        validate:(fieldValue) => (false || true) || "Error Message"
        validate:{
            ruleKey => (false || true) || "Error Message",
            ruleKey2 => (false || true) || "Error Message",
        }

        //----------------------------------
        // by default number,date values are string.
        valueAsNumber:true
        valueAsDate:true

        //---------------------------------
        disabled:true
        disabled:watch("channel" === "")
    } 

    ```
+ ### Control
    1. Dev Tools
    2. Helps when working with Dynamic Fields

+ ### handleSubmit
    + onSubmit
        ```tsx
        type IData : {
            username:string;
        }

        const from = useForm<IData>();
        const {register, handleSubmit} = from;

        const mySubmitFunction = (data:IData) => {};

        const JSX = 

        <form onSubmit={handleSubmit(mySubmitFunction)} ></form>

        ```
    + onError

        ```tsx
        type IData : {
            username:string;
        }

        const from = useForm<IData>();
        const {register, handleSubmit} = from;

        const mySubmitFunction = (data:IData) => {};
        const onErrorHandler = (errors:FieldsError<IData>) => {};

        const JSX = 
        <form onSubmit={handleSubmit(mySubmitFunction, onErrorHandler)} ></form>
        ```

+ ### formState
    + helps to display error messages
        
        ```tsx
        type IData : {
            username:string;
        }

        const from = useForm<IData>();
        const {register, handleSubmit, formState} = from;
        const {errors} = formState;

        const JSX = <p > {errors.fieldName?.message} </p>
        ```
    + get the details of touched and dirtyFields, isDirty, isValid
        
        ```tsx
        const {register, handleSubmit, formState} = from;
        const {errors, touchedFields, dirtyFields, isDirty, isValid } = formState;
        const JSX =<p > {errors.fieldName?.message} </p>
        ```    

+ ### trigger method
    Manually trigger validation 
    ```tsx
        const {register, handleSubmit, formState, trigger} = from;
    ```    
    trigger();
    trigger("fieldName");
+ ### watch
    help to observe a value
    1. Basic
     ```tsx
        const {register, handleSubmit, formState, watch} = from;
        const watchingFieldName = watch("fieldName") 
        const watchingFieldName = watch(["fieldName","fieldName_two"]) 
        //if empty watch(); it will watch for everyfield
        const watchingFieldName = watch() 
    ```
    2. performing sideEffect after watching a value (callBack version)
    + using this method this method our component will not reRender every time when form value changes
    ```tsx

    useEffect(() => {
        const subscription = watch((value) => {

        })
        return subscription.unsubscribe();
    },[watch])

    ```
+ ### getValues method
    + getValues() // return current form Values. 
    + getValues() // return all values
    + getValues("single") // return a value
    + getValues("single.one") // return a value
    + getValues(["one","two"]) // return array of selected values
+ ### setValues method
    + setValues("fieldName", fieldValue, options) // return a value
    + options
        + shouldValidate,shouldDirty,shouldTouched  

## useForm() Hook Options
```tsx
const useFormOptions = {};    
const from = useForm(useFormOptions);
```
+ ### defaultValues

    + object
        ```tsx
        const useFormOptions = {
            defaultValues:{
                fieldName:"value"
            }        
        };
        ```
    + nested object
        ```tsx
        const useFormOptions = {
            defaultValues:{
                fieldName:"value"
                fieldName2:{
                one:"",
                two:"",
                }
            }        
        };

        const JSX = <input {... register('fieldName2.one', options)}/>
    + Arrays
        ```tsx
        const useFormOptions = {
            defaultValues:{
                fieldName:["",""]
            }        
        };

        const JSX = <input {... register('fieldName.0', options)}/>
        ```
    + async function
        ```tsx
        const useFormOptions = {
            defaultValues: async () => {
                //api call
                return {
                    fieldName:"value"
                }
            }
        };
        ```

+ ### mode
    + onSubmit (default)
    + onBlur 
        + trigger validation when focus out of field
    + onTouched 
        + trigger validation when focus out of field first time then every change event
    + onChange
        + on every change event
    + all
        + onBlur + onChange  

# useFieldArray with useForm (Dynamic Fields)

1. useFieldArray use object to work with Dynamic fields

+ ### Arrays of objects
    ```tsx
        type IData = {
                arrayFieldName:{
                    value:"",
                }[]
        };
        const useFormOptions = {
            defaultValues:{
                arrayFieldName:[{value:""}]
            }        
        };

        const from = useForm(useFormOptions);

        const {register, control} = from;

        const {fields, append, remove} = useFieldArray({
            name:"arrayFieldName",
            control
        })

        const JSX = (
            <div>
            {
               fields.map((field,i) => {
                return (
                    <div key={i} >
                        <input {...register(`arrayFieldName${i}.value` as const)} />
                        <button onClick={ () =>  remove(i) } ></button>
                    </div>
                )
               }) 
            }
            <button onClick={ () =>  append({value:""}) } ></button>
            </div>

        )
     ```

