# JustAWebsite # 
it's just a few html css files. 

# grepassages.html # 
- Might need to add a dropdown manual at the top of nev bar to make it easier to read passages. (WIP)
    - Drop down manu will be created by the script. id="my-dropdown-manu"
        - Scan all elements with class: "passage Entry"
        - Add then passge title to the dropdown list as `<li>`
    - Hide unviewing passages on page
        - Make one of the passage entry to be on page by default. 
        - Default unhidden must be manually coded in.

# About The Technical Details #
## Promises and Async Function ##
- [Link](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- An async function can make calls to functions that return promises and then await all of the to finish. 
- await keyword can only be used for function that returns a promise. 
- Function that returns a promise: 
```
    function returnAPromise()
    {
        return new promise
        (
            resolve =>
            {
                // what you wanna do here
                resolve(//your result here.);
            }
        )
    }
```
- The promise can return something, just use the resolve() fxn to return to 
the the functions awaiting.
- The let something = await somethingelse() will make the execute synchroous, should use promise.all()
to execute shits all at the same time and wait for all of the them to finish. 

## Placement of the script tags
- Global module patters ensure functions members are not accessible after website has been set up. 
- The main script of the page must be called before the boostrap. 
    - This is the case because all the DOM objects must be set up properly before styling and 
    adding listeners to them. 
- Adding the script tags in order into the HTML or using the global module patterns and event listener on windows also works. 

## My JS Library
- Because front end dev is hard and contains lots of bull shit, building a library of my own will be really helpful if I were to continue doing front end bullshit. 
- This library is going to be based on Jquery. 

### convert()
- This is a function that converts Json object in certain grammatical syntax 
into visual elements on the page. 
- The helper functions for it includes: 
    - createElement();
    - createAttrs();
- Here is the type of json that it can convert. 
```
const MYELEMENTS = 
    [
        {
            element: "div" // element tag, <, > must be used. 
            , 
            parent: "body" // The parent that this element will be appended to. 
            ,
            attributes: 
            { 
                // ID is not supported. 
                alt: "TheAlText"
                , 
                src: "/example.com"
                , 
                "somethingelse": "stuff"
                ,
                "someattribues": "the key for that attributes."
                , 
                "somebooleanattribute": "" // use empty val for boolean attributes.  
            }
            ,
            children:
            [
                // recursion....
                // A value for "parents" is optional here. 
            ]
        }
    ]
```