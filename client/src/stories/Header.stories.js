import React from "react";

import { Header } from "./Header";

let exportObj = {
  title: "Example/Header",
  component: Header,
};

export default exportObj;

const Template = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};
