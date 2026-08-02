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
// Currency Formatter
// ==========================

function formatCurrency(value) {

    return "₹" + Math.round(value).toLocaleString("en-IN");

}

// ==========================
// Get Element Shortcut
// ==========================

function $(id) {

    return document.getElementById(id);

}
// ==========================
// // ==============================
// Calculator Tab Switching
// ==============================

function showCalculator(type) {

    $("sip-section").style.display = "none";
    $("lumpsum-section").style.display = "none";
    $("swp-section").style.display = "none";

    document.querySelectorAll(".calc-tab")
        .forEach(btn => btn.classList.remove("active"));

    if (type === "sip") {
        $("sip-section").style.display = "block";
    }

    if (type === "lumpsum") {
        $("lumpsum-section").style.display = "block";
    }

    if (type === "swp") {
        $("swp-section").style.display = "block";
    }

    document
        .querySelector(`[data-tab="${type}"]`)
        .classList.add("active");
}

document.querySelectorAll(".calc-tab").forEach(btn => {

    btn.addEventListener("click", function () {

        showCalculator(this.dataset.tab);

    });

});

// Default Page
showCalculator("sip");
// ==========================
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

    $("futureValue").innerText =
        formatCurrency(futureValue);

}
// ==========================
// Events
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

].forEach(id=>{

$(id).addEventListener(
"input",
calculateSIP
);

});

// First Load

calculateSIP();
// ==========================
// Lumpsum Calculator
// ==========================

function calculateLumpsum() {

    const amount = Number($("lumpAmount").value);
    const years = Number($("lumpYears").value);
    const rate = Number($("lumpRate").value);

    if (amount <= 0 || years <= 0 || rate <= 0) return;

    const futureValue =
        amount * Math.pow(1 + rate / 100, years);

    const profit = futureValue - amount;

    $("lumpInvested").innerText = formatCurrency(amount);
    $("lumpProfit").innerText = formatCurrency(profit);
    $("lumpFuture").innerText = formatCurrency(futureValue);

}
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

calculateLumpsum();