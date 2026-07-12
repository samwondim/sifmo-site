import * as migration_20240712_000000_initial from './20240712_000000_initial'

export const migrations = [
  {
    name: '20240712_000000_initial',
    up: migration_20240712_000000_initial.up,
    down: migration_20240712_000000_initial.down,
  },
]
