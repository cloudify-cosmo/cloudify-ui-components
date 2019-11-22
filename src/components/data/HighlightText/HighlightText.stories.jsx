import React from 'react';

import liveEditDecorator from '../../../../.storybook/decorators/liveEditDecorator';
import HighlightText from './HighlightText';

export default {
    title: 'Data/HighlightText',
    component: HighlightText,
    decorators: liveEditDecorator()
};
export const basic = () => (
    <HighlightText>
        {`{
    "employee": {
        "name":       "sonoo",
        "salary":      56000,
        "married":    true
    }
}`}
    </HighlightText>
);
basic.story = {
    name: 'Default'
};
export const bash = () => (
    <HighlightText language="bash">
        {`#!/bin/bash
# declare STRING variable
STRING="Hello World"
#print variable on a screen
echo $STRING`}
    </HighlightText>
);
export const javaScript = () => (
    <HighlightText language="javascript">
        {`function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);`}
    </HighlightText>
);
export const JSON = () => (
    <HighlightText language="json">
        {`{
    "employee": {
        "name":       "sonoo",
        "salary":      56000,
        "married":    true
    }
}`}
    </HighlightText>
);
export const python = () => (
    <HighlightText language="python">
        {`import whois

data = raw_input("Enter a domain: ")
w = whois.whois(data)

print w`}
    </HighlightText>
);
export const YAML = () => (
    <HighlightText language="yaml">
        {`tosca_definitions_version: cloudify_dsl_1_3

description: >
  This blueprint installs a simple web server on the manager VM using Cloudify's script plugin.

imports:
  - http://www.getcloudify.org/spec/cloudify/4.5.5.dev1/types.yaml

inputs:
  server_ip:
    description: >
      The ip of the server the application will be deployed on.
  agent_user:
    description: >
      User name used when SSH-ing into the started machine.
  agent_private_key_path:
    description: >
      Path to a private key that resides on the management machine.
      SSH-ing into agent machines will be done with this key.`}
    </HighlightText>
);
