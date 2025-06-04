import React, { useEffect, useState } from 'react';
import API from '../api';

export default function AddTransaction() {
  const [form, setForm] = useState({
    type: '',
    category: 'expenses',
    amount: '',
    date: '',
    note: '',
    userId: ''
  });

  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    API.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users', err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const transaction = {
      type: form.type,
      category: form.category,
      amount: parseFloat(form.amount),
      date: form.date,
      note: form.note,
      user: { id: parseInt(form.userId) }
    };

    API.post('/transactions', transaction)
      .then(() => {
        setMessage('✅ Transaction added successfully!');
        setForm({ type: '', category: 'expenses', amount: '', date: '', note: '', userId: '' });
      })
      .catch(err => {
        console.error('Failed to add transaction', err);
        setMessage('❌ Failed to add transaction');
      });
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">➕ Add Transaction</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="type" value={form.type} onChange={handleChange} placeholder="Type (e.g. groceries)" className="w-full p-2 border rounded" required />
        <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="expenses">Expenses</option>
          <option value="income">Income</option>
        </select>
        <input name="amount" value={form.amount} onChange={handleChange} placeholder="Amount" type="number" className="w-full p-2 border rounded" required />
        <input name="date" value={form.date} onChange={handleChange} type="date" className="w-full p-2 border rounded" required />
        <input name="note" value={form.note} onChange={handleChange} placeholder="Note (optional)" className="w-full p-2 border rounded" />
        
        <select name="userId" value={form.userId} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.email}</option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Transaction
        </button>
      </form>

      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
}