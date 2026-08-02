/*==================================================
 Investment Sarathi
 Calculator Suite v1.1
==================================================*/

// ==========================
// Global Variables
// ==========================

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

function showCalculator(type) {

    $("sip-section").style.display = "none";
    $("lumpsum-section").style.display = "none";
    $("swp-section").style.display = "none";

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