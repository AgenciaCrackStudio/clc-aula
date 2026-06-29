**PARTE 1 - BRIEF DE REQUERIMIENTOS: PLATAFORMA EDUCATIVA CLC**

**CONTEXTO DEL PROYECTO.** El Centro de Liderazgo Comercial (CLC) requiere el desarrollo desde cero de una plataforma educativa digital que opere como el núcleo tecnológico de toda su actividad académica y administrativa. La plataforma debe soportar programas de formación ejecutiva en modalidad B2C (profesionales individuales) y B2B (empresas que contratan formación para equipos). El estándar de experiencia de usuario es el de las mejores escuelas de negocios del mundo, tanto en la interfaz del alumno como en las herramientas de gestión interna. La plataforma debe estar completamente en español, con soporte de zonas horarias para múltiples países de hispanoamérica. El volumen operativo inicial proyectado es de 50 clases simultáneas con hasta 30 alumnos por clase (1,500 usuarios concurrentes). La arquitectura debe diseñarse para escalar a 5,000 usuarios concurrentes sin reingeniería.

**ESTRUCTURA ACADÉMICA.** CLC opera programas estructurados en 3 niveles. Cada nivel contiene 7 cursos. Cada curso se imparte en sesiones sincrónicas vía Zoom. Al completar un curso (criterios a definir: asistencia mínima + examen aprobado), el alumno obtiene una insignia digital. Al completar todos los cursos de un nivel, obtiene un certificado digital de nivel. Al completar todos los niveles, obtiene el certificado total del programa. Esta estructura debe ser completamente parametrizable desde el panel administrativo: el número de niveles, cursos por nivel, criterios de aprobación y nombres de los programas deben ser configurables sin requerir desarrollo adicional.

**MÓDULOS FUNCIONALES REQUERIDOS**

**MÓDULO 1 - GESTIÓN ACADÉMICA (COORDINADOR).** El coordinador académico debe poder crear un curso desde un panel administrativo, asignarle un profesor, una lista de alumnos, fechas y horarios de sesión, y materiales de apoyo + evaluaciones. Al crear el curso, la plataforma dispara automáticamente: (a) correo de bienvenida al alumno con credenciales de acceso, resumen del programa y calendario de sesiones; (b) invitación de calendario (formato .ics) con el enlace Zoom a cada sesión, enviada al alumno y al profesor; (c) correo de confirmación al profesor con detalle del curso, lista de alumnos, empresa/cargo que ocupa y calendario. El coordinador debe poder gestionar múltiples cursos simultáneamente con visibilidad de estado (pendiente, activo, finalizado, con alertas de alumnos en riesgo académico). El sistema debe impedir la asignación de un profesor a dos cursos con sesiones solapadas en horario y alertar al coordinador antes de confirmar el conflicto. Reprogramaciones

**MÓDULO 2 - NOTIFICACIONES Y RECORDATORIOS.** La plataforma ejecuta recordatorios automáticos a alumnos y profesores en tres momentos: 24 horas antes de la sesión, 1 hora antes, y 15 minutos antes. Canales de envío: correo electrónico y WhatsApp (vía WhatsApp Business API). Los mensajes incluyen: nombre del alumno o profesor, nombre del curso, fecha y hora de la sesión ajustada a la zona horaria del destinatario, y enlace directo de acceso a Zoom ENLACE A LA PLATAFORMA. Las plantillas de mensajes deben ser editables por el administrador desde el panel.

Nota: El proveedor debe especificar si CLC necesita gestionar su propia cuenta de WhatsApp Business verificada ante Meta, o si el proveedor la gestiona. Este punto debe resolverse en la reunión de alineamiento dado que el proceso de verificación puede tomar semanas.

**MÓDULO 3 - CLASES SINCRÓNICAS Y REPOSITORIO.** Las sesiones en vivo se realizan a través de Zoom. La integración con Zoom API debe permitir: crear y programar reuniones desde el panel del coordinador sin acceder a Zoom directamente, que el alumno y el profesor se unan con un clic desde su interfaz sin necesidad de contraseña o descarga adicional, y registrar asistencia automáticamente por sesión. Al finalizar cada sesión, la grabación debe estar disponible en el repositorio del curso en un máximo de 2 horas.

