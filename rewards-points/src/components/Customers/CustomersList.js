import React, { useEffect, useState } from "react";
import { getCustomers, getCustomerTransactions } from "../../apis/Api";
import InputForm from "../InputField/InputForm";
import { getMonthString, getRewardPoints } from "../utils/RetailRewards";
import Config from "../../configs/config.json";

const CustomerList = () => {
  const [customersData, setCustomersData] = useState([]);
  const [pointsByCustomer, setPointsByCustomer] = useState([]);
  const [monthToFilter, setMonthToFilter] = useState("");

  /**
   * get the customerData from customers API
   */
  const getCustomerList = async () => {
    const response = await getCustomers();
    const data = await response.json();
    setCustomersData(data);
  };

  useEffect(() => {
    getCustomerList();
  }, []);

  /**
   * @param {object} customersData
   * gets and sets the customer with total points and pointsByMonth
   */
  const getCustomerByMonth = (customersData) => {
    const custResult = Promise.all(
      customersData.map(async (customer) => {
        return await getCustomerTransactions(customer.custId)
          .then((response) => response.json())
          .then((data) => {
            const totalPoints = data.reduce((acc, curr) => {
              acc = acc + getRewardPoints(curr.amount);
              return acc;
            }, 0);
            const pointsByMonth = data.reduce((acc, curr) => {
              let month = getMonthString(curr["date"].split("-")[0]);
              if (acc[month]) {
                //add curr to monthly total
                acc[month] = acc[month] + getRewardPoints(curr.amount);
              } else {
                //create a new month property to store monthly points earned
                acc[month] = getRewardPoints(curr.amount);
              }
              return acc;
            }, {});
            return {
              custId: customer.custId,
              totalPoints: totalPoints,
              pointsByMonth: pointsByMonth,
            };
          })
          .catch((err) => console.log("customersData error: ", err));
      })
    );
    custResult.then((data) => setPointsByCustomer(data));
  };
  /**
   * @param {e} - event handler
   * @param {text} - input from child component
   * sets the month to filter
   */
  const handleInputSubmit = (e, monthValue, setMonthValue) => {
    e.preventDefault();
    if (monthValue) {
      setMonthToFilter(monthValue[0].toUpperCase() + monthValue.slice(1));
    }
    setMonthValue("");
  };

  useEffect(() => {
    getCustomerByMonth(customersData);
  }, [customersData]);
  const { customerId, monthlyPoints, totalPoints } =
    Config.CustomerByMonth.customerByMonthTable;
  return (
    <div>
      <InputForm handleInputSubmit={handleInputSubmit} />
      <table>
        <thead>
          <tr>
            <th>{customerId}</th>
            <th>{monthlyPoints}</th>
            <th>{totalPoints}</th>
          </tr>
        </thead>
        <tbody>
          {pointsByCustomer.length > 0 ? (
            pointsByCustomer.map((customer) => (
              <tr key={customer.custId}>
                <td>{customer.custId}</td>
                <td>{customer.pointsByMonth[monthToFilter] || 0}</td>
                <td>{customer.totalPoints}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>{Config.LoadingText}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;
