/*==================================================
    Investment Sarathi Dashboard
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    console.log("Dashboard Loaded");

/*==================================================
    Portfolio Growth Chart
==================================================*/

const portfolioCanvas = document.getElementById("portfolioChart");

if (portfolioCanvas) {

    new Chart(portfolioCanvas, {

        type: "line",

        data: {

            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"],

            datasets: [{

                label: "Portfolio Value",

                data: [350000,420000,500000,610000,740000,860000,1010000,1245650],

                borderColor: "#2563EB",

                backgroundColor: "rgba(37,99,235,.15)",

                borderWidth: 3,

                fill: true,

                tension: .4,

                pointRadius: 5,

                pointHoverRadius: 7

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

                    beginAtZero: false,

                    grid: {

                        color: "#EEF2F7"

                    }

                },

                x: {

                    grid: {

                        display: false

                    }

                }

            }

        }

    });

}

/*==================================================
    Asset Allocation Chart
==================================================*/

const allocationCanvas = document.getElementById("allocationChart");

if (allocationCanvas) {

    new Chart(allocationCanvas, {

        type: "doughnut",

        data: {

            labels: [

                "Mutual Funds",

                "Stocks",

                "Gold",

                "Cash"

            ],

            datasets: [{

                data: [

                    55,

                    20,

                    15,

                    10

                ],

                backgroundColor: [

                    "#2563EB",

                    "#10B981",

                    "#F59E0B",

                    "#8B5CF6"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            cutout: "65%",

            plugins: {

                legend: {

                    position: "bottom"

                }

            }

        }

    });

}

/*==================================================
    Counter Animation
==================================================*/

document.querySelectorAll(".summary-card h2").forEach(card => {

    const text = card.innerText;

    const number = parseInt(text.replace(/[^\d]/g,""));

    if (isNaN(number)) return;

    let count = 0;

    const step = Math.ceil(number / 80);

    const timer = setInterval(() => {

        count += step;

        if(count >= number){

            count = number;

            clearInterval(timer);
        }

        if(text.includes("₹")){

            card.innerText =
            "₹" + count.toLocaleString("en-IN");

        }

        else{

            card.innerText = count;

        }

    },20);

});

/*==================================================
    Notification Button
==================================================*/

const notify = document.querySelector(".notification");

if(notify){

setInterval(()=>{

notify.classList.toggle("pulse");

},1000);

}

/*==================================================
    Card Hover Effect
==================================================*/

document.querySelectorAll(".summary-card").forEach(card=>{

card.addEventListener("mouseenter",()=>{

card.style.transform="translateY(-10px)";

});

card.addEventListener("mouseleave",()=>{

card.style.transform="translateY(0)";

});

});

/*==================================================
    AI Recommendation
==================================================*/

const aiBox=document.querySelector(".ai-box");

if(aiBox){

setInterval(()=>{

aiBox.style.opacity=".85";

setTimeout(()=>{

aiBox.style.opacity="1";

},500);

},5000);

}

/*==================================================
    Greeting
==================================================*/

const hour=new Date().getHours();

const title=document.querySelector(".welcome h1");

if(title){

if(hour<12){

title.innerHTML="Good Morning, Bablu ☀️";

}

else if(hour<17){

title.innerHTML="Good Afternoon, Bablu 🌤️";

}

else{

title.innerHTML="Good Evening, Bablu 🌙";

}

}

});