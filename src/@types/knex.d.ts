// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables.d.ts' {
  interface Tables {
    users: {
      id: string
      session_id: string
      name: string
      email: string
      created_at: string
      updated_at: string
    }
    meals: {
      id: string
      name: string
      description: string
      user_id: string
      date: string
      created_at: string
      updated_at: string
      is_on_diet: boolean
    }
  }
}
