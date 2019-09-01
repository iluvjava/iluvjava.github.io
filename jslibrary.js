$(
function ()
{   
    const MYELEMENTS = 
    [
        {
            element: "div" // element tag
            , 
            parent: "div.myelement" // This is the parents
            ,
            allattributes: 
            { 
                //These are all the attributes of each of the element.
                id : "<parentid>id?",
                attr: 
                [
                    {key: "k", val: "v"}, 
                    {key:"kk", val:"vv"},
                    {key:"disabled", val: "disabled"}
                ],
                alt: "TheAlText", 
                src: "/example.com", 
                "somethingelse": "stuff", 
            }
            ,
            "children":
            [
                //recurtion....
            ]
        }
    ]

    const SETTINGS = 
    {
        "body": ["class1", "class2"],
        "body *": "class3 class4"
    };

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
     */
    function convert(arg = MYELEMENTS, ParentID = null)
    {
        for(let i = 0; i < arg.length; i++)
        {
            let obj = arg[i];
            for(k in obj)
            {
                
            }
        }
    }

    applyClassSettings();
    prepareTheListeners();

});