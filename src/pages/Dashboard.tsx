import React, { FC } from 'react';
import Navbar from '../components/navbar/Navbar';

const Dashboard: FC = () => (
  <>
    <Navbar />
    <h1>Protected Dashboard</h1>
  </>
);

export default Dashboard;
