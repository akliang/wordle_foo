FROM node:17-alpine3.14

WORKDIR /app/code
RUN npm install tailwindcss
COPY . .

WORKDIR /app/code/deploy
ENTRYPOINT ["./make_output.sh"]
# USER 