import React, { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom'; // make sure this is at the top

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [loading, setLoading] = useState(true);
const total = transactions.reduce((sum, tx) => sum + tx.amount, 0);

  // Fetch all users once
  useEffect(() => {
    API.get('/user/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to load users', err));
  }, []);

  // Fetch transactions when selectedUserId changes
  useEffect(() => {
    setLoading(true);
    API.get(`/transactions/user/${selectedUserId}`)
      .then(res => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch transactions', err);
        setLoading(false);
      });
  }, [selectedUserId]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Budget Tracker</h1>
  <Link
    to="/add"
    className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
  >
    <span>➕</span> <span className="hidden sm:inline">Add Transaction</span>
  </Link>
      <div className="mb-4">
        <label htmlFor="userSelect" className="mr-2 font-medium">Select User:</label>
        <select
          id="userSelect"
          className="border px-3 py-1 rounded"
          value={selectedUserId}
          onChange={e => setSelectedUserId(e.target.value)}
        >
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading transactions...</p>
      ) : transactions.length === 0 ? (
        <p>No transactions found for this user.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left border">Date</th>
                <th className="px-4 py-2 text-left border">Type</th>
                <th className="px-4 py-2 text-left border">Category</th>
                <th className="px-4 py-2 text-right border">Amount</th>
                <th className="px-4 py-2 text-left border">note</th>
                <th className="px-4 py-2 text-left border">User</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(tx => (
                <tr key={tx.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{tx.date}</td>
                  <td className="px-4 py-2">{tx.type}</td>
                  <td className="px-4 py-2 text-red-600 font-semibold">{tx.category}</td>
                  <td className="px-4 py-2 text-right">€{tx.amount.toFixed(2)}</td>
                  <td className="px-4 py-2">{tx.note || '-'}</td>
                  <td className="px-4 py-2">{tx.user?.email || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
