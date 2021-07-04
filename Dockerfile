FROM asia.gcr.io/nonprod-utility-233414/base-images/nginx_openresty:nginx_openresty-alpine-1.0.1

RUN mkdir -p /opt/x-search/www/stock-ui/2.0.0-7 \
  && mkdir -p /opt/stock-ui/params/ \
  && mkdir -p /opt/stock-ui/sites/


WORKDIR /opt/x-search/www/stock-ui

COPY ./target/com.gdn.x.ui.stock-ui/2.0.0-7 /opt/x-search/www/stock-ui/2.0.0-7

RUN ln -s 2.0.0-7 latest

RUN chown -R nginx:nginx /opt/stock-ui/ \
  && chmod -R 766 /opt/stock-ui/

EXPOSE 8080

CMD ["/opt/openresty/bin/openresty", "-g", "daemon off;"]
