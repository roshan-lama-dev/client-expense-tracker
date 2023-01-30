import React, { useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { TransForm } from "../components/form/TransForm";

import { Layout } from "../components/layout/Layout";

export const Dashboard = () => {
  return (
    <Layout>
      <TransForm />
      <div className="table">
        <Table></Table>
      </div>
    </Layout>
  );
};
