// =========================================
// Investment Sarathi - SIP Calculator
// =========================================

let chart;

// Indian Currency Format
function formatCurrency(value) {

    return "₹" + Math.round(value).toLocaleString("en-IN");

}

// SIP Calculation
function calculateSIP() {

    const sip = Number(document.getElementById("sipAmount").value);

    const years = Number(document.getElementById("years").value);

    const annualRate = Number(document.getElementById("returnRate").value);

    const stepUp = Number(document.getElementById("stepUp").value);

    let invested = 0;

    let futureValue = 0;

    let monthlySIP = sip;

    const monthlyRate = annualRate / 12 / 100;

    // Year-wise Step Up Calculation
    for (let y = 1; y <= years; y++) {

        for (let m = 1; m <= 12; m++) {

            const remainingMonths = (years - y) * 12 + (12 - m + 1);

            futureValue += monthlySIP * Math.pow(1 + monthlyRate, remainingMonths);

            invested += monthlySIP;

        }

        monthlySIP = monthlySIP * (1 + stepUp / 100);

    }

    const returns = futureValue - invested;

    // Display
    document.getElementById("invested").innerText =
        formatCurrency(invested);

    document.getElementById("returns").innerText =
        formatCurrency(returns);

    document.getElementById("futureValue").innerText =
        formatCurrency(futureValue);

    // Chart
    createChart(invested, returns);

}

// Doughnut Chart
function createChart(invested, returns) {

    const ctx = document.getElementById("sipChart");

    if (chart) {

        chart.destroy();

    }

    chart = new Chart(ctx, {

        type: "doughnut",

        data: {

            labels: [

                "Invested Amount",

                "Estimated Returns"

            ],

            datasets: [

                {

                    data: [

                        invested,

                        returns

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

// Button Click
document
.getElementById("calculateBtn")
.addEventListener("click", calculateSIP);

// Auto Calculate on Input Change
[
"sipAmount",
"years",
"returnRate",
"stepUp"

].forEach(id => {

    document
    .getElementById(id)
    .addEventListener("input", calculateSIP);

});

// Initial Load
calculateSIP();