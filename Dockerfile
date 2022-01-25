FROM node:16-slim
WORKDIR /app
COPY dist /app/dist
CMD ["node", "/app/dist/alacarte/server/main.js"]
EXPOSE 8080
