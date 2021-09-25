module.exports = {
  siteMetadata: {
    // Site URL for when it goes live
    siteUrl: `https://junibrosas.com/`,
    // Your Name
    name: 'Juni Brosas',
    // Main Site Title
    title: `Juni Brosas | Software Engineer`,
    // Description that goes under your name in main bio
    description: `SOFTWARE ENGINEER · FRONTEND SPECIALIST · TECHNOLOGY ENTHUSIAST · powerlogic1992@gmail.com`,
    // Optional: Twitter account handle
    author: `@justignite`,
    // Optional: Github account URL
    github: `https://github.com/junibrosas`,
    // Optional: LinkedIn account URL
    linkedin: `https://www.linkedin.com/in/juni-brosas-549b28a0/`,
    // Content of the About Me section
    about: `I am a passionate software developer specializing in front-end web development for enterprise-level and large scale applications with over 8 years of experience in software development. Highly motivated in keeping up with the latest technologies and development principles.`,
    // Optional: List your projects, they must have `name` and `description`. `link` is optional.
    projects: [
      {
        name: 'BalancingAcct',
        description:
          'An informative website for a client on their bookkeeping services built with React and NextJS.',
        link: 'https://balancingacct.com',
      },
    ],
    // Optional: List your experience, they must have `name` and `description`. `link` is optional.
    experience: [
      {
        name: 'Arcanys with Alaya',
        description: 'Full-Stack Engineer, March 2019 - Present',
        link: 'https://alayagood.com',
      },
      {
        name: 'Arcanys with RateMyAgent',
        description: 'Frontend Developer, January 2018 - March 2019',
        link: 'https://www.ratemyagent.com.au',
      },
      {
        name: 'Kreloses',
        description: 'Javascript Developer, November 2016 - January 2018',
        link: 'https://www.kreloses.com',
      },
      {
        name: 'Koodi Systems',
        description: 'PHP/Javascript Developer, January 2016 - October 2016',
        link: 'https://koodi.ph',
      },
      {
        name: 'iBoostme',
        description: 'PHP/Wordpress Developer, May 2014 - December 2015',
        link: 'https://www.facebook.com/iBoostme',
      },
    ],
    // Optional: List your skills, they must have `name` and `description`.
    skills: [
      {
        name: 'Frontend',
        description:
          'JavaScript (ES6+), React, Typescript, Angular, NextJS, Webpack',
      },
      {
        name: 'Backend',
        description: 'Node.js, Express.js',
      },
      {
        name: 'Database',
        description: 'MongoDB',
      },
      {
        name: 'Testing',
        description: 'Jest, React Testing Library, Mocha, Chai',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              wrapperStyle: `margin: 0 0 30px;`,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `ADD YOUR TRACKING ID HERE`, // Optional Google Analytics
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `devfolio`,
        short_name: `devfolio`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`, // This color appears on mobile
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
  ],
};
