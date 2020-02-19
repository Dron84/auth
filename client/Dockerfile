FROM omegacoleman/vue-cli
WORKDIR /client
COPY . /client
RUN cd client && npm i
EXPOSE 8080
CMD [ "npm", "start" ]