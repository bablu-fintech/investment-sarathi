/*==================================================
    Investment Sarathi Portfolio
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio Module Loaded");

/*==================================================
    PORTFOLIO GROWTH CHART
==================================================*/

const growthChart = document.getElementById("portfolioGrowthChart");

if (growthChart) {

    new Chart(growthChart, {

        type: "line",

        data: {

            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],

            datasets: [{

                label: "Portfolio Value",

                data: [850000,980000,1100000,1260000,1480000,1710000,1980000,2285450],

                borderColor:"#2563EB",

                backgroundColor:"rgba(37,99,235,.15)",

                fill:true,

                borderWidth:3,

                tension:.4,

                pointRadius:5,

                pointHoverRadius:8

            }]

        },

        options:{

            responsive:true,

            maintainAspectRatio:false,

            plugins:{
                legend:{
                    display:false
                }
            },

            scales:{

                y:{
                    grid:{
                        color:"#EEF2F7"
                    }
                },

                x:{
                    grid:{
                        display:false
                    }
                }

            }

        }

    });

}

/*==================================================
    ASSET ALLOCATION
==================================================*/

const allocationChart=document.getElementById("assetAllocationChart");

if(allocationChart){

new Chart(allocationChart,{

type:"doughnut",

data:{

labels:[

"Mutual Fund",

"Stocks",

"Gold",

"Insurance"

],

datasets:[{

data:[55,25,10,10],

backgroundColor:[

"#2563EB",

"#10B981",

"#F59E0B",

"#8B5CF6"

],

borderWidth:0

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

cutout:"65%",

plugins:{

legend:{

position:"bottom"

}

}

}

});

}

/*==================================================
    MONTHLY INVESTMENT
==================================================*/

const monthlyChart=document.getElementById("monthlyInvestmentChart");

if(monthlyChart){

new Chart(monthlyChart,{

type:"bar",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],

datasets:[{

label:"Investment",

data:[15000,22000,18000,26000,30000,28000,35000,32000],

backgroundColor:"#2563EB",

borderRadius:8

}]

},

options:{

responsive:true,

maintainAspectRatio:false,

plugins:{

legend:{

display:false

}

}

}

});

}

/*==================================================
    SEARCH HOLDINGS
==================================================*/

const search=document.querySelector(".table-search");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

const rows=document.querySelectorAll(".holdings-table tbody tr");

rows.forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)

? ""

: "none";

});

});

}

/*==================================================
    FILTER
==================================================*/

const filter=document.querySelector(".table-filter");

if(filter){

filter.addEventListener("change",function(){

const category=this.value;

const rows=document.querySelectorAll(".holdings-table tbody tr");

rows.forEach(row=>{

if(category==="All Assets"){

row.style.display="";

return;

}

row.style.display=row.innerText.includes(category)

? ""

: "none";

});

});

}

/*==================================================
    EDIT BUTTON
==================================================*/

document.querySelectorAll(".edit-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Edit Investment (Backend Coming Soon)");

});

});

/*==================================================
    DELETE BUTTON
==================================================*/

document.querySelectorAll(".delete-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const ok=confirm("Delete this Investment?");

if(ok){

alert("Investment Deleted (Demo)");

}

});

});

/*==================================================
    EXPORT
==================================================*/

document.querySelectorAll(".export-section button").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Export Feature will be connected in Backend.");

});

});

/*==================================================
    SUMMARY COUNTER
==================================================*/

document.querySelectorAll(".summary-card h2").forEach(el=>{

const txt=el.innerText;

const num=parseInt(txt.replace(/[^\d]/g,""));

if(isNaN(num)) return;

let count=0;

const step=Math.ceil(num/80);

const timer=setInterval(()=>{

count+=step;

if(count>=num){

count=num;

clearInterval(timer);

}

if(txt.includes("₹")){

el.innerText="₹"+count.toLocaleString("en-IN");

}

else if(txt.includes("%")){

el.innerText=(count/100).toFixed(2)+"%";

}

else{

el.innerText=count;

}

},20);

});

/*==================================================
    CARD HOVER
==================================================*/

document.querySelectorAll(

".summary-card,.chart-card,.performance-card,.health-card,.insight-card"

).forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-8px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});

/*==================================================
    AI CARD ANIMATION
==================================================*/

const ai=document.querySelector(".insight-card");

if(ai){

setInterval(()=>{

ai.style.opacity=".88";

setTimeout(()=>{

ai.style.opacity="1";

},600);

},5000);

}

});