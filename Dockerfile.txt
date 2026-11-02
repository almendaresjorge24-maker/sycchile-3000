# ==========================================
# SYCCHILE 3.000 - Dockerfile de Producción
# Gobernanza: JORGE ALMENDARES AROS
# Agentes: KALLPA ⇄ AURA
# ==========================================

FROM nginx:1.25-alpine

# Eliminar configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar la aplicación web optimizada
COPY index_v2.html /usr/share/nginx/html/index.html

# Exponer el puerto de servicio HTTP
EXPOSE 80

# Healthcheck para verificar el estado de la aplicación
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]