Adiscutir / alinear: El repositorio de cada curso contiene: grabaciones de cada sesión, presentación usada por el profesor (PPT o PDF), y archivos de apoyo adicionales que el profesor pueda subir antes, durante o después de la sesión. El acceso al repositorio está restringido a los alumnos matriculados en el curso y al coordinador. CLC requiere retención mínima de grabaciones por 12 meses. El proveedor debe especificar el costo de almacenamiento y la integración con Zoom Cloud Recording o almacenamiento propio.

MANUALMENTE CLC SUBIRA LOS VIDEOS A YOUTUBE DESCARGANDOLOS DE ZOOM, VER FORMA DE PROVEER ESE VIDEO A ADMINISTRACIÓN

**MÓDULO 4 - EVALUACIONES Y PROGRESIÓN ACADÉMICA.** Al finalizar cada curso, el alumno completa un examen en la plataforma. Si aprueba (puntaje mínimo configurable por curso), avanza al siguiente. Si no aprueba, tiene derecho a un segundo intento. Si falla el segundo intento, el sistema notifica al coordinador para gestión manual del caso. Los exámenes deben soportar: opción múltiple, verdadero/falso, y respuesta corta. El banco de preguntas debe permitir al coordinador configurar los exámenes. Los resultados quedan registrados en el historial del alumno. La plataforma impide el acceso al siguiente curso si el alumno no ha aprobado el anterior. El coordinador debe poder ver todos los intentos de examen por alumno y curso.

Opción 1: Si fallaste, no decir cuales fallaron pero si cual fue la nota

Opción 2:

Certificado condicional a una nota aprobatoria más no restrictiva para continuar con el curso

Insignias se obtiene con nota minima

OBTENER NOTA DE 14 PARA EL CERTIFICADO

**MÓDULO 5 - CREDENCIALES DIGITALES.** Al aprobar cada curso, la plataforma emite automáticamente una insignia digital (badge) en el perfil del alumno con la posibilidad de exportarlo para ser usado en redes sociales (específicamente Linkedin e Instagram) ESTO ES ALGO APRA DESCARGAR COMO HISTORIA O CERTIFCAIDO. Al completar todos los cursos de un nivel, emite un certificado digital de nivel. Al completar todos los niveles, emite el certificado total del programa. Los certificados deben seguir las plantillas de diseño que proveerá la agencia de diseño de CLC. Cada certificado incluye: nombre del alumno, nombre del programa o nivel, fecha de emisión, y un código de verificación único con URL pública que permita a terceros (empleadores, headhunters) verificar autenticidad sin necesidad de crear cuenta. El alumno puede descargar certificados e insignias en PDF y compartirlos directamente en LinkedIn desde la plataforma.

CERTIFICADO VISUALMENTE PARA VERLO DESDE UN ENLACE

**MÓDULO 6 - DASHBOARD DEL ALUMNO.** El alumno tiene un panel personal con: progreso en el programa (cursos completados, pendientes, nivel actual representado visualmente), insignias y certificados obtenidos, historial de notas y resultados de exámenes por curso, calendario de próximas sesiones con acceso directo a Zoom, y acceso al repositorio de materiales de cada curso en el que está matriculado. La interfaz debe estar completamente optimizada para móvil (responsive design). El diseño debe seguir la identidad visual de CLC - la plataforma es white-label: ninguna referencia al proveedor tecnológico debe ser visible para el alumno.

**MÓDULO 7 - FORO DE DISCUSIÓN POR CURSO.** (Omisión incorporada.) Cada curso debe tener un espacio de interacción entre sesiones donde alumnos y profesor puedan publicar preguntas, respuestas y recursos. El profesor puede fijar mensajes importantes. El coordinador tiene acceso de lectura a todos los foros. Sin este módulo, la experiencia académica entre clases queda sin soporte y la plataforma no alcanza el estándar de las instituciones de referencia.

