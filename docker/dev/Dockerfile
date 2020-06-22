
FROM node:12.8.1-stretch

# Global Node Packages
RUN yarn global add pm2 mocha

# MySQL Client
RUN apt install mysql-client -y

WORKDIR /root

CMD ["/bin/bash"]