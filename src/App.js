import { useEffect, useState } from "react";

function App() {
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  useEffect(() => {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      });
  }, [monthlyIncome]);

  async function getTransactions() {
    const url = process.env.REACT_APP_API_URL + "/transactions";
    const response = await fetch(url);
    return await response.json();
  }

  async function handleMonthlyIncome(e) {
    e.preventDefault();
    // console.log("monthlyIncome", monthlyIncome);
    const url = process.env.REACT_APP_API_URL + "/money-tracker";
    // console.log(url);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ monthlyIncome }),
    });
    const result = await response.json();
    // console.log("result", result);

    // Veritabanına kaydedilen veriyi transactions state'ine ekleyin.
    setTransactions([...transactions, result]);
    // MonthlyIncome state'ini null olarak ayarlayın.
    setMonthlyIncome(null);
  }

  return (
    <div className="mx-32 my-16 text-white">
      <div className="flex items-center justify-center">
        <h1 className="text-7xl font-bold">$ 500</h1>
      </div>
      <div className="mt-12">
        <form onSubmit={handleMonthlyIncome}>
          <div className="flex items-center justify-start text-3xl">
            <h1 className="mr-4">Monthly income : </h1>
            <input
              onChange={(e) => {
                setMonthlyIncome(e.target.value);
              }}
              value={monthlyIncome}
              type="number"
              className=" bg-[#393E46] px-4 py-1 rounded-md outline-none placeholder:text-gray-500"
              placeholder="$ 1250"
            />
            <button
              type="submit"
              className="bg-green-500 px-8 py-2 text-2xl rounded-md ml-4"
            >
              save
            </button>
          </div>
        </form>

        {/* transactions */}

        <div>
          {transactions.map((transaction) => (
            <div>{transaction.monthlyIncome}</div>
          ))}
        </div>

        {/* transactions end*/}
      </div>
    </div>
  );
}

export default App;
