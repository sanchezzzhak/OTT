# Open Traffic Tracker (OTT)

# The project is under development

 * Track for events in sites
 * Conversion analysis and effective sale traffic
 
### Node support versions (14.17.0, 17.1.0  or later)

# Install
```
git clone repository
yarn install
yarn build
``` 
create or edit `nano config/local/pg.config.js`
```js
/**
 * @docs https://github.com/moleculerjs/moleculer-db/tree/master/packages/moleculer-db-adapter-sequelize#readme
 */
const pgConfig = {
   dsn: `postgres://USERNAME:PASSWORD@localhost:5432/DATABASE`,
   options: {}
 };

module.exports = pgConfig;
```
create or edit `nano config/local/app.config.js`
```js
const appConfig = {
  port: 3001,       // server port listen
  ssl: {
    enable: false,  // use ssl 
    keyPath: "",    // server public ssl key (set path to file)
    certPath: ""    // server public ssl key (set path to file)
  },
  ws: {
    enable: false   // use websocket 
  },
  jwt: "",          // set random jwt key (json web token)
  telegram: '',     // set telegram bot key
};

module.exports = appConfig;
```
create config for supervisor
* create or edit `/etc/supervisor/conf.d/ott_app.conf`
```
[program:ott]
command=node /srv/www/ott/current/backand/index.js
autostart=true
autorestart=true
environment=NODE_ENV=production
stderr_logfile=/srv/www/ott/log/err.log
stdout_logfile=/srv/www/ott/log/out.log
```
* `supervisorctl reread`
* `supervisorctl update`
* create health check
edit and added `nano /etc/supervisor/conf.d/supervisord.conf`

Revers Proxy for NGINX

* create or edit `/etc/nginx/conf.d/ott-app.conf`
```
server {
    listen 80;
    server_name ott.mydomain.com;
    root        /srv/www/ott/current/public;
    index       index.html;    

    location / {
        try_files $uri @backend;
    }
    location @backend {
        proxy_set_header Host $host
        proxy_set_header X-Real-IP $remote_addr;
        proxy_pass http://localhost:3001;
    }
    location ~* /\. {
        deny all;
    }
}
```

### Road Map 2022
 * [ ] Microservices
 * [ ] Client tracker
 * [ ] Server tracker
 * [ ] Dashboard and Stat
