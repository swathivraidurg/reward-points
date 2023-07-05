import React, { useEffect, useState, useMemo } from "react";
import { getTransactions } from "../../apis/Api";
import Config from "../../configs/config.json";
import { getRewardPoints } from "../utils/RetailRewards";
import Pagination from "../../Pagination";
import { FaSortDown } from "react-icons/fa";

let PageSize = 10;

const Transactions = () => {
  const [transactionData, setTransactionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState(false);

  const getTransactionData = async () => {
    try {
      const response = await getTransactions();
      const data = await response.json();
      setTransactionData(data);
    } catch (error) {
      console.log("Could not get transaction data", error);
    }
  };
  useEffect(() => {
    getTransactionData();
  }, []);

  const { transactionId, date, time, customerId, amountUsd, pointsEarned } =
    Config.TransactionList.transactionListTable;

  const handleSort = () => {
    const sortData = transactionData.sort((a, b) =>
      !sort ? (a.transId > b.transId ? -1 : 1) : a.transId < b.transId ? -1 : 1
    );
    setSort(!sort);
    setTransactionData(sortData);
  };
  /* Use Memo */
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    let finalData = transactionData.slice(firstPageIndex, lastPageIndex);
    return finalData;
  }, [currentPage, transactionData, sort]);

  return (
    <div className="table-container">
      <h4>Reward List</h4>
      <table>
        <thead>
          <tr>
            <th>
              {transactionId}
              <FaSortDown onClick={handleSort} style={{ color: "white" }} />
            </th>
            <th>{date}</th>
            <th>{time}</th>
            <th>{customerId}</th>
            <th>{amountUsd}</th>
            <th>{pointsEarned}</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData.length > 0 ? (
            currentTableData.map((transaction) => (
              <tr key={transaction.transId}>
                <td>{transaction.transId}</td>
                <td>{transaction.date}</td>
                <td>{transaction.time}</td>
                <td>{transaction.custId}</td>
                <td>{transaction.amount}</td>
                <td>{getRewardPoints(transaction.amount)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td>Loading Text..</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={transactionData.length}
        pageSize={PageSize}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Transactions;
