
FROM mysql/mysql-server:5.7.30

ENV MYSQL_ROOT_PASSWORD password123

EXPOSE 3306/tcp

COPY script.sql /docker-entrypoint-initdb.d/script.sql

WORKDIR /

CMD ["mysqld"]