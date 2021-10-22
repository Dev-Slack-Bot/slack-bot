DROP TABLE IF EXISTS course CASCADE;
DROP TABLE IF EXISTS tips CASCADE;
DROP TABLE IF EXISTS funny CASCADE;
DROP TABLE IF EXISTS favorite CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE course (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course TEXT NOT NULL
);

CREATE TABLE tips (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tip TEXT NOT NULL,
    tip_url TEXT,
    course_id BIGINT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    times_viewed INT 
);

CREATE TABLE funny (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entree TEXT NOT NULL,
    course_id BIGINT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id) ON DELETE CASCADE,
    times_viewed INT
);

CREATE TABLE users (
    id TEXT UNIQUE,
    username TEXT NOT NULL,
    name TEXT NOT NULL
);

CREATE TABLE favorite (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    tips_id BIGINT,
    FOREIGN KEY (tips_id) REFERENCES tips(id) ON DELETE CASCADE,
    funny_id BIGINT,
    FOREIGN KEY (funny_id) REFERENCES funny(id) ON DELETE CASCADE
);

-- Dont forget your crabby hands! "<> </>
-- There is no Ctrl-Z in life.

INSERT INTO course (course) VALUES ('Foundations_1'), ('Foundations_2'), ('Career Track');
INSERT INTO tips (tip, tip_url, course_id, times_viewed) VALUES 
('For help pracicing CSS flex, try Flexboxfroggy!', 'https://flexboxfroggy.com/', '1', 3),
('Starting a new HTML doc? Try using html:5 at the start. Here is the Vscode link for html', 'https://code.visualstudio.com/docs/languages/html', '1', 1),
('Dont forget your crabby hands! "<> </>" when making a component in react', 'https://reactjs.org/docs/react-component.html', '2', 4), 
('Make sure you cd into your repo before you code .', 'https://www.codegrepper.com/code-examples/whatever/how+to+change+directory+in+mac+terminal', '1', 2), 
('Breaks are important! Remember to get up and walk around!', 'https://www.health.harvard.edu/pain/the-dangers-of-sitting', '1', 1),
('Dont struggle for too long on your own, ask for help when you need it', 'N/A', '1', 0), 
('Talk and listen to your team, dont be a Rupert','https://www.reddit.com/r/survivor/comments/ht1k84/rupert_bonehams_underground_shelter_is_a_disaster/', '1',0), 
('Remember to git add/commit/push often to incase of a needed revert/bug fix','https://www.youtube.com/watch?v=wrb7Gge9yoE', '1', 0), 
('Need a random number? Try Math.random()','https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random', '1',0), 
('git stash goes somewhere','https://git-scm.com/docs/git-stash', '1', 0), 
('Remember to add your secrets to your .yml file, github, and heroku','https://docs.github.com/en/actions/security-guides/encrypted-secrets', '3', 0), 
('Try using postman to check out your data-base', 'https://www.postman.com/', '2', 0), 
('When testing you can expect all sorts of data to come back', 'https://jestjs.io/docs/expect', '2', 0), 
('VsCode has loads of extentions check them out to see what they can do for you!', 'https://code.visualstudio.com/docs/editor/extension-marketplace', '2', 0),
('Always test your code, it is part of writing clean code', 'https://levelup.gitconnected.com/javascript-clean-code-test-driven-development-91c48687fb5e', '2', 0),
('Try psudocoding out what you want to do in plain written language before coding', 'https://www.khanacademy.org/computing/computer-programming/programming/good-practices/pt/planning-with-pseudo-code', '1', 0),
('TCP can be frustrating, but here is a little help', 'https://www.section.io/engineering-education/tcp-node/', '3',0 ),
('Read up on middleware, it is important to understand what it can do in express', 'https://expressjs.com/en/guide/using-middleware.html', '3',0 ),
('console.log() and your terminal are your best friends when debugging. Always read the error and where it is from.', 'https://developer.mozilla.org/en-US/docs/Web/API/Console/log', '1', 0),
('Need to get all the entries from an array? Use .map()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map', '1', 0),
('Need to add to the end of an array? Use .push()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push', '1', 0),
('Need to grab a copy of some data in an array? Use .slice()', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice', '1', 0), 
('Here is a syntax sheet for SQL', 'https://www.sqltutorial.org/sql-cheat-sheet/', '2', 0),
('Write small and re-usable functional components that would be looking cleaner and easier to read', 'https://intersog.com/blog/reactway/', '2', 0),
('When you write a code, always think about your team and people who will probably work with this code later.', 'https://intersog.com/blog/reactway/', '2', 0),
('Dont Use Props in Initial State', 'https://www.geeksforgeeks.org/7-react-best-practices-every-web-developer-should-follow/', '2', 0),
('React Hook Info', 'https://www.geeksforgeeks.org/introduction-to-react-hooks/', '2', 0),
('SQL Cheat Sheet', 'http://www.cheat-sheets.org/sites/sql.su/', '2', 0),
('CRUD routes', 'https://medium.com/@shubhangirajagrawal/the-7-restful-routes-a8e84201f206#:~:text=There%20must%20be%20a%20way,PUT%2C%20and%20DELETE%2C%20respectively.', '2', 0 ),
('What is an API', 'https://www.tiempodev.com/blog/a-simple-api-definition-and-how-apis-work/', '2', 0),
('What is an API key', 'https://www.tiempodev.com/blog/what-is-an-api-key/', '2', 0),
('Clean Code-good article', 'https://enos.itcollege.ee/~jpoial/oop/naited/Clean%20Code.pdf', '3', 0),
('OAuth DOCS', 'https://oauth.net/2/', '3', 0), 
('MDN DOCS', 'https://developer.mozilla.org/en-US/', '3', 0), 
('JEST DOCS', 'https://jestjs.io/docs/getting-started', '3', 0), 
('Superagent DOCS', 'https://visionmedia.github.io/superagent/', '3', 0),
('terminal cheat sheet', 'https://www.git-tower.com/blog/command-line-cheat-sheet/', '1', 0),
('git command cheat sheets', 'https://education.github.com/git-cheat-sheet-education.pdf', '1', 0),
('SQL agg cheat sheet', 'https://www.codecademy.com/learn/learn-sql/modules/learn-sql-aggregate-functions/cheatsheet', '3', 0),
('Practice how to ask good questions', 'https://www.freecodecamp.org/news/asking-effective-questions-a-practical-guide-for-developers/', '1', 0),
('Try out some code challenges', 'https://www.codewars.com/', '2', 0), 
('Try out some code challenges', 'https://www.codecademy.com/resources/blog/10-javascript-code-challenges-for-beginners/', '1', 0),
('Some CSS tips', 'https://www.webdesignerdepot.com/2016/10/20-essential-css-tricks-every-designer-should-know/', '1', 0),
('Back-End VS. Front-End', 'https://www.guru99.com/front-end-vs-back-end-developers.html', '3', 0),
('What is CI?', 'https://www.cloudbees.com/continuous-delivery/continuous-integration', '2', 0),
('.length- chceck this out, you will thank me later', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length', '1', 0 ),
('Bookmark this- help for your front end apps', 'https://www.netlify.com/', '2', 0),
('Bookmark this- help for for your back end apps', 'https://id.heroku.com/login', '2', 0),
('A handy tool for markdown', 'https://www.tablesgenerator.com/markdown_tables', '1', 0),
('Chart.js', 'https://www.chartjs.org/', '2', 0),
('Pretty coolors for projects', 'https://coolors.co/', '1', 0),
('Take this for a read, it may be life changing', 'https://bradfrost.com/blog/post/atomic-web-design/', '2', 0),
('loops on loops on loops', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration', '1', 0),
('Keyboard shortcuts!!', 'https://itnext.io/keyboard-shortcuts-for-a-developer-e6d1203774f6', '1', 0);;


INSERT INTO funny (entree, course_id, times_viewed) VALUES 
('It is looking like you might need a HARD refresh', '2', 0),
('comments from canvas--CI not passing', '2', 0),
('remember that one time Dan was a on a "roll" in the Role Model........', '3', 0 ),
('you forget to ACP.....P(heroku for life)', '2', 0),
('find s any s hidden s Ss today s?', '2', 0),
('Play now, code later', '1', 0),
('you will need this...trust the process', '1', 0),
('you got this!! byId', '2', 1),
('it is probably on that half line...ya know, 34 and half', '1', 1),
('I can see your mouth moving but I think you are muted', '1', 1), 
('Can you open your model? okay,can you open your controller? okay, back over to your model? okay, now can you open your controller', '3', 0), 
('Just gotta fiddle with it', '3', 0), 
('Words are hard today', '2', 0), 
('express > tcp', '3', 0), 
('holy smokes-thats a BIGINT!', '3', 0), 
('DROP THAT TABLE LIKE ITS HOT!', '2', 0), 
('Is your server running? BETTER GO CATCH IT', '3', 0), 
('anything better than a 10 outta 0 on a lab??', '2', 0), 
('A son asked his father (a programmer) why the sun rises in the east, and sets in the west. His response? It works, dont touch!', '3', 0), 
('How many programmers does it take to change a light bulb? None, thats a hardware problem.', '3', 0), 
('Algorithm: Word used by programmers when they dont want to explain what they did.', '3', 0),
('If debugging is the process of removing bugs, then programming must be the process of putting them in.', '3', 0), 
('To understand what recursion is, you must first understand recursion', '3', 0), 
('The best thing about a boolean is even if you are wrong, you are only off by a bit.', '1', 0), 
('Theres no place like 127.0.0.1.', '3', 0), 
('I have not failed. Ive just found 10,000 ways that wont work.', '2', 0), 
('There is no Ctrl-Z in life.', '1', 0), 
('Potential partners are like internet domain names — the ones I like are already taken.', '3', 0), 
('A program is never less than 90% complete and never more than 95% complete.', '3', 0), 
('In a room full of top software designers, if two agree on the same thing, thats a majority.', '2', 0), 
('One mans crappy software is another mans full-time job.', '3', 0), 
('Deleted code is debugged code.', '3', 0), 
('Its not a bug — its an undocumented feature.', '3', 0), 
('Copy-and-Paste was programmed by programmers for programmers actually', '1', 0), 
('Q: Is the glass half-full or half-empty? A: The glass is twice as big as it needs to be.', '3', 0), 
('Q: What did the HTML coding dog say? A: Href Href!!', '1', 0), 
('I used to code alot of HTML but now its just some<BODY> that I used to know', '1', 0), 
('#lego { display: block; }', '1', 0), 
('#tower-of-pisa {font-style: italic;}', '1', 0), 
('#periodic {display: table;}', '1', 0), 
('#muscles {display: flex;}', '1', 0), 
('#chucknorris {color: #BADA55;)', '1', 0), 
('const dogs = [{ name: benny, age: 6.5, B-day: May 22, AdptOn: July 22 },
{name: Ruby, age: 10, B-day: June 18th }, {name: jeep, age}]', '2', 0), 
('q. Why did the child component have such great self-esteem? a. Because its parent kept giving it props!', '2', 0), 
('q. Why did the react class component feel relieved? a. Because it was now off the hook.', '2', 0), 
('q. How do you comfort a JavaScript bug? a. You console it', '2', 0), 
('q. Why do developer trolls love the terminal? a. Because their past-time is bashing!', '2', 0), 
('q. Why was the JavaScript developer sad? a. Because they did not Node how to Express himself', '2', 0), 
('dev1 > What tool do you use to switch versions of node? dev1> nvm, I figured it out.', '2', 0);


INSERT INTO users (id, username, name) VALUES
('TRIANA1234', 'trianac', 'triana'),
('AEMILIUS1234', 'aemiliusM', 'aemilius'),
('SIMON1234', 'simonk', 'simon');

INSERT INTO favorite( user_id, tips_id, funny_id) VALUES
('TRIANA1234', null, '3'),
('TRIANA1234', null, '8'),
('AEMILIUS1234', '4', null),
('AEMILIUS1234', null, '2'),
('SIMON1234', null, '5'),
('SIMON1234', '1', null),
('SIMON1234', null, '10')

