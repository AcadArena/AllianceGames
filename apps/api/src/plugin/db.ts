import fp from "fastify-plugin"
import { ErrMsg } from "utils/api"
import { Room } from "../models/Room"
import { Tournament } from "../models/Tournament"
import { sequelize } from "../sequelize"

export default fp(async (server) => {
  sequelize
    .authenticate()
    .then(() => console.log("Database Connected"))
    .catch((err) =>
      console.error(err.message || "Unable to conect to database", err)
    )

  Room.sync().then(() => console.log("[Table] Room - synced"))
  Tournament.sync().then(() => console.log("[Table] Tournament - synced"))

  await Room.create({ name: "DEFAULT Room", password: "test" })
    .then((room) => console.log(room.get()))
    .catch((err) => console.error(ErrMsg(err)))
})
