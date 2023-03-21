FROM postgres
ENV POSTGRES_DB beyond_play
COPY ./beyond_play.sql /docker-entrypoint-initdb.d/