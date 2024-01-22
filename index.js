/**
 * README Generator
 */
const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true
});

const mdEmoji = require('markdown-it-emoji');
const fs = require('fs');
const axios = require('axios').default;

md.use(mdEmoji);

/* README Sections */
const introTitle = generateTitle(2, `Hey :wave:, I'm ${generateLink('Peter', 'https://peterwu789.com/')}`);

const introDescription = `I'm currently a software engineer **${generateLink(
  '@alfred24hk',
  'https://www.alfred24.com.hk/en/home'
)}** based in 🌁 HK. I am working on some new side projects, learning a couple of new dishes, and trying to improve my knowledge on different sector!`;

const badgeConfigs = [
  {
    name: 'Website',
    badgeText: 'peterwu789.com',
    labelBgColor: '4E69C8',
    logoBgColor: '4E69C8',
    logo: 'Google',
    link: 'https://peterwu789.com/'
  },
  {
    name: 'LinkedIn',
    badgeText: '@peterwu',
    labelBgColor: '0077B5',
    logoBgColor: '0077B5',
    logo: 'LinkedIn',
    link: 'https://www.linkedin.com/in/peter-wu-5a626614b/'
  },
  {
    name: 'Spotify',
    badgeText: '@Peter%20Wu',
    labelBgColor: '1ED760',
    logoBgColor: 'fff',
    logo: 'Spotify',
    link: 'https://open.spotify.com/user/peterw_sb?si=-MH1nu8DQ7eVU-SXnQPquQ'
  }
];
const badges = badgeConfigs.reduce((result, config) => result + ' ' + generateBadge(config), '');

const gif = `<img align="right" src="https://1.bp.blogspot.com/-PerenMfIjCM/XpcyoHWXSzI/AAAAAAAAB-g/DuPj_IoSWAMod3pVy4eEya4uxk-KN0UuACLcBGAsYHQ/s1600/typing%2Bcat%2Bgif3.gif" />`;
const factsTitle = generateTitle(2, `:zap: A Few Fun Facts`);
const factsConfigs = [
  `👾 I’m currently working on [Alfred24](https://www.alfred24.com.hk/en/home).`,
  `✍️ Working about **creating applications**, **bug fixing**, and **sourcing**.`,
  `🤔 Learning and trying to develop any application within my knowledge.`,
  `📙 Check out my [resume](https://peterwu789.com/pdf/CV_Peter_HK_V10.pdf)READCnev👨‍🔧.`,
  `👨‍💻 Most of my projects are available on [Github](https://github.com/wulaiyin789).`,
  `🎉 Fun Fact: 私の名前はピーターです。どうぞよろしくお願いします。`
];
const facts = factsConfigs.reduce((result, fact) => result + `\n - ${fact}`, '');

const toolsTitle = generateTitle(2, `:rocket: Some Tools I Use`);
const toolsIconSize = 25;
const toolsConfig = [
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg',
    alt: 'react'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/bootstrap/bootstrap-plain.svg',
    alt: 'bootstrap'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg',
    alt: 'css3'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/gulp/gulp-plain.svg',
    alt: 'gulp'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg',
    alt: 'javascript'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg',
    alt: 'typescript'
  },
  {
    src: 'https://devicons.github.io/devicon/devicon.git/icons/mongodb/mongodb-original-wordmark.svg',
    alt: 'mongodb'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg',
    alt: 'mysql'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg',
    alt: 'nodejs'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original-wordmark.svg',
    alt: 'python'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/heroku/heroku-plain.svg',
    alt: 'heroku'
  },
  {
    src: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/travis/travis-plain.svg',
    alt: 'travis'
  },
  {
    src: 'https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg',
    alt: 'gcp'
  },
  {
    src: 'https://devicons.github.io/devicon/devicon.git/icons/docker/docker-original-wordmark.svg',
    alt: 'Docker'
  },
  {
    src: 'https://www.vectorlogo.zone/logos/kubernetes/kubernetes-icon.svg',
    alt: 'Kubernetes'
  }
];

const styled = `
    <div class="container">
        <h3> _**{%QUOTE%}**_</h3>
        <p>- _**{%AUTHOR%}**_</p>
    </div>
`;

const template = fs.readFileSync(`${__dirname}/TEMPLATE.md`, 'utf-8');

fs.writeFileSync('README.md', template);

const readme = fs.readFileSync(`${__dirname}/README.md`, 'utf-8');

const getQuote = async () => {
  try {
    // Old: https://quotes.rest/qod?language=en
    const { data } = await axios.get('https://zenquotes.io/api/random', {
      header: {
        'Content-Type': 'application/json'
      }
    });

    const quote = data[0].q; // Quote
    const author = data[0].a // Author

    return {
      quote,
      author
    };
  } catch (err) {
    console.error('Error occurred: ', err.message);
    return {};
  }
};

const replaceReadme = async () => {
  try {
    const { quote, author } = await getQuote();

    if (!quote) return;

    let newReadme = readme.replace(/{%QUOTE%}/g, quote);
    newReadme = newReadme.replace(/{%AUTHOR%}/g, author);

    fs.writeFileSync('README.md', newReadme);
  } catch (err) {
    console.error(err);
  }
};

const tools = toolsConfig.reduce((result, toolConfig) => result + '\n' + generateIcon(toolConfig, toolsIconSize), '');

const stats = `<img src="https://github-readme-stats.vercel.app/api?username=wulaiyin789&show_icons=true&count_private=true" alt="wulaiyin789" />`;

(async () => {
  const content = `
        ${introTitle}\n
        ${introDescription}\n
        ${badges}\n
        ${gif}\n
        ${factsTitle}\n
        ${facts}\n
        ${toolsTitle}\n
        <p align="left">\n
            ${tools}\n
        </p>\n
        ${stats}\n
        ${styled}
    `;

  const markdownContent = md.render(content);

  fs.writeFile('README.md', markdownContent, (err) => {
    if (err) {
      return console.error(err);
    }
    console.info(`Writing to README.md`);
  });

  replaceReadme();
})();

function generateBadge(badgeConfig) {
  return `[![${badgeConfig.name} Badge](https://img.shields.io/badge/-${badgeConfig.badgeText}-${badgeConfig.labelBgColor}?style=flat-square&labelColor=${badgeConfig.logoBgColor}&logo=${badgeConfig.logo}&link=${badgeConfig.link})](${badgeConfig.link})`;
}

function generateIcon(iconConfig, toolsIconSize) {
  return `<img src="${iconConfig.src}" alt="${iconConfig.alt}" width="${toolsIconSize}" height="${toolsIconSize}" />`;
}

function generateTitle(size, title) {
  return `${'#'.repeat(size)} ${title}`;
}

function generateLink(label, link) {
  return `[${label}](${link})`;
}
