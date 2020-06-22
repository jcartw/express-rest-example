
FROM node:12.8.1-stretch

# MySQL Client
RUN apt-get update --fix-missing
RUN apt-get install mysql-client -y

# Global Node Packages
RUN yarn global add pm2 mocha

WORKDIR /root

CMD ["/bin/bash"]