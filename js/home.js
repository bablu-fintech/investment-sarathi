console.log("Investment Sarathi Home Loaded");

const ctx = document.getElementById("portfolioChart");

if (ctx) {

    new Chart(ctx, {

        type: "line",

        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun"],

            datasets: [{
                label: "Portfolio",
                data: [4,5,5.5,6.2,7.1,8],
                borderColor: "#2563EB",
                backgroundColor: "rgba(37,99,235,.15)",
                fill: true,
                tension: 0.4
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                }
            },

            scales: {
                y: {
                    display: false
                },
                x: {
                    display: false
                }
            }
        }

    });

}

// ===============================
// Interactive Feature Showcase
// ===============================

const tabs = document.querySelectorAll(".showcase-item");
const previews = document.querySelectorAll(".preview");

tabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Active menu remove
        tabs.forEach(item => item.classList.remove("active"));

        // Active preview remove
        previews.forEach(preview => preview.classList.remove("active"));

        // Active menu add
        tab.classList.add("active");

        // Show preview
        const target = tab.dataset.tab;

        document.getElementById(target).classList.add("active");

    });

});
