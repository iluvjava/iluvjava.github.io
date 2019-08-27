(()=>
{

    //BootStrap Settings Start:
    // JQuery : Classes Added to All Selected Entities. 
    const Settings1 = 
    {
        "ul.list-group":["w-75", "p-3"], 
        "div.card": ["w-100", "mx-auto","my-2", "align-items-center", "pt-4"],
        "div.mydisplay": ["text-center", "bg-primary", "text-white"], 
        "div.passage-entry":["container-fluid", "w-75"],
        "h3": ["my-3"], 
        "div.col": ["mx-0", "w-100"]
    };
    //BootStrap Settings end.
    const ALLSETTINGS = 
    [
        Settings1
    ];
    
    //Listeners and their elements.
    const ALLLISTENERS = 
    {
        "ul":()=>
        {
            console.log("Listener triggered on element: " + this);
        }
    }

    "use strict";

    window.addEventListener("load", init);

    /**
     * Initialization when window is loaded. 
     */
    function init()
    {
        applyAllSettings();
        prepareAllListeners();
    }
    
    /**
     * A function that reads from the ALLSETTINGS and apply all the setiings in it.
     */
    async function applyAllSettings()
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
     * Add all listeners to the needed elements. 
     */
    async function prepareAllListeners()
    {
        console.log("Preparing All Listeners.");
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
    }
})
();