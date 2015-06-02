import InheritanceOverrides from './InheritanceOverrides';

import React, { Component } from 'react';

import js from '!!raw!./InheritanceOverrides.js';
import css from '!!raw!./InheritanceOverrides.css';
import Snippet from 'shared/Snippet/Snippet';

export default class InheritanceOverridesDemo extends Component {

  render() {
    return (
      <div>
        <br />
        <InheritanceOverrides />
        <br />
        <Snippet js={js} css={css} />
      </div>
    );
  }

};