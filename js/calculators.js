/*==================================================
Investment Sarathi Calculator Suite
Version : 2.0
==================================================*/

"use strict";

/*==================================================
DOM READY
==================================================*/

document.addEventListener("DOMContentLoaded", function () {

    initializeTabs();
    initializeRangeValues();

});

/*==================================================
TAB SWITCHING
==================================================*/

function initializeTabs() {

    const tabs = document.querySelectorAll(".tab-btn");
    const panels = document.querySelectorAll(".calculator-panel");

    if (!tabs.length || !panels.length) return;

    tabs.forEach(tab => {

        tab.addEventListener("click", function () {

            const target = this.dataset.tab;

            tabs.forEach(btn => btn.classList.remove("active"));

            panels.forEach(panel => {

                panel.classList.remove("active");

            });

            this.classList.add("active");

            const activePanel = document.getElementById(target);

            if (activePanel) {

                activePanel.classList.add("active");

            }

        });

    });

}

/*==================================================
RANGE VALUE UPDATE
==================================================*/

function initializeRangeValues() {

    bindRange(
        "sipYears",
        "sipYearValue",
        value => value + " Years"
    );

    bindRange(
        "sipReturn",
        "sipReturnValue",
        value => value + "%"
    );

    bindRange(
        "lumpYears",
        "lumpYearValue",
        value => value + " Years"
    );

    bindRange(
        "lumpReturn",
        "lumpReturnValue",
        value => value + "%"
    );

    bindRange(
        "swpYears",
        "swpYearValue",
        value => value + " Years"
    );

    bindRange(
        "swpReturn",
        "swpReturnValue",
        value => value + "%"
    );

    bindRange(
        "goalYears",
        "goalYearValue",
        value => value + " Years"
    );

    bindRange(
        "goalReturn",
        "goalReturnValue",
        value => value + "%"
    );

}

/*==================================================
COMMON RANGE FUNCTION
==================================================*/

function bindRange(rangeId, outputId, formatter) {

    const range = document.getElementById(rangeId);
    const output = document.getElementById(outputId);

    if (!range || !output) return;

    output.textContent = formatter(range.value);

    range.addEventListener("input", function () {

        output.textContent = formatter(this.value);

    });

}

/*==================================================
NUMBER FORMAT
==================================================*/

function formatCurrency(value) {

    return Number(value).toLocaleString("en-IN", {

        style: "currency",
        currency: "INR",

        maximumFractionDigits: 0

    });

}

/*==================================================
PERCENT FORMAT
==================================================*/

function formatPercent(value) {

    return Number(value).toFixed(2) + "%";

}
/*==================================================
SIP CALCULATOR
==================================================*/

let sipChart = null;

initializeSIP();

function initializeSIP() {

    const button = document.getElementById("calculateSIP");

    if (!button) return;

    button.addEventListener("click", calculateSIP);

    calculateSIP();

}

function calculateSIP() {

    const monthly =
        Number(document.getElementById("sipAmount").value);

    const years =
        Number(document.getElementById("sipYears").value);

    const annual =
        Number(document.getElementById("sipReturn").value);

    const monthlyRate = annual / 12 / 100;

    const months = years * 12;

    const futureValue =
        monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) /
        monthlyRate) *
        (1 + monthlyRate);

    const investment =
        monthly * months;

    const gain =
        futureValue - investment;

    document.getElementById("totalInvestment").textContent =
        formatCurrency(investment);

    document.getElementById("estimatedReturn").textContent =
        formatCurrency(gain);

    document.getElementById("maturityValue").textContent =
        formatCurrency(futureValue);

    drawSipChart(investment, gain);

}