SERIAN COMENTARIOS SOBRE EL VIDEO DE LA CLASE HECHA SOBRE LA GRABACIÓN REALIAZADA POR ZOOM

**MÓDULO 8 - DASHBOARD DE DIRECCIÓN.** El equipo directivo de CLC accede a un panel de solo lectura con: rendimiento individual de cada alumno (asistencia por sesión, notas, progresión, cursos completados), ranking de alumnos por programa para identificación de top talent, tasas de aprobación y deserción por curso y por nivel, comparativas entre cohortes y programas, y resultados consolidados de encuestas de satisfacción. Este panel es independiente del panel operativo del coordinador.

QUIEREN VER NPS = EVALUACIONES DE CLASES Y PROFES

**MÓDULO 9 - GESTIÓN DE PROFESORES.** El coordinador gestiona el plantel desde un módulo específico que incluye: perfil de cada profesor (nombre, bio, foto, especialidades), registro de horas dictadas por mes y por curso (alimenta el módulo financiero), agenda con visibilidad de todos los cursos y sesiones asignadas, y alerta automática ante conflictos de horario en el momento de la asignación. El sistema calcula automáticamente los honorarios devengados por profesor según tarifa-hora configurada en el perfil.

LOS PROFESORES TENDRAN HONORARIOS DISTINTOS POR HORAS + CONSTANCIAS DE PAGO

COORDINADOR CREARA LOS USUARIOS DE PROFESORES

**MÓDULO 10 - ENCUESTA DE SATISFACCIÓN POST-CURSO | NPS.** (Omisión incorporada.) Al finalizar cada curso, la plataforma envía automáticamente una encuesta de evaluación del profesor y del contenido. Los resultados se registran en el dashboard de dirección con promedio por profesor y por curso. Sin este mecanismo CLC no tiene sistema estructurado de control de calidad académica.

PREGUNTAS AL FINAL DE CLASE O NOTIFICACIÓN PARA QUE EVALUE (NO ES OBLIGATORIO Y ANONIMO)

**MÓDULO 11 - COMMERCIAL SOCIETY (ALUMNI).** Espacio privado dentro de la plataforma accesible únicamente a alumnos que hayan completado al menos un programa completo y tengan membresía activa pagada. Funcionalidades: directorio de miembros con filtros por industria, cargo y país, foros de discusión por temas, y acceso a contenido exclusivo (eventos, masterclasses, recursos). La membresía tiene cobro recurrente (anual) gestionado por la plataforma. El acceso se activa automáticamente al verificarse el pago y el cumplimiento del requisito académico. El acceso se suspende automáticamente si el pago recurrente falla, con notificación previa al alumno.

Nota: Al finalizar un programa, el alumno tendrás acceso a la red alumno gratis por los siguientes 2 meses. Luego de eso, deberá efectuar el pago para seguir activo en la red

DENTRO DE LA PLATAFORMA

**MÓDULO 12 - MATRÍCULAS Y PAGOS.** La plataforma gestiona el ciclo completo de inscripción y cobro. B2C: el alumno selecciona el programa, visualiza el costo, paga en línea (tarjeta de crédito/débito y transferencia bancaria), y recibe automáticamente el comprobante de pago (boleta o factura electrónica). Para Perú, integración con sistema de facturación electrónica compatible con SUNAT. Para otros países, la integración debe ser adaptable a las regulaciones locales según la expansión de CLC (STRIPE). B2B: el coordinador crea matrículas grupales, asigna múltiples alumnos, y genera factura consolidada a nombre de la empresa. El sistema emite alertas automáticas (correo y WhatsApp) a alumnos con pagos vencidos o próximos a vencer, y a alumnos a punto de iniciar un nuevo curso sin haber completado su inscripción. El módulo debe soportar: códigos de descuento y promociones configurables, gestión de lista de espera para programas con cupo lleno, y procesamiento de reembolsos parciales o totales con emisión de nota de crédito correspondiente.

