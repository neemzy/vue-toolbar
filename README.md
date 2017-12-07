# vue-toolbar

Development cumbersomeness reducer for Vue.js

## Purpose

This component aims at providing a foundation for quickly setting up a development toolbar in any Vue.js-based project, in order to help with automating repetitive tasks (like filling the same big form over and over again).

You can configure your task runner to exclude this component from your production build; however, by default, it will not render anything unless `process.env.NODE_ENV === 'development'` (or if no button is configured, *cf. infra*).

## Usage

### Setup

- Create your own toolbar and its methods:

```html
<template>
  <Toolbar
    :buttons="{
      'Alert!': alertMethod,
      'Log to console!': logMethod
    }"
  />
</template>

<script>
import { Toolbar } from "vue-toolbar";

export default {
  methods: {
    alertMethod() {
      alert("This works!");
    },
    logMethod() {
      console.log("So does that!");
    }
  },
  components: { Toolbar }
};
</script>
```

- Make use of it *in your root component*:

```html
<template>
  <div>
    <MyToolbar />
    <!-- ... -->
  </div>
</template>

<script>
import MyToolbar from "./path/to/MyToolbar";

export default {
  components: { MyToolbar }
};
</script>
```

### Accessing inner components

Your toolbar will not be very useful until you start setting state and calling methods on your components. Let's see how!

#### Setting state

##### Vuex store

This is the simplest use-case, as **Vuex** makes its store available in every component:

```js
methods: {
  setValueInStore() {
    this.$store.dispatch("someAction");
  }
}
```

However, your application state probably does not encapsulate everything you want to access.

##### Component state

If you need to reach an inner component's own `data`, you will have to define [refs](https://vuejs.org/v2/guide/components.html#Child-Component-Refs) all the way down to it from your root component, but it is the only required change in your codebase. On top of that, this package also provides a mixin to help describing your path in the ref tree:

```js
import { Toolbar, refTreeMixin } from "vue-toolbar";

export default {
  mixins: [refTreeMixin],
  methods: {
    setValueInInnerComponent() {
      // Refs are resolved from the root component
      this.getNodeByRefTree(["someRef", "someOtherRef"]).foo = "bar";
    }
  },
  components: { Toolbar }
};
```

#### Calling methods

Calling a method also requires making use of refs:

```js
import { Toolbar, refTreeMixin } from "vue-toolbar";

export default {
  mixins: [refTreeMixin],
  methods: {
    callMethodInInnerComponent() {
      this.getNodeByRefTree(["someRef", "someOtherRef"]).someMethod();
    }
  },
  components: { Toolbar }
};
```