function drawSipChart(investment, gain) {

    const canvas =
        document.getElementById("sipProjectionChart");

    if (!canvas) return;

    if (sipChart) {

        sipChart.destroy();

    }

    sipChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Investment",

                "Returns"

            ],

            datasets: [

                {

                    data: [

                        investment,

                        gain

                    ],

                    backgroundColor: [

                        "#2563EB",

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

/*==================================================
LUMPSUM CALCULATOR
==================================================*/

let lumpsumChart = null;

initializeLumpsum();

function initializeLumpsum() {

    const button =
        document.getElementById("calculateLumpsum");

    if (!button) return;

    button.addEventListener("click", calculateLumpsum);

    calculateLumpsum();

}

function calculateLumpsum() {

    const amount =
        Number(document.getElementById("lumpAmount").value);

    const years =
        Number(document.getElementById("lumpYears").value);

    const annual =
        Number(document.getElementById("lumpReturn").value);

    const futureValue =
        amount *
        Math.pow(1 + annual / 100, years);

    const gain =
        futureValue - amount;

    document.getElementById("lumpInvestment").textContent =
        formatCurrency(amount);

    document.getElementById("lumpReturnAmount").textContent =
        formatCurrency(gain);

    document.getElementById("lumpFutureValue").textContent =
        formatCurrency(futureValue);

    drawLumpsumChart(amount, gain);

}

function drawLumpsumChart(investment, gain) {

    const canvas =
        document.getElementById("lumpsumChart");

    if (!canvas) return;

    if (lumpsumChart) {

        lumpsumChart.destroy();

    }

    lumpsumChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Investment",

                "Profit"

            ],

            datasets: [

                {

                    data: [

                        investment,

                        gain

                    ],

                    backgroundColor: [

                        "#2563EB",

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
/*==================================================
SWP CALCULATOR
==================================================*/

let swpChart = null;

initializeSWP();

function initializeSWP() {

    const button = document.getElementById("calculateSWP");

    if (!button) return;

    button.addEventListener("click", calculateSWP);

    calculateSWP();

}

function calculateSWP() {

    const corpus =
        Number(document.getElementById("swpCorpus").value);

    const withdrawal =
        Number(document.getElementById("swpWithdrawal").value);

    const years =
        Number(document.getElementById("swpYears").value);

    const rate =
        Number(document.getElementById("swpReturn").value);

    const totalWithdrawal =
        withdrawal * years * 12;

    const balance =
        Math.max(corpus - totalWithdrawal, 0);

    document.getElementById("swpInvestment").textContent =
        formatCurrency(corpus);

    document.getElementById("swpWithdrawTotal").textContent =
        formatCurrency(totalWithdrawal);

    document.getElementById("swpBalance").textContent =
        formatCurrency(balance);

    drawSWPChart(corpus, totalWithdrawal);

}

function drawSWPChart(corpus, withdrawal) {

    const canvas =
        document.getElementById("swpChart");

    if (!canvas) return;

    if (swpChart) {

        swpChart.destroy();

    }

    swpChart = new Chart(canvas, {

        type: "doughnut",

        data: {

            labels: [

                "Corpus",

                "Withdrawal"

            ],

            datasets: [{

                data: [

                    corpus,

                    withdrawal

                ],

                backgroundColor: [

                    "#2563EB",

                    "#10B981"

                ],

                borderWidth:0

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    position:"bottom"

                }

            }

        }

    });

}

/*==================================================
GOAL PLANNER
==================================================*/

let goalChart = null;

initializeGoal();

function initializeGoal(){

    const button =
        document.getElementById("calculateGoal");

    if(!button) return;

    button.addEventListener("click",calculateGoal);

    calculateGoal();

}

function calculateGoal(){

    const target =
        Number(document.getElementById("goalAmount").value);

    const current =
        Number(document.getElementById("currentSavings").value);

    const years =
        Number(document.getElementById("goalYears").value);

    const rate =
        Number(document.getElementById("goalReturn").value);

    const futureCurrent =
        current * Math.pow(1 + rate/100, years);

    const remaining =
        Math.max(target - futureCurrent,0);

    const monthlyRate =
        rate / 12 / 100;

    const months =
        years * 12;

    const sip =
        remaining /
        (((Math.pow(1+monthlyRate,months)-1)/monthlyRate)*(1+monthlyRate));

    document.getElementById("goalTarget").textContent =
        formatCurrency(target);

    document.getElementById("goalMonthly").textContent =
        formatCurrency(sip);

    document.getElementById("goalFinish").textContent =
        new Date().getFullYear() + years;

    drawGoalChart(target,futureCurrent);

}

function drawGoalChart(target,current){

    const canvas =
        document.getElementById("goalChart");

    if(!canvas) return;

    if(goalChart){

        goalChart.destroy();

    }

    goalChart = new Chart(canvas,{

        type:"bar",

        data:{

            labels:[

                "Current",

                "Goal"

            ],

            datasets:[{

                data:[

                    current,

                    target

                ],

                backgroundColor:[

                    "#10B981",

                    "#2563EB"

                ]

            }]

        },

        options:{

            responsive:true,

            plugins:{

                legend:{

                    display:false

                }

            }

        }

    });

}
/*==================================================
RETIREMENT PLANNER
==================================================*/

initializeRetirement();

function initializeRetirement() {

    const button = document.getElementById("calculateRetirement");

    if (!button) return;

    button.addEventListener("click", calculateRetirement);

    calculateRetirement();

}

function calculateRetirement() {

    const age =
        Number(document.getElementById("currentAge").value);

    const retireAge =
        Number(document.getElementById("retirementAge").value);

    const expense =
        Number(document.getElementById("monthlyExpense").value);

    const years = retireAge - age;

    const corpus =
        expense * 12 * 25;

    const sip =
        corpus / (years * 12);

    document.getElementById("retirementCorpus").textContent =
        formatCurrency(corpus);

    document.getElementById("retirementYears").textContent =
        years + " Years";

    document.getElementById("retirementSip").textContent =
        formatCurrency(sip) + " / Month";

}

/*==================================================
CHILD EDUCATION
==================================================*/

initializeEducation();

function initializeEducation() {

    const button =
        document.getElementById("calculateEducation");

    if (!button) return;

    button.addEventListener("click", calculateEducation);

    calculateEducation();

}

function calculateEducation() {

    const amount =
        Number(document.getElementById("educationCost").value);

    const years =
        Number(document.getElementById("educationYears").value);

    const future =
        amount * Math.pow(1.08, years);

    const sip =
        future / (years * 12);

    document.getElementById("futureEducationCost").textContent =
        formatCurrency(future);

    document.getElementById("educationSip").textContent =
        formatCurrency(sip);

}

/*==================================================
FD CALCULATOR
==================================================*/

initializeFD();

function initializeFD() {

    const button =
        document.getElementById("calculateFD");

    if (!button) return;

    button.addEventListener("click", calculateFD);

    calculateFD();

}

function calculateFD() {

    const principal =
        Number(document.getElementById("fdAmount").value);

    const rate =
        Number(document.getElementById("fdRate").value);

    const years =
        Number(document.getElementById("fdYears").value);

    const maturity =
        principal * Math.pow(1 + rate / 100, years);

    document.getElementById("fdResult").textContent =
        formatCurrency(maturity);

}

/*==================================================
RD CALCULATOR
==================================================*/

initializeRD();

function initializeRD() {

    const button =
        document.getElementById("calculateRD");

    if (!button) return;

    button.addEventListener("click", calculateRD);

    calculateRD();

}

function calculateRD() {

    const monthly =
        Number(document.getElementById("rdAmount").value);

    const rate =
        Number(document.getElementById("rdRate").value);

    const years =
        Number(document.getElementById("rdYears").value);

    const months =
        years * 12;

    const maturity =
        monthly *
        months *
        (1 + (rate / 100));

    document.getElementById("rdResult").textContent =
        formatCurrency(maturity);

}

/*==================================================
EMI CALCULATOR
==================================================*/

initializeEMI();

function initializeEMI() {

    const button =
        document.getElementById("calculateEMI");

    if (!button) return;

    button.addEventListener("click", calculateEMI);

    calculateEMI();

}

function calculateEMI() {

    const principal =
        Number(document.getElementById("loanAmount").value);

    const annual =
        Number(document.getElementById("loanRate").value);

    const years =
        Number(document.getElementById("loanYears").value);

    const r =
        annual / 12 / 100;

    const n =
        years * 12;

    const emi =
        (principal * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1);

    document.getElementById("emiResult").textContent =
        formatCurrency(emi);

}
/*==================================================
CAGR CALCULATOR
==================================================*/

initializeCAGR();

function initializeCAGR() {

    const button = document.getElementById("calculateCAGR");

    if (!button) return;

    button.addEventListener("click", calculateCAGR);

    calculateCAGR();

}

function calculateCAGR() {

    const initial =
        Number(document.getElementById("cagrInitial").value);

    const finalValue =
        Number(document.getElementById("cagrFinal").value);

    const years =
        Number(document.getElementById("cagrYears").value);

    if (initial <= 0 || years <= 0) return;

    const cagr =
        (Math.pow(finalValue / initial, 1 / years) - 1) * 100;

    document.getElementById("cagrResult").textContent =
        formatPercent(cagr);

}

/*==================================================
INFLATION CALCULATOR
==================================================*/

initializeInflation();

function initializeInflation() {

    const button =
        document.getElementById("calculateInflation");

    if (!button) return;

    button.addEventListener("click", calculateInflation);

    calculateInflation();

}

function calculateInflation() {

    const amount =
        Number(document.getElementById("inflationAmount").value);

    const rate =
        Number(document.getElementById("inflationRate").value);

    const years =
        Number(document.getElementById("inflationYears").value);

    const future =
        amount * Math.pow(1 + rate / 100, years);

    document.getElementById("inflationResult").textContent =
        formatCurrency(future);

}

/*==================================================
EXPORT REPORT
==================================================*/

const exportButton =
    document.querySelector(".primary-btn");

if (exportButton) {

    exportButton.addEventListener("click", function () {

        alert(
            "PDF Export will be available after Backend Integration."
        );

    });

}

/*==================================================
AI RECOMMENDATION
==================================================*/

function generateRecommendation() {

    const recommendation =
        document.getElementById("aiRecommendation");

    if (!recommendation) return;

    recommendation.innerHTML = `

        <strong>AI Recommendation</strong><br><br>

        ✔ Increase your SIP by 10% every year.<br>

        ✔ Maintain Equity Allocation above 60%.<br>

        ✔ Review Portfolio every 6 months.<br>

        ✔ Continue investing for long-term wealth creation.

    `;

}

generateRecommendation();

/*==================================================
CARD ANIMATION
==================================================*/

const cards =
    document.querySelectorAll(".stat-card,.calculator-card");

cards.forEach((card, index) => {

    card.style.opacity = "0";

    card.style.transform = "translateY(25px)";

    setTimeout(() => {

        card.style.transition = ".45s ease";

        card.style.opacity = "1";

        card.style.transform = "translateY(0px)";

    }, index * 120);

});

/*==================================================
CONSOLE MESSAGE
==================================================*/

console.log(
    "%cInvestment Sarathi Calculator Suite v2.0 Loaded",
    "color:#2563eb;font-size:16px;font-weight:bold;"
);