**MÓDULO 13 - PANEL FINANCIERO.** El equipo directivo accede a un panel financiero con: ingresos totales y desglosados por programa y curso en tiempo real, estado de pagos por alumno (pagado, pendiente, vencido), proyección de ingresos por matrículas confirmadas en programas próximos, honorarios devengados por profesor según horas registradas y tarifa configurada, y control de uso de Zoom (horas de reunión consumidas por mes y por curso, para seguimiento presupuestal frente al plan contratado).

**MÓDULO 14 - SOPORTE AL ALUMNO.** (Omisión incorporada.) La plataforma debe incluir un canal visible de soporte dentro de la interfaz del alumno - mínimo un formulario de ticket o chat con el equipo de coordinación. El alumno no debe tener que salir de la plataforma ni usar canales externos para reportar un problema técnico o académico. El coordinador debe poder ver y gestionar los tickets abiertos desde su panel.

**REQUERIMIENTOS TÉCNICOS NO FUNCIONALES**

**1\. Disponibilidad:** SLA mínimo de 99.5% de uptime. Los mantenimientos programados deben ejecutarse fuera del horario de clases (considerar múltiples zonas horarias). El proveedor debe comprometer un procedimiento de comunicación ante incidentes con tiempos de respuesta definidos.

**2\. Rendimiento:** Tiempo de carga de páginas inferior a 3 segundos bajo carga normal. La plataforma debe soportar 1,500 usuarios concurrentes en fase inicial con arquitectura preparada para escalar a 5,000 sin rediseño.

**3\. Seguridad:** Autenticación con usuario y contraseña con opción de autenticación de dos factores (2FA). Cifrado de datos en tránsito (TLS 1.2 mínimo) y en reposo. Política de contraseñas seguras configurable. Registro de auditoría de accesos y acciones administrativas. Protección contra ataques comunes (OWASP Top 10).

**4\. Protección de datos:** Cumplimiento con la Ley 29733 de Protección de Datos Personales de Perú. La arquitectura debe ser adaptable a las regulaciones de protección de datos de otros países hispanoamericanos (Colombia, México, Chile, Argentina) conforme CLC expanda operaciones. El proveedor debe especificar dónde se almacenan los datos y bajo qué política.

**5\. Almacenamiento de grabaciones:** Las grabaciones de sesiones Zoom generan volumen significativo. El proveedor debe especificar: si el almacenamiento es en Zoom Cloud, en servidor propio o en servicio de terceros (AWS S3 o equivalente), el costo mensual estimado por volumen de grabaciones, y el período de retención garantizado (CLC requiere mínimo 12 meses).

**6\. Hosting y latencia:** El servidor debe estar ubicado en una región con baja latencia para Perú y principales mercados hispanoamericanos. Opciones recomendadas: AWS us-east-1 o sa-east-1, Google Cloud southamerica-east1. El proveedor debe presentar su propuesta de infraestructura con justificación de la elección de región.

**7\. Respaldos:** Backup diario automático de base de datos y archivos con retención mínima de 30 días. Procedimiento documentado de recuperación ante desastres con tiempo de recuperación objetivo (RTO) y punto de recuperación objetivo (RPO) definidos contractualmente.

**8\. Accesibilidad:** La plataforma debe cumplir con estándares WCAG 2.1 nivel AA para garantizar acceso a usuarios con discapacidades visuales o motoras.

**INTEGRACIONES REQUERIDAS**

**1\. Zoom API:** Creación y programación de reuniones, gestión de participantes, registro de asistencia automático, y acceso a grabaciones. El proveedor debe especificar qué plan de Zoom es necesario y quién gestiona la cuenta maestra.

**2\. WhatsApp Business API:** Para notificaciones automatizadas de recordatorios y alertas de pago. Requiere cuenta de WhatsApp Business verificada ante Meta. El proveedor debe aclarar si CLC debe gestionar su propia cuenta o si el proveedor provee este servicio. El proceso de verificación puede tomar 2-4 semanas y debe iniciarse de inmediato.

