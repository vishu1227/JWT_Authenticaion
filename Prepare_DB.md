# Preparing the Mysql DB

```sql
create database JWT_Auth;

create user 'JWT'@'localhost' identified by 'JWT_token';

grant all privileges on JWT_Auth.* to JWT;

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, INDEX, DROP, ALTER, CREATE TEMPORARY TABLES, LOCK TABLES ON JWT_Auth.* TO 'JWT'@'localhost';
```
