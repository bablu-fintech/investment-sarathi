function calculateSIP() {

    const monthly = parseFloat(document.getElementById("monthly").value);

    const annualRate = parseFloat(document.getElementById("rate").value);

    const years = parseFloat(document.getElementById("years").value);

    if (!monthly || !annualRate || !years) {

        alert("Please enter all values.");

        return;

    }

    const monthlyRate = annualRate / 12 / 100;

    const months = years * 12;

    const maturityValue =
        monthly *
        (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
            (1 + monthlyRate));

    const invested = monthly * months;

    const gain = maturityValue - invested;

    document.getElementById("investment").innerHTML =
        "₹ " + invested.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

    document.getElementById("returns").innerHTML =
        "₹ " + gain.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

    document.getElementById("total").innerHTML =
        "₹ " + maturityValue.toLocaleString("en-IN", {
            maximumFractionDigits: 0
        });

}
// =========================================
// Calculator Tab Switching
// =========================================

const tabs = document.querySelectorAll(".tab-btn");

const sipSection = document.querySelector(".calculator-wrapper");

const lumpSection = document.getElementById("lumpsumCalculator");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        tabs.forEach(btn => btn.classList.remove("active"));

        tab.classList.add("active");

        const type = tab.dataset.tab;

        if (type === "sip") {

            sipSection.style.display = "grid";
            lumpSection.style.display = "none";

        }

        if (type === "lumpsum") {

            sipSection.style.display = "none";
            lumpSection.style.display = "grid";

        }

        if (type === "swp") {

            alert("SWP Calculator Coming Soon");

        }

    });

});