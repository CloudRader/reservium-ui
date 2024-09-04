RUN npm install
COPY . .
RUN napm build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/sites-available/react-app
EXPOSE 80
CMD [ "nginx", "-g", "daemon off;" ]