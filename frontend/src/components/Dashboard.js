import React, { useState, useEffect } from 'react';
import { Typography, Button, Container, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Divider, Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Dashboard.css';

const Dashboard = ({ user, setUser }) => {
  const [users, setUsers] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user.isAdmin) {
      fetchUsers();
    }
  }, [user.isAdmin]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      setUsers(res.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch users.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      if (user.isAdmin) {
        fetchUsers();
      } else {
        handleLogout();
      }
      toast.success('User deleted successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete user.');
    }
  };

  const handleUpdate = async () => {
    try {
      const id = selectedUser ? selectedUser._id : user.id;
      await axios.put(`http://localhost:5000/api/users/${id}`, 
        { username: newUsername, password: newPassword },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      );
      if (user.isAdmin) {
        fetchUsers();
      } else {
        setUser({ ...user, username: newUsername });
      }
      setOpenDialog(false);
      setNewUsername('');
      setNewPassword('');
      toast.success('Account updated successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Update failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container className="dashboard-box">
      <Typography variant="h4" className="dashboard-title">Dashboard</Typography>
      {user.isAdmin ? (
        <div>
          <Typography variant="h5" className="dashboard-subtitle">Users List</Typography>
          <Grid container spacing={3}>
            {users.map((u) => (
              <Grid item xs={12} sm={6} md={4} key={u._id}>
                <Paper className="user-card">
                  <Avatar className="user-avatar">{u.username.charAt(0)}</Avatar>
                  <Typography variant="h6">{u.username}</Typography>
                  <Divider className="user-divider" />
                  <Button onClick={() => { setSelectedUser(u); setOpenDialog(true); }} color="primary" className="user-button">Update</Button>
                  <Button onClick={() => handleDelete(u._id)} color="secondary" className="user-button">Delete</Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </div>
      ) : (
        <div className="user-info">
          <Typography variant="h5">Welcome, {user.username}</Typography>
          <Button onClick={() => { setSelectedUser(null); setOpenDialog(true); }} color="primary" className="dashboard-button">Update Account</Button>
          <Button onClick={() => handleDelete(user.id)} color="secondary" className="dashboard-button">Delete Account</Button>
        </div>
      )}
      <Button onClick={handleLogout} color="default" className="dashboard-logout-button">Logout</Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} className="dialog">
        <DialogTitle className="dialog-title">{selectedUser ? `Update ${selectedUser.username}` : 'Update Your Account'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Username"
            type="text"
            fullWidth
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="dialog-input"
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="dialog-input"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" className="dialog-button">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary" className="dialog-button">
            Update
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Dashboard;
