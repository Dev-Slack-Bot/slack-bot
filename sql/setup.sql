DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS tips;
DROP TABLE IF EXISTS funny;
DROP TABLE IF EXISTS favorite;
DROP TABLE IF EXISTS users;

CREATE TABLE course (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    course TEXT NOT NULL
);

CREATE TABLE tips (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tip TEXT NOT NULL,
    tip_url TEXT,
    course_id BIGINT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id),
    times_viewed INT 

);

CREATE TABLE funny (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    entree TEXT NOT NULL,
    course_id BIGINT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(id),
    times_viewed INT
);

CREATE TABLE favorite (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    user_id TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    tips_id BIGINT,
    FOREIGN KEY (tips_id) REFERENCES tips(id),
    funny_id BIGINT,
    FOREIGN KEY (funny_id) REFERENCES funny(id)
);

CREATE TABLE users (
    id TEXT NOT NULL,
    username TEXT NOT NULL,
    name TEXT NOT NULL
);

INSERT INTO course (course) VALUES ('Foundations_1'), ('Foundations_2'), ('Career Track');
INSERT INTO tips (tip, tip_url, course_id, times_viewed) 
VALUES ('For help pracicing CSS flex, try Flexboxfroggy!', 'https://flexboxfroggy.com/', 1, '3'),
 ('Starting a new HTML doc? Try using html:5 at the start. Here is the Vscode link for html', 'https://code.visualstudio.com/docs/languages/html', '1', '1'),
  ('Dont forget your crabby hands! "<> </>" when making a component in react', 'https://reactjs.org/docs/react-component.html', '2', '4'), 
  ('Make sure you cd into your repo before you code .', 'https://www.codegrepper.com/code-examples/whatever/how+to+change+directory+in+mac+terminal', '1', '2'), 
  ('Breaks are important! Remember to get up and walk around!', 'https://www.health.harvard.edu/pain/the-dangers-of-sitting', '1', '1'),
  ('Dont struggle for too long on your own, ask for help when you need it', null, '1', '0');

INSERT INTO funny (entree, course_id, times_viewed) VALUES 
('It is looking like you might need a HARD refresh', '2', 1),
('comments from canvas--CI not passing', '2', 1),
('remember that one time Dan was a on a "roll" in the Role Model........', '3', 0 ),
('you forget to ACP.....P(heroku for life)', '2', 1),
('find s any s hidden s Ss today s?', '2', 1),
('Play now, code later', '1', null),
('you will need this...trust the process', '1', 0),
('you got this!! byId', '2', 1),
('it is probably on that half line...ya know, 34 and half', '1', null),
('I can see your mouth moving but I think you are muted', '1', null)


