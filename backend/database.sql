-- CREATE DATABASE jobBoard;

-- use jobBoard;

-- CREATE TABLE peoples(
--     id INT AUTO_INCREMENT,
--     first_name VARCHAR(254),
--     last_name VARCHAR(254),
--     email VARCHAR(254),
--     phone VARCHAR(254),
--     role VARCHAR(254),
--     PRIMARY KEY(id)
-- );

-- CREATE TABLE companies(
--     id INT AUTO_INCREMENT,
--     name VARCHAR(254),
--     description LONGTEXT,
--     PRIMARY KEY(id)
-- );


-- CREATE TABLE advertisements(
--     id INT AUTO_INCREMENT,
--     title VARCHAR(254),
--     resume LONGTEXT,
--     description LONGTEXT,
--     company_id INT,
--     wage FLOAT,
--     place VARCHAR(254),
--     working_time LONGTEXT,
--     PRIMARY KEY(id),
--     FOREIGN KEY (company_id) REFERENCES companies(id)
-- );

-- CREATE TABLE applications(
--     id INT AUTO_INCREMENT,
--     applicant_id INT,
--     advertisement_id INT,
--     status ENUM('pending', 'interviewed', 'rejected', 'accepted'),
--     applied_at DATE,
--     update_at DATE,
--     PRIMARY KEY(id),
--     FOREIGN KEY(applicant_id) REFERENCES peoples(id),
--     FOREIGN KEY(advertisement_id) REFERENCES advertisements(id)
-- );

-- CREATE TABLE application_communications(
--     id INT AUTO_INCREMENT,
--     job_application_id INT,
--     sender_id INT,
--     receiver_id INT,
--     email_subject LONGTEXT,
--     email_body LONGTEXT,
--     sent_at DATE,
--     status ENUM('sent', 'delivered', 'opened'),
--     PRIMARY KEY(id),
--     FOREIGN KEY(job_application_id) REFERENCES applications(id),
--     FOREIGN KEY(sender_id) REFERENCES peoples(id),
--     FOREIGN KEY(receiver_id) REFERENCES peoples(id)
-- );

-- OUTDATED