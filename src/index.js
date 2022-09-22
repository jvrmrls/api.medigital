/*
 * Created on Wed Sep 21 2022
 *
 * Authors: Javier Morales, Edgar Reyes, Carlos Cordero, Brian Rodas, Keny Chavez
 * Copyright (c) 2022 MEdigital
 */

/**
 * IMPORTS
 */
import express from 'express'
import 'dotenv/config'

/**
 * REQUIRED CONSTANTS
 **/
const port = process.env.PORT || 3000

/**
 * CREATION OF THE APP FROM EXPRESS
 */

const app = express()

/**
 * ENDPOINTS TO SET THE RESPECTIVE CONTROLLER
 */
app.get('/', (req, res) => {
  res.json('Hello world')
})

/**
 * LISTENING APP
 */
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
