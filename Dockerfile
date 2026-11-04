# ==========================================
# SYCCHILE 3.000 - Dockerfile de Producción
# Gobernanza: JORGE ALMENDARES AROS
# Agentes: KALLPA ⇄ AURA
# ==========================================

# Nginx que corre SIN permisos de administrador dentro del contenedor
FROM nginxinc/nginx-unprivileged:stable-alpine

LABEL org.opencontainers.image.title="SYCCHILE 3.000 - Banco Solidario de Alimentos" \
      org.opencontainers.image.authors="Jorge Almendares Aros" \
      org.opencontainers.image.licenses="All rights reserved" \
      org.opencontainers.image.description="Gobernanza humana + trazabilidad FIFO (Kallpa / Aura)"

# Configuración propia de Nginx (reemplaza la que trae por defecto)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# La aplicación web (renombra tu HTML final a index.html)
COPY index.html /usr/share/nginx/html/index.html

# Puerto interno (el usuario sin privilegios no puede usar el 80)
EXPOSE 8080

# Verifica que la aplicación responda (127.0.0.1 evita fallos con IPv6)
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
