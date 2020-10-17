import React from "react";
import { Tabs } from "antd";
import styled from "styled-components";

const CustomTabs = ({ size, tabNames, centered, onTabChange }) => {
  return tabNames.length > 0 ? (
    <StyledCustomTabs centered={centered}>
      <Tabs size={size} onChange={(value) => onTabChange(value)}>
        {tabNames.map((tab, index) => (
          <Tabs.TabPane tab={tab} key={index} />
        ))}
      </Tabs>
    </StyledCustomTabs>
  ) : null;
};

const StyledCustomTabs = styled.div`
  .ant-tabs-nav-wrap {
    display: flex;
    justify-content: ${(props) => (props.centered ? "center" : "flex-start")};
  }

  @media only screen and (min-width: 320px) and (max-width: 991px) {
    .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
      margin: 0px 8px;
    }
    .ant-tabs-tab-btn {
      font-size: 14px;
    }
  }
  @media only screen and (min-width: 991px) {
    .ant-tabs-large > .ant-tabs-nav .ant-tabs-tab {
      margin: 0px 50px;
    }
  }
`;

export default CustomTabs;
