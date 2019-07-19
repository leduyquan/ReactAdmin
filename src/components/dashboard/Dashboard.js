import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

const Dashboard = () => (
  <Card>
    <CardHeader title="Welcome to the administration" />
    <CardContent>The Administration will be able to show, add, edit, and delete information about User, Place, Object and Language</CardContent>
  </Card>
);

export default Dashboard;