$(
function ()
{   
    const MYELEMENTS = 
    [
        {
            element: "div" // element tag, <, > must be used. 
            , 
            parent: "body" // The parent that this element will be appended to. 
            ,
            innertext: "yoyoyo there is some innertext for the div element."
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
                {
                    // recursion....
                    // but the element can choose not to have the parent attribute.
                    element: "a"
                    , 
                    attributes: 
                    {
                        href: "example.com"
                        , 
                        "yoyo-my-attribute": "attr-val" 
                    }
                }
                
            ]
        }
    ]

    // This is really useful for bootstrap and shits. 
    const SETTINGS = 
    {
        "body": ["class1", "class2"],
        "body *": "class3 class4"
    };

    //This is just generally very useful for managing shits. 
    const LISTENER = 
    {
        "li": 
        [
            "mouseover mouseout"
            ,
            (e)=>
            {
console.log(e.type + "Event At: "+ e.target.innerText);
            }
        ]
    }

console.log("Library JS is interpreted.");

    /**
     *  Read the object and change the object to elements with classes. 
     */
    function applyClassSettings(settings = SETTINGS)
    {
        $.each(settings, function (idx, val) {
            $(idx).addClass(val);
        }); 
    }

    /**
     * Prepare listeners from a json object. 
     */
    function prepareTheListeners(arg = LISTENER)
    {
        $.each
        (
            arg,
            function (k, v)
            {
                $(k).on(v[0], v[1]);
                console.log(v[0]);
                console.log(v[1]);
            }
        )
    }

    /**
     * Convert Json object to DOM elements. 
     * @param {JSON} arg
     * The JSon object has to be in particular grammartical syntax.
     * @param {JQ DOM} parents  
     * It's for the recursion so that children know what their parents are. 
     */
    function convert(arg = MYELEMENTS, parents = null)
    {
        for(let i = 0; i < arg.length; i++)
        {
            let obj = arg[i];
            let NewDomMember; 
            if (
                    !( "element" in obj)
                    ||
                    (parents === null && !("parent" in obj))
                )
            {
                throw new Error("Invalid Json");
            }
            NewDomMember = $(createElement(obj["element"]));
console.log("Creating new element: " + NewDomMember);
            if ("attributes" in obj)
            {
                createAttrs(NewDomMember, obj["attributes"]); 
            }
            if ("innertext" in obj)
            {
                NewDomMember.text(obj["innertext"]);
            }
            if ("children" in obj)
            {
                // debugger;
console.log("Children attrs is in JSON obj. ");
                convert(obj["children"], NewDomMember);
            }
console.log("The new Dom element is: " + $(NewDomMember));
            let Parents = parents === null? $(obj["parent"]) : parents;
console.log("This is the parents: " + Parents);
            Parents.append(NewDomMember); 
        }
    }

    /**
     * This is a helper function for convert, It adds attrs to dom element
     * except the ID attribute. 
     * @param {JQ Dom object} domelement 
     * The element created from JQ. 
     * @param {JSON} jobject 
     * The json object representing the attributes for the element.
     */
    function createAttrs(domelement, jobject)
    {

        for (k in jobject)
        {
            let v = jobject[k];
            if (k === "id")
            {
                continue;
            }
            domelement.attr(k, v);
        }
    }

    /**
     * 
     * @param {String} tagname 
     */
    function createElement(tagname)
    {
        return document.createElement(tagname);
    }

    applyClassSettings();
    prepareTheListeners();
    convert();

});