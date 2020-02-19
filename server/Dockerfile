FROM node:latest
RUN npm install -g json-server
WORKDIR /data
VOLUME /data
COPY db.json /data
EXPOSE 80
CMD ["json-server","/data/db.json"]