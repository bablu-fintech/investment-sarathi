/*==================================================
 Investment Sarathi
 Calculator Suite v1.1
==================================================*/

// ==========================
// Global Variables
// ==========================
window.onload = function () {

    

    calculateSIP();
    calculateLumpsum();
    calculateSWP();

};
console.log("sip.js loaded");

let sipChart = null;
let lumpChart = null;

// ==========================
// Helper Functions
// ==========================

function $(id) {
    return document.getElementById(id);
}

function formatCurrency(value) {
    return "₹" + Math.round(value).toLocaleString("en-IN");
}

// ==========================
// Calculator Tab Switching
// ==========================

function showCalculator(type){

    console.log(type);

    $("sip-section").style.display = "none";
    $("lumpsum-section").style.display = "none";
    $("swp-section").style.display = "none";
$("goal-section").style.display = "none";
    document.querySelectorAll(".calc-tab")
        .forEach(btn => btn.classList.remove("active"));

    switch(type){

    case "sip":
        $("sip-section").style.display = "block";
        break;

    case "lumpsum":
        $("lumpsum-section").style.display = "block";
        break;

    case "swp":
        $("swp-section").style.display = "block";
        break;

    case "goal":
        $("goal-section").style.display = "block";
        break;

}

    document
        .querySelector(`[data-tab="${type}"]`)
        .classList.add("active");

}

document.querySelectorAll(".calc-tab").forEach(btn=>{

    btn.addEventListener("click",function(){

        showCalculator(this.dataset.tab);

    });

});

showCalculator("sip");

// ==========================
// SIP Calculator
// // ==========================
// SIP Calculator
// ==========================

