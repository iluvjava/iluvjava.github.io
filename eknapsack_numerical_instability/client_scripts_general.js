(function()
{
    // It's Global, copied from stackoverflow. 
    window.mobileCheck = function() {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };

    function addListenerTo(e, handler, eventType)
    {
        e.addEventListener(eventType, handler);
    }

    function id(elementId)
    {
        return document.getElementById(elementId); 
    }

    function c(elementClass)
    {
        return document.getElementsByTagName(elementClass); 
    }

    function q(queryString)
    {
        return document.querySelector(queryString);
    }

    function menuBottonHandler()
    {
        q("div.collapse.navbar-collapse").classList.toggle("show"); 
    }

    function assignStyleToPlotly()
    {
        let plotyModule = id("plotly-module")
        plotyModule.style = "width:800;height:900;"; 
        plotyModule.style.marginLeft = "auto"; 
        plotyModule.style.marginRight = "auto";
        
        plotyModule = id("plotly-module2")
        plotyModule.style = "width:800;height:900;"; 
        plotyModule.style.marginLeft = "auto"; 
        plotyModule.style.marginRight = "auto";
        // plotyModule.style.overflow = "scroll"; 
    }

    /**
     * First plot about the accuracies of floats summing algorithms. 
     */
    function fetchDataAndPlot1(source)
    {
        populateDataLocal();
        function populateData(theData)
        {
            window.Storage["NumericalErrorPlots"] = theData; // backup the data. 

            let Xs = theData["Sizes"]; 
            let NumpySumPlotMeanError = {
                x: Xs, 
                y: theData["ErrorsMeanNumpySum"], 
                mode: "markers", 
                marker: {
                    color: "rgb(255, 50, 50)"
                }, 
                type: "scatter", 
                name: "Numpy Sum Errors", 
            }; 

            let PythonSumPlotMeanError = {
                x: Xs, y: theData["ErrorsMeanPythonSum"], 
                mode: "markers", 
                type: "scatter", 
                name: "Python Sum Errors", 
                marker: {
                    color: "rgb(50, 255, 50)"
                }, 
            }; 

            let NumpySumStdLower = {
                x: Xs, y: theData["NumpySumStdLower"], 
                mode: "lines", 
                name: "Numpy Error Lower Bound", 
                marker: {
                    color: "rgb(255, 50, 50)"
                }, 
                type: "scatter"
            }; 

            let NumpySumStdUpper = {
                x: Xs, y: theData["NumpySumStdUpper"], 
                mode: "lines", 
                name: "Numpy Error Upper Bound", 
                marker: {
                    color: "rgb(255, 50, 50)"
                }, 
                type: "scatter"
            }; 

            let PythonSumStdLower = {
                x: Xs, y: theData["PythonSumStdLower"], 
                mode: "lines", 
                name: "Python Error Lower Bound", 
                marker: {
                    color: "rgb(50, 255, 50)"
                }, 
                type: "scatter"
            }; 

            let PythonSumStdUpper = {
                x: Xs, y: theData["PythonSumStdUpper"], 
                mode: "lines", 
                name: "Python Error Upper Bound", 
                marker: {
                    color: "rgb(50, 255, 50)"
                }, 
                type: "scatter"
            }; 

            TitleFont = {
                family: 'Courier New, monospace', 
                size: 18,
                color: 'lightgrey'
            }; 

            let LayOut = {
                title: 'Errors of numpy.sum() and python default sum()', 
                xaxis: {
                  title: 'Array Size',
                  titlefont: TitleFont
                },
                yaxis: {
                  title: 'Errors',
                  titlefont: TitleFont, 
                  showticklabels: true,
                  exponentformat: 'e',
                  showexponent: 'all'
                }
            };

            let data = [
                        PythonSumPlotMeanError,
                        PythonSumStdLower,
                        PythonSumStdUpper,
                        NumpySumPlotMeanError,
                        NumpySumStdLower,
                        NumpySumStdUpper, 
                        ]; 
            Plotly.newPlot(id("plotly-module"), data, LayOut); 

        };
        
        function populateDataLocal()
        {
          if(window.Storage["NumericalErrorPlots"])
          {
            populateData(window.Storage["NumericalErrorPlots"])
            return true; 
          }
          else
          {
            return false
          }
        };

        promise =  fetch(source)
            .then(response => response.json())
            .then(populateData)
            .catch(()=>{
                console.log("Error occurred when handling the fetching of data:" +  
                + "umerical Algorithm Errors Plot");
            }); 
        
        function resizeHandler(){
            populateDataLocal();
        };
        window.addEventListener("resize", resizeHandler);
        return promise;
    }

    /**
     * Second plots about the speed of floats summing algorithm. 
     * @param {*} source 
     */
    function fetchDataAndPlot2(source)
    {
        populateDataLocal();
        function populateData(theData)
        {
            window.Storage["NumericalPerformance"] = theData;
            let Xs = theData["Sizes"]; 
            
            let ThePlotsNames = ["Kahan Sum", "Numpy Sum", "Python Fsum", "Rational Sum"];
            let TheColors = ["rgba(255, 50, 50, 150)", 
            "rgba(50, 255, 50, 150)", "rgba(50, 50, 255, 150)", "rgba(50, 50, 50, 150)"];
            let PlotSkeleton = 
            {
                x: Xs, mode: "markers", type: "scatter"
            };
            let TheTraces = [];

            for(let I = 0; I < 4; I++)
            {
                
                let BeingConstructed = Object.assign({}, PlotSkeleton); 
                BeingConstructed.name = ThePlotsNames[I] + "Means";
                BeingConstructed.y = theData[ThePlotsNames[I]]["Means"];
                BeingConstructed.marker = {color: TheColors[I]};
                TheTraces.push(BeingConstructed)

                BeingConstructed = Object.assign({}, BeingConstructed); 
                BeingConstructed.name = ThePlotsNames[I] + "Upper"; 
                BeingConstructed.y = theData[ThePlotsNames[I]]["Upper"]; 
                BeingConstructed.mode = "lines"; 
                TheTraces.push(BeingConstructed);

                BeingConstructed = Object.assign({}, BeingConstructed); 
                BeingConstructed.name = ThePlotsNames[I] + "Lower"; 
                BeingConstructed.y = theData[ThePlotsNames[I]]["Lower"]; 
                BeingConstructed.mode = "lines"; 
                TheTraces.push(BeingConstructed);
            }

            let LayOut = {height: 600};  

            Plotly.newPlot(id("plotly-module2"), TheTraces, LayOut);

        };
        function populateDataLocal()
        {
            if (window.Storage["NumericalPerformance"])
            {
                populateData(window.Storage["NumericalPerformance"]);
                return true;
            }
            else
            {
                return false;
            }
        }

        promise = fetch(source)
            .then(response => response.json())
            .then(populateData).catch(
                ()=>{
                    console.log("Error occurred when handling the fetching of data:" +  
                    + "umerical Algorithm Errors Plot");
                }
            ); 

        function resizeHandler()
        {
            populateDataLocal();
        }; 
        window.addEventListener("resize", resizeHandler);
        return promise;
    }  

    /**
     * Third plot about the speed of native python and python pulp + Coin_CBC solver, solving the Extended 
     * Knapsack problem. 
     * @param {*} source 
     */
    function fetchDataAndPlot3(source)
    {
        function populateData(theData){
            let PythonExecTime = theData["GreedyBBSolver"]["Execution_Time"];
            let PulpExecTime = theData["PulpSolver"]["Execution_Time"];
            let PlotSkeleton = {
                type: "box", 
            }
            let PythonPlot = {...PlotSkeleton, ...{y: PythonExecTime, 
                name: "Python Exec Time"}};
            let PulpPlot = {...PlotSkeleton, ...{y: PulpExecTime, 
                name: "Pulp Exec Time"}};
            let Layout = {
                height: 700, title: `Speed comparison, number of items` + 
                ` in problem: ${theData["Problem_size"]}`
            }; 
            Plotly.newPlot(id("plotly-module3"), [PythonPlot, PulpPlot], 
            Layout);
            window.Storage["PythonPulpPlot"] = theData; // Save to local. 
        }; 

        function populateTheDataLocal()
        {
            
            if (window.Storage["PythonPulpPlot"])
            {
                populateData(window.Storage["PythonPulpPlot"]);
                return true;
            }
            else
            {
                return false;
            }
        }; 
        populateTheDataLocal();

        promise = fetch(source).then(res => res.json())
        .then(populateData)
        .catch(()=>
        {
            console.log("Fetch Error, Unable to load the third plot. ")
        });
        
        window.addEventListener("resize", populateTheDataLocal);
        return promise;
    }

    function prepareFooterDisplay()
    {
        function prepareTheButton(){
            let TheBtn = q("#footer-display .toggle-btn");
            TheBtn.addEventListener("click", ()=>{
                id("big-printout").classList.toggle("fixed-height");
            });
        };
        function prepareTheDisplay(){
            let Thedisplay = id("footer-display");
            window.addEventListener("scroll", ()=> {
                let Above = id("intro").scrollHeight + id("inst").scrollHeight;
                let Below = Above + id("branching").scrollHeight;
                let WindowTopPosition = window.scrollY;
                let WindowMidPosition = window.innerHeight/2 + WindowTopPosition;
                if (WindowMidPosition > Above && WindowMidPosition < Below)
                {
                    Thedisplay.classList.remove("hide");
                }
                else 
                {
                    Thedisplay.classList.add("hide");
                }
            });
        };
        prepareTheButton(); 
        prepareTheDisplay();
    }

    function main()
    {
        if (window.mobileCheck())
        {
            MainContent = id("main-content"); 
            MainContent.style.paddingLeft = "0px"; 
            MainContent.style.margin = "auto"; 
            MainContent.style.minWidth = "auto"; 
            MainContent.style.fontSize = "small"; 
            
            id("side-bar").classList.toggle("hide");
            Menu = q("span.nav-hamburger-menu-icon");
            Menu.classList.toggle("hide");
            addListenerTo(Menu, menuBottonHandler, "click"); 
            
        }
        console.log("Loading Ploty module.");
        assignStyleToPlotly();
        fetchDataAndPlot1
        ("https://raw.githubusercontent.com/iluvjava/Silly_Python_Stuff/master/Numerical%20Instability/errors.json");
        fetchDataAndPlot2
        ("https://raw.githubusercontent.com/iluvjava/Silly_Python_Stuff/master/Numerical%20Instability/Execution%20time.json");
        fetchDataAndPlot3
        ("https://raw.githubusercontent.com/iluvjava/Silly_Python_Stuff/master/knapsack/Extended_knapsack_benchmark_results.json");
        prepareFooterDisplay();
    }

    window.onload = main;
})
();