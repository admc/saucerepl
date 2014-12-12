FROM dockerfile/nodejs

# Set the working directory
WORKDIR   /src

RUN npm install wd -g
#RUN npm install tty.js

# Bundle app source
COPY . /src

# Install app dependencies
RUN cd src && npm install .

EXPOSE  3000

#CMD ["/bin/bash"]
CMD ["node", "/src/src/bin/tty.js", "--port", "3000"]