**3\. Pasarela de pagos:** Compatible con tarjetas de crédito y débito en Perú y LATAM. Opciones a evaluar: Culqi (Perú), Mercado Pago (LATAM), Stripe. El proveedor debe recomendar la opción con mejor cobertura para el mercado objetivo y menores comisiones por transacción.

**4\. Facturación electrónica:** Para Perú, integración con un proveedor de OSE/PSE homologado por SUNAT para emisión de boletas y facturas electrónicas. Para otros países, la integración debe ser modular y adaptable.

**5\. Correo transaccional:** Servicio de envío de correos de alto volumen (invitaciones, recordatorios, notificaciones de pago, credenciales). Opciones: SendGrid, Amazon SES, Mailgun. El proveedor debe garantizar alta tasa de entrega (deliverability) y monitoreo de rebotes.

**6\. LinkedIn:** Para compartir certificados e insignias directamente desde la plataforma al perfil del alumno mediante la API de certificaciones de LinkedIn.

**PUNTOS ABIERTOS QUE DEBEN RESOLVERSE EN LA REUNIÓN**

**1\.** ¿El proveedor gestiona la cuenta de WhatsApp Business de CLC o CLC debe obtenerla directamente ante Meta? Definir responsabilidad y cronograma dado el tiempo de verificación.

**2\.** ¿Qué plan de Zoom se requiere para soportar 50 reuniones simultáneas con 30 participantes cada una? ¿Quién es el titular de la cuenta Zoom maestra?

**3\.** ¿El almacenamiento de grabaciones está incluido en el costo del desarrollo o es un costo operativo recurrente separado? Definir modelo de costos.

**4\.** ¿Qué proveedor de facturación electrónica se utilizará para Perú? El proveedor debe confirmar que tiene integración previa con al menos un OSE homologado por SUNAT.

**5\.** ¿Cuál es el tiempo estimado de desarrollo y cuáles son los hitos de entrega por módulo? CLC necesita una hoja de ruta con fechas de entrega parciales para planificar el lanzamiento de los primeros programas.

**6\.** ¿El proveedor ofrece ambiente de staging (preproducción) para pruebas antes de cada despliegue en producción?

**7\.** Definir el proceso de transferencia de conocimiento y documentación técnica al finalizar el desarrollo. CLC debe poder realizar mantenimientos menores sin depender exclusivamente del proveedor.


# Orden de desarrollo:
*S1* — Kickoff, estrategia, arquitectura y diseño · Roles administrativos · Gestión de usuarios. 3 landings por vertical (S1–S2, se espera diseño) · SEO base por vertical · Google Analytics 4 + Google Tag Manager (junto con landings). 
*S2* — Gestión académica base · Clases grabadas embebidas · Materiales descargables · Dashboard del alumno
*S3* — Calendario y links Zoom · Sesiones de Zoom · Zoom API avanzado (se espera gestión de Zoom) · Historial de asistencia y próximas clases · Evaluaciones por nivel.
*S4* (checkout stripe y culqi) — Registro de asistencia automático con información del propio sistema · Tienda con filtros · Carrito + checkout · Yape manual · Transferencia bancaria manual · Integración con Culqi dólares · Integración con Stripe dólares (estimado S4, se espera gestión de pasarelas).
*S5* — Certificación por nivel · Certificados y credenciales · Evaluación NPS de contenido y profesores · Tickets de soporte al alumno · Pagos (reembolsos por API).
*S6* — Matrículas grupales B2B · Reportes básicos · Ventas y estados de pago · Dashboard de dirección.

Transversales (todo el proyecto): Correos transaccionales · Soporte de zonas horarias para múltiples países de Hispanoamérica · 2FA, auditoría, backups, SLA, rendimiento.

*S7–S8* — QA, ajustes por hito (pueden ir en medio de cualquiera de esas semanas)

NO tener en cuenta las semanas pero si el orden en que va ir desarrollandose todo.