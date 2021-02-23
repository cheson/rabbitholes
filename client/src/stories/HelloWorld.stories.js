import React from 'react';

import HelloWorld from './HelloWorld';

export default {
    component: HelloWorld,
    title: 'HelloWorld Title',
    argTypes: { onDivClick: { action: 'div_clicked' } }
};

const Template = args => <HelloWorld {...args} />;

export const Default = Template.bind({});
Default.args = {
  words: {
      defaultText: "Default World",
      extra: "Extra Words"
  }
};

export const Special = Template.bind({});
Special.args = {
  words: {
      ...Default.args.words,
      defaultText: "Special World",
      doubleExtra: "doubleExtra"
  }
};

export const Wrong = Template.bind({});
Special.args = {
  words: {
      defaultText: "Special World",
      doubleExtra: "doubleExtra"
  }
};

// export default {
//   component: Task,
//   title: 'Task',
// };

// const Template = args => <Task {...args} />;

// export const Default = Template.bind({});
// Default.args = {
//   task: {
//     id: '1',
//     title: 'Test Task',
//     state: 'TASK_INBOX',
//     updatedAt: new Date(2018, 0, 1, 9, 0),
//   },
// };

// export const Pinned = Template.bind({});
// Pinned.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_PINNED',
//   },
// };

// export const Archived = Template.bind({});
// Archived.args = {
//   task: {
//     ...Default.args.task,
//     state: 'TASK_ARCHIVED',
//   },
// };