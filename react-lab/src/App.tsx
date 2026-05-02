import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import UserProfile from './components/UserProfile';
import type { User, UserFormData } from './types';
import './App.css';

const emptyForm: UserFormData = {
  fullname: '',
  age: 0,
  education: '',
  gender: '',
  skills: [],
  bio: '',
};

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState<UserFormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleSubmit = () => {
    if (editingId) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editingId ? { ...formData, id: editingId } : u))
      );
      if (selectedUser?.id === editingId) {
        setSelectedUser({ ...formData, id: editingId });
      }
    } else {
      const newUser: User = { ...formData, id: crypto.randomUUID() };
      setUsers((prev) => [...prev, newUser]);
    }
    handleClear();
  };

  const handleClear = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
  };

  const handleEdit = (user: User) => {
    setFormData({
      fullname: user.fullname,
      age: user.age,
      education: user.education,
      gender: user.gender,
      skills: user.skills,
      bio: user.bio,
    });
    setEditingId(user.id);
  };

  const handleDelete = (id: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (selectedUser?.id === id) setSelectedUser(null);
    if (editingId === id) handleClear();
  };

  return (
    <div className="app">
      <h1>React CRUD - Users</h1>
      <div className="layout">
        <UserForm
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onClear={handleClear}
          editingId={editingId}
        />
        <div className="right-column">
          <UserList
            users={users}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <UserProfile user={selectedUser} />
        </div>
      </div>
    </div>
  );
};

export default App;
