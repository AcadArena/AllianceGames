import { v4 as uuidV4 } from "uuid"
import { z } from "zod"

export const vetoTeamSchema = z.union([z.literal("teamA"), z.literal("teamB")])
export type VetoTeam = z.infer<typeof vetoTeamSchema>
export const vetoActionSchema = z.union([
  z.literal("ban"),
  z.literal("pick"),
  z.literal("decider"),
])
export type VetoAction = z.infer<typeof vetoActionSchema>

export const vetoSideSchema = z.union([z.literal("red"), z.literal("blue")])

export const vetoItemStatusSchema = z.union([
  z.literal("pending"),
  z.literal("awaitingMapPick"),
  z.literal("awaitingSidePick"),
  z.literal("complete"),
])

export const vetoSequenceSchema = z.number().min(0)

export const CoinTeamResultSchema = z.union([
  z.literal("winner"),
  z.literal("loser"),
])
export type CoinTeamResult = z.infer<typeof CoinTeamResultSchema>

export const coinSide = z.union([z.literal("heads"), z.literal("tails")])

export const coinFlipSchema = z
  .object({
    heads: vetoTeamSchema.nullable().default(null),
    tails: vetoTeamSchema.nullable().default(null),
    result: z
      .union([z.literal("heads"), z.literal("tails"), z.null()])
      .default(null),
    winner: vetoTeamSchema.nullable().default(null),
    loser: vetoTeamSchema.nullable().default(null),
  })
  .default({
    heads: null,
    loser: null,
    result: null,
    tails: null,
    winner: null,
  })

export type CoinFlip = z.infer<typeof coinFlipSchema>

export const vetoSequenceSettingsItemSchema = z.object({
  mode: z.string().nullable(),
  action: vetoActionSchema,
  mapActor: CoinTeamResultSchema.nullable(),
  sideActor: CoinTeamResultSchema.nullable(),
})
export type VetoSequenceSettingsItem = z.infer<
  typeof vetoSequenceSettingsItemSchema
>

export const vetoMapSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidV4()),
  imageUrl: z.string().default(""),
  name: z.string().min(1),
})

export const vetoModeSchema = z.object({
  id: z
    .string()
    .uuid()
    .default(() => uuidV4()),
  imageUrl: z.string().default(""),
  name: z.string().min(1),
  mapPool: z.array(z.string().uuid()).default([]),
})
export type VetoMap = z.infer<typeof vetoMapSchema>
export type VetoMode = z.infer<typeof vetoModeSchema>

export const vetoSettingsTypeSchema = z.enum(["standard", "coinFlipOnly"])
export type VetoSettingsType = z.infer<typeof vetoSettingsTypeSchema>
export const vetoSettingsSchema = z
  .object({
    type: vetoSettingsTypeSchema,
    autoStart: z.boolean().default(true),
    sequence: z.array(vetoSequenceSettingsItemSchema).default([]),
    modes: z.array(vetoModeSchema).default([]),
    mapPool: z.array(vetoMapSchema).default([]),
    timer: z.number().nullable(),
  })
  .refine(({ sequence, modes, mapPool, type }) => {
    const isValidSequence = sequence.every(({ mode }) => {
      if (mode === null) return true
      return modes.some(({ id }) => id === mode)
    })

    const mapPoolIds = mapPool.map((map) => map.id)
    const isValidModes = modes.every(({ mapPool }) => {
      return mapPool.every((mapId) => mapPoolIds.includes(mapId))
    })

    const hasMapPool = !!mapPool.length
    const hasSequence = !!sequence.length
    const isCoinflip = type === "coinFlipOnly"
    const isValidMapPool = isCoinflip || (hasMapPool && hasSequence)

    return isValidSequence && isValidModes && isValidMapPool
  })

export type VetoSettings = z.infer<typeof vetoSettingsSchema>

export const vetoSequenceItemSchema = z.object({
  action: vetoActionSchema.nullable(),
  mode: z.string().nullable(),
  status: vetoItemStatusSchema,
  mapActor: CoinTeamResultSchema.nullable(),
  mapActorSide: vetoSideSchema.nullable(),
  mapPicked: z.string().nullable(),
  sideActor: CoinTeamResultSchema.nullable(),
  sidePicked: vetoSideSchema.nullable(),
})

export type VetoSequence = z.infer<typeof vetoSequenceItemSchema>

export const vetoAccessRequestItemSchema = z.object({
  uid: z.string(),
  ign: z.string(),
})

export const vetoPasswordTypeSchema = z.enum(["teamA", "teamB", "host"])
export const vetoPasswordSchema = z.object({
  teamA: z.string(),
  teamB: z.string(),
  host: z.string(),
})
export type VetoPasswordType = z.infer<typeof vetoPasswordTypeSchema>
export type VetoPassword = z.infer<typeof vetoPasswordSchema>

export const vetoActorSchema = z.object({
  type: vetoPasswordTypeSchema,
  name: z.string(),
  socketId: z.string(),
  ready: z.boolean().default(false),
  uuid: z.string().uuid(),
})

export type VetoActor = z.infer<typeof vetoActorSchema>

export const vetoSchema = z.object({
  settings: vetoSettingsSchema,
  passwords: vetoPasswordSchema,
  currentSequence: vetoSequenceSchema,
  coinFlip: coinFlipSchema,
  sequence: z.array(vetoSequenceItemSchema),
  actors: z.array(vetoActorSchema).optional().default([]),
})

export type Veto = z.infer<typeof vetoSchema>

export const vetoMapPickSchema = z.object({
  team: vetoTeamSchema,
  seriesId: z.string(),
  vetoSequence: vetoSequenceSchema,
  map: z.string(),
})

export type VetoMapPickSchema = z.infer<typeof vetoMapPickSchema>

export const vetoSidePickSchema = z.object({
  team: vetoTeamSchema,
  seriesId: z.string(),
  vetoSequence: vetoSequenceSchema,
  side: vetoSideSchema,
})

export type VetoSidePickSchema = z.infer<typeof vetoSidePickSchema>

// Requesting passwords from server
export const vetoPasswordRequestSchema = z.object({
  roomId: z.string(),
  seriesId: z.string(),
  type: vetoPasswordTypeSchema,
})
export type VetoPasswordRequest = z.infer<typeof vetoPasswordRequestSchema>

export const vetoJoinSchema = z.object({
  name: z.string().min(1),
  type: vetoPasswordTypeSchema,
  uuid: z.string().uuid(),
  ready: z.boolean().optional(),
})

export type VetoJoin = z.infer<typeof vetoJoinSchema>

export const vetoClaimCoin = z.object({
  teamSide: vetoTeamSchema,
  coinSide: coinSide,
})

export type VetoClaimCoin = z.infer<typeof vetoClaimCoin>
