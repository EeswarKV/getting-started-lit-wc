```js script
import { html } from '@open-wc/demoing-storybook';
import '../get-start-lit.js';

export default {
  title: 'GetStartLit',
  component: 'get-start-lit',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# GetStartLit

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add get-start-lit
```

```js
import 'get-start-lit/get-start-lit.js';
```

```js preview-story
export const Simple = () => html`
  <get-start-lit></get-start-lit>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <get-start-lit title="Hello World"></get-start-lit>
`;
```
