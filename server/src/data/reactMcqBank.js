const reactMcqBank = [
  {
    "id": "re-01",
    "text": "What is the primary purpose of the Virtual DOM in React?",
    "options": ["To create a direct copy of the browser DOM", "To improve performance by minimizing direct DOM manipulation", "To store data in a database", "To provide a 3D interface for components"],
    "answer": "To improve performance by minimizing direct DOM manipulation",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["performance", "core"]
  },
  {
    "id": "re-02",
    "text": "Which hook is used to manage local state in a functional component?",
    "options": ["useEffect", "useContext", "useState", "useReducer"],
    "answer": "useState",
    "topic": "Hooks",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["state", "hooks"]
  },
  {
    "id": "re-03",
    "text": "How do you pass a value from a parent component to a child component?",
    "options": ["Using State", "Using Props", "Using Refs", "Using Redux"],
    "answer": "Using Props",
    "topic": "Props",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["data-flow"]
  },
  {
    "id": "re-04",
    "text": "What happens when a component's state changes?",
    "options": ["The page reloads", "The component re-renders", "The component is deleted", "Nothing happens"],
    "answer": "The component re-renders",
    "topic": "Hooks",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["state", "rendering"]
  },
  {
    "id": "re-05",
    "text": "Which hook is used to perform side effects like data fetching?",
    "options": ["useMemo", "useCallback", "useEffect", "useLayoutEffect"],
    "answer": "useEffect",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["side-effects", "hooks"]
  },
  {
    "id": "re-06",
    "text": "What is the correct syntax for the useState hook?",
    "options": ["const [state, setState] = useState(initialValue)", "const state = useState(initialValue)", "const {state, setState} = useState()", "const [setState, state] = useState(0)"],
    "answer": "const [state, setState] = useState(initialValue)",
    "topic": "Hooks",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["syntax"]
  },
  {
    "id": "re-07",
    "text": "What are 'Keys' in React used for?",
    "options": ["To identify which items have changed, been added, or removed in a list", "To encrypt data", "To style components uniquely", "To navigate between pages"],
    "answer": "To identify which items have changed, been added, or removed in a list",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["lists", "performance"]
  },
  {
    "id": "re-08",
    "text": "In functional components, which hook replaces the 'componentDidMount' lifecycle method?",
    "options": ["useEffect(() => {}, [])", "useEffect(() => {})", "useState()", "useMemo()"],
    "answer": "useEffect(() => {}, [])",
    "topic": "Lifecycle",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["lifecycle", "hooks"]
  },
  {
    "id": "re-09",
    "text": "What is 'JSX'?",
    "options": ["A CSS framework", "A syntax extension for JavaScript that looks like HTML", "A database for React", "A package manager"],
    "answer": "A syntax extension for JavaScript that looks like HTML",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["syntax"]
  },
  {
    "id": "re-10",
    "text": "Can 'props' be modified inside a child component?",
    "options": ["Yes, they are mutable", "No, they are read-only", "Only if they are numbers", "Only using the setProps function"],
    "answer": "No, they are read-only",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["data-flow"]
  },
  {
    "id": "re-11",
    "text": "What is the use of 'useContext' hook?",
    "options": ["To create a new context", "To consume a context value", "To delete a context", "To style a context"],
    "answer": "To consume a context value",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["context"]
  },
  {
    "id": "re-12",
    "text": "Which method is used to render a React application in the DOM (React 18+)?",
    "options": ["ReactDOM.render()", "createRoot().render()", "React.render()", "DOM.render()"],
    "answer": "createRoot().render()",
    "topic": "Virtual DOM",
    "difficulty": "Hard",
    "marks": 2,
    "tags": ["react-18"]
  },
  {
    "id": "re-13",
    "text": "What is a 'Pure Component' in React?",
    "options": ["A component that doesn't use state", "A component that only renders if its props or state change", "A component that doesn't have a render method", "A component with no CSS"],
    "answer": "A component that only renders if its props or state change",
    "topic": "Lifecycle",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["optimization"]
  },
  {
    "id": "re-14",
    "text": "Which hook is best used for complex state logic that involves multiple sub-values?",
    "options": ["useState", "useReducer", "useRef", "useMemo"],
    "answer": "useReducer",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["state-management"]
  },
  {
    "id": "re-15",
    "text": "What is the purpose of 'useRef'?",
    "options": ["To store a mutable value that does not trigger a re-render", "To create a reference to a DOM element", "Both A and B", "None of the above"],
    "answer": "Both A and B",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["refs"]
  },
  {
    "id": "re-16",
    "text": "How do you conditionally render a component in React?",
    "options": ["Using if-else statements", "Using ternary operators", "Using logical && operator", "All of the above"],
    "answer": "All of the above",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["logic"]
  },
  {
    "id": "re-17",
    "text": "What is 'lifting state up'?",
    "options": ["Deleting state from a component", "Moving state to the closest common ancestor of components that need it", "Moving state to a child component", "Using Redux"],
    "answer": "Moving state to the closest common ancestor of components that need it",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["data-flow"]
  },
  {
    "id": "re-18",
    "text": "Which hook can be used to optimize performance by memoizing expensive calculations?",
    "options": ["useEffect", "useMemo", "useCallback", "useRef"],
    "answer": "useMemo",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["performance", "optimization"]
  },
  {
    "id": "re-19",
    "text": "What is the default behavior of useEffect without a dependency array?",
    "options": ["It runs only once", "It runs on every render", "It never runs", "It runs only on unmount"],
    "answer": "It runs on every render",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["hooks"]
  },
  {
    "id": "re-20",
    "text": "What is a 'Fragment' in React?",
    "options": ["A way to group a list of children without adding extra nodes to the DOM", "A broken component", "A small piece of state", "A specific type of hook"],
    "answer": "A way to group a list of children without adding extra nodes to the DOM",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["dom-structure"]
  },
  {
    "id": "re-21",
    "text": "Which prop is used to uniquely identify elements in a list?",
    "options": ["id", "key", "index", "ref"],
    "answer": "key",
    "topic": "Props",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["lists"]
  },
  {
    "id": "re-22",
    "text": "What does 'Composition' mean in React?",
    "options": ["Writing CSS in JS", "Using components to build other components", "Compiling React code", "Managing state"],
    "answer": "Using components to build other components",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["architecture"]
  },
  {
    "id": "re-23",
    "text": "What is the purpose of 'useCallback' hook?",
    "options": ["To memoize a value", "To memoize a function definition", "To call an API", "To update the state"],
    "answer": "To memoize a function definition",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["performance"]
  },
  {
    "id": "re-24",
    "text": "Which lifecycle method is called just before a component is removed from the DOM?",
    "options": ["componentWillUnmount", "componentDidUnmount", "componentWillDelete", "useEffect cleanup function"],
    "answer": "useEffect cleanup function",
    "topic": "Lifecycle",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["hooks", "cleanup"]
  },
  {
    "id": "re-25",
    "text": "React follows a ______ data flow.",
    "options": ["Bi-directional", "Uni-directional", "Random", "Cyclic"],
    "answer": "Uni-directional",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["data-flow"]
  },
  {
    "id": "re-26",
    "text": "What is 'Prop Drilling'?",
    "options": ["The process of passing data through many levels of nested components", "A way to optimize props", "A method for testing components", "A style of naming props"],
    "answer": "The process of passing data through many levels of nested components",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["data-flow"]
  },
  {
    "id": "re-27",
    "text": "Which tool can be used to create a new React project with a single command?",
    "options": ["create-react-app", "npm init react", "vite", "Both A and C"],
    "answer": "Both A and C",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["tooling"]
  },
  {
    "id": "re-28",
    "text": "What is the 'Children' prop?",
    "options": ["A prop that allows you to pass components as data to other components", "A list of all child components", "A method to delete children", "An array of state values"],
    "answer": "A prop that allows you to pass components as data to other components",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["composition"]
  },
  {
    "id": "re-29",
    "text": "How do you handle events in React?",
    "options": ["Using lowercase event names like onclick", "Using camelCase event names like onClick", "Using strings like 'onclick=\"func()\"'", "Events are not supported"],
    "answer": "Using camelCase event names like onClick",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["events"]
  },
  {
    "id": "re-30",
    "text": "What is 'React.memo'?",
    "options": ["A hook for state", "A higher-order component for performance optimization by memoizing a component", "A way to store data", "A tool for debugging"],
    "answer": "A higher-order component for performance optimization by memoizing a component",
    "topic": "Lifecycle",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["optimization"]
  },
  {
    "id": "re-31",
    "text": "What is the purpose of 'useLayoutEffect'?",
    "options": ["Identical to useEffect but fires synchronously after all DOM mutations", "To style the layout", "To handle asynchronous data", "To manage global state"],
    "answer": "Identical to useEffect but fires synchronously after all DOM mutations",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["hooks"]
  },
  {
    "id": "re-32",
    "text": "Which of the following is used to handle routing in a React app?",
    "options": ["React Route", "React Router", "Browser Router", "Both B and C"],
    "answer": "Both B and C",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["routing"]
  },
  {
    "id": "re-33",
    "text": "In a controlled component, the input value is handled by:",
    "options": ["The DOM", "React state", "The user directly", "A hidden ref"],
    "answer": "React state",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["forms"]
  },
  {
    "id": "re-34",
    "text": "What is an 'Uncontrolled Component'?",
    "options": ["A component that uses state for all inputs", "A component where form data is handled by the DOM itself", "A component with no props", "A broken component"],
    "answer": "A component where form data is handled by the DOM itself",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["forms"]
  },
  {
    "id": "re-35",
    "text": "Which hook is used to get a reference to the previous state or a DOM node?",
    "options": ["useState", "useRef", "useEffect", "useMemo"],
    "answer": "useRef",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["refs"]
  },
  {
    "id": "re-36",
    "text": "What is the result of using a hook inside a loop or conditional statement?",
    "options": ["It works perfectly", "It may cause bugs and violates the Rules of Hooks", "It speeds up the app", "It only works in class components"],
    "answer": "It may cause bugs and violates the Rules of Hooks",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["rules"]
  },
  {
    "id": "re-37",
    "text": "How do you create a custom hook in React?",
    "options": ["By creating a function that starts with 'use'", "By using the createHook function", "Custom hooks are not allowed", "By extending the React.Hook class"],
    "answer": "By creating a function that starts with 'use'",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["custom-hooks"]
  },
  {
    "id": "re-38",
    "text": "What is 'Hydration' in React?",
    "options": ["Drinking water while coding", "The process of attaching event listeners to HTML rendered by the server", "Refreshing the page", "Downloading React"],
    "answer": "The process of attaching event listeners to HTML rendered by the server",
    "topic": "Virtual DOM",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["ssr"]
  },
  {
    "id": "re-39",
    "text": "What is 'Reconciliation'?",
    "options": ["The process through which React updates the DOM", "A way to debug errors", "Fixing state issues", "Merging two branches"],
    "answer": "The process through which React updates the DOM",
    "topic": "Virtual DOM",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["core"]
  },
  {
    "id": "re-40",
    "text": "Which of the following is true about functional components?",
    "options": ["They must be classes", "They cannot have state", "They are simpler and easier to test than class components", "They don't support hooks"],
    "answer": "They are simpler and easier to test than class components",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "re-41",
    "text": "What is the 'Virtual DOM' node type?",
    "options": ["A real HTML element", "A plain JavaScript object", "A JSON file", "A string of HTML"],
    "answer": "A plain JavaScript object",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["core"]
  },
  {
    "id": "re-42",
    "text": "Which prop is used to apply CSS classes to a React element?",
    "options": ["class", "className", "style", "cssClass"],
    "answer": "className",
    "topic": "Props",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "re-43",
    "text": "What is the purpose of 'PropTypes'?",
    "options": ["To style components", "To perform type checking on props", "To manage state", "To connect to a database"],
    "answer": "To perform type checking on props",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["validation"]
  },
  {
    "id": "re-44",
    "text": "What is a 'Higher-Order Component' (HOC)?",
    "options": ["A component that is very large", "A function that takes a component and returns a new component", "A component that sits at the top of the tree", "A built-in React hook"],
    "answer": "A function that takes a component and returns a new component",
    "topic": "Lifecycle",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["advanced"]
  },
  {
    "id": "re-45",
    "text": "In useEffect, what does returning a function do?",
    "options": ["It reruns the effect", "It acts as a cleanup mechanism", "It stops the component from rendering", "It returns data to the parent"],
    "answer": "It acts as a cleanup mechanism",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["cleanup"]
  },
  {
    "id": "re-46",
    "text": "What is 'React StrictMode'?",
    "options": ["A tool for highlighting potential problems in an application", "A way to write faster code", "A CSS style", "A mode that prevents any errors"],
    "answer": "A tool for highlighting potential problems in an application",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["development"]
  },
  {
    "id": "re-47",
    "text": "Can you use hooks in class components?",
    "options": ["Yes", "No", "Only useState", "Only useEffect"],
    "answer": "No",
    "topic": "Hooks",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["rules"]
  },
  {
    "id": "re-48",
    "text": "Which attribute is used to provide a default value to an uncontrolled input?",
    "options": ["value", "defaultValue", "placeholder", "initValue"],
    "answer": "defaultValue",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["forms"]
  },
  {
    "id": "re-49",
    "text": "What is 'Error Boundary' in React?",
    "options": ["A way to catch JS errors anywhere in their child component tree", "A CSS border that turns red on error", "A console command", "A try-catch block for hooks"],
    "answer": "A way to catch JS errors anywhere in their child component tree",
    "topic": "Lifecycle",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["error-handling"]
  },
  {
    "id": "re-50",
    "text": "Which hook is used to access the DOM element directly?",
    "options": ["useDOM", "useRef", "useEffect", "useElement"],
    "answer": "useRef",
    "topic": "Hooks",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["refs"]
  },
  {
    "id": "re-51",
    "text": "What does the 'useDebugValue' hook do?",
    "options": ["Logs errors to the console", "Used to display a label for custom hooks in React DevTools", "Starts a debugger", "Clears the cache"],
    "answer": "Used to display a label for custom hooks in React DevTools",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["debugging"]
  },
  {
    "id": "re-52",
    "text": "How do you render a list of items in React?",
    "options": ["Using a for loop", "Using the .map() method", "Using a while loop", "React renders lists automatically"],
    "answer": "Using the .map() method",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["lists"]
  },
  {
    "id": "re-53",
    "text": "What is 'Portal' in React?",
    "options": ["A way to render children into a DOM node that exists outside the hierarchy of the parent component", "A navigation link", "A security feature", "A state management tool"],
    "answer": "A way to render children into a DOM node that exists outside the hierarchy of the parent component",
    "topic": "Virtual DOM",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["dom"]
  },
  {
    "id": "re-54",
    "text": "Which prop is used to pass inline styles to a React element?",
    "options": ["class", "style", "css", "inline"],
    "answer": "style",
    "topic": "Props",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["styles"]
  },
  {
    "id": "re-55",
    "text": "In React style prop, property names are written in:",
    "options": ["kebab-case", "camelCase", "snake_case", "UPPERCASE"],
    "answer": "camelCase",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["styles"]
  },
  {
    "id": "re-56",
    "text": "What is the purpose of 'useId' hook?",
    "options": ["To fetch user IDs from a server", "To generate unique IDs for accessibility attributes", "To validate forms", "To manage component IDs"],
    "answer": "To generate unique IDs for accessibility attributes",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["accessibility"]
  },
  {
    "id": "re-57",
    "text": "What is a 'Synthetic Event'?",
    "options": ["A fake event", "React’s cross-browser wrapper around the browser’s native event", "An event that never happens", "An asynchronous event"],
    "answer": "React’s cross-browser wrapper around the browser’s native event",
    "topic": "Virtual DOM",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["events"]
  },
  {
    "id": "re-58",
    "text": "Which of the following is used to handle 'Lazy Loading' in React?",
    "options": ["React.lazy()", "React.Suspense", "Both A and B", "None of the above"],
    "answer": "Both A and B",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["performance"]
  },
  {
    "id": "re-59",
    "text": "What is the 'Dependency Array' in useEffect?",
    "options": ["An array of all components", "A list of values that the effect depends on", "A list of all hooks", "An array of CSS files"],
    "answer": "A list of values that the effect depends on",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["hooks"]
  },
  {
    "id": "re-60",
    "text": "What happens if you update state with the same value it already has?",
    "options": ["React will re-render anyway", "React will bail out and not re-render", "React will throw an error", "The component will unmount"],
    "answer": "React will bail out and not re-render",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["performance"]
  },
  {
    "id": "re-61",
    "text": "Which of these is a popular state management library for React?",
    "options": ["Redux", "Zustand", "Recoil", "All of the above"],
    "answer": "All of the above",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["state"]
  },
  {
    "id": "re-62",
    "text": "What is the primary benefit of using Vite over Create React App?",
    "options": ["It is written by Facebook", "Faster cold starts and Hot Module Replacement (HMR)", "It only works with React", "It includes a database"],
    "answer": "Faster cold starts and Hot Module Replacement (HMR)",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["tooling"]
  },
  {
    "id": "re-63",
    "text": "What is the use of 'useTransition' hook?",
    "options": ["To navigate between pages", "To mark some state updates as non-urgent", "To style transitions", "To handle API transitions"],
    "answer": "To mark some state updates as non-urgent",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["performance"]
  },
  {
    "id": "re-64",
    "text": "React components must always return:",
    "options": ["A string", "A single element (or Fragment)", "A number", "Nothing"],
    "answer": "A single element (or Fragment)",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "re-65",
    "text": "What is 'Props.children' used for?",
    "options": ["To display nested components", "To manage child state", "To delete child components", "To list all children"],
    "answer": "To display nested components",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["composition"]
  },
  {
    "id": "re-66",
    "text": "How do you update state based on the previous state value?",
    "options": ["setState(state + 1)", "setState(prev => prev + 1)", "setState = state + 1", "updateState(state + 1)"],
    "answer": "setState(prev => prev + 1)",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["state"]
  },
  {
    "id": "re-67",
    "text": "Which hook provides information about the current route?",
    "options": ["useRoute", "useLocation", "useParams", "Both B and C"],
    "answer": "Both B and C",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["routing"]
  },
  {
    "id": "re-68",
    "text": "What is the purpose of 'useDeferredValue'?",
    "options": ["To delay the execution of a function", "To defer updating a non-urgent part of the UI", "To cache a value", "To handle late API responses"],
    "answer": "To defer updating a non-urgent part of the UI",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["performance"]
  },
  {
    "id": "re-69",
    "text": "What is the correct way to handle a click event in React?",
    "options": ["onClick={handleClick()}", "onClick={handleClick}", "onclick={handleClick}", "onClick={() => handleClick}"],
    "answer": "onClick={handleClick}",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["events"]
  },
  {
    "id": "re-70",
    "text": "What is a 'Controlled Input'?",
    "options": ["An input with a max length", "An input whose value is controlled by React state", "An input that cannot be typed in", "A secure password field"],
    "answer": "An input whose value is controlled by React state",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["forms"]
  },
  {
    "id": "re-71",
    "text": "Which method is used to force a component to re-render in a class component?",
    "options": ["this.reRender()", "this.forceUpdate()", "this.setState({})", "Both B and C"],
    "answer": "Both B and C",
    "topic": "Lifecycle",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["advanced"]
  },
  {
    "id": "re-72",
    "text": "What is 'Forwarding Refs'?",
    "options": ["Passing a ref through a component to one of its children", "Moving a ref to a parent", "Deleting a ref", "Using multiple refs"],
    "answer": "Passing a ref through a component to one of its children",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["refs"]
  },
  {
    "id": "re-73",
    "text": "Which hook is used for DOM-related measurements?",
    "options": ["useEffect", "useLayoutEffect", "useRef", "useMemo"],
    "answer": "useLayoutEffect",
    "topic": "Hooks",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["hooks"]
  },
  {
    "id": "re-74",
    "text": "What does the 'npm start' command do in a CRA project?",
    "options": ["Builds the app for production", "Runs the app in development mode", "Tests the app", "Installs dependencies"],
    "answer": "Runs the app in development mode",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["tooling"]
  },
  {
    "id": "re-75",
    "text": "How do you prevent a component from rendering in React?",
    "options": ["return null", "return false", "return undefined", "All of the above"],
    "answer": "return null",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["rendering"]
  },
  {
    "id": "re-76",
    "text": "Which of these is NOT a hook rule?",
    "options": ["Only call hooks at the top level", "Only call hooks from React functions", "Hooks can be called inside for loops", "Hooks cannot be called from regular JS functions"],
    "answer": "Hooks can be called inside for loops",
    "topic": "Hooks",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["rules"]
  },
  {
    "id": "re-77",
    "text": "What is 'Server-Side Rendering' (SSR)?",
    "options": ["Rendering the app on the user's phone", "Rendering the initial HTML on the server before sending it to the client", "A database technique", "A way to speed up the mouse"],
    "answer": "Rendering the initial HTML on the server before sending it to the client",
    "topic": "Virtual DOM",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["ssr"]
  },
  {
    "id": "re-78",
    "text": "Which prop is used to pass functions between components?",
    "options": ["callback", "onAction", "Any custom prop name", "Only props named 'handler'"],
    "answer": "Any custom prop name",
    "topic": "Props",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["data-flow"]
  },
  {
    "id": "re-79",
    "text": "What is the purpose of the 'displayName' property?",
    "options": ["To set the user's name", "Used for debugging in React DevTools", "To style the component", "To set the page title"],
    "answer": "Used for debugging in React DevTools",
    "topic": "Virtual DOM",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["debugging"]
  },
  {
    "id": "re-80",
    "text": "What is the main advantage of functional components over class components?",
    "options": ["They are faster to write and easier to read", "They have more lifecycle methods", "They use more memory", "They don't support state"],
    "answer": "They are faster to write and easier to read",
    "topic": "Virtual DOM",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  }
]

module.exports = { reactMcqBank };
