package main

import (
	"backend/config"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	r := gin.Default()

	port := config.GetEnv("PORT")
	r.Run(":" + port)
}
