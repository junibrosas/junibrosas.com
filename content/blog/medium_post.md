
# Setup a Server-rendering App with Next.JS + Typescript

Server-side rendering is an approach which the webserver pre-renders the JS application and serves a parsed DOM to the client, which then “hydrates” the DOM with state. A typical HTML sent by the server when requesting would have a bundle javascript which contains our application. After fetching this response the browser will also fetch the bundle which after a second or two renders the complete page.

Server rendered applications can:

* improve the startup performance of your application

* make your application more search engine friendly

* improve the social media presence with better social media crawlers.

Let us now jump to building a simple application in Next.js with Typescript.

## Install Next.js

First, initialize an NPM project.

    npm init

Install React + Next.js.

    npm install --save next react react-dom

Add a script to your package.json like this:

    "scripts": {
      "dev": "next",
      "build": "next build",
      "start": "next start"
    }

Next, create an index file ‘pages/index.js’ which will serve as your main component.

    function Home() {
      return <h2>Next.js Application</h2>
    }

    export default Home

Every `.js` files side the pages folder become a route the gets automatically processed and rendered.

Then, to check your progress, test the app by running the npm command.

    npm run dev

You should now see a white screen with text “Next.js Application”. Awesome! you now have a bare minimum working application.

Now, the next step would be adding Typescript.

## Install Typescript

Install typescript and typing. If you have not stopped the application yet, go on the press `ctrl + c`.

    npm install typescript @zeit/next-typescript @types/next @types/react @types/react-dom --save-dev

Create a `tsconfig.json` in your project

    {
      "compileOnSave": false,
      "compilerOptions": {
        "target": "esnext",
        "module": "esnext",
        "jsx": "preserve",
        "allowJs": true,
        "moduleResolution": "node",
        "allowSyntheticDefaultImports": true,
        "noUnusedLocals": true, 
        "noUnusedParameters": true,
        "removeComments": false,
        "preserveConstEnums": true,
        "sourceMap": true, 
        "skipLibCheck": true,
        "baseUrl": ".",
        "lib": [
           "dom",
           "es2016"
        ]
      }
    }

Create a `.babelrc.js` in your project

    module.exports = {
      presets: ['next/babel', '@zeit/next-typescript/babel']
    }

Create a `next.config.js` in your project

    const withTypescript = require('@zeit/next-typescript')
    module.exports = withTypescript()

Rename the index file we created earlier to ‘pages/index.tsx’. Then, change the content of your index component to:

    import React from 'react';

    export default class extends React.Component {
      render() {
        return <div>
           <h2>Next.js Application</h2>
        </div>
      }
    }

Now, in order to see the beauty of Typescript, we will create a greeting component which basically just a text that greets a person.

    import React from 'react';

    interface IProps {
      name: string;
    }

    export default class extends React.Component<IProps, {}> {

      render() {
        const { name } = this.props;
      
        return <div>Hello, {name}</div>
      }
    }

Once you’re done, try running again the app. You should now see this in your screen.

![A simple next.js + typescript application](https://cdn-images-1.medium.com/max/2000/1*c9pP1TCOKACtgTO37RcdLQ.png)*A simple next.js + typescript application*

Congratulations, you now have a simple Next.js + Typescript application. You can check the source code [here](https://github.com/junibrosas/nextjs-typescript).