function calculateSIP() {

    const sip = Number($("sipAmount").value);
    const years = Number($("years").value);
    const annualRate = Number($("returnRate").value);
    const stepUp = Number($("stepUp").value);

    if (sip <= 0 || years <= 0 || annualRate <= 0) {
        return;
    }

    let invested = 0;
    let futureValue = 0;
    let monthlySip = sip;

    const monthlyRate = annualRate / 12 / 100;

    for (let y = 1; y <= years; y++) {

        for (let m = 1; m <= 12; m++) {

            const remainingMonths =
                (years - y) * 12 + (12 - m + 1);

            futureValue +=
                monthlySip *
                Math.pow(1 + monthlyRate, remainingMonths);

            invested += monthlySip;

        }

        monthlySip *= (1 + stepUp / 100);

    }

    const returns = futureValue - invested;

    $("invested").innerText = formatCurrency(invested);
    $("returns").innerText = formatCurrency(returns);
    $("futureValue").innerText = formatCurrency(futureValue);

    // ==========================
    // SIP Chart
    // ==========================

    if (sipChart) {
        sipChart.destroy();
    }

    const ctx = $("sipChart").getContext("2d");

    sipChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: ["Investment", "Returns"],

            datasets: [{

                data: [invested, returns],

                backgroundColor: [
                    "#2563EB",
                    "#10B981"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// ==========================
// Events
// // ==========================
// SIP Events
// ==========================

$("calculateBtn").addEventListener(
    "click",
    calculateSIP
);

[
    "sipAmount",
    "years",
    "returnRate",
    "stepUp"
].forEach(id => {

    $(id).addEventListener(
        "input",
        calculateSIP
    );

});

// Initial Load

calculateSIP();
// ==========================
// Lumpsum Calculator
// // ==========================
// Lumpsum Calculator
// ==========================

function calculateLumpsum() {

    const amount = Number($("lumpAmount").value);
    const years = Number($("lumpYears").value);
    const rate = Number($("lumpRate").value);

    if (amount <= 0 || years <= 0 || rate <= 0) {
        return;
    }

    const futureValue = amount * Math.pow(1 + rate / 100, years);

    const profit = futureValue - amount;

    $("lumpInvested").innerText = formatCurrency(amount);
    $("lumpProfit").innerText = formatCurrency(profit);
    $("lumpFuture").innerText = formatCurrency(futureValue);

    // ==========================
    // Lumpsum Chart
    // ==========================

    if (lumpChart) {
        lumpChart.destroy();
    }

    const ctx = $("lumpChart").getContext("2d");

    lumpChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: ["Investment", "Profit"],

            datasets: [{

                data: [amount, profit],

                backgroundColor: [
                    "#2563EB",
                    "#10B981"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// ==========================
// Lumpsum Events
// ==========================

$("calculateLump").addEventListener(
    "click",
    calculateLumpsum
);

[
    "lumpAmount",
    "lumpYears",
    "lumpRate"
].forEach(id => {

    $(id).addEventListener(
        "input",
        calculateLumpsum
    );

});

// Initial Load

calculateLumpsum();
// ==========================
// SWP Calculator
// ==========================

let swpChart = null;

function calculateSWP() {

    const principal = Number($("swpAmount").value);
    const withdrawal = Number($("withdrawal").value);
    const annualRate = Number($("swpRate").value);
    const years = Number($("swpYears").value);

    if (
        principal <= 0 ||
        withdrawal <= 0 ||
        annualRate <= 0 ||
        years <= 0
    ) return;

    let balance = principal;

    const monthlyRate = annualRate / 12 / 100;

    const months = years * 12;

    for (let i = 0; i < months; i++) {

        balance = balance * (1 + monthlyRate);

        balance -= withdrawal;

        if (balance < 0) {

            balance = 0;
            break;

        }

    }

    const totalWithdrawal = withdrawal * months;

    $("totalWithdrawal").innerText =
        formatCurrency(totalWithdrawal);

    $("remainingCorpus").innerText =
        formatCurrency(balance);

    // Chart

    if (swpChart) {

        swpChart.destroy();

    }

    const ctx = $("swpChart").getContext("2d");

    swpChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Withdrawn",

                "Remaining"

            ],

            datasets: [

                {

                    data: [

                        totalWithdrawal,

                        balance

                    ],

                    backgroundColor: [

                        "#EF4444",

                        "#10B981"

                    ],

                    borderWidth: 0

                }

            ]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}
// ==========================
// SWP Events
// ==========================

$("calculateSWP").addEventListener(
    "click",
    calculateSWP
);

[
    "swpAmount",
    "withdrawal",
    "swpRate",
    "swpYears"
].forEach(id => {

    $(id).addEventListener(
        "input",
        calculateSWP
    );

});

calculateSWP();
// ==========================
// Goal Planner
// ==========================

let goalChart = null;

function calculateGoal() {

    const target = Number($("goalAmount").value);
    const current = Number($("currentSavings").value);
    const years = Number($("goalYears").value);
    const annualRate = Number($("goalRate").value);

    if (target <= 0 || years <= 0 || annualRate <= 0) {
        return;
    }

    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;

    const futureCurrent =
        current * Math.pow(1 + monthlyRate, months);

    const requiredAmount =
        Math.max(target - futureCurrent, 0);

    let sip = 0;

    if (requiredAmount > 0) {

        sip =
            requiredAmount *
            monthlyRate /
            (Math.pow(1 + monthlyRate, months) - 1);

    }

    $("goalSip").innerText =
        formatCurrency(sip);

    $("goalTarget").innerText =
        formatCurrency(target);

    $("goalCurrent").innerText =
        formatCurrency(current);

   const percent =
    Math.min((current / target) * 100, 100);

    $("goalPercent").innerText =
        percent.toFixed(1) + "%";
            // ==========================
    // Goal Chart
    // ==========================

    if (goalChart) {
        goalChart.destroy();
    }

    const ctx = $("goalChart").getContext("2d");

    goalChart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [
                "Current Savings",
                "Remaining Goal"
            ],

            datasets: [{

                data: [
                    current,
                    Math.max(target - current, 0)
                ],

                backgroundColor: [
                    "#10B981",
                    "#2563EB"
                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

    // ==========================
    // AI Goal Coach
    // ==========================

    let advice = "";

    if (percent >= 80) {

        advice =
        "🟢 Excellent! You are on track to achieve your goal. Continue investing consistently.";

    }
    else if (percent >= 50) {

        advice =
        "🟡 Good Progress! Increase your monthly SIP slightly to reach your goal comfortably.";

    }
    else {

        advice =
        "🔴 You need a higher monthly investment or a longer investment period to achieve this goal.";

    }

    $("goalAdvice").innerText = advice;

}
// ==========================
// Goal Planner Events
// ==========================

$("calculateGoal").addEventListener(
    "click",
    calculateGoal
);

[
    "goalAmount",
    "currentSavings",
    "goalYears",
    "goalRate"
].forEach(id => {

    $(id).addEventListener(
        "input",
        calculateGoal
    );

});

calculateGoal();

******************
/*==================================================
    Investment Sarathi SIP Planner
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

console.log("SIP Planner Loaded");

/*==================================================
    ELEMENTS
==================================================*/

const sipAmount = document.getElementById("sipAmount");
const sipYears = document.getElementById("sipYears");
const sipReturn = document.getElementById("sipReturn");

const yearValue = document.getElementById("yearValue");
const returnValue = document.getElementById("returnValue");

const totalInvestment = document.getElementById("totalInvestment");
const estimatedReturn = document.getElementById("estimatedReturn");
const maturityValue = document.getElementById("maturityValue");

/*==================================================
    RANGE VALUE
==================================================*/

if(sipYears){

sipYears.addEventListener("input",()=>{

yearValue.innerHTML=sipYears.value+" Years";

calculateSIP();

});

}

if(sipReturn){

sipReturn.addEventListener("input",()=>{

returnValue.innerHTML=sipReturn.value+"%";

calculateSIP();

});

}

if(sipAmount){

sipAmount.addEventListener("keyup",calculateSIP);

sipAmount.addEventListener("change",calculateSIP);

}

/*==================================================
    SIP FORMULA
==================================================*/

function calculateSIP(){

const monthly=parseFloat(sipAmount.value)||0;

const years=parseInt(sipYears.value);

const annual=parseFloat(sipReturn.value);

const r=annual/12/100;

const n=years*12;

const future=monthly*((Math.pow(1+r,n)-1)/r)*(1+r);

const invest=monthly*n;

const gain=future-invest;

totalInvestment.innerHTML="₹"+invest.toLocaleString("en-IN");

estimatedReturn.innerHTML="₹"+Math.round(gain).toLocaleString("en-IN");

maturityValue.innerHTML="₹"+Math.round(future).toLocaleString("en-IN");

updateChart(invest,future);

}

/*==================================================
    CHART
==================================================*/

let sipChart;

function updateChart(invest,future){

const ctx=document.getElementById("sipProjectionChart");

if(!ctx) return;

if(sipChart){

sipChart.destroy();

}

sipChart=new Chart(ctx,{

type:"doughnut",

data:{

labels:[

"Investment",

"Returns"

],

datasets:[{

data:[

invest,

future-invest

],

backgroundColor:[

"#2563EB",

"#10B981"

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
    SEARCH SIP
==================================================*/

const search=document.querySelector(".table-search");

if(search){

search.addEventListener("keyup",function(){

const value=this.value.toLowerCase();

document.querySelectorAll(".sip-table tbody tr").forEach(row=>{

row.style.display=row.innerText.toLowerCase().includes(value)

? ""

: "none";

});

});

}

/*==================================================
    EDIT BUTTON
==================================================*/

document.querySelectorAll(".edit-btn").forEach(btn=>{

btn.onclick=()=>{

alert("Edit SIP (Backend Coming Soon)");

};

});

/*==================================================
    DELETE BUTTON
==================================================*/

document.querySelectorAll(".delete-btn").forEach(btn=>{

btn.onclick=()=>{

if(confirm("Delete this SIP?")){

alert("SIP Deleted (Demo)");

}

};

});

/*==================================================
    EXPORT
==================================================*/

document.querySelectorAll(".export-section button").forEach(btn=>{

btn.onclick=()=>{

alert("Export Feature will be connected with Backend.");

};

});

/*==================================================
    AI CARD
==================================================*/

const ai=document.querySelector(".ai-card");

if(ai){

setInterval(()=>{

ai.style.opacity=".88";

setTimeout(()=>{

ai.style.opacity="1";

},500);

},5000);

}

/*==================================================
    INITIAL LOAD
==================================================*/

calculateSIP();

});