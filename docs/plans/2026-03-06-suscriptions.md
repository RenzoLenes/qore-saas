# Contexto del sistema de suscripciones SaaS

El sistema es un SaaS que maneja planes de suscripción mensuales.
Actualmente existen tres planes:

* Starter
* Professional
* Business

El sistema utiliza la API de suscripciones (**preapproval**) de Mercado Pago para gestionar los cobros recurrentes.

Cada usuario tiene una suscripción activa asociada a un ciclo de facturación mensual.

Ejemplo de ciclo:

* Inicio: 1 de febrero
* Fin: 1 de marzo
* En esa fecha se realiza el siguiente cobro automático mediante Mercado Pago.

El sistema debe permitir tres acciones principales sobre la suscripción:

1. Upgrade de plan
2. Downgrade de plan
3. Cancelación de suscripción

Las reglas de negocio se definen a continuación.

---

# 1. Regla de negocio: Upgrade de plan

Cuando un usuario cambia a un plan superior (por ejemplo Starter → Professional o Professional → Business), el cambio debe aplicarse inmediatamente.

Para evitar que el usuario use el plan superior sin pagar la diferencia, se debe calcular un prorrateo del tiempo restante del ciclo de facturación actual.

El flujo debe ser el siguiente:

1. El usuario solicita un upgrade de plan.
2. El backend calcula el prorrateo considerando:

   * precio del plan actual
   * precio del nuevo plan
   * días restantes del ciclo de facturación.
3. Se calcula la diferencia proporcional que el usuario debe pagar.
4. Se genera un pago único mediante Mercado Pago (checkout o preferencia de pago).
5. El usuario paga ese monto.
6. Cuando el webhook confirme `payment.approved`, el sistema:

   * actualiza el plan del usuario
   * actualiza el monto de la suscripción en Mercado Pago mediante `PUT /preapproval/{id}`
   * el nuevo monto se aplicará en el siguiente ciclo de facturación.

Importante:

* El ciclo de facturación NO debe cambiar.
* Solo se actualiza el precio de la suscripción para el próximo cobro.

Ejemplo:

Plan actual: Starter ($20)
Nuevo plan: Professional ($50)
Ciclo actual: 1 Feb → 1 Mar
Upgrade: 10 Feb

El sistema calcula el prorrateo por los días restantes y genera un pago inmediato por la diferencia.

Después del pago:

* el usuario usa Professional inmediatamente
* el 1 de marzo Mercado Pago cobrará $50 automáticamente.

---

# 2. Regla de negocio: Downgrade de plan

Cuando un usuario cambia a un plan inferior (por ejemplo Business → Professional o Professional → Starter), el cambio NO debe aplicarse inmediatamente.

El downgrade debe aplicarse únicamente al final del ciclo de facturación actual.

Flujo:

1. El usuario solicita downgrade.
2. El backend registra el cambio como pendiente.
3. El usuario continúa usando su plan actual hasta el final del ciclo.
4. Cuando se alcance la fecha `billing_cycle_end`, el sistema:

   * cambia el plan al plan inferior
   * actualiza el monto de la suscripción en Mercado Pago.

Esto evita:

* reembolsos
* prorrateos negativos
* complejidad contable.

---

# 3. Regla de negocio: Cancelación de suscripción

Si un usuario cancela su suscripción:

1. Se cancela la renovación automática en Mercado Pago.
2. El usuario mantiene acceso al sistema hasta el final de su ciclo de facturación actual.
3. No se realizan reembolsos por el periodo ya pagado.

Ejemplo:

Ciclo: 1 Feb → 1 Mar
Cancelación: 10 Feb

El usuario puede seguir usando el sistema hasta el 1 de marzo.
Después de esa fecha la cuenta pasa a estado cancelado o plan gratuito.

---

# 4. Manejo de pagos de prorrateo

Cuando se genera un upgrade:

* el sistema debe crear un registro de pago tipo `proration_upgrade`
* el estado inicial es `pending`
* solo cuando el webhook de Mercado Pago confirme `payment.approved`, se aplicará el upgrade.

Esto evita que el usuario obtenga el plan superior sin haber pagado.

También se debe prevenir la creación de múltiples pagos de prorrateo simultáneos para el mismo usuario.

---

# 5. Webhooks de Mercado Pago

El sistema debe escuchar webhooks de Mercado Pago para eventos de pago.

Cuando llegue un evento `payment.approved`:

1. Buscar el pago en la base de datos.
2. Si el tipo es `proration_upgrade`, entonces:

   * actualizar el plan del usuario
   * actualizar el monto de la suscripción en Mercado Pago.

---

# 6. Reglas adicionales

* El ciclo de facturación nunca debe reiniciarse durante upgrades.
* Los upgrades deben aplicarse solo después de confirmar el pago del prorrateo.
* Los downgrades deben ejecutarse automáticamente al final del ciclo de facturación.
* Debe evitarse que el usuario genere múltiples pagos de upgrade si uno ya está pendiente.

---

Este sistema debe garantizar:

* consistencia entre el plan del usuario y la suscripción en Mercado Pago
* ausencia de cobros duplicados
* control correcto de los ciclos de facturación.
