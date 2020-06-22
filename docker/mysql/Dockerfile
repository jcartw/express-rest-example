
FROM mysql/mysql-server:5.7.30

EXPOSE 3306/tcp

COPY script.sql /docker-entrypoint-initdb.d/script.sql

WORKDIR /

CMD ["mysqld"]