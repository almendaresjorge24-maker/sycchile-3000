FROM node:22-alpine
LABEL org.opencontainers.image.authors="Jorge Almendares Aros"
WORKDIR /app
COPY server.js .
USER node
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/api/agentes/salud || exit 1
CMD ["node", "server.js"]
