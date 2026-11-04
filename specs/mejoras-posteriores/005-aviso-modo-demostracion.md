# Spec 005 — Aviso de prototipo de demostración

Estado: borrador para validación de Jorge.

## 1. Problema
La aplicación es un prototipo de demostración en un entorno de prueba, pero quien la recibe no lo sabe. Podría ingresar datos reales de familias
o creer que la aprobación del Validation Lead identifica a una persona, cuando hoy no identifica a nadie.

## 2. Solución
Un aviso fijo y visible arriba de la aplicación: es un prototipo de demostración, se deben ingresar solo datos ficticios,
la aprobación no identifica a nadie y los datos quedan solo en ese navegador. Se traduce con el selector de idioma.

## 3. Criterios de aceptación
- CA19. La aplicación muestra el aviso de prototipo de demostración, visible al cargar, antes del segmento Spec.
- CA20. El aviso cambia con el idioma; en Mapudungun queda en español.
