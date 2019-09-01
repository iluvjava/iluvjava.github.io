(()=>
{

    //BootStrap Settings Start:
    // JQuery : Classes Added to All Selected Entities. 
    const Settings1 = 
    {
        "ul.list-group":["w-75", "p-3"], 
        "div.card": ["w-100", "mx-auto","my-2", "align-items-center", "pt-4"],
        "div.mydisplay": ["text-center", "bg-primary", "text-white"], 
        "div.passage-entry":["container-fluid", "w-100"],
        "h3": ["my-3"], 
        "div.col": ["mx-0", "w-90"],
        "nav":["navbar-expand-lg", "navbar-light", "bg-light", "sticky-top"], 
        ".passage-entry:not(.not-auto-hidden) *": ["auto-hidden"]
    };
    //BootStrap Settings end.
    const ALLSETTINGS = 
    [
        Settings1
    ];
    
    //Listeners and their elements.
    const ALLLISTENERS = 
    {
        "#my-dropdown-menu > *":
        [
            "click", 
            (e)=>
            {
                console.log("Listener called on element: " +
                 e.target.innerText);
                let id = e.target.innerText.split(" ")[1];
                let elements_to_hide = qs(".passage-entry *:not(.auto-hidden)");
                for 
                (
                    let i = 0, e = elements_to_hide[i];
                    i < elements_to_hide.length;
                    e = elements_to_hide[++i]
                )
                {
                    e.classList.add("auto-hidden");
                }

                let elements_to_show = qs("#p" + id + " *");
                for 
                (  
                    let i = 0, e = elements_to_show[i];
                    i < elements_to_show.length;
                    e = elements_to_show[++i]
                )
                {
                    e.classList.remove("auto-hidden");
                }
            }
        ], 

        ".list-group-item": 
        [
            ["mouseover","mouseout" ],
            (e)=>
            {
                console.log(e.type + "Event At: "+ e.target.innerText);
            }
        ]
    }

    "use strict";

    /**
     * Initialization when window is loaded. 
     */
    function init()
    {
        let p = setupTheWebsite();
        p.then(prepareAllListeners());
    }
    
    /**
     * A function that reads from the ALLSETTINGS and apply all the 
     * setiings in it.
     */
    function applyAllSettings()
    {
        console.log("Applying All Settings... ");
        for (let i = 0; i < ALLSETTINGS.length; i++)
        {
            let setting = ALLSETTINGS[i];
            for 
            (
                let j = 0, val = Object.values(setting)[j], key = Object.keys(setting)[j];
                j < Object.keys(setting).length;
                val = Object.values(setting)[++j], 
                key = Object.keys(setting)[j]
            )
            {
                console.log("Looking for element with css: " + key)
                let targets = qs(key);
                let settingclasseslist = val;
                for 
                (
                    let k = 0, targetelement = targets[k]; 
                    k < targets.length;
                    targetelement = targets[++k]
                )
                {
                    console.log("Applying Settings to element: " + targetelement);
                    for 
                    ( 
                        let l = 0, classtoadd = settingclasseslist[l]; 
                        l < settingclasseslist.length; 
                        classtoadd = settingclasseslist[++l]
                    )
                    {
                        console.log("add class: " + classtoadd);
                        targetelement.classList.add(classtoadd);
                    }
                }
            }
        }
    }

    /**
     * Sets up the website, all the visual elements will 
     * be completely added after this function call. 
     */
    function setupTheWebsite()
    {
        return new Promise
        (
            resolve =>
            {   
                prepareDropDownMenu();
                applyAllSettings();
                resolve(null);
            }
        );
    }

    /**
     * Using the const in the field to add all the listen to their 
     * desired elements .
     */
    async function prepareAllListeners()
    {
        console.log("Preparing All Listeners.");
        //debugger;
        for(let i = 0; i < Object.keys(ALLLISTENERS).length; i++)
        {
            let k = Object.keys(ALLLISTENERS)[i];
            let v = Object.values(ALLLISTENERS)[i];
            let all_element_to_add = qs(k);
           
            for (let i = 0; i < all_element_to_add.length; i++)
            {
                addEventListenersTo(all_element_to_add[i], v[0], v[1]);
                console.log("adding element to: " + all_element_to_add[i]);
            }
        }
    }

    /**
     * Add a list of events with one handlers to a certain element.
     * @param {Object} element 
     * @param {Array String} eventlist 
     * @param {Function} handlers 
     */
    function addEventListenersTo(element, eventlist, handlers)
    {
        if(typeof eventlist === "object")
        {
            eventlist.forEach
            (
                (e) =>
                {
                    element.addEventListener(e, handlers);
                }
            );
        }
        element.addEventListener(eventlist, handlers);
    }

    /**
     * Function scans the page for the passages and setup the dropdown menu for
     *  easy nevigation.
     * - It only creates the 
     * @param {Fxn} funccall
     * The function it should call after the asyn execution. 
     */
    function prepareDropDownMenu()
    {
        return new Promise
        (
            resolve =>
            {
                let passages = qs(".passage-entry");
                for
                (
                    let i = 0;
                    i < passages.length; 
                    ++i
                )
                {
                    let passagetitle = passages[i].children[0].innerText; 
                    console.log(passagetitle);
                    //debugger;
                    qs("#my-dropdown-menu")[0].appendChild(
                        createDropdownMenuItem(passagetitle));
                }
                resolve(null);
            }
        );
    }

    /**
     * Creates dropdown menu item for bootstrap dropdown menu. 
     * @param {string} text
     * The text displayed on the droped down item.
     */
    function createDropdownMenuItem(text)
    {
        let newelement = document.createElement("div");
        let newinnerelement = document.createElement("a");
        newelement.classList.add("dropdown-menu");
        newelement.setAttribute("aria-labelledby", "navbarDropdownMenuLink");
        newinnerelement.classList.add("dropdown-item");
        newinnerelement.innerText = text;
        newelement.appendChild(newinnerelement);
        return newinnerelement;
    }

    /**
     * 
     * @param {string} q
     * css query.  
     * @param {bool} all
     * true to selectall.  
     */
    function qs(q, all = true)
    {
        if(all)
        {
            return document.querySelectorAll(q);
        }
        let res = document.querySelector(q);
        if (res === null)
        {
            throw new Error("Cannot find element: " + q);
        }
        return res; 
    }

    //Run everything in the script.
    init();

})
();