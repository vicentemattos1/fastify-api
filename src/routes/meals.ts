import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { checkSessionIdExists } from '../middlewares/check-session-id-exist'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const meals = await knex('meals').where({ user_id: request.user?.id })

    return {
      meals,
    }
  })

  app.get('/:id', { preHandler: [checkSessionIdExists] }, async (req) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getTransactionParamsSchema.parse(req.params)

    const meal = await knex('meals')
      .where({ id, user_id: req.user?.id })
      .first()

    return { meal }
  })

  app.post('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date format. Use ISO format or a parsable string.',
      }),
      is_on_diet: z.boolean(),
    })

    const { name, description, is_on_diet, date } = createMealBodySchema.parse(
      req.body,
    )

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      user_id: req.user?.id,
      is_on_diet,
    })

    return reply.status(201).send()
  })

  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(req.params)

      const meal = await knex('meals').where('id', id).first()

      if (!meal) {
        return reply.status(404).send({ error: 'Meal not found' })
      }

      const updateMealBodySchema = z.object({
        user_id: z.string().uuid(),
        name: z.string(),
        description: z.string(),
        date: z.string().refine((val) => !isNaN(Date.parse(val)), {
          message: 'Invalid date format. Use ISO format or a parsable string.',
        }),
        is_on_diet: z.boolean(),
      })

      const { date, description, name, is_on_diet } =
        updateMealBodySchema.parse(req.params)

      await knex('meals').where({ id }).update({
        name,
        description,
        is_on_diet,
        date,
      })
      return reply.status(204).send()
    },
  )

  app.patch(
    '/:id/is_on_diet',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getTransactionParamsSchema.parse(req.params)

      const meal = await knex('meals').where({ id }).first()

      if (!meal) {
        return reply.status(404).send({ error: 'Meal not found' })
      }

      const updateMealBodySchema = z.object({
        is_on_diet: z.boolean(),
      })

      const { is_on_diet } = updateMealBodySchema.parse(req.params)

      await knex('meals').update({ is_on_diet })

      return reply.status(204).send()
    },
  )

  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (request, reply) => {
      const paramsSchema = z.object({ id: z.string().uuid() })

      const { id } = paramsSchema.parse(request.params)

      const meal = await knex('meals')
        .where({ id, user_id: request.user?.id })
        .first()

      if (!meal) {
        return reply.status(404).send({ error: 'Meal not found' })
      }

      await knex('meals').where({ id }).delete()

      return reply.status(204).send()
    },
  )
}
