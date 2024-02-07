import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import CustomerJobs from "./CustomerJobs";
import CustomerAppliedJobs from "./CustomerAppliedJobs";

export default function CustomerJobTabView() {
  return (
    <>
      <div className="customer-header">
        <h1 className="customer-header-name">SHOP2DOOR</h1>
      </div>
      <Tabs>
        <TabList>
          <Tab key={0}>Jobs</Tab>
          <Tab key={1}>AppliedJobs</Tab>
        </TabList>
        <TabPanel key={0}>
          <CustomerJobs />
        </TabPanel>
        <TabPanel key={1}>
          <CustomerAppliedJobs />
        </TabPanel>
      </Tabs>
    </>
  );
}
