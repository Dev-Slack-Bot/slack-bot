CREATE TABLE course (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    course TEXT NOT NULL
);


CREATE TABLE tips (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    tip TEXT NOT NULL,
    tip_url URL,
    course_id BIGINT NOT NULL,
    times_viewed INT
);

CREATE TABLE funny (
    id BIGINT GENERATED ALWAYS AS PRIMARY KEY,
    entree TEXT NOT NULL,
    course_id BIGINT NOT NULL,
    times_viewed INT
);

INSERT INTO course (course) VALUES ('Career Track'), ('Foundations_1'), ('Foundations_2');

