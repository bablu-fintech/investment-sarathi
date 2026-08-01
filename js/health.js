// ==========================================
// Investment Sarathi
// Financial Health Score
// ==========================================

const calculateBtn = document.getElementById("calculateScore");

calculateBtn.addEventListener("click", calculateHealthScore);

function calculateHealthScore() {

    const income = Number(document.getElementById("income").value);

    const expense = Number(document.getElementById("expense").value);

    const emergency = Number(document.getElementById("emergency").value);

    const investment = Number(document.getElementById("investment").value);

    const insurance = Number(document.getElementById("insurance").value);

    const loan = Number(document.getElementById("loan").value);

    let score = 0;

    // ==========================
    // Income vs Expense (20)
    // ==========================

    const savingsRate = ((income - expense) / income) * 100;

    if (savingsRate >= 40) {

        score += 20;

    } else if (savingsRate >= 25) {

        score += 15;

    } else if (savingsRate >= 10) {

        score += 10;

    } else {

        score += 5;

    }

    // ==========================
    // Emergency Fund (20)
    // ==========================

    if (emergency >= expense * 6) {

        score += 20;

    } else if (emergency >= expense * 3) {

        score += 15;

    } else {

        score += 8;

    }

    // ==========================
    // Investment (20)
    // ==========================

    if (investment >= income * 24) {

        score += 20;

    } else if (investment >= income * 12) {

        score += 15;

    } else {

        score += 8;

    }

    // ==========================
    // Insurance (15)
    // ==========================

    if (insurance >= income * 120) {

        score += 15;

    } else if (insurance >= income * 60) {

        score += 10;

    } else {

        score += 5;

    }

    // ==========================
    // Loan (15)
    // ==========================

    if (loan <= income * 6) {

        score += 15;

    } else if (loan <= income * 12) {

        score += 10;

    } else {

        score += 5;

    }

    // ==========================
    // Goal Progress (10)
    // ==========================

    score += 10;

    updateUI(score);

}

// ==========================================

function updateUI(score) {

    const scoreText = document.getElementById("score");

    const status = document.getElementById("status");

    const advice = document.getElementById("advice");

    scoreText.innerText = score + "/100";

    if (score >= 90) {

        status.innerText = "🟢 Excellent";

        status.className = "excellent";

        advice.innerHTML = `
        ✔ Excellent Financial Health<br><br>
        ✔ Continue your SIP investments.<br>
        ✔ Increase Equity Allocation gradually.<br>
        ✔ Review your portfolio annually.
        `;

    }

    else if (score >= 75) {

        status.innerText = "🔵 Good";

        status.className = "good";

        advice.innerHTML = `
        ✔ Good Financial Health<br><br>
        ✔ Increase Emergency Fund.<br>
        ✔ Increase SIP by 10%.<br>
        ✔ Review Insurance Cover.
        `;

    }

    else if (score >= 60) {

        status.innerText = "🟠 Average";

        status.className = "average";

        advice.innerHTML = `
        ✔ Average Financial Health<br><br>
        ✔ Reduce unnecessary expenses.<br>
        ✔ Build Emergency Fund.<br>
        ✔ Increase Investments.
        `;

    }

    else {

        status.innerText = "🔴 Poor";

        status.className = "poor";

        advice.innerHTML = `
        ✔ Poor Financial Health<br><br>
        ✔ Avoid taking new loans.<br>
        ✔ Start Emergency Fund immediately.<br>
        ✔ Buy Health Insurance.<br>
        ✔ Start SIP from ₹1000/month.
        `;

    }

}

// Auto Calculate on Page Load

calculateHealthScore();