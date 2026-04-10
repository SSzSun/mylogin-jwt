package main

import (
	"backend/config"
	"backend/routes"

	"github.com/gin-gonic/gin"
)

func main() {
	config.LoadEnv()
	config.ConnectDB()

	r := gin.Default()

	routes.SetupRoutes(r)

	port := config.GetEnv("PORT")
	r.Run(":" + port)
}
