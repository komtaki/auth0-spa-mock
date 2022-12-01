FROM public.ecr.aws/docker/library/node:18.12.1-alpine

ENV TZ=Asia/Tokyo

WORKDIR /app

RUN chown node:node .

USER node

COPY --chown=node ./app/package.json ./app/package-lock.json ./app/tsconfig.json ./app/openapi.yml ./

RUN npm ci

COPY --chown=node:node ./app/bin ./bin
COPY --chown=node:node ./app/config ./config
COPY --chown=node:node ./app/src ./src

CMD ["npm", "run", "start"]