import React from "react";
import { Doughnut } from "react-chartjs-2";
import PropTypes from "prop-types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const COLORS = ["#59E5A9", "#14213D", "#FCA311", "#EC0B43", "#000000"];

const CategoryChart = ({ expenses }) => {
  const totals = expenses.reduce((acc, { category, amount }) => {
    const name = category.name;
    acc[name] = (acc[name] || 0) + parseFloat(amount);
    return acc;
  }, {});

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: labels.map((_, idx) => COLORS[idx % COLORS.length]),
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed} €`,
        },
      },
    },
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-[#14213D] mb-4">
        Expenses by Category
      </h2>

      <div className="w-72 h-72 relative">
        <Doughnut
          data={chartData}
          options={options}
          width={280}
          height={280}
          redraw={true}
        />
      </div>
    </div>
  );
};

CategoryChart.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape({ name: PropTypes.string.isRequired }),
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
};

export default CategoryChart;
