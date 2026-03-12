/*
To ensure variety, aim for this distribution:

HTML/CSS: 80 Questions (Layout, Tags, Flexbox, Grid).

JS/DOM: 100 Questions (Closures, ES6, Events, Promises).

React: 80 Questions (Hooks, Props, Lifecycle, Virtual DOM).

Node/Express/Mongo: 80 Questions (Routes, Middleware, CRUD).

Tools (Git/Agile/Regex): 60 Questions.
*/

const mcqBank = [
  // --- SOURCE CODE MANAGEMENT: GIT ---
  {
    id: 'git-01',
    text: 'Which command is used to combine the contents of one branch into another?',
    options: ['git push', 'git combine', 'git merge', 'git join'],
    subject: 'Web Development',
    topic: 'Git',
    difficulty: 'Easy',
    marks: 2,
    answer: 'git merge',
    tags: ['git', 'version-control']
  },
  {
    id: 'git-02',
    text: 'What does the command "git status" do?',
    options: [
      'Deletes the current repository', 
      'Shows the state of the working directory and staging area', 
      'Uploads code to GitHub', 
      'Creates a new branch'
    ],
    subject: 'Web Development',
    topic: 'Git',
    difficulty: 'Easy',
    marks: 2,
    answer: 'Shows the state of the working directory and staging area',
    tags: ['git', 'cli']
  },

  // --- AGILE / SCRUM ---
  {
    id: 'agile-01',
    text: 'In Scrum, who is responsible for prioritizing the Product Backlog?',
    options: ['Scrum Master', 'Development Team', 'Product Owner', 'Stakeholders'],
    subject: 'Project Management',
    topic: 'Agile',
    difficulty: 'Medium',
    marks: 2,
    answer: 'Product Owner',
    tags: ['agile', 'scrum']
  },

  // --- LANGUAGE FUNDAMENTALS (JAVASCRIPT) ---
  {
    id: 'js-fund-01',
    text: 'What is the output of "console.log(typeof NaN)"?',
    options: ['"number"', '"nan"', '"undefined"', '"object"'],
    subject: 'Web Development',
    topic: 'Language Fundamentals',
    difficulty: 'Medium',
    marks: 2,
    answer: '"number"',
    tags: ['javascript', 'fundamentals']
  },
  {
    id: 'js-fund-02',
    text: 'Which of the following is used to declare a block-scoped variable?',
    options: ['var', 'let', 'set', 'constant'],
    subject: 'Web Development',
    topic: 'Language Fundamentals',
    difficulty: 'Easy',
    marks: 2,
    answer: 'let',
    tags: ['javascript', 'es6']
  },

  // --- DOM ---
  {
    id: 'dom-01',
    text: 'Which method is used to remove an HTML element from the DOM?',
    options: ['deleteElement()', 'remove()', 'removeChild()', 'Both remove() and removeChild()'],
    subject: 'Web Development',
    topic: 'DOM',
    difficulty: 'Medium',
    marks: 4,
    answer: 'Both remove() and removeChild()',
    tags: ['dom', 'javascript']
  },

  // --- FRONTEND: REACT ---
  {
    id: 'react-01',
    text: 'What is the purpose of "useEffect" in React?',
    options: [
      'To directly modify the DOM', 
      'To handle side effects like data fetching or subscriptions', 
      'To create a new component', 
      'To store global variables'
    ],
    subject: 'Web Development',
    topic: 'React',
    difficulty: 'Hard',
    marks: 4,
    answer: 'To handle side effects like data fetching or subscriptions',
    tags: ['react', 'hooks']
  },
  {
    id: 'react-02',
    text: 'How do you pass data from a parent component to a child component?',
    options: ['Using State', 'Using Props', 'Using Context only', 'Using Redux only'],
    subject: 'Web Development',
    topic: 'React',
    difficulty: 'Easy',
    marks: 2,
    answer: 'Using Props',
    tags: ['react', 'props']
  },

  // --- VALIDATION: REGULAR EXPRESSIONS ---
  {
    id: 'regex-01',
    text: 'In a Regular Expression, which character matches the start of a string?',
    options: ['$', '*', '^', '\\s'],
    subject: 'Web Development',
    topic: 'Regular Expression',
    difficulty: 'Medium',
    marks: 2,
    answer: '^',
    tags: ['regex', 'validation']
  },

  // --- MERN / NODE & EXPRESS ---
  {
    id: 'node-01',
    text: 'Which core module in Node.js is used to handle file paths?',
    options: ['fs', 'url', 'path', 'http'],
    subject: 'Web Development',
    topic: 'MERN Mini Project',
    difficulty: 'Easy',
    marks: 2,
    answer: 'path',
    tags: ['node', 'backend']
  },
  {
    id: 'express-01',
    text: 'What is "Middleware" in Express.js?',
    options: [
      'A database driver', 
      'Functions that have access to the request and response objects', 
      'A frontend framework', 
      'The hardware server'
    ],
    subject: 'Web Development',
    topic: 'MERN Mini Project',
    difficulty: 'Hard',
    marks: 4,
    answer: 'Functions that have access to the request and response objects',
    tags: ['express', 'middleware']
  }, 
  // --- HTML5 & CSS3 ---
  {
    id: 'html-01',
    text: 'Which HTML5 element is used to specify a footer for a document or section?',
    options: ['<bottom>', '<footer>', '<section>', '<aside>'],
    answer: '<footer>',
    topic: 'HTML',
    difficulty: 'Easy',
    marks: 2
  },
  {
    id: 'css-01',
    text: 'In the CSS Box Model, which property is between the border and the content?',
    options: ['Margin', 'Padding', 'Outline', 'Spacing'],
    answer: 'Padding',
    topic: 'CSS',
    difficulty: 'Easy',
    marks: 2
  },
  {
    id: 'css-02',
    text: 'Which CSS property is used to create a Flexbox container?',
    options: ['display: flex', 'layout: flex', 'float: center', 'position: relative'],
    answer: 'display: flex',
    topic: 'CSS',
    difficulty: 'Medium',
    marks: 2
  },

  // --- JAVASCRIPT & DOM ---
  {
    id: 'js-03',
    text: 'What is the purpose of the "async" keyword in JavaScript?',
    options: [
      'To make a function return a Promise',
      'To stop the execution of code',
      'To debug the application',
      'To declare a global variable'
    ],
    answer: 'To make a function return a Promise',
    topic: 'Javascript',
    difficulty: 'Hard',
    marks: 4
  },
  {
    id: 'dom-02',
    text: 'Which event occurs when the user clicks on an HTML element?',
    options: ['onchange', 'onmouseover', 'onclick', 'onmouseclick'],
    answer: 'onclick',
    topic: 'DOM',
    difficulty: 'Easy',
    marks: 2
  },

  // --- REACT ---
  {
    id: 'react-03',
    text: 'In React, what is "lifting state up"?',
    options: [
      'Moving state to a child component',
      'Moving state to the closest common ancestor',
      'Using Redux for everything',
      'Deleting state to save memory'
    ],
    answer: 'Moving state to the closest common ancestor',
    topic: 'React',
    difficulty: 'Medium',
    marks: 4
  },

  // --- NODE & EXPRESS ---
  {
    id: 'node-02',
    text: 'Which command initializes a new Node.js project and creates a package.json file?',
    options: ['node init', 'npm install', 'npm init', 'git init'],
    answer: 'npm init',
    topic: 'MERN Mini Project',
    difficulty: 'Easy',
    marks: 2
  },
  {
    id: 'mongo-01',
    text: 'In MongoDB, what is a "Collection" equivalent to in a Relational Database?',
    options: ['Row', 'Database', 'Table', 'Column'],
    answer: 'Table',
    topic: 'MERN Mini Project',
    difficulty: 'Medium',
    marks: 2
  },
  {
    "id": "hc-01",
    "text": "Which HTML5 tag is most appropriate for a sidebar or content indirectly related to the main content?",
    "options": ["<section>", "<aside>", "<article>", "<div>"],
    "answer": "<aside>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["semantics", "html5"]
  },
  {
    "id": "hc-02",
    "text": "What does the 'z-index' property in CSS control?",
    "options": ["The zoom level of an element", "The horizontal alignment", "The stack order of elements", "The opacity"],
    "answer": "The stack order of elements",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["positioning"]
  },
  {
    "id": "hc-03",
    "text": "In Flexbox, which property is used on the container to move items along the main axis?",
    "options": ["align-items", "justify-content", "align-content", "flex-direction"],
    "answer": "justify-content",
    "topic": "Flexbox",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["flexbox", "layout"]
  },
  {
    "id": "hc-04",
    "text": "Which CSS Grid property is a shorthand for grid-row-start and grid-row-end?",
    "options": ["grid-area", "grid-column", "grid-row", "grid-template"],
    "answer": "grid-row",
    "topic": "Grid",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["grid", "layout"]
  },
  {
    "id": "hc-05",
    "text": "Which HTML attribute is used to define inline styles?",
    "options": ["class", "styles", "font", "style"],
    "answer": "style",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-06",
    "text": "How do you make a list that lists the items with numbers?",
    "options": ["<ul>", "<list>", "<ol>", "<dl>"],
    "answer": "<ol>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["lists"]
  },
  {
    "id": "hc-07",
    "text": "What is the correct CSS syntax for making all the <p> elements bold?",
    "options": ["p {font-weight: bold;}", "p {text-size: bold;}", "<p style='bold'>", "p {style: bold;}"],
    "answer": "p {font-weight: bold;}",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-08",
    "text": "Which property is used to change the background color in CSS?",
    "options": ["color", "bgcolor", "background-color", "canvas-color"],
    "answer": "background-color",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["style"]
  },
  {
    "id": "hc-09",
    "text": "In a CSS Grid, how do you create a gap of 20px between rows and columns?",
    "options": ["grid-spacing: 20px;", "gap: 20px;", "margin: 20px;", "grid-padding: 20px;"],
    "answer": "gap: 20px;",
    "topic": "Grid",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["grid"]
  },
  {
    "id": "hc-10",
    "text": "Which flex-wrap value is the default?",
    "options": ["wrap", "nowrap", "wrap-reverse", "no-display"],
    "answer": "nowrap",
    "topic": "Flexbox",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-11",
    "text": "What is the purpose of the <main> tag?",
    "options": ["To contain the navigation links", "To define the unique content of the document", "To group the header and footer", "To create a sidebar"],
    "answer": "To define the unique content of the document",
    "topic": "HTML Tags",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["semantics"]
  },
  {
    "id": "hc-12",
    "text": "Which CSS property is used to change the text color of an element?",
    "options": ["fgcolor", "text-color", "color", "font-color"],
    "answer": "color",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-13",
    "text": "Which CSS property is used to stack elements on top of each other?",
    "options": ["z-index", "stack-order", "position", "float"],
    "answer": "z-index",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["positioning"]
  },
  {
    "id": "hc-14",
    "text": "In CSS Grid, which unit represents a fraction of the free space in the grid container?",
    "options": ["px", "%", "fr", "em"],
    "answer": "fr",
    "topic": "Grid",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["grid"]
  },
  {
    "id": "hc-15",
    "text": "Which HTML element is used to specify a header for a document or section?",
    "options": ["<top>", "<head>", "<header>", "<section>"],
    "answer": "<header>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["semantics"]
  },
  {
    "id": "hc-16",
    "text": "How do you select an element with id 'demo' in CSS?",
    "options": [".demo", "#demo", "demo", "*demo"],
    "answer": "#demo",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["selectors"]
  },
  {
    "id": "hc-17",
    "text": "What is the default value of the position property?",
    "options": ["relative", "fixed", "absolute", "static"],
    "answer": "static",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["positioning"]
  },
  {
    "id": "hc-18",
    "text": "Which HTML tag is used to define an internal style sheet?",
    "options": ["<css>", "<script>", "<style>", "<link>"],
    "answer": "<style>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-19",
    "text": "Which property is used to change the left margin of an element?",
    "options": ["padding-left", "margin-left", "indent", "margin-left-style"],
    "answer": "margin-left",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["box-model"]
  },
  {
    "id": "hc-20",
    "text": "What does the 'target=\"_blank\"' attribute do in an anchor tag?",
    "options": ["Opens the link in the same window", "Opens the link in a new window or tab", "Makes the link invisible", "Downloads the linked file"],
    "answer": "Opens the link in a new window or tab",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["links"]
  },
  {
    "id": "hc-21",
    "text": "Which attribute is used to provide an advisory text about an element, usually as a tooltip?",
    "options": ["alt", "title", "tooltip", "src"],
    "answer": "title",
    "topic": "HTML Tags",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["attributes"]
  },
  {
    "id": "hc-22",
    "text": "In Flexbox, which property is used to align items along the cross axis?",
    "options": ["justify-content", "align-items", "flex-direction", "align-content"],
    "answer": "align-items",
    "topic": "Flexbox",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-23",
    "text": "Which CSS property is used to create space around the content of an element, inside of any defined borders?",
    "options": ["margin", "padding", "spacing", "border-spacing"],
    "answer": "padding",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["box-model"]
  },
  {
    "id": "hc-24",
    "text": "What is the correct HTML for adding a background color?",
    "options": ["<body bg=\"yellow\">", "<body style=\"background-color:yellow;\">", "<background>yellow</background>", "<body color=\"yellow\">"],
    "answer": "<body style=\"background-color:yellow;\">",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["style"]
  },
  {
    "id": "hc-25",
    "text": "Which CSS property defines the space between the cells of a table?",
    "options": ["border-spacing", "cell-padding", "border-style", "cell-spacing"],
    "answer": "border-spacing",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["tables"]
  },
  {
    "id": "hc-26",
    "text": "Which property is used to align text in CSS?",
    "options": ["text-align", "text-style", "font-align", "alignment"],
    "answer": "text-align",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-27",
    "text": "In a grid layout, which property defines the number of columns?",
    "options": ["grid-columns", "grid-template-columns", "column-count", "grid-row-gap"],
    "answer": "grid-template-columns",
    "topic": "Grid",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["grid"]
  },
  {
    "id": "hc-28",
    "text": "How do you make the text scroll horizontally in a container if it's too long?",
    "options": ["overflow:scroll", "overflow-x:auto", "scroll:horizontal", "white-space:nowrap"],
    "answer": "overflow-x:auto",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["layout"]
  },
  {
    "id": "hc-29",
    "text": "Which HTML tag is used to display a scalar measurement within a known range?",
    "options": ["<progress>", "<meter>", "<range>", "<scale>"],
    "answer": "<meter>",
    "topic": "HTML Tags",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["html5"]
  },
  {
    "id": "hc-30",
    "text": "What does the 'vh' unit stand for in CSS?",
    "options": ["Vertical Height", "Viewport Height", "View Height", "Variable Height"],
    "answer": "Viewport Height",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["units"]
  },
  {
    "id": "hc-31",
    "text": "Which property determines whether an element's position is fixed or scrolls with the page?",
    "options": ["background-attachment", "position", "scroll-behavior", "attachment"],
    "answer": "background-attachment",
    "topic": "CSS Layout",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["background"]
  },
  {
    "id": "hc-32",
    "text": "Which HTML5 input type is used specifically for telephone numbers?",
    "options": ["<input type=\"phone\">", "<input type=\"tel\">", "<input type=\"number\">", "<input type=\"mobile\">"],
    "answer": "<input type=\"tel\">",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["forms"]
  },
  {
    "id": "hc-33",
    "text": "What is the purpose of the <label> tag in HTML forms?",
    "options": ["To group form elements", "To provide a clickable caption for an input", "To validate the input", "To style the input"],
    "answer": "To provide a clickable caption for an input",
    "topic": "HTML Tags",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["forms"]
  },
  {
    "id": "hc-34",
    "text": "In CSS, what is the default value of 'flex-shrink'?",
    "options": ["0", "1", "auto", "none"],
    "answer": "1",
    "topic": "Flexbox",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-35",
    "text": "Which property allows you to specify that an element should be shown as a flex container?",
    "options": ["display: flex;", "flex-container: true;", "layout: flex;", "float: flex;"],
    "answer": "display: flex;",
    "topic": "Flexbox",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-36",
    "text": "Which CSS property specifies the transparency of an element?",
    "options": ["visibility", "filter", "opacity", "overlay"],
    "answer": "opacity",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["style"]
  },
  {
    "id": "hc-37",
    "text": "How do you group multiple selectors in a single CSS rule?",
    "options": ["Separate with a plus sign", "Separate with a comma", "Separate with a space", "Separate with a dot"],
    "answer": "Separate with a comma",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["selectors"]
  },
  {
    "id": "hc-38",
    "text": "Which HTML element is used to specify a character encoding for the HTML document?",
    "options": ["<meta charset=\"UTF-8\">", "<charset value=\"UTF-8\">", "<head encoding=\"UTF-8\">", "<meta encoding=\"UTF-8\">"],
    "answer": "<meta charset=\"UTF-8\">",
    "topic": "HTML Tags",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["metadata"]
  },
  {
    "id": "hc-39",
    "text": "What is the correct CSS to hide an element and also remove it from the layout flow?",
    "options": ["visibility: hidden;", "display: none;", "opacity: 0;", "mask: hidden;"],
    "answer": "display: none;",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["layout"]
  },
  {
    "id": "hc-40",
    "text": "Which CSS property is used to control the flow of text in a grid container?",
    "options": ["grid-auto-flow", "grid-flow", "grid-direction", "grid-text-flow"],
    "answer": "grid-auto-flow",
    "topic": "Grid",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["grid"]
  },
  {
    "id": "hc-41",
    "text": "Which tag is used to embed an SVG image directly in HTML?",
    "options": ["<img src=\"file.svg\">", "<svg>", "<embed>", "<object>"],
    "answer": "<svg>",
    "topic": "HTML Tags",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["graphics"]
  },
  {
    "id": "hc-42",
    "text": "In CSS, what does 'box-sizing: border-box;' do?",
    "options": ["Adds padding to the border", "Includes padding and border in the element's total width and height", "Excludes padding from width", "Makes the border transparent"],
    "answer": "Includes padding and border in the element's total width and height",
    "topic": "CSS Layout",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["box-model"]
  },
  {
    "id": "hc-43",
    "text": "Which attribute is used to specify that an input field must be filled out before submitting the form?",
    "options": ["validate", "required", "placeholder", "needed"],
    "answer": "required",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["forms"]
  },
  {
    "id": "hc-44",
    "text": "What is the default direction for 'flex-direction'?",
    "options": ["column", "row-reverse", "row", "column-reverse"],
    "answer": "row",
    "topic": "Flexbox",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-45",
    "text": "Which CSS property is used to capitalize the first letter of each word?",
    "options": ["text-transform: uppercase;", "text-transform: capitalize;", "font-style: capitalize;", "text-decoration: capitalize;"],
    "answer": "text-transform: capitalize;",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-46",
    "text": "Which CSS selector targets an element that is being hovered over by the mouse?",
    "options": [":focus", ":active", ":hover", ":visited"],
    "answer": ":hover",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["selectors"]
  },
  {
    "id": "hc-47",
    "text": "How do you specify a grid area across multiple rows?",
    "options": ["grid-row: span 2;", "grid-row-extend: 2;", "grid-span: row 2;", "row-span: 2;"],
    "answer": "grid-row: span 2;",
    "topic": "Grid",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["grid"]
  },
  {
    "id": "hc-48",
    "text": "Which HTML element defines a set of navigation links?",
    "options": ["<nav>", "<links>", "<menu>", "<navigate>"],
    "answer": "<nav>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["semantics"]
  },
  {
    "id": "hc-49",
    "text": "What does CSS stand for?",
    "options": ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    "answer": "Cascading Style Sheets",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-50",
    "text": "Which CSS property is used to specify whether the content of an element should be clipped?",
    "options": ["clip", "overflow", "visibility", "display"],
    "answer": "overflow",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["layout"]
  },
  {
    "id": "hc-51",
    "text": "Which HTML tag is used to create a dropdown list?",
    "options": ["<list>", "<input type=\"dropdown\">", "<select>", "<datalist>"],
    "answer": "<select>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["forms"]
  },
  {
    "id": "hc-52",
    "text": "In CSS, what is the 'em' unit based on?",
    "options": ["The width of the screen", "The font-size of the element's parent", "The height of the 'm' character", "The viewport width"],
    "answer": "The font-size of the element's parent",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["units"]
  },
  {
    "id": "hc-53",
    "text": "Which property defines the alignment of a single flex item?",
    "options": ["align-items", "align-self", "justify-self", "flex-align"],
    "answer": "align-self",
    "topic": "Flexbox",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-54",
    "text": "Which HTML5 tag is used to embed video?",
    "options": ["<media>", "<video>", "<movie>", "<source>"],
    "answer": "<video>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["html5"]
  },
  {
    "id": "hc-55",
    "text": "Which property is used to set the spacing between lines of text?",
    "options": ["line-height", "spacing", "text-spacing", "line-spacing"],
    "answer": "line-height",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-56",
    "text": "What is the correct CSS to center a block element horizontally?",
    "options": ["text-align: center;", "margin: 0 auto;", "align: center;", "padding: auto;"],
    "answer": "margin: 0 auto;",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["layout"]
  },
  {
    "id": "hc-57",
    "text": "Which CSS property is used to round the corners of an element?",
    "options": ["border-radius", "corner-style", "border-round", "border-corner"],
    "answer": "border-radius",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["style"]
  },
  {
    "id": "hc-58",
    "text": "Which HTML element is used to define emphasized text?",
    "options": ["<i>", "<em>", "<italic>", "<strong>"],
    "answer": "<em>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-59",
    "text": "Which property is used to specify the stack level of a grid item?",
    "options": ["grid-layer", "z-index", "grid-level", "stack"],
    "answer": "z-index",
    "topic": "Grid",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["grid"]
  },
  {
    "id": "hc-60",
    "text": "How do you apply a style to an element when it is clicked?",
    "options": [":hover", ":active", ":focus", ":visited"],
    "answer": ":active",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["selectors"]
  },
  {
    "id": "hc-61",
    "text": "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    "options": ["title", "src", "alt", "longdesc"],
    "answer": "alt",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-62",
    "text": "What does the 'rem' unit stand for in CSS?",
    "options": ["Relative Element Measure", "Root em", "Real Element Metric", "Root Element Marker"],
    "answer": "Root em",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["units"]
  },
  {
    "id": "hc-63",
    "text": "In Flexbox, which property is used to change the order of flex items?",
    "options": ["order", "flex-order", "item-index", "sort-order"],
    "answer": "order",
    "topic": "Flexbox",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-64",
    "text": "Which HTML5 element defines a section that contains only navigation links?",
    "options": ["<nav>", "<header>", "<footer>", "<aside>"],
    "answer": "<nav>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["semantics"]
  },
  {
    "id": "hc-65",
    "text": "Which CSS property is used to create a shadow effect on text?",
    "options": ["shadow", "text-shadow", "box-shadow", "font-shadow"],
    "answer": "text-shadow",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["style"]
  },
  {
    "id": "hc-66",
    "text": "Which HTML tag is used to define an unordered list?",
    "options": ["<ol>", "<list>", "<ul>", "<dl>"],
    "answer": "<ul>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["lists"]
  },
  {
    "id": "hc-67",
    "text": "Which CSS property allows the wrapping of content in a grid?",
    "options": ["grid-wrap", "grid-template-areas", "grid-auto-rows", "gap"],
    "answer": "grid-auto-rows",
    "topic": "Grid",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["grid"]
  },
  {
    "id": "hc-68",
    "text": "Which property is used to specify the font of an element?",
    "options": ["font-family", "font-style", "text-font", "font-weight"],
    "answer": "font-family",
    "topic": "CSS Layout",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-69",
    "text": "What is the correct CSS syntax for referring to an external style sheet?",
    "options": ["<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">", "<style src=\"mystyle.css\">", "<stylesheet>mystyle.css</stylesheet>", "<link src=\"mystyle.css\">"],
    "answer": "<link rel=\"stylesheet\" type=\"text/css\" href=\"mystyle.css\">",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-70",
    "text": "Which property is used to change the list style to squares?",
    "options": ["list-type: square;", "list-style-type: square;", "list-bullet: square;", "type: square;"],
    "answer": "list-style-type: square;",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["lists"]
  },
  {
    "id": "hc-71",
    "text": "What is the correct HTML for creating a hyperlink?",
    "options": ["<a href=\"http://google.com\">Google</a>", "<a>http://google.com</a>", "<a url=\"http://google.com\">Google</a>", "<link>http://google.com</link>"],
    "answer": "<a href=\"http://google.com\">Google</a>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["links"]
  },
  {
    "id": "hc-72",
    "text": "Which CSS property defines the space between columns in a multi-column layout?",
    "options": ["column-gap", "grid-gap", "spacing", "margin-column"],
    "answer": "column-gap",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["layout"]
  },
  {
    "id": "hc-73",
    "text": "Which HTML tag is used to define important text?",
    "options": ["<important>", "<strong>", "<b>", "<i>"],
    "answer": "<strong>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["typography"]
  },
  {
    "id": "hc-74",
    "text": "Which value for 'position' will keep an element in the same place even when the page is scrolled?",
    "options": ["absolute", "relative", "fixed", "sticky"],
    "answer": "fixed",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["positioning"]
  },
  {
    "id": "hc-75",
    "text": "In a flex container, what is the 'flex-basis' property used for?",
    "options": ["Specifies the initial size of a flex item", "Specifies how much an item grows", "Specifies the alignment", "Sets the maximum width"],
    "answer": "Specifies the initial size of a flex item",
    "topic": "Flexbox",
    "difficulty": "Hard",
    "marks": 4,
    "tags": ["flexbox"]
  },
  {
    "id": "hc-76",
    "text": "Which HTML element is used for the largest heading?",
    "options": ["<heading>", "<h6>", "<head>", "<h1>"],
    "answer": "<h1>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-77",
    "text": "Which CSS property is used to control the aspect ratio of an element?",
    "options": ["aspect-ratio", "ratio", "box-ratio", "size-ratio"],
    "answer": "aspect-ratio",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 4,
    "tags": ["style"]
  },
  {
    "id": "hc-78",
    "text": "What is the HTML element for a line break?",
    "options": ["<break>", "<lb>", "<br>", "<hr>"],
    "answer": "<br>",
    "topic": "HTML Tags",
    "difficulty": "Easy",
    "marks": 2,
    "tags": ["basics"]
  },
  {
    "id": "hc-79",
    "text": "Which CSS property can you use to animate changes to CSS properties over time?",
    "options": ["transform", "transition", "animation", "motion"],
    "answer": "transition",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["animation"]
  },
  {
    "id": "hc-80",
    "text": "Which pseudo-class is used to style elements when they are in focus, such as after a user clicks on an input field?",
    "options": [":hover", ":visited", ":focus", ":active"],
    "answer": ":focus",
    "topic": "CSS Layout",
    "difficulty": "Medium",
    "marks": 2,
    "tags": ["selectors"]
  }
];

module.exports = { mcqBank };
