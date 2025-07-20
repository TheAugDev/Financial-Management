const calculatePayoff = (debts, strategy, extraPayment = 0, snowflakePayments = [], targetDebt = 'strategy') => {
    if (!debts || debts.length === 0) return { history: [], months: 0, totalInterest: 0, amortization: [], debtPayoffDates: {} };
    let currentDebts = JSON.parse(JSON.stringify(debts)).map(d => ({...d, id: d['Debt Name'], interestPaid: 0, amortization: [] }));
    let history = [];
    let month = 0;
    let totalInterestPaid = 0;
    let debtPayoffDates = {};
    const initialHistoryEntry = { month: 0, totalBalance: currentDebts.reduce((sum, d) => sum + d.Balance, 0) };
    currentDebts.forEach(debt => { initialHistoryEntry[debt.id] = debt.Balance; });
    history.push(initialHistoryEntry);
    while (currentDebts.some(d => d.Balance > 0)) {
        month++;
        let monthlyPaymentPool = currentDebts.reduce((sum, d) => sum + d['minimum payment'], 0) + extraPayment;
        const snowflake = snowflakePayments.find(s => s.month === month);
        if (snowflake) { monthlyPaymentPool += snowflake.amount; }
        currentDebts.forEach(debt => {
            if (debt.Balance > 0) {
                const monthlyInterest = (debt.Balance * (debt.APR / 100)) / 12;
                debt.Balance += monthlyInterest;
                totalInterestPaid += monthlyInterest;
                debt.interestPaid += monthlyInterest;
            }
        });
        for(const debt of currentDebts) {
            if (debt.Balance > 0) {
                const minPayment = Math.min(debt.Balance, debt['minimum payment']);
                debt.Balance -= minPayment;
                monthlyPaymentPool -= minPayment;
                debt.amortization.push({ month, payment: minPayment, interest: (debt.Balance * (debt.APR / 100)) / 12, principal: minPayment - ((debt.Balance * (debt.APR / 100)) / 12), balance: debt.Balance });
            }
        }
        let basePaymentOrder = strategy === 'avalanche' 
            ? [...currentDebts].sort((a, b) => b.APR - a.APR || a.Balance - b.Balance) 
            : [...currentDebts].sort((a, b) => a.Balance - b.Balance || b.APR - a.APR);
        let extraPaymentOrder;
        if (targetDebt !== 'strategy' && currentDebts.find(d => d.id === targetDebt && d.Balance > 0)) {
            extraPaymentOrder = [ currentDebts.find(d => d.id === targetDebt), ...basePaymentOrder.filter(d => d.id !== targetDebt) ].filter(Boolean);
        } else {
            extraPaymentOrder = basePaymentOrder;
        }
        for (const debt of extraPaymentOrder) {
            if (monthlyPaymentPool <= 0) break;
            if (debt.Balance > 0) {
                const extraPaid = Math.min(monthlyPaymentPool, debt.Balance);
                debt.Balance -= extraPaid;
                monthlyPaymentPool -= extraPaid;
                const lastAmort = debt.amortization.find(a => a.month === month);
                if (lastAmort) {
                    lastAmort.payment += extraPaid;
                    lastAmort.principal += extraPaid;
                    lastAmort.balance = debt.Balance;
                } else {
                     debt.amortization.push({ month, payment: extraPaid, interest: 0, principal: extraPaid, balance: debt.Balance });
                }
            }
        }
        currentDebts.forEach(debt => {
            if (debt.Balance <= 0 && !debtPayoffDates[debt.id]) {
                debtPayoffDates[debt.id] = month;
            }
        });
        const historyEntry = { month, totalBalance: currentDebts.reduce((sum, d) => sum + d.Balance, 0) };
        currentDebts.forEach(debt => { historyEntry[debt.id] = debt.Balance > 0 ? debt.Balance : 0; });
        history.push(historyEntry);
        if (month > 1200) break;
    }
    return { history, months: month, totalInterest: totalInterestPaid, amortization: currentDebts, debtPayoffDates };
};
export default calculatePayoff;
